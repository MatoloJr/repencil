// Data service for handling JSON file operations
export interface User {
  id: string;
  email: string;
  password: string;
  role: 'manufacturer' | 'admin';
  companyName?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  quantity: number;
  basePrice: number;
  discountPercentage: number;
  subtotal: number;
  discountAmount: number;
  total: number;
  status: 'pending' | 'approved' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  specifications: {
    diameter: string;
    length: string;
  };
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  basePriceKES: number;
  minOrderQuantity: number;
  incrementStep: number;
  specifications: {
    diameter: string[];
    length: string[];
    hardness: string[];
  };
  materials: {
    recycledPaper: number;
    recycledGraphite: number;
    naturalClay: number;
  };
  features: string[];
}

class DataService {
  private baseUrl = '/data';

  // User operations
  async getUsers(): Promise<User[]> {
    try {
      const response = await fetch(`${this.baseUrl}/users.json`);
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      return data.users || [];
    } catch (error) {
      console.error('Error fetching users:', error);
      return [];
    }
  }

  async saveUsers(users: User[]): Promise<boolean> {
    try {
      // In a real application, this would make a POST request to an API
      // For now, we'll simulate saving by storing in localStorage
      localStorage.setItem('repencil_users_db', JSON.stringify({ users }));
      return true;
    } catch (error) {
      console.error('Error saving users:', error);
      return false;
    }
  }

  async authenticateUser(email: string, password: string): Promise<User | null> {
    try {
      // Get users from JSON file
      const jsonUsers = await this.getUsers();
      
      // Get users from localStorage
      const localUsers = localStorage.getItem('repencil_users_db');
      let localData: User[] = [];
      
      if (localUsers) {
        const parsed = JSON.parse(localUsers);
        localData = parsed.users || [];
      }

      // Combine both sources
      const allUsers = [...jsonUsers, ...localData];

      const user = allUsers.find(u => u.email === email && u.password === password);
      return user || null;
    } catch (error) {
      console.error('Error authenticating user:', error);
      return null;
    }
  }

  async createUser(userData: Omit<User, 'id' | 'createdAt'>): Promise<User | null> {
    try {
      // Check if user already exists in both JSON and localStorage
      const jsonUsers = await this.getUsers();
      const localUsers = localStorage.getItem('repencil_users_db');
      let localData: User[] = [];
      
      if (localUsers) {
        const parsed = JSON.parse(localUsers);
        localData = parsed.users || [];
      }

      const allUsers = [...jsonUsers, ...localData];
      const userExists = allUsers.find(u => u.email === userData.email);
      if (userExists) {
        throw new Error('User already exists');
      }

      // Create new user
      const newUser: User = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString()
      };

      // Add to localStorage
      localData.push(newUser);
      await this.saveUsers(localData);
      
      // Store admin notification for new user signup
      this.storeAdminNotification({
        type: 'new_user',
        title: 'New User Registration',
        message: `New ${userData.role} registered: ${userData.email}${userData.companyName ? ` (${userData.companyName})` : ''}`,
        timestamp: new Date().toISOString(),
        data: { userId: newUser.id, userEmail: userData.email, userRole: userData.role, companyName: userData.companyName }
      });
      
      return newUser;
    } catch (error) {
      console.error('Error creating user:', error);
      return null;
    }
  }

  // Order operations
  async getOrders(): Promise<Order[]> {
    try {
      const response = await fetch(`${this.baseUrl}/orders.json`);
      if (!response.ok) throw new Error('Failed to fetch orders');
      const data = await response.json();
      return data.orders || [];
    } catch (error) {
      console.error('Error fetching orders:', error);
      return [];
    }
  }

  async getUserOrders(userId: string): Promise<Order[]> {
    try {
      const orders = await this.getOrders();
      return orders.filter(order => order.userId === userId);
    } catch (error) {
      console.error('Error fetching user orders:', error);
      return [];
    }
  }

  async createOrder(orderData: Omit<Order, 'id' | 'createdAt'>): Promise<Order | null> {
    try {
      const newOrder: Order = {
        ...orderData,
        id: `ORD${Date.now()}`,
        createdAt: new Date().toISOString()
      };

      // In a real app, this would save to the server
      // For now, we'll store in localStorage
      const existingOrders = localStorage.getItem('repencil_orders_db');
      let orders: Order[] = [];
      
      if (existingOrders) {
        const data = JSON.parse(existingOrders);
        orders = data.orders || [];
      }

      orders.push(newOrder);
      localStorage.setItem('repencil_orders_db', JSON.stringify({ orders }));
      
      // Store admin notification for new order
      this.storeAdminNotification({
        type: 'new_order',
        title: 'New Order Received',
        message: `New order ${newOrder.id} received for ${orderData.quantity} units. Total: KES ${newOrder.total.toLocaleString()}`,
        timestamp: new Date().toISOString(),
        data: { 
          orderId: newOrder.id, 
          userId: orderData.userId, 
          quantity: orderData.quantity, 
          total: newOrder.total,
          status: newOrder.status
        }
      });
      
      return newOrder;
    } catch (error) {
      console.error('Error creating order:', error);
      return null;
    }
  }

  async updateOrderStatus(orderId: string, status: Order['status']): Promise<boolean> {
    try {
      const existingOrders = localStorage.getItem('repencil_orders_db');
      let orders: Order[] = [];
      
      if (existingOrders) {
        const data = JSON.parse(existingOrders);
        orders = data.orders || [];
      } else {
        orders = await this.getOrders();
      }

      const orderIndex = orders.findIndex(order => order.id === orderId);
      if (orderIndex === -1) return false;

      orders[orderIndex].status = status;
      localStorage.setItem('repencil_orders_db', JSON.stringify({ orders }));
      
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  }

  // Product operations
  async getProducts(): Promise<Product[]> {
    try {
      const response = await fetch(`${this.baseUrl}/products.json`);
      if (!response.ok) throw new Error('Failed to fetch products');
      const data = await response.json();
      return data.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  // Admin notification operations
  private storeAdminNotification(notification: {
    type: string;
    title: string;
    message: string;
    timestamp: string;
    data?: any;
  }): void {
    try {
      const existingNotifications = localStorage.getItem('repencil_admin_notifications');
      let notifications = [];
      
      if (existingNotifications) {
        notifications = JSON.parse(existingNotifications);
      }
      
      notifications.unshift(notification);
      
      // Keep only last 50 notifications
      if (notifications.length > 50) {
        notifications = notifications.slice(0, 50);
      }
      
      localStorage.setItem('repencil_admin_notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Error storing admin notification:', error);
    }
  }

  async getAdminNotifications(): Promise<any[]> {
    try {
      const notifications = localStorage.getItem('repencil_admin_notifications');
      return notifications ? JSON.parse(notifications) : [];
    } catch (error) {
      console.error('Error fetching admin notifications:', error);
      return [];
    }
  }

  async markNotificationAsRead(notificationIndex: number): Promise<boolean> {
    try {
      const notifications = await this.getAdminNotifications();
      if (notifications[notificationIndex]) {
        notifications[notificationIndex].read = true;
        localStorage.setItem('repencil_admin_notifications', JSON.stringify(notifications));
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error marking notification as read:', error);
      return false;
    }
  }

  // Contact form operations
  async storeContactSubmission(contactData: any): Promise<void> {
    try {
      const existingSubmissions = localStorage.getItem('repencil_contact_submissions');
      let submissions = [];
      
      if (existingSubmissions) {
        submissions = JSON.parse(existingSubmissions);
      }
      
      submissions.push({
        ...contactData,
        id: Date.now().toString(),
        timestamp: new Date().toISOString()
      });
      
      localStorage.setItem('repencil_contact_submissions', JSON.stringify(submissions));
      
      // Store admin notification for new contact submission
      this.storeAdminNotification({
        type: 'new_contact',
        title: 'New Contact Form Submission',
        message: `New message from ${contactData.fullName} (${contactData.email}) - ${contactData.subject}`,
        timestamp: new Date().toISOString(),
        data: { 
          contactId: Date.now().toString(),
          fullName: contactData.fullName,
          email: contactData.email,
          company: contactData.company,
          subject: contactData.subject,
          message: contactData.message
        }
      });
    } catch (error) {
      console.error('Error storing contact submission:', error);
    }
  }

  async getContactSubmissions(): Promise<any[]> {
    try {
      const submissions = localStorage.getItem('repencil_contact_submissions');
      return submissions ? JSON.parse(submissions) : [];
    } catch (error) {
      console.error('Error fetching contact submissions:', error);
      return [];
    }
  }
}

export const dataService = new DataService();
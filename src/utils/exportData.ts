// Utility function to export data from localStorage for manual JSON file updates
export const exportDataToJSON = () => {
  const data = {
    users: {
      json: null as any,
      localStorage: null as any,
      combined: [] as any[]
    },
    orders: {
      json: null as any,
      localStorage: null as any,
      combined: [] as any[]
    },
    contactSubmissions: null as any,
    adminNotifications: null as any
  };

  // Export users
  const localUsers = localStorage.getItem('repencil_users_db');
  if (localUsers) {
    data.users.localStorage = JSON.parse(localUsers);
  }

  // Export orders
  const localOrders = localStorage.getItem('repencil_orders_db');
  if (localOrders) {
    data.orders.localStorage = JSON.parse(localOrders);
  }

  // Export contact submissions
  const contactSubmissions = localStorage.getItem('repencil_contact_submissions');
  if (contactSubmissions) {
    data.contactSubmissions = JSON.parse(contactSubmissions);
  }

  // Export admin notifications
  const adminNotifications = localStorage.getItem('repencil_admin_notifications');
  if (adminNotifications) {
    data.adminNotifications = JSON.parse(adminNotifications);
  }

  // Create downloadable JSON file
  const dataStr = JSON.stringify(data, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  const url = URL.createObjectURL(dataBlob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `repencil-data-export-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  console.log('Data exported successfully!');
  return data;
};

// Function to get current data for console inspection
export const getCurrentData = () => {
  const data = {
    users: {
      localStorage: null as any,
      count: 0
    },
    orders: {
      localStorage: null as any,
      count: 0
    },
    contactSubmissions: {
      data: null as any,
      count: 0
    },
    adminNotifications: {
      data: null as any,
      count: 0
    }
  };

  // Get users
  const localUsers = localStorage.getItem('repencil_users_db');
  if (localUsers) {
    data.users.localStorage = JSON.parse(localUsers);
    data.users.count = data.users.localStorage.users?.length || 0;
  }

  // Get orders
  const localOrders = localStorage.getItem('repencil_orders_db');
  if (localOrders) {
    data.orders.localStorage = JSON.parse(localOrders);
    data.orders.count = data.orders.localStorage.orders?.length || 0;
  }

  // Get contact submissions
  const contactSubmissions = localStorage.getItem('repencil_contact_submissions');
  if (contactSubmissions) {
    data.contactSubmissions.data = JSON.parse(contactSubmissions);
    data.contactSubmissions.count = data.contactSubmissions.data.length;
  }

  // Get admin notifications
  const adminNotifications = localStorage.getItem('repencil_admin_notifications');
  if (adminNotifications) {
    data.adminNotifications.data = JSON.parse(adminNotifications);
    data.adminNotifications.count = data.adminNotifications.data.length;
  }

  console.log('Current localStorage data:', data);
  return data;
}; 
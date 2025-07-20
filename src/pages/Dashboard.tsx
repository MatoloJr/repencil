import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { dataService, Order as DataOrder } from '../utils/dataService';
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  DollarSign, 
  Leaf, 
  Star,
  Eye,
  Edit,
  Trash2,
  Plus,
  Calendar,
  CheckCircle,
  Clock,
  XCircle,
  Bell,
  MessageSquare
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { exportDataToJSON, getCurrentData } from '../utils/exportData';

interface Order extends DataOrder {
  // Uses the Order interface from dataService
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [orders, setOrders] = useState<Order[]>([]);
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalSpent: 0,
    carbonSaved: 0,
    treesSaved: 0
  });

  useEffect(() => {
    // Load orders from data service
    const loadOrders = async () => {
      try {
        let userOrders: Order[] = [];
        
        if (user?.role === 'admin') {
          // Admin sees all orders from both JSON and localStorage
          const jsonOrders = await dataService.getOrders();
          const localOrders = localStorage.getItem('repencil_orders_db');
          let localData: Order[] = [];
          
          if (localOrders) {
            const parsed = JSON.parse(localOrders);
            localData = parsed.orders || [];
          }
          
          userOrders = [...jsonOrders, ...localData];
        } else if (user?.id) {
          // Manufacturer sees only their orders from both sources
          const jsonOrders = await dataService.getUserOrders(user.id);
          const localOrders = localStorage.getItem('repencil_orders_db');
          let localData: Order[] = [];
          
          if (localOrders) {
            const parsed = JSON.parse(localOrders);
            localData = parsed.orders || [];
          }
          
          const userLocalOrders = localData.filter((order: Order) => order.userId === user.id);
          userOrders = [...jsonOrders, ...userLocalOrders];
        }

        setOrders(userOrders);

        // Calculate stats
        const totalOrders = userOrders.length;
        const totalSpent = userOrders.reduce((sum, order) => sum + order.total, 0);
        const totalQuantity = userOrders.reduce((sum, order) => sum + order.quantity, 0);
        const carbonSaved = totalQuantity * 0.15; // kg CO2 per unit
        const treesSaved = Math.floor(totalQuantity / 100); // 1 tree per 100 units

        setStats({ totalOrders, totalSpent, carbonSaved, treesSaved });
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    };

    if (user) {
      loadOrders();
    }
  }, [user]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4" />;
      case 'approved': return <CheckCircle className="h-4 w-4" />;
      case 'processing': return <Package className="h-4 w-4" />;
      case 'shipped': return <TrendingUp className="h-4 w-4" />;
      case 'delivered': return <CheckCircle className="h-4 w-4" />;
      case 'cancelled': return <XCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-100 dark:bg-yellow-900/20';
      case 'approved': return 'text-blue-600 bg-blue-100 dark:bg-blue-900/20';
      case 'processing': return 'text-purple-600 bg-purple-100 dark:bg-purple-900/20';
      case 'shipped': return 'text-orange-600 bg-orange-100 dark:bg-orange-900/20';
      case 'delivered': return 'text-green-600 bg-green-100 dark:bg-green-900/20';
      case 'cancelled': return 'text-red-600 bg-red-100 dark:bg-red-900/20';
      default: return 'text-gray-600 bg-gray-100 dark:bg-gray-900/20';
    }
  };

  const statCards = [
    {
      title: 'Total Orders',
      value: stats.totalOrders,
      icon: Package,
      color: 'from-blue-500 to-blue-600',
      suffix: ''
    },
    {
      title: 'Total Spent',
      value: stats.totalSpent,
      icon: DollarSign,
      color: 'from-green-500 to-green-600',
      suffix: ' KES'
    },
    {
      title: 'Carbon Saved',
      value: stats.carbonSaved,
      icon: Leaf,
      color: 'from-emerald-500 to-emerald-600',
      suffix: 'kg'
    },
    {
      title: 'Trees Saved',
      value: stats.treesSaved,
      icon: Star,
      color: 'from-yellow-500 to-yellow-600',
      suffix: ''
    }
  ];

  if (user?.role === 'admin') {
    return <AdminDashboard orders={orders} setOrders={setOrders} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Welcome back, {user?.companyName || user?.email}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Track your orders and environmental impact
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statCards.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {stat.value.toLocaleString()}{stat.suffix}
                    </p>
                  </div>
                  <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                    <IconComponent className="h-6 w-6 text-white" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Orders Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Recent Orders
              </h2>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Order
              </motion.button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.quantity.toLocaleString()} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      KES {order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-1 capitalize">{order.status}</span>
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                        >
                          <Eye className="h-4 w-4" />
                        </motion.button>
                        {order.status === 'pending' && (
                          <>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            >
                              <Edit className="h-4 w-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <Trash2 className="h-4 w-4" />
                            </motion.button>
                          </>
                        )}
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Admin Dashboard Component
const AdminDashboard: React.FC<{ orders: Order[], setOrders: React.Dispatch<React.SetStateAction<Order[]>> }> = ({ orders, setOrders }) => {
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [contactSubmissions, setContactSubmissions] = useState<any[]>([]);
  const [showContactSubmissions, setShowContactSubmissions] = useState(false);
  const { addNotification } = useNotification();
  
  useEffect(() => {
    loadNotifications();
    loadContactSubmissions();
  }, []);

  const loadNotifications = async () => {
    const adminNotifications = await dataService.getAdminNotifications();
    setNotifications(adminNotifications);
  };

  const loadContactSubmissions = async () => {
    const submissions = await dataService.getContactSubmissions();
    setContactSubmissions(submissions);
  };
  
  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      const success = await dataService.updateOrderStatus(orderId, newStatus);
      if (success) {
        setOrders(prevOrders =>
          prevOrders.map(order =>
            order.id === orderId ? { ...order, status: newStatus } : order
          )
        );
        
        addNotification({
          type: 'success',
          title: 'Order Status Updated',
          message: `Order ${orderId} status updated to ${newStatus}`,
          duration: 3000
        });
      } else {
        addNotification({
          type: 'error',
          title: 'Update Failed',
          message: 'Failed to update order status. Please try again.',
          duration: 5000
        });
      }
    } catch (error) {
      console.error('Error updating order status:', error);
      addNotification({
        type: 'error',
        title: 'Update Error',
        message: 'An error occurred while updating the order status.',
        duration: 5000
      });
    }
  };

  const markNotificationAsRead = async (index: number) => {
    await dataService.markNotificationAsRead(index);
    loadNotifications();
  };

  const filteredOrders = selectedStatus === 'all' 
    ? orders 
    : orders.filter(order => order.status === selectedStatus);

  const statusOptions = [
    { value: 'all', label: 'All Orders' },
    { value: 'pending', label: 'Pending' },
    { value: 'approved', label: 'Approved' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  const statusUpdateOptions: Order['status'][] = ['pending', 'approved', 'processing', 'shipped', 'delivered', 'cancelled'];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Manage orders and track business metrics
              </p>
            </div>
            
            {/* Notification Bell */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 relative"
              >
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notifications.filter(n => !n.read).length}
                  </span>
                )}
              </button>
              
              {/* Contact Submissions Button */}
              <button
                onClick={() => setShowContactSubmissions(!showContactSubmissions)}
                className="ml-3 p-3 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 relative"
              >
                <MessageSquare className="h-6 w-6 text-gray-600 dark:text-gray-300" />
                {contactSubmissions.filter(s => !s.read).length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {contactSubmissions.filter(s => !s.read).length}
                  </span>
                )}
              </button>
              
              {/* Data Export Button */}
              <button
                onClick={() => {
                  exportDataToJSON();
                  addNotification({
                    type: 'success',
                    title: 'Data Exported',
                    message: 'Data has been exported successfully!',
                    duration: 3000
                  });
                }}
                className="ml-3 p-3 bg-green-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all duration-200"
                title="Export Data"
              >
                <BarChart3 className="h-6 w-6" />
              </button>
              
              {/* Notifications Dropdown */}
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Notifications ({notifications.length})
                    </h3>
                  </div>
                  <div className="p-2">
                    {notifications.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No notifications
                      </p>
                    ) : (
                      notifications.map((notification, index) => (
                        <div
                          key={index}
                          className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors duration-200 ${
                            notification.read 
                              ? 'bg-gray-50 dark:bg-gray-700' 
                              : 'bg-blue-50 dark:bg-blue-900/20'
                          }`}
                          onClick={() => markNotificationAsRead(index)}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {notification.title}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {new Date(notification.timestamp).toLocaleString()}
                              </p>
                            </div>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
              
              {/* Contact Submissions Dropdown */}
              {showContactSubmissions && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute right-0 mt-2 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl border border-gray-200 dark:border-gray-700 z-50 max-h-96 overflow-y-auto"
                >
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Contact Submissions ({contactSubmissions.length})
                    </h3>
                  </div>
                  <div className="p-2">
                    {contactSubmissions.length === 0 ? (
                      <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                        No contact submissions
                      </p>
                    ) : (
                      contactSubmissions.map((submission, index) => (
                        <div
                          key={submission.id}
                          className={`p-3 rounded-lg mb-2 cursor-pointer transition-colors duration-200 ${
                            submission.read 
                              ? 'bg-gray-50 dark:bg-gray-700' 
                              : 'bg-blue-50 dark:bg-blue-900/20'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {submission.fullName}
                              </h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {submission.email}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                Subject: {submission.subject}
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                {new Date(submission.timestamp).toLocaleString()}
                              </p>
                            </div>
                            {!submission.read && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full ml-2"></div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Orders</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              </div>
              <Package className="h-8 w-8 text-blue-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Pending</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter(o => o.status === 'pending').length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Processing</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  {orders.filter(o => o.status === 'processing').length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-500" />
            </div>
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Revenue</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">
                  KES {orders.reduce((sum, order) => sum + order.total, 0).toLocaleString()}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-500" />
            </div>
          </div>
        </div>

        {/* Orders Management */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-gray-800 rounded-xl shadow-lg"
        >
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                Order Management
              </h2>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
              >
                {statusOptions.map(option => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.map((order, index) => (
                  <motion.tr
                    key={order.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {order.quantity.toLocaleString()} units
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      KES {order.total.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                        className={`px-2 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-green-500 ${
                          order.status === 'pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400' :
                          order.status === 'approved' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                          order.status === 'processing' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400' :
                          order.status === 'shipped' ? 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400' :
                          order.status === 'delivered' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                          'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                        }`}
                      >
                        {statusUpdateOptions.map(status => (
                          <option key={status} value={status} className="capitalize">
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        <Eye className="h-4 w-4" />
                      </motion.button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
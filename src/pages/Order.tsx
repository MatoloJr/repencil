import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Minus, 
  Package, 
  Calculator, 
  Sparkles, 
  TrendingUp,
  CheckCircle,
  Star,
  Gift,
  Target
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { dataService } from '../utils/dataService';

interface PricingResult {
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  total: number;
  nextDiscountAt?: number;
  nextDiscountPercentage?: number;
}

const Order: React.FC = () => {
  const { user } = useAuth();
  const { addNotification } = useNotification();
  const [quantity, setQuantity] = useState(100);
  const [specifications, setSpecifications] = useState({
    diameter: '7mm',
    length: '175mm'
  });
  const [pricing, setPricing] = useState<PricingResult>({
    subtotal: 0,
    discountPercentage: 0,
    discountAmount: 0,
    total: 0
  });
  const [showCelebration, setShowCelebration] = useState(false);
  const [achievementUnlocked, setAchievementUnlocked] = useState<string | null>(null);

  const basePrice = 7.50; // KES per unit
  const minQuantity = 100;
  const incrementStep = 5;

  useEffect(() => {
    calculatePricing(quantity);
  }, [quantity]);

  const calculatePricing = (qty: number) => {
    const subtotal = qty * basePrice;
    let discountPercentage = 0;
    
    if (qty >= 200) {
      const extraHundreds = Math.floor((qty - 100) / 100);
      discountPercentage = Math.min(extraHundreds * 5, 50); // Max 50% discount
    }
    
    const discountAmount = (subtotal * discountPercentage) / 100;
    const total = subtotal - discountAmount;
    
    // Calculate next discount threshold
    let nextDiscountAt: number | undefined;
    let nextDiscountPercentage: number | undefined;
    
    if (qty < 200) {
      nextDiscountAt = 200;
      nextDiscountPercentage = 5;
    } else if (discountPercentage < 50) {
      const currentHundreds = Math.floor((qty - 100) / 100);
      const nextHundred = currentHundreds + 1;
      nextDiscountAt = 100 + (nextHundred * 100);
      nextDiscountPercentage = nextHundred * 5;
    }
    
    setPricing({
      subtotal,
      discountPercentage,
      discountAmount,
      total,
      nextDiscountAt,
      nextDiscountPercentage
    });
  };

  const handleQuantityChange = (newQuantity: number) => {
    const clampedQuantity = Math.max(minQuantity, newQuantity);
    const previousDiscount = pricing.discountPercentage;
    
    setQuantity(clampedQuantity);
    calculatePricing(clampedQuantity);
    
    // Check for discount threshold crossing
    const newSubtotal = clampedQuantity * basePrice;
    let newDiscountPercentage = 0;
    
    if (clampedQuantity >= 200) {
      const extraHundreds = Math.floor((clampedQuantity - 100) / 100);
      newDiscountPercentage = Math.min(extraHundreds * 5, 50);
    }
    
    // Trigger celebration if discount increased
    if (newDiscountPercentage > previousDiscount) {
      setShowCelebration(true);
      setAchievementUnlocked(`${newDiscountPercentage}% Bulk Discount Unlocked!`);
      setTimeout(() => {
        setShowCelebration(false);
        setAchievementUnlocked(null);
      }, 3000);
    }
  };

  const incrementQuantity = () => {
    handleQuantityChange(quantity + incrementStep);
  };

  const decrementQuantity = () => {
    handleQuantityChange(quantity - incrementStep);
  };

  const progressToNextDiscount = pricing.nextDiscountAt 
    ? ((quantity - (pricing.nextDiscountAt - 100)) / 100) * 100 
    : 100;

  const handleOrder = () => {
    if (!user) {
      // Redirect to login for guests
      return;
    }
    
    // Process order using data service
    const processOrder = async () => {
      try {
        const orderData = {
          userId: user.id,
          quantity,
          basePrice,
          discountPercentage: pricing.discountPercentage,
          subtotal: pricing.subtotal,
          discountAmount: pricing.discountAmount,
          total: pricing.total,
          status: 'pending' as const,
          specifications
        };
        
        const newOrder = await dataService.createOrder(orderData);
        if (newOrder) {
          console.log('Order placed successfully:', newOrder);
          
          addNotification({
            type: 'success',
            title: 'Order Placed Successfully!',
            message: `Your order (${newOrder.id}) has been placed successfully. Total: KES ${newOrder.total.toLocaleString()}`,
            duration: 5000
          });
          
          // Reset form or redirect
          setQuantity(100);
          setSpecifications({
            diameter: '7mm',
            length: '175mm'
          });
        } else {
          addNotification({
            type: 'error',
            title: 'Order Failed',
            message: 'Failed to place order. Please try again.',
            duration: 5000
          });
        }
      } catch (error) {
        console.error('Error placing order:', error);
        addNotification({
          type: 'error',
          title: 'Order Error',
          message: 'An error occurred while placing your order. Please try again.',
          duration: 5000
        });
      }
    };
    
    processOrder();
  };

  if (!user) {
    return <GuestOrderInquiry />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 pt-20">
      {/* Celebration Animation */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-4 rounded-full shadow-2xl flex items-center space-x-3">
              <Sparkles className="h-8 w-8 animate-spin" />
              <span className="text-2xl font-bold">{achievementUnlocked}</span>
              <Gift className="h-8 w-8 animate-bounce" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Configure Your Order
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Build your perfect recycled pencil core solution
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Configuration Panel */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Package className="h-6 w-6 mr-3 text-green-600" />
              Product Configuration
            </h2>

            {/* Quantity Selector */}
            <div className="mb-8">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Quantity (Minimum: {minQuantity} units)
              </label>
              
              <div className="flex items-center justify-center space-x-4 mb-4">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={decrementQuantity}
                  disabled={quantity <= minQuantity}
                  className="p-3 bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-full hover:bg-red-200 dark:hover:bg-red-900/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                >
                  <Minus className="h-6 w-6" />
                </motion.button>
                
                <div className="text-center">
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => handleQuantityChange(parseInt(e.target.value) || minQuantity)}
                    min={minQuantity}
                    step={incrementStep}
                    className="w-32 text-3xl font-bold text-center border-2 border-gray-300 dark:border-gray-600 rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  />
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">units</p>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={incrementQuantity}
                  className="p-3 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full hover:bg-green-200 dark:hover:bg-green-900/50 transition-all duration-200"
                >
                  <Plus className="h-6 w-6" />
                </motion.button>
              </div>

              {/* Progress to Next Discount */}
              {pricing.nextDiscountAt && (
                <div className="mb-4">
                  <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
                    <span>Progress to {pricing.nextDiscountPercentage}% discount</span>
                    <span>{quantity} / {pricing.nextDiscountAt}</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((quantity / pricing.nextDiscountAt) * 100, 100)}%` }}
                      className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full flex items-center justify-end pr-2"
                    >
                      {quantity >= pricing.nextDiscountAt && (
                        <Star className="h-3 w-3 text-white" />
                      )}
                    </motion.div>
                  </div>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Core Diameter
                </label>
                <select
                  value={specifications.diameter}
                  onChange={(e) => setSpecifications({ ...specifications, diameter: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="6mm">6mm - Standard</option>
                  <option value="7mm">7mm - Popular</option>
                  <option value="8mm">8mm - Premium</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Core Length
                </label>
                <select
                  value={specifications.length}
                  onChange={(e) => setSpecifications({ ...specifications, length: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                >
                  <option value="175mm">175mm - Standard</option>
                  <option value="190mm">190mm - Extended</option>
                </select>
              </div>
            </div>
          </motion.div>

          {/* Pricing Panel */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Calculator className="h-6 w-6 mr-3 text-green-600" />
              Pricing Breakdown
            </h2>

            <div className="space-y-6">
              {/* Pricing Theater */}
              <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl p-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-medium text-gray-700 dark:text-gray-300">
                    Base Price ({quantity} × KES {basePrice})
                  </span>
                  <motion.span
                    key={pricing.subtotal}
                    initial={{ scale: 1.2, color: '#10B981' }}
                    animate={{ scale: 1, color: '#374151' }}
                    className="text-2xl font-bold dark:text-white"
                  >
                    KES {pricing.subtotal.toLocaleString()}
                  </motion.span>
                </div>

                {pricing.discountPercentage > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-between items-center mb-4 p-4 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg"
                  >
                    <div className="flex items-center">
                      <Sparkles className="h-5 w-5 text-yellow-600 dark:text-yellow-400 mr-2" />
                      <span className="font-medium text-yellow-800 dark:text-yellow-300">
                        Bulk Discount ({pricing.discountPercentage}%)
                      </span>
                    </div>
                    <span className="text-xl font-bold text-yellow-800 dark:text-yellow-300">
                      -KES {pricing.discountAmount.toLocaleString()}
                    </span>
                  </motion.div>
                )}

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900 dark:text-white">
                      Total Amount
                    </span>
                    <motion.span
                      key={pricing.total}
                      initial={{ scale: 1.3, color: '#10B981' }}
                      animate={{ scale: 1, color: '#059669' }}
                      className="text-3xl font-bold text-green-600 dark:text-green-400"
                    >
                      KES {pricing.total.toLocaleString()}
                    </motion.span>
                  </div>
                  {pricing.discountAmount > 0 && (
                    <p className="text-sm text-green-600 dark:text-green-400 mt-1">
                      You save KES {pricing.discountAmount.toLocaleString()}!
                    </p>
                  )}
                </div>
              </div>

              {/* Environmental Impact */}
              <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-6">
                <h3 className="text-lg font-bold text-green-800 dark:text-green-300 mb-4 flex items-center">
                  <Target className="h-5 w-5 mr-2" />
                  Environmental Impact
                </h3>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {Math.floor(quantity / 100)}
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">Trees Saved</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                      {(quantity * 0.15).toFixed(1)}kg
                    </div>
                    <div className="text-sm text-green-700 dark:text-green-300">CO₂ Reduced</div>
                  </div>
                </div>
              </div>

              {/* Order Actions */}
              <div className="space-y-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleOrder}
                  className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center"
                >
                  <CheckCircle className="h-6 w-6 mr-2" />
                  Place Order
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 border-2 border-green-600 text-green-600 dark:text-green-400 rounded-xl font-semibold hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                >
                  Save Configuration
                </motion.button>
              </div>

              {/* Quick Reorder Suggestions */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-xl p-4">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Quick Order Sizes</h4>
                <div className="grid grid-cols-3 gap-2">
                  {[200, 500, 1000].map((suggestedQty) => (
                    <motion.button
                      key={suggestedQty}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleQuantityChange(suggestedQty)}
                      className="py-2 px-3 bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors duration-200"
                    >
                      {suggestedQty}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

// Guest Order Inquiry Component
const GuestOrderInquiry: React.FC = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    quantity: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Guest inquiry:', formData);
    // Handle guest inquiry submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Request a Quote
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Get pricing information for our recycled pencil cores
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Tell Us About Your Needs
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Company Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Your company name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Quantity
                </label>
                <input
                  type="text"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="e.g., 1000 units per month"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Additional Requirements
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:text-white"
                  placeholder="Tell us about your specific requirements..."
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-xl font-bold text-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                Submit Quote Request
              </motion.button>
            </form>
          </motion.div>

          {/* Benefits for Signing Up */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-green-600 to-green-500 text-white rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6">
              Unlock Advanced Features
            </h2>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Real-time Pricing</h3>
                  <p className="text-green-100">
                    See live pricing with automatic bulk discounts as you configure your order.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Package className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Order Management</h3>
                  <p className="text-green-100">
                    Track orders, view history, and manage your account from a personalized dashboard.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <Calculator className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Impact Tracking</h3>
                  <p className="text-green-100">
                    See your environmental impact with detailed sustainability metrics.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4">
              <Link
                to="/signup"
                className="block w-full py-3 bg-white text-green-600 rounded-xl font-semibold text-center hover:bg-gray-100 transition-colors duration-200"
              >
                Create Account
              </Link>
              <Link
                to="/login"
                className="block w-full py-3 border-2 border-white text-white rounded-xl font-semibold text-center hover:bg-white/10 transition-colors duration-200"
              >
                Sign In
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Order;
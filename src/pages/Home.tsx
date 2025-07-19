import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, useAnimation } from 'framer-motion';
import { 
  Leaf, 
  Recycle, 
  TrendingUp, 
  Award, 
  Battery, 
  TreePine, 
  Zap,
  Play,
  ChevronRight,
  Star
} from 'lucide-react';

const Home: React.FC = () => {
  const [impactStats, setImpactStats] = useState({
    treesSaved: 0,
    batteriesRecycled: 0,
    co2Reduced: 0
  });

  const controls = useAnimation();

  useEffect(() => {
    // Animate counter numbers
    const animateCounters = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const targetStats = {
        treesSaved: 2847,
        batteriesRecycled: 15692,
        co2Reduced: 3420
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        setImpactStats({
          treesSaved: Math.floor(targetStats.treesSaved * progress),
          batteriesRecycled: Math.floor(targetStats.batteriesRecycled * progress),
          co2Reduced: Math.floor(targetStats.co2Reduced * progress)
        });
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }
    };

    animateCounters();
  }, []);

  const benefits = [
    {
      icon: Leaf,
      title: '100% Sustainable',
      description: 'Made entirely from recycled materials including paper, graphite from batteries, and natural clay.',
      stat: '0% virgin materials',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Superior Quality',
      description: 'Engineered for durability and consistent performance that meets industry standards.',
      stat: '99.8% quality rating',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Cost Effective',
      description: 'Competitive pricing with bulk discounts that increase your profit margins.',
      stat: 'Up to 25% savings',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: Recycle,
      title: 'Circular Economy',
      description: 'Contributing to a sustainable future by turning waste into valuable products.',
      stat: '100% recyclable',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      company: 'EcoWrite Pencils',
      quote: 'RePencil has transformed our manufacturing process. Quality is exceptional and our customers love knowing theyre using recycled products.',
      rating: 5
    },
    {
      name: 'Michael Chen',
      company: 'GreenStationery Ltd',
      quote: 'The cost savings and environmental benefits make RePencil cores our preferred choice. Highly recommend!',
      rating: 5
    },
    {
      name: 'Emma Rodriguez',
      company: 'Sustainable Schools Supply',
      quote: 'Our educational clients are thrilled with the sustainability story. Great product, great partnership.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 pt-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Revolutionizing Pencils with{' '}
                <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                  100% Recycled Cores
                </span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                Transform your pencil manufacturing with our sustainable inner cores made from recycled paper, 
                battery graphite, and natural clay. Quality meets environmental responsibility.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/products"
                    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl"
                  >
                    Learn More
                    <ChevronRight className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link
                    to="/order"
                    className="inline-flex items-center px-8 py-4 border-2 border-green-600 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-600 hover:text-white dark:hover:bg-green-500 transition-all duration-200"
                  >
                    Request Sample
                    <Play className="ml-2 h-5 w-5" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8">
                {/* Virtual Pencil Cross Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
                    Interactive Pencil Core
                  </h3>
                  <div className="relative">
                    {/* Pencil Visualization */}
                    <div className="flex items-center justify-center space-x-2">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-4 h-24 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full cursor-pointer"
                        title="Wood Casing"
                      ></motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-6 h-24 bg-gradient-to-b from-gray-700 to-gray-800 rounded-full cursor-pointer relative"
                        title="Recycled Core"
                      >
                        <div className="absolute inset-1 bg-gradient-to-b from-green-600 to-green-700 rounded-full"></div>
                      </motion.div>
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-4 h-24 bg-gradient-to-b from-yellow-400 to-yellow-500 rounded-full cursor-pointer"
                        title="Wood Casing"
                      ></motion.div>
                    </div>
                    
                    {/* Material Indicators */}
                    <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                      <div className="p-3 bg-green-50 dark:bg-green-900/30 rounded-lg">
                        <Recycle className="h-6 w-6 text-green-600 dark:text-green-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-green-600 dark:text-green-400">Recycled Paper</p>
                      </div>
                      <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <Battery className="h-6 w-6 text-gray-600 dark:text-gray-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Battery Graphite</p>
                      </div>
                      <div className="p-3 bg-orange-50 dark:bg-orange-900/30 rounded-lg">
                        <Zap className="h-6 w-6 text-orange-600 dark:text-orange-400 mx-auto mb-2" />
                        <p className="text-sm font-medium text-orange-600 dark:text-orange-400">Natural Clay</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Impact Stats Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Making a real difference through sustainable manufacturing
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full mb-4">
                <TreePine className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
              <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                {impactStats.treesSaved.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Trees Saved</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                <Battery className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {impactStats.batteriesRecycled.toLocaleString()}
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">Batteries Recycled</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-center p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full mb-4">
                <Leaf className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
              <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                {impactStats.co2Reduced.toLocaleString()}kg
              </div>
              <p className="text-gray-600 dark:text-gray-300 font-medium">CO₂ Reduced</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Why Choose RePencil Cores?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Experience the perfect blend of sustainability, quality, and cost-effectiveness 
              that sets your products apart in the market.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group cursor-pointer"
                >
                  <div className="p-8 bg-gradient-to-br from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                      {benefit.description}
                    </p>
                    <div className="text-sm font-semibold text-green-600 dark:text-green-400">
                      {benefit.stat}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              See what our manufacturing partners say about RePencil
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="p-8 bg-white dark:bg-gray-900 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <blockquote className="text-gray-600 dark:text-gray-300 mb-6 italic">
                  "{testimonial.quote}"
                </blockquote>
                <div>
                  <div className="font-bold text-gray-900 dark:text-white">
                    {testimonial.name}
                  </div>
                  <div className="text-green-600 dark:text-green-400">
                    {testimonial.company}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Manufacturing?
            </h2>
            <p className="text-xl text-green-100 mb-8">
              Join the sustainable revolution and give your pencils the eco-friendly edge they need.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/order"
                  className="inline-flex items-center px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
                >
                  Get Quote Now
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Link>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link
                  to="/contact"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200 font-semibold"
                >
                  Partner with Us
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Package, 
  Recycle, 
  Battery, 
  Mountain, 
  CheckCircle, 
  Star,
  Zap,
  Shield,
  TrendingUp,
  Award
} from 'lucide-react';

const Products: React.FC = () => {
  const [selectedSpec, setSelectedSpec] = useState('diameter');

  const materials = [
    {
      name: 'Recycled Paper',
      percentage: 60,
      color: 'from-green-500 to-green-600',
      icon: Recycle,
      benefits: [
        'Post-consumer waste paper',
        'Reduces landfill waste',
        'Sustainable sourcing',
        'Renewable resource'
      ]
    },
    {
      name: 'Recycled Graphite',
      percentage: 30,
      color: 'from-gray-600 to-gray-700',
      icon: Battery,
      benefits: [
        'Extracted from batteries',
        'High-quality writing performance',
        'Consistent density',
        'Waste reduction'
      ]
    },
    {
      name: 'Natural Clay',
      percentage: 10,
      color: 'from-orange-500 to-orange-600',
      icon: Mountain,
      benefits: [
        'Enhanced strength',
        'Improved durability',
        'Natural binding agent',
        'Eco-friendly'
      ]
    }
  ];

  const specifications = [
    { label: 'Diameter Options', value: '6mm, 7mm, 8mm', unit: '' },
    { label: 'Length Options', value: '175mm, 190mm', unit: '' },
    { label: 'Hardness Grades', value: 'HB, 2H, 2B', unit: '' },
    { label: 'Tensile Strength', value: '45-55', unit: 'MPa' },
    { label: 'Density', value: '1.8-2.2', unit: 'g/cm³' },
    { label: 'Production Lead Time', value: '7-14', unit: 'business days' }
  ];

  const features = [
    {
      icon: Recycle,
      title: 'Fully Recyclable',
      description: 'End-of-life pencils can be fully recycled, supporting circular economy principles.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Quality Assured',
      description: 'Rigorous quality control ensures consistent performance that meets industry standards.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: TrendingUp,
      title: 'Cost Competitive',
      description: 'Competitive pricing with bulk discounts for large-scale manufacturing operations.',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const pricingTiers = [
    {
      name: 'Base Pricing',
      price: 'KES 7.50',
      unit: 'per unit',
      description: 'Standard pricing for orders under 200 units',
      features: ['Standard quality', 'Basic support', '7-14 day delivery']
    },
    {
      name: 'Bulk Discounts',
      price: 'Up to 50%',
      unit: 'savings',
      description: '5% discount for every 100 units above minimum',
      features: ['Volume pricing', 'Priority support', 'Faster delivery'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      unit: 'pricing',
      description: 'Tailored solutions for large manufacturers',
      features: ['Custom specifications', 'Dedicated account manager', 'Flexible terms']
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 pt-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-green-900/20 py-20">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Recycled Pencil Cores
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Premium quality inner cores made from 100% recycled materials, delivering superior performance while supporting your sustainability goals.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg hover:from-green-700 hover:to-green-600 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              Order Now
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Material Composition */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Material Composition
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our cores are crafted from carefully selected recycled materials
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {materials.map((material, index) => {
              const IconComponent = material.icon;
              return (
                <motion.div
                  key={material.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${material.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {material.name}
                  </h3>
                  
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-4">
                    {material.percentage}%
                  </div>
                  
                  <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                    {material.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-center justify-center">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our product meets and exceeds industry standards for quality and performance
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="space-y-6">
                {specifications.map((spec, index) => (
                  <motion.div
                    key={spec.label}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex justify-between items-center p-4 bg-white dark:bg-gray-900 rounded-lg shadow hover:shadow-md transition-shadow duration-200"
                  >
                    <span className="font-medium text-gray-900 dark:text-white">
                      {spec.label}
                    </span>
                    <span className="text-green-600 dark:text-green-400 font-semibold">
                      {spec.value} {spec.unit}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
                    <Package className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                    Quality Assured
                  </h3>
                  <p className="text-green-700 dark:text-green-400">
                    Every batch tested for consistency and performance
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Key Features
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Why manufacturers choose our recycled pencil cores
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 text-center group"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${feature.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Competitive Pricing */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Competitive Pricing
            </h2>
            <p className="text-xl text-green-100">
              Flexible pricing options to meet your manufacturing needs
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pricingTiers.map((tier, index) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 ${
                  tier.popular ? 'ring-4 ring-yellow-400 transform scale-105' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-yellow-400 text-yellow-900 px-4 py-1 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {tier.name}
                  </h3>
                  <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-1">
                    {tier.price}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300 text-sm">
                    {tier.unit}
                  </div>
                </div>
                
                <p className="text-gray-600 dark:text-gray-300 text-center mb-6">
                  {tier.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-full py-3 rounded-lg font-semibold transition-all duration-200 ${
                    tier.popular
                      ? 'bg-green-600 text-white hover:bg-green-700'
                      : 'border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white'
                  }`}
                >
                  Get Started
                </motion.button>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
            >
              Request Custom Quote
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Products;
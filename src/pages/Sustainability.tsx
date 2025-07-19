import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Leaf, 
  Recycle, 
  TreePine, 
  Battery, 
  Award, 
  Target,
  TrendingUp,
  Shield,
  Globe,
  CheckCircle,
  BarChart3,
  Zap
} from 'lucide-react';

const Sustainability: React.FC = () => {
  const [impactStats, setImpactStats] = useState({
    treesRecycled: 0,
    batteriesRecycled: 0,
    co2Reduced: 0,
    wasteReduced: 0
  });

  useEffect(() => {
    // Animate counter numbers
    const animateCounters = async () => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const targetStats = {
        treesRecycled: 500000,
        batteriesRecycled: 80,
        co2Reduced: 60,
        wasteReduced: 2.5
      };

      const duration = 2000;
      const steps = 60;
      const stepDuration = duration / steps;

      for (let i = 0; i <= steps; i++) {
        const progress = i / steps;
        setImpactStats({
          treesRecycled: Math.floor(targetStats.treesRecycled * progress),
          batteriesRecycled: Math.floor(targetStats.batteriesRecycled * progress),
          co2Reduced: Math.floor(targetStats.co2Reduced * progress),
          wasteReduced: parseFloat((targetStats.wasteReduced * progress).toFixed(1))
        });
        await new Promise(resolve => setTimeout(resolve, stepDuration));
      }
    };

    animateCounters();
  }, []);

  const environmentalBenefits = [
    {
      icon: Recycle,
      title: 'Circular Economy',
      description: 'We transform waste pencil cores into valuable resources, creating a closed-loop system that minimizes environmental impact.',
      features: [
        'Waste-to-resource conversion',
        'Closed-loop manufacturing',
        'Resource optimization',
        'Sustainable sourcing'
      ],
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Battery,
      title: 'Resource Conservation',
      description: 'By utilizing recycled materials, we significantly reduce the demand for virgin resources and help preserve natural ecosystems.',
      features: [
        'Reduces virgin paper usage',
        'Conserves natural forests',
        'Minimizes mining impact',
        'Preserves biodiversity'
      ],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Leaf,
      title: 'Carbon Footprint Reduction',
      description: 'Our manufacturing process significantly reduces carbon emissions compared to traditional pencil core production methods.',
      features: [
        'Energy-efficient processing',
        'Reduced transportation emissions',
        'Lower manufacturing footprint',
        'Clean manufacturing processes'
      ],
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const certifications = [
    {
      name: 'ISO 14001',
      description: 'Environmental Management Systems',
      icon: Shield,
      color: 'text-green-600',
      status: 'Certified'
    },
    {
      name: 'Cradle to Cradle',
      description: 'Circular design certification',
      icon: Recycle,
      color: 'text-blue-600',
      status: 'Certified'
    },
    {
      name: 'Carbon Neutral',
      description: 'Net-zero carbon emissions',
      icon: Leaf,
      color: 'text-purple-600',
      status: 'Verified'
    }
  ];

  const impactMetrics = [
    {
      value: impactStats.treesRecycled,
      label: 'Trees Recycled',
      unit: '+',
      description: 'Equivalent trees saved through our recycling process',
      icon: TreePine,
      color: 'text-green-600'
    },
    {
      value: impactStats.batteriesRecycled,
      label: 'Waste Recycled',
      unit: '%',
      description: 'Of our materials come from recycled sources',
      icon: Recycle,
      color: 'text-blue-600'
    },
    {
      value: impactStats.co2Reduced,
      label: 'CO₂ Reduction',
      unit: '%',
      description: 'Lower carbon footprint vs traditional methods',
      icon: Leaf,
      color: 'text-purple-600'
    },
    {
      value: impactStats.wasteReduced,
      label: 'Waste Reduced',
      unit: ' tons',
      description: 'Total waste diverted from landfills',
      icon: Target,
      color: 'text-orange-600'
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
              Sustainability Impact
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Transforming pencil manufacturing with sustainable innovation and responsible environmental impact that benefits the circular economy.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Environmental Impact Stats */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Environmental Impact
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Measurable results from our commitment to sustainability
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {impactMetrics.map((metric, index) => {
              const IconComponent = metric.icon;
              return (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300"
                >
                  <div className={`inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-4`}>
                    <IconComponent className={`h-8 w-8 ${metric.color}`} />
                  </div>
                  <div className={`text-4xl font-bold ${metric.color} mb-2`}>
                    {metric.value.toLocaleString()}{metric.unit}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {metric.label}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    {metric.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Environmental Benefits */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Environmental Benefits
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              How our recycled pencil cores contribute to a sustainable future
            </p>
          </motion.div>

          <div className="space-y-16">
            {environmentalBenefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''
                  }`}
                >
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${benefit.color} rounded-xl mb-6`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      {benefit.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                      {benefit.description}
                    </p>
                    <ul className="space-y-3">
                      {benefit.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center">
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                          <span className="text-gray-600 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className={`bg-gradient-to-br ${benefit.color.replace('from-', 'from-').replace('to-', 'to-')}/10 rounded-2xl p-8 h-80 flex items-center justify-center`}>
                      <div className="text-center">
                        <IconComponent className={`h-20 w-20 mx-auto mb-4 ${benefit.color.includes('green') ? 'text-green-600' : benefit.color.includes('blue') ? 'text-blue-600' : 'text-purple-600'}`} />
                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                          {benefit.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Certifications & Standards */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Certifications & Standards
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Our commitment to sustainability is verified through industry certifications
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <motion.div
                  key={cert.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                    <IconComponent className={`h-10 w-10 ${cert.color}`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {cert.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {cert.description}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                    <CheckCircle className="h-4 w-4 mr-1" />
                    {cert.status}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive Impact Calculator */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-500 dark:from-green-700 dark:to-green-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <BarChart3 className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Calculate Your Impact
            </h2>
            <p className="text-xl text-green-100 mb-8">
              See how switching to our recycled pencil cores can reduce your environmental footprint
            </p>
            
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-3xl font-bold text-white mb-2">15%</div>
                  <div className="text-green-100">Less Energy Used</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">60%</div>
                  <div className="text-green-100">CO₂ Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-white mb-2">80%</div>
                  <div className="text-green-100">Waste Recycled</div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                Calculate Your Savings
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200 font-semibold"
              >
                Download Impact Report
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;
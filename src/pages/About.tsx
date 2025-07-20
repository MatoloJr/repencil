import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Users, 
  Award, 
  Lightbulb, 
  Handshake, 
  Building,
  Leaf,
  Shield,
  TrendingUp,
  Heart
} from 'lucide-react';

const About: React.FC = () => {
  const values = [
    {
      icon: Leaf,
      title: 'Environmental Sustainability',
      description: 'Committed to reducing environmental impact through innovative recycling solutions and sustainable manufacturing practices.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Shield,
      title: 'Quality Excellence',
      description: 'Maintaining the highest standards in product quality and manufacturing processes to ensure reliable performance.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Handshake,
      title: 'Partnership Focus',
      description: 'Building long-term relationships with manufacturers through trust, reliability, and mutual growth.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: TrendingUp,
      title: 'Innovation Drive',
      description: 'Continuously improving our processes and products to lead the industry in sustainable manufacturing.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const timeline = [
    {
      year: 'Friday',
      title: 'The Beginning',
      description: 'Founded on the principle that sustainable manufacturing should be accessible to all. Our journey began with extensive research into recycled materials and sustainable manufacturing. We recognized the potential to transform the pencil industry through innovative recycling.',
      icon: Lightbulb
    },
    {
      year: 'Saturday',
      title: 'Innovation Through Research',
      description: 'Developed our proprietary blend of recycled materials, optimized for pencil manufacturing. After extensive testing and refinement, we created our core formula to meet the performance of traditional materials.',
      icon: Award
    },
    {
      year: 'Saturday',
      title: 'Building Partnerships',
      description: 'Formed key partnerships with major pencil manufacturers and established our first production facility. Our focus on quality and sustainability helped us secure long-term contracts with leading brands.',
      icon: Building
    },
    {
      year: 'Future',
      title: 'Scaling Impact',
      description: 'Expanded production capacity and launched our B2B platform. Today, we serve manufacturers across multiple continents, helping them achieve their sustainability goals.',
      icon: Users
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
              About RePencil
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              We're revolutionizing the pencil manufacturing industry by creating sustainable, high-quality inner cores from 100% recycled materials.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-gray-600 dark:text-gray-300">
                <p>
                  At RePencil, we believe that sustainability and quality can coexist. Our mission is to lead pencil manufacturers into the future of sustainable production by providing innovative recycled inner cores.
                </p>
                <p>
                  By transforming recycled paper, graphite, and clay into high-quality pencil cores, we're helping manufacturers reduce their environmental footprint while maintaining the performance standards their customers expect.
                </p>
                <p>
                  We envision a world where every pencil contributes to a circular economy, turning waste into valuable products that inspire creativity and learning.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-green-100 to-green-200 dark:from-green-900/30 dark:to-green-800/30 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-600 rounded-full mb-4">
                    <Target className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-green-800 dark:text-green-300 mb-2">
                    Sustainable Innovation
                  </h3>
                  <p className="text-green-700 dark:text-green-400">
                    Leading the transformation to eco-friendly manufacturing
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Founded on the principle that sustainable energy innovation is the driving force behind our success.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-green-600 dark:bg-green-400"></div>

            <div className="space-y-12">
              {timeline.map((item, index) => {
                const IconComponent = item.icon;
                return (
                  <motion.div
                    key={item.year}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className={`relative flex items-center ${
                      index % 2 === 0 ? 'justify-start' : 'justify-end'
                    }`}
                  >
                    {/* Timeline Node */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-12 h-12 bg-green-600 dark:bg-green-400 rounded-full flex items-center justify-center z-10">
                      <IconComponent className="h-6 w-6 text-white" />
                    </div>

                    {/* Content Card */}
                    <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center mb-3">
                          <span className="text-2xl font-bold text-green-600 dark:text-green-400 mr-3">
                            {item.year}
                          </span>
                          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                            {item.title}
                          </h3>
                        </div>
                        <p className="text-gray-600 dark:text-gray-300">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Our Values
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              The principles that guide everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 h-full">
                    <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${value.color} rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                      {value.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
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
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6">
              <Heart className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Leading the Change
            </h2>
            <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
              Our team combines expertise in sustainable manufacturing, materials science, and business innovation to create products that make a real difference for our planet.
            </p>
            <blockquote className="text-lg text-green-100 italic mb-8 max-w-2xl mx-auto">
              "When we put our minds to solving the problem of sustainable manufacturing, we often find an environmental and economic win."
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/signup'}
                className="px-8 py-4 bg-white text-green-600 rounded-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl font-semibold"
              >
                Join Our Mission
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/products'}
                className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-green-600 transition-all duration-200 font-semibold"
              >
                Learn More
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;
'use client'

import { motion } from 'framer-motion'
import { FiImage, FiLayers, FiZap, FiAward, FiUsers, FiHeart } from 'react-icons/fi'

const services = [
  {
    icon: FiImage,
    title: 'Custom Resin Art',
    description: 'Personalized resin art pieces tailored to your vision. From abstract designs to specific themes, we bring your ideas to life.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: FiLayers,
    title: 'Clay Sculptures',
    description: 'Handcrafted clay sculptures with intricate details. Traditional techniques meet modern aesthetics.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: FiZap,
    title: 'Mixed Media Art',
    description: 'Innovative combinations of clay and resin creating unique futuristic art pieces that stand out.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FiAward,
    title: 'Art Workshops',
    description: 'Learn the art of clay and resin crafting in our hands-on workshops. Perfect for beginners and enthusiasts.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: FiUsers,
    title: 'Commission Work',
    description: 'Professional commission services for businesses and individuals. Large-scale projects welcome.',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    icon: FiHeart,
    title: 'Art Consultation',
    description: 'Expert advice on art selection, placement, and customization to match your space and style.',
    color: 'from-pink-500 to-rose-500',
  },
]

export default function Services() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: 'easeOut',
      },
    },
  }

  return (
    <section id="services" className="py-20 relative particle-bg">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 font-[var(--font-orbitron)]">
            <span className="gradient-text">Our Services</span>
          </h2>
          <p className="text-xl text-gray-300 font-[var(--font-rajdhani)] max-w-2xl mx-auto">
            Discover the range of artistic services we offer to bring your creative vision to reality
          </p>
        </motion.div>

        {/* Services Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                <div className="relative h-full glass-strong rounded-xl p-8 overflow-hidden">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />

                  {/* Icon */}
                  <div className="relative mb-6">
                    <div className={`absolute inset-0 bg-gradient-to-br ${service.color} rounded-lg blur-xl opacity-50 group-hover:opacity-75 transition-opacity duration-300`} />
                    <div className={`relative bg-gradient-to-br ${service.color} p-4 rounded-lg w-16 h-16 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-4 font-[var(--font-orbitron)] group-hover:text-purple-300 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-300 leading-relaxed font-[var(--font-rajdhani)]">
                    {service.description}
                  </p>

                  {/* Hover Effect Glow */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300 pointer-events-none`} />
                  <div className={`absolute -inset-0.5 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-30 rounded-xl blur-sm transition-opacity duration-300 pointer-events-none -z-10`} />
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}


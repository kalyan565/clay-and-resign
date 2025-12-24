'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { FiEye, FiX, FiShoppingCart, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi'
import { useCart } from '@/context/CartContext'
import Link from 'next/link'

const galleryItems = [
  {
    id: 1,
    name: 'Cosmic Vessel',
    title: 'Cosmic Vessel',
    category: 'Resin Art',
    description: 'A mesmerizing blend of colors creating a cosmic universe within',
    image: '/api/placeholder/600/400',
    price: 2500,
  },
  {
    id: 2,
    name: 'Terracotta Dreams',
    title: 'Terracotta Dreams',
    category: 'Clay Sculpture',
    description: 'Handcrafted clay piece with intricate details and organic forms',
    image: '/api/placeholder/600/400',
    price: 1800,
  },
  {
    id: 3,
    name: 'Neon Fusion',
    title: 'Neon Fusion',
    category: 'Mixed Media',
    description: 'Futuristic combination of resin and clay with neon accents',
    image: '/api/placeholder/600/400',
    price: 3200,
  },
  {
    id: 4,
    name: 'Ocean Depths',
    title: 'Ocean Depths',
    category: 'Resin Art',
    description: 'Deep blue resin art capturing the essence of ocean waves',
    image: '/api/placeholder/600/400',
    price: 2200,
  },
  {
    id: 5,
    name: 'Earth Elements',
    title: 'Earth Elements',
    category: 'Clay Sculpture',
    description: 'Natural clay sculpture inspired by earth and nature',
    image: '/api/placeholder/600/400',
    price: 1500,
  },
  {
    id: 6,
    name: 'Galactic Flow',
    title: 'Galactic Flow',
    category: 'Resin Art',
    description: 'Flowing resin art with galactic colors and cosmic patterns',
    image: '/api/placeholder/600/400',
    price: 2800,
  },
]

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<number | null>(null)
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart()
  const [cartItems, setCartItems] = useState<{ [key: number]: any }>({})

  useEffect(() => {
    const itemsMap: { [key: number]: any } = {}
    cart.forEach((item) => {
      itemsMap[item.id] = item
    })
    setCartItems(itemsMap)
  }, [cart])

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
    <section id="gallery" className="py-20 relative">
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
            <span className="gradient-text">Gallery</span>
          </h2>
          <p className="text-xl text-gray-300 font-[var(--font-rajdhani)] max-w-2xl mx-auto">
            Explore our collection of futuristic art pieces crafted with passion and innovation
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {galleryItems.map((item) => {
            const cartItem = cartItems[item.id]
            const handleAddToCart = (e: React.MouseEvent) => {
              e.stopPropagation()
              addToCart(item)
            }
            const handleIncreaseQuantity = (e: React.MouseEvent) => {
              e.stopPropagation()
              if (cartItem) {
                updateQuantity(item.id, cartItem.quantity + 1)
              } else {
                addToCart(item)
              }
            }
            const handleDecreaseQuantity = (e: React.MouseEvent) => {
              e.stopPropagation()
              if (cartItem && cartItem.quantity > 1) {
                updateQuantity(item.id, cartItem.quantity - 1)
              } else if (cartItem) {
                removeFromCart(item.id)
              }
            }

            return (
              <motion.div
                key={item.id}
                variants={itemVariants}
                whileHover={{ scale: 1.05, y: -10 }}
                className="relative group"
              >
                {/* Card */}
                <div className="relative overflow-hidden rounded-xl glass-strong h-80 cursor-pointer" onClick={() => setSelectedItem(item.id)}>
                  {/* Placeholder Image with Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 animate-gradient-shift">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-6xl opacity-30">🎨</div>
                    </div>
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <span className="inline-block px-3 py-1 bg-purple-500/50 rounded-full text-xs font-semibold text-white mb-2 font-[var(--font-rajdhani)]">
                        {item.category}
                      </span>
                      <h3 className="text-xl font-bold text-white mb-2 font-[var(--font-orbitron)]">
                        {item.title}
                      </h3>
                      <p className="text-gray-300 text-sm font-[var(--font-rajdhani)] mb-2">
                        {item.description}
                      </p>
                      <p className="text-2xl font-bold text-purple-300 font-[var(--font-orbitron)]">
                        ₹{item.price.toLocaleString()}
                      </p>
                    </div>
                  </div>

                  {/* View Icon */}
                  <div className="absolute top-4 right-4 p-3 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <FiEye className="w-5 h-5 text-white" />
                  </div>

                  {/* Glow Effect */}
                  <div className="absolute inset-0 border-2 border-purple-500/0 group-hover:border-purple-500/50 rounded-xl transition-all duration-300 animate-pulse-glow"></div>
                </div>

                {/* Cart Controls */}
                <div className="mt-4 flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-white mb-1 font-[var(--font-orbitron)]">
                      {item.title}
                    </h3>
                    <p className="text-xl font-bold text-purple-300 font-[var(--font-orbitron)]">
                      ₹{item.price.toLocaleString()}
                    </p>
                  </div>
                  {cartItem ? (
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 bg-purple-500/20 rounded-lg px-3 py-2 border border-purple-500/50">
                        <button
                          onClick={handleDecreaseQuantity}
                          className="p-1 rounded-lg hover:bg-purple-500/30 transition text-white"
                          aria-label="Decrease quantity"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-white min-w-[2rem] text-center font-[var(--font-rajdhani)]">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={handleIncreaseQuantity}
                          className="p-1 rounded-lg hover:bg-purple-500/30 transition text-white"
                          aria-label="Increase quantity"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>
                      <Link
                        href="/cart"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2 font-semibold font-[var(--font-rajdhani)]"
                      >
                        <FiShoppingCart />
                        Cart
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={handleAddToCart}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2 font-semibold font-[var(--font-rajdhani)]"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={() => setSelectedItem(null)}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            className="relative max-w-4xl w-full glass-strong rounded-xl p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-lg glass hover:glass-strong transition-all"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>

            {(() => {
              const item = galleryItems.find((i) => i.id === selectedItem)
              if (!item) return null

              return (
                <div>
                  <div className="h-96 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 rounded-lg mb-6 flex items-center justify-center">
                    <div className="text-9xl opacity-30">🎨</div>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-2 font-[var(--font-orbitron)]">
                    {item.title}
                  </h3>
                  <span className="inline-block px-3 py-1 bg-purple-500/50 rounded-full text-sm font-semibold text-white mb-4 font-[var(--font-rajdhani)]">
                    {item.category}
                  </span>
                  <p className="text-gray-300 text-lg font-[var(--font-rajdhani)] mb-4">
                    {item.description}
                  </p>
                  <p className="text-3xl font-bold text-purple-300 mb-6 font-[var(--font-orbitron)]">
                    ₹{item.price.toLocaleString()}
                  </p>
                  {cartItems[item.id] ? (
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-purple-500/20 rounded-lg px-4 py-2 border border-purple-500/50">
                        <button
                          onClick={() => {
                            const cartItem = cartItems[item.id]
                            if (cartItem && cartItem.quantity > 1) {
                              updateQuantity(item.id, cartItem.quantity - 1)
                            } else if (cartItem) {
                              removeFromCart(item.id)
                            }
                          }}
                          className="p-1 rounded-lg hover:bg-purple-500/30 transition text-white"
                        >
                          <FiMinus className="w-5 h-5" />
                        </button>
                        <span className="font-bold text-white min-w-[2rem] text-center font-[var(--font-rajdhani)]">
                          {cartItems[item.id].quantity}
                        </span>
                        <button
                          onClick={() => {
                            const cartItem = cartItems[item.id]
                            if (cartItem) {
                              updateQuantity(item.id, cartItem.quantity + 1)
                            } else {
                              addToCart(item)
                            }
                          }}
                          className="p-1 rounded-lg hover:bg-purple-500/30 transition text-white"
                        >
                          <FiPlus className="w-5 h-5" />
                        </button>
                      </div>
                      <Link
                        href="/cart"
                        className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2 font-semibold font-[var(--font-rajdhani)]"
                      >
                        <FiShoppingCart />
                        Go to Cart
                        <FiArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  ) : (
                    <button
                      onClick={() => addToCart(item)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg hover:from-purple-700 hover:to-pink-700 transition flex items-center gap-2 font-semibold font-[var(--font-rajdhani)]"
                    >
                      <FiShoppingCart />
                      Add to Cart
                    </button>
                  )}
                </div>
              )
            })()}
          </motion.div>
        </motion.div>
      )}
    </section>
  )
}


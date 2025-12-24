'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { FiTrash2, FiPlus, FiMinus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi'
import Link from 'next/link'
import { motion } from 'framer-motion'

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart()

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <FiShoppingBag className="w-24 h-24 text-purple-500/50 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-orbitron)] gradient-text">
              Your Cart is Empty
            </h1>
            <p className="text-gray-300 mb-8 text-lg font-[var(--font-rajdhani)]">
              Add some beautiful art pieces to get started!
            </p>
            <Link
              href="/#gallery"
              className="inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition font-[var(--font-rajdhani)]"
            >
              Explore Gallery
            </Link>
          </motion.div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Link
        href="/#gallery"
        className="flex items-center gap-2 text-purple-300 hover:text-pink-400 transition mb-6 font-medium font-[var(--font-rajdhani)]"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Gallery
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 font-[var(--font-orbitron)] gradient-text">
        Shopping Cart
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="glass-strong rounded-xl p-6 space-y-4">
            {cart.map((item, index) => (
              <motion.div
                key={`${item.id}-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center gap-4 py-6 border-b border-purple-500/20 last:border-b-0"
              >
                <div className="w-24 h-24 rounded-lg overflow-hidden bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-blue-600/20 flex items-center justify-center flex-shrink-0">
                  <div className="text-3xl opacity-50">🎨</div>
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg text-white mb-1 font-[var(--font-orbitron)]">
                    {item.name}
                  </h3>
                  <p className="text-gray-400 text-sm font-[var(--font-rajdhani)] mb-2">
                    {item.category}
                  </p>
                  <p className="text-xl font-bold text-purple-300 font-[var(--font-orbitron)]">
                    ₹{item.price.toLocaleString()}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-purple-500/20 rounded-lg px-3 py-2 border border-purple-500/50">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 rounded-lg hover:bg-purple-500/30 transition text-white"
                    >
                      <FiMinus className="w-4 h-4" />
                    </button>
                    <span className="w-12 text-center font-semibold text-white font-[var(--font-rajdhani)]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 rounded-lg hover:bg-purple-500/30 transition text-white"
                    >
                      <FiPlus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right min-w-[100px]">
                    <p className="text-lg font-bold text-white font-[var(--font-orbitron)]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-pink-400 hover:text-pink-500 hover:bg-pink-500/10 p-2 rounded-lg transition"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-strong rounded-xl p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-6 text-white font-[var(--font-orbitron)]">
              Order Summary
            </h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-300 font-[var(--font-rajdhani)]">
                <span>Items ({getTotalItems()})</span>
                <span className="text-white font-semibold">₹{getTotalPrice().toLocaleString()}</span>
              </div>
              <div className="border-t border-purple-500/20 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-white font-[var(--font-orbitron)]">Total</span>
                  <span className="text-2xl font-bold text-purple-300 font-[var(--font-orbitron)]">
                    ₹{getTotalPrice().toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            <Link
              href="/checkout"
              className="block w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white text-center py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition font-[var(--font-rajdhani)] text-lg"
            >
              Proceed to Checkout
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}


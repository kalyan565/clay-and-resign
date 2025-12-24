'use client'

import { useState } from 'react'
import { useCart } from '@/context/CartContext'
import { useOrders } from '@/context/OrderContext'
import Link from 'next/link'
import { FiCheckCircle, FiPackage, FiArrowLeft } from 'react-icons/fi'
import { motion } from 'framer-motion'

export default function CheckoutPage() {
  const { cart, getTotalPrice, clearCart } = useCart()
  const { addOrder } = useOrders()
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    place: '',
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [orderDetails, setOrderDetails] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    const order = addOrder({
      customerName: formData.name,
      address: formData.address,
      place: formData.place,
      items: [...cart],
      subtotal: getTotalPrice(),
      shipping: 0,
      total: getTotalPrice(),
      status: 'pending',
    })
    
    // Send order details to WhatsApp (client-side for GitHub Pages)
    try {
      const whatsappMessage = formatWhatsAppMessage(order)
      const phoneNumber = '8179262144'
      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`
      
      // Open WhatsApp link
      window.open(whatsappUrl, '_blank')
    } catch (error) {
      console.error('Error creating WhatsApp link:', error)
    }
    
    setOrderDetails(order)
    clearCart()
    setIsSubmitted(true)
    setIsSubmitting(false)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const formatWhatsAppMessage = (orderData: any): string => {
    const items = orderData.items.map((item: any) => 
      `• ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n')

    return `🛒 *New Order Received!*

📦 *Order Number:* ${orderData.orderNumber}

👤 *Customer Details:*
• Name: ${orderData.customerName}
• Address: ${orderData.address}
• Place: ${orderData.place}

📋 *Order Items:*
${items}

💰 *Total Amount:* ₹${orderData.total.toLocaleString()}

📅 *Order Date:* ${new Date(orderData.date).toLocaleString('en-IN')}

Status: ${orderData.status.toUpperCase()}`
  }

  if (isSubmitted && orderDetails) {
    return (
      <div className="container mx-auto px-4 py-16 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <FiCheckCircle className="w-20 h-20 text-green-400 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[var(--font-orbitron)] gradient-text">
              Order Placed Successfully!
            </h1>
            <p className="text-gray-300 mb-2 text-lg font-[var(--font-rajdhani)]">
              Thank you for your order. We&apos;ll contact you shortly.
            </p>
            <p className="text-xl font-semibold text-purple-300 font-[var(--font-orbitron)]">
              Order Number: <span className="text-pink-400">{orderDetails.orderNumber}</span>
            </p>
          </motion.div>

          {/* Order Details Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-strong rounded-xl p-6 mb-6"
          >
            <h2 className="text-2xl font-bold mb-6 text-white font-[var(--font-orbitron)]">
              Order Details
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="font-semibold text-purple-300 mb-3 font-[var(--font-orbitron)]">
                  Customer Information
                </h3>
                <p className="text-gray-300 mb-2 font-[var(--font-rajdhani)]">
                  Name: <span className="text-white font-medium">{orderDetails.customerName}</span>
                </p>
                <p className="text-gray-300 mb-2 font-[var(--font-rajdhani)]">
                  Address: <span className="text-white font-medium">{orderDetails.address}</span>
                </p>
                <p className="text-gray-300 font-[var(--font-rajdhani)]">
                  Place: <span className="text-white font-medium">{orderDetails.place}</span>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-purple-300 mb-3 font-[var(--font-orbitron)]">
                  Order Information
                </h3>
                <p className="text-gray-300 mb-2 font-[var(--font-rajdhani)]">
                  Date: <span className="text-white font-medium">{new Date(orderDetails.date).toLocaleDateString('en-IN', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}</span>
                </p>
                <p className="text-gray-300 font-[var(--font-rajdhani)]">
                  Status: <span className="text-pink-400 font-medium capitalize">{orderDetails.status}</span>
                </p>
              </div>
            </div>

            <div className="border-t border-purple-500/20 pt-4">
              <h3 className="font-semibold text-purple-300 mb-3 font-[var(--font-orbitron)]">
                Order Items
              </h3>
              <div className="space-y-2">
                {orderDetails.items.map((item: any, index: number) => (
                  <div key={index} className="flex justify-between text-sm py-2 border-b border-purple-500/10 last:border-b-0">
                    <span className="text-gray-300 font-[var(--font-rajdhani)]">
                      {item.name} x{item.quantity}
                    </span>
                    <span className="text-white font-semibold font-[var(--font-rajdhani)]">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-purple-500/20 flex justify-between items-center">
                <span className="text-xl font-bold text-white font-[var(--font-orbitron)]">Total</span>
                <span className="text-2xl font-bold text-purple-300 font-[var(--font-orbitron)]">
                  ₹{orderDetails.total.toLocaleString()}
                </span>
              </div>
            </div>
          </motion.div>

          <div className="flex gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition font-[var(--font-rajdhani)]"
            >
              <FiPackage />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-12 min-h-screen">
      <Link
        href="/cart"
        className="flex items-center gap-2 text-purple-300 hover:text-pink-400 transition mb-6 font-medium font-[var(--font-rajdhani)]"
      >
        <FiArrowLeft className="w-5 h-5" />
        Back to Cart
      </Link>
      <h1 className="text-4xl md:text-5xl font-bold mb-8 font-[var(--font-orbitron)] gradient-text">
        Checkout
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmit} className="glass-strong rounded-xl p-6 space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white font-[var(--font-orbitron)]">
                Order Information
              </h2>
              <div className="space-y-4 max-w-md">
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2 font-[var(--font-rajdhani)]">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-[var(--font-rajdhani)]"
                    placeholder="Your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2 font-[var(--font-rajdhani)]">
                    Address *
                  </label>
                  <textarea
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleChange}
                    rows={3}
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all resize-none font-[var(--font-rajdhani)]"
                    placeholder="Your complete address"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-purple-300 mb-2 font-[var(--font-rajdhani)]">
                    Place *
                  </label>
                  <input
                    type="text"
                    name="place"
                    required
                    value={formData.place}
                    onChange={handleChange}
                    className="w-full px-4 py-3 glass rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all font-[var(--font-rajdhani)]"
                    placeholder="City, State"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full max-w-md bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-semibold hover:from-purple-700 hover:to-pink-700 transition text-lg disabled:opacity-50 disabled:cursor-not-allowed font-[var(--font-rajdhani)]"
            >
              {isSubmitting ? 'Placing Order...' : 'Place Order'}
            </button>
          </form>
        </div>

        <div className="lg:col-span-1">
          <div className="glass-strong rounded-xl p-6 sticky top-4">
            <h2 className="text-2xl font-bold mb-6 text-white font-[var(--font-orbitron)]">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              {cart.map((item, index) => (
                <div key={`${item.id}-${index}`} className="flex justify-between text-sm">
                  <div className="flex flex-col">
                    <span className="text-gray-300 font-[var(--font-rajdhani)]">
                      {item.name} x{item.quantity}
                    </span>
                  </div>
                  <span className="text-white font-semibold font-[var(--font-rajdhani)]">
                    ₹{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
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
        </div>
      </div>
    </div>
  )
}


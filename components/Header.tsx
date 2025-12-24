'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FiMenu, FiX, FiShoppingCart } from 'react-icons/fi'
import { motion, AnimatePresence } from 'framer-motion'
import { useCart } from '@/context/CartContext'
import Logo from './Logo'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { getTotalItems } = useCart()
  const cartItemCount = getTotalItems()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'glass-strong shadow-lg shadow-purple-500/20' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <Link 
              href="/" 
              className="relative text-white hover:text-purple-300 transition-colors duration-300 font-[var(--font-rajdhani)] font-medium group"
            >
              Home
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="#gallery" 
              className="relative text-white hover:text-purple-300 transition-colors duration-300 font-[var(--font-rajdhani)] font-medium group"
            >
              Gallery
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
            <Link 
              href="#services" 
              className="relative text-white hover:text-purple-300 transition-colors duration-300 font-[var(--font-rajdhani)] font-medium group"
            >
              Services
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          </nav>

          {/* Cart Icon */}
          <div className="hidden md:flex items-center">
            <Link
              href="/cart"
              className="relative p-2 rounded-lg glass hover:glass-strong transition-all duration-300 hover:scale-110 group"
              aria-label="Shopping Cart"
            >
              <FiShoppingCart className="w-5 h-5 text-purple-300 group-hover:text-pink-400 transition-colors" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center font-[var(--font-rajdhani)]">
                  {cartItemCount > 9 ? '9+' : cartItemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-white hover:text-purple-300 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <FiX className="w-6 h-6" />
            ) : (
              <FiMenu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-strong border-t border-purple-500/20"
          >
            <nav className="container mx-auto px-4 py-6 space-y-4">
              <Link
                href="/"
                className="block text-white hover:text-purple-300 transition-colors font-[var(--font-rajdhani)] font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="#gallery"
                className="block text-white hover:text-purple-300 transition-colors font-[var(--font-rajdhani)] font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="#services"
                className="block text-white hover:text-purple-300 transition-colors font-[var(--font-rajdhani)] font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 text-white hover:text-purple-300 transition-colors font-[var(--font-rajdhani)] font-medium py-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <FiShoppingCart className="w-5 h-5" />
                Cart
                {cartItemCount > 0 && (
                  <span className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </span>
                )}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}


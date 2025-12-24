import Link from 'next/link'
import { FiInstagram, FiFacebook, FiMail, FiMapPin, FiPhone } from 'react-icons/fi'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="relative mt-20 particle-bg">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Logo />
            </div>
            <p className="text-gray-300 font-[var(--font-rajdhani)] leading-relaxed">
              Creating futuristic art pieces with clay and resin. Experience the future of artistic expression.
            </p>
            <div className="flex gap-4 pt-4">
              <a 
                href="#" 
                className="p-3 rounded-lg glass hover:glass-strong transition-all duration-300 hover:scale-110 group"
                aria-label="Instagram"
              >
                <FiInstagram className="w-5 h-5 text-purple-300 group-hover:text-pink-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-lg glass hover:glass-strong transition-all duration-300 hover:scale-110 group"
                aria-label="Facebook"
              >
                <FiFacebook className="w-5 h-5 text-purple-300 group-hover:text-pink-400 transition-colors" />
              </a>
              <a 
                href="#" 
                className="p-3 rounded-lg glass hover:glass-strong transition-all duration-300 hover:scale-110 group"
                aria-label="Email"
              >
                <FiMail className="w-5 h-5 text-purple-300 group-hover:text-pink-400 transition-colors" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-6 font-[var(--font-orbitron)] neon-text-purple">
              Contact Us
            </h4>
            <ul className="space-y-4 font-[var(--font-rajdhani)]">
              <li className="flex items-start gap-3 text-gray-300">
                <FiMapPin className="w-5 h-5 text-purple-400 mt-1 flex-shrink-0" />
                <span>Nadiupet 3rd Line, Guntur, Andhra Pradesh</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <FiPhone className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3 text-gray-300">
                <FiMail className="w-5 h-5 text-purple-400 flex-shrink-0" />
                <span>kondaveetisrilakshmisowjanya</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 mt-12 pt-8 text-center">
          <p className="text-gray-400 font-[var(--font-rajdhani)]">
            &copy; {new Date().getFullYear()} Clay & Resign Art Studio. All rights reserved.
          </p>
          <p className="text-gray-500 text-sm mt-2 font-[var(--font-rajdhani)]">
            Crafted with <span className="text-pink-400">❤</span> and futuristic vision
          </p>
        </div>
      </div>
    </footer>
  )
}


'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-3 group">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 0px rgba(168, 85, 247, 0.4)",
              "0 0 20px rgba(168, 85, 247, 0.6)",
              "0 0 30px rgba(168, 85, 247, 0.4)",
              "0 0 0px rgba(168, 85, 247, 0.4)",
            ],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Rotating border glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, transparent, rgba(168, 85, 247, 0.3), transparent)",
          }}
          animate={{ rotate: 360 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        {/* Main logo container */}
        <motion.div
          className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden"
          style={{
            filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))",
          }}
        >
          {/* Subtle pulse animation */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-full"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          
          {/* Logo image */}
          <div className="relative w-full h-full rounded-full overflow-hidden bg-gradient-to-br from-purple-500/10 to-pink-500/10">
            <img
              src={`${process.env.NEXT_PUBLIC_BASE_PATH || ''}/logo.jpg`}
              alt="VS3 Clay and Resin Art Studio Logo"
              className="w-full h-full object-contain rounded-full"
              style={{
                filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2)) brightness(1.05) contrast(1.1)",
              }}
              onError={(e) => {
                // Fallback if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
                const fallback = target.parentElement?.querySelector('.logo-fallback') as HTMLElement;
                if (fallback) {
                  fallback.style.display = 'flex';
                }
              }}
            />
            {/* Fallback logo if image not found */}
            <div className="logo-fallback hidden absolute inset-0 items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-full">
              <span className="text-2xl font-bold text-white font-[var(--font-orbitron)]">VS3</span>
            </div>
          </div>
        </motion.div>

        {/* Floating particles around logo */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            style={{
              left: "50%",
              top: "50%",
            }}
            animate={{
              x: [
                Math.cos((i * 60) * Math.PI / 180) * 30,
                Math.cos((i * 60) * Math.PI / 180) * 35,
                Math.cos((i * 60) * Math.PI / 180) * 30,
              ],
              y: [
                Math.sin((i * 60) * Math.PI / 180) * 30,
                Math.sin((i * 60) * Math.PI / 180) * 35,
                Math.sin((i * 60) * Math.PI / 180) * 30,
              ],
              opacity: [0.3, 0.7, 0.3],
              scale: [0.8, 1.2, 0.8],
            }}
            transition={{
              duration: 2 + i * 0.2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.1,
            }}
          />
        ))}
      </motion.div>

      {/* Text next to logo */}
      <div className="hidden md:block">
        <motion.h1
          className="text-xl font-bold font-[var(--font-orbitron)] shiny-white-text"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          Clay & Resin
        </motion.h1>
        <motion.p
          className="text-xs font-[var(--font-rajdhani)] shiny-white-text"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          Art Studio
        </motion.p>
      </div>
    </Link>
  )
}


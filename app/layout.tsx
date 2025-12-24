import type { Metadata } from 'next'
import { Orbitron, Rajdhani } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { CartProvider } from '@/context/CartContext'
import { OrderProvider } from '@/context/OrderContext'

const orbitron = Orbitron({ 
  subsets: ['latin'],
  variable: '--font-orbitron',
  display: 'swap',
})

const rajdhani = Rajdhani({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-rajdhani',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Clay & Resign Art Studio - Futuristic Art Gallery',
  description: 'Experience the future of art with our innovative clay and resin creations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${orbitron.variable} ${rajdhani.variable}`}>
      <body className={`${rajdhani.className} antialiased`}>
        <CartProvider>
          <OrderProvider>
            <Header />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </OrderProvider>
        </CartProvider>
      </body>
    </html>
  )
}


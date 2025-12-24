import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json()

    // Format order details for WhatsApp
    const whatsappMessage = formatWhatsAppMessage(orderData)

    // Send to WhatsApp (using WhatsApp Business API or webhook)
    const whatsappUrl = await sendToWhatsApp(whatsappMessage, orderData.orderNumber)

    return NextResponse.json({ 
      success: true, 
      message: 'Order details sent successfully',
      whatsappUrl 
    })
  } catch (error) {
    console.error('Error sending order details:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to send order details' },
      { status: 500 }
    )
  }
}

function formatWhatsAppMessage(orderData: any): string {
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

async function sendToWhatsApp(message: string, orderNumber: string) {
  const phoneNumber = '8179262144' // WhatsApp number provided by user
  const whatsappMessage = encodeURIComponent(message)
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${whatsappMessage}`
  
  // Log for debugging
  console.log('WhatsApp Notification:', {
    phone: phoneNumber,
    orderNumber,
    message: message.substring(0, 100) + '...'
  })
  
  // Return the URL - the frontend will open it
  return whatsappUrl
}


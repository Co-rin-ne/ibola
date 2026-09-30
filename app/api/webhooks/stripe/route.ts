import { stripe } from '@/lib/stripe'
import { SHIPPING_FEES } from '@/lib/constants'
import { createClient } from '@supabase/supabase-js'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  const body = await request.text()
  const sig = request.headers.get('stripe-signature')

  if (!sig || !process.env.STRIPE_WEBHOOK_SECRET) {
    return new Response('Missing signature or webhook secret', { status: 400 })
  }

  let event

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    )
  } catch (error) {
    console.error('Webhook signature verification failed:', error)
    return new Response('Signature verification failed', { status: 400 })
  }

  // Handle payment_intent.succeeded event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as any
    const orderId = paymentIntent.metadata?.orderId

    if (!orderId) {
      console.error('No orderId in payment intent metadata')
      return new Response('No orderId', { status: 400 })
    }

    try {
      // Get order details from Supabase
      const { data: order, error: orderError } = await supabaseAdmin
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single()

      if (orderError || !order) {
        throw new Error('Order not found')
      }

      // Send confirmation email
      await fetch(`${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/api/send-confirmation-email`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: order.customer_email,
          orderId: order.id,
          customerName: order.customer_name,
          items: order.items,
          totalEur: order.total_eur,
          totalFcfa: order.total_fcfa,
          shippingEur: SHIPPING_FEES.EUR,
          shippingFcfa: SHIPPING_FEES.FCFA,
          locale: 'fr',
        }),
      })

      // Update order status to paid
      const { error: updateError } = await supabaseAdmin
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId)

      if (updateError) throw updateError

      console.log(`Order ${orderId} marked as paid and email sent`)
    } catch (error) {
      console.error('Error processing payment:', error)
      return new Response('Error processing payment', { status: 500 })
    }
  }

  return new Response('Webhook received', { status: 200 })
}

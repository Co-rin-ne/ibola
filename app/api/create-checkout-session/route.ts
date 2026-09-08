import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { PRODUCTS } from '@/lib/constants'
import type { CartItem } from '@/types'

export async function POST(req: NextRequest) {
  try {
    const { orderId, cart, locale, customerEmail } = (await req.json()) as {
      orderId: string
      cart: CartItem[]
      locale: string
      customerEmail: string
    }

    if (!orderId || !cart || cart.length === 0) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
    }

    const origin = req.headers.get('origin') || req.nextUrl.origin

    const line_items = cart.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.product_id)
      const name =
        locale === 'en'
          ? product?.name_en || item.product_id
          : product?.name_fr || item.product_id

      return {
        price_data: {
          currency: 'eur',
          product_data: {
            name: `${name} (${item.size})`,
          },
          unit_amount: Math.round(item.price_eur * 100), // Stripe expects cents
        },
        quantity: item.quantity,
      }
    })

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      payment_method_types: ['card'],
      line_items,
      customer_email: customerEmail,
      success_url: `${origin}/${locale}/order/${orderId}?email=${encodeURIComponent(customerEmail)}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}/checkout`,
      metadata: {
        orderId,
      },
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Stripe session error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}

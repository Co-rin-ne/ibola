import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { supabaseAdmin } from '@/lib/supabase-admin'

export async function POST(req: NextRequest) {
  try {
    const { sessionId } = (await req.json()) as { sessionId: string }

    if (!sessionId) {
      return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
    }

    // Verify the payment status directly with Stripe (never trust the client alone)
    const session = await stripe.checkout.sessions.retrieve(sessionId)

    if (session.payment_status !== 'paid') {
      return NextResponse.json({ paid: false })
    }

    const orderId = session.metadata?.orderId

    if (orderId) {
      await supabaseAdmin
        .from('orders')
        .update({ status: 'paid' })
        .eq('id', orderId)
    }

    return NextResponse.json({ paid: true })
  } catch (error) {
    console.error('Confirm payment error:', error)
    return NextResponse.json({ error: 'Failed to confirm payment' }, { status: 500 })
  }
}

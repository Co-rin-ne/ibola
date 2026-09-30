import { createClient } from '@supabase/supabase-js'
import { generateOrderNumber } from '@/lib/utils'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: Request) {
  try {
    const {
      customer_name,
      customer_email,
      address,
      city,
      zip_code,
      country,
      items,
      total_eur,
      total_fcfa,
      payment_method,
      status,
    } = await request.json()

    const { data, error } = await supabaseAdmin
      .from('orders')
      .insert({
        customer_name,
        customer_email,
        address,
        city,
        zip_code,
        country,
        items,
        total_eur,
        total_fcfa,
        payment_method,
        status,
      })
      .select('id')
      .single()

    if (error) throw error

    const orderNumber = generateOrderNumber()

    return Response.json({ success: true, orderId: data.id, orderNumber })
  } catch (error) {
    console.error('Order creation error:', error)
    return Response.json(
      { success: false, error: String(error) },
      { status: 500 }
    )
  }
}

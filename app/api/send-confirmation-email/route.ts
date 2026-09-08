import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  try {
    const { email, orderId, customerName, items, totalEur, totalFcfa, locale } = await request.json()

    const isFr = locale === 'fr'
    const subject = isFr ? 'Confirmation de votre commande IBOLA' : 'Your IBOLA Order Confirmation'

    const itemsList = items
      .map((item: any) => `${item.product_id} - Taille: ${item.size} x${item.quantity}`)
      .join('<br/>')

    const htmlContent = isFr
      ? `
        <h2>Merci pour votre commande!</h2>
        <p>Bonjour ${customerName},</p>
        <p>Votre commande a bien été reçue.</p>
        <h3>Détails de la commande:</h3>
        <p><strong>Numéro de commande:</strong> ${orderId}</p>
        <p><strong>Articles:</strong><br/>${itemsList}</p>
        <p><strong>Total:</strong> ${totalEur}€ (${totalFcfa} FCFA)</p>
        <p>Vous recevrez bientôt votre commande. Merci d'avoir choisi IBOLA!</p>
      `
      : `
        <h2>Thank you for your order!</h2>
        <p>Hello ${customerName},</p>
        <p>Your order has been received.</p>
        <h3>Order details:</h3>
        <p><strong>Order number:</strong> ${orderId}</p>
        <p><strong>Items:</strong><br/>${itemsList}</p>
        <p><strong>Total:</strong> €${totalEur} (${totalFcfa} FCFA)</p>
        <p>You will receive your order soon. Thank you for choosing IBOLA!</p>
      `

    const response = await resend.emails.send({
      from: 'IBOLA <noreply@resend.dev>',
      to: email,
      subject,
      html: htmlContent,
    })

    return Response.json({ success: true, data: response })
  } catch (error) {
    console.error('Email error:', error)
    return Response.json({ success: false, error: String(error) }, { status: 500 })
  }
}

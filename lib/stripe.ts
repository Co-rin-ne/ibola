import Stripe from 'stripe'

// Server-only. Never import this file from a 'use client' component.
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY')
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export interface Product {
  id: string
  name_en: string
  name_fr: string
  description_en: string
  description_fr: string
  price_eur: number
  color: 'yellow' | 'green'
  sizes: string[]
  images: string[]
  created_at: string
  updated_at: string
}

export interface CartItem {
  product_id: string
  size: string
  quantity: number
  price_eur: number
}

export interface Cart {
  items: CartItem[]
  currency: 'EUR' | 'FCFA'
}

export interface User {
  id: string
  email: string
  name: string
  loyalty_points: number
  created_at: string
  updated_at: string
}

export interface Order {
  id: string
  user_id: string
  items: CartItem[]
  total_eur: number
  total_fcfa: number
  status: 'pending' | 'paid' | 'shipped' | 'delivered'
  payment_method: 'paypal' | 'cash'
  delivery_address: string
  created_at: string
  delivery_date?: string
}

export interface OrderConfirmation {
  id: string
  order_id: string
  email: string
  token: string
  created_at: string
}

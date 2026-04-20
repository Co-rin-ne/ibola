'use client'

import { useState, useEffect, useCallback } from 'react'
import type { CartItem } from '@/types'

const CART_KEY = 'ibola_cart'

export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem(CART_KEY)
    if (saved) {
      try {
        setCart(JSON.parse(saved))
      } catch (e) {
        console.error('Failed to load cart:', e)
      }
    }
    setIsLoaded(true)
  }, [])

  const saveCart = useCallback((items: CartItem[]) => {
    localStorage.setItem(CART_KEY, JSON.stringify(items))
    setCart(items)
  }, [])

  const addItem = useCallback(
    (product_id: string, size: string, price_eur: number, quantity: number = 1) => {
      const newCart = [...cart]
      const existingIndex = newCart.findIndex(
        (item) => item.product_id === product_id && item.size === size
      )

      if (existingIndex >= 0) {
        newCart[existingIndex].quantity += quantity
      } else {
        newCart.push({ product_id, size, quantity, price_eur })
      }

      saveCart(newCart)
    },
    [cart, saveCart]
  )

  const removeItem = useCallback(
    (product_id: string, size: string) => {
      const newCart = cart.filter(
        (item) => !(item.product_id === product_id && item.size === size)
      )
      saveCart(newCart)
    },
    [cart, saveCart]
  )

  const updateQuantity = useCallback(
    (product_id: string, size: string, quantity: number) => {
      const newCart = cart.map((item) =>
        item.product_id === product_id && item.size === size
          ? { ...item, quantity: Math.max(0, quantity) }
          : item
      )
      saveCart(newCart)
    },
    [cart, saveCart]
  )

  const clearCart = useCallback(() => {
    saveCart([])
  }, [saveCart])

  const total = cart.reduce((sum, item) => sum + item.price_eur * item.quantity, 0)
  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0)

  return {
    cart,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    isLoaded,
  }
}

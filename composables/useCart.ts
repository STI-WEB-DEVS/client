// composables/useCart.ts
// Manages cart state: [ { product_uuid, name, price, quantity } ]
// Persisted to localStorage so cart survives page refresh

import { ref, computed } from 'vue'

export interface CartItem {
  product_uuid: string
  name: string
  price: number
  quantity: number
}

const CART_KEY = '_cart'

const loadCart = (): CartItem[] => {
  if (import.meta.client) {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]')
    } catch {
      return []
    }
  }
  return []
}

const cart = ref<CartItem[]>(loadCart())

const saveCart = () => {
  if (import.meta.client) {
    localStorage.setItem(CART_KEY, JSON.stringify(cart.value))
  }
}

export const useCart = () => {
  const itemCount = computed(() =>
    cart.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const totalPrice = computed(() =>
    cart.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )

  const addToCart = (product: { uuid: string; name: string; price: number }, quantity: number) => {
    const existing = cart.value.find(i => i.product_uuid === product.uuid)
    if (existing) {
      existing.quantity += quantity
    } else {
      cart.value.push({
        product_uuid: product.uuid,
        name: product.name,
        price: product.price,
        quantity,
      })
    }
    saveCart()
  }

  const updateQuantity = (product_uuid: string, quantity: number) => {
    const item = cart.value.find(i => i.product_uuid === product_uuid)
    if (item) {
      item.quantity = quantity
      if (item.quantity <= 0) removeFromCart(product_uuid)
      else saveCart()
    }
  }

  const removeFromCart = (product_uuid: string) => {
    cart.value = cart.value.filter(i => i.product_uuid !== product_uuid)
    saveCart()
  }

  const clearCart = () => {
    cart.value = []
    saveCart()
  }

  // Build the payload the backend expects:
  // { customer_uuid, items: [ { product_uuid, quantity } ] }
  const buildOrderPayload = () => {
    const customer_uuid = import.meta.client ? localStorage.getItem('_uuid') : null
    return {
      customer_uuid,
      items: cart.value.map(item => ({
        product_uuid: item.product_uuid,
        quantity: item.quantity,
      })),
    }
  }

  return {
    cart,
    itemCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    buildOrderPayload,
  }
}
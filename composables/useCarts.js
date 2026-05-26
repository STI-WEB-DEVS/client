// composables/useCart.js
import { useState } from '#app'
import { computed } from 'vue' // 👈 Change this to import strictly from 'vue'

export const useCart = () => {
  const cart = useState('customer-cart', () => [])

  const addToCart = (product) => {
    const itemUuid = product.uuid || product.id || String(Math.random())
    const existingItem = cart.value.find(item => item.uuid === itemUuid)

    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({
        uuid: itemUuid,
        id: product.id || null,
        name: product.name || 'Unnamed Product',
        price: product.price !== undefined ? product.price : 0,
        image_url: product.image_url || '',
        quantity: 1
      })
    }
  }

  const removeFromCart = (uuid) => {
    cart.value = cart.value.filter(item => item.uuid !== uuid)
  }

  // Working correctly across both server and client-side renders
  const cartItemCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0)
  })

  const cartTotal = computed(() => {
    return cart.value.reduce((total, item) => total + (Number(item.price) * item.quantity), 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    cartItemCount,
    cartTotal
  }
}

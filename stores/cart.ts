import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  product_uuid: string
  name: string
  price: number
  quantity: number
}

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>([])

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.price * i.quantity, 0)
  )

  const isEmpty = computed(() => items.value.length === 0)

  function addItem(product: { uuid: string; name: string; price: number }) {
    const existing = items.value.find(i => i.product_uuid === product.uuid)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({
        product_uuid: product.uuid,
        name: product.name,
        price: product.price,
        quantity: 1,
      })
    }
  }

  function removeItem(product_uuid: string) {
    items.value = items.value.filter(i => i.product_uuid !== product_uuid)
  }

  function updateQuantity(product_uuid: string, quantity: number) {
    if (quantity < 1) return removeItem(product_uuid)
    const item = items.value.find(i => i.product_uuid === product_uuid)
    if (item) item.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  function buildOrderPayload(customer_uuid: string) {
    return {
      customer_uuid,
      items: items.value.map(i => ({
        product_uuid: i.product_uuid,
        quantity: i.quantity,
      })),
    }
  }

  return {
    items,
    totalItems,
    totalPrice,
    isEmpty,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    buildOrderPayload,
  }
})
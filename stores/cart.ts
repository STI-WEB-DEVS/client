import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface CartItem {
  product_uuid: string
  name: string
  price: number
  quantity: number
  stocks: number // available stock at time of adding
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

  function addItem(product: { uuid: string; name: string; price: number; stocks: number }) {
    const existing = items.value.find(i => i.product_uuid === product.uuid)

    if (existing) {
      if (existing.quantity >= existing.stocks) return // no more stock to add
      existing.quantity++
    } else {
      if (product.stocks < 1) return // out of stock, don't add
      items.value.push({
        product_uuid: product.uuid,
        name: product.name,
        price: product.price,
        quantity: 1,
        stocks: product.stocks,
      })
    }
  }

  function removeItem(product_uuid: string) {
    items.value = items.value.filter(i => i.product_uuid !== product_uuid)
  }

  function updateQuantity(product_uuid: string, quantity: number) {
    if (quantity < 1) return removeItem(product_uuid)
    const item = items.value.find(i => i.product_uuid === product_uuid)
    if (!item) return
    if (quantity > item.stocks) return // cap at available stock
    item.quantity = quantity
  }

  function clearCart() {
    items.value = []
  }

  // Call this after a successful order to optimistically deduct stocks
  function deductStocks() {
    items.value.forEach(item => {
      item.stocks = Math.max(0, item.stocks - item.quantity)
    })
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
    deductStocks,
    buildOrderPayload,
  }
})
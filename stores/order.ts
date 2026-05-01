// stores/order.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface OrderItem {
  product_uuid: string
  name: string
  price: number
  quantity: number
}

export interface Order {
  order_uuid: string
  customer_uuid: string
  date: string
  total: number
  items: OrderItem[]
}

export const useOrdersStore = defineStore('orders', () => {
  const orders = ref<Order[]>([])

  // Load orders from localStorage
  function loadOrders() {
    if (process.client) {
      const stored = localStorage.getItem('customer_orders')
      if (stored) {
        try {
          orders.value = JSON.parse(stored)
        } catch (e) {
          console.error('Failed to parse orders', e)
          orders.value = []
        }
      } else {
        orders.value = []
      }
    }
  }

  // Save orders to localStorage
  function saveOrders() {
    if (process.client) {
      localStorage.setItem('customer_orders', JSON.stringify(orders.value))
      console.log('Orders saved:', orders.value.length)
    }
  }

  function addOrder(customer_uuid: string, items: OrderItem[], total: number) {
    const newOrder: Order = {
      order_uuid: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
      customer_uuid,
      date: new Date().toISOString(),
      total,
      items: items.map(i => ({ ...i }))
    }
    orders.value.unshift(newOrder)
    saveOrders()
    return newOrder
  }

  function getOrdersByCustomer(customer_uuid: string) {
    // Ensure we have fresh data before filtering
    if (process.client && orders.value.length === 0) {
      loadOrders()
    }
    return orders.value.filter(o => o.customer_uuid === customer_uuid)
  }

  // Load immediately when store is created (client only)
  if (process.client) {
    loadOrders()
  }

  return { orders, addOrder, getOrdersByCustomer, loadOrders, saveOrders }
})
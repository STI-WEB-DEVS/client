import { defineStore } from 'pinia'

export interface OrderItem {
  product_uuid: string
  name: string
  price: number
  quantity: number
}

export const useOrdersStore = defineStore('orders', {
  state: () => ({
    orders: [] as any[],   // always an array
    loading: false,
    error: null as string | null,
  }),

  actions: {
    // Save orders to localStorage
    saveToLocal() {
      if (process.client) {
        localStorage.setItem('order_history', JSON.stringify(this.orders))
      }
    },

    // Load orders from localStorage
    loadOrders() {
      if (process.client) {
        const saved = localStorage.getItem('order_history')
        if (saved) {
          try {
            const parsed = JSON.parse(saved)
            this.orders = Array.isArray(parsed) ? parsed : []
          } catch {
            this.orders = []
          }
        }
      }
    },

    // Add a new order (API + fallback)
    async addOrder(customer_uuid: string, items: OrderItem[], total: number) {
      this.loading = true
      const config = useRuntimeConfig()
      
      try {
        const response = await $fetch<any>(`${config.public.apiBaseURL}/orders`, {
          method: 'POST',
          body: {
            customer_uuid,
            total_price: total,
            status: 'pending',
            items
          }
        })

        // Ensure orders is always an array
        if (!Array.isArray(this.orders)) {
          this.orders = []
        }
        this.orders.unshift(response)
        this.saveToLocal()
        return response
      } catch (err: any) {
        // Fallback: save locally if API fails
        const localOrder = {
          order_uuid: crypto.randomUUID(),
          customer_uuid,
          items,
          total,
          date: new Date().toISOString(),
          status: 'completed'
        }
        if (!Array.isArray(this.orders)) {
          this.orders = []
        }
        this.orders.unshift(localOrder)
        this.saveToLocal()
        return localOrder
      } finally {
        this.loading = false
      }
    },

    // Fetch orders from backend by customer UUID
    async fetchOrdersByCustomer(customerUuid: string) {
      this.loading = true
      const config = useRuntimeConfig()

      try {
        const response = await $fetch<any>(`${config.public.apiBaseURL}/customers/${customerUuid}/orders`)
        // Normalize response to always be an array
        if (Array.isArray(response)) {
          this.orders = response
        } else if (response?.data && Array.isArray(response.data)) {
          this.orders = response.data
        } else {
          this.orders = response ? [response] : []
        }
        this.saveToLocal()
        return this.orders
      } catch (err: any) {
        console.error('Failed to fetch orders:', err)
        this.error = 'Could not load orders'
        return []
      } finally {
        this.loading = false
      }
    },

    // Filter orders by customer UUID
    getOrdersByCustomer(customerUuid: string) {
      return Array.isArray(this.orders)
        ? this.orders.filter(o => o.customer_uuid === customerUuid)
        : []
    }
  }
})

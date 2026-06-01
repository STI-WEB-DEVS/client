// stores/products.js
import { defineStore } from 'pinia'
import ProductService from '~/api/product/ProductService'

export const useProductStore = defineStore('products', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),
  actions: {
    async fetchProducts() {
      this.loading = true
      this.error = null
      try {
        const response = await ProductService.getAll()
        this.items = response.data || response
      } catch (error) {
        console.error('Failed to fetch products:', error)
        this.error = error.message || 'Failed to load products'
      } finally {
        this.loading = false
      }
    }
  }
})
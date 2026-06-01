// api/cart/CartService.ts

export const cartService = {
    /**
     * Fetch the current logged-in user's active cart from the database
     */
    async getCart() {
      try {
        return await $fetch('/api/customer/cart', {
          method: 'GET'
        })
      } catch (error) {
        console.error('Error fetching database cart:', error)
        throw error
      }
    },
  
    /**
     * Add an item to the cart or update its quantity in the database
     * @param payload Object containing product_uuid and the target quantity
     */
    async saveOrUpdateItem(payload: { product_uuid: string; quantity: number }) {
      try {
        return await $fetch('/api/customer/cart/items', {
          method: 'POST',
          body: payload
        })
      } catch (error) {
        console.error('Error saving cart item to database:', error)
        throw error
      }
    },
  
    /**
     * Remove a specific product row completely from the user's database cart
     * @param productUuid The unique identifier of the product to delete
     */
    async removeItem(productUuid: string) {
      try {
        return await $fetch(`/api/customer/cart/items/${productUuid}`, {
          method: 'DELETE'
        })
      } catch (error) {
        console.error('Error deleting item from database cart:', error)
        throw error
      }
    },
  
    /**
     * Clear all items from the database cart (usually called right after a successful checkout)
     */
    async clearCart() {
      try {
        return await $fetch('/api/customer/cart/clear', {
          method: 'POST'
        })
      } catch (error) {
        console.error('Error clearing database cart selection:', error)
        throw error
      }
    }
  }
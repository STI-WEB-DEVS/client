import { defineStore } from 'pinia'
import OrderService from '~/api/order/OrderService'
import { useAuthStore } from './auth'

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: [], // Structure: { id, uuid, name, price, quantity }
    }),

    getters: {
        totalItems: (state) => state.items.reduce((acc, item) => acc + item.quantity, 0),
        totalPrice: (state) => state.items.reduce((acc, item) => acc + (item.price * item.quantity), 0),
    },

    actions: {
        addToCart(product) {
            const existingItem = this.items.find(item => item.id === product.id)
            if (existingItem) {
                existingItem.quantity++
            } else {
                this.items.push({ ...product, quantity: 1 })
            }
            // Persist cart to localStorage
            this.saveCart()
        },

        increaseQty(productId) {
            const item = this.items.find(item => item.id === productId)
            if (item) {
                item.quantity++
                this.saveCart()
            }
        },

        decreaseQty(productId) {
            const item = this.items.find(item => item.id === productId)
            if (item) {
                item.quantity--
                if (item.quantity <= 0) {
                    this.removeFromCart(productId)
                } else {
                    this.saveCart()
                }
            }
        },

        removeFromCart(productId) {
            this.items = this.items.filter(item => item.id !== productId)
            this.saveCart()
        },

        saveCart() {
            localStorage.setItem('_cart', JSON.stringify(this.items))
        },

        loadCart() {
            const savedCart = localStorage.getItem('_cart')
            if (savedCart) {
                this.items = JSON.parse(savedCart)
            }
        },

        clearCart() {
            this.items = []
            localStorage.removeItem('_cart')
        },

        async checkout() {
            if (this.items.length === 0) {
                throw new Error('Your cart is empty!')
            }

            const authStore = useAuthStore()
            
            if (!authStore.user) {
                throw new Error('You must be logged in to checkout')
            }

            if (!authStore.user.customer_uuid) {
                throw new Error('Please log out and log back in to complete your profile setup, then try again.')
            }

            try {
                // Prepare order data
                const orderData = {
                    customer_uuid: authStore.user.customer_uuid,
                    total_price: this.totalPrice,
                    items: this.items.map(item => ({
                        product_uuid: item.uuid,
                        quantity: item.quantity,
                        price: item.price
                    }))
                }

                // Send order to backend
                const response = await OrderService.createOrder(orderData)

                // Clear cart after successful order
                this.clearCart()

                return response
            } catch (error) {
                console.error('Checkout error:', error)
                throw error
            }
        }
    }
})

// composables/useCart.ts
import { ref, computed, onMounted } from 'vue'

interface Product {
  uuid: string
  name: string
  price: number | string
  category?: string
}

interface CartItem {
  product: Product
  quantity: number
}

// Global reactive state shared across components
const cart = ref<CartItem[]>([])

// Helper function to update browser local storage safely
const saveToLocalStorage = () => {
  if (process.client) {
    localStorage.setItem('my_store_cart', JSON.stringify(cart.value))
  }
}

// Helper function to retrieve browser local storage data safely
const loadFromLocalStorage = () => {
  if (process.client) {
    const savedCart = localStorage.getItem('my_store_cart')
    if (savedCart) {
      try {
        cart.value = JSON.parse(savedCart)
      } catch (error) {
        console.error('Failed to parse cart data from localStorage:', error)
        cart.value = []
      }
    }
  }
}

// Trigger initial storage sync immediately on the client side
if (process.client) {
  loadFromLocalStorage()
}

export const useCart = () => {
  // Add a product or increment its quantity if it already exists
  const addToCart = (product: Product) => {
    const existingItem = cart.value.find(item => item.product.uuid === product.uuid)
    
    if (existingItem) {
      existingItem.quantity++
    } else {
      cart.value.push({ product, quantity: 1 })
    }
    saveToLocalStorage()
  }

  // Remove an item entirely from the cart
  const removeFromCart = (uuid: string) => {
    cart.value = cart.value.filter(item => item.product.uuid !== uuid)
    saveToLocalStorage()
  }

  // Update specific item quantity directly
  const updateQuantity = (uuid: string, quantity: number) => {
    const item = cart.value.find(item => item.product.uuid === uuid)
    if (item) {
      item.quantity = Math.max(1, quantity)
      saveToLocalStorage()
    }
  }

  // Clear the entire cart (useful after a successful checkout)
  const clearCart = () => {
    cart.value = []
    saveToLocalStorage()
  }

  // Computed total item count for the navbar badge
  const totalItems = computed(() => {
    return cart.value.reduce((sum, item) => sum + item.quantity, 0)
  })

  // Computed financial subtotal
  const subtotal = computed(() => {
    return cart.value.reduce((sum, item) => {
      return sum + (Number(item.product.price) * item.quantity)
    }, 0)
  })

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    totalItems,
    subtotal
  }
}

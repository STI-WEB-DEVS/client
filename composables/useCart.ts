import { ref, computed, readonly } from 'vue'

// Create a singleton instance outside the composable
type CartItem = {
    product_uuid: string
    name: string
    price: number
    quantity: number
    maxStock: number
}

const CART_STORAGE_KEY = 'cart_items'
const LEGACY_CART_STORAGE_KEY = 'cart'

const cartItemsRef = ref<CartItem[]>([])
const notificationRef = ref<{ message: string; type: string } | null>(null)
const cartBadgeAnimationRef = ref(false)

export const useCart = () => {
    const showNotification = (message: string, type = 'success') => {
        notificationRef.value = { message, type }
        setTimeout(() => {
            notificationRef.value = null
        }, 2500)
    }

    const triggerCartBadge = () => {
        cartBadgeAnimationRef.value = true
        setTimeout(() => {
            cartBadgeAnimationRef.value = false
        }, 300)
    }

    const normalizeCartItem = (item: any): CartItem | null => {
        const productUuid = item?.product_uuid || item?.uuid

        if (!productUuid || !item?.name) {
            return null
        }

        return {
            product_uuid: String(productUuid),
            name: String(item.name),
            price: Number(item.price) || 0,
            quantity: Math.max(1, Number(item.quantity) || 1),
            maxStock: Math.max(0, Number(item.maxStock ?? item.stock_quantity ?? item.quantity) || 0),
        }
    }

    const readStoredCart = () => {
        if (typeof localStorage === 'undefined') {
            return null
        }

        return localStorage.getItem(CART_STORAGE_KEY) || localStorage.getItem(LEGACY_CART_STORAGE_KEY)
    }

    const loadCart = () => {
        const saved = readStoredCart()

        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                cartItemsRef.value = Array.isArray(parsed)
                    ? parsed.map(normalizeCartItem).filter(Boolean) as CartItem[]
                    : []

                if (typeof localStorage !== 'undefined') {
                    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItemsRef.value))
                    localStorage.removeItem(LEGACY_CART_STORAGE_KEY)
                }
            } catch (e) {
                console.error('Error loading cart:', e)
                cartItemsRef.value = []
            }
        } else {
            cartItemsRef.value = []
        }
    }

    const saveCart = () => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItemsRef.value))
            localStorage.removeItem(LEGACY_CART_STORAGE_KEY)
        }

        triggerCartBadge()
        
        // Dispatch event for other components
        if (typeof window !== 'undefined') {
            window.dispatchEvent(new CustomEvent('cart-updated', { 
                detail: { 
                    items: cartItemsRef.value, 
                    total: totalItems.value 
                } 
            }))
        }
    }

    const addItem = (product: any, quantity = 1) => {
        const productUuid = product?.uuid || product?.product_uuid
        const stockQuantity = Number(product?.stock_quantity ?? product?.maxStock ?? 0)

        if (!productUuid) {
            showNotification('Unable to add product to cart', 'error')
            return false
        }

        if (stockQuantity <= 0) {
            showNotification('This product is out of stock', 'error')
            return false
        }

        // Check if product exists by UUID
        const existingIndex = cartItemsRef.value.findIndex(item => item.product_uuid === productUuid)
        
        // Validate stock
        const currentQuantity = existingIndex !== -1 ? cartItemsRef.value[existingIndex].quantity : 0
        const newQuantity = currentQuantity + quantity
        
        if (newQuantity > stockQuantity) {
            showNotification(`Only ${stockQuantity} items available in stock`, 'error')
            return false
        }
        
        if (existingIndex !== -1) {
            // Update existing
            cartItemsRef.value[existingIndex].quantity = newQuantity
            cartItemsRef.value[existingIndex].maxStock = stockQuantity
            showNotification(`Updated ${product.name} to ${cartItemsRef.value[existingIndex].quantity} in cart`, 'success')
        } else {
            // Add new item
            const newItem = {
                product_uuid: productUuid,
                name: product.name,
                price: parseFloat(product.price),
                quantity: quantity,
                maxStock: stockQuantity,
            }
            cartItemsRef.value.push(newItem)
            showNotification(`${quantity} x ${product.name} added to cart!`, 'success')
        }
        
        // Force reactivity by creating a new reference
        cartItemsRef.value = [...cartItemsRef.value]
        
        saveCart()
        
        return true
    }

    const updateQuantity = (productUuid: string, quantity: number) => {
        const itemIndex = cartItemsRef.value.findIndex(i => i.product_uuid === productUuid)
        
        if (itemIndex !== -1) {
            const item = cartItemsRef.value[itemIndex]
            
            if (quantity <= 0) {
                cartItemsRef.value.splice(itemIndex, 1)
                showNotification(`Removed ${item.name} from cart`, 'info')
            } else if (quantity > item.maxStock) {
                showNotification(`Only ${item.maxStock} items available in stock`, 'error')
                return
            } else {
                cartItemsRef.value[itemIndex].quantity = quantity
                showNotification(`Updated ${item.name} to ${quantity}`, 'success')
            }
            // Force reactivity
            cartItemsRef.value = [...cartItemsRef.value]
            saveCart()
        }
    }

    const removeItem = (productUuid: string) => {
        const itemIndex = cartItemsRef.value.findIndex(i => i.product_uuid === productUuid)
        
        if (itemIndex !== -1) {
            const itemName = cartItemsRef.value[itemIndex].name
            cartItemsRef.value.splice(itemIndex, 1)
            cartItemsRef.value = [...cartItemsRef.value]
            showNotification(`Removed ${itemName} from cart`, 'info')
            saveCart()
        }
    }

    const syncItemStock = (product: any) => {
        const productUuid = product?.uuid || product?.product_uuid
        const itemIndex = cartItemsRef.value.findIndex(i => i.product_uuid === productUuid)

        if (itemIndex === -1) {
            return
        }

        cartItemsRef.value[itemIndex] = {
            ...cartItemsRef.value[itemIndex],
            name: product.name ?? cartItemsRef.value[itemIndex].name,
            price: Number(product.price ?? cartItemsRef.value[itemIndex].price),
            maxStock: Math.max(0, Number(product.stock_quantity ?? product.maxStock ?? 0)),
        }
        cartItemsRef.value = [...cartItemsRef.value]
        saveCart()
    }

    const clearCart = () => {
        cartItemsRef.value = []
        cartItemsRef.value = [...cartItemsRef.value]
        saveCart()
        showNotification('Cart cleared', 'info')
    }

    // Get item count for a specific product
    const getItemQuantity = (productUuid: string) => {
        const item = cartItemsRef.value.find(i => i.product_uuid === productUuid)
        return item ? item.quantity : 0
    }

    // Check if product is in cart
    const isInCart = (productUuid: string) => {
        return cartItemsRef.value.some(i => i.product_uuid === productUuid)
    }

    // Computed properties
    const totalItems = computed(() => {
        return cartItemsRef.value.reduce((sum, i) => sum + (i.quantity || 0), 0)
    })
    
    const totalPrice = computed(() => {
        return cartItemsRef.value.reduce((sum, i) => sum + ((i.price || 0) * (i.quantity || 0)), 0)
    })
    
    const formattedTotal = computed(() => `₱${totalPrice.value.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`)

    return {
        cartItems: readonly(cartItemsRef),
        totalItems,
        totalPrice,
        formattedTotal,
        notification: readonly(notificationRef),
        cartBadgeAnimation: readonly(cartBadgeAnimationRef),
        loadCart,
        addItem,
        updateQuantity,
        removeItem,
        syncItemStock,
        clearCart,
        getItemQuantity,
        isInCart
    }
}

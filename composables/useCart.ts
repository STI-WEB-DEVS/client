import { ref, computed, readonly } from 'vue'

// Create a singleton instance outside the composable
const cartItemsRef = ref([])
const notificationRef = ref(null)
const cartBadgeAnimationRef = ref(false)

export const useCart = () => {
    const showNotification = (message, type = 'success') => {
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

    const loadCart = () => {
        const saved = localStorage.getItem('cart_items')
        console.log('loadCart called. localStorage:', saved)
        
        if (saved) {
            try {
                const parsed = JSON.parse(saved)
                cartItemsRef.value = parsed
                console.log('Cart loaded. Items count:', cartItemsRef.value.length)
                console.log('Products:', cartItemsRef.value.map(i => i.name))
            } catch (e) {
                console.error('Error loading cart:', e)
                cartItemsRef.value = []
            }
        } else {
            cartItemsRef.value = []
        }
    }

    const saveCart = () => {
        console.log('saveCart called. Saving items:', cartItemsRef.value.length)
        localStorage.setItem('cart_items', JSON.stringify(cartItemsRef.value))
        triggerCartBadge()
        
        // Force a small delay to ensure DOM updates
        setTimeout(() => {
            console.log('Cart saved. Total items now:', totalItems.value)
        }, 50)
    }

    const addItem = (product, quantity = 1) => {
        console.log('=== ADDING ITEM ===')
        console.log('Product:', product.name)
        console.log('Current cart before:', [...cartItemsRef.value])
        
        // Check if product exists
        const existingIndex = cartItemsRef.value.findIndex(item => item.product_uuid === product.uuid)
        
        if (existingIndex !== -1) {
            // Update existing
            cartItemsRef.value[existingIndex].quantity += quantity
            console.log('Updated existing. New quantity:', cartItemsRef.value[existingIndex].quantity)
            showNotification(`Updated ${product.name} to ${cartItemsRef.value[existingIndex].quantity}`, 'success')
        } else {
            // Add new
            const newItem = {
                product_uuid: product.uuid,
                name: product.name,
                price: product.price,
                quantity: quantity,
                addedAt: Date.now()
            }
            cartItemsRef.value.push(newItem)
            console.log('Added new. Total items now:', cartItemsRef.value.length)
            showNotification(`Added ${product.name} to cart!`, 'success')
        }
        
        // Force reactivity by creating a new reference
        cartItemsRef.value = [...cartItemsRef.value]
        
        console.log('Cart after add:', cartItemsRef.value.map(i => `${i.name} (${i.quantity})`))
        saveCart()
        
        return true
    }

    const updateQuantity = (productUuid, quantity) => {
        const itemIndex = cartItemsRef.value.findIndex(i => i.product_uuid === productUuid)
        
        if (itemIndex !== -1) {
            if (quantity <= 0) {
                const itemName = cartItemsRef.value[itemIndex].name
                cartItemsRef.value.splice(itemIndex, 1)
                showNotification(`Removed ${itemName} from cart`, 'info')
            } else {
                cartItemsRef.value[itemIndex].quantity = quantity
                showNotification(`Updated ${cartItemsRef.value[itemIndex].name} to ${quantity}`, 'success')
            }
            // Force reactivity
            cartItemsRef.value = [...cartItemsRef.value]
            saveCart()
        }
    }

    const removeItem = (productUuid) => {
        const itemIndex = cartItemsRef.value.findIndex(i => i.product_uuid === productUuid)
        
        if (itemIndex !== -1) {
            const itemName = cartItemsRef.value[itemIndex].name
            cartItemsRef.value.splice(itemIndex, 1)
            cartItemsRef.value = [...cartItemsRef.value]
            showNotification(`Removed ${itemName} from cart`, 'info')
            saveCart()
        }
    }

    const clearCart = () => {
        cartItemsRef.value = []
        saveCart()
        showNotification('Cart cleared', 'info')
    }

    // Computed properties
    const totalItems = computed(() => {
        const total = cartItemsRef.value.reduce((sum, i) => sum + i.quantity, 0)
        console.log('totalItems computed (reactive):', total)
        return total
    })
    
    const totalPrice = computed(() => {
        return cartItemsRef.value.reduce((sum, i) => sum + (i.price * i.quantity), 0)
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
        clearCart
    }
}
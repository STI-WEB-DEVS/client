import { ref, computed } from 'vue'

export const useCart = () => {
    const cartItems = ref([])
    const notification = ref(null)
    const cartBadgeAnimation = ref(false)

    const showNotification = (message, type = 'success') => {
        notification.value = { message, type }
        setTimeout(() => {
            notification.value = null
        }, 2500)
    }

    const triggerCartBadge = () => {
        cartBadgeAnimation.value = true
        setTimeout(() => {
            cartBadgeAnimation.value = false
        }, 300)
    }

    const loadCart = () => {
        const saved = localStorage.getItem('cart_items')
        if (saved) {
            try {
                cartItems.value = JSON.parse(saved)
                console.log('Cart loaded:', cartItems.value.length, 'items')
                console.log('Items in cart:', cartItems.value.map(i => i.name))
            } catch (e) {
                console.error('Error loading cart:', e)
                cartItems.value = []
            }
        } else {
            console.log('No cart found in localStorage')
            cartItems.value = []
        }
    }

    const saveCart = () => {
        localStorage.setItem('cart_items', JSON.stringify(cartItems.value))
        console.log('Cart saved:', cartItems.value.length, 'items')
        triggerCartBadge()
    }

    const addItem = (product, quantity = 1) => {
        console.log('Adding to cart:', product.name, 'UUID:', product.uuid, 'Quantity:', quantity)
        
        // Check if product already exists in cart by UUID
        const existing = cartItems.value.find(item => item.product_uuid === product.uuid)
        
        if (existing) {
            // Update existing item quantity
            existing.quantity += quantity
            console.log('Updated existing item:', existing.name, 'new quantity:', existing.quantity)
            showNotification(`Updated ${product.name} quantity to ${existing.quantity}`, 'success')
        } else {
            // Add new item to cart (accumulating, not overwriting)
            const newItem = {
                product_uuid: product.uuid,
                name: product.name,
                price: product.price,
                quantity: quantity,
                addedAt: Date.now()
            }
            cartItems.value.push(newItem)
            console.log('Added NEW item to cart:', product.name)
            console.log('Total items in cart now:', cartItems.value.length)
            console.log('Cart contents:', cartItems.value.map(i => i.name))
            showNotification(`Added ${product.name} to cart!`, 'success')
        }
        
        saveCart()
        return true
    }

    const updateQuantity = (productUuid, quantity) => {
        const item = cartItems.value.find(i => i.product_uuid === productUuid)
        if (item) {
            if (quantity <= 0) {
                cartItems.value = cartItems.value.filter(i => i.product_uuid !== productUuid)
                console.log('Removed item:', item.name)
                showNotification(`Removed ${item.name} from cart`, 'info')
            } else {
                item.quantity = quantity
                console.log('Updated quantity for:', item.name, 'to', quantity)
                showNotification(`Updated ${item.name} quantity to ${quantity}`, 'success')
            }
            saveCart()
        }
    }

    const removeItem = (productUuid) => {
        const item = cartItems.value.find(i => i.product_uuid === productUuid)
        if (item) {
            cartItems.value = cartItems.value.filter(i => i.product_uuid !== productUuid)
            console.log('Removed item:', item.name)
            showNotification(`Removed ${item.name} from cart`, 'info')
            saveCart()
        }
    }

    const clearCart = () => {
        console.log('Clearing entire cart')
        cartItems.value = []
        saveCart()
        showNotification('Cart cleared', 'info')
    }

    const totalItems = computed(() => {
        const total = cartItems.value.reduce((sum, i) => sum + i.quantity, 0)
        return total
    })
    
    const totalPrice = computed(() => {
        return cartItems.value.reduce((sum, i) => sum + (i.price * i.quantity), 0)
    })
    
    const formattedTotal = computed(() => `₱${totalPrice.value.toLocaleString('en-PH', { minimumFractionDigits: 2 })}`)

    return {
        cartItems,
        totalItems,
        totalPrice,
        formattedTotal,
        notification,
        cartBadgeAnimation,
        loadCart,
        addItem,
        updateQuantity,
        removeItem,
        clearCart
    }
}
// composables/useCart.ts
// Global cart state shared across all components

export interface CartItem {
  product_uuid: string
  name: string
  price: number
  quantity: number
  stock_quantity: number
}

export const useCart = () => {
  const cartItems = useState<CartItem[]>('cart_items', () => [])
  const newItemAdded = useState<boolean>('cart_new_item', () => false)

  // Used to pass items to the checkout page if bypassing the main cart
  const directCheckoutItems = useState<CartItem[]>('direct_checkout_items', () => [])

  const addToCart = (product: { uuid: string; name: string; price: number; stock_quantity: number }) => {
    const existing = cartItems.value.find((i) => i.product_uuid === product.uuid)
    if (existing) {
      if (existing.quantity < product.stock_quantity) {
        existing.quantity += 1
      }
    } else {
      if (product.stock_quantity > 0) {
        cartItems.value.push({
          product_uuid: product.uuid,
          name: product.name,
          price: product.price,
          quantity: 1,
          stock_quantity: product.stock_quantity,
        })
      }
    }
    newItemAdded.value = true
  }

  const removeFromCart = (product_uuid: string) => {
    cartItems.value = cartItems.value.filter((i) => i.product_uuid !== product_uuid)
  }

  const updateQuantity = (product_uuid: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(product_uuid)
      return
    }
    const item = cartItems.value.find((i) => i.product_uuid === product_uuid)
    if (item && quantity <= item.stock_quantity) {
      item.quantity = quantity
    }
  }

  const clearCart = () => {
    cartItems.value = []
    newItemAdded.value = false
  }

  const cartCount = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
  )

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  )



  // Build the order payload that the backend expects
  // POST /orders => { customer_uuid, items: [{ product_uuid, quantity }] }
  const buildOrderPayload = (customerUuid: string) => {
    return {
      customer_uuid: customerUuid,
      items: cartItems.value.map((item) => ({
        product_uuid: item.product_uuid,
        quantity: item.quantity,
      })),
    }
  }

  return {
    cartItems,
    cartCount,
    cartTotal,
    newItemAdded,
    directCheckoutItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    buildOrderPayload,
  }
}

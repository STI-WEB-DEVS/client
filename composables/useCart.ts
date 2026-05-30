interface CartItem {
  product_uuid: string;
  name: string;
  price: number;
  quantity: number;
  stock: number;
}

const cartItems = ref<CartItem[]>([]);

export const useCart = () => {
  const addToCart = (product: { uuid: string; name: string; price: number; stock: number }, qty: number = 1) => {
    const existing = cartItems.value.find((item) => item.product_uuid === product.uuid);
    const availableStock = typeof product.stock === 'number' ? product.stock : parseInt(product.stock as any) || 0;
    if (existing) {
      if (existing.quantity + qty > availableStock) {
        existing.quantity = availableStock;
      } else {
        existing.quantity += qty;
      }
    } else {
      cartItems.value.push({
        product_uuid: product.uuid,
        name: product.name,
        price: product.price,
        quantity: Math.min(qty, availableStock),
        stock: availableStock,
      });
    }
  };

  const removeFromCart = (productUuid: string) => {
    cartItems.value = cartItems.value.filter((item) => item.product_uuid !== productUuid);
  };

  const updateQuantity = (productUuid: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productUuid);
      return;
    }
    const item = cartItems.value.find((i) => i.product_uuid === productUuid);
    if (item) {
      if (quantity > item.stock) {
        item.quantity = item.stock;
      } else {
        item.quantity = quantity;
      }
    }
  };

  const clearCart = () => {
    cartItems.value = [];
  };

  const cartCount = computed(() => cartItems.value.reduce((sum, item) => sum + item.quantity, 0));

  const cartTotal = computed(() =>
    cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  );

  const buildOrderPayload = () => {
    const customerUuid = localStorage.getItem('_customer_uuid') || '';
    return {
      customer_uuid: customerUuid,
      items: cartItems.value.map((item) => ({
        product_uuid: item.product_uuid,
        quantity: item.quantity,
      })),
    };
  };

  return {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartCount,
    cartTotal,
    buildOrderPayload,
  };
};

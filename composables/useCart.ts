export const useCart = () => {
  const cart = useState('customerCart', () => []);

  const addToCart = (product: any, quantity: number = 1) => {
    const existingItem = cart.value.find((item: any) => item.product.uuid === product.uuid);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.value.push({
        product: { ...product },
        quantity
      });
    }
  };

  const removeFromCart = (productUuid: string) => {
    const index = cart.value.findIndex((item: any) => item.product.uuid === productUuid);
    if (index > -1) {
      cart.value.splice(index, 1);
    }
  };

  const updateQuantity = (productUuid: string, quantity: number) => {
    const item = cart.value.find((item: any) => item.product.uuid === productUuid);
    if (item && quantity > 0) {
      item.quantity = quantity;
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const cartTotal = computed(() => {
    return cart.value.reduce((total: number, item: any) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  });

  const cartItemCount = computed(() => {
    return cart.value.reduce((total: number, item: any) => total + item.quantity, 0);
  });

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount
  };
};

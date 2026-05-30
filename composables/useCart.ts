export const useCart = () => {
  const cart = useState('customerCart', () => []);

  const addToCart = (product: any, quantity: number = 1) => {
    // Check if product has stock
    if (product.quantity === 0) {
      throw new Error(`${product.name} is out of stock`);
    }

    const existingItem = cart.value.find((item: any) => item.product.uuid === product.uuid);
    
    if (existingItem) {
      // Check if adding would exceed available stock
      if (existingItem.quantity + quantity > product.quantity) {
        throw new Error(`Cannot add more. Only ${product.quantity} items available for ${product.name}`);
      }
      existingItem.quantity += quantity;
    } else {
      // Check if initial quantity exceeds stock
      if (quantity > product.quantity) {
        throw new Error(`Cannot add ${quantity} items. Only ${product.quantity} available for ${product.name}`);
      }
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
      // Validate against available stock
      if (quantity > item.product.quantity) {
        throw new Error(`Cannot set quantity to ${quantity}. Only ${item.product.quantity} items available`);
      }
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

  const validateCartStock = () => {
    const errors: string[] = [];
    
    cart.value.forEach((item: any) => {
      if (item.product.quantity === 0) {
        errors.push(`${item.product.name} is out of stock`);
      } else if (item.quantity > item.product.quantity) {
        errors.push(`Only ${item.product.quantity} items available for ${item.product.name}`);
      }
    });

    return errors;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    cartTotal,
    cartItemCount,
    validateCartStock
  };
};

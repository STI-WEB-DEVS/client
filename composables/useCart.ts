export interface CartItem {
  product_uuid: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => []);

  const addToCart = (product: { uuid: string; name: string; price: number; image?: string }, quantity: number = 1) => {
    const existingItem = cart.value.find(item => item.product_uuid === product.uuid);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.value.push({
        product_uuid: product.uuid,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image
      });
    }
    return 'Added to Cart Successfully';
  };

  const removeFromCart = (product_uuid: string) => {
    cart.value = cart.value.filter(item => item.product_uuid !== product_uuid);
  };

  const updateQuantity = (product_uuid: string, quantity: number) => {
    const item = cart.value.find(item => item.product_uuid === product_uuid);
    if (item) {
      if (quantity <= 0) {
        removeFromCart(product_uuid);
      } else {
        item.quantity = quantity;
      }
    }
  };

  const clearCart = () => {
    cart.value = [];
  };

  const getCartTotal = () => {
    return cart.value.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const getCartItems = () => {
    return cart.value.map(item => ({
      product_uuid: item.product_uuid,
      quantity: item.quantity
    }));
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItems
  };
};

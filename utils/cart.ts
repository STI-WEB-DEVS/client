export const getCart = () => {
  if (process.server) return [];

  return JSON.parse(localStorage.getItem('_cart') || '[]');
};

export const setCart = (cart: any[]) => {
  if (process.server) return;

  localStorage.setItem('_cart', JSON.stringify(cart));
};

export const addToCart = (product: any, quantityToAdd: number = 1) => {
  if (process.server) return;

  if (product.quantity <= 0 || quantityToAdd <= 0) return;

  const cart = getCart();

  const existingItem = cart.find((item: any) => item.uuid === product.uuid);

  if (existingItem) {
    if (existingItem.quantity + quantityToAdd <= product.quantity) {
      existingItem.quantity += quantityToAdd;
    } else {
      existingItem.quantity = product.quantity;
    }
  } else {
    cart.push({
      ...product,
      quantity: quantityToAdd > product.quantity ? product.quantity : quantityToAdd,
    });
  }

  setCart(cart);
};

export const clearCart = () => {
  if (process.server) return;

  localStorage.removeItem('_cart');
};
export const getCart = () => {
  if (process.server) return [];

  return JSON.parse(localStorage.getItem('_cart') || '[]');
};

export const setCart = (cart: any[]) => {
  if (process.server) return;

  localStorage.setItem('_cart', JSON.stringify(cart));
};

export const addToCart = (product: any) => {
  if (process.server) return;

  const cart = getCart();

  const existingItem = cart.find((item: any) => item.uuid === product.uuid);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      ...product,
      quantity: 1,
    });
  }

  setCart(cart);
};

export const clearCart = () => {
  if (process.server) return;

  localStorage.removeItem('_cart');
};
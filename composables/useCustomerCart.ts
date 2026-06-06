type CartItem = {
  product_uuid: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  quantity: number;
};

const CART_KEY = "_customer_cart";

const cartItems = ref<CartItem[]>([]);

const readCart = () => {
  if (!import.meta.client) return;

  const savedCart = localStorage.getItem(CART_KEY);
  cartItems.value = savedCart ? JSON.parse(savedCart) : [];
};

const writeCart = () => {
  if (!import.meta.client) return;

  localStorage.setItem(CART_KEY, JSON.stringify(cartItems.value));
  window.dispatchEvent(new CustomEvent("customer-cart-updated"));
};

export const useCustomerCart = () => {
  const count = computed(() => cartItems.value.reduce((total, item) => total + item.quantity, 0));
  const total = computed(() => cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0));

  const addItem = (product: any) => {
    const productUuid = product.uuid;
    const stock = Number(product.stock || 0);

    if (!productUuid || stock < 1) return false;

    const existingItem = cartItems.value.find((item) => item.product_uuid === productUuid);

    if (existingItem) {
      existingItem.stock = stock;
      if (existingItem.quantity >= stock) return false;

      existingItem.quantity += 1;
    } else {
      cartItems.value.push({
        product_uuid: productUuid,
        name: product.name,
        description: product.description || "",
        price: Number(product.price || 0),
        stock,
        quantity: 1,
      });
    }

    writeCart();
    return true;
  };

  const updateQuantity = (productUuid: string, quantity: number) => {
    const item = cartItems.value.find((cartItem) => cartItem.product_uuid === productUuid);

    if (!item) return false;

    const nextQuantity = Math.max(1, Math.min(quantity, item.stock));
    item.quantity = nextQuantity;
    writeCart();
    return quantity <= item.stock;
  };

  const removeItem = (productUuid: string) => {
    cartItems.value = cartItems.value.filter((item) => item.product_uuid !== productUuid);
    writeCart();
  };

  const clearCart = () => {
    cartItems.value = [];
    writeCart();
  };

  const buildOrderPayload = () => ({
    customer_uuid: localStorage.getItem("_customer_uuid") || "",
    items: cartItems.value.map((item) => ({
      product_uuid: item.product_uuid,
      quantity: item.quantity,
    })),
  });

  return {
    cartItems,
    count,
    total,
    readCart,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    buildOrderPayload,
  };
};

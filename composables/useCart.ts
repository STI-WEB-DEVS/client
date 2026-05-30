export type Product = {
  uuid: string;
  name: string;
  price: number;
  quantity: number; // Stock quantity
  description?: string;
  imageUrl?: string;
};

export type CartItem = {
  uuid: string;
  name: string;
  price: number;
  quantity: number; // Cart quantity (how many in cart)
  description?: string;
  imageUrl?: string;
};

const CART_STORAGE_KEY = "customer_cart";

const clampInt = (value: unknown, min: number, max: number) => {
  const n = Number.parseInt(String(value), 10);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
};

export const useCart = () => {
  const cart = useState<CartItem[]>("customer_cart_state", () => []);
  const hydrated = useState<boolean>("customer_cart_hydrated", () => false);

  onMounted(() => {
    if (hydrated.value) return;

    try {
      const raw = localStorage.getItem(CART_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          cart.value = parsed
            .filter((i) => i && typeof i === "object")
            .map((i: any) => ({
              uuid: String(i.uuid || ""),
              name: String(i.name || ""),
              price: Number(i.price || 0),
              quantity: clampInt(i.quantity, 1, 999),
              description: i.description ? String(i.description) : undefined,
              imageUrl: i.imageUrl ? String(i.imageUrl) : undefined,
            }))
            .filter((i) => i.uuid && i.name);
        }
      }
    } catch {
      cart.value = [];
    } finally {
      hydrated.value = true;
    }
  });

  watch(
    cart,
    (value) => {
      if (!process.client) return;
      if (!hydrated.value) return;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(value));
    },
    { deep: true },
  );

  const addItem = (product: Product, quantity = 1) => {
    const q = clampInt(quantity, 1, 999);
    const idx = cart.value.findIndex((i) => i.uuid === product.uuid);
    
    // Check stock availability
    const availableStock = product.quantity || 0;
    const currentCartQuantity = idx >= 0 ? cart.value[idx].quantity : 0;
    const totalRequested = currentCartQuantity + q;

    if (availableStock < totalRequested) {
      throw new Error(`Cannot add ${q} units. Only ${availableStock - currentCartQuantity} units available.`);
    }

    if (idx >= 0) {
      cart.value[idx] = {
        ...cart.value[idx],
        quantity: clampInt(totalRequested, 1, Math.min(999, availableStock)),
      };
      return;
    }

    // Add new item to cart (without the stock quantity field in cart storage)
    cart.value.push({ 
      uuid: product.uuid,
      name: product.name,
      price: product.price,
      quantity: q,
      description: product.description,
      imageUrl: product.imageUrl,
    });
  };

  const removeItem = (productUuid: string) => {
    cart.value = cart.value.filter((i) => i.uuid !== productUuid);
  };

  const setQuantity = (productUuid: string, quantity: number) => {
    const q = clampInt(quantity, 1, 999);
    const idx = cart.value.findIndex((i) => i.uuid === productUuid);
    if (idx < 0) return;
    
    cart.value[idx] = { ...cart.value[idx], quantity: q };
  };

  const clear = () => {
    cart.value = [];
  };

  const totalItems = computed(() =>
    cart.value.reduce((sum, i) => sum + i.quantity, 0),
  );
  const totalPrice = computed(() =>
    cart.value.reduce((sum, i) => sum + i.quantity * i.price, 0),
  );

  return {
    cart,
    hydrated,
    addItem,
    removeItem,
    setQuantity,
    clear,
    totalItems,
    totalPrice,
  };
};

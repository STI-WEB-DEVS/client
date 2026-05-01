export type Product = {
  uuid: string;
  name: string;
  price: number;
  description?: string;
  imageUrl?: string;
};

export type CartItem = Product & {
  quantity: number;
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
              description: i.description ? String(i.description) : undefined,
              imageUrl: i.imageUrl ? String(i.imageUrl) : undefined,
              quantity: clampInt(i.quantity, 1, 999),
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
    if (idx >= 0) {
      cart.value[idx] = {
        ...cart.value[idx],
        quantity: clampInt(cart.value[idx].quantity + q, 1, 999),
      };
      return;
    }

    cart.value.push({ ...product, quantity: q });
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

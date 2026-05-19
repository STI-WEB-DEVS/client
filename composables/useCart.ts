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

const isProduct = (item: unknown): item is Product => {
  return (
    item !== null &&
    typeof item === "object" &&
    typeof (item as any).uuid === "string" &&
    (item as any).uuid.length > 0 &&
    typeof (item as any).name === "string" &&
    (item as any).name.length > 0 &&
    typeof (item as any).price === "number"
  );
};

const CART_STORAGE_KEY = "customer_cart";

const clampInt = (value: unknown, min: number, max: number) => {
  const n = Number.parseInt(String(value), 10);
  if (Number.isNaN(n)) return min;
  return Math.min(max, Math.max(min, n));
};

export const useCart = () => {
  // Use Nuxt useState to keep cart state synchronized across components
  const cart = useState<CartItem[]>("customer_cart_state", () => []);
  const hydrated = useState<boolean>("customer_cart_hydrated", () => false);

  // Load from localStorage only on the client once mounted
  onMounted(() => {
    if (hydrated.value) return;

    try {
      if (import.meta.client) {
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
      }
    } catch (e) {
      console.error("Failed to parse cart from storage", e);
      cart.value = [];
    } finally {
      hydrated.value = true;
    }
  });

  // Watcher: Use import.meta.client instead of process.client to resolve TS(2591)
  watch(
    cart,
    (value) => {
      if (!import.meta.client) return;
      if (!hydrated.value) return;
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(value));
    },
    { deep: true },
  );

  const addItem = (product: Product, quantity = 1) => {
    if (!isProduct(product)) return;

    const q = clampInt(quantity, 1, 999);
    const index = cart.value.findIndex((i) => i.uuid === product.uuid);
    
    if (index >= 0) {
      const existing = cart.value[index];
      if (!existing) return;

      // Re-assignment within reactive array
      cart.value[index] = {
        ...existing,
        quantity: clampInt(existing.quantity + q, 1, 999),
      };
      return;
    }

    cart.value.push({
      uuid: product.uuid,
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      quantity: q,
    });
  };

  const removeItem = (productUuid: string) => {
    cart.value = cart.value.filter((i) => i.uuid !== productUuid);
  };

  const setQuantity = (productUuid: string, quantity: number) => {
    const q = clampInt(quantity, 1, 999);
    const index = cart.value.findIndex((i) => i.uuid === productUuid);
    if (index < 0) return;

    const existing = cart.value[index];
    if (!existing) return;
    
    cart.value[index] = { ...existing, quantity: q };
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
export interface CartItem {
  uuid: string;
  name: string;
  price: number;
  quantity: number;
}

const CART_KEY = '_cart';

class CartService {
  private static instance: CartService;

  public static getInstance(): CartService {
    if (!CartService.instance) {
      CartService.instance = new CartService();
    }
    return CartService.instance;
  }

  getItems(): CartItem[] {
    if (typeof window === 'undefined') return [];
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
    } catch {
      return [];
    }
  }

  addItem(product: { uuid: string; name: string; price: number }, qty = 1): void {
    const items = this.getItems();
    const existing = items.find((i) => i.uuid === product.uuid);
    if (existing) {
      existing.quantity += qty;
    } else {
      items.push({ ...product, quantity: qty });
    }
    this.save(items);
  }

  updateQty(uuid: string, qty: number): void {
    const items = this.getItems().map((i) =>
      i.uuid === uuid ? { ...i, quantity: Math.max(1, qty) } : i
    );
    this.save(items);
  }

  removeItem(uuid: string): void {
    this.save(this.getItems().filter((i) => i.uuid !== uuid));
  }

  clear(): void {
    localStorage.removeItem(CART_KEY);
  }

  total(): number {
    return this.getItems().reduce((sum, i) => sum + i.price * i.quantity, 0);
  }

  count(): number {
    return this.getItems().reduce((sum, i) => sum + i.quantity, 0);
  }

  private save(items: CartItem[]): void {
    localStorage.setItem(CART_KEY, JSON.stringify(items));
  }
}

export const cartService = CartService.getInstance();
export default CartService;

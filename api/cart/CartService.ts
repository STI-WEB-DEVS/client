import { ref, computed } from 'vue';

export class CartService {
    private static instance: CartService;
    private _items = ref([]);

    private constructor() {
        if (typeof window !== 'undefined') {
            const savedCart = localStorage.getItem('_cart');
            if (savedCart) {
                const items = JSON.parse(savedCart);
                // Ensure all items have a 'selected' property (fixes legacy items)
                this._items.value = items.map(item => ({
                    ...item,
                    selected: item.selected !== undefined ? item.selected : true
                }));
            }
        }
    }

    public static getInstance(): CartService {
        if (!CartService.instance) {
            CartService.instance = new CartService();
        }
        return CartService.instance;
    }

    private save() {
        if (typeof window !== 'undefined') {
            localStorage.setItem('_cart', JSON.stringify(this._items.value));
            // Force reactivity update for the UI
            this._items.value = [...this._items.value];
        }
    }

    public get items() {
        return this._items.value;
    }

    public add(product: any) {
        const id = product.uuid || product.id;
        const existingItem = this._items.value.find(item => (item.uuid || item.id) === id);
        
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this._items.value.push({
                ...product,
                quantity: 1,
                selected: true
            });
        }
        this.save();
    }

    public toggleSelection(productId: string | number) {
        const item = this._items.value.find(item => (item.uuid || item.id) === productId);
        if (item) {
            item.selected = !item.selected;
            this.save();
        }
    }

    public remove(productId: string | number) {
        this._items.value = this._items.value.filter(item => (item.uuid || item.id) !== productId);
        this.save();
    }

    public updateQuantity(productId: string | number, delta: number) {
        const item = this._items.value.find(item => (item.uuid || item.id) === productId);
        if (item) {
            item.quantity = Math.max(1, item.quantity + delta);
            this.save();
        }
    }

    public clear() {
        this._items.value = [];
        this.save();
    }

    public getTotal() {
        return this._items.value.reduce((total, item) => {
            // Only include selected items in the total
            if (item.selected) {
                return total + (parseFloat(item.price || 0) * item.quantity);
            }
            return total;
        }, 0).toFixed(2);
    }

    public getCount() {
        return this._items.value.reduce((count, item) => count + item.quantity, 0);
    }
}

export const cartService = CartService.getInstance();

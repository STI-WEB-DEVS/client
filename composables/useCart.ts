import { useState } from '#app';
import { computed } from 'vue';

export interface CartItem {
  uuid: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  selected: boolean;
  [key: string]: any;
}

export interface LocalOrder {
  uuid: string;
  customer_uuid: string;
  items: any[];
  total_amount: number;
  status: string;
  created_at: string;
}

export const useCart = () => {
  const cart = useState<CartItem[]>('cart', () => []);
  
  // Initialize from localStorage if on client
  if (typeof window !== 'undefined' && cart.value.length === 0) {
    const savedCart = localStorage.getItem('_cart');
    if (savedCart) {
      try {
        cart.value = JSON.parse(savedCart);
      } catch (e) {
        console.error('Failed to load cart from localStorage', e);
      }
    }
  }

  // Watcher-like effect to save cart to localStorage
  const saveCart = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('_cart', JSON.stringify(cart.value));
    }
  };

  const addToCart = (product: any, quantity: number = 1) => {
    const existingItem = cart.value.find((item) => item.uuid === product.uuid);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.value.push({
        uuid: product.uuid,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: quantity,
        selected: true, // Default to selected
      });
    }
    saveCart();
  };

  const removeFromCart = (uuid: string) => {
    cart.value = cart.value.filter((item) => item.uuid !== uuid);
    saveCart();
  };

  const updateQuantity = (uuid: string, quantity: number) => {
    const item = cart.value.find((item) => item.uuid === uuid);
    if (item) {
      item.quantity = Math.max(1, quantity);
    }
    saveCart();
  };

  const toggleSelection = (uuid: string) => {
    const item = cart.value.find((item) => item.uuid === uuid);
    if (item) {
      item.selected = !item.selected;
    }
    saveCart();
  };

  const clearCart = () => {
    cart.value = [];
    saveCart();
  };

  const cartTotal = computed(() => {
    return cart.value
      .filter(item => item.selected)
      .reduce((total, item) => total + item.price * item.quantity, 0);
  });

  const cartCount = computed(() => {
    return cart.value.reduce((total, item) => total + item.quantity, 0);
  });

  const selectedItems = computed(() => cart.value.filter(item => item.selected));

  // Local Orders Management
  const getLocalOrders = (): LocalOrder[] => {
    if (typeof window === 'undefined') return [];
    const savedOrders = localStorage.getItem('_local_orders');
    return savedOrders ? JSON.parse(savedOrders) : [];
  };

  const saveLocalOrder = (order: any) => {
    if (typeof window === 'undefined') return;
    const orders = getLocalOrders();
    const newOrder: LocalOrder = {
      uuid: Math.random().toString(36).substring(2, 15),
      customer_uuid: order.customer_uuid || 'GUEST',
      items: order.items,
      total_amount: order.total_amount,
      status: 'Completed',
      created_at: new Date().toISOString()
    };
    orders.unshift(newOrder); // Newest first
    localStorage.setItem('_local_orders', JSON.stringify(orders));
    
    // Remove ordered items from cart
    const orderedUuids = order.items.map((i: any) => i.product_uuid);
    cart.value = cart.value.filter(item => !orderedUuids.includes(item.uuid));
    saveCart();
    
    return newOrder;
  };

  return {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    toggleSelection,
    clearCart,
    cartTotal,
    cartCount,
    selectedItems,
    getLocalOrders,
    saveLocalOrder,
  };
};

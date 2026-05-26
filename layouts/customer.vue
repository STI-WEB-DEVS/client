<template>
  <div class="px-4 sm:px-6 lg:px-8 py-8 max-w-7xl mx-auto">
    
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-gray-200 pb-5 mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold tracking-tight text-gray-900">Our Products</h1>
        <p class="mt-2 text-sm text-gray-500">Select a product card to specify quantity. Click "View Cart" to see your order summary.</p>
      </div>
      
      <div>
        <button 
          @click="isCartOpen = true"
          type="button"
          class="flex items-center gap-3 bg-[#6D4C41] text-white px-4 py-2.5 rounded-lg shadow-sm font-medium text-sm hover:bg-[#5d4037] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#6D4C41]"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
          </svg>
          <span>View Cart (<strong>{{ totalCartItems }}</strong>)</span>
        </button>
      </div>
    </div>

    <div v-if="isLoading" class="flex flex-col items-center justify-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[#6D4C41]"></div>
      <p class="mt-4 text-sm text-gray-500">Loading your catalog...</p>
    </div>

    <div v-else-if="products.length > 0" class="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      <div 
        v-for="product in products" 
        :key="product.uuid"
        @click="openQuantityModal(product)"
        class="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm hover:shadow-md transition-all cursor-pointer transform hover:-translate-y-0.5"
      >
        <div class="aspect-h-1 aspect-w-1 bg-gray-100 group-hover:opacity-75 sm:aspect-none sm:h-48 flex items-center justify-center text-[#6D4C41] bg-amber-50 font-bold text-xl select-none">
          {{ product.name ? product.name.substring(0, 2).toUpperCase() : 'PR' }}
        </div>
        
        <div class="flex flex-1 flex-col p-4 space-y-2">
          <div class="flex items-start justify-between gap-2">
            <h3 class="text-sm font-semibold text-gray-900 group-hover:text-[#6D4C41] transition-colors line-clamp-2">
              {{ product.name }}
            </h3>
            <span class="text-xs text-[#6D4C41] font-medium bg-amber-50 group-hover:bg-[#6D4C41] group-hover:text-white px-2 py-0.5 rounded transition-colors whitespace-nowrap">
              + Add
            </span>
          </div>
          <p class="text-xs text-gray-400 font-mono truncate">ID: {{ product.uuid }}</p>
          <div class="flex flex-1 flex-col justify-end pt-2">
            <p class="text-sm font-medium text-gray-900">${{ formatPrice(product.price) }}</p>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="text-center py-20 border-2 border-dashed border-gray-300 rounded-lg">
      <p class="text-gray-500 text-sm">No products available at the moment.</p>
    </div>

    <div v-if="isQuantityModalOpen" class="relative z-50">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isQuantityModalOpen = false"></div>
      <div class="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl sm:w-full sm:max-w-sm sm:p-6 transition-all">
          <div v-if="selectedProduct">
            <div class="text-center">
              <h3 class="text-lg font-bold leading-6 text-gray-900 mb-1">{{ selectedProduct.name }}</h3>
              <p class="text-sm text-gray-500 mb-4">Price per unit: ${{ formatPrice(selectedProduct.price) }}</p>
            </div>
            <form @submit.prevent="submitAddToCart">
              <div class="mt-2">
                <label for="quantity" class="block text-xs font-medium text-gray-700 mb-1">Specify Quantity</label>
                <input 
                  id="quantity"
                  v-model.number="quantityForm.quantity" 
                  type="number" 
                  min="1" 
                  required 
                  class="block w-full text-center rounded-md border-0 py-2 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#6D4C41] text-base font-semibold"
                />
              </div>
              <div class="mt-6 flex gap-3">
                <button type="button" @click="isQuantityModalOpen = false" class="flex-1 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Cancel</button>
                <button type="submit" class="flex-1 rounded-md bg-[#6D4C41] px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#5d4037]">Add to Cart</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div v-if="isCartOpen" class="relative z-50">
      <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="isCartOpen = false"></div>

      <div class="fixed inset-0 z-10 flex items-center justify-center p-4">
        <div class="relative transform overflow-hidden rounded-lg bg-white shadow-xl sm:w-full sm:max-w-md transition-all">
          
          <div class="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
            <div class="flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 text-[#6D4C41]">
                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
              </svg>
              <h3 class="text-base font-bold text-gray-900">Your Current Order</h3>
            </div>
            <button @click="isCartOpen = false" class="text-gray-400 hover:text-gray-600 font-medium text-sm">✕</button>
          </div>

          <div class="max-h-80 overflow-y-auto divide-y divide-gray-100 px-4">
            <div v-if="cart.length === 0" class="py-12 text-center text-sm text-gray-500">
              Your cart is empty. Start adding some products!
            </div>
            
            <div 
              v-for="item in cart" 
              :key="item.uuid" 
              class="py-4 flex items-center justify-between text-sm gap-2"
            >
              <div class="flex-1 min-w-0">
                <p class="font-semibold text-gray-900 truncate">{{ item.name }}</p>
                <div class="flex items-center justify-between mt-1">
                  <div class="flex items-center gap-1.5">
                    <span class="text-xs text-gray-500">Qty:</span>
                    <input 
                      v-model.number="item.quantity"
                      type="number" 
                      min="1"
                      @change="validateQuantity(item)"
                      class="w-14 text-center rounded border-gray-300 py-0.5 text-xs text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-1 focus:ring-[#6D4C41]"
                    />
                    <span class="text-xs text-gray-400">× ${{ formatPrice(item.price) }}</span>
                  </div>
                  <p class="text-xs font-semibold text-gray-900 whitespace-nowrap">
                    ${{ formatPrice(item.quantity * item.price) }}
                  </p>
                </div>
              </div>
              
              <button 
                @click="removeFromCart(item.uuid)" 
                type="button" 
                class="text-xs font-semibold text-red-600 hover:text-red-900 bg-red-5 hover:bg-red-100 px-2.5 py-1.5 rounded-md transition-colors"
              >
                Remove
              </button>
            </div>
          </div>

          <div v-if="cart.length > 0" class="p-4 border-t border-gray-200 bg-amber-50/50 space-y-1.5">
            <div class="flex justify-between text-sm font-bold text-gray-900 border-b border-dashed border-gray-300 pb-2">
              <span>Overall Total:</span>
              <span class="text-lg text-[#6D4C41]">${{ formatPrice(overallTotalCartPrice) }}</span>
            </div>
          </div>

          <div class="p-4 bg-gray-50 border-t border-gray-200 flex flex-col gap-3">
            <button 
              v-if="cart.length > 0"
              @click="submitOrder"
              type="button"
              :disabled="isSubmittingOrder"
              class="w-full rounded-md bg-[#6D4C41] py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#5d4037] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#6D4C41] disabled:opacity-50 transition-all flex justify-center items-center gap-2"
            >
              <span v-if="isSubmittingOrder" class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
              {{ isSubmittingOrder ? 'Processing Order...' : 'Place Order' }}
            </button>
            
            <div class="flex items-center justify-between px-1">
              <button 
                v-if="cart.length > 0"
                @click="clearCart" 
                type="button"
                class="text-xs font-medium text-gray-400 hover:text-red-600 transition-colors"
              >
                Clear All Items
              </button>
              <div v-else></div>

              <button 
                @click="isCartOpen = false"
                type="button"
                class="text-xs font-semibold text-[#6D4C41] hover:text-[#5d4037] hover:underline"
              >
                Continue Shopping &rarr;
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { productService } from '~/api/product/ProductService';
// Import the Nuxt Order Service class you provided
import { orderService } from '~/api/order/OrderService'; 

// Component Core states
const products = ref<any[]>([]);
const isLoading = ref(false);
const isSubmittingOrder = ref(false);

// Shopping Cart state
const cart = ref<Array<{ uuid: string; name: string; price: number; quantity: number }>>([]);
const isCartOpen = ref(false); 

// Quantity Selector Modal States
const isQuantityModalOpen = ref(false);
const selectedProduct = ref<any>(null);
const quantityForm = ref({ quantity: 1 });

// Price utility formatter
const formatPrice = (price: any): string => {
  const num = Number(price);
  return isNaN(num) ? '0.00' : num.toFixed(2);
};

// Computed calculations
const totalCartItems = computed(() => {
  return cart.value.reduce((total, item) => total + item.quantity, 0);
});

const overallTotalCartPrice = computed(() => {
  return cart.value.reduce((total, item) => total + (item.quantity * item.price), 0);
});

// Load Product data
const loadProducts = async () => {
  isLoading.value = true;
  try {
    const res = await productService.list();
    products.value = res.data || res;
  } catch (e) {
    console.error("Failed to load products:", e);
  } finally {
    isLoading.value = false;
  }
};

// Open item quantity selector modal when card is clicked
const openQuantityModal = (product: any) => {
  selectedProduct.value = product;
  quantityForm.value.quantity = 1;
  isQuantityModalOpen.value = true;
};

// Add configured item data to internal array state tracking quietly
const submitAddToCart = () => {
  if (!selectedProduct.value) return;

  const existingItemIndex = cart.value.findIndex(item => item.uuid === selectedProduct.value.uuid);
  const itemPrice = Number(selectedProduct.value.price) || 0;

  if (existingItemIndex > -1) {
    cart.value[existingItemIndex].quantity += quantityForm.value.quantity;
  } else {
    cart.value.push({
      uuid: selectedProduct.value.uuid,
      name: selectedProduct.value.name,
      price: itemPrice,
      quantity: quantityForm.value.quantity
    });
  }

  isQuantityModalOpen.value = false;
};

// DATABASE INTEGRATION: Submit payload over OrderService
const submitOrder = async () => {
  if (cart.value.length === 0) return;
 
  isSubmittingOrder.value = true;
  try {
    const orderPayload = {
      items: cart.value.map(item => ({
        product_uuid: item.uuid,
        quantity: item.quantity
      }))
    };
 
    const response = await orderService.create(orderPayload);
 
    console.log("Database Order Saved Successfully:", response);
    alert("Order successfully placed!");
 
    clearCart();
  } catch (error: any) {
    console.error("Order processing failed:", error);
    alert(error.message || "There was an issue processing your purchase order.");
  } finally {
    isSubmittingOrder.value = false;
  }
};

// Guard check against zero/negative input parameters
const validateQuantity = (item: any) => {
  if (!item.quantity || item.quantity < 1) {
    item.quantity = 1;
  }
};

// Remove single selection block
const removeFromCart = (uuid: string) => {
  cart.value = cart.value.filter(item => item.uuid !== uuid);
  if (cart.value.length === 0) {
    isCartOpen.value = false;
  }
};

// Clear total selections layout
const clearCart = () => {
  cart.value = [];
  isCartOpen.value = false;
};

onMounted(loadProducts);
</script>
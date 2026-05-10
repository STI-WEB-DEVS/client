<script setup>
import { ref, computed } from 'vue';
import { ShoppingCartIcon, CheckCircleIcon } from '@heroicons/vue/24/outline';

definePageMeta({
  layout: 'customer'
});

const cart = useState('customerCart', () => []);
const showOrderSummary = ref(false);
const orderPayload = ref(null);

const subtotal = computed(() => {
  return cart.value.reduce((total, item) => total + (item.product.price * item.quantity), 0);
});

const shipping = computed(() => {
  return subtotal.value > 100 ? 0 : 10;
});

const total = computed(() => {
  return subtotal.value + shipping.value;
});

const updateQuantity = (item, newQuantity) => {
  if (newQuantity < 1) return;
  item.quantity = newQuantity;
};

const removeItem = (item) => {
  const index = cart.value.indexOf(item);
  if (index > -1) {
    cart.value.splice(index, 1);
  }
};

const placeOrder = () => {
  // Get customer UUID from localStorage
  const customerUuid = localStorage.getItem('uuid');

  if (!customerUuid) {
    alert('Customer UUID not found. Please log in again.');
    return;
  }

  if (cart.value.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  // Build the payload
  const payload = {
    customer_uuid: customerUuid,
    items: cart.value.map(item => ({
      product_uuid: item.product.uuid,
      quantity: item.quantity
    }))
  };

  // Store payload for modal display
  orderPayload.value = payload;
  
  // Log to console only (not displayed in UI)
  console.clear();
  console.log('='.repeat(50));
  console.log('ORDER PAYLOAD');
  console.log('='.repeat(50));
  console.log(JSON.stringify(payload, null, 2));
  console.log('='.repeat(50));

  // Show order summary modal
  showOrderSummary.value = true;
};

const closeOrderSummary = () => {
  showOrderSummary.value = false;
};

const confirmOrder = () => {
  // Clear cart after order
  cart.value = [];
  showOrderSummary.value = false;
  
  // Show success message
  alert('Order placed successfully! (Payload logged to console)');
  
  // Redirect to orders page
  navigateTo('/customer/orders');
};
</script>

<template>
  <div class="py-8">
    <h1 class="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

    <div v-if="cart.length === 0" class="text-center py-16 bg-white rounded-lg border border-gray-200">
      <ShoppingCartIcon class="mx-auto h-12 w-12 text-gray-400" />
      <h3 class="mt-4 text-lg font-medium text-gray-900">Your cart is empty</h3>
      <p class="mt-2 text-sm text-gray-500">Add some products to get started.</p>
      <NuxtLink 
        to="/customer/shop"
        class="mt-6 inline-block rounded-md bg-indigo-600 px-6 py-3 text-sm font-medium text-white hover:bg-indigo-700"
      >
        Continue Shopping
      </NuxtLink>
    </div>

    <div v-else class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Cart Items -->
      <div class="lg:col-span-2">
        <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-lg font-medium text-gray-900">Order Items</h2>
          </div>

          <ul class="divide-y divide-gray-200">
            <li v-for="item in cart" :key="item.product.uuid" class="p-6">
              <div class="flex items-start gap-4">
                <!-- Product Image -->
                <div class="h-24 w-24 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center">
                  <span class="text-gray-400 font-medium">{{ item.product.name.substring(0, 2).toUpperCase() }}</span>
                </div>

                <!-- Product Details -->
                <div class="flex-1">
                  <h3 class="text-base font-medium text-gray-900">{{ item.product.name }}</h3>
                  <p class="mt-1 text-sm text-gray-500">₱{{ parseFloat(item.product.price).toFixed(2) }} each</p>
                  
                  <!-- Quantity Controls -->
                  <div class="mt-4 flex items-center gap-4">
                    <div class="flex items-center border border-gray-300 rounded-md">
                      <button 
                        @click="updateQuantity(item, item.quantity - 1)"
                        class="px-3 py-1 text-gray-600 hover:bg-gray-50"
                      >
                        -
                      </button>
                      <span class="px-4 py-1 border-x border-gray-300">{{ item.quantity }}</span>
                      <button 
                        @click="updateQuantity(item, item.quantity + 1)"
                        class="px-3 py-1 text-gray-600 hover:bg-gray-50"
                      >
                        +
                      </button>
                    </div>

                    <button 
                      @click="removeItem(item)"
                      class="text-sm font-medium text-red-600 hover:text-red-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>

                <!-- Item Total -->
                <div class="text-right">
                  <p class="text-base font-medium text-gray-900">
                    ₱{{ (item.product.price * item.quantity).toFixed(2) }}
                  </p>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <!-- Order Summary -->
      <div class="lg:col-span-1">
        <div class="bg-white rounded-lg border border-gray-200 p-6 sticky top-24">
          <h2 class="text-lg font-medium text-gray-900 mb-4">Order Summary</h2>

          <dl class="space-y-3">
            <div class="flex justify-between text-sm">
              <dt class="text-gray-600">Subtotal</dt>
              <dd class="font-medium text-gray-900">₱{{ subtotal.toFixed(2) }}</dd>
            </div>

            <div class="flex justify-between text-sm">
              <dt class="text-gray-600">Shipping</dt>
              <dd class="font-medium text-gray-900">
                {{ shipping === 0 ? 'FREE' : `₱${shipping.toFixed(2)}` }}
              </dd>
            </div>

            <div class="border-t border-gray-200 pt-3 flex justify-between">
              <dt class="text-base font-medium text-gray-900">Total</dt>
              <dd class="text-base font-medium text-gray-900">₱{{ total.toFixed(2) }}</dd>
            </div>
          </dl>

          <button
            @click="placeOrder"
            class="mt-6 w-full rounded-md bg-indigo-600 px-6 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Place Order
          </button>

          <p class="mt-4 text-xs text-center text-gray-500">
            Free shipping on orders over ₱100
          </p>
        </div>
      </div>
    </div>

    <!-- Order Summary Modal -->
    <Teleport to="body">
      <div v-if="showOrderSummary" class="fixed inset-0 z-50 overflow-y-auto">
        <div class="flex min-h-screen items-center justify-center p-4">
          <div @click="closeOrderSummary" class="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
          
          <div class="relative bg-white rounded-lg shadow-xl max-w-2xl w-full p-6">
            <div class="text-center mb-6">
              <CheckCircleIcon class="mx-auto h-12 w-12 text-green-500" />
              <h3 class="mt-4 text-lg font-medium text-gray-900">Review Your Order</h3>
              <p class="mt-2 text-sm text-gray-500">Check the console for payload details</p>
            </div>

            <div class="border-t border-gray-200 pt-4">
              <h4 class="text-sm font-medium text-gray-900 mb-3">Order Items</h4>
              <ul class="space-y-2">
                <li v-for="item in cart" :key="item.product.uuid" class="flex justify-between text-sm">
                  <span class="text-gray-600">{{ item.product.name }} × {{ item.quantity }}</span>
                  <span class="font-medium text-gray-900">₱{{ (item.product.price * item.quantity).toFixed(2) }}</span>
                </li>
              </ul>
              
              <div class="mt-4 pt-4 border-t border-gray-200 flex justify-between">
                <span class="text-base font-medium text-gray-900">Total</span>
                <span class="text-base font-medium text-gray-900">₱{{ total.toFixed(2) }}</span>
              </div>
            </div>

            <div class="mt-6 flex gap-3">
              <button
                @click="closeOrderSummary"
                class="flex-1 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                @click="confirmOrder"
                class="flex-1 rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { productService } from '~/api/product/ProductService';
import { orderService } from '~/api/order/OrderService';
import ProductQuantityModal from '~/components/ProductQuantityModal.vue';

definePageMeta({ layout: 'customer' });

const products = ref([]);
const cart = ref([]);
const isModalOpen = ref(false);
const activeProduct = ref(null);
const isLoading = ref(true);

onMounted(async () => {
    try {
        const res = await productService.list();
        products.value = res.data?.data || res.data || []; 
    } catch (e) {
        console.error("Database connection failed", e);
    } finally {
        isLoading.value = false;
    }
});

// Opens the modal for custom quantity
const openAddToCart = (product) => {
    activeProduct.value = product;
    isModalOpen.value = true;
};

// Logic for the NEW "Buy 1" button (Direct addition)
const directBuy = (product) => {
    const existing = cart.value.find(item => item.product_uuid === product.uuid);
    if (existing) {
        existing.quantity += 1;
    } else {
        cart.value.push({
            product_uuid: product.uuid,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
};

// Receives data from the Modal
const handleConfirm = (itemWithQty) => {
    const existing = cart.value.find(item => item.product_uuid === itemWithQty.uuid);
    if (existing) {
        existing.quantity += itemWithQty.quantity;
    } else {
        cart.value.push({
            product_uuid: itemWithQty.uuid,
            name: itemWithQty.name,
            price: itemWithQty.price,
            quantity: itemWithQty.quantity
        });
    }
    isModalOpen.value = false;
};

const removeFromCart = (index) => cart.value.splice(index, 1);

const totalAmount = computed(() => {
    return cart.value.reduce((acc, item) => acc + (item.price * item.quantity), 0);
});

// Revised Order Logic: Log payload and clear cart (No API send yet)
const handlePlaceOrder = async () => {
    if (cart.value.length === 0) return;

    // Pulling the customer_uuid provided by your UserResource.php
    const customerUuid = localStorage.getItem('customer_uuid');

    if (!customerUuid) {
        alert("Error: No customer profile linked. Please re-login.");
        return;
    }

    const payload = {
        customer_uuid: customerUuid, 
        items: cart.value.map(item => ({
            product_uuid: item.product_uuid,
            quantity: item.quantity
        }))
    };

    console.log(JSON.stringify(payload, null, 2));
    

    alert("successfully placed order! ");
    
    // Clear the cart sidebar after "placing" the order
    cart.value = []; 
};
</script>

<template>
  <div class="max-w-7xl mx-auto px-4 py-8">
    <div class="flex flex-col lg:flex-row gap-8">
      
      <!-- Product Grid -->
      <div class="flex-1">
        <h2 class="text-2xl font-bold mb-6 text-gray-900">Available Products</h2>
        
        <div v-if="isLoading" class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="i in 4" :key="i" class="h-48 bg-gray-100 animate-pulse rounded-2xl"></div>
        </div>

        <div v-else class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div v-for="product in products" :key="product.uuid" 
               class="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:border-indigo-100 transition-all flex flex-col justify-between">
            <div class="mb-4">
              <h3 class="font-bold text-lg text-gray-900">{{ product.name }}</h3>
              <p class="text-indigo-600 font-bold">₱{{ product.price }}</p>
            </div>
            
            <div class="flex gap-2">
              <button @click="openAddToCart(product)" 
                      class="flex-1 bg-gray-100 text-gray-900 py-3 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm">
                Checkout
              </button>

              <button @click="directBuy(product)" 
                      class="flex-1 bg-indigo-600 text-white py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all text-sm">
                Buy 
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar Summary -->
      <div class="w-full lg:w-96">
        <div class="bg-white border border-gray-100 rounded-3xl p-6 sticky top-6 shadow-sm">
          <h2 class="text-xl font-bold mb-6 flex items-center justify-between">
            Your Order
            <span v-if="cart.length > 0" class="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full font-bold">
              {{ cart.length }} items
            </span>
          </h2>
          
          <div v-if="cart.length === 0" class="py-16 text-center">
            <div class="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 text-gray-300 text-2xl">
              🛒
            </div>
            <p class="text-gray-400 italic">No items added yet.</p>
          </div>

          <div v-else>
            <div class="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2">
              <div v-for="(item, index) in cart" :key="index" class="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-gray-100">
                <div>
                  <p class="font-bold text-sm text-gray-900">{{ item.name }}</p>
                  <p class="text-xs text-gray-500">{{ item.quantity }} × ₱{{ item.price }}</p>
                </div>
                <button @click="removeFromCart(index)" class="w-8 h-8 flex items-center justify-center rounded-full bg-white text-red-400 hover:text-red-600 shadow-sm">
                  ×
                </button>
              </div>
            </div>

            <div class="pt-6 border-t border-dashed border-gray-200">
              <div class="flex justify-between items-center mb-6">
                <span class="text-gray-500 font-medium text-sm">Grand Total</span>
                <span class="text-2xl font-black text-gray-900">₱{{ totalAmount.toFixed(2) }}</span>
              </div>
              
              <button @click="handlePlaceOrder" 
                      class="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold hover:bg-indigo-700 shadow-lg shadow-indigo-100 transition-all">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Modal Component -->
    <ProductQuantityModal 
      :show="isModalOpen" 
      :product="activeProduct"
      @close="isModalOpen = false"
      @confirm="handleConfirm"
    />
  </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
  margin: 0 !important;
}
input[type=number] {
  -moz-appearance: textfield !important;
}
</style>
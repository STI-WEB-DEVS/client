<script setup>
import { ref } from 'vue';
import { cartService } from '~/api/cart/CartService';
const props = defineProps({
    product: {
        type: Object,
        required: true
    }
})

const showSuccessModal = ref(false);
const addToCart = (product) => {
    cartService.add(product);
    showSuccessModal.value = true;
}
</script>

<template>
  <div class="w-full max-w-sm border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow group">
    <div class="aspect-square bg-gray-100 overflow-hidden relative">
      <img 
        :src="product.image || 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=1000'" 
        :alt="product.name"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      >
      <div class="absolute top-3 right-3">
          <span v-if="product.stock < 5" class="bg-red-100 text-red-600 text-[10px] font-bold px-2 py-1 rounded-full uppercase">Low Stock</span>
      </div>
    </div>

    <div class="p-4">
      <h3 class="text-lg font-semibold text-gray-900 line-clamp-1">{{ product.name }}</h3>
      <p class="text-sm text-gray-500 mt-1 line-clamp-1">{{ product.description || 'High quality everyday product' }}</p>
      <div class="mt-4 flex items-center justify-between">
        <span class="text-xl font-bold text-gray-900">${{ product.price || '29.00' }}</span>
        
        <div class="flex gap-2">
          <button
            @click="addToCart(product)"
            class="p-2 border border-gray-200 text-gray-500 rounded-lg hover:bg-gray-100 hover:text-indigo-600 transition-all shadow-sm flex items-center justify-center active:scale-90"
            title="Add to Cart"
          >
              <Icon name="lineicons:cart-2" size="20" />
        </button>
          <NuxtLink :to="'/customer/checkout?id=' + (product.uuid || product.id)" class="bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors">
            Buy Now
          </NuxtLink>
        </div>
      </div>
    </div>
    
    <FeedbackModal
      :open="showSuccessModal"
      type="success"
      title="Added to Cart"
      :message="`${product.name} has been added to your cart successfully.`"
      confirmText="Go to Cart"
      cancelText="Continue Shopping"
      :showCancel="true"
      @close="showSuccessModal = false"
      @confirm="navigateTo('/customer/cart')"
    />
  </div>
</template>
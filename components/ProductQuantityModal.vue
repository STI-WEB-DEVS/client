<template>
  <div v-if="show" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl transition-all">
      
      <!-- Product Header & Image Placeholder -->
      <div class="text-center mb-8">
        <div class="w-24 h-24 bg-gray-50 rounded-3xl mx-auto mb-4 flex items-center justify-center border border-gray-100 shadow-inner">
           <svg class="w-10 h-10 text-gray-200" fill="currentColor" viewBox="0 0 24 24"><path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>
        </div>
        <h3 class="text-2xl font-bold text-gray-900">{{ product?.name }}</h3>
        <p class="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest">{{ product?.uuid }}</p>
        <div class="mt-4 inline-block bg-indigo-50 px-4 py-1 rounded-full text-indigo-600 font-bold text-lg">
          ₱{{ product?.price }}
        </div>
      </div>

      <!-- Quantity Selector -->
      <div class="bg-gray-50 rounded-2xl p-6 mb-8">
        <div class="flex items-center justify-between gap-4">
          <button @click="decrement" class="w-14 h-14 rounded-xl border-2 border-white bg-white shadow-sm flex items-center justify-center text-2xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">-</button>
          
          <div class="flex-1 text-center">
            <input 
              v-model.number="quantity" 
              type="number" 
              class="qty-input w-full text-center text-3xl font-black bg-transparent border-none focus:ring-0 text-gray-900"
            />
            <p class="text-[10px] font-bold text-gray-400 uppercase mt-1">Adjust Quantity</p>
          </div>
          
          <button @click="increment" class="w-14 h-14 rounded-xl border-2 border-white bg-white shadow-sm flex items-center justify-center text-2xl font-bold text-gray-600 hover:bg-gray-100 transition-colors">+</button>
        </div>
      </div>

      <div class="flex gap-4">
        <button @click="$emit('close')" class="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl transition-colors">Cancel</button>
        <button @click="submit" class="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black shadow-lg transition-all flex flex-col items-center justify-center">
          <span class="text-[10px] uppercase opacity-60">Confirm Total</span>
          <span>₱{{ (product?.price * quantity).toFixed(2) }}</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
const props = defineProps<{ show: boolean; product: any; }>();
const emit = defineEmits(['close', 'confirm']);
const quantity = ref(1);

watch(() => props.show, (newVal) => { if (newVal) quantity.value = 1; });
const increment = () => quantity.value++;
const decrement = () => { if (quantity.value > 1) quantity.value--; };
const submit = () => emit('confirm', { ...props.product, quantity: quantity.value });
</script>

<style>
/* Using global style to force-hide arrows across browsers */
.qty-input::-webkit-outer-spin-button,
.qty-input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.qty-input[type=number] {
  -moz-appearance: textfield;
}
</style>
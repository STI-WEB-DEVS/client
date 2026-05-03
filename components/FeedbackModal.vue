<template>
  <div v-if="show" class="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
    <div class="bg-white rounded-3xl w-full max-w-md p-8 shadow-2xl">
      <div class="text-center mb-8">
        <!-- Placeholder for Product Image -->
        <div class="w-32 h-32 bg-gray-100 rounded-2xl mx-auto mb-4 flex items-center justify-center border border-gray-200">
           <span class="text-gray-300 text-xs italic">Product Image</span>
        </div>

        <h3 class="text-2xl font-bold text-gray-900">{{ product?.name }}</h3>
        <p class="text-[10px] font-mono text-gray-400 mt-1 uppercase tracking-widest">
          UUID: {{ product?.uuid }}
        </p>
      </div>

      <div class="bg-gray-50 rounded-2xl p-6 mb-8">
        <div class="flex items-center justify-between gap-4">
          <button @click="decrement" class="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl font-bold text-gray-600 hover:bg-gray-100">-</button>
          
          <div class="flex-1 text-center">
            <!-- Added 'no-spinner' class here -->
            <input 
              v-model.number="quantity" 
              type="number" 
              min="1"
              class="no-spinner w-full text-center text-3xl font-black bg-transparent border-none focus:ring-0 text-gray-900"
            />
            <p class="text-[10px] font-bold text-gray-400 uppercase mt-1">Quantity</p>
          </div>
          
          <button @click="increment" class="w-14 h-14 rounded-xl bg-white shadow-sm flex items-center justify-center text-2xl font-bold text-gray-600 hover:bg-gray-100">+</button>
        </div>
      </div>

      <div class="flex gap-4">
        <button @click="$emit('close')" class="flex-1 py-4 text-gray-500 font-bold hover:bg-gray-50 rounded-2xl">Cancel</button>
        <button @click="submit" class="flex-1 py-4 bg-gray-900 text-white font-bold rounded-2xl hover:bg-black shadow-lg">
          Add · ${{ (product?.price * quantity).toFixed(2) }}
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
const submit = () => { emit('confirm', { ...props.product, quantity: quantity.value }); };
</script>

<style scoped>
/* Removes arrows from number input */
.no-spinner::-webkit-inner-spin-button,
.no-spinner::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spinner {
  -moz-appearance: textfield;
}
</style>
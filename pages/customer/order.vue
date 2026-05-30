<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold">Available Products</h2>
    
    <div v-if="loading" class="text-center py-10">Loading catalog...</div>

    <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div v-for="product in products" :key="product.uuid" class="border p-4 rounded-lg shadow-sm bg-white">
        <div class="h-32 bg-gray-100 rounded-md mb-4 flex items-center justify-center text-gray-400">
          Product Image
        </div>
        <h3 class="font-bold text-lg">{{ product.name }}</h3>
        <p class="text-gray-600 text-sm mb-2">
          {{ product.description || product.product_description || 'No description available.' }}
        </p>
        <div class="flex justify-between items-center mt-4">
          <span class="text-indigo-600 font-bold">${{ product.price }}</span>
          <button 
            @click="addToCart(product)"
            class="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { productService } from '~/api/product/ProductService';
import { useCart } from '~/composables/useCart';

definePageMeta({ layout: 'customer' });

const { addItem } = useCart();
const products = ref([]);
const loading = ref(true);

const addToCart = (product) => {
  addItem(product, 1);
};

const hasAvailableQuantity = (product) => {
  if (product?.quantity == null || product.quantity === "") return true;

  const quantity = Number(product.quantity);
  return Number.isFinite(quantity) && quantity > 0;
};

onMounted(async () => {
  try {
    const response = await productService.list();
    const items = Array.isArray(response?.data) ? response.data : response;
    products.value = Array.isArray(items) ? items.filter(hasAvailableQuantity) : [];
  } catch (err) {
    console.error("Error fetching products:", err);
  } finally {
    loading.value = false;
  }
});
</script>

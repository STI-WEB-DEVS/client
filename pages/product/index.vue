<template> 
      <form method="POST" @submit.prevent="handleSubmit">
        <div>
            <label for="name" class="block text-sm/6 font-medium text-gray-900">Name</label>
            <div class="mt-2">
                <input type="name" v-model="name" name="name" id="name" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>

        <div>
            <label for="price" class="block text-sm/6 font-medium text-gray-900">Price</label>
            <div class="mt-2">
                <input  v-model="price" name="price" id="price" required class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" />
            </div>
        </div>


        <button type="submit">
            <a class="flex w-full justify-center rounded-md bg-[#398165] px-3 py-1.5 text-sm/6 
            font-semibold text-white shadow-sm hover:bg-[#398165]/50 focus-visible:outline focus-visible:outline-2
             focus-visible:outline-offset-2 focus-visible:outline-indigo-600">ADD</a>
          </button>
    </form>
</template>


<script setup lang="ts">
definePageMeta({
  layout: false,
});
 
import { ref } from "vue";
import { productService } from "@/api/product/ProductService";
const name = ref("");
const price = ref("");
const error = ref("");
const isLoading = ref(false);
 
 const product = reactive({
    name,
    price
});

 
const handleSubmit = async () => {

  error.value = "";
  isLoading.value = true;
  try {
    const response = await productService.create(product);
    console.log(response);
  } catch (err: any) {
      console.log(err);
    error.value = err?.message || "";
  } finally {
    isLoading.value = false;
  }
};
</script>
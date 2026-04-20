<template>
  <NuxtLayout>
    <div class="max-w-lg mx-auto space-y-6">
      <h1 class="text-xl font-semibold">Create Product</h1>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <input
          v-model="name"
          type="text"
          placeholder="Product Name"
          class="w-full border rounded p-2"
        />
        <input
          v-model="price"
          type="number"
          placeholder="Price"
          class="w-full border rounded p-2"
        />
        <textarea
          v-model="description"
          placeholder="Description"
          class="w-full border rounded p-2"
        ></textarea>
        <button
          type="submit"
          class="bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Save
        </button>
      </form>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { productService } from '~/api/product/ProductService'

const router = useRouter()

const name = ref('')
const price = ref<number | null>(null)
const description = ref('')

const handleSubmit = async () => {
  await productService.create({
    name: name.value,
    price: price.value,
    description: description.value,
  })
  router.push('/product') // back to product list
}
</script>

<template>

  <NuxtLayout>

    <div class="space-y-6">

      <h1 class="text-xl font-bold mb-4">Edit Product</h1>



      <!-- Reusable ProductForm for Update -->

      <ProductForm

        mode="update"

        :uuid="uuid"

        :initialData="product"

      />

    </div>

  </NuxtLayout>

</template>



<script setup lang="ts">

import { ref, onMounted } from 'vue'

import { useRoute } from 'vue-router'

import { productService } from '~/api/product/ProductService'

import ProductForm from '~/components/forms/ProductForm.vue'



const route = useRoute()

const uuid = route.params.uuid as string

const product = ref<any>(null)



onMounted(async () => {

  product.value = await productService.show(uuid)

})

</script>


<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
          <th>UUID</th>
          <th>Created At</th>
        </tr>
      </thead>
      <tbody>
        <tr  >
          <td>{{ datas.value.id }}</td>
          <td>{{ datas.value.name }}</td>
          <td>{{ datas.value.price }}</td>
          <td>{{ datas.value.uuid }}</td>
          <td>{{ datas.value.created_at }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { productService } from '@/api/product/ProductService';

const route = useRoute();
const datas = ref();

onMounted(async () => {
  try {
    const response = await productService.show(route.params.uuid);
    datas.value = response.data;
    console.log(datas.value);
  } catch (err: any) {
    console.error('Failed to load product data:', err);
  }
});
</script>
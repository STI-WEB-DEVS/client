<template>
  <table class="w-full border mt-5">
    <thead>
      <tr class="bg-gray-200">
        <th class="border p-2">ID</th>
        <th class="border p-2">Name</th>
        <th class="border p-2">Email</th>
      </tr>
    </thead>

    <tbody>
      <tr v-for="c in customers" :key="c.id" class="text-center">
        <td class="border p-2">{{ c.id }}</td>
        <td class="border p-2">{{ c.name }}</td>
        <td class="border p-2">{{ c.email }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script setup lang="ts">
import { ref, onMounted } from 'vue';
import axios from 'axios';

const customers = ref([]);

const fetchCustomers = async () => {
  const res = await axios.get('http://localhost:8000/api/customers');
  customers.value = res.data;
}

onMounted(() => {
  fetchCustomers();
})
</script>
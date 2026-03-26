<template>
  <div class="search-bar">
    <input
      v-model="query"
      @input="onSearch"
      type="text"
      placeholder="Search by title, author, or barcode"
      class="search-input"
    />
    <button @click="scanBarcode" class="scan-button">Scan</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const query = ref('')
const emit = defineEmits(['search', 'scan'])

const onSearch = () => emit('search', query.value)
const scanBarcode = () => {
  const barcode = prompt('Scan or enter barcode:')
  if (barcode) emit('scan', barcode)
}
</script>

<style scoped>
.search-bar {
  display: flex;
  gap: 0.5rem;
}
.search-input {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
}
.scan-button {
  padding: 0.5rem 1rem;
  background-color: #1f2937;
  color: white;
  border-radius: 0.375rem;
}
.scan-button:hover {
  background-color: #374151;
}
</style>
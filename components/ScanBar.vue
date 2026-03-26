<template>
  <div class="scan-bar">
    <input v-model="value" placeholder="Scan ISBN or type book title" @keyup.enter="emitScan" />
    <button @click="emitScan">Scan</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { defineEmits } from 'vue'

const emit = defineEmits(['scan'])
const value = ref('')

const emitScan = () => {
  if (value.value) {
    emit('scan', value.value)
    value.value = ''
  }
}
</script>

<style scoped>
.scan-bar { display: flex; gap: 0.5rem; margin-bottom: 1rem; }
input { flex: 1; padding: 0.5rem; border: 1px solid #ccc; border-radius: 0.25rem; }
button { padding: 0.5rem 1rem; }
</style>
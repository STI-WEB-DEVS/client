<template>
  <div class="computers-page">
    <h1 class="page-title">Library Computer Availability</h1>

    <div v-if="loading" class="loading">Loading computers...</div>
    <div v-else-if="error" class="error">{{ error.message }}</div>

    <div v-else class="computers-grid">
      <div
        v-for="computer in computers"
        :key="computer.id"
        :class="['computer-card', computer.status === 'available' ? 'available' : 'occupied']"
      >
        <h3>{{ computer.name }}</h3>
        <p>Status: <strong>{{ computer.status }}</strong></p>
      </div>
    </div>

    <div class="summary">
      Available: {{ availableComputers().length }} / {{ computers.length }}
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useComputers } from '~/composables/useComputers.js'

const { computers, availableComputers, loading, error, fetchComputers } = useComputers()

onMounted(fetchComputers)
</script>

<style scoped>
.computers-page { padding: 1.5rem; }
.page-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
.computers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
}
.computer-card {
  padding: 1rem;
  border-radius: 0.5rem;
  text-align: center;
  font-weight: bold;
  color: white;
}
.computer-card.available { background-color: #10b981; } /* green */
.computer-card.occupied { background-color: #ef4444; } /* red */
.loading { color: #6b7280; }
.error { color: #dc2626; }
.summary { margin-top: 1rem; font-weight: bold; }
</style>
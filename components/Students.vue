<template>
  <div class="students-page">
    <h1 class="page-title">Student List</h1>

    <!-- Search bar -->
    <input
      type="text"
      v-model="searchQuery"
      @input="onSearch"
      placeholder="Search students by name or ID"
      class="search-input"
    />

    <div v-if="loading" class="loading">Loading students...</div>
    <div v-else-if="error" class="error">{{ error.message }}</div>

    <div v-else-if="filteredStudents.length === 0" class="no-results">
      No students found.
    </div>

    <div v-else class="students-grid">
      <div v-for="student in filteredStudents" :key="student.id" class="student-card">
        <h3>{{ student.name }}</h3>
        <p>ID: {{ student.id }}</p>
        <p>Course: {{ student.course }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useStudents } from '~/composables/useStudents.js'

const { students, loading, error, fetchStudents, searchStudents } = useStudents()
const searchQuery = ref('')

onMounted(fetchStudents)

// Computed for filtered students
const filteredStudents = computed(() =>
  searchQuery.value ? searchStudents(searchQuery.value) : students.value
)

// Optional: function to handle search event
const onSearch = () => {}
</script>

<style scoped>
.students-page { padding: 1.5rem; }
.page-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
.search-input {
  padding: 0.5rem;
  width: 100%;
  max-width: 400px;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  margin-bottom: 1rem;
}
.students-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}
.student-card {
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #f3f4f6;
}
.loading { color: #6b7280; }
.error { color: #dc2626; }
.no-results { color: #6b7280; margin-top: 1rem; }
</style>
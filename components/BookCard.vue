<template>
  <div class="book-card">
    <h2 class="book-title">{{ book.title }}</h2>
    <p class="book-detail">Author: {{ book.author }}</p>
    <p class="book-detail">ISBN: {{ book.isbn }}</p>
    <p class="book-detail">Shelf: {{ book.shelf }}</p>
    <p :class="['availability', book.available ? 'available' : 'unavailable']">
      {{ book.available ? 'Available' : 'Not Available' }}
    </p>
  </div>
</template>

<script setup>
const props = defineProps({ book: Object })
</script>

<style scoped>
.book-card {
  border: 1px solid #e5e7eb;
  padding: 1rem;
  border-radius: 0.5rem;
  transition: box-shadow 0.2s;
}
.book-card:hover {
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.book-title {
  font-weight: bold;
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
}
.book-detail {
  color: #4b5563;
  font-size: 0.875rem;
}
.availability.available {
  color: #16a34a;
}
.availability.unavailable {
  color: #dc2626;
}
</style>
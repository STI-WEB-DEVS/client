<template>
  <div class="book-card">
    <h3>{{ book.title }}</h3>
    <p>ISBN: {{ book.isbn }}</p>
    <p>Shelf: {{ book.shelf }}</p>
    <p>Due Date: {{ book.dueDate }}</p>
    <button @click="$emit('return')">Return</button>
  </div>
</template>

<script setup>
defineProps({
  book: Object
})
</script>

<style scoped>
.book-card { padding: 1rem; border: 1px solid #ccc; border-radius: 0.5rem; }
button { margin-top: 0.5rem; }
</style>
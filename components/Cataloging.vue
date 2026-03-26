<template>
  <div class="catalog-page">
    <h1 class="catalog-title">Library Catalog</h1>

    <SearchBar @search="onSearch" @scan="onScan" />

    <div v-if="loading" class="loading">Loading books...</div>
    <div v-else-if="error" class="error">{{ error.message }}</div>

    <div v-else class="books-grid">
      <BookCard v-for="book in books" :key="book.id" :book="book" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import SearchBar from '~/components/SearchBar.vue'
import BookCard from '~/components/BookCard.vue'
import { useBooks } from '~/composables/useBooks'

const { books, loading, error, fetchBooks, searchBooks } = useBooks()

onMounted(fetchBooks)

const onSearch = (query) => query ? searchBooks(query) : fetchBooks()
const onScan = (barcode) => searchBooks(barcode)
</script>

<style scoped>
.catalog-page { padding: 1.5rem; }
.catalog-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
.books-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem; }
.loading { color: #6b7280; margin-top: 1rem; }
.error { color: #dc2626; margin-top: 1rem; }
</style>
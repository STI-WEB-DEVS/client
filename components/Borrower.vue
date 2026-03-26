<template>
  <div class="borrower-page">
    <h1 class="page-title">Borrower Module</h1>

    <!-- Reusing ScanBar.vue -->
    <ScanBar @scan="onScan" />

    <div v-if="!borrowedBooks.length" class="no-borrowed">No borrowed books.</div>

    <!-- Grid of borrowed books -->
    <div class="borrowed-grid">
      <BookBorrowCard
        v-for="book in borrowedBooks"
        :key="book.id"
        :book="book"
        @return="onReturn(book)"
      />
    </div>

    <!-- Scanned book details -->
    <div v-if="scannedBook" class="scan-result">
      <h3>Scanned Book:</h3>
      <p><strong>{{ scannedBook.title }}</strong> (ISBN: {{ scannedBook.isbn }})</p>
      <p>Shelf: {{ scannedBook.shelf }}</p>

      <div v-if="!scannedBook.borrowed">
        <button class="borrow-btn" @click="onBorrow(scannedBook)">Borrow</button>
      </div>

      <div v-else class="borrowed-info">
        Already borrowed. Due: {{ scannedBook.dueDate }}
      </div>
    </div>
  </div>
</template>

<script setup>
import ScanBar from '~/components/ScanBar.vue'
import BookBorrowCard from '~/components/BookBorrowCard.vue'
import { ref } from 'vue'
import { useBorrower } from '~/composables/useBorrower'

// Use the borrower composable
const { borrowedBooks, scanBook, borrowBook, returnBook } = useBorrower()
const scannedBook = ref(null)

// Scan event from ScanBar.vue
const onScan = (value) => {
  scannedBook.value = scanBook(value)
}

// Borrow scanned book
const onBorrow = (book) => {
  borrowBook(book)
  scannedBook.value = null
}

// Return book
const onReturn = (book) => {
  returnBook(book)
}
</script>

<style scoped>
.borrower-page { padding: 1.5rem; }
.page-title { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; }
.borrowed-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 1rem; margin-top: 1rem; }
.scan-result { margin-top: 1rem; padding: 1rem; border: 1px solid #ccc; border-radius: 0.5rem; background-color: #f9f9f9; }
.borrowed-info { color: #dc2626; font-weight: bold; }
.borrow-btn { padding: 0.5rem 1rem; background-color: #10b981; color: white; border: none; border-radius: 0.25rem; cursor: pointer; }
.borrow-btn:hover { background-color: #059669; }
.no-borrowed { color: #6b7280; margin-top: 1rem; }
</style>
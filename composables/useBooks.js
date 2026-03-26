// ~/composables/useBooks.js
import { ref } from 'vue'

export const useBooks = () => {
  const books = ref([])
  const loading = ref(false)
  const error = ref(null)

  // Mock book data
  const mockBooks = [
    { id: 1, title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", isbn: "9780747532699", shelf: "A1", available: true },
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "9780261102217", shelf: "B2", available: false },
    { id: 3, title: "1984", author: "George Orwell", isbn: "9780451524935", shelf: "C3", available: true },
    { id: 4, title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "9780061120084", shelf: "D4", available: true },
    { id: 5, title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "9780743273565", shelf: "E5", available: false },
  ]

  // Fetch all books (simulates network call)
  const fetchBooks = async () => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 500)) // simulate delay
      books.value = mockBooks
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  // Search books by title or ISBN
  const searchBooks = async (query) => {
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 300)) // simulate delay
      books.value = mockBooks.filter(
        b => b.title.toLowerCase().includes(query.toLowerCase()) || b.isbn.includes(query)
      )
    } catch (err) {
      error.value = err
    } finally {
      loading.value = false
    }
  }

  return { books, loading, error, fetchBooks, searchBooks }
}
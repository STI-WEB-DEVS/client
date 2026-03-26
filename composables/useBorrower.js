import { ref } from 'vue'

export const useBorrower = () => {
  // Mock book database
  const books = ref([
    { id: 1, title: "Harry Potter and the Sorcerer's Stone", isbn: "9780747532699", shelf: "A1", borrowed: true, dueDate: "2026-04-10" },
    { id: 2, title: "The Hobbit", isbn: "9780261102217", shelf: "B2", borrowed: false, dueDate: null },
    { id: 3, title: "1984", isbn: "9780451524935", shelf: "C3", borrowed: true, dueDate: "2026-04-12" },
    { id: 4, title: "To Kill a Mockingbird", isbn: "9780061120084", shelf: "D4", borrowed: true, dueDate: "2026-04-15" },
    { id: 5, title: "The Great Gatsby", isbn: "9780743273565", shelf: "E5", borrowed: false, dueDate: null },
    { id: 6, title: "Pride and Prejudice", isbn: "9780141439518", shelf: "F6", borrowed: true, dueDate: "2026-04-18" },
    { id: 7, title: "The Catcher in the Rye", isbn: "9780316769488", shelf: "G7", borrowed: false, dueDate: null },
    { id: 8, title: "Moby-Dick", isbn: "9781503280786", shelf: "H8", borrowed: true, dueDate: "2026-04-20" },
    { id: 9, title: "War and Peace", isbn: "9781400079988", shelf: "I9", borrowed: false, dueDate: null },
    { id: 10, title: "The Lord of the Rings", isbn: "9780618640157", shelf: "J10", borrowed: true, dueDate: "2026-04-22" },
  ])

  const loading = ref(false)
  const error = ref(null)

  const borrowedBooks = ref(books.value.filter(b => b.borrowed))

  const scanBook = (barcodeOrTitle) => {
    return books.value.find(
      b => b.isbn === barcodeOrTitle || b.title.toLowerCase().includes(barcodeOrTitle.toLowerCase())
    )
  }

  const borrowBook = (book) => {
    if (!book.borrowed) {
      book.borrowed = true
      const due = new Date()
      due.setDate(due.getDate() + 14) // 2-week borrowing period
      book.dueDate = due.toISOString().split('T')[0]
      borrowedBooks.value.push(book)
    }
  }

  const returnBook = (book) => {
    book.borrowed = false
    book.dueDate = null
    borrowedBooks.value = borrowedBooks.value.filter(b => b.id !== book.id)
  }

  return { books, borrowedBooks, loading, error, scanBook, borrowBook, returnBook }
}
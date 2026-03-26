import { ref } from 'vue'

export const useStudents = () => {
  const students = ref([
    { id: 'S1001', name: 'Alice Reyes', course: 'BSCS' },
    { id: 'S1002', name: 'Juan Dela Cruz', course: 'BSIT' },
    { id: 'S1003', name: 'Maria Santos', course: 'BSBA' },
    { id: 'S1004', name: 'Pedro Lim', course: 'BSCE' },
    { id: 'S1005', name: 'Ana Garcia', course: 'BSE' },
    { id: 'S1006', name: 'Luis Torres', course: 'BSCS' },
    { id: 'S1007', name: 'Ella Navarro', course: 'BSIT' },
  ])

  const loading = ref(false)
  const error = ref(null)

  // Simulate fetching data
  const fetchStudents = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      // In real app, fetch from API
    }, 300)
  }

  // Search students by name or ID
  const searchStudents = (query) => {
    if (!query) return students.value
    const q = query.toLowerCase()
    return students.value.filter(
      s => s.name.toLowerCase().includes(q) || s.id.toLowerCase().includes(q)
    )
  }

  return { students, loading, error, fetchStudents, searchStudents }
}
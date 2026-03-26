import { ref } from 'vue'

export const useComputers = () => {
  // Mock data for library computer units
  const computers = ref([
    { id: 1, name: 'PC-01', status: 'available' },
    { id: 2, name: 'PC-02', status: 'occupied' },
    { id: 3, name: 'PC-03', status: 'available' },
    { id: 4, name: 'PC-04', status: 'occupied' },
    { id: 5, name: 'PC-05', status: 'available' },
    { id: 6, name: 'PC-06', status: 'available' },
    { id: 7, name: 'PC-07', status: 'occupied' },
    { id: 8, name: 'PC-08', status: 'available' },
  ])

  const loading = ref(false)
  const error = ref(null)

  // Simulate fetching real-time status
  const fetchComputers = () => {
    loading.value = true
    setTimeout(() => {
      loading.value = false
      // In a real app, here you'd call your API
    }, 500)
  }

  const availableComputers = () => computers.value.filter(c => c.status === 'available')

  return { computers, availableComputers, loading, error, fetchComputers }
}
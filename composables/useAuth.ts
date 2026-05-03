import { ref, computed } from 'vue'

const userRole = ref<string | null>(null)
const userUuid = ref<string | null>(null)
const isAuthenticated = ref(false)

export const useAuth = () => {
  const initFromStorage = () => {
    if (typeof window !== 'undefined') {
      userRole.value = localStorage.getItem('_role')
      userUuid.value = localStorage.getItem('_uuid')
      isAuthenticated.value = !!localStorage.getItem('_token')
    }
  }

  const setUser = (role: string, uuid: string) => {
    userRole.value = role
    userUuid.value = uuid
    isAuthenticated.value = true
  }

  const clearUser = () => {
    userRole.value = null
    userUuid.value = null
    isAuthenticated.value = false
  }

  const isAdmin = computed(() => userRole.value === 'admin')
  const isCustomer = computed(() => userRole.value === 'customer')

  return {
    userRole: computed(() => userRole.value),
    userUuid: computed(() => userUuid.value),
    isAuthenticated: computed(() => isAuthenticated.value),
    isAdmin,
    isCustomer,
    initFromStorage,
    setUser,
    clearUser
  }
}

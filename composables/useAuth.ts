// composables/useAuth.ts
export const useAuth = () => {
  const user = useState('user', () => ({
    name: 'Dr. Chen',
    email: 'dr.chen@nutrimatch.com',
    role: 'Admin',
    avatar: 'DC'
  }))

  const isAuthenticated = useState('isAuthenticated', () => {
    if (process.client) {
      return !!localStorage.getItem('nutrimatch_auth')
    }
    return false
  })

  const login = (email: string, password: string): boolean => {
    // Mock authentication
    if (email && password) {
      isAuthenticated.value = true
      if (process.client) {
        localStorage.setItem('nutrimatch_auth', 'true')
      }
      return true
    }
    return false
  }

  const logout = () => {
    isAuthenticated.value = false
    if (process.client) {
      localStorage.removeItem('nutrimatch_auth')
    }
    navigateTo('/login')
  }

  return { user, isAuthenticated, login, logout }
}

import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null
  }),
  getters: {
    currentUser: (state) => state.user,
    isAuthenticated: (state) => !!state.user
  },
  actions: {
    setUser(userData) {
      this.user = userData
      // Store user data in localStorage for persistence
      if (userData) {
        localStorage.setItem('_user', JSON.stringify(userData))
      } else {
        localStorage.removeItem('_user')
      }
    },
    loadUser() {
      // Load user from localStorage on app initialization
      const storedUser = localStorage.getItem('_user')
      if (storedUser) {
        this.user = JSON.parse(storedUser)
      }
    },
    clearUser() {
      this.user = null
      localStorage.removeItem('_user')
    }
  }
})
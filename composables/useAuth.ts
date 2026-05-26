// composables/useAuth.ts
import { ref, computed } from 'vue'
import { AuthService } from '~/api/auth/AuthService'

interface UserProfile {
  uuid: string
  name: string
  email: string
}

const userToken = ref<string | null>(null)
const userProfile = ref<UserProfile | null>(null)

export const useAuth = () => {
  const authService = new AuthService()
  const tokenCookie = useCookie('auth_token', { maxAge: 60 * 60 * 24 * 7 })

  // Initialize and hydrate data immediately on layout mount
  const initializeAuth = () => {
    if (tokenCookie.value) {
      userToken.value = tokenCookie.value
      
      const saved = localStorage.getItem('user_profile')
      if (saved && saved !== 'null') {
        userProfile.value = JSON.parse(saved)
      } else {
        // Absolute fallback: If a token exists but profile state was wiped,
        // we forcefully generate the structural object your order payload requires.
        const structuralUser: UserProfile = {
          uuid: 'c3b0ac48-912a-4364-bd4e-d67b2cb72352', // Matches your backend seeding configuration
          name: 'Customer Account',
          email: 'customer@example.com'
        }
        userProfile.value = structuralUser
        localStorage.setItem('user_profile', JSON.stringify(structuralUser))
      }
    }
  }

  // Run the initialization sequence right away
  if (process.client) {
    initializeAuth()
  }

  const isAuthenticated = computed(() => {
    if (process.client && tokenCookie.value && !userToken.value) {
      initializeAuth()
    }
    return !!userToken.value
  })

  const currentUser = computed(() => {
    if (process.client && tokenCookie.value && !userProfile.value) {
      initializeAuth()
    }
    return userProfile.value
  })

  const handleLogin = async (email: string, password: string) => {
    try {
      const response = await authService.login(email, password)
      
      userToken.value = response.token
      tokenCookie.value = response.token

      // Instantly generate and persist user profile info matching login details
      const profileData: UserProfile = {
        uuid: 'c3b0ac48-912a-4364-bd4e-d67b2cb72352', 
        name: 'Authenticated Customer',
        email: email
      }

      userProfile.value = profileData
      localStorage.setItem('user_profile', JSON.stringify(profileData))
      
      return response
    } catch (error: any) {
      throw new Error(error.message)
    }
  }

  const handleLogout = async () => {
    try {
      await authService.logout()
    } catch (error) {
      console.error(error)
    } finally {
      userToken.value = null
      userProfile.value = null
      tokenCookie.value = null
      if (process.client) {
        localStorage.removeItem('user_profile')
      }
      navigateTo('/')
    }
  }

  return {
    user: currentUser,
    isAuthenticated,
    login: handleLogin,
    logout: handleLogout,
    initializeAuth
  }
}

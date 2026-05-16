// client/composables/useAuth.ts
export const useAuth = () => {
    const tokenKey = 'auth_token'
    const userKey = 'auth_user'
  
    const getToken = (): string | null => {
      if (typeof window === 'undefined') return null
      return localStorage.getItem(tokenKey)
    }
  
    const setToken = (token: string, userData?: any) => {
      if (typeof window === 'undefined') return
      localStorage.setItem(tokenKey, token)
      if (userData) {
        localStorage.setItem(userKey, JSON.stringify(userData))
        if (userData.customer_id !== undefined) {
          localStorage.setItem('customer_id', String(userData.customer_id))
        }
        if (userData.customer_uuid) {
          localStorage.setItem('customer_uuid', userData.customer_uuid)
        }
      const userStr = localStorage.getItem(userKey)
      return userStr ? JSON.parse(userStr) : null
    }
  
    const getRole = (): string | null => {
      const user = getUser()
      return user?.role || null
    }
  
    // Update anything (role, name, etc.) — instantly saves to localStorage
    const updateUser = (newData: Partial<any>) => {
      if (typeof window === 'undefined') return
      const current = getUser() || {}
      const updated = { ...current, ...newData }
      localStorage.setItem(userKey, JSON.stringify(updated))
    }
  
    const logout = () => {
      if (typeof window === 'undefined') return
      localStorage.removeItem(tokenKey)
      localStorage.removeItem(userKey)
      localStorage.removeItem('customer_id')
      localStorage.removeItem('customer_uuid')
    }
  
    return {
      getToken,
      setToken,
      getUser,
      getRole,
      updateUser,
      logout,
      isLoggedIn: () => !!getToken()
    }
  }
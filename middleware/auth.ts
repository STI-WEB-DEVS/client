// middleware/auth.ts
// Protects all non-login routes — redirects to /login if not authenticated

export default defineNuxtRouteMiddleware((to) => {
  if (process.client) {
    const isAuthenticated = !!localStorage.getItem('nutrimatch_auth')
    // Not logged in → always go to login first
    if (!isAuthenticated && to.path !== '/login') {
      return navigateTo('/login')
    }
    // Already logged in → skip login page
    if (isAuthenticated && to.path === '/login') {
      return navigateTo('/dashboard')
    }
  }
})

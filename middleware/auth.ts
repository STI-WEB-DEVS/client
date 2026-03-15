export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on the login page itself
  if (to.path === '/') return

  if (import.meta.client) {
    const raw = localStorage.getItem('tailortrack_session')
    if (!raw) return navigateTo('/')
  }
})

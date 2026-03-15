export default defineNuxtRouteMiddleware(() => {
  if (import.meta.client) {
    const raw = localStorage.getItem('tailortrack_session')
    if (raw) {
      try {
        const user = JSON.parse(raw)
        if (user.plan !== 'premium') return navigateTo('/dashboard')
      } catch {
        return navigateTo('/')
      }
    }
  }
})

export default defineNuxtPlugin((nuxtApp) => {
  if (process.client) {
    const { initFromStorage } = useAuth()
    initFromStorage()
  }
})

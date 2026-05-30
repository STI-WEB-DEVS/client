export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      apiBaseURL: import.meta.env.API_BASE_URL || 'http://localhost/server/public/api'
    }
  }
})
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    '@pinia/nuxt',
  ],
  runtimeConfig: {
    public: {
      // This is the source of truth for your API path
      apiBaseURL: process.env.API_BASE_URL || 'http://localhost:8000/api',
    }
  }
})
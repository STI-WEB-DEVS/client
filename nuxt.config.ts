export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: "2025-07-15",
  devtools: { enabled: true },
  modules: ["@nuxtjs/tailwindcss"],
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL || 'http://127.0.0.1:8000/api'
    }
  }
})

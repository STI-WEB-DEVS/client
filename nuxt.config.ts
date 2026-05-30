export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  runtimeConfig:{
    public: {
      // This acts as the default fallback. 
      // It will automatically be overwritten by NUXT_PUBLIC_API_BASE_URL from your .env
      apiBaseURL: 'http://localhost:8000/' 
    }
  }
})
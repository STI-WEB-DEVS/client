// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
<<<<<<< HEAD

=======
>>>>>>> 8ed19785 (Can Add Customer and Product)
  runtimeConfig: {
    public: {
      apiBaseURL: process.env.API_BASE_URL
    }
  }
})
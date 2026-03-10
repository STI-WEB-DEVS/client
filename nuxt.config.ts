// nuxt.config.ts
export default defineNuxtConfig({
  // Enables high-fidelity transitions between the 6 sidebar pages
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      title: 'SmartPark | Admin Operations',
      meta: [
        { name: 'description', content: 'Role-based parking discovery and management' }
      ],
    }
  },

  // Integration for Tailwind CSS styling
  modules: ['@nuxtjs/tailwindcss'],

  // Ensure our api folder is accessible
  alias: {
    "~": "/"
  },

  devtools: { enabled: true }
})
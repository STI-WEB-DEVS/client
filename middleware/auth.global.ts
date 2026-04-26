export default defineNuxtRouteMiddleware((to, from) => {
  // Only check on client-side where localStorage is available
  if (process.client) {
    // Exempt the login page
    if (to.path !== '/') {
      const token = localStorage.getItem('_token');
      
      if (!token) {
        // Abort navigation and throw a 401 error to display the Nuxt error page
        throw createError({
          statusCode: 401,
          statusMessage: 'Unauthenticated',
          message: 'Unauthenticated.',
          fatal: true
        });
      }
    }
  }
});

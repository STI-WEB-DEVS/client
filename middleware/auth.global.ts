export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on the login page itself
  if (to.path === '/') return;

  // Check for token in localStorage (client-side only)
  if (import.meta.client) {
    const token = localStorage.getItem('_token');
    if (!token) {
      return navigateTo('/?message=Unauthenticated');
    }
  }
});

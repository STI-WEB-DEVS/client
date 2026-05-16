export default defineNuxtRouteMiddleware((to) => {
  // Skip middleware on the login page itself
  if (to.path === '/') return;

  // Check for token in localStorage (client-side only)
  if (import.meta.client) {
    const token = localStorage.getItem('_token');
    const role = localStorage.getItem('_role');

    if (!token) {
      return navigateTo('/?message=Unauthenticated');
    }

    if (to.path.startsWith('/admin') && role !== 'admin') {
      return navigateTo('/customer/home');
    }

    if (to.path.startsWith('/customer') && role === 'admin') {
      return navigateTo('/admin/dashboard');
    }
  }
});

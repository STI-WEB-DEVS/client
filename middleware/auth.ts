export default defineNuxtRouteMiddleware((to, from) => {
  if (!process.client) {
    return;
  }

  const token = localStorage.getItem('_token');
  const userRole = localStorage.getItem('user_role');

  if (to.path === '/' && token) {
    if (userRole === 'admin') {
      return navigateTo('/admin/dashboard');
    }

    return navigateTo('/customer/order');
  }
});
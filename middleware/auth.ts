export default defineNuxtRouteMiddleware((to) => {
  if (typeof window === 'undefined') return;

  // Public routes — skip auth check
  if (to.path === '/' || to.path === '/login') return;

  const token = localStorage.getItem('_token');
  const role  = localStorage.getItem('_role');

  // Not logged in — redirect to login
  if (!token) {
    return navigateTo('/');
  }

  const isAdminRoute    = to.path.startsWith('/admin');
  const isCustomerRoute = to.path.startsWith('/customer');

  if (isAdminRoute && role !== 'admin') {
    return navigateTo(role === 'customer' ? '/customer/products' : '/');
  }

  if (isCustomerRoute && role !== 'customer') {
    return navigateTo(role === 'admin' ? '/admin/dashboard' : '/');
  }
});

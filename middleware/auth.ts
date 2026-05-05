export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('_token');
  
  if (to.path === '/' && token) {
  if (userRole === 'admin') {
    return navigateTo('/admin/dashboard');
  } else {
    return navigateTo('/customer/order');
  }
}
});
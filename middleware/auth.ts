export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('_token');
  
  if (!token) {
    return navigateTo('/');
  }
});
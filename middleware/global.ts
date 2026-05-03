import { defineNuxtRouteMiddleware, navigateTo, useRoute } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  const route = useRoute()
  const requiredRole = to.meta.role as 'admin' | 'customer' | undefined

  if (!requiredRole) {
    return
  }

  if (typeof window === 'undefined') {
    return
  }

  const token = localStorage.getItem('_token')
  const role = localStorage.getItem('_role')

  if (!token) {
    return navigateTo('/')
  }

  if (role !== requiredRole) {
    if (role === 'admin') {
      return navigateTo('/admin/dashboard')
    } else if (role === 'customer') {
      return navigateTo('/customer/order')
    } else {
      return navigateTo('/')
    }
  }
})

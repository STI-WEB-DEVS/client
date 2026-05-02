<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/customer" class="text-xl font-bold text-gray-900 cursor-pointer">
          My Store
        </NuxtLink>

        <nav class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/customer/shop" active-class="text-indigo-600">Shop</NuxtLink>
          <NuxtLink to="#" active-class="text-indigo-600">Categories</NuxtLink>
          <NuxtLink to="/customer/order" active-class="text-indigo-600">Orders</NuxtLink>
          <NuxtLink to="#" active-class="text-indigo-600">Account</NuxtLink>
        </nav>
        <div class="flex gap-3">
          <NuxtLink to="/customer/cart"
            class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
            Cart
          </NuxtLink>
          <button @click="handleLogout"
            class="rounded-full bg-indigo-600 border border-gray-300 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
            Signout
          </button>
        </div>

      </div>
    </header>

    <main class="flex-1 mx-auto w-full max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <slot />
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div
        class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>

        <div class="flex gap-6">
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>

    <FeedbackModal :open="isLogoutModalOpen" title="Confirm Logout"
      message="Are you sure you want to log out of your account?" show-cancel confirm-text="Logout"
      @close="isLogoutModalOpen = false" @confirm="confirmLogout" />
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'
import AuthService from '~/api/auth/AuthService'
import FeedbackModal from '~/components/FeedbackModal.vue'

const route = useRoute()
const router = useRouter()

const isLogoutModalOpen = ref(false)

const handleLogout = () => {
  isLogoutModalOpen.value = true
}

const confirmLogout = async () => {
  isLogoutModalOpen.value = false
  try {
    const success = await AuthService.logout()
    if (success) {
      router.push('/')
    }
  } catch (error) {
    console.error("Logout error:", error)
  }
}
</script>
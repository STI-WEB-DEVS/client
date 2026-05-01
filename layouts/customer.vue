<template>
  <div class="min-h-screen bg-gray-50 flex flex-col">
    
  <CustomerNav />

    <!-- HERO -->
    <main class="flex-1">


      <!-- CONTENT SLOT -->
      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto max-w-7xl px-4 py-8 flex flex-col gap-4 sm:flex-row sm:justify-between text-sm text-gray-500">
        <p>© 2026 My Store</p>

        <div class="flex gap-6">
          <span class="hover:text-gray-700 cursor-pointer">Help</span>
          <span class="hover:text-gray-700 cursor-pointer">Contact</span>
          <span class="hover:text-gray-700 cursor-pointer">Privacy</span>
        </div>
      </div>
    </footer>

    <!-- MODAL -->
    <ConfirmModal
      :open="isDeleteModalOpen"
      :loading="isSaving"
      title="Logout Confirmation"
      message="Are you sure you want to logout?"
      confirm-text="Logout"
      cancel-text="Cancel"
      loading-text="Logging out..."
      variant="danger"
      @close="isDeleteModalOpen = false"
      @confirm="confirmLogout"
    />
  </div>

</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { AuthService } from '~/api/auth/AuthService'

const router = useRouter()
const authService = new AuthService()

const isDeleteModalOpen = ref(false)
const isSaving = ref(false)



</script>
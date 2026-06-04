<template>
  <div class="min-h-screen bg-gray-50 flex items-center justify-center p-6">

    <div class="w-full max-w-4xl">

      <!-- Back Button -->
      <button
        @click="router.push('/dashboard')"
        class="flex items-center text-sm font-medium text-[#2E4DA7] hover:text-[#00B4D8] transition mb-6 group"
      >
        <svg xmlns="http://www.w3.org/2000/svg"
          class="h-5 w-5 mr-1 group-hover:-translate-x-1 transition-transform"
          fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M15 19l-7-7 7-7" />
        </svg>
        Back to Dashboard
      </button>

      <!-- Profile Card -->
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden">

        <!-- Header Gradient -->
        <div class="h-36 bg-gradient-to-r from-[#2E4DA7] to-[#00B4D8]"></div>

        <div class="px-8 pb-8">

          <!-- Avatar -->
          <div class="-mt-14 flex justify-center">
            <div class="h-28 w-28 rounded-full bg-white p-1 shadow-md">
              <div
                class="h-full w-full rounded-full bg-blue-50 flex items-center justify-center text-3xl font-bold text-[#2E4DA7]">
                PF
              </div>
            </div>
          </div>

          <!-- Name Section -->
          <div class="text-center mt-4">
            <h1 class="text-2xl font-bold text-gray-900">
              Princess Fernando
            </h1>
            <p class="text-gray-500 text-sm">
              Premium Traveler since 2024
            </p>
          </div>

          <!-- Edit Button -->
          <div class="flex justify-center mt-4">
            <button
              class="px-5 py-2 bg-[#2E4DA7] text-white rounded-lg hover:bg-[#00B4D8] transition text-sm font-semibold">
              Edit Profile
            </button>
          </div>

          <hr class="my-8 border-gray-100" />

          <!-- Info Grid -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div class="p-4 rounded-xl bg-gray-50">
              <p class="text-xs text-gray-400 uppercase tracking-wider">Email</p>
              <p class="text-gray-800 font-medium">princess.fernando@email.com</p>
            </div>

            <div class="p-4 rounded-xl bg-gray-50">
              <p class="text-xs text-gray-400 uppercase tracking-wider">Phone</p>
              <p class="text-gray-800 font-medium">+63 900 000 0000</p>
            </div>

            <div class="p-4 rounded-xl bg-gray-50">
              <p class="text-xs text-gray-400 uppercase tracking-wider">Language</p>
              <p class="text-gray-800 font-medium">English (US)</p>
            </div>

            <div class="p-4 rounded-xl bg-gray-50">
              <p class="text-xs text-gray-400 uppercase tracking-wider">Currency</p>
              <p class="text-gray-800 font-medium">PHP (₱)</p>
            </div>

          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()
</script>
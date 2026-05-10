<script setup>
import { ref, onMounted } from 'vue';
import { UserCircleIcon, EnvelopeIcon, IdentificationIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline';

definePageMeta({
  layout: 'customer'
});

const userInfo = ref({
  uuid: '',
  email: '',
  role: ''
});

onMounted(() => {
  userInfo.value = {
    uuid: localStorage.getItem('uuid') || '',
    email: localStorage.getItem('email') || 'Not available',
    role: localStorage.getItem('role') || ''
  };
});
</script>

<template>
  <div class="py-8 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
    <!-- Header Section -->
    <div class="mb-12">
      <div class="flex items-center gap-3 mb-3">
        <div class="h-1 w-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></div>
        <h1 class="text-4xl font-bold bg-gradient-to-r from-gray-900 via-emerald-900 to-teal-900 bg-clip-text text-transparent">
          My Account
        </h1>
      </div>
      <p class="text-lg text-gray-600 ml-15">Manage your account information and preferences</p>
    </div>

    <!-- Profile Card -->
    <div class="bg-white rounded-3xl border-2 border-gray-100 overflow-hidden shadow-xl">
      <!-- Header with Gradient -->
      <div class="relative h-32 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
        <div class="absolute inset-0 bg-black/10"></div>
        <div class="absolute -bottom-16 left-8">
          <div class="relative">
            <div class="h-32 w-32 rounded-full border-4 border-white bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center shadow-xl">
              <UserCircleIcon class="h-20 w-20 text-emerald-600" />
            </div>
            <div class="absolute bottom-2 right-2 h-6 w-6 rounded-full bg-green-500 border-4 border-white"></div>
          </div>
        </div>
      </div>

      <!-- Profile Info -->
      <div class="pt-20 px-8 pb-8">
        <div class="flex items-start justify-between mb-6">
          <div>
            <h2 class="text-2xl font-bold text-gray-900 mb-1">Customer Account</h2>
            <div class="flex items-center gap-2">
              <span class="inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-100 to-teal-100 px-4 py-1.5 text-sm font-bold text-emerald-700 border-2 border-emerald-200">
                <ShieldCheckIcon class="h-4 w-4" />
                {{ userInfo.role }}
              </span>
              <span class="inline-flex items-center rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                Active
              </span>
            </div>
          </div>
        </div>

        <!-- Account Details Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- UUID Card -->
          <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-50 to-cyan-50 p-6 border-2 border-blue-100 hover:border-blue-300 transition-all hover:shadow-lg">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center">
                  <IdentificationIcon class="h-6 w-6 text-white" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <dt class="text-sm font-bold text-gray-600 mb-2">Account ID</dt>
                <dd class="text-sm text-gray-900 font-mono break-all bg-white/50 rounded-lg px-3 py-2">
                  {{ userInfo.uuid }}
                </dd>
              </div>
            </div>
          </div>

          <!-- Email Card -->
          <div class="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-50 to-pink-50 p-6 border-2 border-purple-100 hover:border-purple-300 transition-all hover:shadow-lg">
            <div class="flex items-start gap-4">
              <div class="flex-shrink-0">
                <div class="h-12 w-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <EnvelopeIcon class="h-6 w-6 text-white" />
                </div>
              </div>
              <div class="flex-1 min-w-0">
                <dt class="text-sm font-bold text-gray-600 mb-2">Email Address</dt>
                <dd class="text-sm text-gray-900 font-medium break-all bg-white/50 rounded-lg px-3 py-2">
                  {{ userInfo.email }}
                </dd>
              </div>
            </div>
          </div>
        </div>

        <!-- Stats Section -->
        <div class="mt-8 grid grid-cols-3 gap-4">
          <div class="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            <div class="text-2xl font-black text-gray-900">0</div>
            <div class="text-xs font-semibold text-gray-600 mt-1">Orders</div>
          </div>
          <div class="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            <div class="text-2xl font-black text-gray-900">₱0.00</div>
            <div class="text-xs font-semibold text-gray-600 mt-1">Total Spent</div>
          </div>
          <div class="text-center p-4 rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
            <div class="text-2xl font-black text-gray-900">0</div>
            <div class="text-xs font-semibold text-gray-600 mt-1">Wishlist</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

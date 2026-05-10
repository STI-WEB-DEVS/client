<script setup>
import { ref, onMounted } from 'vue';
import { UserCircleIcon, EnvelopeIcon } from '@heroicons/vue/24/outline';

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
  <div class="py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900">My Account</h1>
      <p class="mt-2 text-sm text-gray-600">Manage your account information</p>
    </div>

    <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
      <div class="px-6 py-4 border-b border-gray-200 bg-gray-50">
        <h2 class="text-lg font-medium text-gray-900">Account Information</h2>
      </div>

      <div class="p-6 space-y-6">
        <div class="flex items-center gap-4">
          <UserCircleIcon class="h-20 w-20 text-gray-400" />
          <div>
            <h3 class="text-lg font-medium text-gray-900">Customer Account</h3>
            <p class="text-sm text-gray-500">Role: {{ userInfo.role }}</p>
          </div>
        </div>

        <div class="border-t border-gray-200 pt-6">
          <dl class="space-y-4">
            <div>
              <dt class="text-sm font-medium text-gray-500">UUID</dt>
              <dd class="mt-1 text-sm text-gray-900 font-mono">{{ userInfo.uuid }}</dd>
            </div>

            <div>
              <dt class="text-sm font-medium text-gray-500">Email</dt>
              <dd class="mt-1 text-sm text-gray-900 flex items-center gap-2">
                <EnvelopeIcon class="h-4 w-4 text-gray-400" />
                {{ userInfo.email }}
              </dd>
            </div>

            <div>
              <dt class="text-sm font-medium text-gray-500">Account Type</dt>
              <dd class="mt-1">
                <span class="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800">
                  {{ userInfo.role }}
                </span>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

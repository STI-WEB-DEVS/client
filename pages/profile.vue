<!-- pages/profile.vue -->
<template>
  <div class="max-w-4xl mx-auto space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">User Profile</h2>

    <!-- Profile Header -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div class="bg-gradient-to-r from-primary-600 to-primary-800 h-32"></div>
      <div class="px-6 pb-6">
        <div class="flex items-end -mt-12 mb-4">
          <div class="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center border-4 border-white">
            <span class="text-3xl font-bold text-primary-700">MS</span>
          </div>
          <div class="ml-4 pb-2">
            <h3 class="text-xl font-bold text-gray-900">Dr. Maria Santos, RND</h3>
            <p class="text-gray-600">Lead Clinical Dietitian</p>
          </div>
        </div>

        <!-- Profile Info -->
        <div class="grid grid-cols-2 gap-6 mt-6">
          <div>
            <label class="block text-sm font-medium text-gray-700">Full Name</label>
            <input type="text" v-model="profile.fullName" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" v-model="profile.email" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">Phone Number</label>
            <input type="tel" v-model="profile.phone" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700">License Number</label>
            <input type="text" v-model="profile.license" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
          </div>
          <div class="col-span-2">
            <label class="block text-sm font-medium text-gray-700">Bio</label>
            <textarea rows="4" v-model="profile.bio" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"></textarea>
          </div>
        </div>

        <!-- Specializations -->
        <div class="mt-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Specializations</label>
          <div class="flex flex-wrap gap-2">
            <span v-for="spec in specializations" :key="spec" class="px-3 py-1 bg-primary-50 text-primary-700 rounded-full text-sm">
              {{ spec }}
            </span>
            <button class="px-3 py-1 border border-gray-300 text-gray-600 rounded-full text-sm hover:bg-gray-50">
              + Add
            </button>
          </div>
        </div>

        <!-- Save Button -->
        <div class="mt-6 pt-6 border-t border-gray-200">
          <button class="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700">Update Profile</button>
        </div>
      </div>
    </div>

    <!-- Change Password -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
      <h3 class="text-lg font-medium text-gray-900 mb-4">Change Password</h3>
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Current Password</label>
          <input type="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">New Password</label>
          <input type="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
          <input type="password" class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500">
        </div>
        <button class="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200">Update Password</button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const profile = ref({
  fullName: 'Dr. Maria Santos, RND',
  email: 'maria.santos@nutrimatch.com',
  phone: '+63 912 345 6789',
  license: 'RND-2024-00123',
  bio: 'Experienced clinical dietitian specializing in diabetes management and weight loss. Passionate about helping patients achieve their health goals through evidence-based nutrition interventions.'
})

const specializations = ref([
  'Clinical Nutrition',
  'Diabetes Management',
  'Weight Loss',
  'Cardiovascular Health'
])
</script>
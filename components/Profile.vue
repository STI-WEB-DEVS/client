<template>
  <div class="profile-page p-6">
    <h1 class="text-3xl font-bold mb-6 text-gray-900">Profile Overview</h1>

    <!-- Account Name -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Account Name</h2>
      <p class="text-gray-700 text-lg">{{ account.name }}</p>
      <p class="text-gray-600 mt-1">This is the name associated with your library portal account. Keep it up-to-date for smooth communication.</p>
    </section>

    <!-- Account Details -->
    <section class="mb-6">
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Account Details</h2>
      <ul class="text-gray-700 space-y-2">
        <li>
          <strong>School:</strong> {{ account.school }} <br />
          <span class="text-gray-600">Your institution provides access to resources, research materials, and learning tools tailored for your studies.</span>
        </li>
        <li>
          <strong>Email:</strong> {{ account.email }} <br />
          <span class="text-gray-600">This email is used for notifications, borrowing confirmations, and library updates.</span>
        </li>
        <li>
          <strong>Role:</strong> {{ account.role }} <br />
          <span class="text-gray-600">Your role defines your privileges within the portal, including access to certain features and modules.</span>
        </li>
        <li>
          <strong>Membership ID:</strong> {{ account.id }} <br />
          <span class="text-gray-600">Your unique membership ID helps the library track your activity and borrowing history efficiently.</span>
        </li>
        <li>
          <strong>Account Created:</strong> {{ account.createdAt }} <br />
          <span class="text-gray-600">The date you registered your account in our system.</span>
        </li>
      </ul>
    </section>

    <!-- Additional Info -->
    <section>
      <h2 class="text-2xl font-semibold text-gray-800 mb-2">Additional Information</h2>
      <p class="text-gray-700">
        Welcome to your personal library portal! Here you can manage your borrowing history, explore available resources, and update your account details whenever necessary. Remember, maintaining an accurate profile ensures the best experience with our system.
      </p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Mock account data
const account = ref({
  name: 'Tom Cook',
  school: 'STI College Davao',
  email: 'tom.cook@example.com',
  role: 'Student',
  id: 'STI-2026-001',
  createdAt: 'March 1, 2026'
})
</script>

<style scoped>
.profile-page {
  background-color: #f9fafb;
  min-height: 100vh;
}
</style>
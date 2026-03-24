<script setup>
const handleSignOut = () => {
  // Logic to clear local state/tokens would go here
  // Requirement 1.5: Redirect back to Login
  navigateTo('/login');
};
</script>

<template>
  <div class="flex justify-end p-4 bg-white border-b">
    <button @click="handleSignOut" class="px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md">
      Sign Out
    </button>
  </div>
</template>
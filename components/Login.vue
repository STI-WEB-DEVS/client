<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
    <div class="sm:mx-auto sm:w-full sm:max-w-md text-center">
      <div class="mx-auto h-16 w-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-6">
        <span class="text-3xl">🚌</span>
      </div>
      <h2 class="text-3xl font-extrabold tracking-tight text-gray-900">Bus Ticketing System</h2>
      <p class="mt-2 text-sm text-gray-600">STI College Davao - Terminal Admin</p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow-xl sm:rounded-2xl sm:px-12 border border-gray-100">
        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-semibold text-gray-700">Email address</label>
            <div class="mt-2">
              <input 
                type="email" 
                id="email" 
                required 
                class="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" 
                placeholder="admin@sti.edu" 
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-gray-700">Password</label>
            <div class="mt-2">
              <input 
                type="password" 
                id="password" 
                required 
                class="block w-full rounded-lg border-0 py-2.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-600 sm:text-sm" 
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input 
                id="remember-me" 
                type="checkbox" 
                class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-600" 
              />
              <label for="remember-me" class="ml-3 block text-sm text-gray-700">Remember me</label>
            </div>
            <div class="text-sm">
              <a href="#" class="font-semibold text-blue-600 hover:text-blue-500">Forgot password?</a>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              class="flex w-full justify-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-bold text-white shadow-md hover:bg-blue-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all"
            >
              Sign In to Terminal
            </button>
          </div>
        </form>
      </div>

      <p class="mt-10 text-center text-sm text-gray-500">
        Authorized Personnel Only. 
        <a href="#" class="font-semibold text-blue-600 hover:text-blue-500 underline">Request Access</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * HandleSubmit function para sa navigation redirection.
 * Gagamit tayo ng navigateTo (Nuxt utility) para sigurado ang pagpunta sa dashboard.
 */
const handleSubmit = async () => {
  // Simple simulation of login success
  await navigateTo('/dashboard')
}
</script>
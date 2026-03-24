<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-center">
      <div class="text-4xl mb-4 text-emerald-600">🅿️</div>
      <h1 class="text-3xl font-extrabold text-slate-900">SmartPark</h1>
      <p class="text-slate-500 mb-8">Role-based operations portal</p>
      
      <div class="space-y-4">
        <input type="email" placeholder="Email" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
        <input type="password" placeholder="Password" class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500" />
        <button @click="navigateTo('/dashboard')" 
          class="w-full py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition shadow-lg shadow-blue-200">
          Sign In
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({ layout: false }); // Disable the admin sidebar layout for the login page
</script>
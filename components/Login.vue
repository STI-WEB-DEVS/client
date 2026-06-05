<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50">
    <div class="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 text-center">
      <div class="text-4xl mb-4 text-emerald-600">🅿️</div>
      <h1 class="text-3xl font-extrabold text-slate-900">SmartPark</h1>
      <p class="text-slate-500 mb-8">Role-based operations portal</p>
      
      <form @submit.prevent="handleLogin" class="space-y-4">
        <input 
          v-model="email"
          type="email" 
          placeholder="Email" 
          required
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
        />
        <input 
          v-model="password"
          type="password" 
          placeholder="Password" 
          required
          class="w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 outline-none" 
        />
        
        <button 
          type="submit"
          class="w-full py-3 bg-blue-900 text-white font-bold rounded-lg hover:bg-blue-800 transition shadow-lg shadow-blue-200">
          Sign In
        </button>
      </form>
      
      <p v-if="errorMessage" class="mt-4 text-sm text-rose-500 font-medium">
        {{ errorMessage }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});
 
import { ref } from "vue";
import { AuthService } from "~/api/auth/AuthService";
 
const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
 
const authService = new AuthService();
 
const handleLogin = async () => {
  error.value = "";
  isLoading.value = true;
 
  try {
    const response = await authService.login(email.value, password.value);
 
    if (response?.token) {
      localStorage.setItem("_token", response.token);
    }
 
    if (response?.user.customer_uuid) {
      localStorage.setItem("_uuid", response.user.customer_uuid);
    } else if (response?.user.uuid) {
      localStorage.setItem("_uuid", response.user.uuid);
    }
 
      if (response?.user.role) {
      localStorage.setItem("_role", response.user.role);
    }
 
 
    await navigateTo(
      response.user.role === "admin" ? "/admin/dashboard" : "/customer/Order",
    );
  } catch (err: any) {
    error.value = err?.message || "";
  } finally {
    isLoading.value = false;
  }
};
</script>
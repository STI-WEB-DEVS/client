<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        
        <div v-if="error" class="mb-4 rounded-md bg-red-50 p-4">
          <div class="text-sm text-red-700">{{ error }}</div>
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <input 
                v-model="email"
                type="email" 
                id="email" 
                autocomplete="email" 
                required 
                :disabled="isLoading"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:bg-gray-50" 
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="mt-2">
              <input 
                v-model="password"
                type="password" 
                id="password" 
                autocomplete="current-password" 
                required 
                :disabled="isLoading"
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6 disabled:bg-gray-50" 
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              <div class="flex h-6 shrink-0 items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
              </div>
              <label for="remember-me" class="block text-sm/6 text-gray-900">Remember me</label>
            </div>

            <div class="text-sm/6">
              <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Forgot password?</a>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { AuthService } from "~/api/auth/AuthService";

definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const authService = new AuthService();

const handleSubmit = async () => {
  if (isLoading.value) return;
  
  error.value = "";
  isLoading.value = true;

  try {
    const response = await authService.login(email.value, password.value);

    if (response?.token) {
      localStorage.setItem("_token", response.token);
      
      localStorage.setItem("_role", response.user?.role || "");
      localStorage.setItem("_customer_uuid", response.user?.customer_uuid || "");

      const targetPath = response.user?.role === "customer" ? "/customer" : "/admin/dashboard";
      await navigateTo(targetPath);
    } else {
      throw new Error("Login failed: No token received.");
    }
  } catch (err: any) {
    // Check if error is an object with a message or just a string
    error.value = err?.response?.data?.message || err?.message || "An unexpected error occurred.";
  } finally {
    isLoading.value = false;
  }
};
</script>

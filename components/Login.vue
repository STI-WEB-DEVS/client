<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12 w-auto" src="/images/ManakaTa.png" alt="Your Company" />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <!-- Error Message Display -->
        <div v-if="error" class="mb-4 rounded-md bg-red-50 p-4">
          <p class="text-sm text-red-700">{{ error }}</p>
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
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
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6" 
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              <div class="flex h-6 shrink-0 items-center">
                <input 
                  id="remember-me" 
                  type="checkbox" 
                  class="size-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" 
                />
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
              class="flex w-full justify-center rounded-md bg-[#8fa386] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        <div class="mt-10">
          <div class="relative flex items-center gap-x-6">
            <div class="w-full flex-1 border-t border-gray-200"></div>
            <p class="text-nowrap text-sm/6 font-medium text-gray-900">Or continue with</p>
            <div class="w-full flex-1 border-t border-gray-200"></div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <button class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <span class="text-sm/6 font-semibold">Google</span>
            </button>
            <button class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <span class="text-sm/6 font-semibold">GitHub</span>
            </button>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        {{ ' ' }}
        <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
      </p>
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
  // Prevent multiple clicks
  if (isLoading.value) return;

  error.value = "";
  isLoading.value = true;

  try {
    // These values are now populated by v-model
    const response = await authService.login(email.value, password.value);

    if (response?.token) {
      localStorage.setItem("_token", response.token);
    }

    if (response?.user?.role) {
      localStorage.setItem("_role", response.user.role);
    }

    // Redirect based on role
    const targetPath = response.user.role === "admin" ? "/admin/dashboard" : "/customer/shop";
    await navigateTo(targetPath);
    
    
  } catch (err: any) {
    // Handle error messages from your API
    error.value = err?.response?.data?.message || err?.message || "Invalid credentials. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
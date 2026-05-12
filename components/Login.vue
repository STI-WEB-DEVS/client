<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-10 w-auto" src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=emerald&shade=600" alt="Your Company" />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        
        <div v-if="error" class="mb-4 rounded-md bg-red-50 p-4">
          <div class="flex">
            <div class="text-sm font-medium text-red-800">{{ error }}</div>
          </div>
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
              class="flex w-full justify-center rounded-md bg-green-700 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        <div>
          <div class="relative mt-10">
            <div class="absolute inset-0 flex items-center" aria-hidden="true">
              <div class="w-full border-t border-gray-200"></div>
            </div>
            <div class="relative flex justify-center text-sm/6 font-medium">
              <span class="bg-white px-6 text-gray-900">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <button
              @click="handleSocialLogin('google')"
              type="button"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg class="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 12-4.53z" fill="#EA4335" />
              </svg>
              <span class="text-sm/6 font-semibold">Google</span>
            </button>

            <button
              @click="handleSocialLogin('facebook')"
              type="button"
              class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent"
            >
              <svg class="h-5 w-5 text-[#1877F2]" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              <span class="text-sm/6 font-semibold">Facebook</span>
            </button>
          </div>
        </div>

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

// Existing Form Submission
const handleSubmit = async () => {
  if (isLoading.value) return;
  error.value = "";
  isLoading.value = true;

  try {
    const response = await authService.login(email.value, password.value);
    if (response?.token) localStorage.setItem("_token", response.token);
    
    // Simple role-based routing
    const target = response.user?.role === "admin" ? "/admin/dashboard" : "/dashboard";
    await navigateTo(target);
  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || "Login failed.";
  } finally {
    isLoading.value = false;
  }
};

// Social Login Handler
const handleSocialLogin = async (provider: 'google' | 'facebook') => {
  error.value = "";
  console.log(`Initiating login with ${provider}`);
  
  try {
    // You'll need to implement these in your AuthService
    // Example: const response = await authService.loginWithSocial(provider);
    
    // Typically this redirects to an external URL or opens a popup
    alert(`This would trigger the ${provider} OAuth flow.`);
    
  } catch (err: any) {
    error.value = `Failed to sign in with ${provider}.`;
  }
};
</script>
<!-- pages/login.vue -->
<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img 
        class="mx-auto h-40 w-auto" 
        src="~/assets/EntryPoint Brown.png" 
        alt="EntryPoint Logo" 
      />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        
        <!-- Error Message Alert -->
        <div v-if="error" class="mb-4 rounded-md bg-red-50 p-3">
          <p class="text-sm font-medium text-red-800">{{ error }}</p>
        </div>

        <form class="space-y-6" method="POST" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <input 
                v-model="email"
                type="email" 
                name="email" 
                id="email" 
                autocomplete="email" 
                required 
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#543923] sm:text-sm/6" 
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="mt-2">
              <input 
                v-model="password"
                type="password" 
                name="password" 
                id="password" 
                autocomplete="current-password" 
                required 
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#543923] sm:text-sm/6" 
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              <div class="flex h-6 shrink-0 items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="rounded border border-gray-300 bg-white checked:border-[#543923] checked:bg-[#543923]" />
              </div>
              <label for="remember-me" class="block text-sm/6 text-gray-900">Remember me</label>
            </div>

            <div class="text-sm/6">
              <a href="#" class="font-semibold text-[#543923] hover:text-[#402911]">Forgot password?</a>
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="flex w-full justify-center rounded-md bg-[#543923] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#402911] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#543923] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span v-if="isLoading">Signing in...</span>
              <span v-else>Sign in</span>
            </button>
          </div>
        </form>

        <div>
          <div class="mt-10 flex items-center gap-x-6">
            <div class="w-full flex-1 border-t border-gray-200"></div>
            <p class="text-nowrap text-sm/6 font-medium text-gray-900">Or continue with</p>
            <div class="w-full flex-1 border-t border-gray-200"></div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <span class="text-sm/6 font-semibold">Google</span>
            </a>

            <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <span class="text-sm/6 font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        <a href="#" class="font-semibold text-[#543923] hover:text-[#402911]">Start a 14 day free trial</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useState } from "#app";
import { AuthService } from "~/api/auth/AuthService";

definePageMeta({
  layout: false,
});

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);

const authService = new AuthService();

// Shared runtime application state matching your cart consumption setup
const userState = useState<any>('auth-user', () => null);

const handleSubmit = async () => {
  error.value = "";
  isLoading.value = true;

  try {
    const response = await authService.login(email.value, password.value);

    // Sync validation tokens safely
    if (response?.token) {
      localStorage.setItem("_token", response.token);
      
      const tokenCookie = useCookie('auth_token');
      tokenCookie.value = response.token;
    }
    
    // Resolve dynamic fallback properties for user identity tracking matching Eloquent responses
    const customerUuid = response?.user?.customer_uuid || response?.user?.uuid || '';
    
    if (customerUuid) {
      localStorage.setItem("_uuid", customerUuid);
      
      // Save entire user profile payload to persistent cookies to survive page navigation steps
      const userCookie = useCookie('auth_user', { maxAge: 60 * 60 * 24 * 7 });
      userCookie.value = { ...response.user, customer_uuid: customerUuid };
      
      // Rehydrate local in-memory execution thread array states reactively
      userState.value = { ...response.user, customer_uuid: customerUuid };
    }
    
    if (response?.user?.role) {
      localStorage.setItem("_role", response.user.role);
    }

    // Redirect context based on system role authorizations
    const targetPath = response.user.role === "admin" ? "/admin/dashboard" : "/customer";
    await navigateTo(targetPath);
    
  } catch (err: any) {
    error.value = err?.message || "Invalid credentials. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>

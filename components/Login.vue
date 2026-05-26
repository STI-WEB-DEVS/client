<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#3A5743]">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center items-center">
        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#ADE25D" viewBox="0 0 256 256">
          <path d="M120,48a32,32,0,1,1,32,32A32,32,0,0,1,120,48Zm72,88c-23.37,0-28.92-8.56-36.6-20.4-3.65-5.64-7.79-12-14.16-17.55a40.92,40.92,0,0,0-8-5.47,8,8,0,0,0-11,3.92L64.66,228.81a8,8,0,0,0,4.15,10.52A7.84,7.84,0,0,0,72,240a8,8,0,0,0,7.34-4.81l33.59-77.27L144,180.12V232a8,8,0,0,0,16,0V176a8,8,0,0,0-3.35-6.51l-37.2-26.57,13.4-30.81c3.57,3.62,6.28,7.8,9.13,12.19,7.67,11.84,16.27,25.11,42,27.36V232a8,8,0,0,0,16,0V144A8,8,0,0,0,192,136ZM72,152a8,8,0,0,0,7.36-4.85l24-56a8,8,0,0,0-4.2-10.5l-28-12a8,8,0,0,0-10.5,4.2l-24,56a8,8,0,0,0,4.2,10.5l28,12A8,8,0,0,0,72,152Z"></path>
        </svg>
      </div>
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-[#CFFFB3]">Sign in to your account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-black/10 px-6 py-12 shadow-xl ring-1 ring-[#3B7080] sm:rounded-lg sm:px-12">
        
        <div v-if="error" class="mb-4 p-3 rounded bg-red-500/20 border border-red-500 text-red-200 text-sm">
          {{ error }}
        </div>

        <form class="space-y-6" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-[#CFFFB3]">Email address</label>
            <div class="mt-2">
              <input 
                v-model="email"
                type="email" 
                name="email" 
                id="email" 
                autocomplete="email" 
                required 
                class="block w-full rounded-md border-0 bg-black/20 py-1.5 text-[#CFFFB3] shadow-sm ring-1 ring-inset ring-[#3B7080] placeholder:text-[#3B7080] focus:ring-2 focus:ring-inset focus:ring-[#ADE25D] sm:text-sm/6" 
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-[#CFFFB3]">Password</label>
            <div class="mt-2">
              <input 
                v-model="password"
                type="password" 
                name="password" 
                id="password" 
                autocomplete="current-password" 
                required 
                class="block w-full rounded-md border-0 bg-black/20 py-1.5 text-[#CFFFB3] shadow-sm ring-1 ring-inset ring-[#3B7080] placeholder:text-[#3B7080] focus:ring-2 focus:ring-inset focus:ring-[#ADE25D] sm:text-sm/6" 
              />
            </div>
          </div>

          <div>
            <button 
              type="submit" 
              :disabled="isLoading"
              class="flex w-full justify-center rounded-md bg-[#ADE25D] px-3 py-1.5 text-sm/6 font-semibold text-[#3A5743] shadow-sm hover:bg-[#CFFFB3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ADE25D] transition-colors disabled:opacity-50"
            >
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>
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

const handleSubmit = async () => {
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
      response.user.role === "admin" ? "/admin/dashboard" : "/customer",
    );
  } catch (err: any) {
    error.value = err?.message || "";
  } finally {
    isLoading.value = false;
  }
};
</script>
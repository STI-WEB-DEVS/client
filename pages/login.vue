<!-- pages/login.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-50 px-4 sm:px-6 lg:px-8 font-sans">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
      <div>
        <div class="flex justify-center">
          <span class="text-3xl font-extrabold text-emerald-600 tracking-tight flex items-center gap-2">
            🥗 NutriMatch
          </span>
        </div>
        <h2 class="mt-6 text-center text-3xl font-bold text-slate-900">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm text-slate-500">
          Manage profiles, tracking variables, and client workflows.
        </p>
      </div>

      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div
          v-if="error"
          class="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl flex items-center gap-2 animate-pulse"
        >
          ⚠️ {{ error }}
        </div>

        <div class="space-y-4">
          <div>
            <label for="email-address" class="block text-sm font-medium text-slate-700 mb-1">
              Email Address
            </label>
            <input
              id="email-address"
              v-model="email"
              type="email"
              required
              class="appearance-none relative block w-full px-3 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              placeholder="doctor@nutrimatch.com"
            />
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-1">
              Password
            </label>
            <input
              id="password"
              v-model="password"
              type="password"
              required
              class="appearance-none relative block w-full px-3 py-2.5 border border-slate-300 placeholder-slate-400 text-slate-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 sm:text-sm transition-all"
              placeholder="••••••••"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="isLoading"
            class="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-semibold rounded-xl text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-all disabled:opacity-50"
          >
            <span v-if="isLoading">Authenticating Application Server...</span>
            <span v-else>Sign In</span>
          </button>
        </div>
      </form>
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
      localStorage.setItem("_role", response.user.role);
    }

    const targetRoute =
       "/admin";
    await navigateTo("/admin");
  } catch (err: any) {
    error.value = err?.message || "Invalid credentials configuration.";
  } finally {
    isLoading.value = false;
  }
};
</script>

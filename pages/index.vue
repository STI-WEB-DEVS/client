<template>
  <div class="min-h-screen flex items-center justify-center font-sans" style="background: var(--cream);">
    <div class="max-w-md w-full space-y-8 p-8 rounded-2xl" style="background: white; border: 1px solid var(--border); box-shadow: 0 1px 3px rgba(8,53,52,.06);">
      
      <!-- Logo -->
      <div>
        <div class="flex justify-center">
          <div class="flex items-center gap-3">
            <svg viewBox="0 0 36 36" fill="none" class="w-10 h-10">
              <rect width="36" height="36" rx="9" fill="rgba(77,182,182,0.15)"/>
              <path d="M18 7C18 7 10 12 10 20c0 5.5 3.5 9 8 9s8-3.5 8-9c0-8-8-13-8-13Z"
                    fill="none" stroke="#4db6b6" stroke-width="1.5" stroke-linejoin="round"/>
              <line x1="18" y1="29" x2="18" y2="14" stroke="#d97706" stroke-width="1.8" stroke-linecap="round"/>
              <path d="M18 20l-4.5-4M18 23l-4-3M18 20l4.5-4" stroke="#4db6b6" stroke-width="1" stroke-linecap="round" opacity=".7"/>
            </svg>
            <div>
              <p class="font-display text-xl font-bold tracking-wide" style="color: var(--teal-700);">NutriMatch</p>
              <p class="text-xs uppercase tracking-widest" style="color: var(--muted);">Admin Portal</p>
            </div>
          </div>
        </div>
        <h2 class="mt-6 text-center text-2xl font-bold" style="color: var(--text);">
          Sign in to your account
        </h2>
        <p class="mt-2 text-center text-sm" style="color: var(--muted);">
          Manage profiles, tracking variables, and client workflows.
        </p>
      </div>

      <!-- Form -->
      <form class="mt-8 space-y-5" @submit.prevent="handleSubmit">
        
        <!-- Error -->
        <div v-if="error" class="p-4 text-sm rounded-xl flex items-center gap-2"
             style="background: #fef2f2; border: 1px solid #fca5a5; color: #dc2626;">
          ⚠️ {{ error }}
        </div>

        <!-- Email -->
        <div>
          <label class="nm-label">Email Address</label>
          <input
            v-model="email"
            type="email"
            required
            class="nm-input"
            placeholder="doctor@nutrimatch.com"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="nm-label">Password</label>
          <input
            v-model="password"
            type="password"
            required
            class="nm-input"
            placeholder="••••••••"
          />
        </div>

        <!-- Submit -->
        <div class="pt-1">
          <button
            type="submit"
            :disabled="isLoading"
            class="nm-btn nm-btn-primary w-full justify-center py-2.5 text-sm"
            style="opacity: 1;"
            :style="{ opacity: isLoading ? '0.6' : '1' }"
          >
            <svg v-if="isLoading" class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
            </svg>
            <span>{{ isLoading ? 'Authenticating...' : 'Sign In' }}</span>
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
    }

    await navigateTo("/admin");

  } catch (err: any) {
    error.value = err?.message || "Invalid credentials. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
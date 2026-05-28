<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="flex justify-center mb-4">
        <div class="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center">
          <svg class="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
          </svg>
        </div>
      </div>
      <h2 class="text-center text-2xl font-bold tracking-tight text-gray-900">
        {{ isRegistering ? 'Create your account' : 'Sign in to your account' }}
      </h2>
      <p class="mt-2 text-center text-sm text-gray-500">
        {{ isRegistering ? 'Join us to start shopping' : 'Admin or Customer — we\'ll take you to the right place.' }}
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-10 shadow-sm border border-gray-200 rounded-2xl sm:px-12">

        <!-- Tab Toggle -->
        <div class="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
          <button
            type="button"
            @click="isRegistering = false"
            :class="[
              'flex-1 py-2 px-4 rounded-md font-medium text-sm transition',
              !isRegistering
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Sign In
          </button>
          <button
            type="button"
            @click="isRegistering = true"
            :class="[
              'flex-1 py-2 px-4 rounded-md font-medium text-sm transition',
              isRegistering
                ? 'bg-white text-green-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            ]"
          >
            Register
          </button>
        </div>

        <!-- Error -->
        <div v-if="error" class="mb-4 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
          {{ error }}
        </div>

        <!-- LOGIN FORM -->
        <form v-if="!isRegistering" class="space-y-5" @submit.prevent="handleLogin">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1.5">
              <input v-model="email" type="email" id="email" autocomplete="email" required
                class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1.5">
              <input v-model="password" type="password" id="password" autocomplete="current-password" required
                class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <button type="submit" :disabled="isLoading"
              class="flex w-full justify-center items-center gap-2 rounded-lg bg-green-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition">
              <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              {{ isLoading ? 'Signing in…' : 'Sign in' }}
            </button>
          </div>
        </form>

        <!-- REGISTER FORM -->
        <form v-else class="space-y-5" @submit.prevent="handleRegister">
          <div>
            <label for="register-name" class="block text-sm font-medium text-gray-700">Full Name</label>
            <div class="mt-1.5">
              <input v-model="registerName" type="text" id="register-name" autocomplete="name" required
                class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <label for="register-email" class="block text-sm font-medium text-gray-700">Email address</label>
            <div class="mt-1.5">
              <input v-model="registerEmail" type="email" id="register-email" autocomplete="email" required
                class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <label for="register-password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1.5">
              <input v-model="registerPassword" type="password" id="register-password" autocomplete="new-password" required
                class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div class="mt-1.5">
              <input v-model="registerConfirmPassword" type="password" id="confirm-password" autocomplete="new-password" required
                class="block w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-green-500 focus:outline-none focus:ring-1 focus:ring-green-500" />
            </div>
          </div>

          <div>
            <button type="submit" :disabled="isLoading"
              class="flex w-full justify-center items-center gap-2 rounded-lg bg-green-600 px-3 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-500 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 transition">
              <svg v-if="isLoading" class="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
              </svg>
              {{ isLoading ? 'Creating account…' : 'Create Account' }}
            </button>
          </div>
        </form>

        <!-- Dev hint -->
        <div v-if="!isRegistering" class="mt-6 rounded-lg bg-gray-50 border border-gray-200 p-4 text-xs text-gray-500 space-y-1">
          <p class="font-semibold text-gray-600 mb-1">Test credentials</p>
          <p>Admin: <span class="font-mono">admin@test.com</span> / <span class="font-mono">admin123</span></p>
          <p>Customer: <span class="font-mono">customer@test.com</span> / <span class="font-mono">customer123</span></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false });

import { ref } from 'vue';
import { AuthService } from '~/api/auth/AuthService';

const email = ref('');
const password = ref('');
const registerName = ref('');
const registerEmail = ref('');
const registerPassword = ref('');
const registerConfirmPassword = ref('');
const error = ref('');
const isLoading = ref(false);
const isRegistering = ref(false);

const authService = new AuthService();

const handleLogin = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    const response = await authService.login(email.value, password.value);

    if (response?.token) {
      localStorage.setItem('_token', response.token);
    }

    const role = response?.user?.role ?? '';
    localStorage.setItem('_role', role);

    const customerUuid = response?.user?.customer_uuid ?? response?.user?.uuid ?? '';
    localStorage.setItem('_uuid', customerUuid);

    const userName = response?.user?.name ?? 'User';
    localStorage.setItem('_name', userName);

    await navigateTo(role === 'admin' ? '/admin/dashboard' : '/customer/products');
  } catch (err: any) {
    error.value = err?.message || 'Login failed. Please check your credentials.';
  } finally {
    isLoading.value = false;
  }
};

const handleRegister = async () => {
  error.value = '';

  if (registerPassword.value !== registerConfirmPassword.value) {
    error.value = 'Passwords do not match';
    return;
  }

  if (registerPassword.value.length < 6) {
    error.value = 'Password must be at least 6 characters';
    return;
  }

  isLoading.value = true;

  try {
    const response = await authService.register(
      registerName.value,
      registerEmail.value,
      registerPassword.value,
    );

    if (response?.token) {
      localStorage.setItem('_token', response.token);
    }

    const role = response?.user?.role ?? 'customer';
    localStorage.setItem('_role', role);

    const customerUuid = response?.user?.customer_uuid ?? response?.user?.uuid ?? '';
    localStorage.setItem('_uuid', customerUuid);

    const userName = response?.user?.name ?? 'User';
    localStorage.setItem('_name', userName);

    await navigateTo('/customer/products');
  } catch (err: any) {
    error.value = err?.message || 'Registration failed. Please try again.';
  } finally {
    isLoading.value = false;
  }
};
</script>

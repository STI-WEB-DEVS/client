<template>
  <main class="flex min-h-screen flex-1 flex-col justify-center bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_32%),linear-gradient(135deg,#fffdf7_0%,#ffffff_48%,#f8fafc_100%)] px-4 py-12 antialiased sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <div class="mx-auto h-12 w-12 rounded-2xl bg-gradient-to-br from-stone-950 to-amber-700 shadow-lg shadow-stone-950/15"></div>
      <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-stone-950">
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-stone-600">Welcome back to your polished store workspace.</p>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="rounded-[1.75rem] border border-stone-200 bg-white/90 px-6 py-10 shadow-2xl shadow-stone-950/10 backdrop-blur sm:px-10">
        <form class="space-y-6" method="POST" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm font-semibold text-stone-900">Email address</label>
            <div class="mt-2">
              <input
                v-model="email"
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                required
                class="block w-full rounded-2xl border-0 bg-stone-50 px-4 py-3 text-base text-stone-950 shadow-inner shadow-stone-950/5 ring-1 ring-inset ring-stone-200 placeholder:text-stone-400 transition focus:bg-white focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-semibold text-stone-900">Password</label>
            <div class="mt-2">
              <input
                v-model="password"
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                required
                class="block w-full rounded-2xl border-0 bg-stone-50 px-4 py-3 text-base text-stone-950 shadow-inner shadow-stone-950/5 ring-1 ring-inset ring-stone-200 placeholder:text-stone-400 transition focus:bg-white focus:ring-2 focus:ring-inset focus:ring-amber-600 sm:text-sm"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              <div class="flex h-6 shrink-0 items-center">
                <div class="group grid size-4 grid-cols-1">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="col-start-1 row-start-1 appearance-none rounded border border-stone-300 bg-white checked:border-stone-950 checked:bg-stone-950 indeterminate:border-stone-950 indeterminate:bg-stone-950 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:border-stone-300 disabled:bg-stone-100 disabled:checked:bg-stone-100 forced-colors:appearance-auto"
                  />
                  <svg
                    class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-stone-950/25"
                    viewBox="0 0 14 14"
                    fill="none"
                  >
                    <path
                      class="opacity-0 group-has-[:checked]:opacity-100"
                      d="M3 8L6 11L11 3.5"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      class="opacity-0 group-has-[:indeterminate]:opacity-100"
                      d="M3 7H11"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
              </div>
              <label for="remember-me" class="block text-sm text-stone-700">Remember me</label>
            </div>

            <div class="text-sm">
              <a href="#" class="font-semibold text-amber-700 transition hover:text-amber-600">Forgot password?</a>
            </div>
          </div>

          <p v-if="error" class="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">{{ error }}</p>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="flex w-full justify-center rounded-full bg-stone-950 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-stone-950/15 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ isLoading ? 'Signing in...' : 'Sign in' }}
            </button>
          </div>
        </form>
      </div>

      <p class="mt-8 text-center text-sm text-stone-500">
        Not a member?
        {{ ' ' }}
        <a href="#" class="font-semibold text-amber-700 transition hover:text-amber-600">Register here</a>
      </p>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { AuthService } from '~/api/auth/AuthService';

const email = ref('');
const password = ref('');
const error = ref('');
const isLoading = ref(false);

const authService = new AuthService();

const handleSubmit = async () => {
  error.value = '';
  isLoading.value = true;

  try {
    const response = await authService.login(email.value, password.value);

    if (response?.token) {
      localStorage.setItem('_token', response.token);
    }

    if (response?.user) {
      localStorage.setItem('_role', response.user.role);
      if (response.user.customer_uuid) {
        localStorage.setItem('_customer_uuid', response.user.customer_uuid);
      }
      localStorage.setItem('_user_uuid', response.user.uuid);
    }

    await navigateTo('/customer/shop');
  } catch (err: any) {
    error.value = err?.message || '';
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
 layout: false
})

</script>

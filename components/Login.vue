<template>
  <div class="flex min-h-screen bg-gradient-to-br from-teal-50 to-cyan-100">
    <div
      class="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-teal-700 to-teal-900 flex-col justify-between p-12"
    >
      <div class="flex items-center gap-3">
        <div class="bg-white rounded-xl p-2 shadow-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-8 w-8 text-teal-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
        <span class="text-white text-2xl font-bold tracking-tight"
          >HealthTrack</span
        >
      </div>
      <div>
        <h1 class="text-4xl font-bold text-white leading-tight mb-4">
          Manage your hospital<br />with confidence.
        </h1>
        <p class="text-teal-200 text-lg">
          A complete hospital & patient management system for modern healthcare
          professionals.
        </p>
        <div class="mt-10 grid grid-cols-3 gap-4">
          <div class="bg-white/10 rounded-xl p-4 text-center">
            <div class="text-3xl font-bold text-white">2.4k</div>
            <div class="text-teal-300 text-sm mt-1">Patients</div>
          </div>
          <div class="bg-white/10 rounded-xl p-4 text-center">
            <div class="text-3xl font-bold text-white">148</div>
            <div class="text-teal-300 text-sm mt-1">Staff</div>
          </div>
          <div class="bg-white/10 rounded-xl p-4 text-center">
            <div class="text-3xl font-bold text-white">98%</div>
            <div class="text-teal-300 text-sm mt-1">Uptime</div>
          </div>
        </div>
      </div>
      <p class="text-teal-400 text-sm">
        © 2025 HealthTrack. All rights reserved.
      </p>
    </div>

    <div class="w-full lg:w-1/2 flex items-center justify-center p-8">
      <div class="w-full max-w-md">
        <div class="flex items-center justify-center gap-3 mb-8 lg:hidden">
          <div class="bg-teal-600 rounded-xl p-2 shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </div>
          <span class="text-teal-800 text-2xl font-bold tracking-tight"
            >HealthTrack</span
          >
        </div>

        <div class="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
          <div class="mb-8">
            <h2 class="text-2xl font-bold text-gray-900">Welcome back</h2>
            <p class="text-gray-500 mt-1">
              Sign in to your HealthTrack account
            </p>
          </div>

          <form class="space-y-5" @submit.prevent="handleSubmit">
            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-700 mb-1.5"
                >Email address</label
              >
              <input
                id="email"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                required
                placeholder="doctor@healthtrack.com"
                class="block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
              />
            </div>
            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-700 mb-1.5"
                >Password</label
              >
              <input
                id="password"
                v-model="password"
                type="password"
                name="password"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="block w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:bg-white transition-all"
              />
            </div>
            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  class="rounded border-gray-300 text-teal-600"
                />
                <span class="text-sm text-gray-600">Remember me</span>
              </label>
              <a
                href="#"
                class="text-sm font-medium text-teal-600 hover:text-teal-700"
                >Forgot password?</a
              >
            </div>
            <button
              type="submit"
              :disabled="loading"
              class="w-full flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-teal-700 transition-all disabled:opacity-70"
            >
              <svg
                v-if="loading"
                class="animate-spin h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                />
              </svg>
              {{ loading ? "Signing in..." : "Sign in to HealthTrack" }}
            </button>
          </form>
          <div class="mt-6 text-center">
            <p class="text-sm text-gray-500">
              Use any email &amp; password &mdash;
              <span class="text-teal-600 font-medium">demo mode</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const email = ref("");
const password = ref("");
const loading = ref(false);
const handleSubmit = async () => {
  loading.value = true;
  await new Promise((resolve) => setTimeout(resolve, 800));
  await navigateTo("/dashboard");
};
</script>

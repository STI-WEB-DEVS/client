<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 px-4">

    <div class="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

      <!-- Logo -->
      <div class="text-center mb-8">
        <h2 class="mt-4 text-2xl font-bold text-gray-900">
          Welcome Back
        </h2>
        <p class="text-sm text-gray-500">Sign in to continue</p>
      </div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-5">

        <!-- Email -->
        <div>
          <label class="text-sm font-medium text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="you@example.com"
          />
        </div>

        <!-- Password -->
        <div>
          <label class="text-sm font-medium text-gray-700">Password</label>
          <input
            v-model="password"
            type="password"
            class="mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
            placeholder="••••••••"
          />
        </div>

        <!-- Remember + Forgot -->
        <div class="flex items-center justify-between text-sm">

          <label class="flex items-center gap-2">
            <input type="checkbox" class="rounded border-gray-300">
            Remember me
          </label>

          <a href="#" class="text-indigo-600 hover:underline">
            Forgot password?
          </a>

        </div>

        <!-- Login Button -->
        <button
          type="submit"
          class="w-full bg-indigo-600 text-white py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Sign in
        </button>

      </form>

      <!-- Divider -->
      <div class="my-6 flex items-center gap-3">
        <div class="flex-1 h-px bg-gray-200"></div>
        <span class="text-xs text-gray-400">OR CONTINUE WITH</span>
        <div class="flex-1 h-px bg-gray-200"></div>
      </div>

      <!-- Social Buttons -->
      <div class="grid grid-cols-2 gap-3">

        <!-- Google -->
        <button class="flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
          <span class="text-sm font-medium">Google</span>
        </button>

        <!-- GitHub -->
        <button class="flex items-center justify-center gap-2 border rounded-lg py-2 hover:bg-gray-50">
          <span class="text-sm font-medium">GitHub</span>
        </button>

      </div>

      <!-- Sign up -->
      <p class="text-center text-sm text-gray-500 mt-6">
        Not a member?
        <a href="#" class="text-indigo-600 font-medium hover:underline">
          Create account
        </a>
      </p>

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
      response.user.role === "admin" ? "/admin/dashboard" : "/customer/Order",
    );
  } catch (err: any) {
    error.value = err?.message || "";
  } finally {
    isLoading.value = false;
  }
};
</script>
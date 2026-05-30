<template>
  <div class="min-h-screen" style="background-color: #1a2e35;">
    <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-md">
        <img
          class="mx-auto h-28 w-auto"
          src="/Resources/nutrimatchlogo.png"
          alt="NutriMatch"
        />
        <h2 class="mt-6 text-center text-2xl font-bold tracking-tight text-gray-300">
          Sign in to your account
        </h2>
      </div>

      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
        <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">

          <form class="space-y-6" @submit.prevent="handleSubmit">

            <div>
              <label
                for="email"
                class="block text-sm font-medium text-gray-900"
              >
                Email address
              </label>

              <div class="mt-2">
                <input
                  v-model="email"
                  type="email"
                  id="email"
                  autocomplete="email"
                  class="block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label
                for="password"
                class="block text-sm font-medium text-gray-900"
              >
                Password
              </label>

              <div class="mt-2">
                <input
                  v-model="password"
                  type="password"
                  id="password"
                  autocomplete="current-password"
                  class="block w-full rounded-md border border-gray-300 px-3 py-2"
                  required
                />
              </div>
            </div>

            <!-- Error Message -->
            <div v-if="error" class="text-red-500 text-sm">
              {{ error }}
            </div>

            <div>
              <button
                type="submit"
                :disabled="isLoading"
                class="flex w-full justify-center rounded-md px-3 py-2 text-white font-semibold"
                style="background-color: #5AA7A7;"
              >
                {{ isLoading ? 'Signing In...' : 'Sign In' }}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { navigateTo } from "#app";
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
  error.value = "";
  isLoading.value = true;

  try {
    console.log("Email:", email.value);
    console.log("Password:", password.value);

    const response = await authService.login(
      email.value,
      password.value
    );

    console.log("Login Response:", response);

    if (response?.token) {
      localStorage.setItem("_token", response.token);
    }

    if (response?.user?.uuid) {
      localStorage.setItem("_uuid", response.user.uuid);
    }

    if (response?.user?.role) {
      localStorage.setItem("_role", response.user.role);
    }

    await navigateTo(
      response?.user?.role === "admin"
        ? "/admin/dashboard"
        : "/Product"
    );

  } catch (err: any) {
    console.error("Login Error:", err);

    error.value =
      err?.response?.data?.message ||
      err?.message ||
      "Login failed";
  } finally {
    isLoading.value = false;
  }
};
</script>
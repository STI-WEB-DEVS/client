```vue
<template>
    <div
        class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8"
    >
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <img
                class="mx-auto h-15 w-auto"
                src="../assets/image/tempLogo.png"
                alt="AMUMA"
            />

            <h2
                class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
            >
                Sign in to your account
            </h2>
        </div>

        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
            <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
                <form
                    class="space-y-6"
                    method="POST"
                    @submit.prevent="handleSubmit"
                >
                    <div>
                        <label
                            for="email"
                            class="block text-sm/6 font-medium text-gray-900"
                        >
                            Email address
                        </label>

                        <div class="mt-2">
                            <input
                                type="email"
                                v-model="email"
                                name="email"
                                id="email"
                                autocomplete="email"
                                required
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <label
                            for="password"
                            class="block text-sm/6 font-medium text-gray-900"
                        >
                            Password
                        </label>

                        <div class="mt-2">
                            <input
                                type="password"
                                v-model="password"
                                name="password"
                                id="password"
                                autocomplete="current-password"
                                required
                                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div
                        v-if="error"
                        class="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                    >
                        {{ error }}
                    </div>

                    <div class="flex items-center justify-between">
                        <div class="flex gap-3">
                            <div class="flex h-6 shrink-0 items-center">
                                <div class="group grid size-4 grid-cols-1">
                                    <input
                                        id="remember-me"
                                        name="remember-me"
                                        type="checkbox"
                                        class="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-[#398165] checked:bg-[#90C55C] indeterminate:border-indigo-600 indeterminate:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                                    />

                                    <svg
                                        class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
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

                            <label
                                for="remember-me"
                                class="block text-sm/6 text-gray-900"
                            >
                                Remember me
                            </label>
                        </div>

                        <div class="text-sm/6">
                            <a
                                href="#"
                                class="font-semibold text-slate-400 hover:text-indigo-500"
                            >
                                Forgot password?
                            </a>
                        </div>
                    </div>

                    <button
                        type="submit"
                        :disabled="isLoading"
                        class="flex w-full justify-center rounded-md bg-[#398165] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#398165]/80 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {{ isLoading ? "Signing in..." : "Sign in" }}
                    </button>
                </form>

                <div>
                    <div class="mt-10 flex items-center gap-x-6">
                        <div
                            class="w-full flex-1 border-t border-gray-200"
                        ></div>

                        <p
                            class="text-nowrap text-sm/6 font-medium text-gray-900"
                        >
                            Or continue with
                        </p>

                        <div
                            class="w-full flex-1 border-t border-gray-200"
                        ></div>
                    </div>

                    <div class="mt-6 grid grid-cols-2 gap-4">
                        <a
                            href="#"
                            class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <span>Google</span>
                        </a>

                        <a
                            href="#"
                            class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                        >
                            <span>GitHub</span>
                        </a>
                    </div>
                </div>
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
        localStorage.setItem("_token", response.token);
        alert("Successfully logged-in");
        // // if (response?.user.customer_uuid) {
        // //   localStorage.setItem("_uuid", response.user.customer_uuid);
        // // } else if (response?.user.uuid) {
        // //   localStorage.setItem("_uuid", response.user.uuid);
        // // }

        / /; // if (response?.user.role) {
        // //   localStorage.setItem("_role", response.user.role);
        // // }

        // await navigateTo("/admin/dashboard");

        await navigateTo(
            response.user.role === "admin" ? "/admin/dashboard" : "/dashboard",
        );
    } catch (err: any) {
        error.value = err?.message || "";
    } finally {
        isLoading.value = false;
    }
};
</script>

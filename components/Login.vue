<template>
  <div
    class="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#4E413A] px-4 py-12 sm:px-6 lg:px-8">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-[#8F7A6E]/30 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-[#BFA79A]/20 blur-3xl"></div>
    </div>

    <div
      class="relative w-full max-w-md rounded-2xl border border-[#E7DFDA] bg-white/95 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div class="mb-8 flex items-center justify-center gap-3">
        <div
          class="flex h-12 w-12 items-center justify-center rounded-xl bg-[#8F7A6E] text-xl font-black text-white shadow-lg shadow-[#8F7A6E]/30">
          P
        </div>
        <div>
          <h1 class="text-xl font-bold text-[#4E413A]">SmartPark</h1>
        </div>
      </div>

      <h2 class="text-center text-2xl font-bold tracking-tight text-[#4E413A]">Welcome back</h2>
      <p class="mt-1 text-center text-sm text-[#9A877B]">Sign in to continue</p>

      <form class="mt-8 space-y-5" method="POST" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-semibold text-[#6F5E54]">Email address</label>
          <input id="email" type="email" autocomplete="email" required
            class="mt-2 block w-full rounded-xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-2.5 text-sm text-[#4E413A] shadow-sm transition placeholder:text-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-2 focus:ring-[#E7DFDA]" />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-[#6F5E54]">Password</label>
          <input id="password" type="password" autocomplete="current-password" required
            class="mt-2 block w-full rounded-xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-2.5 text-sm text-[#4E413A] shadow-sm transition placeholder:text-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-2 focus:ring-[#E7DFDA]" />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="inline-flex items-center gap-2 text-[#7C695E]">
            <input type="checkbox" class="h-4 w-4 rounded border-[#CFC1B8] text-[#8F7A6E] focus:ring-[#DCCFC7]" />
            Remember me
          </label>
          <a href="#" class="font-semibold text-[#8F7A6E] hover:text-[#6F5E54]">Forgot password?</a>
        </div>

        <button type="submit"
          class="flex w-full items-center justify-center rounded-xl bg-[#8F7A6E] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#8F7A6E]/20 transition hover:bg-[#7C695E]">
          Sign in to SmartPark
        </button>
      </form>

      <p class="mt-8 text-center text-sm text-[#9A877B]">
        New to SmartPark?
        <a href="#" class="font-semibold text-[#8F7A6E] hover:text-[#6F5E54]">Request access</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleSubmit = async () => {
  await navigateTo('/dashboard')
}
</script>
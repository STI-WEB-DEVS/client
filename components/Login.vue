<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 px-4 py-12 sm:px-6 lg:px-8">
    <div class="pointer-events-none absolute inset-0">
      <div class="absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-amber-400/25 blur-3xl"></div>
      <div class="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-blue-500/20 blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-md rounded-2xl border border-white/10 bg-white/95 p-8 shadow-2xl backdrop-blur sm:p-10">
      <div class="mb-8 flex items-center justify-center gap-3">
        <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400 text-xl font-black text-slate-900 shadow-lg shadow-amber-500/30">
          P
        </div>
        <div>
          <h1 class="text-xl font-bold text-slate-900">SmartPark</h1>
          <p class="text-xs font-medium text-slate-500">Parking Operations Dashboard</p>
        </div>
      </div>

      <h2 class="text-center text-2xl font-bold tracking-tight text-slate-900">Welcome back</h2>
      <p class="mt-1 text-center text-sm text-slate-500">Sign in to continue</p>

      <form class="mt-8 space-y-5" method="POST" @submit.prevent="handleSubmit">
        <div>
          <label for="email" class="block text-sm font-semibold text-slate-700">Email address</label>
          <input id="email" type="email" autocomplete="email" required class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200" />
        </div>

        <div>
          <label for="password" class="block text-sm font-semibold text-slate-700">Password</label>
          <input id="password" type="password" autocomplete="current-password" required class="mt-2 block w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-900 shadow-sm transition focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200" />
        </div>

        <div class="flex items-center justify-between text-sm">
          <label class="inline-flex items-center gap-2 text-slate-600">
            <input type="checkbox" class="h-4 w-4 rounded border-slate-300 text-amber-500 focus:ring-amber-300" />
            Remember me
          </label>
          <a href="#" class="font-semibold text-amber-600 hover:text-amber-500">Forgot password?</a>
        </div>

        <button type="submit" class="flex w-full items-center justify-center rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:bg-slate-800">
          Sign in to SmartPark
        </button>
      </form>

      <p class="mt-8 text-center text-sm text-slate-500">
        New to SmartPark?
        <a href="#" class="font-semibold text-amber-600 hover:text-amber-500">Request access</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleSubmit = async () => {
  await navigateTo('/dashboard')
}
</script>
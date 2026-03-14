<template>
  <div class="min-h-screen flex items-center justify-center bg-[#F7F6F3] px-4 py-12 font-serif">
    <div class="w-full max-w-md px-10 py-12 bg-white border rounded-sm border-stone-200">

      <!-- Logo -->
      <div class="flex items-center justify-center mb-8 border-2 w-11 h-11 border-stone-900">
        <span class="text-xl font-normal leading-none tracking-tight text-stone-900">S</span>
      </div>

      <!-- Heading -->
      <h1 class="mb-1 text-lg font-normal tracking-tight text-stone-900">Welcome back</h1>
      <p class="mb-8 font-sans text-sm text-stone-400">Sign in to continue</p>

      <div class="mb-8 border-t border-stone-200"></div>

      <!-- Form -->
      <form @submit.prevent="handleSubmit" class="space-y-5">
        <div>
          <label for="email" class="block text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            autocomplete="email"
            placeholder="you@example.com"
            required
            class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
          />
        </div>

        <div>
          <label for="password" class="block text-[11px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            autocomplete="current-password"
            placeholder="••••••••"
            required
            class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
          />
        </div>

        <div class="flex items-center justify-between">
          <label class="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="remember-me"
              name="remember-me"
              class="w-3.5 h-3.5 accent-stone-900 cursor-pointer"
            />
            <span class="font-sans text-xs text-stone-400">Remember me</span>
          </label>
          <a href="#" class="pb-px font-sans text-xs transition-colors border-b text-stone-400 border-stone-300 hover:text-stone-900 hover:border-stone-900">
            Forgot password?
          </a>
        </div>

        <button
          type="submit"
          class="w-full py-3 bg-stone-900 text-[#F7F6F3] text-xs font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
        >
          Sign in
        </button>
      </form>

      <!-- Divider -->
      <div class="flex items-center gap-3 my-6">
        <div class="flex-1 h-px bg-stone-200"></div>
        <span class="text-[11px] font-sans text-stone-300 uppercase tracking-widest whitespace-nowrap">or continue with</span>
        <div class="flex-1 h-px bg-stone-200"></div>
      </div>

      <!-- Social buttons -->
      <div class="grid grid-cols-2 gap-2 mb-8">
        <a href="#" class="flex items-center justify-center gap-2 px-3 py-2.5 border border-stone-200 rounded-sm text-xs font-sans font-medium text-stone-900 hover:bg-stone-50 hover:border-stone-900 transition-colors">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M12 4.75C13.77 4.75 15.355 5.36 16.605 6.55L20.03 3.125C17.95 1.19 15.235 0 12 0C7.31 0 3.255 2.69 1.28 6.61L5.27 9.705C6.215 6.86 8.87 4.75 12 4.75Z" fill="#EA4335"/>
            <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
            <path d="M5.265 14.295C5.025 13.57 4.885 12.8 4.885 12C4.885 11.2 5.02 10.43 5.265 9.705L1.275 6.61C.46 8.23 0 10.06 0 12C0 13.94.46 15.77 1.28 17.39L5.265 14.295Z" fill="#FBBC05"/>
            <path d="M12 24C15.24 24 17.965 22.935 19.945 21.095L16.08 18.095C15.005 18.82 13.62 19.245 12 19.245C8.87 19.245 6.215 17.135 5.265 14.29L1.275 17.385C3.255 21.31 7.31 24 12 24Z" fill="#34A853"/>
          </svg>
          Google
        </a>
        <a href="#" class="flex items-center justify-center gap-2 px-3 py-2.5 border border-stone-200 rounded-sm text-xs font-sans font-medium text-stone-900 hover:bg-stone-50 hover:border-stone-900 transition-colors">
          <svg width="14" height="14" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
          </svg>
          GitHub
        </a>
      </div>

      <!-- Footer -->
      <p class="font-sans text-xs text-center text-stone-300">
        Not a member?
        <a href="#" class="transition-colors border-b text-stone-900 border-stone-300 hover:border-stone-900">
          Start a 14-day free trial
        </a>
      </p>

    </div>
  </div>
</template>

<script setup lang="ts">
const handleSubmit = async () => {
  await navigateTo('/dashboard')
}
</script>
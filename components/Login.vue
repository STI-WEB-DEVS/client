<template>
  <div class="min-h-screen flex" style="background-color: #f5f0e8;">

    <!-- Left Panel -->
    <div class="hidden lg:flex lg:w-1/2 flex-col justify-between p-12 relative overflow-hidden" style="background-color: #1C3028;">
      
      <!-- Decorative circles -->
      <div class="absolute -top-24 -left-24 w-96 h-96 rounded-full opacity-10" style="background-color: #C9A96E;"></div>
      <div class="absolute -bottom-32 -right-20 w-[500px] h-[500px] rounded-full opacity-5" style="background-color: #C9A96E;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full opacity-5 border-2" style="border-color: #C9A96E;"></div>
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full opacity-5 border" style="border-color: #C9A96E;"></div>

      <!-- Logo -->
      <div class="relative z-10">
        <span style="font-family: Georgia, serif; font-size: 1.6rem; color: white; letter-spacing: 0.05em;">
          Servor<span style="color: #C9A96E;">a</span>
        </span>
        <div class="mt-2 w-8 h-0.5" style="background-color: #C9A96E;"></div>
      </div>

      <!-- Center content -->
      <div class="relative z-10">
        <p class="text-xs font-semibold uppercase tracking-widest mb-4" style="color: #C9A96E;">Admin Portal</p>
        <p style="font-family: Georgia, serif; font-size: 2.6rem; color: white; line-height: 1.25;">
          Elevate <em style="color: #C9A96E;">every</em><br />spa experience
        </p>
        <p class="mt-5 text-sm leading-relaxed" style="color: rgba(255,255,255,0.45); max-width: 340px;">
          Manage subscriptions, monitor Spa Owners, and oversee platform operations — all in one place.
        </p>

        <!-- Stats row -->
        <div class="mt-10 flex gap-8">
          <div>
            <p class="text-2xl font-bold text-white">38+</p>
            <p class="text-xs mt-0.5" style="color: rgba(255,255,255,0.4);">Active Spa Owners</p>
          </div>
          <div class="w-px" style="background-color: rgba(255,255,255,0.1);"></div>
          <div>
            <p class="text-2xl font-bold text-white">99.9%</p>
            <p class="text-xs mt-0.5" style="color: rgba(255,255,255,0.4);">Uptime</p>
          </div>
          <div class="w-px" style="background-color: rgba(255,255,255,0.1);"></div>
          <div>
            <p class="text-2xl font-bold text-white">3</p>
            <p class="text-xs mt-0.5" style="color: rgba(255,255,255,0.4);">Plans</p>
          </div>
        </div>
      </div>

      <p class="relative z-10 text-xs" style="color: rgba(255,255,255,0.2);">© 2025 Servora. All rights reserved.</p>
    </div>

    <!-- Right Panel -->
    <div class="flex flex-1 items-center justify-center p-8">
      <div class="w-full max-w-md">

        <!-- Mobile Logo -->
        <div class="lg:hidden mb-8 text-center">
          <span style="font-family: Georgia, serif; font-size: 1.8rem; color: #1C3028; letter-spacing: 0.05em;">
            Servor<span style="color: #C9A96E;">a</span>
          </span>
        </div>

        <!-- Badge -->
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-6" style="background-color: #1C3028/10; border: 1px solid #1C3028;">
          <div class="size-1.5 rounded-full" style="background-color: #C9A96E;"></div>
          <span class="text-xs font-semibold" style="color: #1C3028;">Admin Access Only</span>
        </div>

        <h2 class="text-3xl font-bold mb-1" style="color: #1C3028; font-family: Georgia, serif;">Welcome back</h2>
        <p class="text-sm text-gray-400 mb-8">Sign in to your Servora admin account</p>

        <form class="space-y-5" @submit.prevent="handleSubmit">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-widest mb-2" style="color: #1C3028;">Email address</label>
            <input
              type="email" autocomplete="email" required
              placeholder="you@servora.com"
              class="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#1C3028] transition-colors shadow-sm"
            />
          </div>

          <div>
            <label class="block text-xs font-semibold uppercase tracking-widest mb-2" style="color: #1C3028;">Password</label>
            <input
              type="password" autocomplete="current-password" required
              placeholder="••••••••"
              class="block w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-300 focus:outline-none focus:border-[#1C3028] transition-colors shadow-sm"
            />
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 text-sm text-gray-500">
              <input type="checkbox" style="accent-color: #1C3028;" />
              Remember me
            </label>
            <a href="#" class="text-xs font-semibold uppercase tracking-widest" style="color: #C9A96E;">Forgot password?</a>
          </div>

          <button
            type="submit"
            class="w-full rounded-xl py-3 text-sm font-semibold text-white hover:opacity-90 transition-opacity shadow-md"
            style="background-color: #1C3028;"
          >
            Sign in to Servora
          </button>
        </form>

        <div class="mt-8">
          <div class="flex items-center gap-4 mb-5">
            <div class="flex-1 border-t border-gray-200"></div>
            <span class="text-xs text-gray-300 uppercase tracking-widest">or</span>
            <div class="flex-1 border-t border-gray-200"></div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <a href="#" class="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
              <svg class="h-4 w-4" viewBox="0 0 24 24">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
              </svg>
              Google
            </a>
            <a href="#" class="flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 shadow-sm transition-colors">
              <svg class="h-4 w-4 fill-[#24292F]" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
              </svg>
              GitHub
            </a>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const handleSubmit = async () => {
  await navigateTo('/dashboard')
}
</script>
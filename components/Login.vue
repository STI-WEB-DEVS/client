<template>
  <div class="min-h-screen flex font-serif bg-[#0d0a07]">
    <!-- Left Panel: Brand -->
    <div class="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-[#1a1108] items-center justify-center p-16">
      <div class="absolute inset-0 opacity-10"
        style="background-image: repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%); background-size: 14px 14px;">
      </div>
      <div class="relative z-10 text-center">
        <div class="flex items-center justify-center mb-8">
          <div class="w-16 h-16 border-2 border-[#c9a84c] rotate-45 flex items-center justify-center">
            <svg class="-rotate-45 text-[#c9a84c] w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-8 2v5l-3-3z"/>
            </svg>
          </div>
        </div>
        <h1 class="text-5xl font-bold text-[#f5e6c8] tracking-[0.15em] uppercase mb-4">Sutura</h1>
        <div class="h-px w-24 bg-[#c9a84c] mx-auto mb-4"></div>
        <p class="text-[#a07c4a] text-sm tracking-[0.3em] uppercase">Tailoring Management System</p>
        <div class="mt-16 space-y-6 text-left">
          <div v-for="feat in features" :key="feat" class="flex items-center gap-4">
            <div class="w-1.5 h-1.5 bg-[#c9a84c] rounded-full flex-shrink-0"></div>
            <p class="text-[#7a6040] text-sm tracking-wider">{{ feat }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Panel: Form -->
    <div class="flex-1 flex items-center justify-center p-8 bg-[#faf7f2]">
      <div class="w-full max-w-md">
        <div class="lg:hidden text-center mb-10">
          <h1 class="text-3xl font-bold text-[#1a1108] tracking-[0.1em] uppercase">Sutura</h1>
          <div class="h-px w-16 bg-[#c9a84c] mx-auto mt-3"></div>
        </div>

        <div class="mb-10">
          <h2 class="text-2xl font-bold text-[#1a1108] tracking-tight">Welcome back</h2>
          <p class="text-[#8a7060] mt-1 text-sm">Sign in to access your atelier dashboard</p>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div class="space-y-2">
            <label class="text-[10px] font-bold text-[#8a7060] uppercase tracking-[0.2em]">Email Address</label>
            <input
              v-model="email"
              type="email"
              placeholder="you@sutura.com"
              class="w-full px-4 py-3.5 bg-white border border-[#e5d9c8] rounded-lg text-[#1a1108] text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] transition-all placeholder:text-[#ccc0aa]"
            />
          </div>

          <div class="space-y-2">
            <label class="text-[10px] font-bold text-[#8a7060] uppercase tracking-[0.2em]">Password</label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="••••••••"
                class="w-full px-4 py-3.5 bg-white border border-[#e5d9c8] rounded-lg text-[#1a1108] text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] transition-all placeholder:text-[#ccc0aa]"
              />
              <button type="button" @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#a09080] hover:text-[#c9a84c] transition-colors">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="!showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                </svg>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" class="w-4 h-4 accent-[#c9a84c]" />
              <span class="text-xs text-[#8a7060]">Remember me</span>
            </label>
            <a href="#" class="text-xs text-[#c9a84c] hover:text-[#a07c3a] font-semibold transition-colors">Forgot password?</a>
          </div>

          <button
            type="submit"
            class="w-full py-4 bg-[#1a1108] text-[#f5e6c8] font-bold text-sm tracking-[0.15em] uppercase rounded-lg hover:bg-[#2a1f0f] transition-all duration-200 flex items-center justify-center gap-3 group"
          >
            <span>Sign In to Atelier</span>
            <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
        </form>

        <div class="mt-8 flex items-center gap-4">
          <div class="flex-1 h-px bg-[#e5d9c8]"></div>
          <span class="text-xs text-[#b0a090]">or continue with</span>
          <div class="flex-1 h-px bg-[#e5d9c8]"></div>
        </div>

        <div class="mt-6 grid grid-cols-2 gap-3">
          <button class="flex items-center justify-center gap-2 py-3 border border-[#e5d9c8] rounded-lg text-sm font-semibold text-[#4a3820] hover:bg-white hover:border-[#c9a84c] transition-all">
            <svg class="h-4 w-4" viewBox="0 0 24 24">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"/>
            </svg>
            Google
          </button>
          <button class="flex items-center justify-center gap-2 py-3 border border-[#e5d9c8] rounded-lg text-sm font-semibold text-[#4a3820] hover:bg-white hover:border-[#c9a84c] transition-all">
            <svg class="h-4 w-4 fill-[#24292F]" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
            </svg>
            GitHub
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const email = ref('');
const password = ref('');
const showPassword = ref(false);

const features = [
  'Job Order & Production Tracking',
  'Client Measurement Profiles',
  'Fabric & Inventory Monitoring',
  'Fitting Appointment Scheduling',
  'Revenue & Business Analytics',
];

const handleSubmit = async () => {
  await navigateTo('/dashboard');
};
</script>
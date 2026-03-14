<template>
  <div class="flex min-h-full flex-1">

    <!-- ── Left panel: form ───────────────────────────────── -->
    <div class="flex flex-1 flex-col justify-center px-6 py-12 lg:px-20 xl:px-24 bg-[#F1FAEE]">
      <div class="mx-auto w-full max-w-sm">

        <!-- Brand -->
        <div class="flex items-center gap-3 mb-10">
          <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D62828] shadow-lg shadow-[#D62828]/30">
            <svg class="size-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
          <span class="text-lg font-bold text-[#1D3557]">Kadugo Admin</span>
        </div>

        <!-- Heading -->
        <div class="mb-8">
          <h2 class="text-2xl font-bold tracking-tight text-[#1D3557]">Welcome back</h2>
          <p class="mt-1.5 text-sm text-[#457B9D]">Sign in to your blood bank management account.</p>
        </div>

        <!-- Form -->
        <form class="space-y-5" @submit.prevent="handleSubmit">

          <!-- Email -->
          <div>
            <label for="email" class="block text-xs font-semibold uppercase tracking-widest text-[#457B9D] mb-1.5">
              Email Address
            </label>
            <input
              v-model="form.email"
              type="email"
              id="email"
              name="email"
              autocomplete="email"
              placeholder="you@bloodbank.org"
              class="block w-full rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/40 shadow-sm outline-none transition focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-xs font-semibold uppercase tracking-widest text-[#457B9D] mb-1.5">
              Password
            </label>
            <div class="relative">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                name="password"
                autocomplete="current-password"
                placeholder="••••••••"
                class="block w-full rounded-xl border border-[#A8DADC]/60 bg-white px-4 py-2.5 text-sm text-[#1D3557] placeholder:text-[#457B9D]/40 shadow-sm outline-none transition focus:border-[#457B9D] focus:ring-2 focus:ring-[#457B9D]/20 pr-10"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-[#457B9D]/50 hover:text-[#457B9D] transition-colors"
              >
                <EyeIcon v-if="!showPassword" class="size-4" />
                <EyeSlashIcon v-else class="size-4" />
              </button>
            </div>
          </div>

          <!-- Remember + Forgot -->
          <div class="flex items-center justify-between">
            <label class="flex items-center gap-2.5 cursor-pointer">
              <div class="relative flex h-4 w-4 shrink-0">
                <input
                  v-model="form.remember"
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  class="peer h-4 w-4 cursor-pointer appearance-none rounded border border-[#A8DADC] bg-white checked:border-[#457B9D] checked:bg-[#457B9D] transition"
                />
                <svg class="pointer-events-none absolute inset-0 m-auto size-2.5 text-white opacity-0 peer-checked:opacity-100" viewBox="0 0 14 14" fill="none">
                  <path d="M3 8L6 11L11 3.5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="text-sm text-[#1D3557]">Remember me</span>
            </label>

            <a href="#" class="text-sm font-semibold text-[#457B9D] hover:text-[#1D3557] transition-colors">
              Forgot password?
            </a>
          </div>

          <!-- Submit -->
          <button
            type="submit"
            :disabled="loading"
            class="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D62828] px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-[#D62828]/20 transition hover:bg-[#b52020] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#D62828] disabled:opacity-60"
          >
            <svg v-if="loading" class="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"/>
            </svg>
            {{ loading ? 'Signing in…' : 'Sign in' }}
          </button>

        </form>

        <!-- Divider -->
        <div class="mt-8 flex items-center gap-4">
          <div class="h-px flex-1 bg-[#A8DADC]/40"></div>
          <span class="text-xs font-medium text-[#457B9D]">Or continue with</span>
          <div class="h-px flex-1 bg-[#A8DADC]/40"></div>
        </div>

        <!-- Social buttons -->
        <div class="mt-5 grid grid-cols-2 gap-3">
          <a href="#" class="flex items-center justify-center gap-2.5 rounded-xl border border-[#A8DADC]/50 bg-white px-3 py-2.5 text-sm font-semibold text-[#1D3557] shadow-sm hover:bg-[#F1FAEE] transition-colors">
            <svg class="h-4 w-4" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"/>
            </svg>
            Google
          </a>
          <a href="#" class="flex items-center justify-center gap-2.5 rounded-xl border border-[#A8DADC]/50 bg-white px-3 py-2.5 text-sm font-semibold text-[#1D3557] shadow-sm hover:bg-[#F1FAEE] transition-colors">
            <svg class="size-4 fill-[#24292F]" viewBox="0 0 20 20" aria-hidden="true">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
            </svg>
            GitHub
          </a>
        </div>

        <!-- Register link -->
        <p class="mt-8 text-center text-sm text-[#457B9D]">
          Not registered yet?
          <a href="#" class="font-semibold text-[#D62828] hover:text-[#b52020] transition-colors">
            Request access
          </a>
        </p>

      </div>
    </div>

    <!-- ── Right panel: brand illustration ───────────────── -->
    <div class="relative hidden w-0 flex-1 lg:block">
      <div class="absolute inset-0 bg-gradient-to-br from-[#1D3557] via-[#457B9D] to-[#A8DADC]">

        <!-- Decorative blobs -->
        <div class="absolute -right-20 -top-20 h-96 w-96 rounded-full bg-white/5"></div>
        <div class="absolute -bottom-24 left-8 h-72 w-72 rounded-full bg-white/5"></div>
        <div class="absolute top-1/3 right-1/4 h-40 w-40 rounded-full bg-[#D62828]/20"></div>

        <!-- Grid overlay -->
        <div class="absolute inset-0 opacity-[0.04]"
          style="background-image:linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px);background-size:40px 40px;">
        </div>

        <!-- Center content -->
        <div class="absolute inset-0 flex flex-col items-center justify-center px-12 text-center">

          <!-- Big blood drop icon -->
          <div class="mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-white/10 backdrop-blur-sm border border-white/20 shadow-2xl">
            <svg class="size-14 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>

          <h2 class="text-3xl font-bold text-white mb-3">Saving Lives,<br/>One Drop at a Time</h2>
          <p class="text-sm text-white/60 max-w-xs leading-relaxed">
            Manage donations, track inventory, and coordinate your blood bank operations from one secure platform.
          </p>

          <!-- Stats row -->
          <div class="mt-10 flex items-center gap-6">
            <div class="text-center">
              <p class="text-2xl font-bold text-white">12k+</p>
              <p class="text-[11px] font-semibold uppercase tracking-widest text-white/50 mt-0.5">Donors</p>
            </div>
            <div class="h-8 w-px bg-white/20"></div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">98%</p>
              <p class="text-[11px] font-semibold uppercase tracking-widest text-white/50 mt-0.5">Success Rate</p>
            </div>
            <div class="h-8 w-px bg-white/20"></div>
            <div class="text-center">
              <p class="text-2xl font-bold text-white">500+</p>
              <p class="text-[11px] font-semibold uppercase tracking-widest text-white/50 mt-0.5">Drives</p>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/outline'

definePageMeta({ layout: false })

const loading = ref(false)
const showPassword = ref(false)

const form = ref({
  email: '',
  password: '',
  remember: false,
})

const handleSubmit = async () => {
  loading.value = true
  // No BE — redirect immediately
  await navigateTo('/dashboard')
  loading.value = false
}
</script>
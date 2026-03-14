<template>
  <div class="nm-login">

    <!-- ── Left brand panel ───────────────────────── -->
    <div class="nm-login-brand">
      <!-- Decorative blobs -->
      <div class="blob blob-1"/>
      <div class="blob blob-2"/>
      <div class="blob blob-3"/>

      <div class="relative z-10 flex flex-col justify-between h-full px-12 py-14">
        <!-- Logo -->
        <div class="flex items-center gap-3">
          <div class="w-10 h-10 rounded-xl flex items-center justify-center" style="background:rgba(77,182,182,.18)">
            <svg viewBox="0 0 36 36" fill="none" class="w-7 h-7">
              <path d="M18 7C18 7 10 12 10 20c0 5.5 3.5 9 8 9s8-3.5 8-9c0-8-8-13-8-13Z"
                    fill="none" stroke="#4db6b6" stroke-width="1.5" stroke-linejoin="round"/>
              <line x1="18" y1="29" x2="18" y2="14" stroke="#d97706" stroke-width="1.8" stroke-linecap="round"/>
            </svg>
          </div>
          <div>
            <p class="font-display text-white text-xl font-semibold">NutriMatch</p>
            <p class="text-teal-400 text-[.6rem] uppercase tracking-widest opacity-60">Admin Portal</p>
          </div>
        </div>

        <!-- Hero -->
        <div>
          <h1 class="font-display text-white text-[2.7rem] leading-[1.15] font-bold mb-4">
            Clinical<br/>
            <span class="text-amber-400">Nutrition</span><br/>
            Management.
          </h1>
          <p class="text-teal-400/65 text-sm leading-relaxed max-w-xs">
            The complete administrative platform for structured Medical Nutrition Therapy — built for the Philippine healthcare system.
          </p>

          <!-- Features -->
          <div class="mt-8 space-y-3">
            <div v-for="f in features" :key="f" class="flex items-center gap-2.5">
              <div class="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
                <svg class="w-2.5 h-2.5" viewBox="0 0 8 8" fill="none">
                  <path d="M1 4l2 2 4-4" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </div>
              <span class="text-teal-400/70 text-sm">{{ f }}</span>
            </div>
          </div>
        </div>

        <p class="text-teal-400/25 text-xs">NutriMatch © 2025 · Davao, Philippines</p>
      </div>
    </div>

    <!-- ── Right form panel ───────────────────────── -->
    <div class="nm-login-form">
      <div class="w-full max-w-[390px]">

        <div class="mb-8">
          <h2 class="font-display text-[1.85rem] font-bold leading-tight mb-1.5" style="color:#1a2e2e">
            Welcome back
          </h2>
          <p class="text-sm" style="color:#6b8080">Sign in to access the admin dashboard</p>
        </div>

        <!-- Form (UI-only — no real auth) -->
        <div class="space-y-5">
          <div>
            <label class="nm-label">Email Address</label>
            <div class="relative">
              <EnvelopeIcon class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style="color:#6b8080"/>
              <input v-model="email" type="email" placeholder="admin@nutrimatch.ph" class="nm-input pl-10"/>
            </div>
          </div>

          <div>
            <label class="nm-label">Password</label>
            <div class="relative">
              <LockClosedIcon class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style="color:#6b8080"/>
              <input v-model="password" :type="show ? 'text' : 'password'" placeholder="••••••••••" class="nm-input pl-10 pr-10"/>
              <button type="button" @click="show = !show" class="absolute right-3 top-1/2 -translate-y-1/2" style="color:#6b8080">
                <EyeSlashIcon v-if="show" class="w-4 h-4"/>
                <EyeIcon v-else class="w-4 h-4"/>
              </button>
            </div>
          </div>

          <div class="flex items-center justify-between text-sm">
            <label class="flex items-center gap-2 cursor-pointer select-none" style="color:#6b8080">
              <input type="checkbox" style="accent-color:#0d6b6b; width:14px; height:14px"/>
              Remember me
            </label>
            <a href="#" class="font-semibold" style="color:#0d6b6b">Forgot password?</a>
          </div>

          <!-- Validation hint -->
          <div v-if="error" class="flex items-center gap-2 p-3 rounded-lg text-sm"
               style="background:#fef2f2; border:1px solid #fca5a5; color:#dc2626">
            <ExclamationCircleIcon class="w-4 h-4 flex-shrink-0"/>
            {{ error }}
          </div>

          <!-- Sign in → goes to /admin -->
          <NuxtLink
            to="/admin"
            class="nm-btn nm-btn-primary w-full justify-center py-3 text-[.95rem]"
            @click.prevent="goAdmin"
          >
            Sign In to Admin Portal
          </NuxtLink>
        </div>

        <p class="mt-5 text-center text-xs" style="color:#6b8080">
          Demo: <span style="color:#0d6b6b; font-weight:600">admin@nutrimatch.ph</span> /
          <span style="color:#0d6b6b; font-weight:600">admin123</span>
        </p>

        <!-- Security note -->
        <div class="mt-7 p-3.5 rounded-xl flex items-start gap-2.5"
             style="background:var(--teal-50); border:1px solid var(--teal-100)">
          <ShieldCheckIcon class="w-4 h-4 flex-shrink-0 mt-0.5" style="color:#0d6b6b"/>
          <p class="text-xs leading-relaxed" style="color:#0d6b6b">
            Restricted to verified System Administrators. All access attempts are logged.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  EnvelopeIcon, LockClosedIcon, EyeIcon, EyeSlashIcon,
  ExclamationCircleIcon, ShieldCheckIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'default' })

const router = useRouter()
const email    = ref('')
const password = ref('')
const show     = ref(false)
const error    = ref('')

const features = [
  'PRC Verification for Registered Nutritionist-Dietitians',
  'DOST-FNRI localized food composition data',
  'Complete Nutrition Care Process workflow',
  'Automated billing & commission tracking',
]

function goAdmin() {
  if (email.value === 'admin@nutrimatch.ph' && password.value === 'admin123') {
    router.push('/admin')
  } else if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
  } else {
    error.value = 'Invalid credentials. Use the demo credentials below.'
  }
}
</script>

<style scoped>
.nm-login { display: flex; min-height: 100vh; }

.nm-login-brand {
  flex: 0 0 44%;
  background: linear-gradient(155deg, #052a2a 0%, #083534 45%, #0d6b6b 100%);
  position: relative;
  overflow: hidden;
}
@media (max-width: 768px) { .nm-login-brand { display: none; } }

.nm-login-form {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  padding: 2rem;
}

.blob {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
}
.blob-1 { width: 420px; height: 420px; top: -120px; right: -130px; background: radial-gradient(circle, rgba(77,182,182,.1), transparent 70%); }
.blob-2 { width: 280px; height: 280px; bottom: 60px; left: -100px; background: radial-gradient(circle, rgba(217,119,6,.08), transparent 70%); }
.blob-3 { width: 180px; height: 180px; top: 55%; left: 45%; background: radial-gradient(circle, rgba(13,107,107,.06), transparent 70%); }
</style>

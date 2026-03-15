<template>
  <main class="min-h-screen login-bg flex items-center justify-center p-4">
    <!-- Background blobs -->
    <div class="absolute inset-0 overflow-hidden pointer-events-none">
      <div class="absolute -top-1/4 -right-1/4 w-96 h-96 rounded-full blob-teal blur-3xl"></div>
      <div class="absolute -bottom-1/4 -left-1/4 w-96 h-96 rounded-full blob-gold blur-3xl"></div>
    </div>

    <div class="relative w-full max-w-md">
      <!-- Logo -->
      <div class="text-center mb-8">
        <div class="inline-flex items-center justify-center size-20 rounded-2xl logo-bg border logo-border mb-4 p-2">
          <img src="/satura-logo.png" alt="SATURA Logo" class="size-full object-contain" />
        </div>
        <h1 class="text-3xl font-extrabold brand-color tracking-tight">SATURA</h1>
        <p class="text-slate-400 text-sm mt-1">Business Management System</p>
      </div>

      <!-- Card -->
      <div class="login-card rounded-2xl shadow-2xl overflow-hidden">

        <!-- Tabs -->
        <div class="flex border-b border-slate-700/60">
          <button
            v-for="tab in ['login','register']" :key="tab"
            @click="activeTab = tab"
            :class="['flex-1 py-3.5 text-sm font-semibold transition-colors',
              activeTab === tab ? 'tab-active' : 'text-slate-400 hover:text-slate-200']">
            {{ tab === 'login' ? 'Sign In' : 'Create Account' }}
          </button>
        </div>

        <!-- ── SIGN IN ── -->
        <div v-if="activeTab === 'login'" class="p-8">
          <h2 class="text-lg font-bold text-white mb-5">Welcome back</h2>
          <form class="space-y-4" @submit.prevent="handleLogin">
            <div>
              <label class="field-label">Email address</label>
              <input v-model="loginEmail" type="email" placeholder="admin@satura.com" class="input-field" required />
            </div>
            <div>
              <label class="field-label">Password</label>
              <div class="pw-wrap">
                <input v-model="loginPassword" :type="showPassword ? 'text' : 'password'" placeholder="••••••••" class="input-field" required />
                <button type="button" @click="showPassword = !showPassword" class="pw-toggle" tabindex="-1">
                  <svg v-if="!showPassword" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.964-7.178Z" />
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="size-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                </button>
              </div>
            </div>
            <div v-if="loginError" class="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5">{{ loginError }}</div>
            <button type="submit" :disabled="loginLoading" class="btn-primary w-full mt-1">
              <span v-if="!loginLoading">Sign in to Dashboard</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Signing in…
              </span>
            </button>
          </form>
          <!-- Demo accounts -->
          <div class="mt-5 pt-4 border-t border-slate-700/40">
            <p class="text-xs text-center text-slate-500 mb-2">Quick demo login:</p>
            <div class="grid grid-cols-2 gap-2">
              <button type="button" @click="fillDemo('premium')" class="demo-btn">
                <span>👑</span> Premium Demo
              </button>
              <button type="button" @click="fillDemo('basic')" class="demo-btn">
                <span>🥉</span> Basic Demo
              </button>
            </div>
          </div>
        </div>

        <!-- ── REGISTER ── -->
        <div v-else class="p-8">
          <h2 class="text-lg font-bold text-white mb-1">Create your account</h2>
          <p class="text-slate-400 text-xs mb-6">Choose a plan to get started</p>

          <form class="space-y-4" @submit.prevent="handleRegister">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="field-label">Full Name</label>
                <input v-model="regName" type="text" placeholder="Maria Santos" class="input-field" required />
              </div>
              <div>
                <label class="field-label">Email</label>
                <input v-model="regEmail" type="email" placeholder="you@shop.com" class="input-field" required />
              </div>
            </div>
            <div>
              <label class="field-label">Password</label>
              <input v-model="regPassword" type="password" placeholder="Min. 6 characters" class="input-field" required minlength="6" />
            </div>

            <!-- Plan Selection -->
            <div>
              <label class="field-label mb-2 block">Choose Your Plan</label>
              <div class="grid grid-cols-2 gap-3">
                <!-- Basic -->
                <div @click="regPlan = 'basic'"
                  :class="['plan-card cursor-pointer', regPlan === 'basic' ? 'plan-selected-basic' : '']">
                  <div class="plan-icon">🥉</div>
                  <p class="font-bold text-white text-sm mt-2">Basic</p>
                  <p class="text-xs mt-0.5" style="color:#009E97">Free</p>
                  <ul class="mt-2 space-y-1 text-xs text-slate-300">
                    <li>✓ Dashboard</li>
                    <li>✓ Customers & Orders</li>
                    <li>✓ Inventory</li>
                    <li>✓ Appointments</li>
                    <li>✓ Billing</li>
                    <li>✓ Team</li>
                  </ul>
                </div>
                <!-- Premium -->
                <div @click="regPlan = 'premium'"
                  :class="['plan-card cursor-pointer', regPlan === 'premium' ? 'plan-selected-premium' : '']">
                  <div class="plan-icon">👑</div>
                  <p class="font-bold text-white text-sm mt-2">Premium</p>
                  <p class="text-xs mt-0.5" style="color:#DCB03A">₱499 / mo</p>
                  <ul class="mt-2 space-y-1 text-xs text-slate-300">
                    <li>✓ All Basic features</li>
                    <li>✓ Posts (create & view)</li>
                    <li>✓ Profile customization</li>
                  </ul>
                </div>
              </div>
            </div>

            <div v-if="regError" class="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg px-4 py-2.5">{{ regError }}</div>
            <button type="submit" :disabled="regLoading" class="btn-primary w-full">
              <span v-if="!regLoading">Activate Account & Continue</span>
              <span v-else class="flex items-center justify-center gap-2">
                <svg class="animate-spin size-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"></path>
                </svg>
                Activating…
              </span>
            </button>
          </form>
        </div>

        <div class="px-8 pb-5 text-center">
          <p class="text-xs text-slate-600">© 2026 SATURA. All rights reserved.</p>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
const { login, register, seedDemoIfEmpty } = useAuth()

onMounted(() => seedDemoIfEmpty())

const activeTab = ref<'login' | 'register'>('login')

const loginEmail    = ref('')
const loginPassword = ref('')
const loginError    = ref('')
const loginLoading  = ref(false)
const showPassword  = ref(false)

const regName     = ref('')
const regEmail    = ref('')
const regPassword = ref('')
const regPlan     = ref<'basic' | 'premium'>('basic')
const regError    = ref('')
const regLoading  = ref(false)

function fillDemo(plan: 'basic' | 'premium') {
  if (plan === 'premium') {
    loginEmail.value = 'admin@satura.com'
    loginPassword.value = 'admin123'
  } else {
    loginEmail.value = 'basic@satura.com'
    loginPassword.value = 'basic123'
  }
  loginError.value = ''
}

async function handleLogin() {
  loginError.value = ''
  loginLoading.value = true
  await new Promise(r => setTimeout(r, 600))
  try {
    login(loginEmail.value, loginPassword.value)
    await navigateTo('/dashboard')
  } catch (e: any) {
    loginError.value = e.message
  } finally {
    loginLoading.value = false
  }
}

async function handleRegister() {
  regError.value = ''
  regLoading.value = true
  await new Promise(r => setTimeout(r, 700))
  try {
    register(regName.value, regEmail.value, regPassword.value, regPlan.value)
    await navigateTo('/dashboard')
  } catch (e: any) {
    regError.value = e.message
  } finally {
    regLoading.value = false
  }
}
</script>

<style scoped>
/* Brand colors: Teal #009E97 | Gold #DCB03A | Charcoal #1A2026 */
.login-bg {
  background: linear-gradient(135deg, #0D1519 0%, #1A2026 50%, #0D1519 100%);
  min-height: 100vh;
  position: relative;
}
.login-card {
  background: rgba(26, 32, 38, 0.88);
  border: 1px solid rgba(255,255,255,0.08);
  backdrop-filter: blur(20px);
}
.blob-teal  { background: rgba(0,158,151,0.12); }
.blob-gold  { background: rgba(220,176,58,0.08); }
.logo-bg    { background: rgba(0,158,151,0.12); }
.logo-border{ border-color: rgba(0,158,151,0.35); }
.brand-color{ color: #009E97; }
.tab-active { color: #009E97; border-bottom: 2px solid #009E97; background: rgba(0,158,151,0.06); }
.field-label { display: block; font-size: 0.78rem; font-weight: 600; color: #94A3B8; margin-bottom: 0.35rem; }
.input-field {
  display: block; width: 100%;
  background: rgba(13,21,25,0.6);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.625rem; padding: 0.6rem 0.875rem;
  color: #fff; font-size: 0.875rem;
  transition: border-color 0.15s, box-shadow 0.15s; outline: none;
}
.input-field::placeholder { color: rgba(148,163,184,0.4); }
.input-field:focus { border-color: #009E97; box-shadow: 0 0 0 3px rgba(0,158,151,0.18); }
.btn-primary {
  display: flex; align-items: center; justify-content: center;
  background: linear-gradient(135deg, #009E97, #007A75);
  color: #fff; font-weight: 700; font-size: 0.9rem;
  padding: 0.75rem 1.25rem; border-radius: 0.625rem;
  border: none; cursor: pointer; transition: all 0.2s;
}
.btn-primary:hover:not(:disabled) { box-shadow: 0 4px 20px rgba(0,158,151,0.4); transform: translateY(-1px); }
.btn-primary:disabled { opacity: 0.7; cursor: not-allowed; }
.plan-card {
  background: rgba(13,21,25,0.5);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 0.75rem; padding: 0.875rem;
  transition: all 0.2s; text-align: center;
}
.plan-card:hover { border-color: rgba(0,158,151,0.4); }
.plan-selected-basic   { border-color: #009E97 !important; background: rgba(0,158,151,0.12); box-shadow: 0 0 0 2px #009E97; }
.plan-selected-premium { border-color: #DCB03A !important; background: rgba(220,176,58,0.10); box-shadow: 0 0 0 2px #DCB03A; }
.plan-icon { font-size: 1.6rem; }
.demo-btn {
  display: flex; align-items: center; justify-content: center; gap: 0.35rem;
  width: 100%; padding: 0.5rem 0.75rem; border-radius: 0.5rem;
  font-size: 0.75rem; font-weight: 600;
  background: rgba(0,158,151,0.08); color: rgba(255,255,255,0.7);
  border: 1px solid rgba(0,158,151,0.25); cursor: pointer; transition: all 0.15s;
}
.demo-btn:hover { background: rgba(0,158,151,0.18); color: #fff; border-color: #009E97; }
.pw-wrap { position: relative; }
.pw-wrap .input-field { padding-right: 2.75rem; }
.pw-toggle {
  position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%);
  background: none; border: none; cursor: pointer;
  color: rgba(148,163,184,0.6); transition: color 0.15s; padding: 0;
}
.pw-toggle:hover { color: #009E97; }
</style>
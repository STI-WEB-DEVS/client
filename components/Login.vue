<template>
  <div class="shell">

    <!-- Left Panel -->
    <div class="left">
      <div class="c1"></div>
      <div class="c2"></div>
      <div class="dot d1"></div>
      <div class="dot d2"></div>
      <div class="dot d3"></div>

      <div class="logo-area">
        <div class="logo-mark">
          <div class="logo-icon">
            <svg width="24" height="24" viewBox="0 0 120 120" fill="none">
              <g transform="rotate(0,60,60)">
                <path d="M60 14C74 14,85 28,82 45C79 57,68 61,60 60C52 59,44 51,46 39C49 26,56 14,60 14Z" fill="#EFBF04" opacity=".85"/>
              </g>
              <g transform="rotate(90,60,60)">
                <path d="M60 14C74 14,85 28,82 45C79 57,68 61,60 60C52 59,44 51,46 39C49 26,56 14,60 14Z" fill="#EFBF04" opacity=".85"/>
              </g>
              <g transform="rotate(180,60,60)">
                <path d="M60 14C74 14,85 28,82 45C79 57,68 61,60 60C52 59,44 51,46 39C49 26,56 14,60 14Z" fill="#EFBF04" opacity=".85"/>
              </g>
              <g transform="rotate(270,60,60)">
                <path d="M60 14C74 14,85 28,82 45C79 57,68 61,60 60C52 59,44 51,46 39C49 26,56 14,60 14Z" fill="#EFBF04" opacity=".85"/>
              </g>
              <circle cx="60" cy="60" r="10" fill="#EFBF04" opacity=".9"/>
              <circle cx="60" cy="60" r="7"  fill="#004635"/>
            </svg>
          </div>
          <div class="logo-text">
            <span class="logo-name">Nutri<em>Match</em></span>
            <span class="logo-sub">Clinical Nutrition System</span>
          </div>
        </div>

        <p class="left-headline">
          Nutrition care<br/>
          begins with<br/>
          <em>the right match.</em>
        </p>
        <p class="left-body">
          A secure platform connecting Filipino clients with licensed
          Registered Nutritionist-Dietitians for evidence-based, FNRI-compliant care.
        </p>
      </div>

      <div class="left-footer">
        <div class="trust-badges">
          <div class="badge"><span class="bdot"></span>PRC-Verified RNDs</div>
          <div class="badge"><span class="bdot"></span>RA 10173 Compliant</div>
          <div class="badge"><span class="bdot"></span>STI College 2025</div>
        </div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="right">
      <div class="card">
        <p class="wtitle">Welcome back</p>
        <p class="wsub">Sign in to continue to NutriMatch</p>

        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label class="lbl" for="email">Email</label>
            <input
              id="email"
              v-model="email"
              class="inp"
              type="email"
              placeholder="you@nutrimatch.health"
              autocomplete="email"
              required
            />
          </div>

          <div class="field">
            <div class="frow">
              <label class="lbl" for="password">Password</label>
              <a href="#" class="forgot">Forgot password?</a>
            </div>
            <input
              id="password"
              v-model="password"
              class="inp"
              :type="showPass ? 'text' : 'password'"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
            <button type="button" class="pass-toggle" @click="showPass = !showPass" :aria-label="showPass ? 'Hide password' : 'Show password'">
              {{ showPass ? 'Hide' : 'Show' }}
            </button>
          </div>

          <div class="rem-row">
            <input id="remember" v-model="remember" type="checkbox" />
            <label for="remember">Remember me</label>
          </div>

          <button type="submit" class="btn" :disabled="loading" :class="{ success }">
            <svg v-if="loading" class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="rgba(0,46,36,0.3)" stroke-width="2.5"/>
              <path d="M12 3a9 9 0 019 9" stroke="#002e24" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <svg v-else-if="success" width="15" height="15" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke="#002e24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ loading ? 'Signing in…' : success ? 'Access granted' : 'Sign in' }}</span>
          </button>

          <p v-if="error" class="err">{{ error }}</p>
        </form>

        <div class="divider"><span>or continue with</span></div>

        <button type="button" class="btn-google" @click="handleGoogleLogin">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4"/>
            <path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
            <path d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/>
            <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
          </svg>
          Sign in with Google
        </button>

        <p class="foot">🔒 Authorized healthcare staff only · STI College 2025</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { AuthService } from '~/api/auth/AuthService'

definePageMeta({
  layout: false,
})

const email    = ref('')
const password = ref('')
const remember = ref(false)
const showPass = ref(false)
const loading  = ref(false)
const success  = ref(false)
const error    = ref('')

const authService = new AuthService()

const handleSubmit = async () => {
  if (loading.value) return

  error.value   = ''
  loading.value = true
  success.value = false

  try {
    const response = await authService.login(email.value, password.value)

    if (response?.token)      localStorage.setItem('_token', response.token)
    if (response?.user?.email) localStorage.setItem('_email', response.user.email)
    if (response?.user?.role)  localStorage.setItem('_role',  response.user.role)
    if (response?.user?.uuid)  localStorage.setItem('_uuid',  response.user.uuid)

    success.value = true

    const targetPath = response.user.role === 'admin' ? '/dashboard' : '/customer/shop'
    await navigateTo(targetPath)

  } catch (err: any) {
    error.value = err?.response?.data?.message || err?.message || 'Invalid credentials. Please try again.'
  } finally {
    loading.value = false
  }
}

const handleGoogleLogin = () => {
  // Plug in your Google OAuth flow here
  console.warn('Google login not yet configured.')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Geist:wght@400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

/* ─── SHELL ─── */
.shell {
  display: flex;
  min-height: 100vh;
  font-family: 'Geist', system-ui, sans-serif;
}

/* ─── LEFT PANEL ─── */
.left {
  width: 44%;
  background: #004635;
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

/* Decorative circles */
.c1 {
  position: absolute;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  background: #005a45;
  bottom: -75px;
  right: -75px;
  pointer-events: none;
}
.c2 {
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: #003d2d;
  top: 55px;
  right: 28px;
  pointer-events: none;
}

/* Dot texture */
.dot {
  position: absolute;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(239, 191, 4, 0.22);
  pointer-events: none;
}
.d1 { top: 110px; left: 20px; }
.d2 { top: 165px; left: 55px; opacity: .5; }
.d3 { top: 85px;  left: 88px; opacity: .3; }

/* Logo */
.logo-area {
  position: relative;
  z-index: 1;
}

.logo-mark {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 48px;
}

.logo-icon {
  width: 42px;
  height: 42px;
  border-radius: 11px;
  background: #003d2d;
  border: 1px solid rgba(239, 191, 4, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.logo-text {
  display: flex;
  flex-direction: column;
}

.logo-name {
  font-family: 'Playfair Display', serif;
  font-size: 20px;
  font-weight: 700;
  color: #FDFBD4;
  letter-spacing: -0.3px;
  font-style: normal;
}

.logo-name em {
  color: #EFBF04;
  font-style: normal;
}

.logo-sub {
  font-size: 9px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: rgba(253, 251, 212, 0.4);
  font-style: normal;
  margin-top: 1px;
}

/* Headline */
.left-headline {
  font-family: 'Playfair Display', serif;
  font-size: 32px;
  line-height: 1.22;
  color: #FDFBD4;
  font-weight: 700;
  margin-bottom: 16px;
}

.left-headline em {
  font-style: italic;
  color: #EFBF04;
}

.left-body {
  font-size: 13.5px;
  color: rgba(253, 251, 212, 0.5);
  line-height: 1.72;
  max-width: 240px;
}

/* Trust badges */
.left-footer {
  position: relative;
  z-index: 1;
}

.trust-badges {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: rgba(0, 0, 0, 0.18);
  border: 1px solid rgba(239, 191, 4, 0.15);
  border-radius: 20px;
  padding: 5px 12px;
  font-size: 11px;
  color: rgba(253, 251, 212, 0.5);
}

.bdot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: #EFBF04;
  flex-shrink: 0;
}

/* ─── RIGHT PANEL ─── */
.right {
  flex: 1;
  background: #f5f3e6;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 28px;
}

.card {
  background: #ffffff;
  border-radius: 20px;
  padding: 44px 36px 36px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 4px 32px rgba(0, 46, 36, 0.07);
}

/* Card heading */
.wtitle {
  font-size: 22px;
  font-weight: 600;
  color: #0f172a;
  margin-bottom: 5px;
  letter-spacing: -0.02em;
}

.wsub {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 32px;
}

/* Form */
.field {
  margin-bottom: 18px;
  position: relative;
}

.frow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 7px;
}

.lbl {
  display: block;
  font-size: 10.5px;
  font-weight: 600;
  color: #004635;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 7px;
}

.frow .lbl {
  margin-bottom: 0;
}

.forgot {
  font-size: 12.5px;
  color: rgba(0, 70, 53, 0.65);
  text-decoration: none;
  transition: color 0.15s;
}

.forgot:hover {
  color: #004635;
}

.inp {
  width: 100%;
  padding: 12px 18px;
  border: 1.5px solid #e2e8f0;
  border-radius: 999px;
  font-size: 14px;
  color: #334155;
  background: #f9f8f2;
  font-family: 'Geist', system-ui, sans-serif;
  outline: none;
  transition: border-color 0.15s, background 0.15s, box-shadow 0.15s;
}

.inp:focus {
  border-color: #004635;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(0, 70, 53, 0.08);
}

.inp::placeholder {
  color: #b5c4be;
}

/* Password toggle */
.pass-toggle {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  font-size: 12px;
  font-weight: 600;
  color: rgba(0, 70, 53, 0.55);
  cursor: pointer;
  font-family: 'Geist', system-ui, sans-serif;
  padding: 4px;
  transition: color 0.15s;
}

.pass-toggle:hover {
  color: #004635;
}

/* Remember me */
.rem-row {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 6px 0 26px;
}

.rem-row input[type='checkbox'] {
  width: 16px;
  height: 16px;
  accent-color: #004635;
  cursor: pointer;
}

.rem-row label {
  font-size: 13.5px;
  color: #64748b;
  cursor: pointer;
}

/* Primary CTA */
.btn {
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'Geist', system-ui, sans-serif;
  color: #002e24;
  cursor: pointer;
  background: #EFBF04;
  transition: opacity 0.15s, transform 0.1s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:hover:not(:disabled) {
  opacity: 0.88;
}

.btn:active:not(:disabled) {
  transform: scale(0.99);
}

.btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.btn.success {
  background: #004635;
  color: #EFBF04;
}

/* Error */
.err {
  color: #dc2626;
  font-size: 13px;
  margin-top: 10px;
  text-align: center;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 8px 12px;
}

/* Divider */
.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 20px 0;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: #e2e8f0;
}

.divider span {
  font-size: 12px;
  color: #b0bec8;
  white-space: nowrap;
}

/* Google button */
.btn-google {
  width: 100%;
  padding: 12px;
  border: 1.5px solid #e2e8f0;
  border-radius: 999px;
  font-size: 13.5px;
  font-weight: 500;
  font-family: 'Geist', system-ui, sans-serif;
  color: #334155;
  cursor: pointer;
  background: #ffffff;
  transition: border-color 0.15s, box-shadow 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 9px;
}

.btn-google:hover {
  border-color: #004635;
  box-shadow: 0 0 0 3px rgba(0, 70, 53, 0.06);
}

/* Footer */
.foot {
  margin-top: 18px;
  font-size: 11px;
  color: #b0bec8;
  text-align: center;
}

/* Spinner */
.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ─── RESPONSIVE ─── */
@media (max-width: 768px) {
  .shell {
    flex-direction: column;
  }

  .left {
    width: 100%;
    min-height: 280px;
    padding: 36px 28px;
  }

  .left-headline {
    font-size: 26px;
    margin-bottom: 12px;
  }

  .left-body {
    display: none;
  }

  .right {
    padding: 32px 20px;
  }

  .card {
    padding: 32px 24px 28px;
  }
}
</style>
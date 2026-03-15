<template>
  <div class="login-page">

    <!-- Left: Decorative Panel -->
    <div class="login-left">
      <div class="left-overlay"></div>
      <div class="left-content">
        <!-- Logo -->
        <div class="left-logo">
          <svg viewBox="0 0 32 32" fill="none" class="logo-icon">
            <path d="M16 3C16 3 8 10 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 10 16 3 16 3Z" fill="#c9a96e" opacity="0.9"/>
            <path d="M16 8C16 8 11 13 11 18C11 20.8 13.2 23 16 23C18.8 23 21 20.8 21 18C21 13 16 8 16 8Z" fill="#1a1a14"/>
            <line x1="16" y1="26" x2="16" y2="30" stroke="#c9a96e" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div>
            <p class="logo-brand">Servora</p>
            <p class="logo-sub">Spa &amp; Wellness</p>
          </div>
        </div>

        <!-- Quote -->
        <div class="left-quote">
          <p class="quote-text">"Where every detail is crafted for your peace of mind."</p>
          <p class="quote-author">— Servora Management System</p>
        </div>

        <!-- Stats -->
        <div class="left-stats">
          <div class="ls-item">
            <p class="ls-val">1,284</p>
            <p class="ls-label">Happy Clients</p>
          </div>
          <div class="ls-divider"></div>
          <div class="ls-item">
            <p class="ls-val">30+</p>
            <p class="ls-label">Treatments</p>
          </div>
          <div class="ls-divider"></div>
          <div class="ls-item">
            <p class="ls-val">4.9★</p>
            <p class="ls-label">Rating</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Right: Login Form -->
    <div class="login-right">
      <div class="login-form-wrap">

        <!-- Mobile Logo -->
        <div class="mobile-logo">
          <svg viewBox="0 0 32 32" fill="none" class="size-8">
            <path d="M16 3C16 3 8 10 8 18C8 22.4 11.6 26 16 26C20.4 26 24 22.4 24 18C24 10 16 3 16 3Z" fill="#c9a96e" opacity="0.9"/>
            <path d="M16 8C16 8 11 13 11 18C11 20.8 13.2 23 16 23C18.8 23 21 20.8 21 18C21 13 16 8 16 8Z" fill="#1a1a14"/>
            <line x1="16" y1="26" x2="16" y2="30" stroke="#c9a96e" stroke-width="1.5" stroke-linecap="round"/>
          </svg>
          <div>
            <p class="logo-brand" style="color:#1a1a14">Servora</p>
            <p class="logo-sub" style="color:#c9a96e">Spa &amp; Wellness</p>
          </div>
        </div>

        <!-- Heading -->
        <div class="form-heading">
          <h1 class="form-title">Welcome back</h1>
          <p class="form-sub">Sign in to your Servora dashboard</p>
        </div>

        <!-- Form -->
        <form class="login-form" @submit.prevent="handleLogin">

          <div class="form-group">
            <label>Email Address</label>
            <div class="input-wrap">
              <EnvelopeIcon class="input-icon size-4" />
              <input
                v-model="email"
                type="text"
                placeholder="Enter your email address"
              />
            </div>
          </div>

          <div class="form-group">
            <div class="label-row">
              <label>Password</label>
              <a href="#" class="forgot-link">Forgot password?</a>
            </div>
            <div class="input-wrap">
              <LockClosedIcon class="input-icon size-4" />
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                placeholder="Enter your password"
              />
              <button type="button" class="pw-toggle" @click="showPassword = !showPassword">
                <component :is="showPassword ? EyeSlashIcon : EyeIcon" class="size-4" />
              </button>
            </div>
          </div>

          <!-- Remember me -->
          <div class="remember-row">
            <label class="remember-label">
              <input type="checkbox" class="remember-check" />
              <span>Remember me for 30 days</span>
            </label>
          </div>

          <!-- Submit -->
          <button type="submit" class="btn-login" :disabled="loading">
            <span v-if="!loading">Sign In</span>
            <span v-else class="loading-wrap">
              <span class="spinner"></span> Signing in...
            </span>
          </button>

        </form>



      </div>
    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import {
  EnvelopeIcon, LockClosedIcon,
  EyeIcon, EyeSlashIcon,
} from '@heroicons/vue/24/outline'

// No layout for login page
definePageMeta({ layout: false })

const router       = useRouter()
const showPassword = ref(false)
const loading      = ref(false)
const email        = ref('')
const password     = ref('')

// ── LOGIN ──
async function handleLogin() {
  // Basta naay sulod sa duha ka fields — log-in!
  if (!email.value || !password.value) return

  loading.value = true
  await new Promise(r => setTimeout(r, 1200))
  router.push('/dashboard')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300&family=Jost:wght@300;400;500;600&display=swap');

* { box-sizing: border-box; margin: 0; padding: 0; }

.login-page {
  display: flex;
  min-height: 100vh;
  font-family: 'Jost', sans-serif;
  background: #f7f4ef;
}

/* ── LEFT PANEL ── */
.login-left {
  display: none;
  position: relative;
  width: 45%;
  background-image: url('https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=1200&auto=format&fit=crop&q=80');
  background-size: cover;
  background-position: center;
  flex-direction: column;
}
@media (min-width: 1024px) { .login-left { display: flex; } }

.left-overlay {
  position: absolute; inset: 0;
  background: linear-gradient(160deg, rgba(26,26,20,0.88) 0%, rgba(26,26,20,0.6) 60%, rgba(26,26,20,0.75) 100%);
}
.left-content {
  position: relative; z-index: 1;
  display: flex; flex-direction: column;
  justify-content: space-between;
  height: 100%; padding: 2.5rem;
}

/* Left Logo */
.left-logo { display: flex; align-items: center; gap: 0.85rem; }
.logo-icon  { width: 36px; height: 36px; flex-shrink: 0; }
.logo-brand {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem; font-weight: 300;
  letter-spacing: 0.2em; text-transform: uppercase; color: #fff;
}
.logo-sub {
  font-size: 0.55rem; letter-spacing: 0.35em;
  text-transform: uppercase; color: #c9a96e; margin-top: 2px;
}

/* Quote */
.left-quote { max-width: 340px; }
.quote-text {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.5rem; font-weight: 300; font-style: italic;
  color: #fff; line-height: 1.5; letter-spacing: 0.02em;
  margin-bottom: 0.75rem;
}
.quote-author { font-size: 0.7rem; color: rgba(255,255,255,0.4); letter-spacing: 0.15em; }

/* Stats */
.left-stats { display: flex; align-items: center; gap: 0; }
.ls-item    { flex: 1; }
.ls-val     { font-family: 'Cormorant Garamond', serif; font-size: 1.6rem; font-weight: 300; color: #c9a96e; line-height: 1; }
.ls-label   { font-size: 0.6rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-top: 3px; }
.ls-divider { width: 1px; height: 36px; background: rgba(201,169,110,0.25); margin: 0 1.5rem; }

/* ── RIGHT PANEL ── */
.login-right {
  flex: 1;
  display: flex; align-items: center; justify-content: center;
  padding: 2rem;
}
.login-form-wrap {
  width: 100%; max-width: 420px;
  display: flex; flex-direction: column; gap: 1.5rem;
}

/* Mobile Logo */
.mobile-logo {
  display: flex; align-items: center; gap: 0.85rem;
  margin-bottom: 0.5rem;
}
@media (min-width: 1024px) { .mobile-logo { display: none; } }

/* Heading */
.form-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem; font-weight: 300;
  color: #1a1a14; letter-spacing: 0.02em; line-height: 1;
}
.form-sub { font-size: 0.82rem; color: #9ca3af; margin-top: 0.4rem; font-weight: 300; }

/* Error Alert */
.error-alert {
  display: flex; align-items: center; gap: 0.6rem;
  background: rgba(192,114,90,0.1); border: 1px solid rgba(192,114,90,0.25);
  color: #b05540; padding: 0.75rem 1rem; border-radius: 8px;
  font-size: 0.82rem;
}

/* Form */
.login-form { display: flex; flex-direction: column; gap: 1.1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group label {
  font-size: 0.68rem; letter-spacing: 0.1em;
  text-transform: uppercase; color: #6b7280; font-weight: 500;
}
.label-row { display: flex; align-items: center; justify-content: space-between; }
.forgot-link { font-size: 0.7rem; color: #c9a96e; text-decoration: none; transition: color 0.2s; }
.forgot-link:hover { color: #1a1a14; }

.input-wrap { position: relative; }
.input-icon {
  position: absolute; left: 0.85rem; top: 50%;
  transform: translateY(-50%); color: #9ca3af; pointer-events: none;
}
.input-wrap input {
  width: 100%; padding: 0.75rem 0.85rem 0.75rem 2.5rem;
  border: 1px solid rgba(201,169,110,0.25); border-radius: 8px;
  font-family: 'Jost', sans-serif; font-size: 0.85rem; color: #1a1a14;
  background: #fff; outline: none; transition: border 0.2s, box-shadow 0.2s;
}
.input-wrap input:focus {
  border-color: #c9a96e;
  box-shadow: 0 0 0 3px rgba(201,169,110,0.1);
}
.input-wrap input.error { border-color: #c0725a; }
.pw-toggle {
  position: absolute; right: 0.85rem; top: 50%;
  transform: translateY(-50%); background: none; border: none;
  cursor: pointer; color: #9ca3af; display: flex; align-items: center;
  transition: color 0.2s;
}
.pw-toggle:hover { color: #1a1a14; }
.field-error { font-size: 0.68rem; color: #c0725a; margin-top: 0.2rem; }

/* Remember */
.remember-row { display: flex; align-items: center; }
.remember-label {
  display: flex; align-items: center; gap: 0.5rem;
  font-size: 0.78rem; color: #6b7280; cursor: pointer;
}
.remember-check { accent-color: #c9a96e; width: 14px; height: 14px; cursor: pointer; }

/* Submit Button */
.btn-login {
  width: 100%; padding: 0.85rem;
  background: #c9a96e; color: #1a1a14; border: none;
  border-radius: 8px; font-family: 'Jost', sans-serif;
  font-size: 0.82rem; font-weight: 600; letter-spacing: 0.15em;
  text-transform: uppercase; cursor: pointer;
  transition: background 0.2s, transform 0.2s, box-shadow 0.2s;
  box-shadow: 0 4px 20px rgba(201,169,110,0.3);
  margin-top: 0.25rem;
}
.btn-login:hover:not(:disabled) {
  background: #e2c99a; transform: translateY(-1px);
  box-shadow: 0 6px 28px rgba(201,169,110,0.4);
}
.btn-login:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

/* Loading spinner */
.loading-wrap { display: flex; align-items: center; justify-content: center; gap: 0.6rem; }
.spinner {
  width: 14px; height: 14px; border-radius: 50%;
  border: 2px solid rgba(26,26,20,0.2);
  border-top-color: #1a1a14;
  animation: spin 0.7s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }

/* Demo hint */
.demo-hint {
  background: rgba(201,169,110,0.06);
  border: 1px dashed rgba(201,169,110,0.3);
  border-radius: 8px; padding: 1rem; text-align: center;
}
.demo-title { font-size: 0.65rem; letter-spacing: 0.2em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.5rem; font-weight: 600; }
.demo-creds { font-size: 0.78rem; color: #6b7280; margin-bottom: 0.2rem; }
.demo-creds strong { color: #1a1a14; }
.demo-fill {
  margin-top: 0.75rem; background: none; border: 1px solid rgba(201,169,110,0.35);
  color: #a07830; padding: 0.4rem 1rem; border-radius: 4px;
  font-family: 'Jost', sans-serif; font-size: 0.7rem; font-weight: 500;
  letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer;
  transition: all 0.2s;
}
.demo-fill:hover { background: rgba(201,169,110,0.1); border-color: #c9a96e; }

/* Transitions */
.shake-enter-active { animation: shake 0.4s ease; }
@keyframes shake {
  0%, 100% { transform: translateX(0); }
  20%       { transform: translateX(-6px); }
  40%       { transform: translateX(6px); }
  60%       { transform: translateX(-4px); }
  80%       { transform: translateX(4px); }
}
</style>
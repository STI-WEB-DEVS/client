<template>
  <div class="shell">

    <!-- Left Panel -->
    <div class="left">
      <div class="c1"></div>
      <div class="c2"></div>

      <div class="logo-area">
        <div class="logo-mark">
          <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
            <rect width="44" height="44" rx="12" fill="#162c48"/>
            <path d="M22 32C22 32 11 25.5 11 18.5C11 14.9 13.9 12 17.5 12C19.7 12 21.6 13.2 22 13.8C22.4 13.2 24.3 12 26.5 12C30.1 12 33 14.9 33 18.5C33 25.5 22 32 22 32Z" fill="none" stroke="#7eb8f7" stroke-width="1.2"/>
            <path d="M14 20L17 20L18.5 17L20.5 23L22 19L23.5 21L25 20L28 20" stroke="#7eb8f7" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
          </svg>
          <span class="logo-name">AMUMA</span>
        </div>
        <p class="left-headline">Care begins<br/>with <em>being present.</em></p>
        <p class="left-body">A unified platform for healthcare staff to manage patient records, schedules, and care workflows.</p>
      </div>

      <div class="left-footer">
        <div class="trust-badges">
          <div class="badge"><span class="bdot"></span>HIPAA compliant</div>
          <div class="badge"><span class="bdot"></span>STI College 2025</div>
        </div>
      </div>
    </div>

    <!-- Right Panel -->
    <div class="right">
      <div class="card">
        <p class="wtitle">Welcome back</p>
        <p class="wsub">Sign in to continue to AMUMA</p>

        <form @submit.prevent="handleSubmit">
          <div class="field">
            <label class="lbl" for="email">Email</label>
            <input
              id="email"
              v-model="email"
              class="inp"
              type="email"
              placeholder="admin@amuma.health"
              autocomplete="email"
              required
            />
          </div>

          <div class="field">
            <div class="frow">
              <label class="lbl" for="password">Password</label>
              <a href="#" class="forgot">Forgot?</a>
            </div>
            <input
              id="password"
              v-model="password"
              class="inp"
              type="password"
              placeholder="••••••••"
              autocomplete="current-password"
              required
            />
          </div>

          <div class="rem-row">
            <input id="remember" v-model="remember" type="checkbox" />
            <label for="remember">Remember me</label>
          </div>

          <button type="submit" class="btn" :disabled="loading">
            <svg v-if="loading" class="spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="9" stroke="rgba(255,255,255,0.3)" stroke-width="2.5"/>
              <path d="M12 3a9 9 0 019 9" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            <svg v-else-if="success" width="15" height="15" viewBox="0 0 20 20" fill="none">
              <path d="M4 10l4 4 8-8" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>{{ loading ? 'Signing in…' : success ? 'Access granted' : 'Sign in' }}</span>
          </button>
        </form>

        <p class="foot">🔒 Authorized healthcare staff only · STI College 2025</p>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
const password = ref('')
const remember = ref(false)
const loading = ref(false)
const success = ref(false)

const handleSubmit = async () => {
  loading.value = true
  success.value = false
  try {
    await new Promise(r => setTimeout(r, 1500))
    success.value = true
    await navigateTo('/dashboard')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Geist:wght@400;500;600;700&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.shell {
  display: flex;
  min-height: 100vh;
  font-family: 'Geist', sans-serif;
}

/* ── Left panel ── */
.left {
  width: 46%;
  background: #0f1f35;
  padding: 48px 44px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  overflow: hidden;
}

.c1 {
  position: absolute;
  width: 320px;
  height: 320px;
  border-radius: 50%;
  background: #1a3356;
  bottom: -80px;
  right: -80px;
}

.c2 {
  position: absolute;
  width: 160px;
  height: 160px;
  border-radius: 50%;
  background: #162c48;
  top: 60px;
  right: 30px;
}

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

.logo-name {
  font-family: 'Instrument Serif', serif;
  font-size: 20px;
  color: #f0f6ff;
  letter-spacing: 0.08em;
}

.left-headline {
  font-family: 'Instrument Serif', serif;
  font-size: 34px;
  line-height: 1.25;
  color: #e8f0fb;
  font-weight: 400;
  margin-bottom: 16px;
}

.left-headline em {
  font-style: italic;
  color: #7eb8f7;
}

.left-body {
  font-size: 13.5px;
  color: #7a96b8;
  line-height: 1.7;
  max-width: 240px;
}

.left-footer {
  position: relative;
  z-index: 1;
}

.trust-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  display: flex;
  align-items: center;
  gap: 6px;
  background: #162c48;
  border: 1px solid #1e3d62;
  border-radius: 20px;
  padding: 6px 12px;
  font-size: 11.5px;
  color: #5f8cbf;
}

.bdot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #3b82f6;
  flex-shrink: 0;
}

/* ── Right panel ── */
.right {
  flex: 1;
  background: #eef2f7;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
}

.card {
  background: #ffffff;
  border-radius: 20px;
  padding: 44px 36px 36px;
  width: 100%;
  max-width: 420px;
}

.wtitle {
  font-size: 22px;
  font-weight: 700;
  color: #0f172a;
  margin-bottom: 5px;
  letter-spacing: -0.02em;
}

.wsub {
  font-size: 14px;
  color: #94a3b8;
  margin-bottom: 36px;
}

/* ── Form ── */
.field {
  margin-bottom: 18px;
}

.frow {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.lbl {
  display: block;
  font-size: 11px;
  font-weight: 700;
  color: #475569;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.frow .lbl {
  margin-bottom: 0;
}

.forgot {
  font-size: 13px;
  color: #3b82f6;
  text-decoration: none;
}

.forgot:hover {
  text-decoration: underline;
}

.inp {
  width: 100%;
  padding: 13px 20px;
  border: 1.5px solid #e2e8f0;
  border-radius: 999px;
  font-size: 14px;
  color: #334155;
  background: #f8fafc;
  font-family: 'Geist', sans-serif;
  outline: none;
  transition: border-color 0.15s, background 0.15s;
}

.inp:focus {
  border-color: #93c5fd;
  background: #ffffff;
}

.inp::placeholder {
  color: #b8c8d8;
}

.rem-row {
  display: flex;
  align-items: center;
  gap: 9px;
  margin: 8px 0 28px;
}

.rem-row input[type='checkbox'] {
  width: 16px;
  height: 16px;
  accent-color: #1e3a8a;
  cursor: pointer;
}

.rem-row label {
  font-size: 13.5px;
  color: #64748b;
  cursor: pointer;
}

.btn {
  width: 100%;
  padding: 15px;
  border: none;
  border-radius: 999px;
  font-size: 15px;
  font-weight: 600;
  font-family: 'Geist', sans-serif;
  color: #ffffff;
  cursor: pointer;
  background: linear-gradient(135deg, #1e3a8a 0%, #2563eb 100%);
  transition: opacity 0.15s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
}

.btn:hover:not(:disabled) {
  opacity: 0.9;
}

.btn:active:not(:disabled) {
  transform: scale(0.99);
}

.btn:disabled {
  opacity: 0.75;
  cursor: not-allowed;
}

.foot {
  margin-top: 18px;
  font-size: 11px;
  color: #b0bec8;
  text-align: center;
}

/* ── Spinner ── */
.spin {
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .shell {
    flex-direction: column;
  }

  .left {
    width: 100%;
    min-height: 260px;
    padding: 36px 28px;
  }

  .right {
    padding: 32px 20px;
  }

  .left-headline {
    font-size: 26px;
  }
}
</style>
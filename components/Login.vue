<template>
  <div class="login-root">

    <!-- Animated background blobs -->
    <div class="bg-blobs">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
    </div>

    <!-- Heartbeat line decoration -->
    <div class="heartbeat-bar">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
        <polyline
          class="heartbeat-line"
          points="0,30 150,30 180,10 200,50 220,10 245,30 280,30 310,5 330,55 345,30 380,30 530,30 560,10 580,50 600,10 625,30 660,30 690,5 710,55 725,30 760,30 910,30 940,10 960,50 980,10 1005,30 1040,30 1200,30"
          fill="none"
          stroke="rgba(220,38,38,0.5)"
          stroke-width="2"
        />
      </svg>
    </div>

    <!-- Left panel: branding side -->
    <div class="brand-panel">
      <div class="brand-inner">

        <div class="drop-icon-wrap">
          <svg class="drop-svg" viewBox="0 0 80 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M40 5 C40 5 5 40 5 62 C5 82 20.5 97 40 97 C59.5 97 75 82 75 62 C75 40 40 5 40 5Z" fill="url(#dropGrad)" />
            <path d="M40 5 C40 5 5 40 5 62 C5 82 20.5 97 40 97" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="1.5"/>
            <ellipse cx="28" cy="50" rx="6" ry="9" fill="rgba(255,255,255,0.18)" transform="rotate(-20 28 50)"/>
            <!-- Cross -->
            <rect x="36" y="58" width="8" height="18" rx="4" fill="white" fill-opacity="0.9"/>
            <rect x="29" y="65" width="22" height="8" rx="4" fill="white" fill-opacity="0.9"/>
            <defs>
              <linearGradient id="dropGrad" x1="20" y1="5" x2="60" y2="97" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stop-color="#ff4444"/>
                <stop offset="100%" stop-color="#8b0000"/>
              </linearGradient>
            </defs>
          </svg>
          <div class="drop-pulse-ring"></div>
          <div class="drop-pulse-ring ring-2"></div>
        </div>

        <h1 class="brand-name">KaDugo</h1>
        <p class="brand-tagline">Blood Donation &amp; Management System</p>

        <div class="brand-divider"></div>

        <div class="stats-row">
          <div class="stat-item">
            <span class="stat-number">3,200+</span>
            <span class="stat-label">Lives Saved</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-number">A B O AB</span>
            <span class="stat-label">Blood Types</span>
          </div>
          <div class="stat-sep"></div>
          <div class="stat-item">
            <span class="stat-number">24/7</span>
            <span class="stat-label">Support</span>
          </div>
        </div>

        <p class="brand-quote">"Every drop counts.<br/>Be someone's reason to live."</p>
      </div>
    </div>

    <!-- Right panel: login form -->
    <div class="form-panel">
      <div class="form-card">

        <div class="form-header">
          <h2 class="form-title">Welcome Back</h2>
          <p class="form-sub">Sign in to access the portal</p>
        </div>

        <form @submit.prevent="handleSubmit" class="login-form">

          <div class="field-group">
            <label for="email" class="field-label">Email Address</label>
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5l8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                <rect x="1" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              <input
                id="email"
                type="email"
                name="email"
                autocomplete="email"
                required
                placeholder="you@example.com"
                class="field-input"
              />
            </div>
          </div>

          <div class="field-group">
            <label for="password" class="field-label">Password</label>
            <div class="input-wrap">
              <svg class="input-icon" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/>
                <path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <input
                id="password"
                type="password"
                name="password"
                autocomplete="current-password"
                required
                placeholder="••••••••"
                class="field-input"
              />
            </div>
          </div>

          <div class="form-row">
            <label class="remember-label">
              <input type="checkbox" class="remember-check" />
              <span class="check-custom"></span>
              <span>Remember me</span>
            </label>
            <a href="#" class="forgot-link">Forgot password?</a>
          </div>

          <button type="submit" class="submit-btn">
            <svg class="btn-drop" viewBox="0 0 24 30" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 1 C12 1 2 11 2 18 C2 24 6.5 29 12 29 C17.5 29 22 24 22 18 C22 11 12 1 12 1Z" fill="white" fill-opacity="0.3"/>
            </svg>
            Sign In to Portal
          </button>

        </form>

        <div class="divider-row">
          <span class="divider-line"></span>
          <span class="divider-text">or continue with</span>
          <span class="divider-line"></span>
        </div>

        <div class="social-row">
          <a href="#" class="social-btn">
            <svg viewBox="0 0 24 24" class="social-icon" xmlns="http://www.w3.org/2000/svg">
              <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335"/>
              <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4"/>
              <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05"/>
              <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853"/>
            </svg>
            Google
          </a>
          <a href="#" class="social-btn">
            <svg class="social-icon" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"/>
            </svg>
            GitHub
          </a>
        </div>

        <p class="hotline-note">
          Emergency Hotline: <a href="tel:1800523846" class="hotline-link">1-800-KADUGO</a>
        </p>

      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
const handleSubmit = async () => {
  await navigateTo('/dashboard')
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Root Layout ── */
.login-root {
  display: flex;
  min-height: 100vh;
  background: #0a0202;
  position: relative;
  overflow: hidden;
  font-family: 'DM Sans', sans-serif;
}

/* ── Background Blobs ── */
.bg-blobs { position: fixed; inset: 0; pointer-events: none; z-index: 0; }

.blob {
  position: absolute;
  border-radius: 50%;
  filter: blur(90px);
  opacity: 0.18;
  animation: blobFloat 12s ease-in-out infinite alternate;
}

.blob-1 {
  width: 560px; height: 560px;
  background: radial-gradient(circle, #c0392b, #7b0000);
  top: -180px; left: -120px;
  animation-delay: 0s;
}
.blob-2 {
  width: 420px; height: 420px;
  background: radial-gradient(circle, #e74c3c, #500000);
  bottom: -100px; right: -100px;
  animation-delay: -5s;
}
.blob-3 {
  width: 280px; height: 280px;
  background: radial-gradient(circle, #ff6b6b, #8b0000);
  top: 50%; left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: -3s;
}

@keyframes blobFloat {
  0%   { transform: translate(0, 0) scale(1); }
  100% { transform: translate(30px, 20px) scale(1.08); }
}

/* ── Heartbeat bar ── */
.heartbeat-bar {
  position: fixed;
  top: 0; left: 0; right: 0;
  height: 60px;
  z-index: 5;
  opacity: 0.6;
}
.heartbeat-bar svg { width: 100%; height: 60px; }

.heartbeat-line {
  stroke-dasharray: 2000;
  stroke-dashoffset: 2000;
  animation: drawLine 4s ease-out forwards, pulseOpacity 4s 4s ease-in-out infinite;
}

@keyframes drawLine {
  to { stroke-dashoffset: 0; }
}
@keyframes pulseOpacity {
  0%, 100% { opacity: 0.5; }
  50%       { opacity: 1; }
}

/* ── Brand Panel ── */
.brand-panel {
  flex: 0 0 42%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  z-index: 2;
  padding: 3rem 3rem 3rem 4rem;
  border-right: 1px solid rgba(220, 38, 38, 0.12);
}

/* subtle vertical line texture */
.brand-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 39px,
      rgba(220,38,38,0.03) 40px
    );
  pointer-events: none;
}

.brand-inner {
  max-width: 360px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0;
}

/* Drop icon */
.drop-icon-wrap {
  position: relative;
  width: 88px; height: 108px;
  margin-bottom: 2rem;
}

.drop-svg {
  width: 88px; height: 108px;
  filter: drop-shadow(0 8px 32px rgba(220,38,38,0.55));
  animation: dropBob 3s ease-in-out infinite;
}

@keyframes dropBob {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
}

.drop-pulse-ring {
  position: absolute;
  inset: -16px;
  border-radius: 50% 50% 50% 50% / 40% 40% 60% 60%;
  border: 2px solid rgba(220, 38, 38, 0.4);
  animation: ringPulse 2.4s ease-out infinite;
}
.ring-2 {
  inset: -28px;
  border-color: rgba(220, 38, 38, 0.2);
  animation-delay: 0.8s;
}

@keyframes ringPulse {
  0%   { opacity: 1; transform: scale(0.85); }
  100% { opacity: 0; transform: scale(1.25); }
}

/* Brand text */
.brand-name {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 3.6rem;
  font-weight: 900;
  color: #ffffff;
  line-height: 1;
  letter-spacing: -0.03em;
  margin: 0 0 0.4rem;
}

.brand-tagline {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.38);
  text-transform: uppercase;
  letter-spacing: 0.18em;
  font-weight: 500;
  margin: 0 0 2rem;
}

.brand-divider {
  width: 52px;
  height: 3px;
  background: linear-gradient(90deg, #dc2626, transparent);
  border-radius: 2px;
  margin-bottom: 2rem;
}

/* Stats */
.stats-row {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2.5rem;
}

.stat-item {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.stat-number {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: #ff6b6b;
  line-height: 1;
}

.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
}

.stat-sep {
  width: 1px;
  height: 32px;
  background: rgba(255,255,255,0.1);
}

/* Quote */
.brand-quote {
  font-family: 'Playfair Display', serif;
  font-style: italic;
  font-size: 1.05rem;
  color: rgba(255,255,255,0.45);
  line-height: 1.65;
  border-left: 2px solid rgba(220,38,38,0.5);
  padding-left: 1rem;
  margin: 0;
}

/* ── Form Panel ── */
.form-panel {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 3rem 2rem;
  position: relative;
  z-index: 2;
}

.form-card {
  width: 100%;
  max-width: 440px;
  background: rgba(15, 2, 2, 0.7);
  border: 1px solid rgba(220, 38, 38, 0.18);
  border-radius: 24px;
  padding: 3rem 2.75rem;
  backdrop-filter: blur(24px);
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04) inset,
    0 32px 80px rgba(0,0,0,0.5),
    0 0 60px rgba(180,0,0,0.08);
  animation: cardReveal 0.7s cubic-bezier(.22,1,.36,1) both;
}

@keyframes cardReveal {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Form header */
.form-header {
  margin-bottom: 2.25rem;
}

.form-title {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  margin: 0 0 0.35rem;
  line-height: 1.1;
}

.form-sub {
  font-size: 0.82rem;
  color: rgba(255,255,255,0.38);
  margin: 0;
  letter-spacing: 0.02em;
}

/* Form */
.login-form {
  display: flex;
  flex-direction: column;
  gap: 1.4rem;
  margin-bottom: 1.75rem;
}

.field-group {
  display: flex;
  flex-direction: column;
  gap: 0.55rem;
}

.field-label {
  font-size: 0.72rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.45);
}

.input-wrap {
  position: relative;
}

.input-icon {
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  width: 16px; height: 16px;
  color: rgba(255,255,255,0.28);
  pointer-events: none;
  transition: color 0.2s;
}

.field-input {
  width: 100%;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(220, 38, 38, 0.2);
  border-radius: 12px;
  padding: 0.85rem 1rem 0.85rem 2.8rem;
  color: #fff;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.92rem;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  box-sizing: border-box;
}

.field-input::placeholder { color: rgba(255,255,255,0.22); }

.field-input:focus {
  border-color: #dc2626;
  background: rgba(220, 38, 38, 0.06);
  box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.15);
}

.field-input:focus + .input-icon,
.input-wrap:focus-within .input-icon {
  color: #dc2626;
}

/* Row */
.form-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.remember-label {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  cursor: pointer;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.45);
  user-select: none;
}

.remember-check { display: none; }

.check-custom {
  width: 16px; height: 16px;
  border: 1.5px solid rgba(220,38,38,0.4);
  border-radius: 4px;
  background: transparent;
  flex-shrink: 0;
  position: relative;
  transition: background 0.2s, border-color 0.2s;
}

.remember-check:checked ~ .check-custom {
  background: #dc2626;
  border-color: #dc2626;
}

.remember-check:checked ~ .check-custom::after {
  content: '';
  position: absolute;
  left: 3px; top: 1px;
  width: 6px; height: 9px;
  border: 2px solid white;
  border-top: none; border-left: none;
  transform: rotate(42deg);
}

.forgot-link {
  font-size: 0.82rem;
  color: #ff6b6b;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.15s;
}
.forgot-link:hover { color: #ff9999; }

/* Submit */
.submit-btn {
  position: relative;
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  letter-spacing: 0.03em;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  box-shadow: 0 6px 24px rgba(220,38,38,0.4), 0 1px 0 rgba(255,255,255,0.1) inset;
  transition: transform 0.15s, box-shadow 0.15s, background 0.15s;
  overflow: hidden;
}

.submit-btn::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), transparent 60%);
  pointer-events: none;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 32px rgba(220,38,38,0.55);
}

.submit-btn:active { transform: translateY(0); }

.btn-drop {
  width: 18px; height: 22px;
}

/* Divider */
.divider-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.divider-line {
  flex: 1;
  height: 1px;
  background: rgba(255,255,255,0.08);
}

.divider-text {
  font-size: 0.72rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.28);
  white-space: nowrap;
}

/* Social */
.social-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
  margin-bottom: 2rem;
}

.social-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  padding: 0.7rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  color: rgba(255,255,255,0.65);
  font-size: 0.85rem;
  font-weight: 500;
  text-decoration: none;
  transition: background 0.15s, border-color 0.15s, color 0.15s;
}

.social-btn:hover {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.3);
  color: rgba(255,255,255,0.9);
}

.social-icon { width: 18px; height: 18px; flex-shrink: 0; }

/* Hotline */
.hotline-note {
  text-align: center;
  font-size: 0.75rem;
  color: rgba(255,255,255,0.25);
  margin: 0;
}

.hotline-link {
  color: rgba(255,255,255,0.5);
  text-decoration: none;
  font-weight: 600;
  transition: color 0.15s;
}

.hotline-link:hover { color: #ff6b6b; }

/* ── Responsive ── */
@media (max-width: 860px) {
  .login-root { flex-direction: column; }

  .brand-panel {
    flex: 0 0 auto;
    border-right: none;
    border-bottom: 1px solid rgba(220,38,38,0.12);
    padding: 3rem 2rem 2rem;
    justify-content: center;
  }

  .brand-inner { align-items: center; text-align: center; }
  .brand-quote { text-align: left; }

  .form-panel { padding: 2rem 1.25rem; }
  .form-card { padding: 2rem 1.5rem; }
}
</style>
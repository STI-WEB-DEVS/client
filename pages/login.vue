<template>
  <div style="min-height:100vh; display:flex; font-family:'Canva Sans','Nunito','Inter',sans-serif; background:#F9F6EA;">

    <!-- ===== LEFT PANEL ===== -->
    <div style="flex:1; position:relative; overflow:hidden; display:flex; flex-direction:column; align-items:center; justify-content:center; padding:60px 52px;">
      <div style="position:absolute; inset:0; background:linear-gradient(160deg,#1e3448 0%,#183a28 55%,#2E8B50 100%); z-index:0;"></div>
      <div style="position:absolute; top:-120px; left:-120px; width:480px; height:480px; border-radius:50%; background:rgba(46,139,80,0.18); z-index:0;"></div>
      <div style="position:absolute; bottom:-100px; right:-100px; width:420px; height:420px; border-radius:50%; background:rgba(76,175,130,0.13); z-index:0;"></div>
      <div style="position:absolute; top:40%; left:8%; width:200px; height:200px; border-radius:50%; background:rgba(255,255,255,0.03); z-index:0;"></div>

      <!-- Logo + Brand -->
      <div style="position:relative; z-index:1; text-align:center; margin-bottom:48px;">
        <div style="display:flex; align-items:center; justify-content:center; gap:16px; margin-bottom:16px;">
          <img src="/nutrimatch-logo.png" alt="NutriMatch" style="width:90px; height:90px; border-radius:50px; object-fit:cover; box-shadow:0 12px 40px rgba(0,0,0,0.35);"/>
          <div style="text-align:left;">
            <div style="font-size:38px; font-weight:800; letter-spacing:-1px; line-height:1;">
              <span style="color:#ffffff;">Nutri</span><span style="color:#a8e6b8;">match</span>
            </div>
            <div style="color:rgba(255,255,255,0.45); font-size:11px; letter-spacing:2px; text-transform:uppercase; margin-top:3px;">Admin Platform</div>
          </div>
        </div>
        <p style="color:rgba(255,255,255,0.55); font-size:14px; max-width:320px; line-height:1.7; margin:0 auto;">
          Clinical Nutrition Management for Licensed Registered Nutritionist-Dietitians
        </p>
      </div>

      <!-- Feature cards -->
      <div style="position:relative; z-index:1; display:flex; flex-direction:column; gap:14px; width:100%; max-width:380px;">
        <div v-for="f in features" :key="f.title"
          style="display:flex; align-items:center; gap:16px; background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.12); border-radius:16px; padding:16px 20px; backdrop-filter:blur(12px);">
          <div style="width:44px; height:44px; border-radius:12px; background:rgba(46,139,80,0.65); display:flex; align-items:center; justify-content:center; flex-shrink:0;" v-html="f.icon"></div>
          <div>
            <p style="color:white; font-size:13px; font-weight:700; margin-bottom:3px;">{{ f.title }}</p>
            <p style="color:rgba(255,255,255,0.5); font-size:11px; line-height:1.5;">{{ f.desc }}</p>
          </div>
        </div>
      </div>

      <p style="position:relative; z-index:1; margin-top:40px; color:rgba(255,255,255,0.25); font-size:12px; font-style:italic; text-align:center; max-width:300px; line-height:1.7;">
        "Empowering Dietitians with smarter, data-driven nutrition care"
      </p>
    </div>

    <!-- ===== RIGHT PANEL — wider white space ===== -->
    <div style="width:700px; flex-shrink:0; background:#FFFEF9; display:flex; flex-direction:column; justify-content:center; padding:72px 64px; position:relative; overflow:hidden; min-height:100vh;">

      <!-- Subtle decorations -->
      <div style="position:absolute; top:-80px; right:-80px; width:260px; height:260px; border-radius:50%; background:rgba(76,175,130,0.05);"></div>
      <div style="position:absolute; bottom:-60px; left:-60px; width:200px; height:200px; border-radius:50%; background:rgba(30,52,72,0.04);"></div>

      <div style="position:relative; z-index:1;">

        <!-- Header -->
        <div style="margin-bottom:40px;">
          <div style="display:inline-flex; align-items:center; gap:7px; background:#f0faf5; border:1px solid #c8e6d8; border-radius:20px; padding:6px 14px; margin-bottom:20px;">
            <span style="width:7px; height:7px; background:#4CAF82; border-radius:50%; display:inline-block;"></span>
            <span style="font-size:11px; font-weight:700; color:#2E8B50; letter-spacing:0.8px;">SECURE LOGIN</span>
          </div>
          <h1 style="font-size:34px; font-weight:800; color:#1e3448; letter-spacing:-0.7px; line-height:1.15; margin-bottom:10px;">
            Welcome back 👋
          </h1>
          <p style="color:#8fa8bc; font-size:15px; line-height:1.6;">
            Sign in to your NutriMatch admin account to continue managing your platform.
          </p>
        </div>

        <!-- Error -->
        <div v-if="error" style="background:#fef2f2; border:1px solid #fecaca; border-radius:12px; padding:12px 16px; margin-bottom:22px; color:#dc2626; font-size:13px; display:flex; align-items:center; gap:9px;">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          {{ error }}
        </div>

        <!-- Form -->
        <form @submit.prevent="handleLogin">

          <!-- Email -->
          <div style="margin-bottom:22px;">
            <label style="display:block; font-size:12px; font-weight:700; color:#1e3448; margin-bottom:8px; letter-spacing:0.4px; text-transform:uppercase;">Email Address</label>
            <div style="position:relative;">
              <div style="position:absolute; left:15px; top:50%; transform:translateY(-50%); color:#b0c4bc; pointer-events:none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              </div>
              <input v-model="email" type="email" placeholder="dr.chen@nutrimatch.com"
                style="width:100%; border:1.5px solid #e2ece6; border-radius:13px; padding:14px 16px 14px 44px; font-size:14px; color:#1e3448; outline:none; background:#FFFDF7; font-family:'Canva Sans','Nunito','Inter',sans-serif; box-sizing:border-box; transition:border-color 0.2s;"
                @focus="(e:any)=>e.target.style.borderColor='#4CAF82'"
                @blur="(e:any)=>e.target.style.borderColor='#e2ece6'"
              />
            </div>
          </div>

          <!-- Password -->
          <div style="margin-bottom:30px;">
            <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
              <label style="font-size:12px; font-weight:700; color:#1e3448; letter-spacing:0.4px; text-transform:uppercase;">Password</label>
              <a href="#" style="font-size:13px; color:#4CAF82; text-decoration:none; font-weight:600;">Forgot password?</a>
            </div>
            <div style="position:relative;">
              <div style="position:absolute; left:15px; top:50%; transform:translateY(-50%); color:#b0c4bc; pointer-events:none;">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
              </div>
              <input v-model="password" :type="showPw ? 'text' : 'password'" placeholder="Enter your password"
                style="width:100%; border:1.5px solid #e2ece6; border-radius:13px; padding:14px 46px 14px 44px; font-size:14px; color:#1e3448; outline:none; background:#FFFDF7; font-family:'Canva Sans','Nunito','Inter',sans-serif; box-sizing:border-box; transition:border-color 0.2s;"
                @focus="(e:any)=>e.target.style.borderColor='#4CAF82'"
                @blur="(e:any)=>e.target.style.borderColor='#e2ece6'"
              />
              <button type="button" @click="showPw=!showPw" style="position:absolute; right:15px; top:50%; transform:translateY(-50%); background:none; border:none; cursor:pointer; color:#b0c4bc; padding:0; display:flex;">
                <svg v-if="!showPw" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
              </button>
            </div>
          </div>

          <!-- Sign In button -->
          <button type="submit" :disabled="loading"
            style="width:100%; border:none; border-radius:13px; padding:15px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Canva Sans','Nunito','Inter',sans-serif; letter-spacing:0.2px; display:flex; align-items:center; justify-content:center; gap:9px; transition:opacity 0.2s; background:linear-gradient(135deg,#4CAF82 0%,#2E8B50 100%); color:white;"
            :style="loading ? 'opacity:0.75;' : 'opacity:1;'">
            <svg v-if="!loading" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>
            <svg v-else width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" style="animation:spin 1s linear infinite;"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            {{ loading ? 'Signing in...' : 'Sign In to NutriMatch' }}
          </button>
        </form>

        <!-- Divider -->
        <div style="display:flex; align-items:center; gap:14px; margin:28px 0 24px;">
          <div style="flex:1; height:1px; background:#e8f0ec;"></div>
          <span style="font-size:12px; color:#b0c4bc; font-weight:500;">OR</span>
          <div style="flex:1; height:1px; background:#e8f0ec;"></div>
        </div>

        <!-- Demo access card -->
        <div style="background:#f0faf5; border:1.5px solid #c8e6d8; border-radius:14px; padding:16px 20px; display:flex; align-items:center; gap:12px;">
          <div style="width:36px; height:36px; border-radius:10px; background:#4CAF82; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <div>
            <p style="font-size:13px; font-weight:700; color:#2E8B50; margin-bottom:2px;">Demo Access</p>
            <p style="font-size:12px; color:#6aab8a; line-height:1.4;">Enter any email & password to sign in and explore the platform.</p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: false })
const { login } = useAuth()
const email = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')
const showPw = ref(false)

const features = [
  {
    title: 'Smart Meal Planning',
    desc: 'Disease-specific diet templates using Philippine & USDA food data',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3zm0 0v7"/></svg>'
  },
  {
    title: 'Patient Progress Monitoring',
    desc: 'Real-time clinical outcomes, lab values & anthropometric tracking',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>'
  },
  {
    title: 'Verified RND Access Only',
    desc: 'Licensed dietitians verified before platform access is granted',
    icon: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'
  }
]

const handleLogin = async () => {
  if (!email.value || !password.value) {
    error.value = 'Please enter your email and password.'
    return
  }
  loading.value = true
  error.value = ''
  await new Promise(r => setTimeout(r, 800))
  if (login(email.value, password.value)) {
    navigateTo('/dashboard')
  } else {
    error.value = 'Invalid credentials. Please try again.'
  }
  loading.value = false
}
</script>

<style>
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>

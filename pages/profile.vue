<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

    <!-- ── Left: Profile card ─────────────────────── -->
    <div class="space-y-4">

      <!-- Avatar + meta -->
      <div class="nm-card p-6 flex flex-col items-center text-center">
        <div class="relative group mb-4">
          <div class="nm-profile-av">SA</div>
          <button class="nm-av-upload">
            <CameraIcon class="w-4 h-4"/>
          </button>
        </div>
        <p class="font-display text-xl font-bold">System Administrator</p>
        <p class="text-sm mt-0.5" style="color:var(--muted)">admin@nutrimatch.ph</p>
        <div class="flex gap-1.5 mt-2">
          <span class="nm-badge badge-verified"><ShieldCheckIcon class="w-3 h-3"/> Super Admin</span>
        </div>

        <!-- Quick stats -->
        <div class="w-full grid grid-cols-2 gap-3 mt-5 pt-5 border-t" style="border-color:var(--border)">
          <div v-for="s in quickStats" :key="s.label" class="nm-qstat">
            <p class="font-display text-xl font-bold" style="color:var(--teal-700)">{{ s.val }}</p>
            <p class="text-[.62rem] uppercase tracking-wide font-bold" style="color:var(--muted)">{{ s.label }}</p>
          </div>
        </div>
      </div>

      <!-- Account details -->
      <div class="nm-card p-5">
        <p class="nm-sec-title mb-3">Account Details</p>
        <div class="space-y-2.5 text-sm">
          <div v-for="d in accountDetails" :key="d.label" class="flex justify-between items-center">
            <span style="color:var(--muted)">{{ d.label }}</span>
            <span v-if="d.badge" class="nm-badge" :class="d.badge">{{ d.val }}</span>
            <span v-else-if="d.mono" class="font-mono text-xs font-bold px-2 py-0.5 rounded" style="background:var(--cream)">{{ d.val }}</span>
            <span v-else class="font-semibold">{{ d.val }}</span>
          </div>
        </div>
      </div>

      <!-- Danger zone -->
      <div class="nm-card p-5">
        <p class="font-display text-red-600 text-base font-semibold mb-2">Danger Zone</p>
        <p class="text-xs mb-3" style="color:var(--muted)">These actions cannot be undone.</p>
        <div class="space-y-2">
          <button class="nm-btn nm-btn-danger w-full justify-center text-sm">Reset All Platform Data</button>
          <button class="nm-btn nm-btn-danger w-full justify-center text-sm">Deactivate Account</button>
        </div>
      </div>
    </div>

    <!-- ── Right: Edit panels ─────────────────────── -->
    <div class="lg:col-span-2 space-y-5">

      <!-- Personal info -->
      <div class="nm-card p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <p class="nm-sec-title">Personal Information</p>
            <p class="text-xs mt-0.5" style="color:var(--muted)">Update your admin profile details</p>
          </div>
          <span class="text-xs" style="color:var(--muted)">Last updated Mar 14, 2025</span>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><label class="nm-label">First Name</label><input class="nm-input" value="System"/></div>
          <div><label class="nm-label">Last Name</label><input class="nm-input" value="Admin"/></div>
          <div class="sm:col-span-2">
            <label class="nm-label">Email Address</label>
            <div class="relative">
              <EnvelopeIcon class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style="color:var(--muted)"/>
              <input class="nm-input pl-10" type="email" value="admin@nutrimatch.ph"/>
            </div>
          </div>
          <div>
            <label class="nm-label">Phone Number</label>
            <div class="flex">
              <span class="px-3 flex items-center text-sm border border-r-0 rounded-l-lg bg-gray-50" style="border-color:var(--border); color:var(--muted)">+63</span>
              <input class="nm-input rounded-l-none" type="tel" value="9171234567"/>
            </div>
          </div>
          <div><label class="nm-label">Location</label><input class="nm-input" value="Davao City, Philippines"/></div>
          <div class="sm:col-span-2">
            <label class="nm-label">Bio / Notes</label>
            <textarea class="nm-input resize-none" rows="3">Platform administrator for NutriMatch — managing RND verification, client oversight, and system operations.</textarea>
          </div>
        </div>
        <div class="flex justify-end gap-3 mt-5 pt-4 border-t" style="border-color:var(--border)">
          <button class="nm-btn nm-btn-ghost">Discard</button>
          <button class="nm-btn nm-btn-primary" @click="showToast('Profile updated successfully')">
            <CheckIcon class="w-4 h-4"/> Save Changes
          </button>
        </div>
      </div>

      <!-- Change password -->
      <div class="nm-card p-6">
        <p class="nm-sec-title mb-1">Change Password</p>
        <p class="text-xs mb-5" style="color:var(--muted)">Use a strong password with at least 12 characters.</p>
        <div class="space-y-4">
          <div>
            <label class="nm-label">Current Password</label>
            <div class="relative">
              <LockClosedIcon class="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2" style="color:var(--muted)"/>
              <input class="nm-input pl-10" type="password" placeholder="••••••••••"/>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="nm-label">New Password</label>
              <input class="nm-input" type="password" v-model="newPass" placeholder="Min. 12 characters"/>
            </div>
            <div>
              <label class="nm-label">Confirm New Password</label>
              <input class="nm-input" type="password" placeholder="Repeat new password"/>
            </div>
          </div>

          <!-- Strength bar -->
          <div v-if="newPass" class="space-y-1.5">
            <div class="flex gap-1">
              <div v-for="i in 4" :key="i" class="h-1.5 flex-1 rounded-full transition-all duration-300"
                   :style="{ background: strength >= i ? strengthColor : '#e4e3db' }"/>
            </div>
            <p class="text-xs font-semibold" :style="{ color: strengthColor }">{{ strengthLabel }}</p>
          </div>

          <div class="flex justify-end">
            <button class="nm-btn nm-btn-primary" @click="showToast('Password changed successfully')">
              <LockClosedIcon class="w-4 h-4"/> Update Password
            </button>
          </div>
        </div>
      </div>

      <!-- Recent activity -->
      <div class="nm-card p-6">
        <p class="nm-sec-title mb-4">Recent Activity</p>
        <div>
          <div v-for="(log, i) in activityLog" :key="i"
               class="flex items-start gap-3 py-3" :class="{ 'border-b': i < activityLog.length - 1 }"
               style="border-color:var(--border)">
            <div class="w-2 h-2 rounded-full mt-1.5 flex-shrink-0" :style="{ background: log.color }"/>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium">{{ log.action }}</p>
              <p class="text-xs mt-0.5" style="color:var(--muted)">{{ log.meta }}</p>
            </div>
            <p class="text-xs whitespace-nowrap flex-shrink-0" style="color:var(--muted)">{{ log.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Toast -->
    <transition name="toast">
      <div v-if="toastVisible" class="nm-toast">
        <CheckCircleIcon class="w-4 h-4"/>
        {{ toastMsg }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { CameraIcon, EnvelopeIcon, LockClosedIcon, CheckIcon, CheckCircleIcon, ShieldCheckIcon } from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

const newPass = ref('')
const toastVisible = ref(false)
const toastMsg = ref('')

function showToast(msg: string) {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2600)
}

const quickStats = [
  { val:'384', label:'Clients' },
  { val:'7',   label:'Team RNDs' },
  { val:'1,248', label:'Consults' },
  { val:'98%', label:'Uptime' },
]

const accountDetails = [
  { label:'Role',       val:'System Administrator', badge:null,           mono:false },
  { label:'Account ID', val:'ADM-00001',             badge:null,           mono:true  },
  { label:'Joined',     val:'Jan 1, 2025',           badge:null,           mono:false },
  { label:'Last Login', val:'Today',                 badge:null,           mono:false },
  { label:'2FA',        val:'Enabled',               badge:'badge-active', mono:false },
  { label:'Status',     val:'Active',                badge:'badge-active', mono:false },
]

const activityLog = [
  { action:'Approved RND verification for Ana Lim',        meta:'PRC-RND-00551 · Cardiovascular', time:'2h ago',  color:'#0d6b6b' },
  { action:'Updated platform commission rate to 15%',      meta:'Settings → Consultation Config', time:'5h ago',  color:'#d97706' },
  { action:'Flagged payment dispute for Client NM-00131',  meta:'Transaction ID: TXN-20250313',   time:'1d ago',  color:'#dc2626' },
  { action:'Exported client report (March 2025)',          meta:'384 records · CSV format',       time:'2d ago',  color:'#7c3aed' },
  { action:'System backup completed',                      meta:'Automated daily backup · 2.4 GB',time:'3d ago',  color:'#059669' },
]

const strength = computed(() => {
  const p = newPass.value; if (!p) return 0
  let s = 0
  if (p.length >= 8) s++
  if (p.length >= 12) s++
  if (/[A-Z]/.test(p) && /[0-9]/.test(p)) s++
  if (/[^A-Za-z0-9]/.test(p)) s++
  return s
})
const strengthColor = computed(() => ['','#ef4444','#f59e0b','#10b981','#0d6b6b'][strength.value])
const strengthLabel  = computed(() => ['','Weak','Fair','Good','Strong'][strength.value])
</script>

<style scoped>
.nm-profile-av {
  width: 88px; height: 88px; border-radius: 20px;
  background: linear-gradient(135deg, #083534, #0d6b6b);
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-family: 'Playfair Display', serif;
  font-size: 1.75rem; font-weight: 700;
  box-shadow: 0 8px 24px rgba(8,53,52,.22);
}
.nm-av-upload {
  position: absolute; bottom: -6px; right: -6px;
  width: 30px; height: 30px; border-radius: 8px;
  background: var(--amber); color: #fff;
  display: flex; align-items: center; justify-content: center;
  border: 2px solid #fff; cursor: pointer; opacity: 0;
  transition: opacity .2s;
}
.group:hover .nm-av-upload { opacity: 1; }

.nm-qstat { background: var(--cream); border-radius: 10px; padding: .75rem; text-align: center; }
</style>

<template>
  <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">

    <!-- ── Left: Profile card ───────────────────────── -->
    <div class="space-y-4">

      <!-- Avatar card -->
      <div class="nm-card p-6 flex flex-col items-center text-center">
        <!-- Avatar with upload hover -->
        <div class="relative group mb-4">
          <div class="nm-profile-avatar">
            <span>SA</span>
          </div>
          <button class="nm-avatar-upload-btn group-hover:opacity-100">
            <CameraIcon class="w-4 h-4" />
          </button>
        </div>

        <h2 class="font-display text-nm-text text-xl font-bold leading-tight">System Administrator</h2>
        <p class="text-nm-muted text-sm font-body mt-0.5">admin@nutrimatch.ph</p>

        <div class="flex items-center gap-1.5 mt-2">
          <span class="nm-badge nm-badge-verified">
            <ShieldCheckIcon class="w-3 h-3" />
            Super Admin
          </span>
        </div>

        <!-- Quick stats -->
        <div class="w-full grid grid-cols-2 gap-3 mt-5 pt-5 border-t border-nm-border">
          <div class="nm-profile-quick-stat">
            <p class="nm-profile-quick-val">384</p>
            <p class="nm-profile-quick-lbl">Total Clients</p>
          </div>
          <div class="nm-profile-quick-stat">
            <p class="nm-profile-quick-val">7</p>
            <p class="nm-profile-quick-lbl">Team Members</p>
          </div>
          <div class="nm-profile-quick-stat">
            <p class="nm-profile-quick-val">1,248</p>
            <p class="nm-profile-quick-lbl">Consultations</p>
          </div>
          <div class="nm-profile-quick-stat">
            <p class="nm-profile-quick-val">98%</p>
            <p class="nm-profile-quick-lbl">Uptime</p>
          </div>
        </div>
      </div>

      <!-- Account meta -->
      <div class="nm-card p-5">
        <h3 class="nm-section-title mb-3">Account Details</h3>
        <div class="space-y-3 text-sm font-body">
          <div class="flex justify-between items-center">
            <span class="text-nm-muted">Role</span>
            <span class="font-semibold text-nm-text">System Administrator</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-nm-muted">Account ID</span>
            <span class="font-mono text-xs font-bold text-nm-text bg-nm-cream px-2 py-0.5 rounded">ADM-00001</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-nm-muted">Joined</span>
            <span class="font-semibold text-nm-text">Jan 1, 2025</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-nm-muted">Last Login</span>
            <span class="font-semibold text-nm-text">Today, {{ currentTime }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-nm-muted">2FA</span>
            <span class="nm-badge nm-badge-active">Enabled</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-nm-muted">Status</span>
            <span class="nm-badge nm-badge-active">Active</span>
          </div>
        </div>
      </div>

      <!-- Danger zone -->
      <div class="nm-card p-5 border-red-200">
        <h3 class="font-display text-red-600 text-base font-semibold mb-3">Danger Zone</h3>
        <p class="text-xs text-nm-muted font-body mb-3">These actions are permanent and cannot be undone.</p>
        <div class="space-y-2">
          <button class="nm-btn-danger-ghost w-full justify-center text-sm">
            Reset All Platform Data
          </button>
          <button class="nm-btn-danger-ghost w-full justify-center text-sm">
            Deactivate Account
          </button>
        </div>
      </div>
    </div>

    <!-- ── Right: Edit form ────────────────────────── -->
    <div class="lg:col-span-2 space-y-5">

      <!-- Personal info -->
      <div class="nm-card p-6">
        <div class="flex items-center justify-between mb-5">
          <div>
            <h3 class="nm-section-title">Personal Information</h3>
            <p class="text-xs text-nm-muted font-body mt-0.5">Update your admin profile details</p>
          </div>
          <span class="text-xs font-body text-nm-muted">
            Last updated {{ lastUpdated }}
          </span>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="nm-label">First Name</label>
            <input class="nm-input" v-model="profile.firstName" />
          </div>
          <div>
            <label class="nm-label">Last Name</label>
            <input class="nm-input" v-model="profile.lastName" />
          </div>
          <div class="sm:col-span-2">
            <label class="nm-label">Email Address</label>
            <div class="relative">
              <EnvelopeIcon class="w-4 h-4 text-nm-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input class="nm-input pl-10" type="email" v-model="profile.email" />
            </div>
          </div>
          <div>
            <label class="nm-label">Phone Number</label>
            <div class="relative">
              <span class="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-nm-muted font-body">+63</span>
              <input class="nm-input pl-12" type="tel" v-model="profile.phone" />
            </div>
          </div>
          <div>
            <label class="nm-label">Location</label>
            <input class="nm-input" v-model="profile.location" placeholder="Davao City, Philippines" />
          </div>
          <div class="sm:col-span-2">
            <label class="nm-label">Bio / Notes</label>
            <textarea
              class="nm-input resize-none"
              rows="3"
              v-model="profile.bio"
              placeholder="A short description about this admin account…"
            />
          </div>
        </div>

        <div class="flex justify-end gap-3 mt-5 pt-4 border-t border-nm-border">
          <button class="nm-btn-ghost" @click="resetProfile">Discard</button>
          <button class="nm-btn-primary" @click="saveProfile">
            <CheckIcon class="w-4 h-4" /> Save Changes
          </button>
        </div>
      </div>

      <!-- Change password -->
      <div class="nm-card p-6">
        <h3 class="nm-section-title mb-1">Change Password</h3>
        <p class="text-xs text-nm-muted font-body mb-5">Use a strong password with at least 12 characters.</p>

        <div class="space-y-4">
          <div>
            <label class="nm-label">Current Password</label>
            <div class="relative">
              <LockClosedIcon class="w-4 h-4 text-nm-muted absolute left-3 top-1/2 -translate-y-1/2" />
              <input class="nm-input pl-10 pr-10" :type="showCurrent ? 'text' : 'password'" v-model="passwords.current" placeholder="••••••••••" />
              <button type="button" @click="showCurrent = !showCurrent" class="absolute right-3 top-1/2 -translate-y-1/2 text-nm-muted hover:text-nm-teal transition-colors">
                <component :is="showCurrent ? EyeSlashIcon : EyeIcon" class="w-4 h-4" />
              </button>
            </div>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="nm-label">New Password</label>
              <input class="nm-input" :type="showNew ? 'text' : 'password'" v-model="passwords.new" placeholder="Min. 12 characters" />
            </div>
            <div>
              <label class="nm-label">Confirm New Password</label>
              <input class="nm-input" :type="showNew ? 'text' : 'password'" v-model="passwords.confirm" placeholder="Repeat new password" />
            </div>
          </div>

          <!-- Password strength indicator -->
          <div v-if="passwords.new" class="space-y-1.5">
            <div class="flex gap-1">
              <div
                v-for="i in 4"
                :key="i"
                class="h-1.5 flex-1 rounded-full transition-all duration-300"
                :class="passwordStrength >= i ? strengthColor : 'bg-nm-cream-dark'"
              />
            </div>
            <p class="text-xs font-body" :class="strengthTextColor">{{ strengthLabel }}</p>
          </div>

          <div class="flex justify-end mt-2">
            <button class="nm-btn-primary" @click="changePassword">
              <LockClosedIcon class="w-4 h-4" /> Update Password
            </button>
          </div>
        </div>
      </div>

      <!-- Activity log -->
      <div class="nm-card p-6">
        <h3 class="nm-section-title mb-4">Recent Activity</h3>
        <div class="space-y-0">
          <div
            v-for="(log, i) in activityLog"
            :key="i"
            class="flex items-start gap-3 py-3"
            :class="{ 'border-b border-nm-border': i < activityLog.length - 1 }"
          >
            <div class="nm-activity-dot" :style="{ background: log.color }" />
            <div class="flex-1 min-w-0">
              <p class="text-sm font-body font-medium text-nm-text">{{ log.action }}</p>
              <p class="text-xs text-nm-muted font-body mt-0.5">{{ log.meta }}</p>
            </div>
            <p class="text-xs text-nm-muted font-body whitespace-nowrap flex-shrink-0">{{ log.time }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Saved toast -->
    <transition name="toast">
      <div v-if="saved" class="nm-toast">
        <CheckCircleIcon class="w-4 h-4" />
        {{ toastMsg }}
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  CameraIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  CheckIcon,
  CheckCircleIcon,
  ShieldCheckIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

/* ── State ──────────────────────────────────────────── */
const saved = ref(false)
const toastMsg = ref('')
const showCurrent = ref(false)
const showNew = ref(false)
const lastUpdated = ref('Mar 14, 2025')

const currentTime = new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' })

const profile = reactive({
  firstName: 'System',
  lastName: 'Admin',
  email: 'admin@nutrimatch.ph',
  phone: '9171234567',
  location: 'Davao City, Philippines',
  bio: 'Platform administrator for NutriMatch — managing RND verification, client oversight, and system operations.',
})

const originalProfile = { ...profile }

const passwords = reactive({ current: '', new: '', confirm: '' })

/* ── Password strength ──────────────────────────────── */
const passwordStrength = computed(() => {
  const p = passwords.new
  if (!p) return 0
  let score = 0
  if (p.length >= 8) score++
  if (p.length >= 12) score++
  if (/[A-Z]/.test(p) && /[0-9]/.test(p)) score++
  if (/[^A-Za-z0-9]/.test(p)) score++
  return score
})

const strengthLabel = computed(() => ['', 'Weak', 'Fair', 'Good', 'Strong'][passwordStrength.value])
const strengthColor = computed(() => [
  '', 'bg-red-400', 'bg-amber-400', 'bg-emerald-400', 'bg-nm-teal'
][passwordStrength.value])
const strengthTextColor = computed(() => [
  '', 'text-red-500', 'text-amber-500', 'text-emerald-600', 'text-nm-teal'
][passwordStrength.value])

/* ── Activity log ───────────────────────────────────── */
const activityLog = [
  { action: 'Approved RND verification for Ana Lim',       meta: 'PRC-RND-00551 · Cardiovascular Nutrition', time: '2h ago',  color: '#0d6b6b' },
  { action: 'Updated platform commission rate to 15%',     meta: 'Settings → Consultation Configuration',    time: '5h ago',  color: '#d97706' },
  { action: 'Flagged payment dispute for Client NM-00131', meta: 'Transaction ID: TXN-20250313-447',         time: '1d ago',  color: '#dc2626' },
  { action: 'Exported client report (March 2025)',         meta: '384 records · CSV format',                 time: '2d ago',  color: '#7c3aed' },
  { action: 'System backup completed',                     meta: 'Automated daily backup · 2.4 GB',          time: '3d ago',  color: '#059669' },
]

/* ── Actions ────────────────────────────────────────── */
function showToast(msg: string) {
  toastMsg.value = msg
  saved.value = true
  setTimeout(() => { saved.value = false }, 2600)
}

function saveProfile() {
  lastUpdated.value = 'Today'
  showToast('Profile updated successfully')
}

function resetProfile() {
  Object.assign(profile, originalProfile)
}

function changePassword() {
  if (!passwords.new || passwords.new !== passwords.confirm) return
  passwords.current = ''
  passwords.new = ''
  passwords.confirm = ''
  showToast('Password changed successfully')
}
</script>

<style scoped>
.nm-profile-avatar {
  width: 90px;
  height: 90px;
  border-radius: 22px;
  background: linear-gradient(135deg, var(--nm-teal-dark), var(--nm-teal));
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-family: 'Playfair Display', serif;
  font-size: 1.8rem;
  font-weight: 700;
  box-shadow: 0 8px 24px rgba(8,53,52,0.22);
}

.nm-avatar-upload-btn {
  position: absolute;
  bottom: -6px;
  right: -6px;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  background: var(--nm-amber);
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #fff;
  cursor: pointer;
  opacity: 0;
  transition: opacity 0.2s;
}

.nm-section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--nm-text);
}

.nm-profile-quick-stat {
  background: var(--nm-cream);
  border-radius: 10px;
  padding: 0.75rem;
  text-align: center;
}
.nm-profile-quick-val {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--nm-teal);
  line-height: 1.2;
}
.nm-profile-quick-lbl {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.65rem;
  color: var(--nm-text-muted);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-top: 0.1rem;
}

.nm-activity-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 6px;
}

.nm-btn-danger-ghost {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: transparent;
  color: #dc2626;
  border: 1.5px solid #fca5a5;
  border-radius: 8px;
  padding: 0.55rem 1rem;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.82rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.18s ease;
}
.nm-btn-danger-ghost:hover { background: #fef2f2; border-color: #f87171; }

.nm-toast {
  position: fixed;
  bottom: 2rem;
  right: 2.5rem;
  display: flex;
  align-items: center;
  gap: 0.6rem;
  background: var(--nm-teal-dark);
  color: #fff;
  padding: 0.75rem 1.25rem;
  border-radius: 12px;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  box-shadow: 0 8px 24px rgba(8,53,52,0.25);
  z-index: 999;
}

.toast-enter-active { transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1); }
.toast-leave-active { transition: all 0.2s ease; }
.toast-enter-from   { opacity: 0; transform: translateY(20px) scale(0.92); }
.toast-leave-to     { opacity: 0; transform: translateY(10px); }
</style>

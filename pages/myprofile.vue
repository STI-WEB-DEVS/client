<template>
  <NuxtLayout>
    <div class="profile-page">

      <!-- ── HERO BANNER ── -->
      <div class="profile-banner">
        <div class="banner-overlay"></div>
        <div class="banner-content">
          <div class="avatar-wrap">
            <img :src="profile.avatar" :alt="profile.name" class="profile-avatar" />
            <label class="avatar-edit-btn" title="Change photo">
              <CameraIcon class="size-4" />
              <input type="file" class="hidden" accept="image/*" @change="handleAvatarChange" />
            </label>
          </div>
          <div class="banner-info">
            <h1 class="banner-name">{{ profile.name }}</h1>
            <p class="banner-role">{{ profile.role }}</p>
            <div class="banner-badges">
              <span class="b-badge">
                <MapPinIcon class="size-3" /> {{ profile.location }}
              </span>
              <span class="b-badge">
                <CalendarIcon class="size-3" /> Since {{ profile.memberSince }}
              </span>
              <span class="b-badge active">
                <div class="active-dot"></div> Active
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- ── TABS ── -->
      <div class="profile-tabs">
        <button
          v-for="tab in tabs"
          :key="tab.key"
          :class="['tab-btn', activeTab === tab.key ? 'active' : '']"
          @click="activeTab = tab.key"
        >
          <component :is="tab.icon" class="size-4" />
          {{ tab.label }}
        </button>
      </div>

      <!-- ══════════════════════════════ -->
      <!--   TAB: PERSONAL INFO          -->
      <!-- ══════════════════════════════ -->
      <div v-if="activeTab === 'info'" class="tab-content">
        <div class="two-col">

          <!-- Left: Edit form -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Personal Information</h2>
              <button v-if="!editingInfo" class="btn-outline-sm" @click="editingInfo = true">
                <PencilSquareIcon class="size-4" /> Edit
              </button>
              <div v-else class="flex gap-2">
                <button class="btn-ghost-sm" @click="cancelEdit">Cancel</button>
                <button class="btn-gold-sm" @click="saveInfo">Save</button>
              </div>
            </div>

            <div class="form-grid">
              <div class="form-group">
                <label>First Name</label>
                <input v-model="form.firstName" :disabled="!editingInfo" type="text" />
              </div>
              <div class="form-group">
                <label>Last Name</label>
                <input v-model="form.lastName" :disabled="!editingInfo" type="text" />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input v-model="form.email" :disabled="!editingInfo" type="email" />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input v-model="form.phone" :disabled="!editingInfo" type="text" />
              </div>
              <div class="form-group">
                <label>Role / Position</label>
                <input v-model="form.role" :disabled="!editingInfo" type="text" />
              </div>
              <div class="form-group">
                <label>Location</label>
                <input v-model="form.location" :disabled="!editingInfo" type="text" />
              </div>
              <div class="form-group form-full">
                <label>Bio</label>
                <textarea v-model="form.bio" :disabled="!editingInfo" rows="3" />
              </div>
            </div>
          </div>

          <!-- Right: Stats + Quick Info -->
          <div class="right-col">

            <!-- Activity Stats -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">Activity Overview</h2>
              </div>
              <div class="activity-grid">
                <div v-for="stat in activityStats" :key="stat.label" class="act-stat">
                  <div class="act-icon-wrap" :style="{ background: stat.bg }">
                    <component :is="stat.icon" class="size-4" :style="{ color: stat.color }" />
                  </div>
                  <p class="act-val">{{ stat.value }}</p>
                  <p class="act-label">{{ stat.label }}</p>
                </div>
              </div>
            </div>

            <!-- Account Details -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">Account Details</h2>
              </div>
              <ul class="detail-list">
                <li class="detail-item">
                  <span class="detail-label">Member Since</span>
                  <span class="detail-val">{{ profile.memberSince }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">Last Login</span>
                  <span class="detail-val">{{ profile.lastLogin }}</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">Account Status</span>
                  <span class="status-chip active">Active</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">Role</span>
                  <span class="status-chip admin">Admin</span>
                </li>
                <li class="detail-item">
                  <span class="detail-label">2FA</span>
                  <span class="status-chip" :class="profile.twoFA ? 'enabled' : 'disabled'">
                    {{ profile.twoFA ? 'Enabled' : 'Disabled' }}
                  </span>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <!-- ══════════════════════════════ -->
      <!--   TAB: SECURITY               -->
      <!-- ══════════════════════════════ -->
      <div v-if="activeTab === 'security'" class="tab-content">
        <div class="two-col">

          <!-- Change Password -->
          <div class="card">
            <div class="card-header">
              <h2 class="card-title">Change Password</h2>
            </div>
            <div class="form-grid">
              <div class="form-group form-full">
                <label>Current Password</label>
                <div class="pw-wrap">
                  <input
                    v-model="pwForm.current"
                    :type="showPw.current ? 'text' : 'password'"
                    placeholder="Enter current password"
                  />
                  <button class="pw-toggle" @click="showPw.current = !showPw.current">
                    <component :is="showPw.current ? EyeSlashIcon : EyeIcon" class="size-4" />
                  </button>
                </div>
              </div>
              <div class="form-group form-full">
                <label>New Password</label>
                <div class="pw-wrap">
                  <input
                    v-model="pwForm.newPw"
                    :type="showPw.newPw ? 'text' : 'password'"
                    placeholder="Enter new password"
                  />
                  <button class="pw-toggle" @click="showPw.newPw = !showPw.newPw">
                    <component :is="showPw.newPw ? EyeSlashIcon : EyeIcon" class="size-4" />
                  </button>
                </div>
                <!-- Strength bar -->
                <div class="pw-strength" v-if="pwForm.newPw">
                  <div class="pw-strength-bar">
                    <div class="pw-strength-fill" :style="{ width: pwStrength.pct + '%', background: pwStrength.color }"></div>
                  </div>
                  <span class="pw-strength-label" :style="{ color: pwStrength.color }">{{ pwStrength.label }}</span>
                </div>
              </div>
              <div class="form-group form-full">
                <label>Confirm New Password</label>
                <div class="pw-wrap">
                  <input
                    v-model="pwForm.confirm"
                    :type="showPw.confirm ? 'text' : 'password'"
                    placeholder="Confirm new password"
                  />
                  <button class="pw-toggle" @click="showPw.confirm = !showPw.confirm">
                    <component :is="showPw.confirm ? EyeSlashIcon : EyeIcon" class="size-4" />
                  </button>
                </div>
                <p v-if="pwForm.confirm && pwForm.newPw !== pwForm.confirm" class="pw-mismatch">
                  Passwords do not match.
                </p>
              </div>
            </div>
            <div class="card-footer">
              <button class="btn-gold" @click="changePassword">Update Password</button>
            </div>
          </div>

          <!-- Right: 2FA + Sessions -->
          <div class="right-col">

            <!-- Two-Factor Auth -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">Two-Factor Auth</h2>
                <div class="toggle-switch" :class="{ on: profile.twoFA }" @click="profile.twoFA = !profile.twoFA">
                  <div class="toggle-thumb"></div>
                </div>
              </div>
              <p class="card-desc">
                Add an extra layer of security to your account by enabling two-factor authentication via your mobile app.
              </p>
              <div class="twofa-status" :class="profile.twoFA ? 'enabled' : 'disabled'">
                <component :is="profile.twoFA ? ShieldCheckIcon : ShieldExclamationIcon" class="size-5" />
                <span>2FA is currently <strong>{{ profile.twoFA ? 'enabled' : 'disabled' }}</strong></span>
              </div>
            </div>

            <!-- Active Sessions -->
            <div class="card">
              <div class="card-header">
                <h2 class="card-title">Active Sessions</h2>
              </div>
              <ul class="session-list">
                <li v-for="session in sessions" :key="session.id" class="session-item">
                  <div class="session-icon">
                    <component :is="session.device === 'Desktop' ? ComputerDesktopIcon : DevicePhoneMobileIcon" class="size-5" />
                  </div>
                  <div class="session-info">
                    <p class="session-device">{{ session.device }} — {{ session.browser }}</p>
                    <p class="session-meta">{{ session.location }} · {{ session.time }}</p>
                  </div>
                  <span v-if="session.current" class="session-current">Current</span>
                  <button v-else class="session-revoke" @click="revokeSession(session.id)">Revoke</button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </div>

      <!-- ══════════════════════════════ -->
      <!--   TAB: NOTIFICATIONS          -->
      <!-- ══════════════════════════════ -->
      <div v-if="activeTab === 'notifications'" class="tab-content">
        <div class="card notif-card">
          <div class="card-header">
            <h2 class="card-title">Notification Preferences</h2>
            <button class="btn-gold-sm" @click="saveNotifications">Save Changes</button>
          </div>

          <div class="notif-sections">
            <div v-for="section in notifSections" :key="section.title" class="notif-section">
              <h3 class="notif-section-title">{{ section.title }}</h3>
              <p class="notif-section-desc">{{ section.desc }}</p>
              <ul class="notif-list">
                <li v-for="item in section.items" :key="item.key" class="notif-item">
                  <div class="notif-text">
                    <p class="notif-label">{{ item.label }}</p>
                    <p class="notif-sub">{{ item.sub }}</p>
                  </div>
                  <div class="notif-channels">
                    <label v-for="ch in ['email','sms','push']" :key="ch" class="ch-label" :title="ch">
                      <input type="checkbox" v-model="notifPrefs[item.key][ch]" />
                      <span class="ch-box">{{ ch === 'email' ? '✉' : ch === 'sms' ? '📱' : '🔔' }}</span>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <!-- ══════════════════════════════ -->
      <!--   TAB: APPEARANCE             -->
      <!-- ══════════════════════════════ -->
      <div v-if="activeTab === 'appearance'" class="tab-content">
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Appearance & Display</h2>
            <button class="btn-gold-sm" @click="saveAppearance">Save</button>
          </div>

          <div class="appear-sections">

            <!-- Theme -->
            <div class="appear-section">
              <h3 class="appear-section-title">Theme</h3>
              <div class="theme-options">
                <div
                  v-for="t in themes"
                  :key="t.key"
                  :class="['theme-card', appearance.theme === t.key ? 'active' : '']"
                  @click="appearance.theme = t.key"
                >
                  <div class="theme-preview" :style="{ background: t.bg }">
                    <div class="theme-sidebar" :style="{ background: t.sidebar }"></div>
                    <div class="theme-main">
                      <div class="theme-topbar" :style="{ background: t.topbar }"></div>
                      <div class="theme-content">
                        <div class="theme-block" :style="{ background: t.card }"></div>
                        <div class="theme-block" :style="{ background: t.card }"></div>
                      </div>
                    </div>
                  </div>
                  <p class="theme-label">{{ t.label }}</p>
                  <div v-if="appearance.theme === t.key" class="theme-check">✓</div>
                </div>
              </div>
            </div>

            <!-- Language & Timezone -->
            <div class="appear-section">
              <h3 class="appear-section-title">Language & Region</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label>Language</label>
                  <select v-model="appearance.language">
                    <option value="en">English</option>
                    <option value="fil">Filipino</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Timezone</label>
                  <select v-model="appearance.timezone">
                    <option value="Asia/Manila">Asia/Manila (GMT+8)</option>
                    <option value="UTC">UTC</option>
                    <option value="America/New_York">US Eastern</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Date Format</label>
                  <select v-model="appearance.dateFormat">
                    <option value="MMM DD, YYYY">Mar 15, 2026</option>
                    <option value="DD/MM/YYYY">15/03/2026</option>
                    <option value="YYYY-MM-DD">2026-03-15</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Currency</label>
                  <select v-model="appearance.currency">
                    <option value="PHP">Philippine Peso (₱)</option>
                    <option value="USD">US Dollar ($)</option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- ── SAVE TOAST ── -->
    <Transition name="toast">
      <div v-if="showToast" class="toast">
        <CheckCircleIcon class="size-5 toast-icon" />
        {{ toastMsg }}
      </div>
    </Transition>

  </NuxtLayout>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import {
  PencilSquareIcon, CameraIcon, MapPinIcon,
  CalendarIcon, BellIcon, ShieldCheckIcon,
  ShieldExclamationIcon, EyeIcon, EyeSlashIcon,
  ComputerDesktopIcon, DevicePhoneMobileIcon,
  UserIcon, LockClosedIcon, Cog6ToothIcon,
  CheckCircleIcon, BanknotesIcon, UsersIcon, SparklesIcon,
} from '@heroicons/vue/24/outline'

// ── TABS ──
const activeTab = ref('info')
const tabs = [
  { key: 'info',          label: 'Personal Info',   icon: UserIcon },
  { key: 'security',      label: 'Security',         icon: LockClosedIcon },
  { key: 'notifications', label: 'Notifications',    icon: BellIcon },
  { key: 'appearance',    label: 'Appearance',       icon: Cog6ToothIcon },
]

// ── PROFILE ──
const profile = reactive({
  name:        'Nicolaii Gwapa',
  role:        'Spa Manager',
  avatar:      '/Nicolaii-gwapa.jpg',
  location:    'Davao City, Philippines',
  memberSince: 'Jan 2023',
  lastLogin:   'Mar 15, 2026 — 9:42 AM',
  twoFA:       true,
})

// ── PERSONAL INFO FORM ──
const editingInfo = ref(false)
const form = reactive({
  firstName:  'Nicole',
  lastName:   'Santos',
  email:      'nicole@servora.com',
  phone:      '0917-999-8888',
  role:       'Spa Manager',
  location:   'Davao City, Philippines',
  bio:        'Passionate spa manager with over 5 years of experience in wellness and hospitality. Dedicated to delivering exceptional client experiences at Servora.',
})
const formBackup = { ...form }

function cancelEdit() {
  Object.assign(form, formBackup)
  editingInfo.value = false
}
function saveInfo() {
  profile.name     = `${form.firstName} ${form.lastName}`
  profile.role     = form.role
  profile.location = form.location
  editingInfo.value = false
  showToastMsg('Profile updated successfully!')
}

function handleAvatarChange(e) {
  const file = e.target.files[0]
  if (!file) return
  profile.avatar = URL.createObjectURL(file)
}

// ── ACTIVITY STATS ──
const activityStats = [
  { label: 'Appointments',  value: '134',    icon: CalendarIcon,  bg: 'rgba(201,169,110,0.1)', color: '#c9a96e' },
  { label: 'Clients',       value: '1,284',  icon: UsersIcon,     bg: 'rgba(106,155,103,0.1)', color: '#6a9b67' },
  { label: 'Revenue',       value: '₱86.4k', icon: BanknotesIcon, bg: 'rgba(122,143,166,0.1)', color: '#7a8fa6' },
  { label: 'Services',      value: '10',     icon: SparklesIcon,  bg: 'rgba(192,114,90,0.1)',  color: '#c0725a' },
]

// ── SECURITY ──
const pwForm  = reactive({ current: '', newPw: '', confirm: '' })
const showPw  = reactive({ current: false, newPw: false, confirm: false })

const pwStrength = computed(() => {
  const pw = pwForm.newPw
  if (!pw) return { pct: 0, label: '', color: '' }
  let score = 0
  if (pw.length >= 8)           score++
  if (/[A-Z]/.test(pw))         score++
  if (/[0-9]/.test(pw))         score++
  if (/[^A-Za-z0-9]/.test(pw))  score++
  const map = [
    { pct: 20,  label: 'Very Weak',  color: '#c0725a' },
    { pct: 40,  label: 'Weak',       color: '#e2a85a' },
    { pct: 65,  label: 'Fair',       color: '#e2c99a' },
    { pct: 85,  label: 'Strong',     color: '#6a9b67' },
    { pct: 100, label: 'Very Strong',color: '#4a8a47' },
  ]
  return map[score] || map[0]
})

function changePassword() {
  if (!pwForm.current || !pwForm.newPw || !pwForm.confirm) return
  if (pwForm.newPw !== pwForm.confirm) return
  pwForm.current = ''; pwForm.newPw = ''; pwForm.confirm = ''
  showToastMsg('Password changed successfully!')
}

// ── SESSIONS ──
const sessions = ref([
  { id:1, device:'Desktop', browser:'Chrome 122',      location:'Davao City, PH', time:'Now',           current: true  },
  { id:2, device:'Mobile',  browser:'Safari iOS 17',   location:'Davao City, PH', time:'2 hours ago',   current: false },
  { id:3, device:'Desktop', browser:'Firefox 123',     location:'Manila, PH',     time:'Yesterday',     current: false },
])
function revokeSession(id) {
  sessions.value = sessions.value.filter(s => s.id !== id)
  showToastMsg('Session revoked.')
}

// ── NOTIFICATIONS ──
const notifSections = [
  {
    title: 'Appointments',
    desc:  'Get notified about booking activity.',
    items: [
      { key: 'new_appt',     label: 'New Appointment',      sub: 'When a new appointment is booked' },
      { key: 'appt_remind',  label: 'Appointment Reminder', sub: '1 hour before an appointment starts' },
      { key: 'appt_cancel',  label: 'Cancellation',         sub: 'When an appointment is cancelled' },
    ]
  },
  {
    title: 'Clients',
    desc:  'Stay updated on client activity.',
    items: [
      { key: 'new_client',   label: 'New Client',    sub: 'When a new client registers' },
      { key: 'client_bday',  label: 'Client Birthday', sub: 'On a client\'s birthday' },
    ]
  },
  {
    title: 'Reports & Finance',
    desc:  'Financial and performance updates.',
    items: [
      { key: 'daily_report', label: 'Daily Summary',    sub: 'End-of-day revenue summary' },
      { key: 'weekly_report',label: 'Weekly Report',    sub: 'Every Monday morning' },
    ]
  },
]

const notifPrefs = reactive({
  new_appt:     { email: true,  sms: true,  push: true  },
  appt_remind:  { email: true,  sms: true,  push: true  },
  appt_cancel:  { email: true,  sms: false, push: true  },
  new_client:   { email: true,  sms: false, push: false },
  client_bday:  { email: true,  sms: false, push: false },
  daily_report: { email: true,  sms: false, push: false },
  weekly_report:{ email: true,  sms: false, push: false },
})

function saveNotifications() { showToastMsg('Notification preferences saved!') }

// ── APPEARANCE ──
const appearance = reactive({
  theme:      'light',
  language:   'en',
  timezone:   'Asia/Manila',
  dateFormat: 'MMM DD, YYYY',
  currency:   'PHP',
})

const themes = [
  { key:'light', label:'Light',   bg:'#f7f4ef', sidebar:'#1a1a14', topbar:'#ffffff', card:'#f0ece3' },
  { key:'dark',  label:'Dark',    bg:'#1a1a14', sidebar:'#111110', topbar:'#22221a', card:'#2a2a20' },
  { key:'warm',  label:'Warm',    bg:'#fdf5e8', sidebar:'#3a2e1a', topbar:'#fffbf2', card:'#f5ece0' },
]

function saveAppearance() { showToastMsg('Appearance settings saved!') }

// ── TOAST ──
const showToast = ref(false)
const toastMsg  = ref('')
function showToastMsg(msg) {
  toastMsg.value  = msg
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 3000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.profile-page { font-family: 'Jost', sans-serif; padding-bottom: 3rem; }

/* ── BANNER ── */
.profile-banner {
  position: relative; border-radius: 12px; overflow: hidden;
  margin-bottom: 0;
  background: linear-gradient(135deg, #1a1a14 0%, #3a2e1a 50%, #1a1a14 100%);
  border: 1px solid rgba(201,169,110,0.2);
}
.banner-overlay {
  position: absolute; inset: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23c9a96e' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
.banner-content {
  position: relative; z-index: 1;
  display: flex; align-items: flex-end; gap: 1.5rem;
  padding: 2rem 2rem 1.6rem;
  flex-wrap: wrap;
}
.avatar-wrap { position: relative; flex-shrink: 0; }
.profile-avatar {
  width: 88px; height: 88px; border-radius: 50%;
  object-fit: cover; border: 3px solid rgba(201,169,110,0.5);
  box-shadow: 0 4px 20px rgba(0,0,0,0.3);
}
.avatar-edit-btn {
  position: absolute; bottom: 0; right: 0;
  width: 28px; height: 28px; border-radius: 50%;
  background: #c9a96e; color: #1a1a14;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border: 2px solid #1a1a14;
  transition: background 0.2s;
}
.avatar-edit-btn:hover { background: #e2c99a; }
.banner-info { flex: 1; }
.banner-name { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: #fff; letter-spacing: 0.04em; line-height: 1; }
.banner-role { font-size: 0.72rem; color: #c9a96e; letter-spacing: 0.2em; text-transform: uppercase; margin: 0.3rem 0 0.75rem; }
.banner-badges { display: flex; gap: 0.6rem; flex-wrap: wrap; }
.b-badge {
  display: inline-flex; align-items: center; gap: 0.3rem;
  font-size: 0.65rem; color: rgba(255,255,255,0.55);
  background: rgba(255,255,255,0.07); padding: 0.25rem 0.6rem;
  border-radius: 999px; letter-spacing: 0.04em;
  border: 1px solid rgba(255,255,255,0.1);
}
.b-badge.active { color: #6a9b67; background: rgba(106,155,103,0.15); border-color: rgba(106,155,103,0.3); }
.active-dot { width: 6px; height: 6px; border-radius: 50%; background: #6a9b67; }

/* ── TABS ── */
.profile-tabs {
  display: flex; gap: 0; margin: 1.5rem 0 1.25rem;
  background: #fff; border-radius: 8px; padding: 0.3rem;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 12px rgba(26,26,20,0.04);
  flex-wrap: wrap;
}
.tab-btn {
  display: flex; align-items: center; gap: 0.5rem;
  flex: 1; justify-content: center;
  padding: 0.6rem 1rem; border-radius: 6px;
  font-family: 'Jost', sans-serif; font-size: 0.75rem;
  font-weight: 400; letter-spacing: 0.06em; text-transform: uppercase;
  border: none; background: none; color: #9ca3af; cursor: pointer;
  transition: all 0.2s; white-space: nowrap;
}
.tab-btn:hover { color: #1a1a14; }
.tab-btn.active { background: #c9a96e; color: #1a1a14; font-weight: 600; }

/* ── LAYOUT ── */
.tab-content { animation: fadeUp 0.2s ease; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.two-col { display: grid; grid-template-columns: 1fr 340px; gap: 1.25rem; }
.right-col { display: flex; flex-direction: column; gap: 1.25rem; }

/* ── CARD ── */
.card { background: #fff; border-radius: 10px; padding: 1.4rem; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 16px rgba(26,26,20,0.05); }
.card-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 1.25rem; flex-wrap: wrap; gap: 0.5rem; }
.card-title { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em; }
.card-desc { font-size: 0.8rem; color: #6b7280; line-height: 1.6; margin-bottom: 1rem; margin-top: -0.5rem; }
.card-footer { display: flex; justify-content: flex-end; padding-top: 1rem; border-top: 1px solid rgba(201,169,110,0.1); margin-top: 1rem; }

/* ── FORM ── */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-full  { grid-column: 1/-1; }
.form-group label { font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280; font-weight: 500; }
.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.65rem 0.85rem;
  border: 1px solid rgba(201,169,110,0.25); border-radius: 6px;
  font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14;
  background: #fff; outline: none; transition: border 0.2s; resize: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: #c9a96e; }
.form-group input:disabled,
.form-group textarea:disabled { background: #faf8f4; color: #6b7280; cursor: not-allowed; border-color: rgba(201,169,110,0.1); }

/* ── BUTTONS ── */
.btn-gold    { background: #c9a96e; color: #1a1a14; border: none; padding: 0.7rem 1.5rem; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s, transform 0.2s; }
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }
.btn-gold-sm { background: #c9a96e; color: #1a1a14; border: none; padding: 0.45rem 1rem; font-family: 'Jost', sans-serif; font-size: 0.68rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s; }
.btn-gold-sm:hover { background: #e2c99a; }
.btn-outline-sm { display: flex; align-items: center; gap: 0.35rem; background: none; border: 1px solid rgba(201,169,110,0.3); color: #a07830; padding: 0.45rem 0.85rem; font-family: 'Jost', sans-serif; font-size: 0.68rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: all 0.2s; }
.btn-outline-sm:hover { border-color: #c9a96e; background: rgba(201,169,110,0.08); }
.btn-ghost-sm { background: none; border: 1px solid rgba(26,26,20,0.12); color: #6b7280; padding: 0.45rem 0.85rem; font-family: 'Jost', sans-serif; font-size: 0.68rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: all 0.2s; }
.btn-ghost-sm:hover { border-color: #1a1a14; color: #1a1a14; }
.flex { display: flex; } .gap-2 { gap: 0.5rem; }

/* ── ACTIVITY STATS ── */
.activity-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; }
.act-stat { display: flex; flex-direction: column; align-items: center; gap: 0.4rem; padding: 0.85rem; background: #fdf8f0; border-radius: 8px; text-align: center; }
.act-icon-wrap { padding: 0.5rem; border-radius: 8px; }
.act-val   { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; line-height: 1; }
.act-label { font-size: 0.6rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; }

/* ── DETAIL LIST ── */
.detail-list { display: flex; flex-direction: column; gap: 0; }
.detail-item { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0; border-bottom: 1px solid #f9f5ef; }
.detail-item:last-child { border-bottom: none; }
.detail-label { font-size: 0.75rem; color: #6b7280; }
.detail-val   { font-size: 0.78rem; color: #1a1a14; font-weight: 500; }
.status-chip { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 999px; }
.status-chip.active  { background: rgba(106,155,103,0.15); color: #4a8a47; }
.status-chip.admin   { background: rgba(201,169,110,0.15); color: #a07830; }
.status-chip.enabled { background: rgba(106,155,103,0.15); color: #4a8a47; }
.status-chip.disabled{ background: rgba(156,163,175,0.2);  color: #6b7280; }

/* ── PASSWORD ── */
.pw-wrap { position: relative; }
.pw-wrap input { width: 100%; padding-right: 2.5rem; }
.pw-toggle { position: absolute; right: 0.75rem; top: 50%; transform: translateY(-50%); background: none; border: none; cursor: pointer; color: #9ca3af; display: flex; align-items: center; transition: color 0.2s; }
.pw-toggle:hover { color: #1a1a14; }
.pw-strength { display: flex; align-items: center; gap: 0.6rem; margin-top: 0.4rem; }
.pw-strength-bar   { flex: 1; height: 4px; background: rgba(201,169,110,0.1); border-radius: 99px; overflow: hidden; }
.pw-strength-fill  { height: 100%; border-radius: 99px; transition: width 0.4s, background 0.4s; }
.pw-strength-label { font-size: 0.65rem; font-weight: 600; width: 70px; }
.pw-mismatch { font-size: 0.68rem; color: #c0725a; margin-top: 0.3rem; }

/* ── 2FA TOGGLE ── */
.toggle-switch { width: 44px; height: 24px; border-radius: 999px; background: rgba(156,163,175,0.3); cursor: pointer; position: relative; transition: background 0.3s; flex-shrink: 0; }
.toggle-switch.on { background: #c9a96e; }
.toggle-thumb { position: absolute; top: 2px; left: 2px; width: 20px; height: 20px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); transition: transform 0.3s; }
.toggle-switch.on .toggle-thumb { transform: translateX(20px); }
.twofa-status { display: flex; align-items: center; gap: 0.75rem; padding: 0.85rem 1rem; border-radius: 8px; font-size: 0.82rem; margin-top: 0.5rem; }
.twofa-status.enabled  { background: rgba(106,155,103,0.1); color: #4a8a47; }
.twofa-status.disabled { background: rgba(192,114,90,0.1); color: #b05540; }
.twofa-status strong   { font-weight: 600; }

/* ── SESSIONS ── */
.session-list { display: flex; flex-direction: column; gap: 0; }
.session-item { display: flex; align-items: center; gap: 0.75rem; padding: 0.75rem 0; border-bottom: 1px solid #f9f5ef; }
.session-item:last-child { border-bottom: none; }
.session-icon { padding: 0.5rem; background: #fdf8f0; border-radius: 8px; color: #c9a96e; flex-shrink: 0; }
.session-info { flex: 1; }
.session-device { font-size: 0.8rem; font-weight: 500; color: #1a1a14; }
.session-meta   { font-size: 0.68rem; color: #9ca3af; margin-top: 1px; }
.session-current { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(106,155,103,0.15); color: #4a8a47; padding: 0.2rem 0.55rem; border-radius: 999px; }
.session-revoke  { font-size: 0.68rem; color: #b05540; background: rgba(192,114,90,0.1); border: none; padding: 0.3rem 0.65rem; border-radius: 4px; cursor: pointer; font-family: 'Jost', sans-serif; transition: background 0.15s; }
.session-revoke:hover { background: rgba(192,114,90,0.2); }

/* ── NOTIFICATIONS ── */
.notif-card { max-width: 800px; }
.notif-sections { display: flex; flex-direction: column; gap: 1.8rem; }
.notif-section { border-bottom: 1px solid rgba(201,169,110,0.1); padding-bottom: 1.5rem; }
.notif-section:last-child { border-bottom: none; padding-bottom: 0; }
.notif-section-title { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 400; color: #1a1a14; margin-bottom: 0.2rem; }
.notif-section-desc  { font-size: 0.72rem; color: #9ca3af; margin-bottom: 1rem; }
.notif-list { display: flex; flex-direction: column; gap: 0; }
.notif-item { display: flex; align-items: center; justify-content: space-between; padding: 0.75rem 0; border-bottom: 1px solid #f9f5ef; gap: 1rem; }
.notif-item:last-child { border-bottom: none; }
.notif-text  { flex: 1; }
.notif-label { font-size: 0.82rem; font-weight: 500; color: #1a1a14; }
.notif-sub   { font-size: 0.7rem; color: #9ca3af; margin-top: 1px; }
.notif-channels { display: flex; gap: 0.5rem; flex-shrink: 0; }
.ch-label { display: flex; flex-direction: column; align-items: center; gap: 0.25rem; cursor: pointer; }
.ch-label input { display: none; }
.ch-box { font-size: 1rem; opacity: 0.3; transition: opacity 0.2s; }
.ch-label input:checked + .ch-box { opacity: 1; }

/* ── APPEARANCE ── */
.appear-sections { display: flex; flex-direction: column; gap: 2rem; }
.appear-section  { border-bottom: 1px solid rgba(201,169,110,0.1); padding-bottom: 2rem; }
.appear-section:last-child { border-bottom: none; padding-bottom: 0; }
.appear-section-title { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 400; color: #1a1a14; margin-bottom: 1rem; }
.theme-options { display: flex; gap: 1rem; flex-wrap: wrap; }
.theme-card { cursor: pointer; position: relative; }
.theme-preview { width: 120px; height: 80px; border-radius: 8px; overflow: hidden; display: flex; border: 2px solid transparent; transition: border-color 0.2s; }
.theme-card.active .theme-preview { border-color: #c9a96e; }
.theme-sidebar  { width: 28px; height: 100%; flex-shrink: 0; }
.theme-main     { flex: 1; display: flex; flex-direction: column; }
.theme-topbar   { height: 18px; width: 100%; }
.theme-content  { flex: 1; padding: 4px; display: flex; flex-direction: column; gap: 3px; }
.theme-block    { height: 12px; border-radius: 3px; }
.theme-label    { font-size: 0.7rem; color: #6b7280; text-align: center; margin-top: 0.5rem; letter-spacing: 0.06em; }
.theme-check    { position: absolute; top: 4px; right: 4px; width: 18px; height: 18px; border-radius: 50%; background: #c9a96e; color: #1a1a14; font-size: 0.65rem; font-weight: 700; display: flex; align-items: center; justify-content: center; }

/* ── TOAST ── */
.toast {
  position: fixed; bottom: 2rem; right: 2rem; z-index: 999;
  background: #1a1a14; color: #fff;
  padding: 0.85rem 1.25rem; border-radius: 8px;
  display: flex; align-items: center; gap: 0.6rem;
  font-size: 0.82rem; box-shadow: 0 8px 32px rgba(26,26,20,0.25);
  border: 1px solid rgba(201,169,110,0.2);
}
.toast-icon { color: #c9a96e; flex-shrink: 0; }
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s, transform 0.3s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }

/* ── HIDDEN ── */
.hidden { display: none; }

/* ── RESPONSIVE ── */
@media (max-width: 1024px) {
  .two-col { grid-template-columns: 1fr; }
}
@media (max-width: 640px) {
  .form-grid { grid-template-columns: 1fr; }
  .profile-tabs { gap: 0.25rem; }
  .tab-btn { font-size: 0.65rem; padding: 0.5rem 0.6rem; }
}
</style>
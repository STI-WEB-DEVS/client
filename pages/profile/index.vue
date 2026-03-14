<template>
  <NuxtLayout>
    <div class="wrap">

      <div class="mb-6">
        <h1 class="text-lg font-semibold text-gray-900">Profile</h1>
        <p class="mt-1 text-sm text-gray-400">Manage your personal information and account details.</p>
      </div>

      <!-- Profile Hero Card -->
      <div class="card mb-4 overflow-hidden">
        <div class="hero-banner">
          <div class="hero-left">
            <div class="avatar">NL</div>
            <div>
              <p class="hero-name">Nicollette Libunao</p>
              <p class="hero-role">Project Lead · Full Stack Developer</p>
            </div>
          </div>
          <div class="badges">
            <span class="badge badge-green">Active</span>
            <span class="badge badge-gray">Administrator</span>
          </div>
        </div>
        <div class="hero-footer">
          <p class="hero-meta">System Architecture · AMUMA Healthcare Portal · Joined March 2025</p>
        </div>
      </div>

      <!-- Personal Information -->
      <div class="card mb-4">
        <div class="sec-head">
          <p class="sec-title">Personal Information</p>
          <button class="edit-btn" :class="{ cancel: editMode }" @click="editMode = !editMode">
            {{ editMode ? 'Cancel' : 'Edit' }}
          </button>
        </div>

        <div class="form-grid">
          <div class="field" v-for="f in fields" :key="f.key">
            <label>{{ f.label }}</label>
            <input
              :type="f.type || 'text'"
              :value="getField(f.key)"
              @input="setField(f.key, ($event.target as HTMLInputElement).value)"
              :disabled="!editMode"
              :class="editMode ? 'edit-mode' : 'view-mode'"
            />
          </div>
        </div>

        <div v-if="editMode" class="form-actions">
          <button class="btn-cancel" @click="editMode = false">Cancel</button>
          <button class="btn-save" @click="saveProfile">Save changes</button>
        </div>

        <transition
          enter-active-class="transition ease-out duration-300"
          enter-from-class="opacity-0 translate-y-1"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition ease-in duration-150"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div v-if="saved" class="success-msg">
            <p>Profile updated successfully.</p>
          </div>
        </transition>
      </div>

      <!-- Recent Activity -->
      <div class="card mb-4">
        <div class="sec-head">
          <p class="sec-title">Recent Activity</p>
        </div>
        <ul>
          <li v-for="activity in recentActivity" :key="activity.id" class="act-item">
            <span class="dot" :class="activity.color"></span>
            <div class="act-body">
              <p class="act-action">{{ activity.action }}</p>
              <p class="act-detail">{{ activity.detail }}</p>
            </div>
            <span class="act-time">{{ activity.time }}</span>
          </li>
        </ul>
      </div>

      <!-- Sign Out -->
      <div class="card">
        <div class="signout-row">
          <div>
            <p class="so-label">Sign out</p>
            <p class="so-sub">You will be redirected to the login page.</p>
          </div>
          <NuxtLink to="/" class="btn-so">Sign out</NuxtLink>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

type ProfileKey = 'name' | 'email' | 'role' | 'department' | 'phone' | 'location'

const editMode = ref(false)
const saved = ref(false)

const profile = ref<Record<ProfileKey, string>>({
  name: 'Nicollette Libunao',
  email: 'nicollette@amuma.health',
  role: 'Project Lead & Full Stack Developer',
  department: 'System Architecture',
  phone: '+63 912 345 6789',
  location: 'Manila, Philippines',
})

// ✅ Typed helpers — no implicit any
const getField = (key: ProfileKey): string => profile.value[key]
const setField = (key: ProfileKey, value: string): void => { profile.value[key] = value }

const fields: { key: ProfileKey; label: string; type?: string }[] = [
  { key: 'name',       label: 'Full Name' },
  { key: 'email',      label: 'Email Address', type: 'email' },
  { key: 'role',       label: 'Role' },
  { key: 'department', label: 'Department' },
  { key: 'phone',      label: 'Phone Number' },
  { key: 'location',   label: 'Location' },
]

const recentActivity = [
  { id: 1, action: 'Logged in to AMUMA Portal',   detail: 'Successful login from Chrome',            time: 'Today, 8:00 AM',     color: 'blue' },
  { id: 2, action: 'Added new patient record',    detail: 'Remedios Santos — General Checkup',       time: 'Today, 8:15 AM',     color: 'blue' },
  { id: 3, action: 'Scheduled appointment',       detail: 'Ernesto Dela Cruz — Cardiology',          time: 'Today, 9:00 AM',     color: 'blue' },
  { id: 4, action: 'Updated system settings',     detail: 'Changed appointment duration to 30 mins', time: 'Yesterday, 3:00 PM', color: 'gray' },
  { id: 5, action: 'Viewed team page',            detail: 'Reviewed care team roster',               time: 'Yesterday, 2:00 PM', color: 'gray' },
]

const saveProfile = () => {
  editMode.value = false
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}
</script>

<style scoped>
.wrap { max-width: 720px; margin: 0 auto; }

.card { background: #ffffff; border-radius: 16px; border: 1px solid #e8ecf1; overflow: hidden; }

.hero-banner {
  background: #0f1f35;
  padding: 24px 24px 28px;
  display: flex; align-items: center; justify-content: space-between;
  flex-wrap: wrap; gap: 12px;
}
.hero-left { display: flex; align-items: center; gap: 14px; }
.avatar {
  width: 52px; height: 52px; border-radius: 13px;
  background: #1e3a8a; color: #ffffff;
  font-size: 13px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  border: 2.5px solid rgba(255,255,255,0.2);
  letter-spacing: 0.05em; flex-shrink: 0;
}
.hero-name { font-size: 15px; font-weight: 600; color: #ffffff; }
.hero-role { font-size: 12px; color: #93c5fd; margin-top: 3px; }
.badges { display: flex; gap: 6px; }
.badge { padding: 4px 11px; border-radius: 20px; font-size: 11px; font-weight: 500; }
.badge-green { background: rgba(74,222,128,0.15); color: #86efac; }
.badge-gray  { background: rgba(255,255,255,0.1); color: #cbd5e1; }
.hero-footer { padding: 14px 24px; border-bottom: 1px solid #f1f5f9; }
.hero-meta { font-size: 12px; color: #94a3b8; }

.sec-head {
  padding: 15px 24px; border-bottom: 1px solid #f1f5f9;
  display: flex; align-items: center; justify-content: space-between;
}
.sec-title { font-size: 13.5px; font-weight: 600; color: #0f172a; }
.edit-btn { font-size: 12px; font-weight: 500; color: #3b82f6; background: none; border: none; cursor: pointer; padding: 5px 10px; border-radius: 8px; transition: background 0.15s; }
.edit-btn:hover { background: #eff6ff; }
.edit-btn.cancel { color: #64748b; }
.edit-btn.cancel:hover { background: #f1f5f9; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; padding: 20px 24px; }
.field label { display: block; font-size: 10.5px; font-weight: 600; color: #94a3b8; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 6px; }
.field input { width: 100%; padding: 10px 14px; border-radius: 10px; font-size: 13.5px; font-family: inherit; outline: none; transition: all 0.15s; }
.view-mode { border: 1.5px solid transparent; background: #f8fafc; color: #334155; cursor: default; }
.edit-mode { border: 1.5px solid #e2e8f0; background: #ffffff; color: #1e293b; }
.edit-mode:focus { border-color: #93c5fd; }

.form-actions { display: flex; justify-content: flex-end; gap: 8px; padding: 0 24px 20px; }
.btn-cancel { padding: 9px 18px; border-radius: 10px; border: 1px solid #e2e8f0; background: #ffffff; font-size: 13px; font-weight: 500; color: #64748b; cursor: pointer; }
.btn-cancel:hover { background: #f8fafc; }
.btn-save { padding: 9px 20px; border-radius: 10px; border: none; background: #0f1f35; font-size: 13px; font-weight: 500; color: #ffffff; cursor: pointer; }
.btn-save:hover { opacity: 0.85; }

.success-msg { margin: 0 24px 18px; padding: 11px 16px; border-radius: 10px; background: #f0fdf4; border: 1px solid #bbf7d0; }
.success-msg p { font-size: 13px; font-weight: 500; color: #15803d; }

.act-item { display: flex; align-items: center; justify-content: space-between; padding: 13px 24px; border-bottom: 1px solid #f8fafc; }
.act-item:last-child { border-bottom: none; }
.dot { width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0; margin-right: 14px; }
.dot.blue { background: #bfdbfe; }
.dot.gray { background: #e2e8f0; }
.act-body { flex: 1; }
.act-action { font-size: 13.5px; font-weight: 500; color: #1e293b; }
.act-detail { font-size: 12px; color: #94a3b8; margin-top: 1px; }
.act-time { font-size: 11.5px; color: #b0bec8; margin-left: 12px; white-space: nowrap; }

.signout-row { display: flex; align-items: center; justify-content: space-between; padding: 20px 24px; }
.so-label { font-size: 13.5px; font-weight: 500; color: #0f172a; }
.so-sub { font-size: 12px; color: #94a3b8; margin-top: 2px; }
.btn-so { padding: 9px 18px; border-radius: 10px; border: 1px solid #fecaca; background: #fff5f5; font-size: 13px; font-weight: 500; color: #dc2626; cursor: pointer; text-decoration: none; display: inline-block; }
.btn-so:hover { background: #fee2e2; }

@media (max-width: 640px) {
  .form-grid { grid-template-columns: 1fr; }
  .hero-banner { flex-direction: column; align-items: flex-start; }
}
</style>
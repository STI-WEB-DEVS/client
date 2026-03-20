<template>
  <NuxtLayout>
    <div class="profile-page">

      <!-- ── Page Header ── -->
      <div class="page-header">
        <div class="header-eyebrow">
          <span class="eyebrow-pip"></span>
          <span class="eyebrow-label">Blood Donation System</span>
        </div>
        <h1 class="page-title">User Profile</h1>
        <p class="page-sub">Manage your personal information and preferences</p>
      </div>

      <div class="profile-grid">

        <!-- ════════════════════════════
             LEFT — PROFILE CARD
        ════════════════════════════ -->
        <div class="profile-card">

          <!-- Banner -->
          <div class="profile-banner">
            <div class="banner-hb">
              <svg viewBox="0 0 320 44" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                <polyline
                  points="0,22 40,22 55,8 65,36 75,8 88,22 110,22 123,4 133,40 140,22 165,22 200,22 215,8 225,36 235,8 248,22 270,22 283,4 293,40 300,22 320,22"
                  fill="none" stroke="rgba(255,255,255,0.2)" stroke-width="1.5"
                />
              </svg>
            </div>
            <div class="banner-overlay"></div>
          </div>

          <!-- Avatar -->
          <div class="avatar-section">
            <div class="avatar-ring">
              <div class="profile-avatar">RA</div>
            </div>
            <button class="change-photo-btn">
              <svg viewBox="0 0 20 20" fill="none" style="width:12px;height:12px;">
                <path d="M13 3H7L5 6H2a1 1 0 00-1 1v9a1 1 0 001 1h16a1 1 0 001-1V7a1 1 0 00-1-1h-3L13 3z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                <circle cx="10" cy="11" r="2.5" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              Change Photo
            </button>
          </div>

          <!-- Name -->
          <div class="name-section">
            <h2 class="p-name">Rogelio Aca Jr.</h2>
            <span class="p-role-badge">Blood Bank Officer</span>
            <p class="p-org">LifeLink Blood Donation System</p>
          </div>

          <!-- Stats -->
          <div class="profile-stats">
            <div class="p-stat">
              <span class="p-stat-val">1,284</span>
              <span class="p-stat-label">Donors Managed</span>
            </div>
            <div class="stat-sep"></div>
            <div class="p-stat">
              <span class="p-stat-val">348</span>
              <span class="p-stat-label">Units Processed</span>
            </div>
            <div class="stat-sep"></div>
            <div class="p-stat">
              <span class="p-stat-val">47</span>
              <span class="p-stat-label">Alerts Sent</span>
            </div>
          </div>

          <!-- Badges -->
          <div class="badge-row">
            <div class="achievement-badge">
              <svg viewBox="0 0 20 20" fill="none" style="width:12px;height:12px;flex-shrink:0;">
                <path d="M10 2C10 2 3 7 3 12C3 15.3 6.1 18 10 18C13.9 18 17 15.3 17 12C17 7 10 2 10 2Z" fill="#fca5a5" fill-opacity="0.8"/>
              </svg>
              Top Officer
            </div>
            <div class="achievement-badge">
              <svg viewBox="0 0 20 20" fill="none" style="width:12px;height:12px;flex-shrink:0;">
                <path d="M10 2l2.4 4.9 5.4.8-3.9 3.8.9 5.3L10 14.3l-4.8 2.5.9-5.3L2.2 7.7l5.4-.8L10 2z" fill="#fcd34d" fill-opacity="0.9"/>
              </svg>
              2+ Years
            </div>
            <div class="achievement-badge">
              <svg viewBox="0 0 20 20" fill="none" style="width:12px;height:12px;flex-shrink:0;">
                <rect x="3" y="10" width="3" height="7" rx="1" fill="#86efac"/>
                <rect x="8.5" y="6" width="3" height="11" rx="1" fill="#86efac"/>
                <rect x="14" y="2" width="3" height="15" rx="1" fill="#86efac"/>
              </svg>
              Data Expert
            </div>
          </div>

          <!-- Activity indicator -->
          <div class="activity-strip">
            <span class="activity-dot"></span>
            <span class="activity-label">Active now</span>
            <span class="activity-since">· Member since Jan 2024</span>
          </div>

        </div>

        <!-- ════════════════════════════
             RIGHT — FORM CARD
        ════════════════════════════ -->
        <div class="form-card">

          <!-- Personal Info -->
          <div class="form-section">
            <div class="section-header">
              <div class="section-title-group">
                <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;color:rgba(220,38,38,0.6);">
                  <circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M3 17c0-3.3 3.1-6 7-6s7 2.7 7 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <h2 class="section-title">Personal Information</h2>
              </div>
              <button class="btn-edit" @click="editMode = !editMode">
                <svg v-if="!editMode" viewBox="0 0 20 20" fill="none" style="width:13px;height:13px;">
                  <path d="M13.5 3.5l3 3L7 16H4v-3L13.5 3.5z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <svg v-else viewBox="0 0 20 20" fill="none" style="width:13px;height:13px;">
                  <path d="M15 5L5 15M5 5l10 10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
                </svg>
                {{ editMode ? 'Cancel' : 'Edit Profile' }}
              </button>
            </div>

            <div class="form-grid">
              <div class="field" v-for="field in fields" :key="field.label">
                <label class="field-label">{{ field.label }}</label>
                <input
                  v-model="field.value"
                  :type="field.type ?? 'text'"
                  :disabled="!editMode"
                  :placeholder="field.placeholder"
                  class="field-input"
                  :class="editMode ? 'field-input--active' : ''"
                />
              </div>
            </div>

            <div v-if="editMode" class="form-actions">
              <button class="btn-cancel" @click="editMode = false">Discard</button>
              <button class="btn-save" @click="saveProfile">
                <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;">
                  <path d="M4 10l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                Save Changes
              </button>
            </div>
          </div>

          <!-- Divider -->
          <div class="card-divider"></div>

          <!-- Notification Preferences -->
          <div class="notif-section">
            <div class="section-title-group" style="margin-bottom:1.25rem;">
              <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;color:rgba(220,38,38,0.6);">
                <path d="M10 2a6 6 0 016 6c0 3.5 1 5 1 5H3s1-1.5 1-5a6 6 0 016-6zM8.5 17a1.5 1.5 0 003 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
              <h3 class="section-title">Notification Preferences</h3>
            </div>

            <div class="notif-list">
              <div v-for="n in notifPrefs" :key="n.label" class="notif-row">
                <div class="notif-icon-wrap" :class="n.enabled ? 'notif-icon--on' : ''">
                  <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;">
                    <path d="M10 2a6 6 0 016 6c0 3.5 1 5 1 5H3s1-1.5 1-5a6 6 0 016-6zM8.5 17a1.5 1.5 0 003 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                </div>
                <div class="notif-text">
                  <p class="notif-label">{{ n.label }}</p>
                  <p class="notif-desc">{{ n.desc }}</p>
                </div>
                <button
                  class="toggle-btn"
                  :class="n.enabled ? 'toggle-on' : ''"
                  @click="n.enabled = !n.enabled"
                  :aria-pressed="n.enabled"
                >
                  <span class="toggle-knob"></span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const editMode = ref(false)

const fields = reactive([
  { label: 'First Name',    value: 'Rogelio',              placeholder: 'Enter first name' },
  { label: 'Last Name',     value: 'Aca',                  placeholder: 'Enter last name' },
  { label: 'Email Address', value: 'admin@lifelink.ph',    placeholder: 'Enter email',       type: 'email' },
  { label: 'Phone Number',  value: '+63 912 345 6789',     placeholder: 'Enter phone number' },
  { label: 'Position / Role', value: 'Blood Bank Officer', placeholder: 'Enter your role' },
  { label: 'Department',    value: 'Operations & Inventory', placeholder: 'Enter department' },
  { label: 'Employee ID',   value: 'LL-2024-001',          placeholder: 'Enter employee ID' },
  { label: 'Date Joined',   value: '2024-01-15',           placeholder: 'Date joined',       type: 'date' },
])

const notifPrefs = reactive([
  { label: 'Email Alerts',           desc: 'Receive emergency alerts via email',                   enabled: true  },
  { label: 'SMS Notifications',      desc: 'Get SMS for critical blood requests',                  enabled: true  },
  { label: 'Low Stock Warnings',     desc: 'Alert when blood type stock drops below minimum',      enabled: true  },
  { label: 'Donation Confirmations', desc: 'Notify when a donation is verified',                   enabled: false },
])

const saveProfile = () => {
  editMode.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Root ── */
.profile-page {
  max-width: 1140px;
  font-family: 'DM Sans', sans-serif;
}

/* ── Page Header ── */
.page-header { margin-bottom: 2rem; }

.header-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.eyebrow-pip {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #dc2626;
  box-shadow: 0 0 8px rgba(220,38,38,0.8);
}
.eyebrow-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.28);
  font-weight: 600;
}
.page-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.page-sub {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.32);
  margin: 0.35rem 0 0;
}

/* ── Grid ── */
.profile-grid {
  display: grid;
  grid-template-columns: 292px 1fr;
  gap: 1.25rem;
  align-items: start;
}
@media (max-width: 900px) {
  .profile-grid { grid-template-columns: 1fr; }
}

/* ════════════════════════════
   PROFILE CARD
════════════════════════════ */
.profile-card {
  background: #110202;
  border: 1px solid rgba(220,38,38,0.16);
  border-radius: 20px;
  overflow: hidden;
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
}

/* Banner */
.profile-banner {
  height: 90px;
  background: linear-gradient(135deg, #7f1d1d 0%, #dc2626 50%, #991b1b 100%);
  position: relative;
  overflow: hidden;
}
.banner-hb {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
}
.banner-hb svg { width: 100%; height: 44px; }
.banner-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, transparent 40%, rgba(17,2,2,0.6));
}

/* Avatar */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  margin-top: -36px;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

.avatar-ring {
  padding: 3px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dc2626, #7f1d1d);
  box-shadow: 0 0 0 3px #110202, 0 8px 24px rgba(220,38,38,0.4);
}

.profile-avatar {
  width: 68px; height: 68px;
  border-radius: 50%;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 1.25rem;
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.02em;
}

.change-photo-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.8rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 999px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.15s;
}
.change-photo-btn:hover {
  border-color: rgba(220,38,38,0.35);
  color: #fca5a5;
  background: rgba(220,38,38,0.07);
}

/* Name section */
.name-section {
  text-align: center;
  padding: 0.85rem 1.5rem 0;
}
.p-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
  margin: 0 0 0.45rem;
}
.p-role-badge {
  display: inline-block;
  padding: 0.22rem 0.8rem;
  background: rgba(220,38,38,0.13);
  border: 1px solid rgba(220,38,38,0.3);
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  color: #fca5a5;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  margin-bottom: 0.4rem;
}
.p-org {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.25);
  margin: 0;
}

/* Stats */
.profile-stats {
  display: flex;
  align-items: center;
  margin: 1.25rem 0 0;
  border-top: 1px solid rgba(255,255,255,0.05);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}
.p-stat {
  flex: 1;
  padding: 0.9rem 0.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 3px;
}
.stat-sep {
  width: 1px;
  height: 36px;
  background: rgba(255,255,255,0.06);
  flex-shrink: 0;
}
.p-stat-val {
  font-family: 'Playfair Display', serif;
  font-size: 1.2rem;
  font-weight: 700;
  color: #fca5a5;
  line-height: 1;
}
.p-stat-label {
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.25);
}

/* Badges */
.badge-row {
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem 1.25rem;
  flex-wrap: wrap;
}
.achievement-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.7rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 600;
  color: rgba(255,255,255,0.5);
  transition: all 0.15s;
}
.achievement-badge:hover {
  border-color: rgba(220,38,38,0.3);
  color: rgba(255,255,255,0.8);
  background: rgba(220,38,38,0.07);
}

/* Activity strip */
.activity-strip {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1.25rem 1.25rem;
  border-top: 1px solid rgba(255,255,255,0.05);
}
.activity-dot {
  width: 7px; height: 7px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 6px rgba(34,197,94,0.7);
  animation: blink 2s infinite;
  flex-shrink: 0;
}
.activity-label {
  font-size: 0.72rem;
  color: #4ade80;
  font-weight: 600;
}
.activity-since {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.22);
}

/* ════════════════════════════
   FORM CARD
════════════════════════════ */
.form-card {
  background: #110202;
  border: 1px solid rgba(220,38,38,0.16);
  border-radius: 20px;
  overflow: hidden;
  animation: cardIn 0.4s 0.08s cubic-bezier(.22,1,.36,1) both;
}

.form-section { padding: 1.5rem; }

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.section-title-group {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin: 0;
}

.btn-edit {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.42rem 1rem;
  background: rgba(220,38,38,0.1);
  border: 1px solid rgba(220,38,38,0.28);
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #fca5a5;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-edit:hover {
  background: rgba(220,38,38,0.18);
  border-color: rgba(220,38,38,0.45);
}

/* Form grid */
.form-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.1rem;
  margin-bottom: 0.5rem;
}
@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }

.field {
  display: flex;
  flex-direction: column;
  gap: 0.45rem;
}

.field-label {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
}

.field-input {
  padding: 0.72rem 1rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.07);
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.87rem;
  color: rgba(255,255,255,0.55);
  outline: none;
  transition: all 0.2s;
  box-sizing: border-box;
  width: 100%;
}
.field-input:disabled {
  cursor: default;
  color: rgba(255,255,255,0.45);
}
.field-input--active {
  background: rgba(255,255,255,0.05);
  border-color: rgba(220,38,38,0.3);
  color: rgba(255,255,255,0.85);
}
.field-input--active:focus {
  border-color: #dc2626;
  background: rgba(220,38,38,0.07);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.13);
  color: #fff;
}
.field-input::placeholder { color: rgba(255,255,255,0.2); }

/* Form actions */
.form-actions {
  display: flex;
  gap: 0.75rem;
  padding-top: 1.25rem;
  justify-content: flex-end;
}

.btn-cancel {
  padding: 0.65rem 1.25rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.15s;
}
.btn-cancel:hover {
  background: rgba(255,255,255,0.07);
  color: rgba(255,255,255,0.7);
}

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.65rem 1.4rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  border: none;
  border-radius: 10px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(220,38,38,0.35);
  transition: all 0.15s;
}
.btn-save:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 22px rgba(220,38,38,0.5);
}

/* Divider */
.card-divider {
  height: 1px;
  background: rgba(255,255,255,0.05);
  margin: 0;
}

/* Notification section */
.notif-section { padding: 1.5rem; }

.notif-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.notif-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.95rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.notif-row:last-child { border-bottom: none; }

.notif-icon-wrap {
  width: 34px; height: 34px;
  border-radius: 9px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.07);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(255,255,255,0.25);
  transition: all 0.2s;
}
.notif-icon--on {
  background: rgba(220,38,38,0.1);
  border-color: rgba(220,38,38,0.28);
  color: #fca5a5;
}

.notif-text { flex: 1; min-width: 0; }

.notif-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.75);
  margin: 0;
}
.notif-desc {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.28);
  margin: 3px 0 0;
}

/* Toggle */
.toggle-btn {
  width: 44px; height: 24px;
  border-radius: 12px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.1);
  cursor: pointer;
  position: relative;
  flex-shrink: 0;
  transition: background 0.2s, border-color 0.2s, box-shadow 0.2s;
}
.toggle-btn.toggle-on {
  background: #dc2626;
  border-color: #dc2626;
  box-shadow: 0 0 12px rgba(220,38,38,0.35);
}
.toggle-knob {
  position: absolute;
  top: 3px; left: 3px;
  width: 16px; height: 16px;
  background: white;
  border-radius: 50%;
  transition: transform 0.2s cubic-bezier(.22,1,.36,1);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.toggle-on .toggle-knob {
  transform: translateX(20px);
}

/* ── Animations ── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.3; }
}
</style>
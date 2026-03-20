<template>
  <NuxtLayout>
    <div class="settings-page">

      <!-- ── Page Header ── -->
      <div class="page-header">
        <div class="header-eyebrow">
          <span class="eyebrow-pip"></span>
          <span class="eyebrow-label">Blood Donation System</span>
        </div>
        <h1 class="page-title">System Settings</h1>
        <p class="page-sub">Configure KaDugo Blood Donation &amp; Inventory Management System</p>
      </div>

      <div class="settings-layout">

        <!-- ── Sidebar Nav ── -->
        <div class="settings-nav">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            class="stab"
            :class="activeTab === tab.key ? 'stab--active' : ''"
            @click="activeTab = tab.key"
          >
            <div class="stab-icon" v-html="tab.iconSvg"></div>
            <span>{{ tab.label }}</span>
            <span v-if="activeTab === tab.key" class="stab-pip"></span>
          </button>
        </div>

        <!-- ── Content Panel ── -->
        <div class="settings-content">

          <!-- ════ GENERAL ════ -->
          <div v-if="activeTab === 'general'">
            <div class="section-header">
              <div class="section-title-group">
                <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;color:rgba(220,38,38,0.6);">
                  <circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.2 3.2l1.4 1.4M15.4 15.4l1.4 1.4M3.2 16.8l1.4-1.4M15.4 4.6l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <h2 class="section-title">General Settings</h2>
              </div>
              <p class="section-desc">Basic system configuration for KaDugo.</p>
            </div>
            <div class="setting-rows">
              <div class="setting-row" v-for="s in generalSettings" :key="s.label">
                <div class="setting-info">
                  <p class="setting-label">{{ s.label }}</p>
                  <p class="setting-desc">{{ s.desc }}</p>
                </div>
                <input v-model="s.value" :type="s.type ?? 'text'" class="setting-input" />
              </div>
            </div>
          </div>

          <!-- ════ NOTIFICATIONS ════ -->
          <div v-if="activeTab === 'notifications'">
            <div class="section-header">
              <div class="section-title-group">
                <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;color:rgba(220,38,38,0.6);">
                  <path d="M10 2a6 6 0 016 6c0 3.5 1 5 1 5H3s1-1.5 1-5a6 6 0 016-6zM8.5 17a1.5 1.5 0 003 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                </svg>
                <h2 class="section-title">Email &amp; SMS Notification Settings</h2>
              </div>
              <p class="section-desc">Configure emergency alert delivery channels.</p>
            </div>
            <div class="notif-settings">

              <!-- Email block -->
              <div class="notif-block">
                <div class="notif-block-header">
                  <div class="block-header-icon">
                    <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;">
                      <path d="M2 5l8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                      <rect x="1" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    </svg>
                  </div>
                  <h3 class="notif-block-title">Email Notifications</h3>
                </div>
                <div class="setting-rows">
                  <div class="setting-row" v-for="s in emailSettings" :key="s.label">
                    <div class="setting-info">
                      <p class="setting-label">{{ s.label }}</p>
                      <p class="setting-desc">{{ s.desc }}</p>
                    </div>
                    <input v-if="s.type !== 'toggle'" v-model="s.value" :type="s.type ?? 'text'" class="setting-input" />
                    <button v-else class="toggle-btn" :class="s.enabled ? 'toggle-on' : ''" @click="s.enabled = !s.enabled">
                      <span class="toggle-knob"></span>
                    </button>
                  </div>
                </div>
              </div>

              <!-- SMS block -->
              <div class="notif-block">
                <div class="notif-block-header">
                  <div class="block-header-icon">
                    <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;">
                      <rect x="5" y="1" width="10" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/>
                      <circle cx="10" cy="16" r="1" fill="currentColor"/>
                    </svg>
                  </div>
                  <h3 class="notif-block-title">SMS Notifications</h3>
                </div>
                <div class="setting-rows">
                  <div class="setting-row" v-for="s in smsSettings" :key="s.label">
                    <div class="setting-info">
                      <p class="setting-label">{{ s.label }}</p>
                      <p class="setting-desc">{{ s.desc }}</p>
                    </div>
                    <input v-if="s.type !== 'toggle'" v-model="s.value" :type="s.type ?? 'text'" class="setting-input" />
                    <button v-else class="toggle-btn" :class="s.enabled ? 'toggle-on' : ''" @click="s.enabled = !s.enabled">
                      <span class="toggle-knob"></span>
                    </button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <!-- ════ INVENTORY ════ -->
          <div v-if="activeTab === 'inventory'">
            <div class="section-header">
              <div class="section-title-group">
                <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;color:rgba(220,38,38,0.6);">
                  <path d="M10 2C10 2 3 8 3 13C3 16.3 6.1 19 10 19C13.9 19 17 16.3 17 13C17 8 10 2 10 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/>
                </svg>
                <h2 class="section-title">Inventory Thresholds</h2>
              </div>
              <p class="section-desc">Set minimum stock levels that trigger emergency alerts.</p>
            </div>
            <div class="inv-thresholds">
              <div class="th-header-row">
                <span class="th-col-label" style="width:56px;">Type</span>
                <span class="th-col-label">Critical (units)</span>
                <span class="th-col-label">Low (units)</span>
                <span class="th-col-label">Target (units)</span>
              </div>
              <div class="th-row" v-for="(b, i) in bloodThresholds" :key="b.type" :style="{ animationDelay: `${i * 0.04}s` }">
                <div class="th-type-pill">
                  <div class="th-dot" :style="{ background: b.color }"></div>
                  <span>{{ b.type }}</span>
                </div>
                <div class="th-fields">
                  <div class="th-field">
                    <input v-model.number="b.critical" type="number" min="0" class="setting-input th-input" />
                    <span class="th-badge th-badge--critical">Critical</span>
                  </div>
                  <div class="th-field">
                    <input v-model.number="b.low" type="number" min="0" class="setting-input th-input" />
                    <span class="th-badge th-badge--low">Low</span>
                  </div>
                  <div class="th-field">
                    <input v-model.number="b.target" type="number" min="0" class="setting-input th-input" />
                    <span class="th-badge th-badge--target">Target</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ════ SECURITY ════ -->
          <div v-if="activeTab === 'security'">
            <div class="section-header">
              <div class="section-title-group">
                <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;color:rgba(220,38,38,0.6);">
                  <path d="M10 2L3 5v5c0 4.4 3 8.4 7 9.5C17 18.4 17 9.4 17 10V5L10 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
                  <path d="M7 10l2 2 4-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <h2 class="section-title">Security Settings</h2>
              </div>
              <p class="section-desc">Manage passwords, sessions, and access controls.</p>
            </div>
            <div class="setting-rows">

              <div class="setting-row">
                <div class="setting-info">
                  <p class="setting-label">Change Password</p>
                  <p class="setting-desc">Update your admin account password.</p>
                </div>
                <button class="btn-action">
                  <svg viewBox="0 0 20 20" fill="none" style="width:13px;height:13px;">
                    <rect x="4" y="9" width="12" height="9" rx="2" stroke="currentColor" stroke-width="1.5"/>
                    <path d="M7 9V6a3 3 0 016 0v3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  </svg>
                  Update Password
                </button>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <p class="setting-label">Two-Factor Authentication</p>
                  <p class="setting-desc">Add an extra layer of security to your account.</p>
                </div>
                <button class="toggle-btn toggle-on"><span class="toggle-knob"></span></button>
              </div>

              <div class="setting-row">
                <div class="setting-info">
                  <p class="setting-label">Session Timeout</p>
                  <p class="setting-desc">Automatically log out after inactivity.</p>
                </div>
                <select class="setting-input setting-select">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option selected>2 hours</option>
                  <option>4 hours</option>
                </select>
              </div>

              <div class="setting-row setting-row--danger">
                <div class="setting-info">
                  <p class="setting-label danger-label">Danger Zone</p>
                  <p class="setting-desc" style="color:rgba(252,165,165,0.5);">Permanently delete all system data. This cannot be undone.</p>
                </div>
                <button class="btn-danger">
                  <svg viewBox="0 0 20 20" fill="none" style="width:13px;height:13px;">
                    <path d="M9 3h2M4 6h12l-1 11H5L4 6zM7 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  Reset System
                </button>
              </div>

            </div>
          </div>

          <!-- ── Section Footer ── -->
          <div class="section-footer">
            <span class="footer-hint">Changes apply immediately after saving.</span>
            <button class="btn-save" @click="() => {}">
              <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;">
                <path d="M4 10l4 4 8-8" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Save Settings
            </button>
          </div>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const activeTab = ref('general')

const tabs = [
  {
    key: 'general',
    label: 'General',
    iconSvg: `<svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="3" stroke="currentColor" stroke-width="1.5"/><path d="M10 1v2M10 17v2M1 10h2M17 10h2M3.2 3.2l1.4 1.4M15.4 15.4l1.4 1.4M3.2 16.8l1.4-1.4M15.4 4.6l1.4-1.4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    key: 'notifications',
    label: 'Notifications',
    iconSvg: `<svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;" xmlns="http://www.w3.org/2000/svg"><path d="M10 2a6 6 0 016 6c0 3.5 1 5 1 5H3s1-1.5 1-5a6 6 0 016-6zM8.5 17a1.5 1.5 0 003 0" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>`,
  },
  {
    key: 'inventory',
    label: 'Inventory',
    iconSvg: `<svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;" xmlns="http://www.w3.org/2000/svg"><path d="M10 2C10 2 3 8 3 13C3 16.3 6.1 19 10 19C13.9 19 17 16.3 17 13C17 8 10 2 10 2Z" stroke="currentColor" stroke-width="1.5" fill="none"/></svg>`,
  },
  {
    key: 'security',
    label: 'Security',
    iconSvg: `<svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;" xmlns="http://www.w3.org/2000/svg"><path d="M10 2L3 5v5c0 4.4 3 8.4 7 9.5C17 18.4 17 9.4 17 10V5L10 2z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>`,
  },
]

const generalSettings = reactive([
  { label: 'System Name',  desc: 'Name displayed across the platform',           value: 'KaDugo Blood Donation System' },
  { label: 'Organization', desc: 'Your healthcare organization name',             value: 'Philippine General Hospital' },
  { label: 'Admin Email',  desc: 'Primary contact email for system alerts',       value: 'admin@kadugo.ph', type: 'email' },
  { label: 'Time Zone',    desc: 'System time zone for timestamps',               value: 'Asia/Manila' },
])

const emailSettings = reactive([
  { label: 'Enable Email Alerts',      desc: 'Send email notifications for emergencies',  type: 'toggle', enabled: true },
  { label: 'SMTP Server',              desc: 'Outgoing mail server address',               value: 'smtp.kadugo.ph' },
  { label: 'Sender Email',             desc: 'The "from" address for notifications',       value: 'alerts@kadugo.ph', type: 'email' },
  { label: 'Alert Delay (seconds)',    desc: 'Minimum time between repeat alerts',         value: '300', type: 'number' },
])

const smsSettings = reactive([
  { label: 'Enable SMS Alerts', desc: 'Send SMS for critical blood requests',    type: 'toggle', enabled: true },
  { label: 'SMS Provider',      desc: 'SMS gateway provider name',               value: 'Semaphore / Globe Labs' },
  { label: 'API Key',           desc: 'Provider API key for SMS delivery',       value: '••••••••••••••••', type: 'password' },
  { label: 'Sender Name',       desc: 'Sender ID shown on recipient device',     value: 'KADUGO' },
])

const bloodThresholds = reactive([
  { type: 'A+',  critical: 5, low: 10, target: 50, color: '#ef4444' },
  { type: 'A-',  critical: 3, low: 8,  target: 30, color: '#dc2626' },
  { type: 'B+',  critical: 5, low: 10, target: 50, color: '#b91c1c' },
  { type: 'B-',  critical: 3, low: 8,  target: 30, color: '#991b1b' },
  { type: 'O+',  critical: 8, low: 15, target: 60, color: '#ef4444' },
  { type: 'O-',  critical: 5, low: 10, target: 40, color: '#dc2626' },
  { type: 'AB+', critical: 5, low: 10, target: 50, color: '#7f1d1d' },
  { type: 'AB-', critical: 3, low: 6,  target: 25, color: '#450a0a' },
])
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Root ── */
.settings-page {
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

/* ── Layout ── */
.settings-layout {
  display: grid;
  grid-template-columns: 210px 1fr;
  gap: 1.25rem;
  align-items: start;
}
@media (max-width: 768px) {
  .settings-layout { grid-template-columns: 1fr; }
}

/* ════════════════════════════
   SIDEBAR NAV
════════════════════════════ */
.settings-nav {
  display: flex;
  flex-direction: column;
  gap: 3px;
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 16px;
  padding: 0.6rem;
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
}

.stab {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  background: transparent;
  border: 1px solid transparent;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  color: rgba(255,255,255,0.38);
  cursor: pointer;
  transition: all 0.15s;
  text-align: left;
  position: relative;
}
.stab:hover {
  background: rgba(220,38,38,0.07);
  color: rgba(255,255,255,0.75);
}
.stab--active {
  background: rgba(220,38,38,0.14);
  border-color: rgba(220,38,38,0.3);
  color: #fca5a5;
  font-weight: 600;
}

.stab-icon {
  width: 15px; height: 15px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: inherit;
}

.stab-pip {
  position: absolute;
  right: 10px;
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #dc2626;
  box-shadow: 0 0 6px rgba(220,38,38,0.8);
}

/* ════════════════════════════
   CONTENT PANEL
════════════════════════════ */
.settings-content {
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 18px;
  overflow: hidden;
  animation: cardIn 0.4s 0.06s cubic-bezier(.22,1,.36,1) both;
}

/* Section header */
.section-header {
  padding: 1.5rem 1.5rem 0;
  margin-bottom: 1.5rem;
}

.section-title-group {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  margin-bottom: 0.35rem;
}

.section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin: 0;
}

.section-desc {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.28);
  margin: 0;
}

/* Setting rows */
.setting-rows { padding: 0 1.5rem; }

.setting-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(255,255,255,0.04);
}
.setting-row:last-child { border-bottom: none; }

.setting-label {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.72);
  margin: 0;
}
.setting-desc {
  font-size: 0.7rem;
  color: rgba(255,255,255,0.25);
  margin: 3px 0 0;
}

/* Inputs */
.setting-input {
  padding: 0.55rem 0.9rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.82rem;
  color: rgba(255,255,255,0.7);
  outline: none;
  width: 240px;
  max-width: 100%;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.setting-input:focus {
  border-color: #dc2626;
  background: rgba(220,38,38,0.07);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.12);
  color: rgba(255,255,255,0.9);
}
.setting-input::placeholder { color: rgba(255,255,255,0.2); }

.setting-select {
  width: auto;
  min-width: 140px;
  cursor: pointer;
  background-color: rgba(255,255,255,0.04);
}
.setting-select option {
  background: #1a0202;
  color: rgba(255,255,255,0.8);
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
  box-shadow: 0 0 12px rgba(220,38,38,0.4);
}
.toggle-knob {
  position: absolute;
  top: 3px; left: 3px;
  width: 16px; height: 16px;
  background: white;
  border-radius: 50%;
  transition: transform 0.22s cubic-bezier(.22,1,.36,1);
  box-shadow: 0 1px 4px rgba(0,0,0,0.3);
}
.toggle-on .toggle-knob { transform: translateX(20px); }

/* ════ NOTIFICATIONS ════ */
.notif-settings {
  padding: 0 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.notif-block {
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 14px;
  overflow: hidden;
}

.notif-block-header {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  padding: 0.85rem 1.25rem;
  background: rgba(255,255,255,0.03);
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.block-header-icon {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: rgba(220,38,38,0.1);
  border: 1px solid rgba(220,38,38,0.22);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fca5a5;
  flex-shrink: 0;
}

.notif-block-title {
  font-size: 0.88rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
  margin: 0;
}

.notif-block .setting-rows { padding: 0 1.25rem; }

/* ════ INVENTORY THRESHOLDS ════ */
.inv-thresholds {
  padding: 0 1.5rem 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.th-header-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0 0.75rem 0.35rem;
}

.th-col-label {
  font-size: 0.6rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.22);
  font-weight: 700;
  flex: 1;
}
.th-col-label:first-child { flex: 0 0 56px; }

.th-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem;
  background: rgba(255,255,255,0.02);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  transition: border-color 0.15s, background 0.15s;
  animation: rowIn 0.35s cubic-bezier(.22,1,.36,1) both;
}
.th-row:hover {
  background: rgba(220,38,38,0.04);
  border-color: rgba(220,38,38,0.18);
}

.th-type-pill {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  width: 56px;
  flex-shrink: 0;
  font-weight: 800;
  font-size: 0.88rem;
  color: rgba(255,255,255,0.8);
}

.th-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.th-fields {
  display: flex;
  gap: 0.75rem;
  flex: 1;
  flex-wrap: wrap;
}

.th-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 80px;
  position: relative;
}

.th-input {
  width: 100% !important;
  padding-right: 0.5rem;
}

.th-badge {
  font-size: 0.58rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  padding: 0.1rem 0.4rem;
  border-radius: 4px;
  display: inline-block;
  align-self: flex-start;
}
.th-badge--critical { background: rgba(220,38,38,0.12); color: #fca5a5; }
.th-badge--low      { background: rgba(245,158,11,0.12); color: #fcd34d; }
.th-badge--target   { background: rgba(34,197,94,0.1);   color: #4ade80; }

/* ════ SECURITY ════ */
.btn-action {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(255,255,255,0.5);
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  flex-shrink: 0;
}
.btn-action:hover {
  border-color: rgba(220,38,38,0.35);
  color: #fca5a5;
  background: rgba(220,38,38,0.07);
}

.setting-row--danger {
  border-top: 1px solid rgba(220,38,38,0.2) !important;
  background: rgba(220,38,38,0.04);
  border-radius: 0 0 4px 4px;
  margin: 0 -0px;
  padding: 1rem 0;
}

.danger-label { color: #fca5a5 !important; }

.btn-danger {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.45rem 1rem;
  background: rgba(220,38,38,0.1);
  border: 1px solid rgba(220,38,38,0.35);
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: #fca5a5;
  cursor: pointer;
  white-space: nowrap;
  transition: all 0.15s;
  flex-shrink: 0;
}
.btn-danger:hover {
  background: rgba(220,38,38,0.2);
  border-color: rgba(220,38,38,0.55);
  box-shadow: 0 0 16px rgba(220,38,38,0.2);
}

/* ── Section footer ── */
.section-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.5rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  background: rgba(0,0,0,0.15);
  gap: 1rem;
  flex-wrap: wrap;
}

.footer-hint {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.2);
}

.btn-save {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.6rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  border: none;
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.87rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(220,38,38,0.38), 0 1px 0 rgba(255,255,255,0.1) inset;
  transition: transform 0.15s, box-shadow 0.15s;
  letter-spacing: 0.01em;
}
.btn-save:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(220,38,38,0.55);
}

/* ── Animations ── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes rowIn {
  from { opacity: 0; transform: translateX(-6px); }
  to   { opacity: 1; transform: translateX(0); }
}
</style>
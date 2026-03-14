<template>
  <NuxtLayout>
    <div class="settings-page">
      <div class="page-header">
        <h1 class="page-title">System Settings</h1>
        <p class="page-sub">Configure KaDugo Blood Donation & Inventory Management System</p>
      </div>

      <div class="settings-layout">
        <!-- Sidebar tabs -->
        <div class="settings-nav">
          <button
            v-for="tab in tabs"
            :key="tab.key"
            :class="['stab', activeTab === tab.key && 'stab--active']"
            @click="activeTab = tab.key"
          >
            <component :is="tab.icon" class="size-4" />
            {{ tab.label }}
          </button>
        </div>

        <!-- Tab Content -->
        <div class="settings-content card">
          <!-- General -->
          <div v-if="activeTab === 'general'">
            <div class="section-header">
              <h2 class="section-title">General Settings</h2>
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

          <!-- Notifications -->
          <div v-if="activeTab === 'notifications'">
            <div class="section-header">
              <h2 class="section-title">Email & SMS Notification Settings</h2>
              <p class="section-desc">Configure emergency alert delivery channels.</p>
            </div>
            <div class="notif-settings">
              <div class="notif-block">
                <div class="notif-block-header">
                  <EnvelopeIcon class="size-5 text-red-600" />
                  <h3 class="notif-block-title">Email Notifications</h3>
                </div>
                <div class="setting-rows">
                  <div class="setting-row" v-for="s in emailSettings" :key="s.label">
                    <div class="setting-info">
                      <p class="setting-label">{{ s.label }}</p>
                      <p class="setting-desc">{{ s.desc }}</p>
                    </div>
                    <input v-if="s.type !== 'toggle'" v-model="s.value" :type="s.type ?? 'text'" class="setting-input" />
                    <button v-else class="toggle-btn" :class="s.enabled && 'toggle-on'" @click="s.enabled = !s.enabled">
                      <span class="toggle-knob"></span>
                    </button>
                  </div>
                </div>
              </div>

              <div class="notif-block">
                <div class="notif-block-header">
                  <DevicePhoneMobileIcon class="size-5 text-red-600" />
                  <h3 class="notif-block-title">SMS Notifications</h3>
                </div>
                <div class="setting-rows">
                  <div class="setting-row" v-for="s in smsSettings" :key="s.label">
                    <div class="setting-info">
                      <p class="setting-label">{{ s.label }}</p>
                      <p class="setting-desc">{{ s.desc }}</p>
                    </div>
                    <input v-if="s.type !== 'toggle'" v-model="s.value" :type="s.type ?? 'text'" class="setting-input" />
                    <button v-else class="toggle-btn" :class="s.enabled && 'toggle-on'" @click="s.enabled = !s.enabled">
                      <span class="toggle-knob"></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Inventory -->
          <div v-if="activeTab === 'inventory'">
            <div class="section-header">
              <h2 class="section-title">Inventory Thresholds</h2>
              <p class="section-desc">Set minimum stock levels that trigger emergency alerts.</p>
            </div>
            <div class="inv-thresholds">
              <div class="th-row" v-for="b in bloodThresholds" :key="b.type">
                <div class="th-type" :style="{ background: b.color }">{{ b.type }}</div>
                <div class="th-fields">
                  <div class="th-field">
                    <label>Critical (units)</label>
                    <input v-model.number="b.critical" type="number" min="0" class="setting-input" />
                  </div>
                  <div class="th-field">
                    <label>Low (units)</label>
                    <input v-model.number="b.low" type="number" min="0" class="setting-input" />
                  </div>
                  <div class="th-field">
                    <label>Target (units)</label>
                    <input v-model.number="b.target" type="number" min="0" class="setting-input" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Security -->
          <div v-if="activeTab === 'security'">
            <div class="section-header">
              <h2 class="section-title">Security Settings</h2>
              <p class="section-desc">Manage passwords, sessions, and access controls.</p>
            </div>
            <div class="setting-rows">
              <div class="setting-row">
                <div class="setting-info">
                  <p class="setting-label">Change Password</p>
                  <p class="setting-desc">Update your admin account password.</p>
                </div>
                <button class="btn-action">Update Password</button>
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
                <select class="setting-input" style="width:auto">
                  <option>30 minutes</option>
                  <option>1 hour</option>
                  <option selected>2 hours</option>
                  <option>4 hours</option>
                </select>
              </div>
              <div class="setting-row danger-row">
                <div class="setting-info">
                  <p class="setting-label danger-label">Danger Zone</p>
                  <p class="setting-desc">Permanently delete all system data. This cannot be undone.</p>
                </div>
                <button class="btn-danger">Reset System</button>
              </div>
            </div>
          </div>

          <div class="section-footer">
            <button class="btn-save">Save Settings</button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  Cog6ToothIcon, BellIcon, BeakerIcon, ShieldCheckIcon,
  EnvelopeIcon, DevicePhoneMobileIcon,
} from '@heroicons/vue/24/outline'

const activeTab = ref('general')

const tabs = [
  { key: 'general',       label: 'General',       icon: Cog6ToothIcon },
  { key: 'notifications', label: 'Notifications',  icon: BellIcon },
  { key: 'inventory',     label: 'Inventory',      icon: BeakerIcon },
  { key: 'security',      label: 'Security',       icon: ShieldCheckIcon },
]

const generalSettings = reactive([
  { label: 'System Name', desc: 'Name displayed across the platform', value: 'KaDugo Blood Donation System' },
  { label: 'Organization', desc: 'Your healthcare organization name', value: 'Philippine General Hospital' },
  { label: 'Admin Email', desc: 'Primary contact email for system alerts', value: 'admin@kadugo.ph', type: 'email' },
  { label: 'Time Zone', desc: 'System time zone for timestamps', value: 'Asia/Manila' },
])

const emailSettings = reactive([
  { label: 'Enable Email Alerts', desc: 'Send email notifications for emergencies', type: 'toggle', enabled: true },
  { label: 'SMTP Server', desc: 'Outgoing mail server address', value: 'smtp.kadugo.ph' },
  { label: 'Sender Email', desc: 'The "from" address for notifications', value: 'alerts@kadugo.ph', type: 'email' },
  { label: 'Alert Delay (seconds)', desc: 'Minimum time between repeat alerts', value: '300', type: 'number' },
])

const smsSettings = reactive([
  { label: 'Enable SMS Alerts', desc: 'Send SMS for critical blood requests', type: 'toggle', enabled: true },
  { label: 'SMS Provider', desc: 'SMS gateway provider name', value: 'Semaphore / Globe Labs' },
  { label: 'API Key', desc: 'Provider API key for SMS delivery', value: '••••••••••••••••', type: 'password' },
  { label: 'Sender Name', desc: 'Sender ID shown on recipient device', value: 'KADUGO' },
])

const bloodThresholds = reactive([
  { type: 'A+',  critical: 5,  low: 10, target: 50, color: '#e74c3c' },
  { type: 'A-',  critical: 3,  low: 8,  target: 30, color: '#c0392b' },
  { type: 'B+',  critical: 5,  low: 10, target: 50, color: '#a93226' },
  { type: 'B-',  critical: 3,  low: 8,  target: 30, color: '#922b21' },
  { type: 'O+',  critical: 8,  low: 15, target: 60, color: '#e74c3c' },
  { type: 'O-',  critical: 5,  low: 10, target: 40, color: '#c0392b' },
  { type: 'AB+', critical: 5,  low: 10, target: 50, color: '#7b241c' },
  { type: 'AB-', critical: 3,  low: 6,  target: 25, color: '#641e16' },
])
</script>

<style scoped>
.settings-page { max-width: 1100px; }
.page-header { margin-bottom: 1.75rem; }

.page-title { font-family: Georgia, 'Times New Roman', serif; font-size: 1.75rem; font-weight: 700; color: #1a1a1a; margin: 0; }
.page-sub { font-size: 0.82rem; color: #999; margin-top: 4px; }

.settings-layout { display: grid; grid-template-columns: 200px 1fr; gap: 1.25rem; }
@media (max-width: 768px) { .settings-layout { grid-template-columns: 1fr; } }

.settings-nav { display: flex; flex-direction: column; gap: 3px; }

.stab { display: flex; align-items: center; gap: 10px; padding: 0.7rem 1rem; border-radius: 10px; background: none; border: none; font-size: 0.85rem; color: #666; cursor: pointer; transition: all 0.15s; text-align: left; }
.stab:hover { background: white; color: #c0392b; }
.stab--active { background: white; color: #c0392b; font-weight: 600; border: 1px solid #fecaca; }

.card { background: white; border: 1px solid #f5e8e8; border-radius: 16px; }

.section-header { padding: 1.5rem 1.5rem 0; margin-bottom: 1.5rem; }
.section-title { font-size: 1rem; font-weight: 700; color: #1a1a1a; margin: 0; }
.section-desc { font-size: 0.78rem; color: #999; margin: 4px 0 0; }

.setting-rows { padding: 0 1.5rem; }

.setting-row { display: flex; align-items: center; justify-content: space-between; gap: 2rem; padding: 1rem 0; border-bottom: 1px solid #faf5f5; }
.setting-row:last-child { border-bottom: none; }

.setting-label { font-size: 0.85rem; font-weight: 600; color: #333; margin: 0; }
.setting-desc { font-size: 0.72rem; color: #bbb; margin: 3px 0 0; }

.setting-input { padding: 0.55rem 0.85rem; background: #faf9f9; border: 1px solid #f0e0e0; border-radius: 8px; font-size: 0.82rem; color: #333; outline: none; width: 240px; max-width: 100%; transition: border-color 0.2s; }
.setting-input:focus { border-color: #e74c3c; background: white; }

.toggle-btn { width: 42px; height: 24px; border-radius: 12px; background: #f0e0e0; border: none; cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0; }
.toggle-btn.toggle-on { background: #c0392b; }
.toggle-knob { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: white; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
.toggle-on .toggle-knob { transform: translateX(18px); }

.notif-settings { padding: 0 1.5rem; display: flex; flex-direction: column; gap: 1.5rem; }
.notif-block { border: 1px solid #f5e8e8; border-radius: 12px; overflow: hidden; }
.notif-block-header { display: flex; align-items: center; gap: 8px; padding: 0.85rem 1.25rem; background: #faf9f9; border-bottom: 1px solid #f5e8e8; }
.notif-block-title { font-size: 0.88rem; font-weight: 700; color: #333; margin: 0; }
.notif-block .setting-rows { padding: 0 1.25rem; }

/* Inventory thresholds */
.inv-thresholds { padding: 0 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; }
.th-row { display: flex; align-items: center; gap: 1rem; padding: 0.75rem; background: #faf9f9; border-radius: 12px; border: 1px solid #f5e8e8; }
.th-type { width: 42px; height: 42px; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-weight: 800; font-size: 0.9rem; flex-shrink: 0; }
.th-fields { display: flex; gap: 0.75rem; flex: 1; flex-wrap: wrap; }
.th-field { display: flex; flex-direction: column; gap: 4px; }
.th-field label { font-size: 0.65rem; color: #bbb; text-transform: uppercase; letter-spacing: 0.05em; }
.th-field .setting-input { width: 100px; }

/* Security */
.btn-action { padding: 6px 16px; background: none; border: 1px solid #f0e0e0; border-radius: 8px; font-size: 0.78rem; color: #666; cursor: pointer; }
.btn-action:hover { border-color: #fecaca; color: #c0392b; }

.danger-row { border-top: 1px solid #fecaca !important; background: #fff9f9; border-radius: 0 0 16px 16px; }
.danger-label { color: #c0392b !important; }

.btn-danger { padding: 6px 16px; background: none; border: 1px solid #fecaca; border-radius: 8px; font-size: 0.78rem; color: #c0392b; font-weight: 600; cursor: pointer; }
.btn-danger:hover { background: #fef2f2; }

.section-footer { padding: 1.25rem 1.5rem; border-top: 1px solid #f5e8e8; }

.btn-save { padding: 0.7rem 1.75rem; background: linear-gradient(135deg, #c0392b, #e74c3c); color: white; border: none; border-radius: 10px; font-size: 0.85rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 12px rgba(192,57,43,0.25); }
.btn-save:hover { transform: translateY(-1px); }
</style>
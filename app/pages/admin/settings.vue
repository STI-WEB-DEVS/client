<template>
  <div>
    <!-- Settings tabs -->
    <div class="nm-settings-tabs mb-6">
      <button
        v-for="tab in settingsTabs"
        :key="tab.value"
        @click="activeTab = tab.value"
        class="nm-settings-tab"
        :class="{ 'nm-settings-tab--active': activeTab === tab.value }"
      >
        <component :is="tab.icon" class="w-4 h-4" />
        {{ tab.label }}
      </button>
    </div>

    <!-- ── Tab: General ─────────────────────────────── -->
    <div v-if="activeTab === 'general'" class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 space-y-5">

        <!-- Platform identity -->
        <div class="nm-card p-6">
          <h3 class="nm-section-title mb-4">Platform Identity</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="nm-label">Platform Name</label>
              <input class="nm-input" v-model="settings.platformName" />
            </div>
            <div>
              <label class="nm-label">Support Email</label>
              <input class="nm-input" type="email" v-model="settings.supportEmail" />
            </div>
            <div>
              <label class="nm-label">Country / Region</label>
              <select class="nm-input" v-model="settings.region">
                <option>Philippines</option>
                <option>Singapore</option>
                <option>Malaysia</option>
              </select>
            </div>
            <div>
              <label class="nm-label">Timezone</label>
              <select class="nm-input" v-model="settings.timezone">
                <option>Asia/Manila (UTC+8)</option>
                <option>Asia/Singapore (UTC+8)</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="nm-label">Platform Description</label>
              <textarea
                class="nm-input resize-none"
                rows="3"
                v-model="settings.description"
              />
            </div>
          </div>
        </div>

        <!-- Consultation settings -->
        <div class="nm-card p-6">
          <h3 class="nm-section-title mb-4">Consultation Settings</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="nm-label">Default Session Duration</label>
              <select class="nm-input" v-model="settings.sessionDuration">
                <option>30 minutes</option>
                <option>45 minutes</option>
                <option>60 minutes</option>
                <option>90 minutes</option>
              </select>
            </div>
            <div>
              <label class="nm-label">Base Consultation Fee (₱)</label>
              <input class="nm-input" type="number" v-model="settings.baseFee" />
            </div>
            <div>
              <label class="nm-label">Platform Commission (%)</label>
              <input class="nm-input" type="number" v-model="settings.commission" min="0" max="100" />
            </div>
            <div>
              <label class="nm-label">Cancellation Window</label>
              <select class="nm-input" v-model="settings.cancelWindow">
                <option>12 hours before</option>
                <option>24 hours before</option>
                <option>48 hours before</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Save bar -->
        <div class="flex items-center justify-end gap-3">
          <button class="nm-btn-ghost">Discard Changes</button>
          <button class="nm-btn-primary" @click="saveSettings">
            <CheckIcon class="w-4 h-4" /> Save Settings
          </button>
        </div>
      </div>

      <!-- Right: Status panel -->
      <div class="space-y-4">
        <div class="nm-card p-5">
          <h3 class="nm-section-title mb-3">System Status</h3>
          <div class="space-y-3">
            <div v-for="s in systemStatus" :key="s.label" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" :class="s.ok ? 'bg-emerald-400' : 'bg-red-400'" />
                <span class="text-sm font-body text-nm-text">{{ s.label }}</span>
              </div>
              <span class="text-xs font-body font-semibold" :class="s.ok ? 'text-emerald-600' : 'text-red-600'">
                {{ s.ok ? 'Operational' : 'Degraded' }}
              </span>
            </div>
          </div>
          <div class="mt-4 pt-4 border-t border-nm-border">
            <p class="text-xs text-nm-muted font-body">
              All systems nominal · Last checked {{ new Date().toLocaleTimeString('en-PH', { hour: '2-digit', minute: '2-digit' }) }}
            </p>
          </div>
        </div>

        <div class="nm-card p-5">
          <h3 class="nm-section-title mb-3">Food Data Sources</h3>
          <div class="space-y-2.5">
            <div v-for="src in dataSources" :key="src.name" class="flex items-start gap-2.5">
              <div class="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                   :style="{ background: src.color + '18' }">
                <CircleStackIcon class="w-3.5 h-3.5" :style="{ color: src.color }" />
              </div>
              <div>
                <p class="text-sm font-semibold font-body text-nm-text">{{ src.name }}</p>
                <p class="text-xs font-body text-nm-muted">{{ src.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="nm-card p-5">
          <h3 class="nm-section-title mb-3">Version Info</h3>
          <div class="space-y-1.5 text-xs font-body">
            <div class="flex justify-between">
              <span class="text-nm-muted">App Version</span>
              <span class="font-bold text-nm-text font-mono">v1.0.0</span>
            </div>
            <div class="flex justify-between">
              <span class="text-nm-muted">Framework</span>
              <span class="font-bold text-nm-text">Nuxt 4 / Vue 3</span>
            </div>
            <div class="flex justify-between">
              <span class="text-nm-muted">Environment</span>
              <span class="nm-badge nm-badge-active py-0.5">Production</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Tab: Security ────────────────────────────── -->
    <div v-if="activeTab === 'security'" class="grid grid-cols-1 lg:grid-cols-2 gap-5 max-w-3xl">
      <div class="nm-card p-6 lg:col-span-2">
        <h3 class="nm-section-title mb-1">Authentication & Access</h3>
        <p class="text-sm text-nm-muted font-body mb-5">Configure how users authenticate and access the system.</p>
        <div class="space-y-5">
          <div v-for="toggle in securityToggles" :key="toggle.label" class="nm-toggle-row">
            <div class="flex-1">
              <p class="text-sm font-semibold font-body text-nm-text">{{ toggle.label }}</p>
              <p class="text-xs font-body text-nm-muted mt-0.5">{{ toggle.desc }}</p>
            </div>
            <div
              class="nm-toggle"
              :class="{ 'nm-toggle--on': toggle.value }"
              @click="toggle.value = !toggle.value"
            >
              <div class="nm-toggle-thumb" />
            </div>
          </div>
        </div>
      </div>

      <div class="nm-card p-6">
        <h3 class="nm-section-title mb-4">PRC Verification Rules</h3>
        <div class="space-y-3">
          <div>
            <label class="nm-label">License Validity Period</label>
            <select class="nm-input">
              <option>3 years (standard PRC)</option>
              <option>Custom period</option>
            </select>
          </div>
          <div>
            <label class="nm-label">Verification Method</label>
            <select class="nm-input">
              <option>Manual Admin Review</option>
              <option>Document Upload + Review</option>
            </select>
          </div>
          <div class="flex items-center justify-end mt-4">
            <button class="nm-btn-primary text-sm">Save Rules</button>
          </div>
        </div>
      </div>

      <div class="nm-card p-6">
        <h3 class="nm-section-title mb-4">Session & Token</h3>
        <div class="space-y-3">
          <div>
            <label class="nm-label">Session Timeout</label>
            <select class="nm-input">
              <option>30 minutes</option>
              <option>1 hour</option>
              <option>4 hours</option>
              <option>8 hours</option>
            </select>
          </div>
          <div>
            <label class="nm-label">Max Login Attempts</label>
            <input class="nm-input" type="number" value="5" />
          </div>
          <div class="flex items-center justify-end mt-4">
            <button class="nm-btn-primary text-sm">Save</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Tab: Notifications ───────────────────────── -->
    <div v-if="activeTab === 'notifications'" class="max-w-2xl">
      <div class="nm-card p-6">
        <h3 class="nm-section-title mb-1">Notification Preferences</h3>
        <p class="text-sm text-nm-muted font-body mb-5">Control when and how NutriMatch sends alerts to users and admins.</p>
        <div class="space-y-5">
          <div v-for="group in notifGroups" :key="group.title">
            <p class="text-xs font-bold text-nm-muted uppercase tracking-widest mb-3 font-body">{{ group.title }}</p>
            <div class="space-y-3">
              <div v-for="n in group.items" :key="n.label" class="nm-toggle-row">
                <div class="flex-1">
                  <p class="text-sm font-semibold font-body text-nm-text">{{ n.label }}</p>
                  <p class="text-xs font-body text-nm-muted mt-0.5">{{ n.desc }}</p>
                </div>
                <div
                  class="nm-toggle"
                  :class="{ 'nm-toggle--on': n.value }"
                  @click="n.value = !n.value"
                >
                  <div class="nm-toggle-thumb" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-6 pt-4 border-t border-nm-border">
          <button class="nm-btn-primary">Save Preferences</button>
        </div>
      </div>
    </div>

    <!-- Saved toast -->
    <transition name="toast">
      <div v-if="saved" class="nm-toast">
        <CheckCircleIcon class="w-4 h-4" />
        Settings saved successfully
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import {
  Cog6ToothIcon,
  ShieldCheckIcon,
  BellIcon,
  CheckIcon,
  CheckCircleIcon,
  CircleStackIcon,
} from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

const activeTab = ref('general')
const saved = ref(false)

const settingsTabs = [
  { label: 'General',       value: 'general',       icon: Cog6ToothIcon },
  { label: 'Security',      value: 'security',      icon: ShieldCheckIcon },
  { label: 'Notifications', value: 'notifications', icon: BellIcon },
]

const settings = reactive({
  platformName: 'NutriMatch',
  supportEmail: 'support@nutrimatch.ph',
  region: 'Philippines',
  timezone: 'Asia/Manila (UTC+8)',
  description: 'Web-based clinical nutrition consultation and outcome monitoring system for structured Medical Nutrition Therapy.',
  sessionDuration: '60 minutes',
  baseFee: 500,
  commission: 15,
  cancelWindow: '24 hours before',
})

const systemStatus = [
  { label: 'API Gateway',        ok: true },
  { label: 'Authentication',     ok: true },
  { label: 'Database',           ok: true },
  { label: 'File Storage',       ok: true },
  { label: 'Email Notifications',ok: true },
  { label: 'Payment Gateway',    ok: true },
]

const dataSources = [
  { name: 'DOST-FNRI Philippine Food Tables', desc: 'Localized food composition data for meal planning', color: '#0d6b6b' },
  { name: 'USDA FoodData Central',            desc: 'International nutrient database integration',       color: '#d97706' },
  { name: 'FNRI Food Exchange Lists',         desc: 'Diet exchange system for Filipino diets',           color: '#7c3aed' },
]

const securityToggles = reactive([
  { label: 'Two-Factor Authentication (2FA)', desc: 'Require OTP for all admin logins', value: true },
  { label: 'PRC License Auto-Expiry Check',  desc: 'Automatically flag expired RND licenses', value: true },
  { label: 'Force Password Reset (90 days)', desc: 'Require password change every 90 days', value: false },
  { label: 'Audit Log (All Actions)',         desc: 'Log every user action for compliance', value: true },
  { label: 'IP Whitelist Mode',               desc: 'Restrict admin access to approved IPs', value: false },
])

const notifGroups = reactive([
  {
    title: 'Client Alerts',
    items: [
      { label: 'Appointment Reminders', desc: 'Send 24h and 1h reminders to clients', value: true },
      { label: 'Lab Result Updates',    desc: 'Notify clients when new results are uploaded', value: true },
      { label: 'Progress Reports',      desc: 'Weekly summary of nutrition progress', value: false },
    ],
  },
  {
    title: 'Dietitian Alerts',
    items: [
      { label: 'New Patient Matched',   desc: 'Notify RND when a new client is assigned', value: true },
      { label: 'Missed Consultation',   desc: 'Alert RND of no-shows or cancellations', value: true },
    ],
  },
  {
    title: 'Admin Alerts',
    items: [
      { label: 'Pending Verifications', desc: 'Alert when new RND submits for verification', value: true },
      { label: 'Payment Disputes',      desc: 'Notify admin of flagged transactions', value: true },
      { label: 'System Error Reports',  desc: 'Email admin on critical system errors', value: true },
    ],
  },
])

function saveSettings() {
  saved.value = true
  setTimeout(() => { saved.value = false }, 2600)
}
</script>

<style scoped>
.nm-settings-tabs {
  display: flex;
  gap: 0.5rem;
  border-bottom: 2px solid var(--nm-border);
  padding-bottom: 0;
}

.nm-settings-tab {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.6rem 1.1rem;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.875rem;
  font-weight: 600;
  color: var(--nm-text-muted);
  background: transparent;
  border: none;
  border-bottom: 2.5px solid transparent;
  margin-bottom: -2px;
  cursor: pointer;
  transition: all 0.18s ease;
}
.nm-settings-tab:hover { color: var(--nm-teal); }
.nm-settings-tab--active { color: var(--nm-teal); border-bottom-color: var(--nm-teal); }

.nm-section-title {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 600;
  color: var(--nm-text);
}

.nm-toggle-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--nm-border);
}
.nm-toggle-row:last-child { border-bottom: none; }

.nm-toggle {
  width: 44px;
  height: 24px;
  border-radius: 99px;
  background: var(--nm-cream-dark);
  position: relative;
  cursor: pointer;
  transition: background 0.22s ease;
  flex-shrink: 0;
}
.nm-toggle--on { background: var(--nm-teal); }

.nm-toggle-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: #fff;
  position: absolute;
  top: 3px;
  left: 3px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.18);
  transition: transform 0.22s ease;
}
.nm-toggle--on .nm-toggle-thumb { transform: translateX(20px); }

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

<template>
  <div>
    <!-- Settings tab bar -->
    <div class="nm-stabs mb-6">
      <button
        v-for="t in stabs" :key="t.val"
        class="nm-stab" :class="{ active: activeTab === t.val }"
        @click="activeTab = t.val"
      >
        <component :is="t.icon" class="w-4 h-4"/>
        {{ t.label }}
      </button>
    </div>

    <!-- ── General ──────────────────────────────── -->
    <div v-if="activeTab === 'general'" class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <div class="lg:col-span-2 space-y-5">

        <!-- Platform identity -->
        <div class="nm-card p-6">
          <p class="nm-sec-title mb-4">Platform Identity</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div><label class="nm-label">Platform Name</label><input class="nm-input" value="NutriMatch"/></div>
            <div><label class="nm-label">Support Email</label><input class="nm-input" type="email" value="support@nutrimatch.ph"/></div>
            <div>
              <label class="nm-label">Country / Region</label>
              <select class="nm-input"><option>Philippines</option><option>Singapore</option></select>
            </div>
            <div>
              <label class="nm-label">Timezone</label>
              <select class="nm-input"><option>Asia/Manila (UTC+8)</option></select>
            </div>
            <div class="sm:col-span-2">
              <label class="nm-label">Platform Description</label>
              <textarea class="nm-input resize-none" rows="3">Web-based clinical nutrition consultation and outcome monitoring system for structured Medical Nutrition Therapy.</textarea>
            </div>
          </div>
        </div>

        <!-- Consultation settings -->
        <div class="nm-card p-6">
          <p class="nm-sec-title mb-4">Consultation Settings</p>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="nm-label">Default Session Duration</label>
              <select class="nm-input"><option>30 minutes</option><option selected>60 minutes</option><option>90 minutes</option></select>
            </div>
            <div><label class="nm-label">Base Consultation Fee (₱)</label><input class="nm-input" type="number" value="500"/></div>
            <div><label class="nm-label">Platform Commission (%)</label><input class="nm-input" type="number" value="15"/></div>
            <div>
              <label class="nm-label">Cancellation Window</label>
              <select class="nm-input"><option>12 hours before</option><option selected>24 hours before</option></select>
            </div>
          </div>
        </div>

        <div class="flex justify-end gap-3">
          <button class="nm-btn nm-btn-ghost">Discard</button>
          <button class="nm-btn nm-btn-primary" @click="showToast('Settings saved successfully')">
            <CheckIcon class="w-4 h-4"/> Save Settings
          </button>
        </div>
      </div>

      <!-- Right sidebar -->
      <div class="space-y-4">
        <!-- System status -->
        <div class="nm-card p-5">
          <p class="nm-sec-title mb-3">System Status</p>
          <div class="space-y-2.5">
            <div v-for="s in systemStatus" :key="s.label" class="flex items-center justify-between">
              <div class="flex items-center gap-2">
                <div class="w-2 h-2 rounded-full" :class="s.ok ? 'bg-emerald-400' : 'bg-red-400'"/>
                <span class="text-sm">{{ s.label }}</span>
              </div>
              <span class="text-xs font-semibold" :class="s.ok ? 'text-emerald-600' : 'text-red-600'">
                {{ s.ok ? 'Operational' : 'Degraded' }}
              </span>
            </div>
          </div>
          <p class="text-xs mt-3 pt-3 border-t" style="border-color:var(--border); color:var(--muted)">All systems nominal</p>
        </div>

        <!-- Data sources -->
        <div class="nm-card p-5">
          <p class="nm-sec-title mb-3">Food Data Sources</p>
          <div class="space-y-3">
            <div v-for="src in dataSources" :key="src.name" class="flex items-start gap-2.5">
              <div class="w-6 h-6 rounded-md flex items-center justify-center flex-shrink-0 mt-0.5"
                   :style="{ background: src.color+'18' }">
                <CircleStackIcon class="w-3.5 h-3.5" :style="{ color: src.color }"/>
              </div>
              <div>
                <p class="text-sm font-semibold">{{ src.name }}</p>
                <p class="text-xs" style="color:var(--muted)">{{ src.desc }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Version -->
        <div class="nm-card p-5">
          <p class="nm-sec-title mb-3">Version Info</p>
          <div class="space-y-1.5 text-xs">
            <div class="flex justify-between"><span style="color:var(--muted)">App Version</span><span class="font-bold font-mono">v1.0.0</span></div>
            <div class="flex justify-between"><span style="color:var(--muted)">Framework</span><span class="font-bold">Nuxt 4 / Vue 3</span></div>
            <div class="flex justify-between"><span style="color:var(--muted)">Environment</span><span class="nm-badge badge-active py-0.5">Production</span></div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Security ─────────────────────────────── -->
    <div v-if="activeTab === 'security'" class="max-w-3xl space-y-5">
      <div class="nm-card p-6">
        <p class="nm-sec-title mb-1">Authentication & Access</p>
        <p class="text-sm mb-5" style="color:var(--muted)">Configure how users authenticate and access the system.</p>
        <div class="space-y-4">
          <div v-for="t in secToggles" :key="t.label" class="flex items-center justify-between py-3 border-b" style="border-color:var(--border)">
            <div>
              <p class="text-sm font-semibold">{{ t.label }}</p>
              <p class="text-xs mt-0.5" style="color:var(--muted)">{{ t.desc }}</p>
            </div>
            <div class="nm-toggle" :class="{ on: t.val }" @click="t.val = !t.val"/>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="nm-card p-6">
          <p class="nm-sec-title mb-4">PRC Verification Rules</p>
          <div class="space-y-3">
            <div>
              <label class="nm-label">License Validity Period</label>
              <select class="nm-input"><option>3 years (standard PRC)</option></select>
            </div>
            <div>
              <label class="nm-label">Verification Method</label>
              <select class="nm-input"><option>Manual Admin Review</option></select>
            </div>
            <div class="flex justify-end mt-2">
              <button class="nm-btn nm-btn-primary text-sm" @click="showToast('PRC rules saved')">Save Rules</button>
            </div>
          </div>
        </div>
        <div class="nm-card p-6">
          <p class="nm-sec-title mb-4">Session & Token</p>
          <div class="space-y-3">
            <div>
              <label class="nm-label">Session Timeout</label>
              <select class="nm-input"><option>30 minutes</option><option selected>1 hour</option></select>
            </div>
            <div>
              <label class="nm-label">Max Login Attempts</label>
              <input class="nm-input" type="number" value="5"/>
            </div>
            <div class="flex justify-end mt-2">
              <button class="nm-btn nm-btn-primary text-sm" @click="showToast('Session settings saved')">Save</button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ── Notifications ────────────────────────── -->
    <div v-if="activeTab === 'notifications'" class="max-w-2xl">
      <div class="nm-card p-6">
        <p class="nm-sec-title mb-1">Notification Preferences</p>
        <p class="text-sm mb-5" style="color:var(--muted)">Control when and how NutriMatch sends alerts.</p>
        <div class="space-y-6">
          <div v-for="group in notifGroups" :key="group.title">
            <p class="text-xs font-bold uppercase tracking-widest mb-3" style="color:var(--muted)">{{ group.title }}</p>
            <div class="space-y-3">
              <div v-for="n in group.items" :key="n.label"
                   class="flex items-center justify-between py-3 border-b" style="border-color:var(--border)">
                <div>
                  <p class="text-sm font-semibold">{{ n.label }}</p>
                  <p class="text-xs mt-0.5" style="color:var(--muted)">{{ n.desc }}</p>
                </div>
                <div class="nm-toggle" :class="{ on: n.val }" @click="n.val = !n.val"/>
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-end mt-5 pt-4 border-t" style="border-color:var(--border)">
          <button class="nm-btn nm-btn-primary" @click="showToast('Notification preferences saved')">Save Preferences</button>
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
import { Cog6ToothIcon, ShieldCheckIcon, BellIcon, CheckIcon, CheckCircleIcon, CircleStackIcon } from '@heroicons/vue/24/outline'

definePageMeta({ layout: 'admin' })

const activeTab = ref('general')
const toastVisible = ref(false)
const toastMsg = ref('')

function showToast(msg: string) {
  toastMsg.value = msg
  toastVisible.value = true
  setTimeout(() => { toastVisible.value = false }, 2600)
}

const stabs = [
  { val:'general',       label:'General',       icon: Cog6ToothIcon },
  { val:'security',      label:'Security',      icon: ShieldCheckIcon },
  { val:'notifications', label:'Notifications', icon: BellIcon },
]

const systemStatus = [
  { label:'API Gateway',         ok:true },
  { label:'Authentication',      ok:true },
  { label:'Database',            ok:true },
  { label:'File Storage',        ok:true },
  { label:'Email Notifications', ok:true },
  { label:'Payment Gateway',     ok:true },
]

const dataSources = [
  { name:'DOST-FNRI Philippine Food Tables', desc:'Localized food composition data', color:'#0d6b6b' },
  { name:'USDA FoodData Central',            desc:'International nutrient database', color:'#d97706' },
  { name:'FNRI Food Exchange Lists',         desc:'Diet exchange system for Filipinos', color:'#7c3aed' },
]

const secToggles = reactive([
  { label:'Two-Factor Authentication (2FA)', desc:'Require OTP for all admin logins', val:true },
  { label:'PRC License Auto-Expiry Check',  desc:'Automatically flag expired RND licenses', val:true },
  { label:'Force Password Reset (90 days)', desc:'Require password change every 90 days', val:false },
  { label:'Audit Log (All Actions)',         desc:'Log every user action for compliance', val:true },
  { label:'IP Whitelist Mode',               desc:'Restrict admin access to approved IPs', val:false },
])

const notifGroups = reactive([
  { title:'Client Alerts', items:[
    { label:'Appointment Reminders', desc:'Send 24h and 1h reminders to clients', val:true },
    { label:'Lab Result Updates',    desc:'Notify clients when new results are uploaded', val:true },
    { label:'Progress Reports',      desc:'Weekly summary of nutrition progress', val:false },
  ]},
  { title:'Dietitian Alerts', items:[
    { label:'New Patient Matched',   desc:'Notify RND when a new client is assigned', val:true },
    { label:'Missed Consultation',   desc:'Alert RND of no-shows or cancellations', val:true },
  ]},
  { title:'Admin Alerts', items:[
    { label:'Pending Verifications', desc:'Alert when new RND submits for verification', val:true },
    { label:'Payment Disputes',      desc:'Notify admin of flagged transactions', val:true },
    { label:'System Error Reports',  desc:'Email admin on critical system errors', val:true },
  ]},
])
</script>

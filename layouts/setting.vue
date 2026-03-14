<template>
  <div class="flex gap-6 min-h-[calc(100vh-56px-80px)]">

    <!-- Sidebar nav -->
    <aside class="flex-shrink-0 w-48">
      <nav class="sticky top-6 space-y-0.5">
        <button
          v-for="section in sections"
          :key="section.id"
          @click="activeSection = section.id"
          class="w-full flex items-center gap-2.5 px-3 py-2 rounded-sm text-left text-[11px] font-sans uppercase tracking-widest transition-colors"
          :class="activeSection === section.id
            ? 'bg-stone-900 text-[#F7F6F3]'
            : 'text-stone-400 hover:bg-white hover:text-stone-700 hover:border-stone-200'"
        >
          <component :is="section.icon" class="w-3.5 h-3.5 flex-shrink-0" />
          {{ section.label }}
        </button>
      </nav>
    </aside>

    <!-- Main panel -->
    <div class="flex-1 min-w-0 space-y-2.5">

      <!-- Profile -->
      <div v-if="activeSection === 'profile'" class="space-y-2.5">
        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Profile</p>
          <div class="flex items-center gap-4 pb-6 mb-6 border-b border-stone-100">
            <div class="flex items-center justify-center flex-shrink-0 font-sans text-base font-medium rounded-sm w-14 h-14 bg-stone-100 text-stone-600">TC</div>
            <div>
              <p class="font-sans text-sm font-medium text-stone-900">Tom Cook</p>
              <p class="text-[11px] font-sans text-stone-400 mt-0.5">Administrator</p>
            </div>
            <button class="ml-auto px-3 py-1.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors">Change photo</button>
          </div>
          <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">First name</label>
              <input v-model="profile.firstName" type="text" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
            </div>
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Last name</label>
              <input v-model="profile.lastName" type="text" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Email</label>
              <input v-model="profile.email" type="email" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Bio</label>
              <textarea v-model="profile.bio" rows="3" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors resize-none"></textarea>
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <button @click="saved = true" class="px-4 py-2 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors">Save changes</button>
          </div>
        </div>

        <!-- Danger zone -->
        <div class="p-6 bg-white border border-red-200 rounded-sm">
          <p class="text-[10px] font-sans font-medium text-red-400 uppercase tracking-widest mb-4">Danger zone</p>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-sans text-sm font-medium text-stone-900">Delete account</p>
              <p class="text-[11px] font-sans text-stone-400 mt-0.5">Permanently remove your account and all data.</p>
            </div>
            <button class="px-3 py-1.5 border border-red-200 text-[10px] font-sans uppercase tracking-widest text-red-400 rounded-sm hover:bg-red-50 hover:border-red-400 transition-colors flex-shrink-0 ml-4">Delete</button>
          </div>
        </div>
      </div>

      <!-- Account -->
      <div v-if="activeSection === 'account'" class="space-y-2.5">
        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Password</p>
          <div class="max-w-sm space-y-4">
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Current password</label>
              <input type="password" placeholder="••••••••" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
            </div>
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">New password</label>
              <input type="password" placeholder="••••••••" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
            </div>
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Confirm password</label>
              <input type="password" placeholder="••••••••" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
            </div>
          </div>
          <div class="flex justify-end mt-5">
            <button class="px-4 py-2 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors">Update password</button>
          </div>
        </div>

        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Two-factor authentication</p>
          <div class="flex items-center justify-between">
            <div>
              <p class="font-sans text-sm font-medium text-stone-900">Authenticator app</p>
              <p class="text-[11px] font-sans text-stone-400 mt-0.5">Use an authenticator app to generate one-time codes.</p>
            </div>
            <button
              @click="twoFactor = !twoFactor"
              class="relative inline-flex flex-shrink-0 h-5 transition-colors duration-200 border-2 rounded-full cursor-pointer w-9"
              :class="twoFactor ? 'bg-stone-900 border-stone-900' : 'bg-stone-200 border-stone-200'"
            >
              <span
                class="inline-block h-3.5 w-3.5 rounded-full bg-white transform transition-transform duration-200 mt-px"
                :class="twoFactor ? 'translate-x-4' : 'translate-x-0.5'"
              ></span>
            </button>
          </div>
        </div>

        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Active sessions</p>
          <div class="divide-y divide-stone-100">
            <div v-for="session in sessions" :key="session.id" class="flex items-center justify-between py-3">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center flex-shrink-0 rounded-sm w-7 h-7 bg-stone-100">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#888780" stroke-width="1.5">
                    <rect x="1" y="3" width="14" height="10" rx="1"/><path d="M5 13h6M8 10v3"/>
                  </svg>
                </div>
                <div>
                  <p class="font-sans text-xs font-medium text-stone-900">{{ session.device }}</p>
                  <p class="text-[10px] font-sans text-stone-400">{{ session.location }} · {{ session.time }}</p>
                </div>
              </div>
              <span v-if="session.current" class="text-[10px] font-sans bg-green-50 text-green-700 px-2 py-0.5 rounded-sm uppercase tracking-wider">Current</span>
              <button v-else class="text-[10px] font-sans text-stone-300 uppercase tracking-widest hover:text-red-500 transition-colors">Revoke</button>
            </div>
          </div>
        </div>
      </div>

      <!-- Notifications -->
      <div v-if="activeSection === 'notifications'" class="space-y-2.5">
        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Email notifications</p>
          <div class="divide-y divide-stone-100">
            <div v-for="notif in emailNotifs" :key="notif.id" class="flex items-center justify-between py-3.5">
              <div>
                <p class="font-sans text-sm font-medium text-stone-900">{{ notif.label }}</p>
                <p class="text-[11px] font-sans text-stone-400 mt-0.5">{{ notif.description }}</p>
              </div>
              <button
                @click="notif.enabled = !notif.enabled"
                class="relative inline-flex flex-shrink-0 h-5 ml-6 transition-colors duration-200 border-2 rounded-full cursor-pointer w-9"
                :class="notif.enabled ? 'bg-stone-900 border-stone-900' : 'bg-stone-200 border-stone-200'"
              >
                <span
                  class="inline-block h-3.5 w-3.5 rounded-full bg-white transform transition-transform duration-200 mt-px"
                  :class="notif.enabled ? 'translate-x-4' : 'translate-x-0.5'"
                ></span>
              </button>
            </div>
          </div>
        </div>

        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Digest frequency</p>
          <div class="flex flex-wrap gap-2">
            <button
              v-for="freq in ['Realtime', 'Daily', 'Weekly', 'Never']"
              :key="freq"
              @click="digestFreq = freq"
              class="px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest rounded-sm border transition-colors"
              :class="digestFreq === freq
                ? 'bg-stone-900 text-[#F7F6F3] border-stone-900'
                : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'"
            >{{ freq }}</button>
          </div>
        </div>
      </div>

      <!-- Appearance -->
      <div v-if="activeSection === 'appearance'" class="space-y-2.5">
        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Theme</p>
          <div class="grid max-w-sm grid-cols-3 gap-3">
            <button
              v-for="theme in themes"
              :key="theme.id"
              @click="selectedTheme = theme.id"
              class="flex flex-col items-center gap-2 p-3 transition-colors border rounded-sm"
              :class="selectedTheme === theme.id ? 'border-stone-900' : 'border-stone-200 hover:border-stone-400'"
            >
              <div class="flex w-full h-10 overflow-hidden border rounded-sm border-stone-100">
                <div class="w-1/3" :class="theme.sidebar"></div>
                <div class="flex-1" :class="theme.main"></div>
              </div>
              <p class="text-[10px] font-sans uppercase tracking-widest" :class="selectedTheme === theme.id ? 'text-stone-900 font-medium' : 'text-stone-400'">{{ theme.label }}</p>
            </button>
          </div>
        </div>

        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Density</p>
          <div class="flex gap-2">
            <button
              v-for="d in ['Compact', 'Default', 'Comfortable']"
              :key="d"
              @click="density = d"
              class="px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest rounded-sm border transition-colors"
              :class="density === d
                ? 'bg-stone-900 text-[#F7F6F3] border-stone-900'
                : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'"
            >{{ d }}</button>
          </div>
        </div>
      </div>

      <!-- Billing -->
      <div v-if="activeSection === 'billing'" class="space-y-2.5">
        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Current plan</p>
          <div class="flex items-center justify-between pb-5 border-b border-stone-100">
            <div>
              <p class="font-serif text-lg font-normal text-stone-900">Pro plan</p>
              <p class="text-[11px] font-sans text-stone-400 mt-0.5">$49 / month · Renews Apr 15, 2026</p>
            </div>
            <button class="px-3 py-1.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors">Upgrade</button>
          </div>
          <div class="grid grid-cols-3 gap-4 pt-5">
            <div v-for="usage in planUsage" :key="usage.label">
              <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest mb-1.5">{{ usage.label }}</p>
              <div class="w-full h-0.5 bg-stone-100 rounded-sm overflow-hidden mb-1.5">
                <div class="h-full rounded-sm bg-stone-900" :style="{ width: usage.pct + '%' }"></div>
              </div>
              <p class="text-[10px] font-sans text-stone-500">{{ usage.used }} / {{ usage.total }}</p>
            </div>
          </div>
        </div>

        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Payment method</p>
          <div class="flex items-center justify-between px-4 py-3 border rounded-sm border-stone-100">
            <div class="flex items-center gap-3">
              <div class="flex items-center justify-center w-8 h-5 rounded-sm bg-stone-900">
                <p class="text-[8px] font-sans font-medium text-white tracking-wider">VISA</p>
              </div>
              <p class="font-sans text-sm text-stone-700">•••• •••• •••• 4242</p>
            </div>
            <p class="text-[11px] font-sans text-stone-400">Exp 08/27</p>
          </div>
          <button class="mt-3 text-[10px] font-sans text-stone-400 uppercase tracking-widest border-b border-stone-200 pb-px hover:text-stone-700 hover:border-stone-700 transition-colors">Update card</button>
        </div>

        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Billing history</p>
          <div class="divide-y divide-stone-100">
            <div v-for="inv in invoices" :key="inv.id" class="flex items-center justify-between py-3">
              <div>
                <p class="font-sans text-xs font-medium text-stone-900">{{ inv.date }}</p>
                <p class="text-[10px] font-sans text-stone-400 mt-0.5">{{ inv.description }}</p>
              </div>
              <div class="flex items-center gap-3">
                <p class="font-sans text-xs text-stone-700">{{ inv.amount }}</p>
                <span class="text-[10px] font-sans bg-green-50 text-green-700 px-2 py-0.5 rounded-sm uppercase tracking-wider">Paid</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Integrations -->
      <div v-if="activeSection === 'integrations'" class="space-y-2.5">
        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-5">Connected apps</p>
          <div class="divide-y divide-stone-100">
            <div v-for="app in integrations" :key="app.id" class="flex items-center justify-between py-4">
              <div class="flex items-center gap-3">
                <div class="flex items-center justify-center flex-shrink-0 text-base border rounded-sm w-9 h-9 border-stone-200">
                  {{ app.emoji }}
                </div>
                <div>
                  <p class="font-sans text-sm font-medium text-stone-900">{{ app.name }}</p>
                  <p class="text-[11px] font-sans text-stone-400 mt-0.5">{{ app.description }}</p>
                </div>
              </div>
              <button
                @click="app.connected = !app.connected"
                class="px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest rounded-sm border transition-colors flex-shrink-0 ml-4"
                :class="app.connected
                  ? 'bg-stone-900 text-[#F7F6F3] border-stone-900 hover:bg-stone-700'
                  : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'"
              >{{ app.connected ? 'Connected' : 'Connect' }}</button>
            </div>
          </div>
        </div>

        <div class="p-6 bg-white border rounded-sm border-stone-200">
          <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">API access</p>
          <div class="flex items-center gap-2">
            <input
              type="text"
              value="sk-live-••••••••••••••••••••••••••••••••"
              readonly
              class="flex-1 px-3 py-2.5 text-sm font-mono text-stone-400 bg-stone-50 border border-stone-200 rounded-sm outline-none"
            />
            <button class="px-3 py-2.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors flex-shrink-0">Copy</button>
            <button class="px-3 py-2.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-red-300 hover:text-red-500 transition-colors flex-shrink-0">Regenerate</button>
          </div>
        </div>
      </div>

      <!-- Save toast -->
      <transition
        enter-active-class="transition-all duration-300"
        enter-from-class="translate-y-2 opacity-0"
        enter-to-class="translate-y-0 opacity-100"
        leave-active-class="transition-all duration-200"
        leave-from-class="translate-y-0 opacity-100"
        leave-to-class="translate-y-2 opacity-0"
      >
        <div
          v-if="saved"
          class="fixed bottom-6 right-6 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans uppercase tracking-widest px-4 py-2.5 rounded-sm z-50"
        >Changes saved</div>
      </transition>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, defineComponent, h } from 'vue'

const activeSection = ref('profile')
const saved = ref(false)
const twoFactor = ref(false)
const digestFreq = ref('Daily')
const selectedTheme = ref('light')
const density = ref('Default')

watch(saved, (val) => {
  if (val) setTimeout(() => { saved.value = false }, 2500)
})

const IconUser = defineComponent({ render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('circle', { cx: '8', cy: '5', r: '3' }), h('path', { d: 'M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6' })]) })
const IconLock = defineComponent({ render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('rect', { x: '3', y: '7', width: '10', height: '8', rx: '1' }), h('path', { d: 'M5 7V5a3 3 0 016 0v2' })]) })
const IconBell = defineComponent({ render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('path', { d: 'M8 1a5 5 0 015 5v3l1 2H2l1-2V6a5 5 0 015-5z' }), h('path', { d: 'M6.5 13.5a1.5 1.5 0 003 0' })]) })
const IconPaint = defineComponent({ render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('circle', { cx: '8', cy: '8', r: '6' }), h('circle', { cx: '8', cy: '8', r: '2' })]) })
const IconCard = defineComponent({ render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('rect', { x: '1', y: '4', width: '14', height: '10', rx: '1' }), h('path', { d: 'M1 8h14' })]) })
const IconPlug = defineComponent({ render: () => h('svg', { viewBox: '0 0 16 16', fill: 'none', stroke: 'currentColor', 'stroke-width': '1.5' }, [h('path', { d: 'M6 2v4M10 2v4M5 6h6l-1 5H6L5 6z' }), h('path', { d: 'M8 11v3' })]) })

const sections = [
  { id: 'profile', label: 'Profile', icon: IconUser },
  { id: 'account', label: 'Account', icon: IconLock },
  { id: 'notifications', label: 'Alerts', icon: IconBell },
  { id: 'appearance', label: 'Appearance', icon: IconPaint },
  { id: 'billing', label: 'Billing', icon: IconCard },
  { id: 'integrations', label: 'Integrations', icon: IconPlug },
]

const profile = ref({ firstName: 'Tom', lastName: 'Cook', email: 'tom@example.com', bio: 'Administrator at S.' })

const sessions = [
  { id: 1, device: 'Chrome on macOS', location: 'Cebu, PH', time: 'Active now', current: true },
  { id: 2, device: 'Safari on iPhone', location: 'Cebu, PH', time: '2 hr ago', current: false },
  { id: 3, device: 'Chrome on Windows', location: 'Manila, PH', time: 'Yesterday', current: false },
]

const emailNotifs = ref([
  { id: 1, label: 'Project updates', description: 'When a project status changes.', enabled: true },
  { id: 2, label: 'Team activity', description: 'When a team member joins or leaves.', enabled: true },
  { id: 3, label: 'Document comments', description: 'When someone comments on a document.', enabled: false },
  { id: 4, label: 'Billing alerts', description: 'Invoices, renewals, and payment failures.', enabled: true },
  { id: 5, label: 'Security alerts', description: 'New sign-ins and password changes.', enabled: true },
])

const themes = [
  { id: 'light', label: 'Light', sidebar: 'bg-stone-900', main: 'bg-stone-50' },
  { id: 'dark', label: 'Dark', sidebar: 'bg-stone-950', main: 'bg-stone-800' },
  { id: 'warm', label: 'Warm', sidebar: 'bg-stone-800', main: 'bg-amber-50' },
]

const planUsage = [
  { label: 'Team members', used: '8', total: '20', pct: 40 },
  { label: 'Storage', used: '12 GB', total: '50 GB', pct: 24 },
  { label: 'Projects', used: '38', total: '100', pct: 38 },
]

const invoices = [
  { id: 1, date: 'Mar 15, 2026', description: 'Pro plan — monthly', amount: '$49.00' },
  { id: 2, date: 'Feb 15, 2026', description: 'Pro plan — monthly', amount: '$49.00' },
  { id: 3, date: 'Jan 15, 2026', description: 'Pro plan — monthly', amount: '$49.00' },
]

const integrations = ref([
  { id: 1, emoji: '🔗', name: 'Slack', description: 'Send notifications to Slack channels.', connected: true },
  { id: 2, emoji: '📁', name: 'Google Drive', description: 'Attach Drive files to documents.', connected: true },
  { id: 3, emoji: '📅', name: 'Google Calendar', description: 'Sync events with your calendar.', connected: false },
  { id: 4, emoji: '🐙', name: 'GitHub', description: 'Link commits and PRs to projects.', connected: false },
  { id: 5, emoji: '📊', name: 'Notion', description: 'Import and sync Notion pages.', connected: false },
])
</script>
<template>
  <NuxtLayout>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800">System Settings</h2>
      <p class="text-sm text-slate-500 mt-0.5">Manage your business configuration and preferences</p>
    </div>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.show" :class="['toast', toast.type === 'success' ? 'toast-success' : 'toast-error']">
        {{ toast.message }}
      </div>
    </Transition>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Main Settings -->
      <div class="xl:col-span-2 space-y-6">

        <!-- Business Info -->
        <div class="card">
          <h3 class="section-title mb-5">Business Information</h3>
          <form @submit.prevent="saveSettings">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="form-group">
                <label>Business Name</label>
                <input v-model="bizForm.businessName" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Owner Name</label>
                <input v-model="bizForm.ownerName" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Contact Number</label>
                <input v-model="bizForm.contact" type="text" class="form-input" />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input v-model="bizForm.email" type="email" class="form-input" />
              </div>
              <div class="form-group sm:col-span-2">
                <label>Shop Address</label>
                <input v-model="bizForm.address" type="text" class="form-input" />
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button type="submit" class="btn-teal">Save Changes</button>
            </div>
          </form>
        </div>

        <!-- Notification Preferences -->
        <div class="card">
          <h3 class="section-title mb-5">Notification Preferences</h3>
          <div class="space-y-4">
            <div v-for="pref in notifPrefs" :key="pref.key" class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div>
                <p class="text-sm font-semibold text-slate-800">{{ pref.label }}</p>
                <p class="text-xs text-slate-500">{{ pref.desc }}</p>
              </div>
              <button @click="pref.enabled = !pref.enabled" :class="['toggle', pref.enabled ? 'toggle-on' : 'toggle-off']">
                <span :class="['toggle-knob', pref.enabled ? 'translate-x-5' : 'translate-x-1']"></span>
              </button>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button @click="saveNotifPrefs" class="btn-teal">Save Preferences</button>
          </div>
        </div>
      </div>

      <!-- Sidebar cards -->
      <div class="space-y-6">
        <!-- Subscription Plan (real plan from session) -->
        <div class="card plan-card-premium" v-if="isPremium">
          <div class="plan-badge-premium">CURRENT PLAN</div>
          <h3 class="text-xl font-extrabold text-white mt-2">Premium 👑</h3>
          <p class="text-xs mt-1" style="color:#DCB03A">₱499 / month</p>
          <ul class="mt-4 space-y-2 text-sm text-white/80">
            <li class="flex items-center gap-2"><span style="color:#009E97">✓</span> All Core Modules</li>
            <li class="flex items-center gap-2"><span style="color:#009E97">✓</span> Create &amp; View Posts</li>
            <li class="flex items-center gap-2"><span style="color:#009E97">✓</span> Profile Customization</li>
            <li class="flex items-center gap-2"><span style="color:#009E97">✓</span> Team Management</li>
          </ul>
          <div class="mt-4 pt-4 border-t border-white/20">
            <span class="inline-block text-xs font-bold px-2 py-1 rounded-full" style="background:rgba(0,158,151,0.2);color:#009E97">● Active</span>
          </div>
        </div>
        <div class="card plan-card-basic" v-else>
          <div class="plan-badge-basic">CURRENT PLAN</div>
          <h3 class="text-xl font-extrabold text-white mt-2">Basic 🥉</h3>
          <p class="text-xs mt-1 text-slate-400">Free</p>
          <ul class="mt-4 space-y-2 text-sm text-white/80">
            <li class="flex items-center gap-2"><span style="color:#009E97">✓</span> Dashboard</li>
            <li class="flex items-center gap-2"><span style="color:#009E97">✓</span> Customers &amp; Orders</li>
            <li class="flex items-center gap-2"><span style="color:#009E97">✓</span> Inventory &amp; Suppliers</li>
            <li class="flex items-center gap-2"><span style="color:#009E97">✓</span> Appointments &amp; Billing</li>
            <li class="flex items-center gap-2 opacity-40"><span>✗</span> Posts (Premium only)</li>
            <li class="flex items-center gap-2 opacity-40"><span>✗</span> Profile customization</li>
          </ul>
          <button @click="showUpgradeToast" class="w-full mt-4 py-2 rounded-lg font-semibold text-sm transition-all" style="background:rgba(0,158,151,0.15);color:#009E97;border:1px solid rgba(0,158,151,0.3)">
            Upgrade to Premium
          </button>
        </div>

        <!-- System Info -->
        <div class="card">
          <h3 class="section-title mb-3">System Info</h3>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between"><dt class="text-slate-500">Version</dt><dd class="font-semibold text-slate-700">v1.0.0</dd></div>
            <div class="flex justify-between"><dt class="text-slate-500">Plan</dt><dd class="font-semibold" :style="isPremium ? 'color:#DCB03A' : 'color:#64748B'">{{ isPremium ? 'Premium' : 'Basic' }}</dd></div>
            <div class="flex justify-between"><dt class="text-slate-500">Member since</dt><dd class="font-semibold text-slate-700">{{ user?.joinedAt ?? '—' }}</dd></div>
          </dl>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
definePageMeta({ middleware: ['auth'] })
const { user, isPremium } = useAuth()

// ── Toast ──────────────────────────────────────────────
const toast = reactive({ show: false, message: '', type: 'success' as 'success' | 'error' })
let toastTimer: ReturnType<typeof setTimeout>
function showToast(message: string, type: 'success' | 'error' = 'success') {
  clearTimeout(toastTimer)
  toast.message = message
  toast.type = type
  toast.show = true
  toastTimer = setTimeout(() => { toast.show = false }, 3000)
}

// ── Business Info form ──────────────────────────────────
const BIZ_KEY = 'tailortrack_settings'
function loadBiz() {
  if (!import.meta.client) return {}
  try { return JSON.parse(localStorage.getItem(BIZ_KEY) ?? '{}') } catch { return {} }
}
const saved = loadBiz()
const bizForm = reactive({
  businessName: saved.businessName ?? 'SATURA Tailoring',
  ownerName:    saved.ownerName    ?? (user.value?.name ?? 'Admin'),
  contact:      saved.contact      ?? '09171234567',
  email:        saved.email        ?? (user.value?.email ?? 'admin@satura.com'),
  address:      saved.address      ?? '123 Rizal St., Brgy. San Antonio, Quezon City',
})

function saveSettings() {
  if (import.meta.client) localStorage.setItem(BIZ_KEY, JSON.stringify({ ...bizForm }))
  showToast('Business settings saved!')
}

// ── Notification prefs ──────────────────────────────────
const notifPrefs = reactive([
  { key: 'low_stock',   label: 'Low Stock Alerts',          desc: 'Get notified when materials fall below reorder level', enabled: true },
  { key: 'order_ready', label: 'Order Ready Notifications', desc: 'Notify customer when job order is complete',           enabled: true },
  { key: 'appointment', label: 'Appointment Reminders',     desc: 'Send reminders 24h before appointments',              enabled: false },
  { key: 'invoice_due', label: 'Invoice Due Alerts',        desc: 'Alert when an invoice is about to be overdue',        enabled: true },
])

function saveNotifPrefs() {
  showToast('Notification preferences saved!')
}

function showUpgradeToast() {
  showToast('Premium upgrade is not available in demo mode.', 'error')
}
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.section-title { font-size: 1rem; font-weight: 700; color: #0F172A; }
.form-group label { display: block; font-size: 0.8rem; font-weight: 600; color: #64748B; margin-bottom: 0.375rem; }
.form-input { width: 100%; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 0.625rem; padding: 0.6rem 0.875rem; font-size: 0.875rem; color: #0F172A; outline: none; transition: border-color 0.15s; }
.form-input:focus { border-color: #009E97; box-shadow: 0 0 0 3px rgba(0,158,151,0.14); }
.btn-teal { background: linear-gradient(135deg, #009E97, #007A75); color: #fff; font-weight: 700; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; transition: all 0.15s; }
.btn-teal:hover { box-shadow: 0 4px 12px rgba(0,158,151,0.35); transform: translateY(-1px); }
.toggle { width: 44px; height: 24px; border-radius: 9999px; border: none; cursor: pointer; position: relative; display: flex; align-items: center; transition: background 0.2s; flex-shrink: 0; }
.toggle-on  { background: #009E97; }
.toggle-off { background: #CBD5E1; }
.toggle-knob { width: 18px; height: 18px; border-radius: 50%; background: white; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); position: absolute; }
.plan-card-premium { background: linear-gradient(135deg, #1A2026, #1C3040); border: 1px solid rgba(0,158,151,0.3); }
.plan-card-basic   { background: linear-gradient(135deg, #1A2026, #212B34); border: 1px solid rgba(255,255,255,0.08); }
.plan-badge-premium { display: inline-block; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; color: #DCB03A; background: rgba(220,176,58,0.15); border: 1px solid rgba(220,176,58,0.3); padding: 0.2rem 0.625rem; border-radius: 9999px; }
.plan-badge-basic   { display: inline-block; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; color: #94A3B8; background: rgba(148,163,184,0.1); border: 1px solid rgba(148,163,184,0.2); padding: 0.2rem 0.625rem; border-radius: 9999px; }
/* Toast */
.toast { position: fixed; top: 1.25rem; right: 1.25rem; z-index: 9999; padding: 0.75rem 1.25rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.toast-success { background: #009E97; color: white; }
.toast-error   { background: #DC2626; color: white; }
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-12px); }
</style>

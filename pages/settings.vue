<template>
  <NuxtLayout>
    <div class="settings-page">

      <!-- ── PAGE HEADER ── -->
      <div class="page-header">
        <div>
          <p class="page-eyebrow">System</p>
          <h1 class="page-title">Settings</h1>
        </div>
        <button class="btn-gold" @click="saveAll">Save All Changes</button>
      </div>

      <!-- ── LAYOUT ── -->
      <div class="settings-layout">

        <!-- Left: Sidebar Nav -->
        <div class="settings-nav">
          <button
            v-for="section in sections"
            :key="section.key"
            :class="['snav-item', activeSection === section.key ? 'active' : '']"
            @click="activeSection = section.key"
          >
            <div class="snav-icon" :style="{ background: activeSection === section.key ? '#c9a96e18' : '' }">
              <component :is="section.icon" class="size-4" :style="{ color: activeSection === section.key ? '#c9a96e' : '#9ca3af' }" />
            </div>
            <div class="snav-text">
              <p class="snav-label">{{ section.label }}</p>
              <p class="snav-sub">{{ section.sub }}</p>
            </div>
            <ChevronRightIcon class="size-3.5 snav-arrow" :class="{ active: activeSection === section.key }" />
          </button>
        </div>

        <!-- Right: Content -->
        <div class="settings-content">

          <!-- ══════════════════════ -->
          <!--   GENERAL             -->
          <!-- ══════════════════════ -->
          <div v-if="activeSection === 'general'" class="section-content">
            <div class="section-header">
              <h2 class="section-title">General Settings</h2>
              <p class="section-desc">Basic information about your spa business.</p>
            </div>

            <div class="card">
              <h3 class="card-subtitle">Business Information</h3>
              <div class="form-grid">
                <div class="form-group form-full">
                  <label>Business Name</label>
                  <input v-model="general.businessName" type="text" placeholder="e.g. Servora Spa & Wellness" />
                </div>
                <div class="form-group">
                  <label>Business Email</label>
                  <input v-model="general.email" type="email" placeholder="hello@servora.com" />
                </div>
                <div class="form-group">
                  <label>Phone Number</label>
                  <input v-model="general.phone" type="text" placeholder="(082) 123-4567" />
                </div>
                <div class="form-group form-full">
                  <label>Address</label>
                  <input v-model="general.address" type="text" placeholder="123 Wellness St., Davao City" />
                </div>
                <div class="form-group">
                  <label>City</label>
                  <input v-model="general.city" type="text" placeholder="Davao City" />
                </div>
                <div class="form-group">
                  <label>Country</label>
                  <select v-model="general.country">
                    <option>Philippines</option>
                    <option>United States</option>
                    <option>Singapore</option>
                  </select>
                </div>
                <div class="form-group form-full">
                  <label>Business Description</label>
                  <textarea v-model="general.description" rows="3" placeholder="Tell clients about your spa..." />
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <h3 class="card-subtitle">Operating Hours</h3>
              <div class="hours-grid">
                <div v-for="day in operatingHours" :key="day.day" class="hours-row">
                  <div class="hours-day-wrap">
                    <div class="toggle-switch" :class="{ on: day.open }" @click="day.open = !day.open">
                      <div class="toggle-thumb"></div>
                    </div>
                    <span class="hours-day" :class="{ closed: !day.open }">{{ day.day }}</span>
                  </div>
                  <div class="hours-inputs" :class="{ disabled: !day.open }">
                    <input type="time" v-model="day.from" :disabled="!day.open" />
                    <span class="hours-to">to</span>
                    <input type="time" v-model="day.to" :disabled="!day.open" />
                  </div>
                  <span v-if="!day.open" class="closed-badge">Closed</span>
                </div>
              </div>
            </div>
          </div>

          <!-- ══════════════════════ -->
          <!--   BOOKING             -->
          <!-- ══════════════════════ -->
          <div v-if="activeSection === 'booking'" class="section-content">
            <div class="section-header">
              <h2 class="section-title">Booking Settings</h2>
              <p class="section-desc">Control how clients book appointments.</p>
            </div>

            <div class="card">
              <h3 class="card-subtitle">Appointment Rules</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label>Minimum Booking Notice</label>
                  <select v-model="booking.minNotice">
                    <option>1 hour</option>
                    <option>2 hours</option>
                    <option>6 hours</option>
                    <option>1 day</option>
                    <option>2 days</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Maximum Advance Booking</label>
                  <select v-model="booking.maxAdvance">
                    <option>1 week</option>
                    <option>2 weeks</option>
                    <option>1 month</option>
                    <option>3 months</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Slot Duration</label>
                  <select v-model="booking.slotDuration">
                    <option>15 mins</option>
                    <option>30 mins</option>
                    <option>1 hour</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Buffer Between Sessions</label>
                  <select v-model="booking.buffer">
                    <option>None</option>
                    <option>10 mins</option>
                    <option>15 mins</option>
                    <option>30 mins</option>
                  </select>
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <h3 class="card-subtitle">Cancellation Policy</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label>Free Cancellation Window</label>
                  <select v-model="booking.cancelWindow">
                    <option>1 hour before</option>
                    <option>2 hours before</option>
                    <option>6 hours before</option>
                    <option>24 hours before</option>
                    <option>48 hours before</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>Late Cancellation Fee</label>
                  <div class="input-prefix-wrap">
                    <span class="input-prefix">₱</span>
                    <input v-model="booking.cancelFee" type="number" placeholder="0" />
                  </div>
                </div>
                <div class="form-group form-full">
                  <label>Cancellation Policy Note</label>
                  <textarea v-model="booking.cancelNote" rows="2" placeholder="e.g. Cancellations made less than 24 hours before will incur a fee..." />
                </div>
              </div>
            </div>

            <!-- Toggle options -->
            <div class="card mt-4">
              <h3 class="card-subtitle">Booking Options</h3>
              <div class="toggle-list">
                <div v-for="opt in bookingToggles" :key="opt.key" class="toggle-item">
                  <div class="toggle-info">
                    <p class="toggle-label">{{ opt.label }}</p>
                    <p class="toggle-sub">{{ opt.sub }}</p>
                  </div>
                  <div class="toggle-switch" :class="{ on: booking[opt.key] }" @click="booking[opt.key] = !booking[opt.key]">
                    <div class="toggle-thumb"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ══════════════════════ -->
          <!--   PAYMENTS            -->
          <!-- ══════════════════════ -->
          <div v-if="activeSection === 'payments'" class="section-content">
            <div class="section-header">
              <h2 class="section-title">Payment Settings</h2>
              <p class="section-desc">Configure accepted payment methods and billing.</p>
            </div>

            <div class="card">
              <h3 class="card-subtitle">Payment Methods</h3>
              <div class="payment-methods">
                <div v-for="pm in paymentMethods" :key="pm.key" class="pm-card" :class="{ active: pm.enabled }">
                  <div class="pm-top">
                    <span class="pm-emoji">{{ pm.emoji }}</span>
                    <div class="toggle-switch sm" :class="{ on: pm.enabled }" @click="pm.enabled = !pm.enabled">
                      <div class="toggle-thumb"></div>
                    </div>
                  </div>
                  <p class="pm-name">{{ pm.name }}</p>
                  <p class="pm-status" :class="pm.enabled ? 'on' : 'off'">{{ pm.enabled ? 'Enabled' : 'Disabled' }}</p>
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <h3 class="card-subtitle">Tax & Billing</h3>
              <div class="form-grid">
                <div class="form-group">
                  <label>Currency</label>
                  <select v-model="payments.currency">
                    <option value="PHP">Philippine Peso (₱)</option>
                    <option value="USD">US Dollar ($)</option>
                  </select>
                </div>
                <div class="form-group">
                  <label>VAT / Tax Rate (%)</label>
                  <input v-model="payments.taxRate" type="number" placeholder="12" />
                </div>
                <div class="form-group">
                  <label>Business TIN</label>
                  <input v-model="payments.tin" type="text" placeholder="e.g. 123-456-789" />
                </div>
                <div class="form-group">
                  <label>Invoice Prefix</label>
                  <input v-model="payments.invoicePrefix" type="text" placeholder="e.g. SRV-" />
                </div>
              </div>
            </div>
          </div>

          <!-- ══════════════════════ -->
          <!--   STAFF               -->
          <!-- ══════════════════════ -->
          <div v-if="activeSection === 'staff'" class="section-content">
            <div class="section-header">
              <h2 class="section-title">Staff Settings</h2>
              <p class="section-desc">Manage roles and staff permissions.</p>
            </div>

            <div class="card">
              <h3 class="card-subtitle">Roles & Permissions</h3>
              <div class="roles-table">
                <div class="roles-header">
                  <span>Permission</span>
                  <span v-for="role in roles" :key="role" class="role-col">{{ role }}</span>
                </div>
                <div v-for="perm in permissions" :key="perm.key" class="roles-row">
                  <div class="perm-info">
                    <p class="perm-label">{{ perm.label }}</p>
                    <p class="perm-sub">{{ perm.sub }}</p>
                  </div>
                  <div v-for="role in roles" :key="role" class="role-col">
                    <div
                      :class="['perm-check', rolePerms[role][perm.key] ? 'on' : 'off']"
                      @click="rolePerms[role][perm.key] = !rolePerms[role][perm.key]"
                    >
                      <CheckIcon v-if="rolePerms[role][perm.key]" class="size-3" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- ══════════════════════ -->
          <!--   SYSTEM              -->
          <!-- ══════════════════════ -->
          <div v-if="activeSection === 'system'" class="section-content">
            <div class="section-header">
              <h2 class="section-title">System Settings</h2>
              <p class="section-desc">Advanced system configuration and data management.</p>
            </div>

            <div class="card">
              <h3 class="card-subtitle">Data Management</h3>
              <div class="system-actions">
                <div class="sys-action-item">
                  <div class="sys-action-info">
                    <p class="sys-action-label">Export All Data</p>
                    <p class="sys-action-sub">Download a full backup of all your spa data as CSV.</p>
                  </div>
                  <button class="btn-outline">
                    <ArrowDownTrayIcon class="size-4" /> Export CSV
                  </button>
                </div>
                <div class="sys-action-item">
                  <div class="sys-action-info">
                    <p class="sys-action-label">Export Reports</p>
                    <p class="sys-action-sub">Download all financial and appointment reports as PDF.</p>
                  </div>
                  <button class="btn-outline">
                    <ArrowDownTrayIcon class="size-4" /> Export PDF
                  </button>
                </div>
                <div class="sys-action-item danger-item">
                  <div class="sys-action-info">
                    <p class="sys-action-label danger-label">Clear All Data</p>
                    <p class="sys-action-sub">Permanently delete all records. This cannot be undone.</p>
                  </div>
                  <button class="btn-danger-outline" @click="showClearConfirm = true">
                    <TrashIcon class="size-4" /> Clear Data
                  </button>
                </div>
              </div>
            </div>

            <div class="card mt-4">
              <h3 class="card-subtitle">System Information</h3>
              <ul class="sys-info-list">
                <li class="sys-info-item">
                  <span class="sys-info-label">App Version</span>
                  <span class="sys-info-val">Servora v1.0.0</span>
                </li>
                <li class="sys-info-item">
                  <span class="sys-info-label">Environment</span>
                  <span class="status-chip active">Production</span>
                </li>
                <li class="sys-info-item">
                  <span class="sys-info-label">Last Backup</span>
                  <span class="sys-info-val">Mar 15, 2026 — 6:00 AM</span>
                </li>
                <li class="sys-info-item">
                  <span class="sys-info-label">Framework</span>
                  <span class="sys-info-val">Nuxt 3 / Vue 3</span>
                </li>
                <li class="sys-info-item">
                  <span class="sys-info-label">Database</span>
                  <span class="sys-info-val">PostgreSQL 15</span>
                </li>
              </ul>
            </div>

            <!-- Danger Zone -->
            <div class="card mt-4 danger-zone">
              <h3 class="card-subtitle danger-label">⚠️ Danger Zone</h3>
              <div class="system-actions">
                <div class="sys-action-item">
                  <div class="sys-action-info">
                    <p class="sys-action-label danger-label">Reset to Factory Settings</p>
                    <p class="sys-action-sub">Resets all settings to default. Your data will NOT be deleted.</p>
                  </div>
                  <button class="btn-danger-outline" @click="showResetConfirm = true">Reset Settings</button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- ── CLEAR DATA CONFIRM ── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showClearConfirm" class="modal-backdrop" @click.self="showClearConfirm = false">
          <div class="modal modal-sm">
            <div class="modal-header">
              <h2 class="modal-title">Clear All Data</h2>
              <button class="modal-close" @click="showClearConfirm = false"><XMarkIcon class="size-5" /></button>
            </div>
            <div class="modal-body">
              <div class="delete-icon-wrap"><TrashIcon class="size-8" style="color:#c0725a" /></div>
              <p class="delete-msg">Are you sure? This will permanently delete <strong>all records</strong> including clients, appointments, and reports. This <strong>cannot be undone.</strong></p>
              <div class="confirm-input-wrap">
                <label>Type <strong>DELETE</strong> to confirm</label>
                <input v-model="confirmText" type="text" placeholder="DELETE" class="confirm-input" />
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showClearConfirm = false">Cancel</button>
              <button class="btn-danger" :disabled="confirmText !== 'DELETE'" @click="clearData">Yes, Delete Everything</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── RESET CONFIRM ── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showResetConfirm" class="modal-backdrop" @click.self="showResetConfirm = false">
          <div class="modal modal-sm">
            <div class="modal-header">
              <h2 class="modal-title">Reset Settings</h2>
              <button class="modal-close" @click="showResetConfirm = false"><XMarkIcon class="size-5" /></button>
            </div>
            <div class="modal-body">
              <div class="delete-icon-wrap"><Cog6ToothIcon class="size-8" style="color:#c9a96e" /></div>
              <p class="delete-msg">This will reset all settings to their default values. Your client and appointment data will <strong>not</strong> be affected.</p>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showResetConfirm = false">Cancel</button>
              <button class="btn-gold" @click="resetSettings">Yes, Reset</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── TOAST ── -->
    <Transition name="toast">
      <div v-if="showToast" class="toast">
        <CheckCircleIcon class="size-5 toast-icon" />
        {{ toastMsg }}
      </div>
    </Transition>

  </NuxtLayout>
</template>

<script setup>
import { ref, reactive } from 'vue'
import {
  BuildingStorefrontIcon, CalendarIcon, CreditCardIcon,
  UsersIcon, Cog6ToothIcon, ChevronRightIcon,
  CheckIcon, TrashIcon, XMarkIcon, ArrowDownTrayIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'

// ── SECTIONS ──
const activeSection = ref('general')
const sections = [
  { key: 'general',  label: 'General',   sub: 'Business info & hours',     icon: BuildingStorefrontIcon },
  { key: 'booking',  label: 'Booking',   sub: 'Appointments & policy',     icon: CalendarIcon },
  { key: 'payments', label: 'Payments',  sub: 'Methods & billing',         icon: CreditCardIcon },
  { key: 'staff',    label: 'Staff',     sub: 'Roles & permissions',       icon: UsersIcon },
  { key: 'system',   label: 'System',    sub: 'Data & configuration',      icon: Cog6ToothIcon },
]

// ── GENERAL ──
const general = reactive({
  businessName: 'Servora Spa & Wellness',
  email:        'hello@servora.com',
  phone:        '(082) 123-4567',
  address:      '123 Wellness Street, Matina',
  city:         'Davao City',
  country:      'Philippines',
  description:  'A premium spa and wellness center dedicated to restoring balance and renewing the spirit.',
})

const operatingHours = reactive([
  { day: 'Monday',    open: true,  from: '09:00', to: '18:00' },
  { day: 'Tuesday',   open: true,  from: '09:00', to: '18:00' },
  { day: 'Wednesday', open: true,  from: '09:00', to: '18:00' },
  { day: 'Thursday',  open: true,  from: '09:00', to: '18:00' },
  { day: 'Friday',    open: true,  from: '09:00', to: '20:00' },
  { day: 'Saturday',  open: true,  from: '08:00', to: '20:00' },
  { day: 'Sunday',    open: true,  from: '10:00', to: '17:00' },
])

// ── BOOKING ──
const booking = reactive({
  minNotice:      '2 hours',
  maxAdvance:     '1 month',
  slotDuration:   '30 mins',
  buffer:         '15 mins',
  cancelWindow:   '24 hours before',
  cancelFee:      500,
  cancelNote:     'Cancellations made less than 24 hours before the appointment will incur a ₱500 fee.',
  autoConfirm:    true,
  allowWalkIn:    true,
  requireDeposit: false,
  smsReminder:    true,
})

const bookingToggles = [
  { key: 'autoConfirm',    label: 'Auto-confirm bookings',     sub: 'Automatically confirm new appointments without manual review' },
  { key: 'allowWalkIn',    label: 'Allow walk-in bookings',    sub: 'Accept same-day walk-in appointments' },
  { key: 'requireDeposit', label: 'Require deposit',           sub: 'Require a deposit payment when booking' },
  { key: 'smsReminder',    label: 'SMS reminders',             sub: 'Send automated SMS reminders to clients before appointments' },
]

// ── PAYMENTS ──
const paymentMethods = reactive([
  { key: 'cash',   name: 'Cash',       emoji: '💵', enabled: true  },
  { key: 'gcash',  name: 'GCash',      emoji: '📱', enabled: true  },
  { key: 'card',   name: 'Credit Card',emoji: '💳', enabled: true  },
  { key: 'maya',   name: 'Maya',       emoji: '🏦', enabled: false },
  { key: 'bank',   name: 'Bank Transfer', emoji: '🏛️', enabled: false },
])

const payments = reactive({
  currency:       'PHP',
  taxRate:        12,
  tin:            '123-456-789-000',
  invoicePrefix:  'SRV-',
})

// ── STAFF ROLES & PERMISSIONS ──
const roles = ['Admin', 'Manager', 'Therapist']
const permissions = [
  { key: 'view_reports',     label: 'View Reports',       sub: 'Access financial and analytics reports' },
  { key: 'manage_clients',   label: 'Manage Clients',     sub: 'Add, edit, and delete client records' },
  { key: 'manage_bookings',  label: 'Manage Bookings',    sub: 'Create and modify appointments' },
  { key: 'manage_services',  label: 'Manage Services',    sub: 'Add, edit, and delete services' },
  { key: 'manage_staff',     label: 'Manage Staff',       sub: 'Add and edit therapist profiles' },
  { key: 'manage_documents', label: 'Manage Documents',   sub: 'Upload and delete documents' },
  { key: 'access_settings',  label: 'Access Settings',    sub: 'View and modify system settings' },
]

const rolePerms = reactive({
  Admin:     { view_reports: true,  manage_clients: true,  manage_bookings: true,  manage_services: true,  manage_staff: true,  manage_documents: true,  access_settings: true  },
  Manager:   { view_reports: true,  manage_clients: true,  manage_bookings: true,  manage_services: true,  manage_staff: false, manage_documents: true,  access_settings: false },
  Therapist: { view_reports: false, manage_clients: false, manage_bookings: true,  manage_services: false, manage_staff: false, manage_documents: false, access_settings: false },
})

// ── MODALS ──
const showClearConfirm = ref(false)
const showResetConfirm = ref(false)
const confirmText      = ref('')

function clearData() {
  if (confirmText.value !== 'DELETE') return
  showClearConfirm.value = false
  confirmText.value = ''
  showToastMsg('All data has been cleared.')
}

function resetSettings() {
  showResetConfirm.value = false
  showToastMsg('Settings reset to default.')
}

// ── SAVE ──
function saveAll() { showToastMsg('All settings saved successfully!') }

// ── TOAST ──
const showToast = ref(false)
const toastMsg  = ref('')
function showToastMsg(msg) {
  toastMsg.value  = msg
  showToast.value = true
  setTimeout(() => showToast.value = false, 3000)
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.settings-page { font-family: 'Jost', sans-serif; padding-bottom: 3rem; }

/* ── HEADER ── */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.8rem; }
.page-eyebrow { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.2rem; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: #1a1a14; letter-spacing: 0.02em; }
.btn-gold { background: #c9a96e; color: #1a1a14; border: none; padding: 0.7rem 1.5rem; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s, transform 0.2s; }
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }

/* ── LAYOUT ── */
.settings-layout { display: grid; grid-template-columns: 240px 1fr; gap: 1.5rem; align-items: start; }

/* ── SIDEBAR NAV ── */
.settings-nav { background: #fff; border-radius: 10px; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 16px rgba(26,26,20,0.05); overflow: hidden; position: sticky; top: 5rem; }
.snav-item { display: flex; align-items: center; gap: 0.85rem; padding: 0.9rem 1rem; cursor: pointer; border: none; background: none; width: 100%; text-align: left; transition: background 0.15s; border-left: 2px solid transparent; }
.snav-item:hover { background: #fdf8f0; }
.snav-item.active { background: rgba(201,169,110,0.06); border-left-color: #c9a96e; }
.snav-item:not(:last-child) { border-bottom: 1px solid rgba(201,169,110,0.08); }
.snav-icon { width: 30px; height: 30px; border-radius: 7px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; transition: background 0.2s; }
.snav-text { flex: 1; }
.snav-label { font-size: 0.8rem; font-weight: 500; color: #1a1a14; }
.snav-arrow { color: #d1cdc7; transition: color 0.2s, transform 0.2s; }
.snav-arrow.active { color: #c9a96e; transform: translateX(2px); }
.snav-sub { font-size: 0.65rem; color: #9ca3af; margin-top: 1px; }

/* ── SECTION CONTENT ── */
.section-content { display: flex; flex-direction: column; gap: 0; animation: fadeUp 0.2s ease; }
@keyframes fadeUp { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
.section-header { margin-bottom: 1.25rem; }
.section-title { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 300; color: #1a1a14; }
.section-desc { font-size: 0.78rem; color: #9ca3af; margin-top: 0.3rem; }
.mt-4 { margin-top: 1.25rem; }

/* ── CARD ── */
.card { background: #fff; border-radius: 10px; padding: 1.4rem; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 16px rgba(26,26,20,0.05); }
.card-subtitle { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 400; color: #1a1a14; margin-bottom: 1.1rem; letter-spacing: 0.03em; }

/* ── FORM ── */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-full  { grid-column: 1/-1; }
.form-group label { font-size: 0.68rem; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280; font-weight: 500; }
.form-group input,
.form-group select,
.form-group textarea { padding: 0.65rem 0.85rem; border: 1px solid rgba(201,169,110,0.25); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14; background: #fff; outline: none; transition: border 0.2s; resize: none; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #c9a96e; }
.form-group input:disabled { background: #faf8f4; color: #9ca3af; cursor: not-allowed; }

/* ── INPUT PREFIX ── */
.input-prefix-wrap { position: relative; }
.input-prefix { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); font-size: 0.82rem; color: #9ca3af; pointer-events: none; }
.input-prefix-wrap input { padding-left: 1.8rem; width: 100%; }

/* ── OPERATING HOURS ── */
.hours-grid { display: flex; flex-direction: column; gap: 0.6rem; }
.hours-row { display: flex; align-items: center; gap: 1rem; padding: 0.6rem 0; border-bottom: 1px solid #f9f5ef; flex-wrap: wrap; }
.hours-row:last-child { border-bottom: none; }
.hours-day-wrap { display: flex; align-items: center; gap: 0.6rem; width: 130px; flex-shrink: 0; }
.hours-day { font-size: 0.8rem; font-weight: 500; color: #1a1a14; transition: color 0.2s; }
.hours-day.closed { color: #9ca3af; }
.hours-inputs { display: flex; align-items: center; gap: 0.5rem; flex: 1; }
.hours-inputs.disabled input { opacity: 0.4; }
.hours-inputs input { padding: 0.45rem 0.65rem; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.78rem; color: #1a1a14; outline: none; }
.hours-inputs input:focus { border-color: #c9a96e; }
.hours-to { font-size: 0.72rem; color: #9ca3af; }
.closed-badge { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; background: rgba(156,163,175,0.15); color: #6b7280; padding: 0.2rem 0.6rem; border-radius: 999px; }

/* ── TOGGLE SWITCH ── */
.toggle-switch { width: 40px; height: 22px; border-radius: 999px; background: rgba(156,163,175,0.3); cursor: pointer; position: relative; transition: background 0.3s; flex-shrink: 0; }
.toggle-switch.on { background: #c9a96e; }
.toggle-switch.sm { width: 34px; height: 18px; }
.toggle-thumb { position: absolute; top: 2px; left: 2px; width: 18px; height: 18px; border-radius: 50%; background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,0.2); transition: transform 0.3s; }
.toggle-switch.on .toggle-thumb { transform: translateX(18px); }
.toggle-switch.sm .toggle-thumb { width: 14px; height: 14px; }
.toggle-switch.sm.on .toggle-thumb { transform: translateX(16px); }

/* ── TOGGLE LIST ── */
.toggle-list { display: flex; flex-direction: column; gap: 0; }
.toggle-item { display: flex; align-items: center; justify-content: space-between; padding: 0.85rem 0; border-bottom: 1px solid #f9f5ef; gap: 1rem; }
.toggle-item:last-child { border-bottom: none; }
.toggle-info { flex: 1; }
.toggle-label { font-size: 0.82rem; font-weight: 500; color: #1a1a14; }
.toggle-sub { font-size: 0.7rem; color: #9ca3af; margin-top: 2px; }

/* ── PAYMENT METHODS ── */
.payment-methods { display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 1rem; }
.pm-card { background: #faf8f4; border: 1px solid rgba(201,169,110,0.12); border-radius: 10px; padding: 1rem; display: flex; flex-direction: column; gap: 0.5rem; transition: border-color 0.2s; }
.pm-card.active { border-color: rgba(201,169,110,0.4); background: rgba(201,169,110,0.04); }
.pm-top { display: flex; align-items: center; justify-content: space-between; }
.pm-emoji { font-size: 1.4rem; }
.pm-name { font-size: 0.78rem; font-weight: 500; color: #1a1a14; }
.pm-status { font-size: 0.62rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; }
.pm-status.on  { color: #4a8a47; }
.pm-status.off { color: #9ca3af; }

/* ── ROLES TABLE ── */
.roles-table { overflow-x: auto; }
.roles-header { display: grid; grid-template-columns: 1fr repeat(3, 90px); gap: 0.5rem; padding: 0 0 0.75rem; border-bottom: 1px solid rgba(201,169,110,0.15); }
.roles-header span { font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; font-weight: 500; }
.role-col { text-align: center; }
.roles-row { display: grid; grid-template-columns: 1fr repeat(3, 90px); gap: 0.5rem; align-items: center; padding: 0.75rem 0; border-bottom: 1px solid #f9f5ef; }
.roles-row:last-child { border-bottom: none; }
.perm-info { }
.perm-label { font-size: 0.8rem; font-weight: 500; color: #1a1a14; }
.perm-sub   { font-size: 0.68rem; color: #9ca3af; margin-top: 1px; }
.perm-check { width: 22px; height: 22px; border-radius: 5px; border: 1.5px solid rgba(201,169,110,0.3); display: flex; align-items: center; justify-content: center; cursor: pointer; margin: 0 auto; transition: all 0.15s; }
.perm-check.on  { background: #c9a96e; border-color: #c9a96e; color: #1a1a14; }
.perm-check.off:hover { border-color: #c9a96e; }

/* ── SYSTEM ── */
.system-actions { display: flex; flex-direction: column; gap: 0; }
.sys-action-item { display: flex; align-items: center; justify-content: space-between; padding: 1rem 0; border-bottom: 1px solid #f9f5ef; gap: 1rem; flex-wrap: wrap; }
.sys-action-item:last-child { border-bottom: none; }
.sys-action-info { flex: 1; }
.sys-action-label { font-size: 0.82rem; font-weight: 500; color: #1a1a14; }
.sys-action-sub   { font-size: 0.7rem; color: #9ca3af; margin-top: 2px; }
.danger-item .sys-action-label { color: #c0725a; }
.danger-label { color: #c0725a !important; }
.danger-zone { border-color: rgba(192,114,90,0.2); }
.sys-info-list { display: flex; flex-direction: column; }
.sys-info-item { display: flex; align-items: center; justify-content: space-between; padding: 0.65rem 0; border-bottom: 1px solid #f9f5ef; }
.sys-info-item:last-child { border-bottom: none; }
.sys-info-label { font-size: 0.75rem; color: #6b7280; }
.sys-info-val   { font-size: 0.78rem; color: #1a1a14; font-weight: 500; }
.status-chip { font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.2rem 0.6rem; border-radius: 999px; }
.status-chip.active { background: rgba(106,155,103,0.15); color: #4a8a47; }

/* ── BUTTONS ── */
.btn-outline { display: flex; align-items: center; gap: 0.4rem; background: #fff; color: #1a1a14; border: 1px solid rgba(201,169,110,0.3); padding: 0.6rem 1.1rem; font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: all 0.2s; white-space: nowrap; }
.btn-outline:hover { border-color: #c9a96e; color: #c9a96e; }
.btn-danger-outline { display: flex; align-items: center; gap: 0.4rem; background: none; color: #c0725a; border: 1px solid rgba(192,114,90,0.3); padding: 0.6rem 1.1rem; font-family: 'Jost', sans-serif; font-size: 0.72rem; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: all 0.2s; white-space: nowrap; }
.btn-danger-outline:hover { background: rgba(192,114,90,0.08); border-color: #c0725a; }

/* ── MODAL ── */
.modal-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(26,26,20,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 560px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(26,26,20,0.2); border: 1px solid rgba(201,169,110,0.15); }
.modal-sm { max-width: 420px; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 1.6rem; border-bottom: 1px solid rgba(201,169,110,0.12); }
.modal-title  { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; }
.modal-close  { background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0.25rem; border-radius: 4px; transition: color 0.2s; }
.modal-close:hover { color: #1a1a14; }
.modal-body   { padding: 1.6rem; }
.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1.2rem 1.6rem; border-top: 1px solid rgba(201,169,110,0.12); }
.delete-icon-wrap { display: flex; justify-content: center; margin-bottom: 1rem; }
.delete-msg { text-align: center; font-size: 0.88rem; color: #374151; line-height: 1.6; }
.delete-msg strong { color: #1a1a14; font-weight: 600; }
.confirm-input-wrap { margin-top: 1.25rem; display: flex; flex-direction: column; gap: 0.4rem; }
.confirm-input-wrap label { font-size: 0.72rem; color: #6b7280; text-align: center; }
.confirm-input { width: 100%; padding: 0.65rem; border: 1px solid rgba(192,114,90,0.3); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.85rem; text-align: center; color: #c0725a; font-weight: 600; letter-spacing: 0.1em; outline: none; }
.confirm-input:focus { border-color: #c0725a; }
.btn-ghost-dark { background: none; border: 1px solid rgba(26,26,20,0.15); color: #6b7280; padding: 0.7rem 1.4rem; border-radius: 4px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.btn-ghost-dark:hover { border-color: #1a1a14; color: #1a1a14; }
.btn-danger { background: #c0725a; color: #fff; border: none; padding: 0.7rem 1.4rem; border-radius: 4px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
.btn-danger:hover:not(:disabled) { background: #a85a44; }
.btn-danger:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── TOAST ── */
.toast { position: fixed; bottom: 2rem; right: 2rem; z-index: 999; background: #1a1a14; color: #fff; padding: 0.85rem 1.25rem; border-radius: 8px; display: flex; align-items: center; gap: 0.6rem; font-size: 0.82rem; box-shadow: 0 8px 32px rgba(26,26,20,0.25); border: 1px solid rgba(201,169,110,0.2); }
.toast-icon { color: #c9a96e; flex-shrink: 0; }
.toast-enter-active, .toast-leave-active { transition: opacity 0.3s, transform 0.3s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(12px); }
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s, transform 0.25s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96) translateY(10px); }

/* ── RESPONSIVE ── */
@media (max-width: 768px) {
  .settings-layout { grid-template-columns: 1fr; }
  .settings-nav { position: static; display: flex; overflow-x: auto; }
  .snav-item { flex-direction: column; align-items: center; text-align: center; padding: 0.75rem; min-width: 80px; border-left: none; border-bottom: 2px solid transparent; }
  .snav-item.active { border-bottom-color: #c9a96e; border-left-color: transparent; }
  .snav-sub, .snav-arrow { display: none; }
  .form-grid { grid-template-columns: 1fr; }
  .roles-header, .roles-row { grid-template-columns: 1fr repeat(3, 70px); }
}
</style>
<template>
  <NuxtLayout>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800">System Settings</h2>
      <p class="text-sm text-slate-500 mt-0.5">Manage your business configuration and preferences</p>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Main Settings -->
      <div class="xl:col-span-2 space-y-6">

        <!-- Business Info -->
        <div class="card">
          <h3 class="section-title mb-5">Business Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label>Business Name</label>
              <input type="text" value="Sampaguita Tailoring Shop" class="form-input" />
            </div>
            <div class="form-group">
              <label>Owner Name</label>
              <input type="text" value="Maria R. Santos" class="form-input" />
            </div>
            <div class="form-group">
              <label>Contact Number</label>
              <input type="text" value="09171234567" class="form-input" />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" value="shop@sampaguita.com" class="form-input" />
            </div>
            <div class="form-group sm:col-span-2">
              <label>Shop Address</label>
              <input type="text" value="123 Rizal St., Brgy. San Antonio, Quezon City" class="form-input" />
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button class="btn-amber">Save Changes</button>
          </div>
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
              <button @click="pref.enabled = !pref.enabled"
                :class="['toggle', pref.enabled ? 'toggle-on' : 'toggle-off']">
                <span :class="['toggle-knob', pref.enabled ? 'translate-x-5' : 'translate-x-1']"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Sidebar cards -->
      <div class="space-y-6">
        <!-- Subscription Plan -->
        <div class="card plan-card">
          <div class="plan-badge">CURRENT PLAN</div>
          <h3 class="text-xl font-extrabold text-white mt-2">Professional</h3>
          <p class="text-amber-200 text-sm mt-1">₱ 999 / month</p>
          <ul class="mt-4 space-y-2 text-sm text-white/80">
            <li class="flex items-center gap-2"><span class="text-amber-300">✓</span> Unlimited Customers</li>
            <li class="flex items-center gap-2"><span class="text-amber-300">✓</span> Inventory Management</li>
            <li class="flex items-center gap-2"><span class="text-amber-300">✓</span> Supplier Module</li>
            <li class="flex items-center gap-2"><span class="text-amber-300">✓</span> Advanced Reports</li>
            <li class="flex items-center gap-2"><span class="text-amber-300">✓</span> Up to 5 Staff Users</li>
          </ul>
          <div class="mt-4 pt-4 border-t border-white/20">
            <p class="text-xs text-white/60">Renews on <strong class="text-white">April 14, 2026</strong></p>
          </div>
          <button class="w-full mt-4 py-2 rounded-lg bg-white/20 text-white font-semibold text-sm hover:bg-white/30 transition-colors border border-white/30">Upgrade Plan</button>
        </div>

        <!-- System Info -->
        <div class="card">
          <h3 class="section-title mb-3">System Info</h3>
          <dl class="space-y-2 text-sm">
            <div class="flex justify-between"><dt class="text-slate-500">Version</dt><dd class="font-semibold text-slate-700">v1.0.0</dd></div>
            <div class="flex justify-between"><dt class="text-slate-500">Environment</dt><dd class="font-semibold text-slate-700">Production</dd></div>
            <div class="flex justify-between"><dt class="text-slate-500">Last Backup</dt><dd class="font-semibold text-slate-700">Today, 03:00 AM</dd></div>
          </dl>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const notifPrefs = reactive([
  { key: 'low_stock', label: 'Low Stock Alerts', desc: 'Get notified when materials fall below reorder level', enabled: true },
  { key: 'order_ready', label: 'Order Ready Notifications', desc: 'Notify customer when job order is complete', enabled: true },
  { key: 'appointment', label: 'Appointment Reminders', desc: 'Send reminders 24h before appointments', enabled: false },
  { key: 'invoice_due', label: 'Invoice Due Alerts', desc: 'Alert when an invoice is about to be overdue', enabled: true },
])
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.section-title { font-size: 1rem; font-weight: 700; color: #0F172A; }
.form-group label { display: block; font-size: 0.8rem; font-weight: 600; color: #64748B; margin-bottom: 0.375rem; }
.form-input { width: 100%; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 0.625rem; padding: 0.6rem 0.875rem; font-size: 0.875rem; color: #0F172A; outline: none; transition: border-color 0.15s; }
.form-input:focus { border-color: #F59E0B; box-shadow: 0 0 0 3px rgba(245,158,11,0.12); }
.btn-amber { background: linear-gradient(135deg, #F59E0B, #D97706); color: #0F172A; font-weight: 700; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; transition: all 0.15s; }
.btn-amber:hover { box-shadow: 0 4px 12px rgba(245,158,11,0.35); transform: translateY(-1px); }
.toggle { width: 44px; height: 24px; border-radius: 9999px; border: none; cursor: pointer; position: relative; display: flex; align-items: center; transition: background 0.2s; flex-shrink: 0; }
.toggle-on { background: #F59E0B; }
.toggle-off { background: #CBD5E1; }
.toggle-knob { width: 18px; height: 18px; border-radius: 50%; background: white; transition: transform 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.2); position: absolute; }
.plan-card { background: linear-gradient(135deg, #0F172A, #1E3A5F); border: 1px solid rgba(245,158,11,0.3); }
.plan-badge { display: inline-block; font-size: 0.65rem; font-weight: 700; letter-spacing: 0.1em; color: #F59E0B; background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.3); padding: 0.2rem 0.625rem; border-radius: 9999px; }
</style>

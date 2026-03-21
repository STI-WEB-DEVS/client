<template>
  <div class="min-h-screen bg-[#faf7f2] font-serif text-[#1a1108] p-8">

    <!-- Header -->
    <div class="mb-10">
      <p class="text-[10px] tracking-[0.3em] uppercase text-[#b0a090] mb-1">Configuration</p>
      <h1 class="text-3xl font-bold text-[#1a1108] tracking-tight">System Settings</h1>
      <p class="text-[#8a7060] mt-1 text-sm">Manage your tailoring business profile, subscription, and security.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-4 gap-8">

      <!-- Sidebar Tabs -->
      <aside class="lg:col-span-1">
        <div class="bg-white border border-[#e8ddc8] rounded-2xl overflow-hidden">
          <div class="px-4 py-3 border-b border-[#f0e8d8] bg-[#fdf9f4]">
            <p class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">Settings Menu</p>
          </div>
          <div class="p-2 space-y-1">
            <button
              v-for="tab in tabs" :key="tab.id"
              @click="activeTab = tab.id"
              :class="activeTab === tab.id
                ? 'bg-[#1a1108] text-[#f5e6c8]'
                : 'text-[#4a3820] hover:bg-[#f0e8d8]'"
              class="w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all flex items-center gap-3">
              <span class="text-base">{{ tab.icon }}</span>
              <span>{{ tab.label }}</span>
            </button>
          </div>
        </div>
      </aside>

      <!-- Settings Panel -->
      <div class="lg:col-span-3">
        <div class="bg-white border border-[#e8ddc8] rounded-2xl overflow-hidden">

          <!-- Business Profile -->
          <section v-if="activeTab === 'profile'" class="p-8">
            <div class="border-b border-[#f0e8d8] pb-6 mb-8">
              <h2 class="text-xl font-bold text-[#1a1108]">Business Profile</h2>
              <p class="text-sm text-[#8a7060] mt-1">Update your atelier's public information.</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div v-for="field in profileFields" :key="field.label" class="space-y-2">
                <label class="text-[9px] font-bold text-[#b0a090] uppercase tracking-[0.2em]">{{ field.label }}</label>
                <input :type="field.type || 'text'" :value="field.value"
                  class="w-full px-4 py-3 bg-[#faf7f2] border border-[#e8ddc8] rounded-xl text-[#1a1108] text-sm focus:outline-none focus:border-[#c9a84c] focus:ring-1 focus:ring-[#c9a84c] transition-all" />
              </div>
            </div>
          </section>

          <!-- Subscription -->
          <section v-if="activeTab === 'subscription'" class="p-8">
            <div class="border-b border-[#f0e8d8] pb-6 mb-8">
              <h2 class="text-xl font-bold text-[#1a1108]">Plan & Subscription</h2>
              <p class="text-sm text-[#8a7060] mt-1">Manage your current plan and billing details.</p>
            </div>

            <div class="p-6 bg-[#1a1108] rounded-2xl text-[#f5e6c8] flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden mb-6">
              <div class="absolute inset-0 opacity-10"
                style="background-image: repeating-linear-gradient(45deg, #c9a84c 0, #c9a84c 1px, transparent 0, transparent 50%); background-size: 12px 12px;">
              </div>
              <div class="relative z-10">
                <p class="text-[#c9a84c] text-[9px] font-bold uppercase tracking-[0.3em]">Current Plan</p>
                <h3 class="text-2xl font-black mt-1">Premium Enterprise</h3>
                <p class="text-[#a09080] text-sm mt-1">Renewal: June 15, 2026</p>
              </div>
              <button class="relative z-10 bg-[#c9a84c] text-[#1a1108] px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-[#f5e6c8] transition-all">
                Manage Billing
              </button>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <div v-for="feat in planFeatures" :key="feat" class="p-4 bg-[#faf7f2] border border-[#e8ddc8] rounded-xl text-center">
                <p class="text-xs font-bold text-[#4a3820]">{{ feat }}</p>
              </div>
            </div>
          </section>

          <!-- Security -->
          <section v-if="activeTab === 'security'" class="p-8">
            <div class="border-b border-[#f0e8d8] pb-6 mb-8">
              <h2 class="text-xl font-bold text-[#1a1108]">Security & Roles</h2>
              <p class="text-sm text-[#8a7060] mt-1">Configure access control and authentication.</p>
            </div>
            <div class="space-y-4">
              <div v-for="toggle in securityToggles" :key="toggle.title"
                class="flex items-center justify-between p-5 border border-[#e8ddc8] rounded-2xl hover:border-[#c9a84c] transition-all">
                <div class="flex-1 mr-4">
                  <p class="font-bold text-[#1a1108] text-sm">{{ toggle.title }}</p>
                  <p class="text-xs text-[#8a7060] mt-0.5">{{ toggle.desc }}</p>
                </div>
                <button @click="toggle.enabled = !toggle.enabled"
                  :class="toggle.enabled ? 'bg-[#c9a84c]' : 'bg-[#e0d8cc]'"
                  class="w-12 h-6 rounded-full relative transition-all duration-200 flex-shrink-0">
                  <div :class="toggle.enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200">
                  </div>
                </button>
              </div>
            </div>
          </section>

          <!-- Notifications -->
          <section v-if="activeTab === 'notifications'" class="p-8">
            <div class="border-b border-[#f0e8d8] pb-6 mb-8">
              <h2 class="text-xl font-bold text-[#1a1108]">Notification Settings</h2>
              <p class="text-sm text-[#8a7060] mt-1">Configure automated alerts and communication.</p>
            </div>
            <div class="space-y-4">
              <div v-for="notif in notificationSettings" :key="notif.title"
                class="flex items-center justify-between p-5 border border-[#e8ddc8] rounded-2xl hover:border-[#c9a84c] transition-all">
                <div class="flex items-center gap-4">
                  <div class="w-10 h-10 rounded-xl bg-[#f0e8d8] flex items-center justify-center text-lg flex-shrink-0">
                    {{ notif.icon }}
                  </div>
                  <div>
                    <p class="font-bold text-[#1a1108] text-sm">{{ notif.title }}</p>
                    <p class="text-xs text-[#8a7060] mt-0.5">{{ notif.desc }}</p>
                  </div>
                </div>
                <button @click="notif.enabled = !notif.enabled"
                  :class="notif.enabled ? 'bg-[#c9a84c]' : 'bg-[#e0d8cc]'"
                  class="w-12 h-6 rounded-full relative transition-all duration-200 flex-shrink-0">
                  <div :class="notif.enabled ? 'translate-x-6' : 'translate-x-1'"
                    class="absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200">
                  </div>
                </button>
              </div>
            </div>
          </section>

          <!-- Footer Actions -->
          <div class="px-8 py-5 border-t border-[#f0e8d8] bg-[#fdf9f4] flex justify-end gap-3">
            <button class="px-6 py-2.5 rounded-xl font-bold text-sm text-[#8a7060] hover:bg-[#f0e8d8] transition-all">
              Discard Changes
            </button>
            <button class="bg-[#1a1108] text-[#f5e6c8] px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-[#2a1f0f] transition-all">
              Save Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('profile');

const tabs = ref([
  { id: 'profile', label: 'Business Profile', icon: '🏪' },
  { id: 'subscription', label: 'Subscription', icon: '💳' },
  { id: 'security', label: 'Security & Roles', icon: '🔐' },
  { id: 'notifications', label: 'Notifications', icon: '🔔' },
]);

const profileFields = ref([
  { label: 'Shop Name', value: 'Sutura Custom Tailoring' },
  { label: 'Business Email', value: 'contact@sutura.com', type: 'email' },
  { label: 'Contact Number', value: '+63 912 345 6789' },
  { label: 'Business Address', value: 'Davao City, Philippines' },
]);

const planFeatures = ['Unlimited Job Orders', 'Staff Accounts (10)', 'SMS Notifications', 'Analytics Reports', 'Priority Support', 'Cloud Backup'];

const securityToggles = ref([
  { title: 'Role-Based Access Control', desc: 'Restrict access to measurements and financial reports.', enabled: true },
  { title: 'Two-Factor Authentication', desc: 'Require 2FA for all admin accounts.', enabled: false },
  { title: 'Session Timeout', desc: 'Auto-logout after 30 minutes of inactivity.', enabled: true },
]);

const notificationSettings = ref([
  { title: 'Order Deadline Alerts', desc: 'Notify team 48hrs before a job order is due.', icon: '⏰', enabled: true },
  { title: 'Low Stock Warnings', desc: 'Alert procurement team when materials are critical.', icon: '📦', enabled: true },
  { title: 'Appointment Reminders', desc: 'Send SMS/Email to customers before fittings.', icon: '📅', enabled: false },
  { title: 'Payment Confirmations', desc: 'Notify clients upon successful payment processing.', icon: '💰', enabled: true },
]);
</script>
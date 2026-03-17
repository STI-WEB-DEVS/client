<template>
  <div class="p-8 bg-[#0f172a] min-h-screen rounded-3xl shadow-2xl font-sans">

    <!-- Header -->
    <div class="mb-10 border-b border-white/10 pb-8">
      <p class="text-teal-400 text-xs font-black uppercase tracking-widest mb-2">Sutura TMS</p>
      <h1 class="text-3xl font-bold text-white tracking-tight">System Settings</h1>
      <p class="text-slate-400 mt-2">Manage your tailoring business profile, subscription, and security.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">

      <!-- Sidebar Tabs -->
      <aside class="space-y-2">
        <button
          v-for="tab in tabs" :key="tab.id"
          @click="activeTab = tab.id"
          :class="activeTab === tab.id
            ? 'bg-teal-500/20 text-teal-400 border-teal-400/30'
            : 'text-slate-500 hover:bg-white/5 border-transparent'"
          class="w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all border"
        >
          {{ tab.label }}
        </button>
      </aside>

      <div class="lg:col-span-2 space-y-10">

        <!-- Business Profile -->
        <section v-if="activeTab === 'profile'" class="space-y-6">
          <h2 class="text-xl font-bold text-white">Business Profile</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Shop Name</label>
              <input
                type="text"
                value="Sutura Custom Tailoring"
                class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition"
              />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-slate-500 uppercase tracking-widest">Business Email</label>
              <input
                type="email"
                value="contact@sutura.com"
                class="w-full p-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-teal-500/50 focus:border-teal-500/50 transition"
              />
            </div>
          </div>
        </section>

        <!-- Subscription Plan -->
        <section v-if="activeTab === 'subscription'" class="space-y-6">
          <h2 class="text-xl font-bold text-white">Plan & Subscription</h2>
          <div class="p-6 bg-teal-500/10 border border-teal-400/20 rounded-2xl flex justify-between items-center">
            <div>
              <p class="text-teal-400 text-xs font-black uppercase tracking-widest">Current Plan</p>
              <h3 class="text-2xl font-black mt-1 text-white">Premium Enterprise</h3>
              <p class="text-slate-400 text-sm mt-1 italic">Renewal Date: June 15, 2026</p>
            </div>
            <button class="bg-teal-500 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-400 transition shadow-lg shadow-teal-900/40">
              Manage Billing
            </button>
          </div>
        </section>

        <!-- Security & Roles -->
        <section v-if="activeTab === 'security'" class="space-y-6">
          <h2 class="text-xl font-bold text-white">Security & Roles</h2>
          <div class="space-y-4">

            <!-- Toggle: Role-Based Access (ON) -->
            <div class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition">
              <div>
                <p class="font-bold text-slate-200">Role-Based Access Control</p>
                <p class="text-xs text-slate-500 mt-0.5">Restrict access to measurements and financial reports.</p>
              </div>
              <div class="w-12 h-6 bg-teal-500 rounded-full relative cursor-pointer shrink-0">
                <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>

            <!-- Toggle: Automated Notifications (OFF) -->
            <div class="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition">
              <div>
                <p class="font-bold text-slate-200">Automated Notifications</p>
                <p class="text-xs text-slate-500 mt-0.5">Send SMS/Email alerts for order deadlines.</p>
              </div>
              <div class="w-12 h-6 bg-white/10 border border-white/10 rounded-full relative cursor-pointer shrink-0">
                <div class="absolute left-1 top-1 w-4 h-4 bg-slate-400 rounded-full shadow-sm"></div>
              </div>
            </div>

          </div>
        </section>

        <!-- Notification Settings (placeholder) -->
        <section v-if="activeTab === 'notifications'" class="space-y-6">
          <h2 class="text-xl font-bold text-white">Notification Settings</h2>
          <div class="p-6 bg-white/5 border border-white/10 rounded-2xl text-center">
            <p class="text-slate-500 text-sm">Notification preferences coming soon.</p>
          </div>
        </section>

        <!-- Footer Actions -->
        <div class="pt-6 border-t border-white/10 flex justify-end gap-3">
          <button class="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-500 hover:bg-white/5 hover:text-slate-300 transition border border-transparent hover:border-white/10">
            Discard Changes
          </button>
          <button class="bg-teal-500 text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-teal-400 transition shadow-lg shadow-teal-900/40">
            Save Settings
          </button>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const activeTab = ref('profile');

const tabs = ref([
  { id: 'profile',       label: 'Business Profile'      },
  { id: 'subscription',  label: 'Subscription Plan'     },
  { id: 'security',      label: 'Security & Roles'      },
  { id: 'notifications', label: 'Notification Settings' }
]);
</script>
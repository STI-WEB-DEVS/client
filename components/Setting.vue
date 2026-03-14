<template>
  <div class="p-8 bg-white min-h-screen rounded-3xl shadow-sm border border-gray-100 font-sans">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-slate-900 tracking-tight">System Settings</h1>
      <p class="text-slate-500 mt-2">Manage your tailoring business profile, subscription, and security.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
      <aside class="space-y-2">
        <button 
          v-for="tab in tabs" :key="tab.id"
          @click="activeTab = tab.id"
          :class="activeTab === tab.id ? 'bg-indigo-50 text-indigo-700' : 'text-slate-500 hover:bg-slate-50'"
          class="w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all"
        >
          {{ tab.label }}
        </button>
      </aside>

      <div class="lg:col-span-2 space-y-10">
        
        <section v-if="activeTab === 'profile'" class="space-y-6 animate-in fade-in slide-in-from-bottom-2">
          <h2 class="text-xl font-bold text-slate-800">Business Profile</h2>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-2">
              <label class="text-xs font-black text-slate-400 uppercase">Shop Name</label>
              <input type="text" value="Sutura Custom Tailoring" class="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-xs font-black text-slate-400 uppercase">Business Email</label>
              <input type="email" value="contact@sutura.com" class="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
          </div>
        </section>

        <section v-if="activeTab === 'subscription'" class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800">Plan & Subscription</h2>
          <div class="p-6 bg-indigo-600 rounded-2xl text-white shadow-xl shadow-indigo-100 flex justify-between items-center">
            <div>
              <p class="text-indigo-200 text-xs font-bold uppercase tracking-widest">Current Plan</p>
              <h3 class="text-2xl font-black mt-1">Premium Enterprise</h3>
              <p class="text-indigo-100 text-sm mt-1 italic">Renewal Date: June 15, 2026</p>
            </div>
            <button class="bg-white text-indigo-600 px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-50 transition">
              Manage Billing
            </button>
          </div>
        </section>

        <section v-if="activeTab === 'security'" class="space-y-6">
          <h2 class="text-xl font-bold text-slate-800">Security & Roles</h2>
          <div class="space-y-4">
            <div class="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
              <div>
                <p class="font-bold text-slate-700">Role-Based Access Control</p>
                <p class="text-xs text-slate-400">Restrict access to measurements and financial reports.</p>
              </div>
              <div class="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
            <div class="flex items-center justify-between p-4 border border-slate-100 rounded-2xl">
              <div>
                <p class="font-bold text-slate-700">Automated Notifications</p>
                <p class="text-xs text-slate-400">Send SMS/Email alerts for order deadlines.</p>
              </div>
              <div class="w-12 h-6 bg-slate-200 rounded-full relative cursor-pointer">
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-sm"></div>
              </div>
            </div>
          </div>
        </section>

        <div class="pt-6 border-t border-slate-100 flex justify-end gap-3">
          <button class="px-6 py-2.5 rounded-xl font-bold text-sm text-slate-400 hover:bg-slate-50 transition">Discard Changes</button>
          <button class="bg-indigo-600 text-white px-8 py-2.5 rounded-xl font-bold text-sm hover:bg-indigo-700 transition shadow-lg shadow-indigo-100">
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
  { id: 'profile', label: 'Business Profile' },
  { id: 'subscription', label: 'Subscription Plan' },
  { id: 'security', label: 'Security & Roles' },
  { id: 'notifications', label: 'Notification Settings' }
]);
</script>
<script setup>
import { ref } from 'vue';

const activeSection = ref('General');
const menuItems = [
  { name: 'General', icon: '⚙️' },
  { name: 'Security', icon: '🔒' },
  { name: 'Notifications', icon: '🔔' },
  { name: 'Billing', icon: '💳' }
];

const settings = ref({
  fullName: 'Charles Robbie',
  email: 'charles.robbie@bloodbank.org',
  twoFactor: true,
  emailNotifications: true,
  darkMode: false
});

const saveSettings = () => {
  alert('Settings saved successfully!');
};
</script>

<template>
  <div class="min-h-screen bg-[#F0F2F6] p-4 md:p-8">
    <div class="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl border border-white flex overflow-hidden min-h-[600px]">
      
      <aside class="w-64 bg-[#F8FAFC] border-r border-gray-100 p-6 hidden md:block">
        <h2 class="text-xl font-bold text-[#2C334E] mb-8">Settings</h2>
        <nav class="space-y-2">
          <button 
            v-for="item in menuItems" 
            :key="item.name"
            @click="activeSection = item.name"
            :class="[
              'w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all',
              activeSection === item.name 
                ? 'bg-white shadow-md text-[#2C334E] scale-[1.02]' 
                : 'text-gray-400 hover:text-gray-600'
            ]"
          >
            <span class="text-lg">{{ item.icon }}</span>
            <span class="text-sm">{{ item.name }}</span>
          </button>
        </nav>
      </aside>

      <main class="flex-1 p-8 md:p-12">
        <div class="max-w-2xl">
          <header class="mb-10">
            <h3 class="text-2xl font-bold text-[#2C334E]">{{ activeSection }} Settings</h3>
            <p class="text-sm text-gray-400">Manage your account preferences and system configurations.</p>
          </header>

          <div v-if="activeSection === 'General'" class="space-y-8">
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Full Name</label>
                <input 
                  v-model="settings.fullName"
                  type="text" 
                  class="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#2C334E] outline-none transition-all shadow-inner"
                />
              </div>
              <div>
                <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Email Address</label>
                <input 
                  v-model="settings.email"
                  type="email" 
                  class="w-full bg-[#F8FAFC] border border-gray-100 rounded-xl px-4 py-3 text-sm focus:border-[#2C334E] outline-none transition-all shadow-inner"
                />
              </div>
            </div>

            <hr class="border-gray-50">

            <div class="space-y-6">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-bold text-[#2C334E]">Email Notifications</p>
                  <p class="text-xs text-gray-400">Receive weekly reports and donor alerts.</p>
                </div>
                <button 
                  @click="settings.emailNotifications = !settings.emailNotifications"
                  :class="settings.emailNotifications ? 'bg-[#2C334E]' : 'bg-gray-200'"
                  class="w-12 h-6 rounded-full relative transition-colors duration-200"
                >
                  <div 
                    :class="settings.emailNotifications ? 'translate-x-7' : 'translate-x-1'"
                    class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm"
                  ></div>
                </button>
              </div>

              <div class="flex items-center justify-between">
                <div>
                  <p class="text-sm font-bold text-[#2C334E]">Two-Factor Authentication</p>
                  <p class="text-xs text-gray-400">Add an extra layer of security to your account.</p>
                </div>
                <button 
                  @click="settings.twoFactor = !settings.twoFactor"
                  :class="settings.twoFactor ? 'bg-[#2C334E]' : 'bg-gray-200'"
                  class="w-12 h-6 rounded-full relative transition-colors duration-200"
                >
                  <div 
                    :class="settings.twoFactor ? 'translate-x-7' : 'translate-x-1'"
                    class="absolute top-1 w-4 h-4 bg-white rounded-full transition-transform duration-200 shadow-sm"
                  ></div>
                </button>
              </div>
            </div>

            <div class="pt-6 flex gap-4">
              <button @click="saveSettings" class="px-8 py-3 bg-[#2C334E] text-white rounded-xl font-bold shadow-lg hover:bg-[#1e253d] transition-all">
                Save Changes
              </button>
              <button class="px-8 py-3 text-gray-400 font-bold hover:text-gray-600 transition-all">
                Cancel
              </button>
            </div>
          </div>

          <div v-else class="py-20 text-center">
            <div class="text-4xl mb-4">🛠️</div>
            <p class="text-gray-400 italic">This section is currently under development.</p>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
/* Custom inner shadow for input fields to match neumorphic look */
.shadow-inner {
  box-shadow: inset 4px 4px 8px #d1d9e6, inset -4px -4px 8px #ffffff;
}
</style>``
<template>
    <NuxtLayout>
        <div class="p-8 bg-[#FDFCFB] min-h-screen font-sans">
    <header class="mb-10">
      <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">System Settings</h1>
      <p class="text-gray-500 font-medium">Manage your Furnicraft account and workshop preferences.</p>
    </header>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="space-y-2">
        <button v-for="tab in tabs" :key="tab.name" 
                :class="['w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all', 
                tab.active ? 'bg-[#5D4037] text-white shadow-lg' : 'bg-white text-gray-500 hover:bg-amber-50']">
          <component :is="tab.icon" class="w-5 h-5" />
          {{ tab.name }}
        </button>
      </div>

      <div class="lg:col-span-2 space-y-8">
        <section class="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-sm">
          <h3 class="font-black text-[#2D2424] text-lg mb-6 flex items-center gap-2">
            <UserIcon class="w-5 h-5 text-amber-600" />
            Administrator Profile
          </h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Full Name</label>
              <input type="text" value="Juan Dela Cruz" class="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
            <div class="space-y-2">
              <label class="text-[10px] font-black text-gray-400 uppercase tracking-widest">Email Address</label>
              <input type="email" value="admin@furnicraft.ph" class="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl text-sm font-bold focus:ring-2 focus:ring-amber-500 outline-none" />
            </div>
          </div>

          <div class="mt-8 flex items-center gap-4">
            <div class="w-20 h-20 bg-[#F4F1EE] rounded-3xl border-2 border-dashed border-amber-200 flex items-center justify-center text-amber-700">
              <CameraIcon class="w-8 h-8" />
            </div>
            <div>
              <p class="text-sm font-black text-[#2D2424]">Profile Picture</p>
              <p class="text-xs text-gray-400">PNG or JPG, max 5MB.</p>
              <button class="mt-2 text-xs font-black text-amber-600 hover:underline">Change Photo</button>
            </div>
          </div>
        </section>

        <section class="bg-white p-8 rounded-[2.5rem] border border-gray-200 shadow-sm">
          <h3 class="font-black text-[#2D2424] text-lg mb-6 flex items-center gap-2">
            <BuildingStorefrontIcon class="w-5 h-5 text-amber-600" />
            Workshop Preferences
          </h3>
          
          <div class="space-y-6">
            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p class="text-sm font-black text-[#2D2424]">Low Stock Alerts</p>
                <p class="text-xs text-gray-400">Notify when material drops below 20%.</p>
              </div>
              <div class="w-12 h-6 bg-amber-500 rounded-full relative">
                <div class="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>

            <div class="flex items-center justify-between p-4 bg-gray-50 rounded-2xl">
              <div>
                <p class="text-sm font-black text-[#2D2424]">Automatic Invoicing</p>
                <p class="text-xs text-gray-400">Generate PDF receipts after every order.</p>
              </div>
              <div class="w-12 h-6 bg-gray-300 rounded-full relative">
                <div class="absolute left-1 top-1 w-4 h-4 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div class="mt-10 flex justify-end gap-3">
            <button class="px-6 py-3 text-sm font-black text-gray-400 hover:text-gray-600">Discard</button>
            <button class="px-8 py-3 bg-[#5D4037] text-white rounded-2xl text-sm font-black shadow-lg active:scale-95 transition-all">
              SAVE CHANGES
            </button>
          </div>
        </section>
      </div>
    </div>
  </div>
    </NuxtLayout>
</template>

<script setup>
import { 
  UserIcon, 
  Cog6ToothIcon, 
  BellIcon, 
  ShieldCheckIcon, 
  CameraIcon,
  BuildingStorefrontIcon
} from '@heroicons/vue/24/outline'

const tabs = [
  { name: 'General Profile', icon: UserIcon, active: true },
  { name: 'Workshop Config', icon: Cog6ToothIcon, active: false },
  { name: 'Notifications', icon: BellIcon, active: false },
  { name: 'Security & Auth', icon: ShieldCheckIcon, active: false },
]
</script>
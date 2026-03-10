<template>
  <NuxtLayout>
    <div class="mb-10 border-b border-gray-100 pb-6">
      <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">System Settings</h1>
      <p class="mt-2 text-sm text-gray-500 font-medium">Configure library rules, manage your profile, and set notification preferences.</p>
    </div>

    <div class="lg:grid lg:grid-cols-12 lg:gap-x-12">
      <aside class="py-6 px-2 sm:px-6 lg:col-span-3 lg:py-0 lg:px-0">
        <nav class="space-y-1">
          <button v-for="item in tabs" :key="item.name" 
                  @click="activeTab = item.id"
                  :class="[activeTab === item.id ? 'bg-black text-white' : 'text-gray-700 hover:bg-gray-50 hover:text-black']"
                  class="group flex w-full items-center rounded-xl px-4 py-3 text-sm font-bold transition-all">
            <component :is="item.icon" class="mr-3 size-5 flex-shrink-0" />
            {{ item.name }}
          </button>
        </nav>
      </aside>

      <div class="space-y-6 sm:px-6 lg:col-span-9 lg:px-0">
        <section v-if="activeTab === 'profile'" class="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
          <div class="px-6 py-5 border-b border-gray-100 bg-gray-50/50">
            <h3 class="text-sm font-bold text-gray-900 uppercase tracking-widest">Personal Profile</h3>
          </div>
          
          <div class="p-6 space-y-6">
            <div class="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-6">
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-wide">Full Name</label>
                <input type="text" value="Tom Cook" class="mt-2 block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none" />
              </div>
              <div>
                <label class="block text-xs font-bold text-gray-400 uppercase tracking-wide">Email Address</label>
                <input type="email" value="tom.cook@smartpark.com" class="mt-2 block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:ring-2 focus:ring-black outline-none" />
              </div>
            </div>

            <div>
              <label class="block text-xs font-bold text-gray-400 uppercase tracking-wide">Profile Photo</label>
              <div class="mt-2 flex items-center gap-x-5">
                <div class="h-16 w-16 rounded-2xl bg-gray-900 flex items-center justify-center text-white font-bold text-xl">TC</div>
                <button class="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-bold text-gray-700 hover:bg-gray-50">Change Photo</button>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-end gap-3 border-t border-gray-100">
            <button class="text-sm font-bold text-gray-500 hover:text-black">Cancel</button>
            <button class="rounded-lg bg-black px-6 py-2 text-sm font-bold text-white hover:bg-gray-800 shadow-md">Save Changes</button>
          </div>
        </section>

        <section v-if="activeTab === 'library'" class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
           <h3 class="text-lg font-bold text-gray-900 mb-4">Lending Policies</h3>
           <div class="space-y-4">
             <div class="flex items-center justify-between p-4 rounded-xl border border-gray-100 bg-gray-50">
               <div>
                 <p class="text-sm font-bold text-gray-900">Maximum Book Limit</p>
                 <p class="text-xs text-gray-500">How many books a member can borrow at once.</p>
               </div>
               <input type="number" value="5" class="w-20 rounded-lg border-gray-200 p-2 text-center text-sm font-bold" />
             </div>
           </div>
        </section>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { 
  UserCircleIcon, 
  BuildingLibraryIcon, 
  BellAlertIcon, 
  ShieldCheckIcon,
  GlobeAltIcon
} from '@heroicons/vue/24/outline'

const activeTab = ref('profile')

const tabs = [
  { id: 'profile', name: 'Profile', icon: UserCircleIcon },
  { id: 'library', name: 'Library Rules', icon: BuildingLibraryIcon },
  { id: 'notifications', name: 'Notifications', icon: BellAlertIcon },
  { id: 'security', name: 'Security', icon: ShieldCheckIcon },
  { id: 'localization', name: 'Language', icon: GlobeAltIcon },
]
</script>
<template>
  <div class="space-y-7">

    <!-- Profile hero -->
    <div class="p-6 bg-white border rounded-sm border-stone-200">
      <div class="flex items-start justify-between">
        <div class="flex items-center gap-5">
          <div class="flex items-center justify-center flex-shrink-0 w-16 h-16 font-sans text-xl font-medium rounded-sm bg-stone-100 text-stone-600">
            JM
          </div>
          <div>
            <h1 class="font-serif text-xl font-normal tracking-tight text-stone-900">Jake Maunas</h1>
            <p class="text-[11px] font-sans text-stone-400 mt-0.5">Administrator · Joined Jan 2024</p>
            <div class="flex items-center gap-2 mt-2">
              <span class="inline-block px-2 py-0.5 text-[10px] font-sans uppercase tracking-wider font-medium rounded-sm bg-stone-900 text-[#F7F6F3]">Pro</span>
              <span class="inline-block px-2 py-0.5 text-[10px] font-sans uppercase tracking-wider font-medium rounded-sm bg-green-50 text-green-700">Active</span>
            </div>
          </div>
        </div>
        <button
          @click="editing = !editing"
          class="px-3 py-1.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors flex-shrink-0"
        >{{ editing ? 'Cancel' : 'Edit profile' }}</button>
      </div>

      <!-- Edit form -->
      <div v-if="editing" class="pt-6 mt-6 border-t border-stone-100">
        <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">First name</label>
            <input v-model="user.firstName" type="text" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
          </div>
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Last name</label>
            <input v-model="user.lastName" type="text" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Email</label>
            <input v-model="user.email" type="email" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
          </div>
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Role</label>
            <input v-model="user.role" type="text" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
          </div>
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Location</label>
            <input v-model="user.location" type="text" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
          </div>
          <div class="sm:col-span-2">
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Bio</label>
            <textarea v-model="user.bio" rows="3" class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors resize-none"></textarea>
          </div>
        </div>
        <div class="flex justify-end mt-4">
          <button @click="saveProfile" class="px-4 py-2 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors">Save changes</button>
        </div>
      </div>

      <!-- View mode -->
      <div v-else class="grid grid-cols-2 pt-5 mt-5 border-t border-stone-100 gap-x-8 gap-y-3 sm:grid-cols-4">
        <div>
          <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest mb-0.5">Email</p>
          <p class="font-sans text-xs text-stone-700">{{ user.email }}</p>
        </div>
        <div>
          <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest mb-0.5">Role</p>
          <p class="font-sans text-xs text-stone-700">{{ user.role }}</p>
        </div>
        <div>
          <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest mb-0.5">Location</p>
          <p class="font-sans text-xs text-stone-700">{{ user.location }}</p>
        </div>
        <div>
          <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest mb-0.5">Timezone</p>
          <p class="font-sans text-xs text-stone-700">{{ user.timezone }}</p>
        </div>
        <div class="col-span-2 sm:col-span-4">
          <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest mb-0.5">Bio</p>
          <p class="font-sans text-xs leading-relaxed text-stone-500">{{ user.bio }}</p>
        </div>
      </div>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">{{ stat.label }}</p>
        <p class="font-serif text-2xl font-normal leading-none tracking-tight text-stone-900">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Two column -->
    <div class="grid grid-cols-1 gap-2.5 lg:grid-cols-2">

      <!-- Recent activity -->
      <div class="p-5 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Recent activity</p>
        <div class="divide-y divide-stone-100">
          <div v-for="item in activity" :key="item.id" class="flex items-start gap-3 py-3">
            <div
              class="w-6 h-6 rounded-sm flex items-center justify-center flex-shrink-0 mt-0.5"
              :class="item.iconBg"
            >
              <svg width="10" height="10" viewBox="0 0 16 16" fill="none" :stroke="item.iconStroke" stroke-width="1.5" v-html="item.iconPath"></svg>
            </div>
            <div class="flex-1 min-w-0">
              <p class="font-sans text-xs leading-snug text-stone-900">{{ item.text }}</p>
              <p class="text-[10px] font-sans text-stone-300 mt-0.5">{{ item.time }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Assigned projects -->
      <div class="p-5 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Assigned projects</p>
        <div class="divide-y divide-stone-100">
          <div v-for="proj in assignedProjects" :key="proj.name" class="py-3">
            <div class="flex items-center justify-between mb-1.5">
              <p class="font-sans text-xs font-medium text-stone-900">{{ proj.name }}</p>
              <span
                class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm"
                :class="{
                  'bg-green-50 text-green-700': proj.status === 'Active',
                  'bg-amber-50 text-amber-700': proj.status === 'Review',
                  'bg-stone-100 text-stone-500': proj.status === 'Paused',
                }"
              >{{ proj.status }}</span>
            </div>
            <div class="flex items-center gap-2">
              <div class="flex-1 h-0.5 bg-stone-100 rounded-sm overflow-hidden">
                <div class="h-full rounded-sm bg-stone-900" :style="{ width: proj.progress + '%' }"></div>
              </div>
              <p class="text-[10px] font-sans text-stone-400 w-8 text-right">{{ proj.progress }}%</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Documents + Skills -->
    <div class="grid grid-cols-1 gap-2.5 lg:grid-cols-2">

      <!-- Recent documents -->
      <div class="p-5 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Recent documents</p>
        <div class="divide-y divide-stone-100">
          <div v-for="doc in recentDocs" :key="doc.name" class="flex items-center gap-3 py-3">
            <div
              class="w-7 h-7 rounded-sm flex items-center justify-center text-[10px] font-medium font-sans flex-shrink-0"
              :class="doc.iconClass"
            >{{ doc.type }}</div>
            <div class="flex-1 min-w-0">
              <p class="font-sans text-xs font-medium truncate text-stone-900">{{ doc.name }}</p>
              <p class="text-[10px] font-sans text-stone-300 mt-0.5">{{ doc.modified }}</p>
            </div>
            <span
              class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm flex-shrink-0"
              :class="{
                'bg-green-50 text-green-700': doc.status === 'Published',
                'bg-amber-50 text-amber-700': doc.status === 'Draft',
                'bg-blue-50 text-blue-700': doc.status === 'Review',
              }"
            >{{ doc.status }}</span>
          </div>
        </div>
      </div>

      <!-- Skills & tags -->
      <div class="p-5 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Skills</p>
        <div class="flex flex-wrap gap-2 mb-6">
          <span
            v-for="skill in user.skills"
            :key="skill"
            class="px-2.5 py-1 border border-stone-200 rounded-sm text-[11px] font-sans text-stone-600 hover:border-stone-400 transition-colors"
          >{{ skill }}</span>
        </div>

        <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-4">Contact</p>
        <div class="space-y-2.5">
          <div class="flex items-center gap-2.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#B0ADA6" stroke-width="1.5">
              <path d="M2 4l6 5 6-5M2 4h12v9H2V4z"/>
            </svg>
            <p class="font-sans text-xs text-stone-500">{{ user.email }}</p>
          </div>
          <div class="flex items-center gap-2.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#B0ADA6" stroke-width="1.5">
              <path d="M3 3l2 4-2 2a10 10 0 005 5l2-2 4 2v3a1 1 0 01-1 1C6 18 -2 10-2 2a1 1 0 011-1h3z"/>
            </svg>
            <p class="font-sans text-xs text-stone-500">+63 912 345 6789</p>
          </div>
          <div class="flex items-center gap-2.5">
            <svg width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="#B0ADA6" stroke-width="1.5">
              <path d="M8 2C5.8 2 4 3.8 4 6c0 3 4 8 4 8s4-5 4-8c0-2.2-1.8-4-4-4z"/><circle cx="8" cy="6" r="1.5"/>
            </svg>
            <p class="font-sans text-xs text-stone-500">{{ user.location }}</p>
          </div>
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
      >Profile updated</div>
    </transition>

  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const editing = ref(false)
const saved = ref(false)

watch(saved, (val) => {
  if (val) setTimeout(() => { saved.value = false }, 2500)
})

const user = ref({
  firstName: 'Jake',
  lastName: 'Maunas',
  email: 'jake@maunas.com',
  role: 'Administrator',
  location: 'Davao City, PH',
  timezone: 'Asia/Manila (UTC+8)',
  bio: 'Product-focused administrator with a background in design systems and team operations. Building tools that help teams move faster.',
  skills: ['Product', 'Design systems', 'Vue.js', 'TypeScript', 'Nuxt', 'Team ops', 'Tailwind CSS', 'Figma'],
})

const saveProfile = () => {
  editing.value = false
  saved.value = true
}

const stats = [
  { label: 'Projects', value: '12' },
  { label: 'Documents', value: '34' },
  { label: 'Tasks done', value: '218' },
  { label: 'Days active', value: '421' },
]

const activity = [
  { id: 1, text: 'Completed "Atlas Redesign" milestone', time: '2 hr ago', iconBg: 'bg-green-50', iconStroke: '#3B6D11', iconPath: '<path d="M3 8l3 3 7-7"/>' },
  { id: 2, text: 'Uploaded "Q1 Financial Report.pdf"', time: '5 hr ago', iconBg: 'bg-blue-50', iconStroke: '#185FA5', iconPath: '<path d="M3 2h7l3 3v9H3V2z"/><path d="M10 2v3h3"/>' },
  { id: 3, text: 'Commented on API v3 Spec', time: 'Yesterday', iconBg: 'bg-stone-100', iconStroke: '#888780', iconPath: '<path d="M2 2h12v9H2V2z"/><path d="M5 13l3 2 3-2"/>' },
  { id: 4, text: 'Created project "Data Warehouse"', time: '2 days ago', iconBg: 'bg-amber-50', iconStroke: '#854F0B', iconPath: '<rect x="1" y="4" width="14" height="10" rx="1"/><path d="M4 4V3a1 1 0 011-1h6a1 1 0 011 1v1"/>' },
  { id: 5, text: 'Invited Sarah M. to the team', time: '3 days ago', iconBg: 'bg-stone-100', iconStroke: '#888780', iconPath: '<circle cx="7" cy="5" r="3"/><path d="M1 14c0-3 2.7-5 6-5"/><path d="M13 10v4M11 12h4"/>' },
]

const assignedProjects = [
  { name: 'Atlas Redesign', status: 'Active', progress: 82 },
  { name: 'Data Warehouse', status: 'Active', progress: 55 },
  { name: 'API v3 Migration', status: 'Review', progress: 61 },
  { name: 'Mobile App', status: 'Paused', progress: 29 },
]

const recentDocs = [
  { name: 'Q1 Financial Report', type: 'PDF', iconClass: 'bg-red-50 text-red-700', modified: 'Mar 12, 2026', status: 'Published' },
  { name: 'Atlas Redesign Brief', type: 'DOC', iconClass: 'bg-blue-50 text-blue-700', modified: 'Mar 10, 2026', status: 'Published' },
  { name: 'Revenue Forecast', type: 'CSV', iconClass: 'bg-green-50 text-green-700', modified: 'Feb 25, 2026', status: 'Draft' },
  { name: 'Sprint 14 Plan', type: 'DOC', iconClass: 'bg-blue-50 text-blue-700', modified: 'Feb 20, 2026', status: 'Review' },
]
</script>
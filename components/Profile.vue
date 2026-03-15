<template>
  <div class="max-w-6xl mx-auto">
    <nav class="flex mb-8" aria-label="Breadcrumb">
      <ol role="list" class="flex items-center space-x-4 text-sm text-gray-500">
        <li><NuxtLink to="/dashboard" class="hover:text-gray-700">Admin</NuxtLink></li>
        <li class="flex items-center">
          <svg class="h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="currentColor">
            <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
          </svg>
          <span class="ml-4 font-medium text-gray-900">User Profile</span>
        </li>
      </ol>
    </nav>

    <div class="grid grid-cols-1 gap-8 lg:grid-cols-3">
      
      <div class="space-y-6">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="h-24 bg-gradient-to-r from-indigo-500 to-teal-400"></div>
          <div class="px-6 pb-6">
            <div class="relative -mt-12 mb-4">
              <img 
                class="h-24 w-24 rounded-full border-4 border-white bg-gray-100 object-cover" 
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                alt="Profile"
              />
              <span class="absolute bottom-1 right-1 block h-5 w-5 rounded-full bg-green-400 border-2 border-white"></span>
            </div>
            <h2 class="text-xl font-bold text-gray-900">Tom Cook</h2>
            <p class="text-sm text-gray-500">Senior Dispatcher</p>
            
            <div class="mt-6 space-y-3">
              <div class="flex items-center text-sm text-gray-600">
                <span class="w-5 tracking-widest text-gray-400 text-xs">ID</span>
                <span>ADM-8829-X</span>
              </div>
              <div class="flex items-center text-sm text-gray-600">
                <span class="w-5 text-gray-400 text-xs">✉️</span>
                <span>tom.cook@omnibus.com</span>
              </div>
            </div>

            <button class="mt-8 w-full bg-white border border-gray-300 py-2 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition">
              Edit Photo
            </button>
          </div>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm">
          <div class="px-6 py-4 border-b border-gray-100">
            <h3 class="font-semibold text-gray-900">Account Information</h3>
          </div>
          <div class="p-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
              <input type="text" value="Tom Cook" class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none" />
            </div>
            <div>
              <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Work Shift</label>
              <select class="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none">
                <option>Morning (06:00 - 14:00)</option>
                <option selected>Afternoon (14:00 - 22:00)</option>
                <option>Night (22:00 - 06:00)</option>
              </select>
            </div>
            <div class="sm:col-span-2">
              <label class="block text-xs font-bold text-gray-500 uppercase mb-1">Notifications</label>
              <div class="flex items-center gap-4 mt-2">
                <label class="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" checked class="sr-only peer">
                  <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
                  <span class="ml-3 text-sm text-gray-600">Emergency Route Alerts</span>
                </label>
              </div>
            </div>
          </div>
          <div class="px-6 py-4 bg-gray-50/50 text-right">
            <button class="bg-indigo-600 text-white px-6 py-2 rounded-lg text-sm font-bold shadow-sm hover:bg-indigo-500">Save Changes</button>
          </div>
        </div>

        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <div class="px-6 py-4 border-b border-gray-100 bg-white">
            <h3 class="font-semibold text-gray-900">Recent Activity</h3>
          </div>
          <ul role="list" class="divide-y divide-gray-100">
            <li v-for="log in activity" :key="log.id" class="px-6 py-4 flex items-center justify-between">
              <div class="flex gap-3 items-center">
                <span :class="log.color" class="h-2 w-2 rounded-full"></span>
                <p class="text-sm text-gray-700 font-medium">{{ log.action }}</p>
              </div>
              <span class="text-xs text-gray-400">{{ log.time }}</span>
            </li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
const activity = [
  { id: 1, action: 'Assigned Driver "Elena G." to Route 44', time: '12 mins ago', color: 'bg-indigo-500' },
  { id: 2, action: 'Cleared Maintenance Alert: BUS-2045', time: '2 hours ago', color: 'bg-green-500' },
  { id: 3, action: 'Modified Schedule: Downtown Loop', time: 'Yesterday', color: 'bg-yellow-500' },
]
</script>
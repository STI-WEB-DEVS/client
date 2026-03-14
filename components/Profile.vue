<script setup>
import { ref } from 'vue';

const activeTab = ref('Overview');
const tabs = ['Overview', 'Activity', 'Settings', 'Documents'];

const user = ref({
  name: 'Charles Robbie',
  role: 'Senior Blood Bank Administrator',
  id: 'ST-99203',
  joinDate: 'January 2024',
  bio: 'Overseeing daily operations and community outreach programs. Focused on optimizing donor retention and emergency blood supply logistics.',
  skills: [
    { name: 'Crisis Management', level: 95 },
    { name: 'Logistics', level: 88 },
    { name: 'Public Relations', level: 75 }
  ],
  stats: [
    { label: 'Drives Managed', value: '42' },
    { label: 'Donors Registered', value: '1.2k' },
    { label: 'Success Rate', value: '98%' }
  ]
});
</script>

<template>
  <div class="min-h-screen bg-[#F0F2F6] p-4 md:p-8">
    <div class="max-w-5xl mx-auto bg-white rounded-[2rem] shadow-xl overflow-hidden border border-white">
      
      <div class="h-48 bg-gradient-to-r from-[#2C334E] to-[#50597E] relative">
        <button class="absolute top-6 right-6 bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-lg text-sm border border-white/30 hover:bg-white/30 transition">
          Change Cover
        </button>
      </div>

      <div class="px-8 pb-8">
        <div class="relative flex flex-col md:flex-row items-end gap-6 -mt-16 mb-8">
          <img 
            src="https://images.unsplash.com/photo-1542385262-cdf06543fa60?w=400" 
            class="w-32 h-32 rounded-3xl border-4 border-white shadow-2xl object-cover bg-white"
          />
          <div class="flex-1 pb-2">
            <h1 class="text-3xl font-bold text-[#2C334E]">{{ user.name }}</h1>
            <p class="text-gray-500 font-medium">{{ user.role }} • ID: {{ user.id }}</p>
          </div>
          <div class="flex gap-3 pb-2">
            <button class="px-6 py-2.5 bg-[#2C334E] text-white rounded-xl font-medium hover:shadow-lg transition">Edit Profile</button>
          </div>
        </div>

        <div class="flex border-b border-gray-100 mb-8">
          <button 
            v-for="tab in tabs" 
            :key="tab"
            @click="activeTab = tab"
            :class="[
              'px-6 py-4 text-sm font-bold transition-all border-b-2',
              activeTab === tab ? 'border-[#2C334E] text-[#2C334E]' : 'border-transparent text-gray-400 hover:text-gray-600'
            ]"
          >
            {{ tab }}
          </button>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          <div class="lg:col-span-2 space-y-8">
            <section>
              <h3 class="text-lg font-bold text-[#2C334E] mb-4">About</h3>
              <p class="text-gray-600 leading-relaxed">{{ user.bio }}</p>
            </section>

            <section class="grid grid-cols-3 gap-4">
              <div v-for="stat in user.stats" :key="stat.label" class="bg-[#F8FAFC] p-6 rounded-2xl border border-gray-50 text-center">
                <p class="text-2xl font-black text-[#2C334E]">{{ stat.value }}</p>
                <p class="text-[10px] uppercase tracking-widest text-gray-400 font-bold">{{ stat.label }}</p>
              </div>
            </section>

            <section>
              <h3 class="text-lg font-bold text-[#2C334E] mb-6">Activity Timeline</h3>
              <div class="space-y-6">
                <div class="flex gap-4">
                  <div class="w-2 h-2 mt-2 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]"></div>
                  <div>
                    <p class="text-sm font-bold text-gray-800">Approved 'Annual City Drive' Schedule</p>
                    <p class="text-xs text-gray-400">2 hours ago</p>
                  </div>
                </div>
                <div class="flex gap-4">
                  <div class="w-2 h-2 mt-2 rounded-full bg-blue-500"></div>
                  <div>
                    <p class="text-sm font-bold text-gray-800">Updated Donor Eligibility Criteria</p>
                    <p class="text-xs text-gray-400">Yesterday at 4:30 PM</p>
                  </div>
                </div>
              </div>
            </section>
          </div>

          <div class="space-y-8">
            <div class="bg-[#F8FAFC] p-6 rounded-3xl border border-gray-50">
              <h3 class="font-bold text-[#2C334E] mb-6">Professional Skills</h3>
              <div class="space-y-5">
                <div v-for="skill in user.skills" :key="skill.name">
                  <div class="flex justify-between text-xs mb-2">
                    <span class="font-bold text-gray-700">{{ skill.name }}</span>
                    <span class="text-gray-400">{{ skill.level }}%</span>
                  </div>
                  <div class="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      class="h-full bg-[#2C334E] rounded-full" 
                      :style="{ width: skill.level + '%' }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="p-6 rounded-3xl border-2 border-dashed border-gray-200 text-center">
              <p class="text-xs text-gray-400 font-medium mb-1">Joined the Bank on</p>
              <p class="text-sm font-bold text-[#2C334E]">{{ user.joinDate }}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>
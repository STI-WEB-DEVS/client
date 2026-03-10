<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50 p-6 text-gray-900 font-sans">
      <div class="max-w-7xl mx-auto space-y-6">
        
        <header class="flex items-end justify-between border-b border-gray-200 pb-6">
          <div>
            <h1 class="text-2xl font-bold tracking-tight text-gray-900">Statistics</h1>
            <p class="text-sm text-gray-500 mt-1">Global system performance and engagement metrics.</p>
          </div>
          <div class="flex gap-3">
            <button class="text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors">
              Export PDF
            </button>
            <button 
              @click="navigateTo('/logout')" 
              class="text-sm font-semibold text-red-600 hover:text-red-700 transition-colors"
            >
              Logout
            </button>
          </div>
        </header>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div v-for="item in summary" :key="item.label" class="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
            <dt class="text-xs font-medium text-gray-500 uppercase tracking-wider">{{ item.label }}</dt>
            <dd class="mt-1 flex items-baseline justify-between">
              <span class="text-2xl font-bold text-gray-900">{{ item.value }}</span>
              <span class="text-xs font-mono text-green-600 bg-green-50 px-1.5 py-0.5 rounded">
                {{ item.change }}
              </span>
            </dd>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div class="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-6">
            <h3 class="text-sm font-bold text-gray-800 mb-6">User Activity (Last 7 Days)</h3>
            <div class="h-64 flex items-end justify-between gap-2 px-2">
              <div v-for="(val, i) in [35, 65, 45, 85, 55, 95, 70]" :key="i" 
                class="flex-1 bg-indigo-500 rounded-t-sm hover:bg-indigo-600 transition-all cursor-pointer group relative"
                :style="{ height: val + '%' }">
                <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  {{ val }}%
                </span>
              </div>
            </div>
            <div class="flex justify-between mt-4 text-[10px] font-bold text-gray-400">
              <span>MAR 04</span><span>MAR 05</span><span>MAR 06</span><span>MAR 07</span><span>MAR 08</span><span>MAR 09</span><span>TODAY</span>
            </div>
          </div>

          <div class="bg-white border border-gray-200 rounded-xl p-6">
            <h3 class="text-sm font-bold text-gray-800 mb-6">System Distribution</h3>
            <div class="space-y-6">
              <div v-for="source in sources" :key="source.name">
                <div class="flex justify-between text-sm mb-2">
                  <span class="text-gray-600">{{ source.name }}</span>
                  <span class="font-bold">{{ source.percent }}%</span>
                </div>
                <div class="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                  <div class="bg-indigo-500 h-full" :style="{ width: source.percent + '%' }"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
const summary = [
  { label: 'Live Users', value: '1,284', change: '+4.3%' },
  { label: 'Total Revenue', value: '₱12.4k', change: '+12.1%' },
  { label: 'Conversion', value: '3.2%', change: '+0.8%' },
  { label: 'System Load', value: '14%', change: '-2.0%' }
]

const sources = [
  { name: 'Direct Traffic', percent: 65 },
  { name: 'Social Media', percent: 20 },
  { name: 'Referral', percent: 15 }
]
</script>
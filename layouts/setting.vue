<template>
  <div class="flex min-h-screen bg-slate-50">
    <aside class="w-72 border-r border-slate-200 bg-white p-6 md:block">
      <div class="mb-8">
        <NuxtLink to="/dashboard" class="text-xs font-bold text-blue-600 uppercase tracking-widest hover:underline">
          ← Back to Dashboard
        </NuxtLink>
        <h1 class="text-2xl font-bold text-slate-800 mt-2">Settings</h1>
      </div>

      <nav class="space-y-1">
        <NuxtLink 
          v-for="item in menu" 
          :key="item.path" 
          :to="item.path"
          class="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-all"
          :class="$route.path === item.path ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-500 hover:bg-slate-100'"
        >
          <span class="text-lg">{{ item.icon }}</span>
          {{ item.name }}
        </NuxtLink>
      </nav>
    </aside>

    <main class="flex-1 p-8 lg:p-12 overflow-y-auto">
      <div class="w-full">
       <slot />
      </div>
    </main>
  </div>
</template>

<script setup>
const menu = [
  { name: 'General', path: '/setting/general', icon: '⚙️' },
  { name: 'Appearance', path: '/setting/appearance', icon: '🎨' },
  { name: 'Language & Region', path: '/setting/language', icon: '🌐' },
]

</script>
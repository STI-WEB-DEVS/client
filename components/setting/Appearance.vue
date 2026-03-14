<template>
  <section id="appearance" class="scroll-mt-10">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-slate-800">Appearance</h2>
      <p class="text-sm text-slate-500">Customize the visual theme and interface behavior.</p>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
      <div class="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
        <div class="flex gap-4 items-center">
          <div class="p-2 bg-indigo-100 text-indigo-600 rounded-lg">🎨</div>
          <div>
            <p class="text-sm font-bold text-slate-700">Dark Mode</p>
            <p class="text-xs text-slate-400">Optimize the UI for low-light environments.</p>
          </div>
        </div>
        <button class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors">
          <span class="inline-block h-4 w-4 transform rounded-full bg-white transition-transform" />
        </button>
      </div>

      <div class="space-y-3">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Interface Scaling</label>
        <div class="flex gap-2">
          <button class="px-4 py-2 bg-green-600 text-white rounded-lg text-xs font-bold">Default</button>
          <button class="px-4 py-2 bg-slate-100 text-slate-500 rounded-lg text-xs font-bold hover:bg-slate-200">Compact</button>
        </div>
      </div>
    </div>
  </section>
</template>


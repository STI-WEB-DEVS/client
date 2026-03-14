<template>
  <section id="region" class="scroll-mt-10">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-slate-800">Language & Region</h2>
      <p class="text-sm text-slate-500">Adjust localization settings and date formats.</p>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Language</label>
        <select class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-slate-700">
          <option>English (US)</option>
          <option>Filipino</option>
        </select>
      </div>
      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date Format</label>
        <select class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none font-semibold text-slate-700">
          <option>MM/DD/YYYY</option>
          <option>DD/MM/YYYY</option>
        </select>
      </div>
    </div>
  </section>
</template>
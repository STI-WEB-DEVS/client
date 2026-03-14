<template>
  <div class="space-y-6">
    <div class="mb-4">
      <h2 class="text-xl font-bold text-slate-800">General Configuration</h2>
      <p class="text-sm text-slate-500">Global system identity and identification for this branch.</p>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      
      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization Name</label>
        <div class="relative">
          <input 
            type="text" 
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold text-slate-700"
            placeholder="e.g. HealthCare OS v3"
          />
        </div>
      </div>

       <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Organization Address</label>
        <div class="relative">
          <input 
            type="text" 
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold text-slate-700"
            placeholder="e.g. HealthCare OS v3"
          />
        </div>
      </div>

      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">System Identifier</label>
        <div class="flex gap-2">
          <input 
            type="text" 
            value="HCOS-MNL-101" 
            readonly 
            class="flex-1 px-4 py-3 bg-slate-100 border border-slate-200 rounded-xl outline-none font-mono text-xs text-slate-500 cursor-not-allowed" 
          />
          <button class="px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 transition">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
        <p class="text-[10px] text-slate-400 italic">This ID is unique to this branch and cannot be changed.</p>
      </div>

      <hr class="border-slate-100" />

      <div class="space-y-2">
        <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Administrative Contact</label>
        <input 
          type="email" 
          class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold text-slate-700"
          placeholder="admin@branch.com"
        />
      </div>

    </div>

    <div class="flex justify-end pt-2">
      <button class=" bg-green-600 text-white px-8 py-3 rounded-xl text-sm font-bold hover:bg-black transition active:scale-95 shadow-lg shadow-slate-200">
        Update General Settings
      </button>
    </div>
  </div>
</template>

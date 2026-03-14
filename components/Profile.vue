<template>
  <section id="profile" class="scroll-mt-10">
    <div class="mb-6">
      <h2 class="text-xl font-bold text-slate-800">My Profile</h2>
      <p class="text-sm text-slate-500">Manage your personal information and how it appears to others.</p>
    </div>

    <div class="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-8">
      
      <div class="flex items-center gap-6 pb-2">
        <div class="h-20 w-20 bg-slate-100 rounded-2xl flex items-center justify-center border-2 border-dashed border-slate-200 text-slate-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
        </div>
        <div>
          <button class="text-sm font-bold text-blue-600 hover:text-blue-700">Upload Photo</button>
          <p class="text-xs text-slate-400 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
        </div>
      </div>

      <hr class="border-slate-100" />

      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">First Name</label>
          <input 
            type="text" 
            placeholder="John"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold text-slate-700" 
          />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Last Name</label>
          <input 
            type="text" 
            placeholder="Doe"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold text-slate-700" 
          />
        </div>

        <div class="space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Date of Birth</label>
          <input 
            type="date" 
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold text-slate-700" 
          />
        </div>

        <div class="md:col-span-2 space-y-2">
          <label class="text-[10px] font-black text-slate-400 uppercase tracking-widest">Home Address</label>
          <input 
            type="text" 
            placeholder="Street, City, Province, Zip Code"
            class="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition font-semibold text-slate-700" 
          />
        </div>
      </div>

      <div class="pt-4 flex justify-end">
        <button class="bg-green-600 text-white px-10 py-3 rounded-xl text-sm font-bold hover:bg-black transition shadow-lg shadow-slate-200">
          Save Profile
        </button>
      </div>
    </div>
  </section>
</template>
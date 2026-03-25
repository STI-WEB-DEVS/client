<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-8">
      <h1 class="text-2xl font-black text-[#0088cc] italic uppercase">Admin Profile</h1>
      <p class="text-black font-bold mt-1">Update your personal information and account security.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div class="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm text-center">
        <div class="relative inline-block">
          <img class="size-32 rounded-full border-4 border-sky-50 shadow-md mx-auto" 
               src="https://i.pinimg.com/1200x/b0/25/d2/b025d2b33ebe6db7e576ff3476f9acde.jpg" 
               alt="Admin Profile" />
          <button class="absolute bottom-0 right-0 bg-[#0088cc] p-2 rounded-full text-white shadow-lg border-2 border-white">
            <CameraIcon class="size-4" />
          </button>
        </div>
        <h2 class="mt-4 text-xl font-black text-slate-900">Admin User</h2>
        <p class="text-slate-500 text-sm font-bold uppercase">System Administrator</p>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <div class="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h3 class="text-lg font-black text-slate-900 mb-6 border-b pb-2">Personal Information</h3>
          
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-xs font-black text-black uppercase tracking-wider mb-2">Full Name</label>
              <input type="text" value="TravelEase Admin" class="w-full rounded-xl border-slate-200 bg-slate-50 font-bold text-slate-700 focus:border-[#0088cc] focus:ring-[#0088cc]" />
            </div>
            <div>
              <label class="block text-xs font-black text-black uppercase tracking-wider mb-2">Username</label>
              <input type="text" value="admin_travelease" class="w-full rounded-xl border-slate-200 bg-slate-50 font-bold text-slate-700 focus:border-[#0088cc] focus:ring-[#0088cc]" />
            </div>
            <div class="md:col-span-2">
              <label class="block text-xs font-black text-black uppercase tracking-wider mb-2">Email Address</label>
              <input type="email" value="admin@travelease.ph" class="w-full rounded-xl border-slate-200 bg-slate-50 font-bold text-slate-700 focus:border-[#0088cc] focus:ring-[#0088cc]" />
            </div>
          </div>

          <div class="mt-8 flex justify-end">
            <button class="bg-[#0088cc] text-white px-8 py-3 rounded-xl font-black uppercase italic shadow-lg shadow-blue-100 hover:bg-[#0077b3] transition-all active:scale-95">
              Update Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CameraIcon } from '@heroicons/vue/24/solid'
</script>
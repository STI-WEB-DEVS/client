<template>
    <NuxtLayout name="default">
      <div class="py-10 px-4 sm:px-6 lg:px-8">
        <div class="mb-8">
          <h1 class="text-3xl font-extrabold text-gray-900 tracking-tight">User Profile</h1>
          <p class="mt-2 text-sm text-gray-500">View and update your personal administrative details.</p>
        </div>
  
        <div class="flex flex-col lg:flex-row gap-8">
          <div class="w-full lg:w-80 shrink-0">
            <div class="bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 overflow-hidden">
              <div class="bg-[#0f2573] h-24 w-full"></div>
              <div class="px-6 pb-8 text-center -mt-12">
                <div class="inline-block relative">
                  <img 
                    class="h-32 w-32 rounded-full border-4 border-white object-cover shadow-lg mx-auto bg-gray-100" 
                    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" 
                    alt="Profile Picture" 
                  />
                  <span class="absolute bottom-1 right-1 block h-6 w-6 rounded-full bg-green-400 border-2 border-white"></span>
                </div>
                <h2 class="mt-4 text-xl font-bold text-gray-900">Sean Kenneth H. Axalan</h2>
                <p class="text-xs font-bold text-[#0f2573] uppercase tracking-widest mt-1">System Administrator</p>
                
                <div class="mt-6 flex flex-col gap-2">
                   <div class="flex justify-between text-sm py-2 border-t border-gray-100">
                     <span class="text-gray-500">Status</span>
                     <span class="font-semibold text-green-600">Active</span>
                   </div>
                   <div class="flex justify-between text-sm py-2 border-t border-gray-100">
                     <span class="text-gray-500">Joined</span>
                     <span class="font-semibold text-gray-900">Jan 2026</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
  
          <div class="flex-1 space-y-8">
            <div class="bg-white shadow-sm ring-1 ring-gray-200 rounded-2xl overflow-hidden">
              <div class="px-6 py-8 sm:p-10">
                <h3 class="text-lg font-bold text-gray-900 mb-8 border-b border-gray-100 pb-4">Personal Information</h3>
                
                <div class="space-y-6">
                  <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label class="text-sm font-bold text-gray-700">Full Name</label>
                    <div class="sm:col-span-2">
                      <input type="text" value="Sean Kenneth H. Axalan" class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#0f2573] sm:text-sm" />
                    </div>
                  </div>
  
                  <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label class="text-sm font-bold text-gray-700">Email Address</label>
                    <div class="sm:col-span-2">
                      <input type="email" value="sean.axalan@ets.com" class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#0f2573] sm:text-sm" />
                    </div>
                  </div>
  
                  <div class="grid grid-cols-1 sm:grid-cols-3 items-center gap-4">
                    <label class="text-sm font-bold text-gray-700">Department</label>
                    <div class="sm:col-span-2">
                      <input type="text" value="Infrastructure & Systems Security" class="block w-full rounded-xl border-0 py-3 px-4 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-[#0f2573] sm:text-sm" />
                    </div>
                  </div>
                </div>
              </div>
  
              <div class="flex items-center justify-end gap-x-4 bg-gray-50 px-6 py-4 border-t border-gray-100">
                <button type="button" class="text-sm font-bold text-gray-600 hover:text-gray-900">Cancel</button>
                <button type="submit" class="rounded-xl bg-[#0f2573] px-10 py-2.5 text-sm font-bold text-white shadow-md hover:bg-[#1a3a8a] transition-all">
                  Save Changes
                </button>
              </div>
            </div>
  
            <div class="bg-white shadow-sm ring-1 ring-gray-200 rounded-2xl p-6 sm:p-8 flex items-center justify-between">
              <div>
                <h3 class="text-lg font-bold text-gray-900">Security & Password</h3>
                <p class="text-sm text-gray-500">Update your account login credentials.</p>
              </div>
              <button class="text-sm font-bold text-white bg-gray-900 px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors">
                Update Password
              </button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
<template>
    <NuxtLayout>
      <div class="p-6 md:p-8 bg-gray-50 min-h-screen">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-gray-900">Account Profile</h1>
          <p class="text-gray-500 mt-1">Update your personal details and manage your account.</p>
        </div>
  
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div class="lg:col-span-1">
            <div class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-center">
              <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-white shadow-inner"></div>
              <h2 class="text-xl font-bold text-gray-900">Rylle Manco</h2>
              <p class="text-sm text-gray-500">Senior Product Designer</p>
              <button class="mt-6 w-full py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50">
                Change Avatar
              </button>
            </div>
          </div>
  
          <div class="lg:col-span-2 space-y-6">
            <section class="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label class="block text-sm font-medium text-gray-700">First Name</label>
                  <input type="text" value="Jane" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700">Last Name</label>
                  <input type="text" value="Doe" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">
                </div>
                <div class="md:col-span-2">
                  <label class="block text-sm font-medium text-gray-700">Bio</label>
                  <textarea rows="3" class="mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none">Passionate about design systems and user-centric architecture.</textarea>
                </div>
              </div>
            </section>
  
            <div class="flex justify-end gap-3">
              <button class="px-5 py-2 font-medium text-gray-600 hover:text-gray-900">Cancel</button>
              <button class="px-5 py-2 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700">Save Profile</button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
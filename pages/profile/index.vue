<template>
  <NuxtLayout>
    <div class="max-w-3xl mx-auto py-10">
      <div class="flex items-center gap-6 pb-8 border-b border-gray-100">
        <div class="h-24 w-24 rounded-2xl bg-black flex items-center justify-center text-white text-3xl font-bold shadow-sm">
          TC
        </div>
        <div>
          <h1 class="text-2xl font-extrabold text-gray-900">Tom Cook</h1>
          <p class="text-sm font-medium text-gray-500">Senior Librarian • Main Branch</p>
          <div class="mt-2 flex gap-2">
             <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-0.5 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20">Active</span>
          </div>
        </div>
      </div>

      <div class="mt-8 space-y-8">
        <div>
          <h3 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Contact Details</h3>
          <dl class="grid grid-cols-1 gap-y-4">
            <div class="flex justify-between border-b border-gray-50 pb-2">
              <dt class="text-sm text-gray-500">Email</dt>
              <dd class="text-sm font-bold text-gray-900">tom.cook@smartpark.com</dd>
            </div>
            <div class="flex justify-between border-b border-gray-50 pb-2">
              <dt class="text-sm text-gray-500">Phone</dt>
              <dd class="text-sm font-bold text-gray-900">+1 (555) 000-1234</dd>
            </div>
            <div class="flex justify-between border-b border-gray-50 pb-2">
              <dt class="text-sm text-gray-500">Location</dt>
              <dd class="text-sm font-bold text-gray-900">Office 204, East Wing</dd>
            </div>
          </dl>
        </div>

        <div class="pt-6 flex gap-4">
          <button class="flex-1 rounded-xl bg-black py-3 text-sm font-bold text-white hover:bg-gray-800 transition-colors">
            Edit Profile
          </button>
          <button class="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors">
            Account Settings
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
<template>
  <NuxtLayout>
    <h1 class="text-2xl font-bold mb-2" style="color: #1C3028;">User Profile</h1>
    <p class="text-gray-500 mb-8">Manage your personal information.</p>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex items-center gap-6 mb-6">
      <img src="https://cdn-images.dzcdn.net/images/artist/56c65ac9ea451119ddc8c0b02915d103/1900x1900-000000-80-0-0.jpg" class="size-20 rounded-full object-cover" />
      <div>
        <p class="text-xl font-bold text-gray-900">Nika Espantaleon</p>
        <p class="text-sm text-gray-500">Designer</p>
        <p class="text-sm" style="color: #C9A96E;">nika@servora.com</p>
      </div>
    </div>

    <div class="bg-white rounded-xl shadow-sm border border-gray-100 divide-y divide-gray-100">

      <div class="p-6 flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-900">Full Name</p>
          <p class="text-sm text-gray-500">Your display name</p>
        </div>
        <input type="text" value="Nika Espantaleon" class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none" />
      </div>

      <div class="p-6 flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-900">Email</p>
          <p class="text-sm text-gray-500">Your login email</p>
        </div>
        <input type="email" value="nika@servora.com" class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none" />
      </div>

      <div class="p-6 flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-900">Role</p>
          <p class="text-sm text-gray-500">Your position in the team</p>
        </div>
        <input type="text" value="Designer" class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none" />
      </div>

      <div class="p-6 flex items-center justify-between">
        <div>
          <p class="font-semibold text-gray-900">Password</p>
          <p class="text-sm text-gray-500">Change your password</p>
        </div>
        <input type="password" value="••••••••" class="rounded-lg border border-gray-300 px-3 py-1.5 text-sm focus:outline-none" />
      </div>

    </div>

    <div class="mt-6 flex justify-end">
      <button class="px-5 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90" style="background-color: #1C3028;">
        Save Changes
      </button>
    </div>
  </NuxtLayout>
</template>
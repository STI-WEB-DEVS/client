<template>
    <NuxtLayout>
        <div class="max-w-6xl mx-auto p-6">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Settings</h1>
        <p class="text-gray-500">Manage your account and system preferences.</p>
      </div>

      <div class="flex flex-col md:flex-row gap-8">
        <aside class="w-full md:w-64 space-y-2">
          <button 
            @click="activeTab = 'profile'"
            :class="[activeTab === 'profile' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-600 border-transparent hover:bg-gray-50']"
            class="w-full text-left px-4 py-3 rounded-lg border font-medium transition-all"
          >
            User Profile
          </button>
          <button 
            @click="activeTab = 'system'"
            :class="[activeTab === 'system' ? 'bg-blue-50 text-blue-700 border-blue-200' : 'text-gray-600 border-transparent hover:bg-gray-50']"
            class="w-full text-left px-4 py-3 rounded-lg border font-medium transition-all"
          >
            System Settings
          </button>
        </aside>

        <main class="flex-1 bg-white border border-gray-100 rounded-2xl p-8 shadow-sm">
          <div v-if="activeTab === 'profile'">
            <h2 class="text-xl font-bold mb-6">User Profile</h2>
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl">👤</div>
                <button class="text-sm font-semibold text-blue-600">Change Photo</button>
              </div>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <input type="text" value="Leanne Graham" class="w-full border rounded-lg p-2 focus:ring-2 focus:ring-blue-500 outline-none" />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input type="email" value="leanne@example.com" class="w-full border rounded-lg p-2 bg-gray-50 cursor-not-allowed" disabled />
                </div>
              </div>
            </div>
          </div>

          <div v-if="activeTab === 'system'">
            <h2 class="text-xl font-bold mb-6">System Settings</h2>
            <div class="space-y-6">
              <div class="flex items-center justify-between py-4 border-b">
                <div>
                  <p class="font-medium text-gray-800">Dark Mode</p>
                  <p class="text-sm text-gray-500">Toggle the application theme.</p>
                </div>
                <input type="checkbox" class="w-10 h-5 bg-gray-300 rounded-full appearance-none checked:bg-blue-600 transition cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:translate-x-5 after:transition" />
              </div>
              <div class="flex items-center justify-between py-4 border-b">
                <div>
                  <p class="font-medium text-gray-800">Email Notifications</p>
                  <p class="text-sm text-gray-500">Receive updates about system activity.</p>
                </div>
                <input type="checkbox" checked class="w-10 h-5 bg-gray-300 rounded-full appearance-none checked:bg-blue-600 transition cursor-pointer relative after:content-[''] after:absolute after:w-4 after:h-4 after:bg-white after:rounded-full after:top-0.5 after:left-0.5 checked:after:translate-x-5 after:transition" />
              </div>
            </div>
          </div>
          
          <div class="mt-8 pt-6 border-t flex justify-end">
            <button class="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Save Changes</button>
          </div>
        </main>
      </div>
    </div>
    </NuxtLayout>
</template>
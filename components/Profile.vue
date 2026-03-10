<template>
    <h1 class="text-2xl font-bold mb-4">Profile</h1>

    <div class="grid grid-cols-1 gap-6 lg:grid-cols-3">
      <div class="lg:col-span-2 space-y-6">
        <!-- Profile Information -->
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h2 class="text-lg font-semibold text-slate-900">Profile Information</h2>
          </div>
          <div class="px-6 py-6">
            <div class="flex items-center gap-6 mb-6">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Profile" class="h-20 w-20 rounded-full outline outline-2 -outline-offset-2 outline-amber-200" />
              <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
                Change Photo
              </button>
            </div>
            <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label class="block text-sm font-semibold text-slate-700">First Name</label>
                <input type="text" value="Tom" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
              </div>
              <div>
                <label class="block text-sm font-semibold text-slate-700">Last Name</label>
                <input type="text" value="Cook" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-semibold text-slate-700">Email</label>
                <input type="email" value="tom@example.com" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-semibold text-slate-700">Phone</label>
                <input type="tel" value="+63 912 345 6789" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-semibold text-slate-700">Title</label>
                <input type="text" value="Operations Manager" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
              </div>
            </div>
          </div>
        </div>

        <!-- Preferences -->
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h2 class="text-lg font-semibold text-slate-900">Preferences</h2>
          </div>
          <div class="px-6 py-6 space-y-4">
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700">Language</label>
              <select class="block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm">
                <option selected>English</option>
                <option>Filipino</option>
                <option>Spanish</option>
              </select>
            </div>
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700">Theme</label>
              <select class="block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm">
                <option selected>Light</option>
                <option>Dark</option>
                <option>Auto</option>
              </select>
            </div>
            <div>
              <label class="mb-2 block text-sm font-semibold text-slate-700">Notifications</label>
              <div class="space-y-2">
                <label class="flex items-center">
                  <input type="checkbox" checked class="h-4 w-4 rounded border-slate-300 text-amber-500" />
                  <span class="ml-2 text-sm text-slate-600">Email notifications</span>
                </label>
                <label class="flex items-center">
                  <input type="checkbox" checked class="h-4 w-4 rounded border-slate-300 text-amber-500" />
                  <span class="ml-2 text-sm text-slate-600">SMS notifications</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <!-- Change Password -->
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h2 class="text-lg font-semibold text-slate-900">Change Password</h2>
          </div>
          <div class="px-6 py-6 space-y-4">
            <div>
              <label class="block text-sm font-semibold text-slate-700">Current Password</label>
              <input type="password" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700">New Password</label>
              <input type="password" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700">Confirm Password</label>
              <input type="password" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-200 sm:text-sm" />
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <!-- Account Status -->
        <div class="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div class="border-b border-slate-100 bg-slate-50 px-6 py-4">
            <h2 class="text-sm font-semibold text-slate-900">Account Status</h2>
          </div>
          <div class="px-6 py-4 space-y-3 text-sm">
            <div class="flex justify-between">
              <span class="text-slate-600">Account Type</span>
              <span class="font-medium text-slate-900">Admin</span>
            </div>
            <div class="flex justify-between">
              <span class="text-gray-600">Status</span>
              <span class="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                Active
              </span>
            </div>
            <div class="flex justify-between">
              <span class="text-slate-600">Member Since</span>
              <span class="font-medium text-slate-900">Jan 15, 2024</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-end gap-4">
      <button class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Cancel
      </button>
      <button class="rounded-xl bg-slate-900 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-800">
        Save Changes
      </button>
    </div>
</template>
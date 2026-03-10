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
              <input type="password" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6D4C41] focus:outline-none focus:ring-2 focus:ring-[#6D4C41] sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700">New Password</label>
              <input type="password" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6D4C41] focus:outline-none focus:ring-2 focus:ring-[#6D4C41] sm:text-sm" />
            </div>
            <div>
              <label class="block text-sm font-semibold text-slate-700">Confirm Password</label>
              <input type="password" class="mt-1 block w-full rounded-xl border border-slate-300 px-3 py-2 text-slate-900 placeholder-slate-400 focus:border-[#6D4C41] focus:outline-none focus:ring-2 focus:ring-[#6D4C41] sm:text-sm" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-6 flex justify-right gap-4">
      <button class="rounded-xl border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
        Cancel
      </button>
      <button class="rounded-xl bg-[#6D4C41] px-4 py-2 text-sm font-semibold text-white hover:bg-[#6D4C41]">
        Save Changes
      </button>
    </div>
</template>
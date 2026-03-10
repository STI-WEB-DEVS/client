<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#F6F2EF] p-4 sm:p-6">
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Header / Hero -->
        <div class="rounded-3xl bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] px-6 py-7 text-white shadow-lg">
          <div class="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div class="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt="Profile" class="h-20 w-20 rounded-2xl object-cover ring-4 ring-white/20" />
              <div>
                <p class="text-xs font-semibold uppercase tracking-[0.25em] text-[#F3EFEC]">
                  Account
                </p>
                <h1 class="mt-2 text-3xl font-bold">My Profile</h1>
                <p class="mt-2 text-sm text-[#EDE4DE]">
                  Manage your personal details, preferences, and account security.
                </p>
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p class="text-xs text-[#F3EFEC]">Role</p>
                <p class="mt-1 text-lg font-bold text-white">Admin</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p class="text-xs text-[#F3EFEC]">Status</p>
                <p class="mt-1 text-lg font-bold text-white">Active</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p class="text-xs text-[#F3EFEC]">Since</p>
                <p class="mt-1 text-lg font-bold text-white">2024</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <!-- Left content -->
          <div class="space-y-6 xl:col-span-8">
            <!-- Profile Information -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white shadow-sm">
              <div class="border-b border-[#EFE7E2] px-6 py-5">
                <h2 class="text-lg font-bold text-[#4E413A]">Profile Information</h2>
                <p class="mt-1 text-sm text-[#9A877B]">
                  Update your contact details and role information.
                </p>
              </div>

              <div class="px-6 py-6">
                <div class="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div class="flex items-center gap-4">
                    <img
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt="Profile" class="h-20 w-20 rounded-2xl object-cover ring-2 ring-[#DCCFC7]" />
                    <div>
                      <p class="text-base font-semibold text-[#4E413A]">Tom Cook</p>
                      <p class="text-sm text-[#9A877B]">Operations Manager</p>
                    </div>
                  </div>

                  <button
                    class="rounded-2xl bg-[#8F7A6E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#7C695E]">
                    Change Photo
                  </button>
                </div>

                <div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-semibold text-[#6F5E54]">First Name</label>
                    <input type="text" value="Vince David"
                      class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                  </div>

                  <div>
                    <label class="block text-sm font-semibold text-[#6F5E54]">Last Name</label>
                    <input type="text" value="Canale"
                      class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                  </div>

                  <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold text-[#6F5E54]">Email</label>
                    <input type="email" value="Vincecnale@example.com"
                      class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                  </div>

                  <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold text-[#6F5E54]">Phone</label>
                    <input type="tel" value="+63 953 744 1076"
                      class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                  </div>

                  <div class="sm:col-span-2">
                    <label class="block text-sm font-semibold text-[#6F5E54]">Title</label>
                    <input type="text" value="Operations Manager"
                      class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                  </div>
                </div>
              </div>
            </div>

            <!-- Preferences -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white shadow-sm">
              <div class="border-b border-[#EFE7E2] px-6 py-5">
                <h2 class="text-lg font-bold text-[#4E413A]">Preferences</h2>
                <p class="mt-1 text-sm text-[#9A877B]">
                  Customize language, appearance, and notifications.
                </p>
              </div>

              <div class="space-y-6 px-6 py-6">
                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label class="mb-2 block text-sm font-semibold text-[#6F5E54]">Language</label>
                    <select
                      class="block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm">
                      <option selected>English</option>
                      <option>Filipino</option>
                      <option>Spanish</option>
                    </select>
                  </div>

                  <div>
                    <label class="mb-2 block text-sm font-semibold text-[#6F5E54]">Theme</label>
                    <select
                      class="block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm">
                      <option selected>Light</option>
                      <option>Dark</option>
                      <option>Auto</option>
                    </select>
                  </div>
                </div>

                <div class="rounded-2xl border border-[#E7DFDA] bg-[#FBF8F6] p-4">
                  <p class="mb-4 text-sm font-semibold text-[#4E413A]">Notifications</p>

                  <div class="space-y-4">
                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <p class="text-sm font-medium text-[#4E413A]">Email Notifications</p>
                        <p class="text-sm text-[#9A877B]">Receive account and activity updates by email.</p>
                      </div>

                      <label class="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" checked class="peer sr-only" />
                        <div
                          class="peer h-6 w-11 rounded-full bg-[#D9CDC6] transition after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#8F7A6E] peer-checked:after:translate-x-5">
                        </div>
                      </label>
                    </div>

                    <div class="flex items-start justify-between gap-4">
                      <div>
                        <p class="text-sm font-medium text-[#4E413A]">SMS Notifications</p>
                        <p class="text-sm text-[#9A877B]">Get critical alerts directly on your phone.</p>
                      </div>

                      <label class="relative inline-flex cursor-pointer items-center">
                        <input type="checkbox" checked class="peer sr-only" />
                        <div
                          class="peer h-6 w-11 rounded-full bg-[#D9CDC6] transition after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#8F7A6E] peer-checked:after:translate-x-5">
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Change Password -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white shadow-sm">
              <div class="border-b border-[#EFE7E2] px-6 py-5">
                <h2 class="text-lg font-bold text-[#4E413A]">Change Password</h2>
                <p class="mt-1 text-sm text-[#9A877B]">
                  Keep your account secure by using a strong password.
                </p>
              </div>

              <div class="grid grid-cols-1 gap-4 px-6 py-6">
                <div>
                  <label class="block text-sm font-semibold text-[#6F5E54]">Current Password</label>
                  <input type="password"
                    class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-[#6F5E54]">New Password</label>
                  <input type="password"
                    class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                </div>

                <div>
                  <label class="block text-sm font-semibold text-[#6F5E54]">Confirm Password</label>
                  <input type="password"
                    class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                </div>
              </div>
            </div>
          </div>

          <!-- Right content -->
          <div class="space-y-6 xl:col-span-4">
            <!-- Account Status -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white shadow-sm">
              <div class="border-b border-[#EFE7E2] px-6 py-5">
                <h2 class="text-lg font-bold text-[#4E413A]">Account Status</h2>
                <p class="mt-1 text-sm text-[#9A877B]">Overview of your account details.</p>
              </div>

              <div class="space-y-4 px-6 py-6">
                <div class="flex items-center justify-between rounded-2xl bg-[#FBF8F6] px-4 py-3">
                  <span class="text-sm text-[#9A877B]">Account Type</span>
                  <span class="font-semibold text-[#4E413A]">Admin</span>
                </div>

                <div class="flex items-center justify-between rounded-2xl bg-[#FBF8F6] px-4 py-3">
                  <span class="text-sm text-[#9A877B]">Status</span>
                  <span class="rounded-full bg-[#EEF3E8] px-3 py-1 text-xs font-semibold text-[#6F7B63]">
                    Active
                  </span>
                </div>

                <div class="flex items-center justify-between rounded-2xl bg-[#FBF8F6] px-4 py-3">
                  <span class="text-sm text-[#9A877B]">Member Since</span>
                  <span class="font-semibold text-[#4E413A]">Jan 15, 2024</span>
                </div>
              </div>
            </div>

            <!-- Security Overview -->
            <div class="rounded-3xl bg-gradient-to-b from-[#8F7A6E] to-[#6F5E54] p-6 text-white shadow-sm">
              <h2 class="text-lg font-bold">Security Overview</h2>
              <div class="mt-5 space-y-4">
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">Two-Factor Auth</span>
                  <span class="font-semibold">Enabled</span>
                </div>
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">Password Strength</span>
                  <span class="font-semibold">Strong</span>
                </div>
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">Last Login</span>
                  <span class="font-semibold">Today</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-[#EDE4DE]">Profile Complete</span>
                  <span class="font-semibold">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Actions -->
        <div class="flex justify-end gap-4">
          <button
            class="rounded-2xl border border-[#DCCFC7] bg-white px-5 py-2.5 text-sm font-semibold text-[#6F5E54] transition hover:bg-[#FBF8F6]">
            Cancel
          </button>
          <button
            class="rounded-2xl bg-[#8F7A6E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#7C695E]">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
</script>
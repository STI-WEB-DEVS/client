<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#F6F2EF] p-4 sm:p-6">
      <div class="mx-auto max-w-7xl space-y-6">
        <!-- Header -->
        <div class="rounded-3xl bg-gradient-to-r from-[#8F7A6E] to-[#6F5E54] px-6 py-7 text-white shadow-lg">
          <div class="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p class="text-xs font-semibold uppercase tracking-[0.25em] text-[#F3EFEC]">
                Configuration
              </p>
              <h1 class="mt-2 text-3xl font-bold">System Settings</h1>
              <p class="mt-2 max-w-2xl text-sm text-[#EDE4DE]">
                Manage operational defaults, notification preferences, and platform security for SmartPark.
              </p>
            </div>

            <div class="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p class="text-xs text-[#F3EFEC]">Modules</p>
                <p class="mt-1 text-lg font-bold text-white">12</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p class="text-xs text-[#F3EFEC]">Security</p>
                <p class="mt-1 text-lg font-bold text-white">Enabled</p>
              </div>
              <div class="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 backdrop-blur">
                <p class="text-xs text-[#F3EFEC]">Status</p>
                <p class="mt-1 text-lg font-bold text-white">Stable</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Content -->
        <div class="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <!-- Left -->
          <div class="space-y-6 xl:col-span-8">
            <!-- General Settings -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white shadow-sm">
              <div class="border-b border-[#EFE7E2] px-6 py-5">
                <h2 class="text-lg font-bold text-[#4E413A]">General Settings</h2>
                <p class="mt-1 text-sm text-[#9A877B]">
                  Update your main system preferences and notifications.
                </p>
              </div>

              <div class="space-y-6 px-6 py-6">
                <div>
                  <label class="block text-sm font-semibold text-[#6F5E54]">System Name</label>
                  <input type="text" value="SmartPark Operations"
                    class="mt-2 block w-full rounded-2xl border border-[#DCCFC7] bg-[#FBF8F6] px-4 py-3 text-[#4E413A] placeholder-[#B09C91] focus:border-[#8F7A6E] focus:outline-none focus:ring-4 focus:ring-[#E7DFDA] sm:text-sm" />
                </div>

                <div class="rounded-2xl border border-[#E7DFDA] bg-[#FBF8F6] p-4">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="text-sm font-semibold text-[#4E413A]">Email Notifications</p>
                      <p class="mt-1 text-sm text-[#9A877B]">
                        Receive important system alerts and operational updates by email.
                      </p>
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

            <!-- Security Settings -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white shadow-sm">
              <div class="border-b border-[#EFE7E2] px-6 py-5">
                <h2 class="text-lg font-bold text-[#4E413A]">Security Settings</h2>
                <p class="mt-1 text-sm text-[#9A877B]">
                  Protect user access and strengthen account authentication.
                </p>
              </div>

              <div class="space-y-6 px-6 py-6">
                <div class="rounded-2xl border border-[#E7DFDA] bg-[#FBF8F6] p-4">
                  <div class="flex items-start justify-between gap-4">
                    <div>
                      <p class="text-sm font-semibold text-[#4E413A]">Two-Factor Authentication</p>
                      <p class="mt-1 text-sm text-[#9A877B]">
                        Require all users to verify login with a second authentication step.
                      </p>
                    </div>

                    <label class="relative inline-flex cursor-pointer items-center">
                      <input type="checkbox" checked class="peer sr-only" />
                      <div
                        class="peer h-6 w-11 rounded-full bg-[#D9CDC6] transition after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:bg-white after:transition-all peer-checked:bg-[#8F7A6E] peer-checked:after:translate-x-5">
                      </div>
                    </label>
                  </div>
                </div>

                <div class="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div class="rounded-2xl border border-[#E7DFDA] bg-[#FBF8F6] p-4">
                    <p class="text-sm font-semibold text-[#4E413A]">Password Policy</p>
                    <p class="mt-1 text-sm text-[#9A877B]">Minimum 8 characters required</p>
                  </div>

                  <div class="rounded-2xl border border-[#E7DFDA] bg-[#FBF8F6] p-4">
                    <p class="text-sm font-semibold text-[#4E413A]">Session Timeout</p>
                    <p class="mt-1 text-sm text-[#9A877B]">Automatic logout after 30 minutes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Right -->
          <div class="space-y-6 xl:col-span-4">
            <!-- System Status -->
            <div class="rounded-3xl border border-[#E7DFDA] bg-white shadow-sm">
              <div class="border-b border-[#EFE7E2] px-6 py-5">
                <h2 class="text-lg font-bold text-[#4E413A]">System Status</h2>
                <p class="mt-1 text-sm text-[#9A877B]">Live service and platform health overview.</p>
              </div>

              <div class="space-y-4 px-6 py-6">
                <div v-for="item in statusItems" :key="item.name"
                  class="flex items-center justify-between rounded-2xl bg-[#FBF8F6] px-4 py-3">
                  <div class="flex items-center gap-3">
                    <span class="h-2.5 w-2.5 rounded-full" :class="item.dot"></span>
                    <span class="text-sm font-medium text-[#4E413A]">{{ item.name }}</span>
                  </div>

                  <span class="rounded-full px-3 py-1 text-xs font-semibold" :class="item.badge">
                    {{ item.status }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Settings Summary -->
            <div class="rounded-3xl bg-gradient-to-b from-[#8F7A6E] to-[#6F5E54] p-6 text-white shadow-sm">
              <h2 class="text-lg font-bold">Configuration Summary</h2>
              <div class="mt-5 space-y-4">
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">System Name</span>
                  <span class="font-semibold">SmartPark</span>
                </div>
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">Email Alerts</span>
                  <span class="font-semibold">Enabled</span>
                </div>
                <div class="flex items-center justify-between border-b border-white/10 pb-3">
                  <span class="text-sm text-[#EDE4DE]">2FA Policy</span>
                  <span class="font-semibold">Required</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-sm text-[#EDE4DE]">Environment</span>
                  <span class="font-semibold">Production</span>
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
const statusItems = [
  {
    name: 'Database',
    status: 'Connected',
    dot: 'bg-[#A7B19A]',
    badge: 'bg-[#EEF3E8] text-[#6F7B63]',
  },
  {
    name: 'API Server',
    status: 'Running',
    dot: 'bg-[#A7B19A]',
    badge: 'bg-[#EEF3E8] text-[#6F7B63]',
  },
  {
    name: 'QR System',
    status: 'Active',
    dot: 'bg-[#C7A86D]',
    badge: 'bg-[#F8F1E4] text-[#9B7A3F]',
  },
]
</script>
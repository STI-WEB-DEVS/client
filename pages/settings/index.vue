<template>
  <NuxtLayout>
    <div class="lg:flex lg:gap-x-16">
      <aside
        class="flex overflow-x-auto border-b border-gray-900/5 py-4 lg:block lg:w-64 lg:flex-none lg:border-0 lg:py-0"
      >
        <nav class="flex-none px-4 sm:px-6 lg:px-0">
          <ul role="list" class="flex gap-x-3 gap-y-1 lg:flex-col">
            <li v-for="item in settingsNav" :key="item.name">
              <a
                :href="item.href"
                :class="[
                  item.current
                    ? 'bg-gray-50 text-indigo-600'
                    : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                  'group flex gap-x-3 rounded-md py-2 pl-2 pr-3 text-sm font-semibold',
                ]"
              >
                <component :is="item.icon" class="size-6 shrink-0" />
                {{ item.name }}
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      <main class="px-4 py-16 sm:px-6 lg:flex-auto lg:px-0 lg:py-0">
        <div class="mx-auto max-w-2xl lg:mx-0">
          <h2 class="text-base font-semibold leading-7 text-gray-900">
            System Preferences
          </h2>
          <p class="mt-1 text-sm leading-6 text-gray-500">Manager yarn.</p>

          <form class="mt-10 space-y-8 divide-y divide-gray-900/10">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div class="sm:col-span-4">
                <label class="block text-sm font-medium text-gray-900"
                  >Service URL</label
                >
                <input
                  type="text"
                  value="https://jsonplaceholder.typicode.com"
                  class="mt-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-600 sm:text-sm"
                />
              </div>
            </div>
            <div class="flex pt-6">
              <button
                type="submit"
                class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  </NuxtLayout>
</template>


<script setup>
    import { BellIcon, KeyIcon, CpuChipIcon } from "@heroicons/vue/24/outline";
    const settingsNav = [
    { name: "General", href: "#", icon: CpuChipIcon, current: true },
    { name: "Security", href: "#", icon: KeyIcon, current: false },
    { name: "Notifications", href: "#", icon: BellIcon, current: false },
    ];
</script>
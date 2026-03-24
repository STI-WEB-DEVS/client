<template>
    <NuxtLayout>
      <div class="px-4 py-16 sm:px-6 lg:px-8">
        <div class="mx-auto max-w-2xl lg:max-w-none">
          <h1 class="text-base font-semibold leading-7 text-gray-900">Settings</h1>
          <p class="mt-1 text-sm leading-6 text-gray-500">Manage how your propertyFlow dashboard behaves.</p>
  
          <div class="mt-10 space-y-10 divide-y divide-gray-200">
            <div class="grid grid-cols-1 gap-x-8 gap-y-10 pt-10 md:grid-cols-3">
              <div>
                <h2 class="text-base font-semibold leading-7 text-gray-900">Notifications</h2>
                <p class="mt-1 text-sm leading-6 text-gray-500">Control which emails you receive regarding property updates.</p>
              </div>
              <div class="max-w-2xl space-y-6 md:col-span-2">
                <div class="flex items-center justify-between">
                  <span class="flex grow flex-col">
                    <span class="text-sm font-medium leading-6 text-gray-900">Email Notifications</span>
                    <span class="text-sm text-gray-500">Receive alerts when a new team member joins.</span>
                  </span>
                  <button type="button" class="bg-green-900 relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out">
                    <span class="translate-x-5 pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"></span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
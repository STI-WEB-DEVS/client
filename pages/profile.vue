<template>
    <NuxtLayout>
      <div class="divide-y divide-white/5">
        <div class="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
          <div>
            <h2 class="text-base font-semibold leading-7 text-gray-900">Personal Information</h2>
            <p class="mt-1 text-sm leading-6 text-gray-500">Update your photo and personal details.</p>
          </div>
  
          <form class="md:col-span-2">
            <div class="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
              <div class="col-span-full flex items-center gap-x-8">
                <img src="https://cdn.britannica.com/05/236505-050-17B6E34A/Elon-Musk-2022.jpg" alt="" class="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover" />
                <div>
                  <button type="button" class="rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800">Change avatar</button>
                  <p class="mt-2 text-xs leading-5 text-gray-400">JPG, GIF or PNG. 1MB max.</p>
                </div>
              </div>
  
              <div class="sm:col-span-3">
                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">First name</label>
                <div class="mt-2">
                  <input type="text" value="Dedrich Bryce" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm" />
                </div>
              </div>
  
              <div class="sm:col-span-3">
                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Last name</label>
                <div class="mt-2">
                  <input type="text" value="Arce" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm" />
                </div>
              </div>
  
              <div class="col-span-full">
                <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                <div class="mt-2">
                  <input type="email" value="bryce@example.com" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-green-900 sm:text-sm" />
                </div>
              </div>
            </div>
  
            <div class="mt-8 flex">
              <button type="submit" class="rounded-md bg-green-900 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-800">Save changes</button>
            </div>
          </form>
        </div>
      </div>
    </NuxtLayout>
  </template>
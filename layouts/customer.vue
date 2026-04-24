<template>
  <div>
    <!-- keep your existing sidebar/topbar here -->

    <div class="lg:pl-72">
      <!-- keep your existing top navigation here -->

      <main class="py-8">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="mb-6 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div class="flex items-start justify-between gap-4">
              <div>
                <h1 class="text-2xl font-semibold text-gray-900">
                  Customer Profile
                </h1>
                <p class="mt-1 text-sm text-gray-500">
                  View customer details, orders, addresses, and activity.
                </p>
              </div>

              <NuxtLink
                to="/customer/create"
                class="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
              >
                Add Customer
              </NuxtLink>
            </div>
          </div>

          <div class="mb-6 border-b border-gray-200">
            <nav class="-mb-px flex gap-6">
              <NuxtLink
                to="/customer"
                class="border-b-2 border-indigo-600 px-1 pb-3 text-sm font-medium text-indigo-600"
              >
                Overview
              </NuxtLink>

              <NuxtLink
                to="/customer/orders"
                class="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Orders
              </NuxtLink>

              <NuxtLink
                to="/customer/addresses"
                class="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Addresses
              </NuxtLink>

              <NuxtLink
                to="/customer/notes"
                class="border-b-2 border-transparent px-1 pb-3 text-sm font-medium text-gray-500 hover:text-gray-700"
              >
                Notes
              </NuxtLink>
            </nav>
          </div>

          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
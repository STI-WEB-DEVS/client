<template>
  <div class="min-h-screen bg-gray-50">
    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <NuxtLink to="/shop" class="text-xl font-bold text-gray-900 hover:text-indigo-600">
          My Store
        </NuxtLink>

        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <NuxtLink to="/shop" class="hover:text-indigo-600 transition-colors">Shop</NuxtLink>
          <NuxtLink to="/categories" class="hover:text-indigo-600 transition-colors">Categories</NuxtLink>
          <NuxtLink to="/customer/order" class="hover:text-indigo-600 transition-colors">Orders</NuxtLink>
          <NuxtLink to="/account" class="hover:text-indigo-600 transition-colors">Account</NuxtLink>
        </div>

        <NuxtLink to="/cart" class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-indigo-300 transition-colors">
          Cart
        </NuxtLink>
      </div>
    </header>

    <main>
      <section class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div class="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                New arrivals
              </p>

              <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                Shop quality products made for everyday use.
              </h1>

              <p class="mt-5 max-w-xl text-base text-gray-600">
                Browse featured products, discover new items, and enjoy a simple shopping experience.
              </p>

              <div class="mt-8 flex gap-3">
                <NuxtLink to="/shop" class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition-colors">
                  Shop Now
                </NuxtLink>

                <NuxtLink to="/deals" class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                  View Deals
                </NuxtLink>
              </div>
            </div>

            <div class="rounded-2xl bg-gray-200 p-8">
              <div class="aspect-[4/3] rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-16 w-16 text-indigo-400">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25m9-5.25v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9v9" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>

        <div class="flex gap-6">
          <NuxtLink to="/help" class="hover:text-indigo-600 transition-colors">Help</NuxtLink>
          <NuxtLink to="/contact" class="hover:text-indigo-600 transition-colors">Contact</NuxtLink>
          <NuxtLink to="/privacy" class="hover:text-indigo-600 transition-colors">Privacy</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
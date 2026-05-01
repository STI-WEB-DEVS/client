<script setup>
definePageMeta({
  layout: 'customer'
})
</script>

<template>
  <div>
          <section class="bg-white">
        <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div class="grid items-center gap-12 lg:grid-cols-2">

            <!-- Text -->
            <div>
              <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
                New arrivals
              </p>

              <h1 class="mt-3 text-4xl font-bold text-gray-900 sm:text-5xl leading-tight">
                Shop quality products for everyday life
              </h1>

              <p class="mt-5 text-gray-600 max-w-lg">
                Discover curated items, explore new collections, and enjoy a smooth shopping experience.
              </p>

              <div class="mt-8 flex gap-4">
                
                <button class="rounded-md bg-indigo-600 px-6 py-3 text-sm font-semibold text-white hover:bg-indigo-700 transition" @click="navigateTo('/customer/shop')">
                  Shop Now
                </button>

                <button class="rounded-md border border-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition">
                  View Deals
                </button>
              </div>
            </div>

            <!-- Image Placeholder -->
            <div class="rounded-2xl bg-gray-100 p-6 shadow-sm">
              <div class="aspect-[4/3] rounded-xl bg-gray-300" />
            </div>
          </div>
        </div>
      </section>

  </div>
</template>
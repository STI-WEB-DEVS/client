<script setup lang="ts">
definePageMeta({
  layout: 'customer'
})
</script>

<template>
  <main>
    <section class="bg-white">
      <div class="">
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
              <NuxtLink to="/customer/shop" class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white">
                Shop Now
              </NuxtLink>

              <button class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700">
                View Deals
              </button>
            </div>
          </div>

          <div class="rounded-2xl bg-gray-200 p-8">
            <div class="aspect-[4/3] rounded-xl bg-gray-300" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

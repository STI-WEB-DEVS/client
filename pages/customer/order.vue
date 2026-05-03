<script setup>
definePageMeta({
  layout: 'customer',
  role: 'customer'
})

const router = useRouter()

const goToShop = () => {
  router.push('/customer/shop')
}
</script>

<template>
  <div class="flex flex-col items-center justify-center py-16">
    <div class="text-center">
      <p class="text-sm font-semibold uppercase tracking-wide text-indigo-600">
        New Arrivals
      </p>

      <h1 class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Shop quality products made for everyday use.
      </h1>

      <p class="mt-5 max-w-xl text-base text-gray-600">
        Browse featured products, discover new items, and enjoy a simple shopping experience.
      </p>

      <div class="mt-8 flex justify-center gap-3">
        <button
          @click="goToShop"
          class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500"
        >
          Shop Now
        </button>

        <button class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50">
          View Deals
        </button>
      </div>
    </div>
  </div>
</template>

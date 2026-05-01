<script setup lang="ts">
definePageMeta({
  layout: "customer",
});

const router = useRouter();

const goShop = () => {
  router.push("/customer/shop");
};
</script>

<template>
  <!-- HERO SECTION -->
  <section class="bg-white">
    <div class="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div class="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <p
            class="text-sm font-semibold uppercase tracking-wide text-indigo-600"
          >
            New arrivals
          </p>

          <h1
            class="mt-3 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            Shop quality products made for everyday use.
          </h1>

          <p class="mt-5 max-w-xl text-base text-gray-600">
            Browse featured products, discover new items, and enjoy a simple
            shopping experience.
          </p>

          <div class="mt-8 flex gap-3">
            <button
              @click="goShop"
              class="rounded-md bg-indigo-600 px-5 py-3 text-sm font-semibold text-white hover:bg-indigo-500 transition"
            >
              Shop Now
            </button>

            <button
              class="rounded-md border border-gray-300 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition"
            >
              View Deals
            </button>
          </div>
        </div>

        <div class="rounded-2xl bg-gray-200 p-8">
          <div
            class="aspect-[4/3] rounded-xl bg-gray-300 flex items-center justify-center text-gray-500 text-lg font-medium"
          >
            Featured Product
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

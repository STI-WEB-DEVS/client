<script setup lang="ts">
import { ShoppingCartIcon } from '@heroicons/vue/24/outline'
import { useCart } from '~/composables/useCart'

const { cartCount } = useCart()
</script>

<template>
  <div class="min-h-screen bg-stone-50 text-stone-950 antialiased">
    <header class="sticky top-0 z-40 border-b border-stone-200/70 bg-white/85 shadow-sm shadow-stone-950/5 backdrop-blur-xl">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <div class="text-xl font-bold tracking-tight text-stone-950">
          <NuxtLink to="/customer/shop" class="inline-flex items-center gap-2 transition hover:text-amber-700">
            <span class="h-2.5 w-2.5 rounded-full bg-gradient-to-br from-amber-500 to-rose-500 shadow-sm shadow-amber-500/40"></span>
            My Store
          </NuxtLink>
        </div>

        <div class="hidden items-center gap-2 rounded-full border border-stone-200 bg-stone-50/80 p-1 text-sm font-semibold text-stone-600 md:flex">
          <NuxtLink to="/customer/shop" class="rounded-full px-4 py-2 transition hover:bg-white hover:text-stone-950 hover:shadow-sm">Shop</NuxtLink>
          <span class="cursor-pointer rounded-full px-4 py-2 transition hover:bg-white hover:text-stone-950 hover:shadow-sm">Categories</span>
          <NuxtLink to="/customer/order" class="rounded-full px-4 py-2 transition hover:bg-white hover:text-stone-950 hover:shadow-sm">Orders</NuxtLink>
          <span class="cursor-pointer rounded-full px-4 py-2 transition hover:bg-white hover:text-stone-950 hover:shadow-sm">Account</span>
        </div>

        <NuxtLink to="/customer/cart" class="group inline-flex items-center justify-center gap-2 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm font-semibold text-stone-700 shadow-sm shadow-stone-950/5 transition duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:text-stone-950 hover:shadow-md">
          <ShoppingCartIcon class="h-4 w-4 text-stone-500 transition group-hover:text-amber-700" />
          Cart
          <span v-if="cartCount > 0" class="ml-1 rounded-full bg-stone-950 px-2 py-0.5 text-xs font-bold text-white">
            {{ cartCount }}
          </span>
        </NuxtLink>
      </div>
    </header>

    <main>
      <section v-if="$route.path === '/customer/shop'" class="border-b border-stone-200/70 bg-[radial-gradient(circle_at_top_left,rgba(245,158,11,0.16),transparent_32%),linear-gradient(135deg,#fffdf7_0%,#ffffff_48%,#f8fafc_100%)]">
        <div class="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8 lg:py-18">
          <div class="grid items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.35em] text-amber-700">
                New arrivals
              </p>
              <h1 class="mt-4 max-w-3xl text-4xl font-bold tracking-tight text-stone-950 sm:text-6xl">
                Shop quality products made for everyday use.
              </h1>
              <p class="mt-6 max-w-xl text-lg leading-8 text-stone-600">
                Browse featured products, discover new items, and enjoy a simple and premium shopping experience.
              </p>
              <div class="mt-10 flex flex-col gap-3 sm:flex-row">
                <button class="rounded-full bg-stone-950 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-stone-950/15 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-xl">
                  Shop Now
                </button>
                <button class="rounded-full border border-stone-300 bg-white/80 px-8 py-4 text-base font-semibold text-stone-700 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white hover:text-stone-950">
                  View Deals
                </button>
              </div>
            </div>

            <div class="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-white/80 bg-gradient-to-br from-stone-950 via-stone-800 to-amber-700 p-8 shadow-2xl shadow-stone-950/20 lg:h-[500px]">
              <div class="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.24),transparent_30%),radial-gradient(circle_at_80%_70%,rgba(251,191,36,0.25),transparent_32%)]"></div>
              <div class="relative flex h-full flex-col justify-end">
                <div class="max-w-sm rounded-3xl border border-white/15 bg-white/10 p-5 text-white shadow-2xl backdrop-blur-md">
                  <p class="text-xs font-semibold uppercase tracking-[0.25em] text-amber-100">Curated daily</p>
                  <p class="mt-3 text-2xl font-bold tracking-tight">Fresh finds, polished checkout, effortless buying.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <footer class="border-t border-stone-200 bg-white/80">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-stone-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>Copyright 2026 My Store. All rights reserved.</p>
        <div class="flex gap-6 font-medium text-stone-600">
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>
  </div>
</template>

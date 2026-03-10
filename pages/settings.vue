<template>
  <section class="space-y-8">
    <div class="rounded-2xl bg-gradient-to-br from-[#6D4C41] to-[#4E342E] p-8 text-white shadow-lg">
      <h1 class="text-3xl font-bold">System Settings</h1>
      <p class="mt-2 text-sm text-stone-100/80">Configure operational defaults for your coffee SaaS environment.</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-2">
      <article class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300">
        <h2 class="text-lg font-bold text-slate-900">Subscription Payment Notifications</h2>
        <p class="mt-1 text-sm text-slate-600">Notify cafés about upcoming subscription renewal payments.</p>

        <div class="mt-5 space-y-2 max-h-96 overflow-y-auto">
          <div v-for="cafe in cafes" :key="cafe.name" class="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-3">
            <div>
              <p class="text-sm font-semibold text-slate-900">{{ cafe.name }}</p>
              <p class="text-xs text-slate-600">{{ cafe.subscription }} - Due Soon</p>
            </div>
            <button type="button" class="rounded-lg bg-[#6D4C41] px-3 py-1 text-xs font-semibold text-white transition hover:bg-[#5D4037]">
              Notify
            </button>
          </div>
        </div>
      </article>

      <article class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300">
        <h2 class="text-lg font-bold text-slate-900">Notifications</h2>
        <p class="mt-1 text-sm text-slate-600">Control alerts for stock, shifts, and order queue spikes.</p>

        <div class="mt-5 space-y-3 text-sm">
          <label class="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-2">
            <span class="text-slate-700">Low-stock alerts</span>
            <input type="checkbox" checked class="size-4 accent-[#6D4C41]" />
          </label>
          <label class="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-2">
            <span class="text-slate-700">Queue spike alerts</span>
            <input type="checkbox" checked class="size-4 accent-[#6D4C41]" />
          </label>
          <label class="flex items-center justify-between rounded-lg border border-stone-200 px-3 py-2">
            <span class="text-slate-700">Shift reminders</span>
            <input type="checkbox" class="size-4 accent-[#6D4C41]" />
          </label>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'settings',
})

const cafes = [
  {
    name: 'Bean There Café',
    subscription: 'Basic',
    dueDate: '2026-03-20',
  },
  {
    name: 'Roast Republic',
    subscription: 'Standard',
    dueDate: '2026-03-15',
  },
  {
    name: 'Daily Grind House',
    subscription: 'Premium',
    dueDate: '2026-03-25',
  },
  {
    name: 'Mug & Bloom',
    subscription: 'Standard',
    dueDate: '2026-03-18',
  },
  {
    name: 'Crema Corner',
    subscription: 'Basic',
    dueDate: '2026-03-22',
  },
]
</script>

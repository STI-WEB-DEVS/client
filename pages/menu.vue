<template>
  <section class="space-y-8">
    <div class="rounded-2xl bg-gradient-to-br from-[#6D4C41] to-[#4E342E] p-8 text-white shadow-lg">
      <h1 class="text-3xl font-bold">Cafe Management</h1>
      <p class="mt-2 text-sm text-stone-100/80">Manage café subscriptions, owner information, and branch locations.</p>
    </div>

    <article class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300">
      <div class="mb-5">
        <div>
          <h2 class="text-xl font-bold text-slate-900">Cafe Records</h2>
          <p class="mt-1 text-sm text-slate-600">Update subscription tier, owner details, and location per café.</p>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-stone-50">
            <tr class="text-left">
              <th class="px-4 py-3 font-semibold text-stone-700">Café</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Subscription</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Owner</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Contact</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Location</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            <tr v-for="cafe in cafes" :key="cafe.name" class="hover:bg-stone-50">
              <td class="px-4 py-3.5 font-semibold text-slate-900">{{ cafe.name }}</td>
              <td class="px-4 py-3.5">
                <span class="inline-block rounded-full bg-stone-100 px-2.5 py-0.5 text-xs font-semibold text-stone-700">
                  {{ cafe.subscription }}
                </span>
              </td>
              <td class="px-4 py-3.5 text-slate-700">{{ cafe.owner }}</td>
              <td class="px-4 py-3.5 text-slate-600">{{ cafe.contact }}</td>
              <td class="px-4 py-3.5 text-slate-600">{{ cafe.location }}</td>
              <td class="px-4 py-3.5">
                <div class="flex flex-wrap gap-2">
                  <button type="button" class="rounded-md border border-stone-300 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100">Edit Subscription</button>
                  <button type="button" class="rounded-md border border-stone-300 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100">Edit Owner</button>
                  <button type="button" class="rounded-md border border-stone-300 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100">Edit Location</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>

    <article class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300">
      <div class="mb-5">
        <h2 class="text-xl font-bold text-slate-900">Subscription Requests</h2>
        <p class="mt-1 text-sm text-slate-600">Cafés requesting to avail a subscription plan.</p>
      </div>

      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-stone-50">
            <tr class="text-left">
              <th class="px-4 py-3 font-semibold text-stone-700">Café</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Requested Plan</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Owner</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Contact</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Location</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Status</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            <tr v-for="request in subscriptionRequests" :key="request.cafe" class="hover:bg-stone-50">
              <td class="px-4 py-3.5 font-semibold text-slate-900">{{ request.cafe }}</td>
              <td class="px-4 py-3.5 text-slate-700">{{ request.plan }}</td>
              <td class="px-4 py-3.5 text-slate-700">{{ request.owner }}</td>
              <td class="px-4 py-3.5 text-slate-600">{{ request.contact }}</td>
              <td class="px-4 py-3.5 text-slate-600">{{ request.location }}</td>
              <td class="px-4 py-3.5">
                <span
                  :class="[
                    request.status === 'Accepted'
                      ? 'bg-emerald-100 text-emerald-800'
                      : 'bg-amber-100 text-amber-800',
                    'inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold'
                  ]"
                >
                  {{ request.status }}
                </span>
              </td>
              <td class="px-4 py-3.5">
                <button
                  type="button"
                  class="rounded-md border border-stone-300 px-2.5 py-1.5 text-xs font-semibold text-stone-700 hover:bg-stone-100 disabled:cursor-not-allowed disabled:opacity-50"
                  :disabled="request.status === 'Accepted'"
                  @click="acceptRequest(request)"
                >
                  Accept
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </article>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const cafes = [
  {
    name: 'Bean There Café',
    subscription: 'Basic',
    owner: 'Alyssa Ramos',
    contact: '+63 912 345 6789 / alyssa@beanthere.ph',
    location: 'Poblacion District, Davao City',
  },
  {
    name: 'Roast Republic',
    subscription: 'Standard',
    owner: 'Marco Dela Cruz',
    contact: '+63 923 456 7890 / marco@roastrepublic.ph',
    location: 'Buhangin District, Davao City',
  },
  {
    name: 'Daily Grind House',
    subscription: 'Premium',
    owner: 'Nina Villanueva',
    contact: '+63 934 567 8901 / nina@dailygrind.ph',
    location: 'Talomo District, Davao City',
  },
  {
    name: 'Mug & Bloom',
    subscription: 'Standard',
    owner: 'Ethan Lim',
    contact: '+63 945 678 9012 / ethan@mugandbloom.ph',
    location: 'Agdao District, Davao City',
  },
  {
    name: 'Crema Corner',
    subscription: 'Basic',
    owner: 'Sofia Mendoza',
    contact: '+63 956 789 0123 / sofia@cremacorner.ph',
    location: 'Bunawan District, Davao City',
  },
]

const subscriptionRequests = ref([
  {
    cafe: 'Copper Cup Café',
    plan: 'Standard',
    owner: 'Liam Santos',
    contact: '+63 917 222 3344 / liam@coppercup.ph',
    location: 'Toril District, Davao City',
    status: 'Pending',
  },
  {
    cafe: 'Morning Roast Co.',
    plan: 'Premium',
    owner: 'Jamie Ortega',
    contact: '+63 918 333 4455 / jamie@morningroast.ph',
    location: 'Matina, Davao City',
    status: 'Pending',
  },
  {
    cafe: 'Sunkissed Beans',
    plan: 'Basic',
    owner: 'Paolo Rivera',
    contact: '+63 919 444 5566 / paolo@sunkissedbeans.ph',
    location: 'Lanang, Davao City',
    status: 'Pending',
  },
])

const acceptRequest = (request: { status: string }) => {
  request.status = 'Accepted'
}
</script>

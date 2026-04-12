<template>
  <section class="space-y-8">
    <div class="rounded-2xl bg-gradient-to-br from-[#6D4C41] to-[#4E342E] p-8 text-white shadow-lg">
      <h1 class="text-3xl font-bold">Owners Info</h1>
      <p class="mt-2 text-sm text-stone-100/80">Café ownership details and contact information.</p>
    </div>

    <div class="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-stone-300">
      <div class="overflow-x-auto">
        <table class="min-w-full text-sm">
          <thead class="bg-stone-50">
            <tr class="text-left">
              <th class="px-4 py-3 font-semibold text-stone-700">Café Name</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Owner Name</th>
              <th class="px-4 py-3 font-semibold text-stone-700">Contact</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            <tr v-for="owner in owners" :key="owner.cafe" class="hover:bg-stone-50">
              <td class="px-4 py-3.5 font-semibold text-slate-900">{{ owner.cafe }}</td>
              <td class="px-4 py-3.5 text-slate-700">{{ owner.name }}</td>
              <td class="px-4 py-3.5 text-slate-600">{{ owner.contact }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
const owners = [
  { cafe: 'Bean There Café', name: 'Alyssa Ramos', contact: '+63 912 345 6789 / alyssa@beanthere.ph' },
  { cafe: 'Roast Republic', name: 'Marco Dela Cruz', contact: '+63 923 456 7890 / marco@roastrepublic.ph' },
  { cafe: 'Daily Grind House', name: 'Nina Villanueva', contact: '+63 934 567 8901 / nina@dailygrind.ph' },
  { cafe: 'Mug & Bloom', name: 'Ethan Lim', contact: '+63 945 678 9012 / ethan@mugandbloom.ph' },
  { cafe: 'Crema Corner', name: 'Sofia Mendoza', contact: '+63 956 789 0123 / sofia@cremacorner.ph' },
]
</script>

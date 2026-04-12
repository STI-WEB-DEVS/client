<template>
    <section class="space-y-8">
        <div class="rounded-2xl bg-gradient-to-br from-[#6D4C41] to-[#4E342E] p-8 text-white shadow-lg">
            <h1 class="text-3xl font-bold">Cafe Overview</h1>
            <p class="mt-2 text-sm text-stone-100/80">Monitor café performance and subscription activity across Davao City.</p>
        </div>

        <div class="grid gap-5 md:grid-cols-3">
            <article v-for="card in stats" :key="card.label" class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300 transition hover:shadow-md">
                <p class="text-xs font-semibold uppercase tracking-wide text-stone-500">{{ card.label }}</p>
                <p class="mt-3 text-3xl font-bold text-[#6D4C41]">{{ card.value }}</p>
            </article>
        </div>

        <div class="grid gap-6 xl:grid-cols-1">
            <article class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300">
                <div class="mb-6">
                    <h2 class="text-xl font-bold text-slate-900">Subscription Plans</h2>
                    <p class="mt-1 text-sm text-slate-600">Tiered offerings for partner cafés.</p>
                </div>

                <div class="grid gap-4 md:grid-cols-3">
                    <div v-for="plan in subscriptionPlans" :key="plan.name" class="flex flex-col rounded-lg border border-stone-200 bg-gradient-to-br from-stone-50 to-white p-5 transition hover:border-[#8D6E63] hover:shadow-sm">
                        <p class="text-base font-bold text-slate-900">{{ plan.name }}</p>
                        <p class="mt-3 text-2xl font-bold text-[#6D4C41]">{{ plan.price }}</p>
                        <p class="mt-auto pt-4 text-sm text-slate-600">{{ plan.cafes }} cafés</p>
                    </div>
                </div>
            </article>

            <article class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300">
                <div class="mb-5">
                    <h2 class="text-xl font-bold text-slate-900">Café Subscribers</h2>
                    <p class="mt-1 text-sm text-slate-600">Coffee establishments enrolled in BrewSpot.</p>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full table-fixed text-sm">
                        <thead class="bg-stone-50">
                            <tr class="text-left">
                                <th class="px-4 py-3 font-semibold text-stone-700">Café</th>
                                <th class="px-4 py-3 font-semibold text-stone-700">Plan</th>
                                <th class="px-4 py-3 font-semibold text-stone-700">Location</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-stone-100">
                            <tr v-for="cafe in cafes" :key="cafe.name" class="transition hover:bg-stone-50">
                                <td class="px-4 py-3.5 font-semibold text-slate-900">{{ cafe.name }}</td>
                                <td class="px-4 py-3.5 text-slate-600">{{ cafe.subscription }}</td>
                                <td class="px-4 py-3.5 text-slate-600">{{ cafe.location }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
const cafes = [
    {
        name: 'Bean There Café',
        subscription: 'Basic',
        owner: 'Alyssa Ramos',
        phone: '+63 912 345 6789',
        contact: 'alyssa@beanthere.ph',
        location: 'Poblacion District, Davao City',
    },
    {
        name: 'Roast Republic',
        subscription: 'Standard',
        owner: 'Marco Dela Cruz',
        phone: '+63 923 456 7890',
        contact: 'marco@roastrepublic.ph',
        location: 'Buhangin District, Davao City',
    },
    {
        name: 'Daily Grind House',
        subscription: 'Premium',
        owner: 'Nina Villanueva',
        phone: '+63 934 567 8901',
        contact: 'nina@dailygrind.ph',
        location: 'Talomo District, Davao City',
    },
    {
        name: 'Mug & Bloom',
        subscription: 'Standard',
        owner: 'Ethan Lim',
        phone: '+63 945 678 9012',
        contact: 'ethan@mugandbloom.ph',
        location: 'Agdao District, Davao City',
    },
    {
        name: 'Crema Corner',
        subscription: 'Basic',
        owner: 'Sofia Mendoza',
        phone: '+63 956 789 0123',
        contact: 'sofia@cremacorner.ph',
        location: 'Bunawan District, Davao City',
    },
]

const planRates: Record<string, number> = {
    Basic: 29,
    Standard: 59,
    Premium: 99,
}

const subscriptionPlans = [
    { name: 'Basic', price: '$29/mo', cafes: cafes.filter((cafe) => cafe.subscription === 'Basic').length },
    { name: 'Standard', price: '$59/mo', cafes: cafes.filter((cafe) => cafe.subscription === 'Standard').length },
    { name: 'Premium', price: '$99/mo', cafes: cafes.filter((cafe) => cafe.subscription === 'Premium').length },
]

const subscriptionRevenue = cafes.reduce((total, cafe) => total + (planRates[cafe.subscription] ?? 0), 0)

const stats = [
    { label: 'Subscription Revenue (Monthly)', value: `$${subscriptionRevenue.toLocaleString()}` },
    { label: 'Subscribed Cafés', value: `${cafes.length}` },
    { label: 'Active Branches', value: '5' },
]
</script>
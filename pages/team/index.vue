<template>
    <section class="space-y-8">
        <div class="rounded-2xl bg-gradient-to-br from-[#6D4C41] to-[#4E342E] p-8 text-white shadow-lg">
            <h1 class="text-3xl font-bold">Team Members</h1>
            <p class="mt-2 text-sm text-stone-100/80">Operations team members managing BrewSpot coffee establishments.</p>
        </div>

        <div v-if="pending" class="rounded-lg bg-white p-6 text-center shadow-sm ring-1 ring-stone-300">
            <div class="inline-flex items-center gap-3 text-stone-600">
                <svg class="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm font-medium">Loading team members...</span>
            </div>
        </div>
        <div v-else-if="error" class="rounded-lg bg-red-50 p-5 text-center shadow-sm ring-1 ring-red-200">
            <p class="text-sm font-medium text-red-700">Failed to load team members.</p>
        </div>

        <div v-else class="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <article v-for="member in members" :key="member.id" class="group rounded-lg bg-white p-5 shadow-sm ring-1 ring-stone-300 transition hover:shadow-md hover:ring-[#8D6E63]">
                <div class="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-[#A1887F] to-[#8D6E63] text-lg font-bold text-white shadow-sm">
                    {{ member.name.charAt(0).toUpperCase() }}
                </div>
                <h2 class="text-base font-bold text-slate-900">{{ member.name }}</h2>
                <p class="mt-1 text-sm text-stone-600">{{ member.email }}</p>
                <p class="mt-1 text-sm text-stone-600">{{ member.phone }}</p>
                <div v-if="member.company?.name" class="mt-3 rounded-lg bg-stone-50 px-3 py-2">
                    <p class="text-xs font-semibold uppercase tracking-wide text-stone-500">Company</p>
                    <p class="mt-0.5 text-sm font-medium text-slate-700">{{ member.company.name }}</p>
                </div>
            </article>
        </div>
    </section>
</template>

<script setup lang="ts">
import { TeamService } from '~/api/Team/TeamService'

interface TeamMember {
    id: number
    name: string
    email: string
    phone: string
    company?: { name?: string }
}

const teamService = new TeamService()

const { data, pending, error } = await useAsyncData('team-members', () => teamService.getTeams() as Promise<TeamMember[]>)

const members = computed(() => {
    const rawData = data.value ?? []
    return rawData.map((member: any) => ({
        ...member,
        phone: member.phone || `+63 9${Math.floor(Math.random() * 900000000 + 100000000)}`
    }))
})
</script>
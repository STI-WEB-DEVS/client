<template>
  <div
    v-if="user"
    class="w-full bg-[#3A5743] border border-[#3B7080] rounded-sm overflow-hidden animate-fade-up"
  >
    <!-- Accent bar -->
    <div class="h-[3px] bg-gradient-to-r from-[#ADE25D] to-[#CFFFB3]"></div>

    <!-- Identity -->
    <div class="flex items-center gap-5 px-8 pt-8 pb-6">
      <div class="w-14 h-14 shrink-0 flex items-center justify-center bg-[#3B7080] border border-[#ADE25D] rounded-sm font-['Syne'] font-extrabold text-2xl text-[#CFFFB3]">
        {{ user.name?.charAt(0) }}
      </div>
      <div>
        <h1 class="font-['Syne'] font-bold text-xl text-[#CFFFB3] tracking-tight leading-tight">
          {{ user.name }}
        </h1>
        <span
          v-if="user.username"
          class="inline-block mt-1 font-['DM_Mono'] text-xs text-[#3A5743] bg-[#ADE25D] border border-[#ADE25D] px-2 py-0.5 rounded-sm"
        >
          @{{ user.username }}
        </span>
      </div>
    </div>

    <!-- Contact -->
    <template v-if="user.email || user.phone || user.website">
      <div class="h-px bg-[#3B7080] mx-8"></div>
      <div class="px-8 py-6">
        <p class="font-['DM_Mono'] text-[10px] font-medium tracking-[0.15em] uppercase text-[#ADE25D] mb-3.5">
          Contact
        </p>
        <div class="flex flex-col gap-2.5">
          <div v-if="user.email" class="flex items-center gap-3">
            <span class="w-4 text-center text-sm text-[#ADE25D] shrink-0">✉</span>
            <a :href="`mailto:${user.email}`" class="font-['DM_Mono'] text-[0.8rem] font-light text-[#CFFFB3] hover:text-[#ADE25D] transition-colors no-underline">
              {{ user.email }}
            </a>
          </div>
          <div v-if="user.phone" class="flex items-center gap-3">
            <span class="w-4 text-center text-sm text-[#ADE25D] shrink-0">✆</span>
            <span class="font-['DM_Mono'] text-[0.8rem] font-light text-[#CFFFB3]">{{ user.phone }}</span>
          </div>
          <div v-if="user.website" class="flex items-center gap-3">
            <span class="w-4 text-center text-sm text-[#ADE25D] shrink-0">⌁</span>
            <a :href="websiteUrl" target="_blank" class="font-['DM_Mono'] text-[0.8rem] font-light text-[#CFFFB3] hover:text-[#ADE25D] transition-colors no-underline">
              {{ user.website }}
            </a>
          </div>
        </div>
      </div>
    </template>

    <!-- Address -->
    <template v-if="user.address">
      <div class="h-px bg-[#3B7080] mx-8"></div>
      <div class="px-8 py-6">
        <p class="font-['DM_Mono'] text-[10px] font-medium tracking-[0.15em] uppercase text-[#ADE25D] mb-3.5">
          Address
        </p>
        <div class="flex flex-col gap-1">
          <p v-if="user.address.street || user.address.suite" class="font-['DM_Mono'] text-[0.8rem] font-light text-[#CFFFB3]">
            {{ [user.address.street, user.address.suite].filter(Boolean).join(', ') }}
          </p>
          <p v-if="user.address.city || user.address.zipcode" class="font-['DM_Mono'] text-[0.8rem] font-light text-[#CFFFB3]">
            {{ [user.address.city, user.address.zipcode].filter(Boolean).join(', ') }}
          </p>
          <a
            v-if="user.address.geo?.lat && user.address.geo?.lng"
            :href="`https://maps.google.com/?q=${user.address.geo.lat},${user.address.geo.lng}`"
            target="_blank"
            class="font-['DM_Mono'] text-[0.7rem] text-[#ADE25D] opacity-70 hover:opacity-100 transition-opacity mt-1 no-underline inline-block"
          >
            {{ user.address.geo.lat }}, {{ user.address.geo.lng }} ↗
          </a>
        </div>
      </div>
    </template>

    <!-- Company -->
    <template v-if="user.company">
      <div class="h-px bg-[#3B7080] mx-8"></div>
      <div class="px-8 py-6">
        <p class="font-['DM_Mono'] text-[10px] font-medium tracking-[0.15em] uppercase text-[#ADE25D] mb-3.5">
          Company
        </p>
        <p v-if="user.company.name" class="font-['Syne'] font-semibold text-base text-[#CFFFB3] mb-1.5">
          {{ user.company.name }}
        </p>
        <p v-if="user.company.catchPhrase" class="font-['DM_Mono'] text-xs font-light italic text-[#ADE25D] opacity-70 mb-3 leading-relaxed">
          "{{ user.company.catchPhrase }}"
        </p>
        <span v-if="user.company.bs" class="inline-block font-['DM_Mono'] text-[0.65rem] font-medium tracking-[0.08em] uppercase text-[#3A5743] bg-[#ADE25D] border border-[#ADE25D] px-2.5 py-0.5 rounded-sm">
          {{ user.company.bs }}
        </span>
      </div>
    </template>
  </div>

  <!-- Empty state -->
  <div v-else class="w-full bg-[#3A5743] border border-[#3B7080] rounded-sm overflow-hidden pb-8">
    <div class="h-[3px] bg-gradient-to-r from-[#ADE25D] to-[#CFFFB3]"></div>
    <p class="font-['DM_Mono'] text-[0.8rem] text-[#ADE25D] p-8 text-center">No user data provided.</p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  user: {
    name?: string
    username?: string
    email?: string
    phone?: string
    website?: string
    address?: {
      street?: string
      suite?: string
      city?: string
      zipcode?: string
      geo?: { lat?: string; lng?: string }
    }
    company?: {
      name?: string
      catchPhrase?: string
      bs?: string
    }
  } | null
}>()

const websiteUrl = computed(() => {
  const site = props.user?.website
  if (!site) return '#'
  return site.startsWith('http') ? site : `https://${site}`
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@300;400;500&display=swap');

@keyframes fade-up {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-up {
  animation: fade-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) both;
}
</style>
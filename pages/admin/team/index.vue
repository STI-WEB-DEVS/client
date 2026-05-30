<template>
  <NuxtLayout>
    <div class="mb-8 border-b border-gray-200 pb-5">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">FurniCraft Project Engine</h1>
      <p class="mt-2 text-sm text-gray-500">
        System engineering roster and component ownership for the Web-Based Furniture Management &amp; Order Taking Platform.
      </p>
    </div>

    <!-- Active Roster Grid -->
    <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      <div v-for="member in developers" :key="member.name" class="group relative rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-green-600/40 transition-all duration-200">
        
        <!-- Identity Header -->
        <div class="flex items-start gap-4 mb-4">
          <div class="relative">
            <div class="h-12 w-12 rounded-lg bg-gradient-to-br from-green-700 to-emerald-800 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
              {{ member.initials }}
            </div>
            <div class="absolute -bottom-1 -right-1 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" title="Active Core Proponent"></div>
          </div>
          <div class="flex-1 min-w-0">
            <h3 class="text-sm font-semibold text-gray-900 truncate group-hover:text-green-700 transition-colors">
              {{ member.name }}
            </h3>
            <p class="text-xs text-green-700 font-medium truncate mt-0.5">
              {{ member.role }}
            </p>
          </div>
        </div>

        <!-- System Responsibilities & Core Tasks -->
        <div class="space-y-3 pt-4 border-t border-gray-100 text-xs">
          <div>
            <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Module Ownership</span>
            <div class="flex flex-wrap gap-1">
              <span v-for="mod in member.modules" :key="mod" class="inline-flex items-center px-2 py-0.5 rounded bg-gray-100 text-gray-700 font-medium">
                {{ mod }}
              </span>
            </div>
          </div>

          <div class="pt-1">
            <span class="block text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Target Engineering Vector</span>
            <p class="text-gray-600 italic leading-relaxed">"{{ member.focus }}"</p>
          </div>
        </div>

        <!-- Component Action -->
        <div class="mt-4 pt-4 border-t border-gray-100">
          <button class="w-full px-3 py-2 text-xs font-medium text-green-700 bg-green-50 rounded-lg hover:bg-green-100 transition-colors flex items-center justify-center gap-1.5">
            <span>Inspect Module Tree</span>
            <svg class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Administrative & Review Panel Metadata -->
    <div class="mt-12 bg-gray-50 border border-gray-200 rounded-xl p-5">
      <h3 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Institutional R&amp;D Credentials</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-gray-600">
        <div>
          <span class="block font-semibold text-gray-900 mb-0.5">Project Advisory</span>
          <p>Jessiel Chris D. Hilot</p>
          <p class="text-gray-400">Program Head / Capstone Adviser</p>
        </div>
        <div>
          <span class="block font-semibold text-gray-900 mb-0.5">Coordination Authority</span>
          <p>Francis Jade P. Solomon</p>
          <p class="text-gray-400">Capstone Project Coordinator</p>
        </div>
        <div>
          <span class="block font-semibold text-gray-900 mb-0.5">Review Board Signature Baseline</span>
          <p>Eric Ricablanca, MIM <span class="text-gray-400">(Lead Panelist)</span></p>
          <p>A. Lapiñas, J. Lolo <span class="text-gray-400">(Panelists)</span></p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Explicit Proponent Dataset derived from the FurniCraft Thesis Blueprint
const developers = ref([
  {
    name: 'Dedrich Bryce A. Arce',
    initials: 'DA',
    role: 'Lead Full-Stack Architect',
    modules: ['Order Ingestion', 'Tailwind View Engine', 'State Pipelines'],
    focus: 'Structuring complex customization matrices, bird\'s-eye dimension inputs, and workflow view bindings.'
  },
  {
    name: 'Allan V. Almoguera',
    initials: 'AA',
    role: 'Database & Inventory Engineer',
    modules: ['Material Estimation', 'Stock Valuation', 'BIR Logging'],
    focus: 'Tracking raw wood variants (Narra, Mahogany) against automated inventory deduction loops.'
  },
  {
    name: 'Edrian Gerodias',
    initials: 'EG',
    role: 'Production Pipeline Architect',
    modules: ['Queuing Systems', 'Bulk Capacity Allocations'],
    focus: 'Developing the algorithmic queuing arrays required to handle large-scale concurrent orders (e.g., 40+ item bursts).'
  },
  {
    name: 'Justine L. Mantua',
    initials: 'JM',
    role: 'Systems Analyst & UI Integration',
    modules: ['Lifecycle Audits', 'Form Validation', 'Receipt Output'],
    focus: 'Translating verbal and conceptual client requirements into reliable, structured database schemas.'
  }
])
</script>
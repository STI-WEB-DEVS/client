<!-- pages/team.vue -->
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Dietitian Team</h2>
      <button class="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Add Team Member</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div class="flex space-x-4">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search team members..." 
          class="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        <select v-model="specialtyFilter" class="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200">
          <option value="">All Specialties</option>
          <option value="clinical">Clinical Nutrition</option>
          <option value="sports">Sports Nutrition</option>
          <option value="pediatric">Pediatric Nutrition</option>
          <option value="renal">Renal Nutrition</option>
          <option value="diabetes">Diabetes Management</option>
        </select>
      </div>
    </div>

    <!-- Team Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="member in filteredMembers" :key="member.id" class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-6">
          <div class="flex items-center space-x-4">
            <div class="w-16 h-16 bg-gradient-to-br from-primary-100 to-primary-200 rounded-full flex items-center justify-center">
              <span class="text-2xl font-bold text-primary-700">{{ member.initials }}</span>
            </div>
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900">{{ member.name }}</h3>
              <p class="text-sm text-gray-600">{{ member.title }}</p>
              <div class="mt-2 flex items-center space-x-2">
                <span class="px-2 py-1 bg-primary-50 text-primary-700 text-xs font-medium rounded-full">{{ member.specialization }}</span>
                <span class="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded-full">{{ member.experience }} years</span>
              </div>
            </div>
          </div>
          
          <div class="mt-4 pt-4 border-t border-gray-100">
            <div class="flex items-center justify-between text-sm">
              <div class="flex items-center space-x-2 text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
                <span>{{ member.email }}</span>
              </div>
              <div class="flex items-center space-x-2 text-gray-600">
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                <span>{{ member.patients }} patients</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

import { ref, computed } from 'vue'
import { teamMembers } from '~/services/TeamService'

const searchQuery = ref('')
const specialtyFilter = ref('')

const filteredMembers = computed(() => {
  return teamMembers.filter(member => {
    const matchesSearch = member.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                         member.email.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchesSpecialty = !specialtyFilter.value || member.specialization.toLowerCase().includes(specialtyFilter.value.toLowerCase())
    return matchesSearch && matchesSpecialty
  })
})
</script>
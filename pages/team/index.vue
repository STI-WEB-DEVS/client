<template>
  <NuxtLayout>
    <div>

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Team</h1>
        <p class="mt-1 text-sm text-gray-500">Meet the dedicated team behind the AMUMA Healthcare Portal.</p>
      </div>

      <!-- Team Cards -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div
          v-for="member in team"
          :key="member.id"
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col items-center text-center hover:shadow-md transition"
        >
         
          <div
            class="size-20 rounded-2xl flex items-center justify-center text-2xl font-bold shadow mb-4"
            :class="member.avatarBg"
          >
            {{ member.initials }}
          </div>
          <h3 class="text-sm font-bold text-gray-900">{{ member.name }}</h3>
          <p class="text-xs font-semibold mt-1" :class="member.roleColor">{{ member.role }}</p>
          <p class="text-xs text-gray-400 mt-1">{{ member.department }}</p>
          <div class="mt-4 w-full border-t border-gray-100 pt-4">
            <p class="text-xs text-gray-400 truncate">{{ member.email }}</p>
          </div>
          <span class="mt-3 inline-flex items-center rounded-full px-3 py-1 text-xs font-medium" :class="member.statusClass">
            {{ member.status }}
          </span>
        </div>
      </div>

      <!-- About Team -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 class="text-sm font-bold text-gray-900 mb-3">About Our Team</h2>
        <p class="text-sm text-gray-600 leading-relaxed">
          The AMUMA development team is composed of dedicated STI College students who designed and built this
          Online Portal for Healthcare Services Management System for Elderly Patients. Our goal is to streamline
          healthcare service delivery, improve patient record management, and enhance the overall quality of care
          for elderly patients in the community.
        </p>
      </div>

      <!-- Roles Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="px-6 py-4 border-b border-gray-100">
          <h2 class="text-sm font-bold text-gray-900">Roles & Responsibilities</h2>
        </div>
        <table class="min-w-full divide-y divide-gray-100">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Member</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Role</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Responsibilities</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="member in team" :key="member.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
               
                  <div
                    class="size-8 rounded-lg flex items-center justify-center text-xs font-bold shadow-sm"
                    :class="member.avatarBg"
                  >
                    {{ member.initials }}
                  </div>
                  <span class="text-sm font-semibold text-gray-900">{{ member.name }}</span>
                </div>
              </td>
              <td class="px-6 py-4 text-sm font-medium" :class="member.roleColor">{{ member.role }}</td>
              <td class="px-6 py-4 text-sm text-gray-500">{{ member.responsibilities }}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
                  :class="member.statusClass"
                >
                  {{ member.status }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { TeamService } from '~/api/Team/TeamService'

const service = new TeamService()
const team = service.getTeams()
</script>
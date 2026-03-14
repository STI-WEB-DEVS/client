<template>
  <NuxtLayout>
    <div>

      <!-- Page Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900">Settings</h1>
        <p class="mt-1 text-sm text-gray-500">Manage your AMUMA portal preferences and system configuration.</p>
      </div>

      <!-- General Settings -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-x-3">
          <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
            <Cog6ToothIcon class="size-4" />
          </div>
          <h2 class="text-sm font-bold text-gray-900">General Settings</h2>
        </div>
        <div class="px-6 py-6">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">System Name</label>
              <input
                type="text"
                v-model="settings.systemName"
                class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">System Version</label>
              <input
                type="text"
                v-model="settings.version"
                disabled
                class="block w-full rounded-xl border border-gray-100 bg-gray-100 px-4 py-2.5 text-sm text-gray-400 cursor-not-allowed"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Administrator Email</label>
              <input
                type="email"
                v-model="settings.adminEmail"
                class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
              />
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Facility Name</label>
              <input
                type="text"
                v-model="settings.facilityName"
                class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Patient Settings -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-x-3">
          <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm" style="background: linear-gradient(135deg, #0369a1, #0ea5e9);">
            <UsersIcon class="size-4" />
          </div>
          <h2 class="text-sm font-bold text-gray-900">Patient Settings</h2>
        </div>
        <div class="px-6 py-5 space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-gray-800">Auto-assign Patient ID</p>
              <p class="text-xs text-gray-400 mt-0.5">Automatically generate a unique ID for each new patient</p>
            </div>
            <button
              @click="settings.autoAssignId = !settings.autoAssignId"
              :class="settings.autoAssignId ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                :class="settings.autoAssignId ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block size-4 transform rounded-full bg-white shadow transition-transform"
              />
            </button>
          </div>
          <div class="h-px bg-gray-100"></div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-gray-800">Require Emergency Contact</p>
              <p class="text-xs text-gray-400 mt-0.5">Make emergency contact mandatory during patient registration</p>
            </div>
            <button
              @click="settings.requireEmergencyContact = !settings.requireEmergencyContact"
              :class="settings.requireEmergencyContact ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                :class="settings.requireEmergencyContact ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block size-4 transform rounded-full bg-white shadow transition-transform"
              />
            </button>
          </div>
          <div class="h-px bg-gray-100"></div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-gray-800">Enable Medical History Tracking</p>
              <p class="text-xs text-gray-400 mt-0.5">Track and log changes to patient medical history over time</p>
            </div>
            <button
              @click="settings.medicalHistoryTracking = !settings.medicalHistoryTracking"
              :class="settings.medicalHistoryTracking ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                :class="settings.medicalHistoryTracking ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block size-4 transform rounded-full bg-white shadow transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Appointment Settings -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 mb-6">
        <div class="px-6 py-4 border-b border-gray-100 flex items-center gap-x-3">
          <div class="flex size-8 items-center justify-center rounded-lg text-white text-xs shadow-sm" style="background: linear-gradient(135deg, #b45309, #f59e0b);">
            <CalendarIcon class="size-4" />
          </div>
          <h2 class="text-sm font-bold text-gray-900">Appointment Settings</h2>
        </div>
        <div class="px-6 py-6">
          <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 mb-5">
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Default Duration</label>
              <select
                v-model="settings.appointmentDuration"
                class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
              >
                <option value="15">15 minutes</option>
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
            <div>
              <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Operating Hours</label>
              <select
                v-model="settings.operatingHours"
                class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
              >
                <option value="8-17">8:00 AM – 5:00 PM</option>
                <option value="7-16">7:00 AM – 4:00 PM</option>
                <option value="8-20">8:00 AM – 8:00 PM</option>
                <option value="24">24 Hours</option>
              </select>
            </div>
          </div>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-gray-800">Send Appointment Reminders</p>
              <p class="text-xs text-gray-400 mt-0.5">Notify patients 24 hours before their scheduled appointment</p>
            </div>
            <button
              @click="settings.appointmentReminders = !settings.appointmentReminders"
              :class="settings.appointmentReminders ? 'bg-blue-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <span
                :class="settings.appointmentReminders ? 'translate-x-6' : 'translate-x-1'"
                class="inline-block size-4 transform rounded-full bg-white shadow transition-transform"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Save Actions -->
      <div class="flex items-center justify-between">
        <button
          @click="resetSettings"
          class="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
        >
          Reset to Default
        </button>
        <button
          @click="saveSettings"
          class="rounded-xl px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
        >
          Save Settings
        </button>
      </div>

      <!-- Success Message -->
      <transition enter-active-class="transition ease-out duration-300" enter-from-class="opacity-0 translate-y-2" enter-to-class="opacity-100 translate-y-0" leave-active-class="transition ease-in duration-200" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="saved" class="mt-4 rounded-2xl border border-blue-100 bg-blue-50 px-6 py-4 flex items-center gap-x-3">
          <div class="flex size-8 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
            <CheckCircleIcon class="size-5" />
          </div>
          <p class="text-sm font-semibold text-blue-800">Settings saved successfully!</p>
        </div>
      </transition>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Cog6ToothIcon,
  UsersIcon,
  CalendarIcon,
  CheckCircleIcon,
} from '@heroicons/vue/24/outline'

const saved = ref(false)

const defaultSettings = {
  systemName: 'AMUMA Healthcare Portal',
  version: 'v1.0.0-beta',
  adminEmail: 'admin@amuma.health',
  facilityName: 'STI Community Health Center',
  autoAssignId: true,
  requireEmergencyContact: true,
  medicalHistoryTracking: true,
  appointmentDuration: '30',
  operatingHours: '8-17',
  appointmentReminders: true,
}

const settings = ref({ ...defaultSettings })

const saveSettings = () => {
  saved.value = true
  setTimeout(() => { saved.value = false }, 3000)
}

const resetSettings = () => {
  settings.value = { ...defaultSettings }
}
</script>
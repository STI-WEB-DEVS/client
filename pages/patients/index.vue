<template>
  <NuxtLayout>
    <div>

      <!-- Page Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Patients</h1>
          <p class="mt-1 text-sm text-gray-500">Manage elderly patient records registered in the AMUMA system.</p>
        </div>
        <button
          @click="showAddModal = true"
          class="rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
          style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
        >
          + Add Patient
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
            <UsersIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Patients</p>
            <p class="text-2xl font-bold text-gray-900">{{ patients.length }}</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b45309, #f59e0b);">
            <ClockIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Recovering</p>
            <p class="text-2xl font-bold text-gray-900">{{ patients.filter(p => p.status === 'Recovering').length }}</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b91c1c, #ef4444);">
            <ExclamationTriangleIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Critical</p>
            <p class="text-2xl font-bold text-gray-900">{{ patients.filter(p => p.status === 'Critical').length }}</p>
          </div>
        </div>
      </div>

      <!-- Search and Filter -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            v-model="search"
            placeholder="Search by name, ID, or condition..."
            class="block w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
          />
        </div>
        <select
          v-model="filterStatus"
          class="block w-full sm:w-44 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
        >
          <option value="">All Status</option>
          <option value="Stable">Stable</option>
          <option value="Critical">Critical</option>
          <option value="Recovering">Recovering</option>
        </select>
      </div>

      <!-- Patients Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-100">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Age</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Condition</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Assigned Doctor</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Visit</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="patient in filteredPatients" :key="patient.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div class="size-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
                    {{ patient.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ patient.name }}</p>
                    <p class="text-xs text-gray-400">{{ patient.id }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ patient.age }} yrs</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ patient.condition }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ patient.doctor }}</td>
              <td class="px-6 py-4 text-sm text-gray-400">{{ patient.lastVisit }}</td>
              <td class="px-6 py-4">
                <span class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold" :class="statusClass(patient.status)">
                  {{ patient.status }}
                </span>
              </td>
            </tr>
            <tr v-if="filteredPatients.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-sm text-gray-400">
                No patients found matching your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Patient Modal -->
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-base font-bold text-gray-900">Add New Patient</h3>
              <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600 transition">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Full Name</label>
                <input
                  type="text"
                  v-model="newPatient.name"
                  class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                  placeholder="e.g. Maria Santos"
                />
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Age</label>
                  <input
                    type="number"
                    v-model="newPatient.age"
                    class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                    placeholder="e.g. 72"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Status</label>
                  <select
                    v-model="newPatient.status"
                    class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                  >
                    <option value="Stable">Stable</option>
                    <option value="Recovering">Recovering</option>
                    <option value="Critical">Critical</option>
                  </select>
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Condition / Diagnosis</label>
                <input
                  type="text"
                  v-model="newPatient.condition"
                  class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                  placeholder="e.g. Hypertension"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Assigned Doctor</label>
                <input
                  type="text"
                  v-model="newPatient.doctor"
                  class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                  placeholder="e.g. Dr. Reyes"
                />
              </div>
            </div>
            <div class="mt-6 flex justify-end gap-3">
              <button
                @click="showAddModal = false"
                class="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                @click="addPatient"
                class="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
              >
                Add Patient
              </button>
            </div>
          </div>
        </div>
      </transition>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  UsersIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const search = ref('')
const filterStatus = ref('')
const showAddModal = ref(false)

const newPatient = ref({
  name: '',
  age: '',
  condition: '',
  doctor: '',
  status: 'Stable',
})

const patients = ref([
  { id: 'PT-001', name: 'Remedios Santos', initials: 'RS', age: 74, condition: 'Hypertension', doctor: 'Dr. Reyes', lastVisit: 'Mar 14, 2026', status: 'Stable' },
  { id: 'PT-002', name: 'Ernesto Dela Cruz', initials: 'ED', age: 81, condition: 'Coronary Artery Disease', doctor: 'Dr. Villanueva', lastVisit: 'Mar 13, 2026', status: 'Critical' },
  { id: 'PT-003', name: 'Lourdes Reyes', initials: 'LR', age: 68, condition: 'Osteoarthritis', doctor: 'Dr. Mendoza', lastVisit: 'Mar 12, 2026', status: 'Recovering' },
  { id: 'PT-004', name: 'Domingo Villanueva', initials: 'DV', age: 77, condition: 'Type 2 Diabetes', doctor: 'Dr. Reyes', lastVisit: 'Mar 10, 2026', status: 'Stable' },
  { id: 'PT-005', name: 'Caridad Mendoza', initials: 'CM', age: 72, condition: 'Chronic Kidney Disease', doctor: 'Dr. Santos', lastVisit: 'Mar 9, 2026', status: 'Recovering' },
  { id: 'PT-006', name: 'Felicidad Torres', initials: 'FT', age: 85, condition: 'Dementia', doctor: 'Dr. Villanueva', lastVisit: 'Mar 8, 2026', status: 'Critical' },
  { id: 'PT-007', name: 'Ricardo Bautista', initials: 'RB', age: 70, condition: 'COPD', doctor: 'Dr. Mendoza', lastVisit: 'Mar 7, 2026', status: 'Stable' },
  { id: 'PT-008', name: 'Rosario Aquino', initials: 'RA', age: 66, condition: 'Glaucoma', doctor: 'Dr. Santos', lastVisit: 'Mar 6, 2026', status: 'Stable' },
])

const filteredPatients = computed(() => {
  return patients.value.filter(p => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.id.toLowerCase().includes(search.value.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = filterStatus.value === '' || p.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const statusClass = (status: string) => {
  if (status === 'Stable') return 'bg-blue-50 text-blue-700'
  if (status === 'Critical') return 'bg-red-50 text-red-700'
  if (status === 'Recovering') return 'bg-amber-50 text-amber-700'
  return 'bg-gray-100 text-gray-700'
}

const addPatient = () => {
  if (!newPatient.value.name || !newPatient.value.age) return
  const initials = newPatient.value.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  patients.value.push({
    id: `PT-00${patients.value.length + 1}`,
    name: newPatient.value.name,
    initials,
    age: Number(newPatient.value.age),
    condition: newPatient.value.condition || 'N/A',
    doctor: newPatient.value.doctor || 'Unassigned',
    lastVisit: 'Today',
    status: newPatient.value.status,
  })
  newPatient.value = { name: '', age: '', condition: '', doctor: '', status: 'Stable' }
  showAddModal.value = false
}
</script>
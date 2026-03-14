<template>
  <NuxtLayout>
    <div>

      <!-- Page Header -->
      <div class="mb-8 flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Records</h1>
          <p class="mt-1 text-sm text-gray-500">View and manage patient medical records in the AMUMA system.</p>
        </div>
        <button
          @click="showAddModal = true"
          class="rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
          style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
        >
          + Add Record
        </button>
      </div>

      <!-- Stats -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-6">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
            <DocumentDuplicateIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total Records</p>
            <p class="text-2xl font-bold text-gray-900">{{ records.length }}</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #059669, #10b981);">
            <CheckCircleIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Up to Date</p>
            <p class="text-2xl font-bold text-gray-900">{{ records.filter(r => r.status === 'Up to Date').length }}</p>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
          <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b45309, #f59e0b);">
            <ExclamationTriangleIcon class="size-5" />
          </div>
          <div>
            <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Needs Update</p>
            <p class="text-2xl font-bold text-gray-900">{{ records.filter(r => r.status === 'Needs Update').length }}</p>
          </div>
        </div>
      </div>

      <!-- Search -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 px-6 py-4 mb-6 flex flex-col sm:flex-row gap-3">
        <div class="relative flex-1">
          <MagnifyingGlassIcon class="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
          <input
            type="text"
            v-model="search"
            placeholder="Search by patient name or record type..."
            class="block w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
          />
        </div>
        <select
          v-model="filterStatus"
          class="block w-full sm:w-44 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
        >
          <option value="">All Status</option>
          <option value="Up to Date">Up to Date</option>
          <option value="Needs Update">Needs Update</option>
          <option value="Pending Review">Pending Review</option>
        </select>
      </div>

      <!-- Records Table -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table class="min-w-full divide-y divide-gray-100">
          <thead>
            <tr class="bg-gray-50">
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Record Type</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Attending Doctor</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date Filed</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Last Updated</th>
              <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr v-for="record in filteredRecords" :key="record.id" class="hover:bg-gray-50 transition">
              <td class="px-6 py-4">
                <div class="flex items-center gap-3">
                  <div
                    class="size-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm"
                    style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
                  >
                    {{ record.initials }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-gray-900">{{ record.patient }}</p>
                    <p class="text-xs text-gray-400">{{ record.patientId }}</p>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ record.type }}</td>
              <td class="px-6 py-4 text-sm text-gray-600">{{ record.doctor }}</td>
              <td class="px-6 py-4 text-sm text-gray-400">{{ record.dateFiled }}</td>
              <td class="px-6 py-4 text-sm text-gray-400">{{ record.lastUpdated }}</td>
              <td class="px-6 py-4">
                <span
                  class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                  :class="statusClass(record.status)"
                >
                  {{ record.status }}
                </span>
              </td>
            </tr>
            <tr v-if="filteredRecords.length === 0">
              <td colspan="6" class="px-6 py-12 text-center text-sm text-gray-400">
                No records found matching your search.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Add Record Modal -->
      <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
        <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-base font-bold text-gray-900">Add New Record</h3>
              <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600 transition">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="space-y-4">
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Patient Name</label>
                <input
                  type="text"
                  v-model="newRecord.patient"
                  class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                  placeholder="e.g. Remedios Santos"
                />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Record Type</label>
                <select
                  v-model="newRecord.type"
                  class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                >
                  <option value="">Select type...</option>
                  <option value="Medical History">Medical History</option>
                  <option value="Lab Results">Lab Results</option>
                  <option value="Prescription">Prescription</option>
                  <option value="Discharge Summary">Discharge Summary</option>
                  <option value="Imaging Results">Imaging Results</option>
                  <option value="Progress Notes">Progress Notes</option>
                </select>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Attending Doctor</label>
                <input
                  type="text"
                  v-model="newRecord.doctor"
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
                @click="addRecord"
                class="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
              >
                Add Record
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
  DocumentDuplicateIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'

const search = ref('')
const filterStatus = ref('')
const showAddModal = ref(false)

const newRecord = ref({
  patient: '',
  type: '',
  doctor: '',
})

const records = ref([
  { id: 'REC-001', patient: 'Remedios Santos', patientId: 'PT-001', initials: 'RS', type: 'Medical History', doctor: 'Dr. Reyes', dateFiled: 'Jan 5, 2026', lastUpdated: 'Mar 14, 2026', status: 'Up to Date' },
  { id: 'REC-002', patient: 'Ernesto Dela Cruz', patientId: 'PT-002', initials: 'ED', type: 'Lab Results', doctor: 'Dr. Villanueva', dateFiled: 'Feb 10, 2026', lastUpdated: 'Mar 13, 2026', status: 'Pending Review' },
  { id: 'REC-003', patient: 'Lourdes Reyes', patientId: 'PT-003', initials: 'LR', type: 'Prescription', doctor: 'Dr. Mendoza', dateFiled: 'Jan 20, 2026', lastUpdated: 'Mar 12, 2026', status: 'Up to Date' },
  { id: 'REC-004', patient: 'Domingo Villanueva', patientId: 'PT-004', initials: 'DV', type: 'Progress Notes', doctor: 'Dr. Reyes', dateFiled: 'Dec 15, 2025', lastUpdated: 'Feb 20, 2026', status: 'Needs Update' },
  { id: 'REC-005', patient: 'Caridad Mendoza', patientId: 'PT-005', initials: 'CM', type: 'Imaging Results', doctor: 'Dr. Santos', dateFiled: 'Mar 1, 2026', lastUpdated: 'Mar 9, 2026', status: 'Up to Date' },
  { id: 'REC-006', patient: 'Felicidad Torres', patientId: 'PT-006', initials: 'FT', type: 'Discharge Summary', doctor: 'Dr. Villanueva', dateFiled: 'Nov 30, 2025', lastUpdated: 'Jan 15, 2026', status: 'Needs Update' },
  { id: 'REC-007', patient: 'Ricardo Bautista', patientId: 'PT-007', initials: 'RB', type: 'Medical History', doctor: 'Dr. Mendoza', dateFiled: 'Feb 5, 2026', lastUpdated: 'Mar 7, 2026', status: 'Up to Date' },
  { id: 'REC-008', patient: 'Rosario Aquino', patientId: 'PT-008', initials: 'RA', type: 'Lab Results', doctor: 'Dr. Santos', dateFiled: 'Mar 3, 2026', lastUpdated: 'Mar 6, 2026', status: 'Pending Review' },
])

const filteredRecords = computed(() => {
  return records.value.filter(r => {
    const matchesSearch =
      r.patient.toLowerCase().includes(search.value.toLowerCase()) ||
      r.type.toLowerCase().includes(search.value.toLowerCase())
    const matchesStatus = filterStatus.value === '' || r.status === filterStatus.value
    return matchesSearch && matchesStatus
  })
})

const statusClass = (status: string) => {
  if (status === 'Up to Date') return 'bg-green-50 text-green-700'
  if (status === 'Needs Update') return 'bg-amber-50 text-amber-700'
  if (status === 'Pending Review') return 'bg-blue-50 text-blue-700'
  return 'bg-gray-100 text-gray-700'
}

const addRecord = () => {
  if (!newRecord.value.patient || !newRecord.value.type) return
  const initials = newRecord.value.patient.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
  records.value.push({
    id: `REC-00${records.value.length + 1}`,
    patient: newRecord.value.patient,
    patientId: `PT-00${records.value.length + 1}`,
    initials,
    type: newRecord.value.type,
    doctor: newRecord.value.doctor || 'Unassigned',
    dateFiled: 'Today',
    lastUpdated: 'Today',
    status: 'Pending Review',
  })
  newRecord.value = { patient: '', type: '', doctor: '' }
  showAddModal.value = false
}
</script>
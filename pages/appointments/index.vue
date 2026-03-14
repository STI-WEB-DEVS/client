  <template>
    <NuxtLayout>
      <div>

        <!-- Page Header -->
        <div class="mb-8 flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Appointments</h1>
            <p class="mt-1 text-sm text-gray-500">Schedule and manage patient appointments for the AMUMA healthcare portal.</p>
          </div>
          <button
            @click="showAddModal = true"
            class="rounded-xl px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
            style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
          >
            + Schedule Appointment
          </button>
        </div>

        <!-- Stats -->
        <div class="grid grid-cols-2 gap-5 sm:grid-cols-4 mb-6">
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
            <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
              <CalendarIcon class="size-5" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Total</p>
              <p class="text-2xl font-bold text-gray-900">{{ appointments.length }}</p>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
            <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #0369a1, #0ea5e9);">
              <CheckCircleIcon class="size-5" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Confirmed</p>
              <p class="text-2xl font-bold text-gray-900">{{ appointments.filter(a => a.status === 'Confirmed').length }}</p>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
            <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b45309, #f59e0b);">
              <ClockIcon class="size-5" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Pending</p>
              <p class="text-2xl font-bold text-gray-900">{{ appointments.filter(a => a.status === 'Pending').length }}</p>
            </div>
          </div>
          <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 flex items-center gap-x-4">
            <div class="flex size-11 shrink-0 items-center justify-center rounded-xl text-white shadow" style="background: linear-gradient(135deg, #b91c1c, #ef4444);">
              <XCircleIcon class="size-5" />
            </div>
            <div>
              <p class="text-xs font-medium text-gray-500 uppercase tracking-wide">Cancelled</p>
              <p class="text-2xl font-bold text-gray-900">{{ appointments.filter(a => a.status === 'Cancelled').length }}</p>
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
              placeholder="Search by patient name or type..."
              class="block w-full rounded-xl border border-gray-200 bg-gray-50 pl-9 pr-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
            />
          </div>
          <select
            v-model="filterStatus"
            class="block w-full sm:w-44 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
          >
            <option value="">All Status</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Pending">Pending</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        <!-- Appointments Table -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <table class="min-w-full divide-y divide-gray-100">
            <thead>
              <tr class="bg-gray-50">
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Patient</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Type</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Doctor</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Time</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</th>
                <th class="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr v-for="appt in filteredAppointments" :key="appt.id" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4">
                  <div class="flex items-center gap-3">
                    <div class="size-9 rounded-xl flex items-center justify-center text-xs font-bold text-white shadow-sm" style="background: linear-gradient(135deg, #1e3a5f, #2563eb);">
                      {{ appt.initials }}
                    </div>
                    <div>
                      <p class="text-sm font-semibold text-gray-900">{{ appt.patient }}</p>
                      <p class="text-xs text-gray-400">{{ appt.patientId }}</p>
                    </div>
                  </div>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ appt.type }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ appt.doctor }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ appt.date }}</td>
                <td class="px-6 py-4 text-sm text-gray-600">{{ appt.time }}</td>
                <td class="px-6 py-4">
                  <span
                    class="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold"
                    :class="statusClass(appt.status)"
                  >
                    {{ appt.status }}
                  </span>
                </td>
                <td class="px-6 py-4">
                  <div class="flex gap-2">
                    <button
                      v-if="appt.status === 'Pending'"
                      @click="updateStatus(appt.id, 'Confirmed')"
                      class="text-xs font-semibold text-blue-600 hover:text-blue-500 transition"
                    >
                      Confirm
                    </button>
                    <button
                      v-if="appt.status === 'Confirmed'"
                      @click="updateStatus(appt.id, 'Completed')"
                      class="text-xs font-semibold text-green-600 hover:text-green-500 transition"
                    >
                      Complete
                    </button>
                    <button
                      v-if="appt.status !== 'Cancelled' && appt.status !== 'Completed'"
                      @click="updateStatus(appt.id, 'Cancelled')"
                      class="text-xs font-semibold text-red-500 hover:text-red-400 transition"
                    >
                      Cancel
                    </button>
                  </div>
                </td>
              </tr>
              <tr v-if="filteredAppointments.length === 0">
                <td colspan="7" class="px-6 py-12 text-center text-sm text-gray-400">
                  No appointments found matching your search.
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Add Appointment Modal -->
        <transition enter-active-class="transition ease-out duration-200" enter-from-class="opacity-0" enter-to-class="opacity-100" leave-active-class="transition ease-in duration-150" leave-from-class="opacity-100" leave-to-class="opacity-0">
          <div v-if="showAddModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
            <div class="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
              <div class="flex items-center justify-between mb-6">
                <h3 class="text-base font-bold text-gray-900">Schedule New Appointment</h3>
                <button @click="showAddModal = false" class="text-gray-400 hover:text-gray-600 transition">
                  <XMarkIcon class="size-5" />
                </button>
              </div>
              <div class="space-y-4">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Patient Name</label>
                  <input
                    type="text"
                    v-model="newAppt.patient"
                    class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                    placeholder="e.g. Remedios Santos"
                  />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Appointment Type</label>
                  <select
                    v-model="newAppt.type"
                    class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                  >
                    <option value="">Select type...</option>
                    <option value="General Checkup">General Checkup</option>
                    <option value="Cardiology">Cardiology</option>
                    <option value="Physical Therapy">Physical Therapy</option>
                    <option value="Follow-up">Follow-up</option>
                    <option value="Blood Work">Blood Work</option>
                    <option value="Neurology">Neurology</option>
                    <option value="Ophthalmology">Ophthalmology</option>
                  </select>
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Assigned Doctor</label>
                  <input
                    type="text"
                    v-model="newAppt.doctor"
                    class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                    placeholder="e.g. Dr. Reyes"
                  />
                </div>
                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Date</label>
                    <input
                      type="date"
                      v-model="newAppt.date"
                      class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                    />
                  </div>
                  <div>
                    <label class="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Time</label>
                    <input
                      type="time"
                      v-model="newAppt.time"
                      class="block w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent transition"
                    />
                  </div>
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
                  @click="addAppointment"
                  class="rounded-xl px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                  style="background: linear-gradient(135deg, #1e3a5f, #2563eb);"
                >
                  Schedule
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
    CalendarIcon,
    CheckCircleIcon,
    ClockIcon,
    XCircleIcon,
    MagnifyingGlassIcon,
    XMarkIcon,
  } from '@heroicons/vue/24/outline'

  const search = ref('')
  const filterStatus = ref('')
  const showAddModal = ref(false)

  const newAppt = ref({
    patient: '',
    type: '',
    doctor: '',
    date: '',
    time: '',
  })

  const appointments = ref([
    { id: 1, patient: 'Remedios Santos', patientId: 'PT-001', initials: 'RS', type: 'General Checkup', doctor: 'Dr. Reyes', date: 'Mar 15, 2026', time: '8:00 AM', status: 'Confirmed' },
    { id: 2, patient: 'Ernesto Dela Cruz', patientId: 'PT-002', initials: 'ED', type: 'Cardiology', doctor: 'Dr. Villanueva', date: 'Mar 15, 2026', time: '9:30 AM', status: 'Confirmed' },
    { id: 3, patient: 'Lourdes Reyes', patientId: 'PT-003', initials: 'LR', type: 'Physical Therapy', doctor: 'Dr. Mendoza', date: 'Mar 15, 2026', time: '11:00 AM', status: 'Pending' },
    { id: 4, patient: 'Domingo Villanueva', patientId: 'PT-004', initials: 'DV', type: 'Follow-up', doctor: 'Dr. Reyes', date: 'Mar 15, 2026', time: '1:00 PM', status: 'Cancelled' },
    { id: 5, patient: 'Caridad Mendoza', patientId: 'PT-005', initials: 'CM', type: 'Blood Work', doctor: 'Dr. Santos', date: 'Mar 15, 2026', time: '2:30 PM', status: 'Confirmed' },
    { id: 6, patient: 'Felicidad Torres', patientId: 'PT-006', initials: 'FT', type: 'Neurology', doctor: 'Dr. Villanueva', date: 'Mar 16, 2026', time: '9:00 AM', status: 'Pending' },
    { id: 7, patient: 'Ricardo Bautista', patientId: 'PT-007', initials: 'RB', type: 'General Checkup', doctor: 'Dr. Mendoza', date: 'Mar 16, 2026', time: '10:30 AM', status: 'Confirmed' },
    { id: 8, patient: 'Rosario Aquino', patientId: 'PT-008', initials: 'RA', type: 'Ophthalmology', doctor: 'Dr. Santos', date: 'Mar 17, 2026', time: '3:00 PM', status: 'Completed' },
  ])

  const filteredAppointments = computed(() => {
    return appointments.value.filter(a => {
      const matchesSearch =
        a.patient.toLowerCase().includes(search.value.toLowerCase()) ||
        a.type.toLowerCase().includes(search.value.toLowerCase())
      const matchesStatus = filterStatus.value === '' || a.status === filterStatus.value
      return matchesSearch && matchesStatus
    })
  })

  const statusClass = (status: string) => {
    if (status === 'Confirmed') return 'bg-blue-50 text-blue-700'
    if (status === 'Pending') return 'bg-amber-50 text-amber-700'
    if (status === 'Cancelled') return 'bg-red-50 text-red-700'
    if (status === 'Completed') return 'bg-green-50 text-green-700'
    return 'bg-gray-100 text-gray-700'
  }

  const updateStatus = (id: number, status: string) => {
    const appt = appointments.value.find(a => a.id === id)
    if (appt) appt.status = status
  }

  const addAppointment = () => {
    if (!newAppt.value.patient || !newAppt.value.type) return
    const initials = newAppt.value.patient.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    appointments.value.push({
      id: appointments.value.length + 1,
      patient: newAppt.value.patient,
      patientId: `PT-00${appointments.value.length + 1}`,
      initials,
      type: newAppt.value.type,
      doctor: newAppt.value.doctor || 'Unassigned',
      date: newAppt.value.date || 'TBD',
      time: newAppt.value.time || 'TBD',
      status: 'Pending',
    })
    newAppt.value = { patient: '', type: '', doctor: '', date: '', time: '' }
    showAddModal.value = false
  }
  </script>
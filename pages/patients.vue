<!-- pages/patients.vue -->
<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h2 class="text-2xl font-bold text-gray-900">Patient Management</h2>
      <button class="px-4 py-2 bg-primary-600 text-white rounded-xl hover:bg-primary-700 flex items-center space-x-2">
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
        </svg>
        <span>Add New Patient</span>
      </button>
    </div>

    <!-- Filters -->
    <div class="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
      <div class="flex space-x-4">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search patients..." 
          class="flex-1 px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200"
        />
        <select class="px-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-200">
          <option>All Status</option>
          <option>Active</option>
          <option>Inactive</option>
          <option>Pending</option>
        </select>
      </div>
    </div>

    <!-- Patients Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Visit</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Next Appointment</th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="patient in filteredPatients" :key="patient.id">
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                  <span class="text-primary-700 font-medium">{{ patient.initials }}</span>
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">{{ patient.name }}</div>
                  <div class="text-sm text-gray-500">ID: {{ patient.id }}</div>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <div class="text-sm text-gray-900">{{ patient.email }}</div>
              <div class="text-sm text-gray-500">{{ patient.phone }}</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap">
              <span class="px-2 py-1 text-xs font-medium rounded-full" :class="patient.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'">
                {{ patient.status }}
              </span>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ patient.lastVisit }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{{ patient.nextAppointment }}</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
              <button class="text-primary-600 hover:text-primary-700 mr-3">View</button>
              <button class="text-gray-600 hover:text-gray-700">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default'
})

const searchQuery = ref('')

const patients = ref([
  { id: 'P001', name: 'Juan Dela Cruz', initials: 'JC', email: 'juan.delacruz@email.com', phone: '+63 912 345 6789', status: 'Active', lastVisit: '2024-02-15', nextAppointment: '2024-03-01' },
  { id: 'P002', name: 'Maria Reyes', initials: 'MR', email: 'maria.reyes@email.com', phone: '+63 923 456 7890', status: 'Active', lastVisit: '2024-02-20', nextAppointment: '2024-03-05' },
  { id: 'P003', name: 'Jose Santos', initials: 'JS', email: 'jose.santos@email.com', phone: '+63 934 567 8901', status: 'Inactive', lastVisit: '2024-01-10', nextAppointment: 'Not scheduled' },
  { id: 'P004', name: 'Ana Mercado', initials: 'AM', email: 'ana.mercado@email.com', phone: '+63 945 678 9012', status: 'Active', lastVisit: '2024-02-22', nextAppointment: '2024-03-08' },
  { id: 'P005', name: 'Pedro Lopez', initials: 'PL', email: 'pedro.lopez@email.com', phone: '+63 956 789 0123', status: 'Pending', lastVisit: 'Never', nextAppointment: '2024-02-28' }
])

const filteredPatients = computed(() => {
  return patients.value.filter(patient => 
    patient.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
    patient.email.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
})
</script>
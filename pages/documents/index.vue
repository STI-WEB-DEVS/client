<template>
    <NuxtLayout name="default">
      <div class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center border-b border-gray-200 pb-5 mb-8">
          <div class="sm:flex-auto">
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">System Documents</h1>
            <p class="mt-2 text-sm text-gray-600">Access ticket layouts, legal contracts, and event permit documentation.</p>
          </div>
        </div>
  
        <div class="overflow-hidden bg-white shadow-sm ring-1 ring-gray-200 rounded-xl">
          <table class="min-w-full divide-y divide-gray-300">
            <thead class="bg-gray-50">
              <tr>
                <th class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">File Name</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Type</th>
                <th class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">Size</th>
                <th class="relative py-3.5 pl-3 pr-4 sm:pr-6"><span class="sr-only">Download</span></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200 bg-white">
              <tr v-for="doc in documents" :key="doc.id" class="hover:bg-gray-50 transition-colors">
                <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ doc.name }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ doc.type }}</td>
                <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{{ doc.size }}</td>
                <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                  <a href="#" class="text-[#0f2573] hover:text-blue-900 font-bold">Download</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  const documents = ref([
    { id: 1, name: 'Summer_Music_Festival_Permit.pdf', type: 'PDF', size: '1.2 MB' },
    { id: 2, name: 'Ticket_Template_V2_Gold.png', type: 'Image', size: '4.5 MB' },
    { id: 3, name: 'Standard_Terms_And_Conditions.docx', type: 'Word', size: '450 KB' },
    { id: 4, name: 'Gala_Seating_Chart_Final.pdf', type: 'PDF', size: '2.1 MB' }
  ])
  </script>
<template>
    <NuxtLayout>
      <div class="p-6 md:p-8 bg-gray-50 min-h-screen">
        <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
          <div>
            <h1 class="text-3xl font-bold text-gray-900">Documents</h1>
            <p class="text-gray-500 mt-1">Manage your shared files and project assets.</p>
          </div>
          <button class="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition flex items-center gap-2">
            <span>Upload File</span>
          </button>
        </div>
  
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b border-gray-200">
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Name</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Size</th>
                <th class="px-6 py-4 text-xs font-semibold text-gray-500 uppercase">Last Modified</th>
                <th class="px-6 py-4"></th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
              <tr v-for="file in documents" :key="file.name" class="hover:bg-gray-50 transition">
                <td class="px-6 py-4 text-sm font-medium text-gray-900 flex items-center gap-3">
                  <span class="text-xl">📄</span> {{ file.name }}
                </td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ file.type }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ file.size }}</td>
                <td class="px-6 py-4 text-sm text-gray-500">{{ file.date }}</td>
                <td class="px-6 py-4 text-right">
                  <button class="text-green-600 hover:text-green-900 text-sm font-medium">Download</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  const documents = [
    { name: 'Project_Proposal_Final.pdf', type: 'PDF', size: '2.4 MB', date: 'Mar 08, 2026' },
    { name: 'Budget_Q1_2026.xlsx', type: 'Excel', size: '1.1 MB', date: 'Mar 05, 2026' },
    { name: 'Brand_Guidelines.docx', type: 'Word', size: '850 KB', date: 'Feb 28, 2026' },
    { name: 'Assets_Icon_Set.zip', type: 'ZIP', size: '15.6 MB', date: 'Feb 20, 2026' },
  ];
  </script>
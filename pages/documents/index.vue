<template>
  <NuxtLayout>
    <div class="mb-10 sm:flex sm:items-center sm:justify-between border-b border-gray-100 pb-6">
      <div>
        <h1 class="text-3xl font-extrabold tracking-tight text-gray-900">Document Library</h1>
        <p class="mt-2 text-sm text-gray-500 font-medium">Manage institutional records, digital licenses, and policy templates.</p>
      </div>
      <div class="mt-4 flex gap-3 sm:mt-0">
        <div class="relative">
          <input type="text" placeholder="Search files..." class="rounded-lg border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:ring-2 focus:ring-black focus:border-transparent outline-none transition-all w-64" />
        </div>
        <button class="inline-flex items-center rounded-lg bg-black px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-800 transition-all active:scale-95">
          <ArrowUpTrayIcon class="mr-2 size-4" /> Upload
        </button>
      </div>
    </div>

    <h2 class="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">Quick Access</h2>
    <div class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
      <div v-for="folder in folders" :key="folder.name" 
           class="group flex items-center p-4 rounded-xl border border-gray-200 bg-white hover:border-black transition-all cursor-pointer">
        <div :class="folder.color" class="p-2 rounded-lg mr-4">
          <FolderIcon class="size-6 text-white" />
        </div>
        <div>
          <p class="text-sm font-bold text-gray-900">{{ folder.name }}</p>
          <p class="text-xs text-gray-500 font-medium">{{ folder.count }} files</p>
        </div>
      </div>
    </div>

    <div class="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">File Name</th>
            <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Owner</th>
            <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Date Modified</th>
            <th class="px-6 py-4 text-left text-xs font-bold uppercase tracking-widest text-gray-400">Size</th>
            <th class="relative px-6 py-4"><span class="sr-only">Actions</span></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100 bg-white">
          <tr v-for="file in documents" :key="file.id" class="hover:bg-gray-50/50 transition-colors group">
            <td class="whitespace-nowrap px-6 py-4">
              <div class="flex items-center">
                <DocumentIcon :class="fileTypeColor(file.type)" class="mr-3 size-5" />
                <span class="text-sm font-bold text-gray-900">{{ file.name }}</span>
              </div>
            </td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 font-medium">{{ file.owner }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 font-medium">{{ file.date }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-sm text-gray-500 font-medium">{{ file.size }}</td>
            <td class="whitespace-nowrap px-6 py-4 text-right text-sm">
              <button class="text-gray-400 hover:text-black transition-colors">
                <EllipsisVerticalIcon class="size-5" />
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { 
  FolderIcon, 
  DocumentIcon, 
  ArrowUpTrayIcon, 
  EllipsisVerticalIcon 
} from '@heroicons/vue/24/outline'

const folders = [
  { name: 'Policies', count: 12, color: 'bg-black' },
  { name: 'Staff Records', count: 45, color: 'bg-gray-700' },
  { name: 'Licenses', count: 8, color: 'bg-gray-500' },
  { name: 'Reports', count: 124, color: 'bg-gray-400' },
]

const documents = [
  { id: 1, name: 'Lending_Protocol_2026.pdf', type: 'pdf', owner: 'Sarah Jenkins', date: 'Mar 08, 2026', size: '1.2 MB' },
  { id: 2, name: 'Staff_Onboarding.docx', type: 'word', owner: 'Robert Fox', date: 'Feb 24, 2026', size: '850 KB' },
  { id: 3, name: 'Quarterly_Inventory_Q1.xlsx', type: 'excel', owner: 'Admin', date: 'Jan 15, 2026', size: '4.2 MB' },
  { id: 4, name: 'Library_Bylaws_V2.pdf', type: 'pdf', owner: 'Legal Team', date: 'Dec 10, 2025', size: '2.1 MB' },
]

const fileTypeColor = (type: string) => {
  switch (type) {
    case 'pdf': return 'text-red-500'
    case 'word': return 'text-blue-500'
    case 'excel': return 'text-green-600'
    default: return 'text-gray-400'
  }
}
</script>
<template>
  <NuxtLayout>
    <div class="mb-8 border-b border-gray-100 pb-4">
      <h1 class="text-2xl font-bold text-gray-900">Hiking Documents</h1>
      <p class="mt-1 text-sm text-gray-500">Manage trail guides, permits, and hiking reports.</p>
    </div>

    <section class="rounded-xl border border-gray-200 bg-white shadow-sm mb-6">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">Upload New Document</h3>
      </div>
      <div class="p-6">
        <label class="block text-xs font-bold text-gray-500 uppercase">Choose File</label>
        <input
          type="file"
          class="mt-2 block w-full rounded-lg border-gray-200 bg-gray-50 px-4 py-2 text-sm focus:ring-2 focus:ring-black outline-none"
        />
        <p class="mt-2 text-xs text-gray-400">Accepted formats: PDF, DOCX, JPG, PNG</p>
        <button class="mt-4 rounded-lg bg-black px-6 py-2 text-sm font-bold text-white hover:bg-gray-800 shadow-md">
          Upload
        </button>
      </div>
    </section>

    <section class="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div class="px-6 py-4 border-b border-gray-100 bg-gray-50">
        <h3 class="text-sm font-bold text-gray-900 uppercase tracking-wide">My Hiking Documents</h3>
      </div>
      <div class="p-6">
        <table class="min-w-full border border-gray-200 rounded-lg shadow-sm">
          <thead class="bg-gray-50">
            <tr>
              <th class="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Title</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Type</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Date Added</th>
              <th class="px-4 py-2 text-left text-xs font-bold text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="doc in documents" :key="doc.id" class="border-t hover:bg-gray-50">
              <td class="px-4 py-2">{{ doc.title }}</td>
              <td class="px-4 py-2">{{ doc.type }}</td>
              <td class="px-4 py-2">{{ doc.date }}</td>
              <td class="px-4 py-2">
                <button class="text-sm font-bold text-blue-600 hover:underline">View</button>
                <button class="ml-3 text-sm font-bold text-red-600 hover:underline">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const documents = ref([
  { id: 1, title: 'Mt. Apo Trail Guide', type: 'PDF', date: 'Mar 1, 2026' },
  { id: 2, title: 'Permit - Davao Hiking', type: 'DOCX', date: 'Feb 25, 2026' },
  { id: 3, title: 'Itinerary - Weekend Trek', type: 'PDF', date: 'Feb 20, 2026' },
])
</script>

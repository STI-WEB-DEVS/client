<template>
  <div class="space-y-7">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">All documents</p>
      <button
        @click="showModal = true"
        class="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
      >
        <span class="text-base leading-none">+</span> New document
      </button>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">{{ stat.label }}</p>
        <p class="font-serif text-2xl font-normal leading-none tracking-tight text-stone-900">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Search + filters -->
    <div class="flex flex-wrap items-center gap-2">
      <div class="relative flex-1 min-w-[180px]">
        <svg class="absolute -translate-y-1/2 left-3 top-1/2 text-stone-300" width="12" height="12" viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5">
          <circle cx="6.5" cy="6.5" r="4.5"/><path d="M10.5 10.5l3 3"/>
        </svg>
        <input
          v-model="search"
          type="text"
          placeholder="Search documents..."
          class="w-full pl-8 pr-3 py-1.5 text-xs font-sans text-stone-900 bg-white border border-stone-200 rounded-sm outline-none focus:border-stone-900 transition-colors placeholder:text-stone-300"
        />
      </div>
      <button
        v-for="f in filters"
        :key="f"
        @click="activeFilter = f"
        class="px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest rounded-sm border transition-colors"
        :class="activeFilter === f
          ? 'bg-stone-900 text-[#F7F6F3] border-stone-900'
          : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400 hover:text-stone-700'"
      >{{ f }}</button>
    </div>

    <!-- Documents table -->
    <div class="overflow-hidden bg-white border rounded-sm border-stone-200">
      <div class="overflow-x-auto">
        <table class="w-full font-sans text-xs" style="table-layout: fixed;">
          <thead>
            <tr class="border-b border-stone-200">
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium px-5 py-3 w-[35%]">Name</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium px-4 py-3 w-[12%]">Type</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium px-4 py-3 w-[15%]">Owner</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium px-4 py-3 w-[15%]">Modified</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium px-4 py-3 w-[12%]">Size</th>
              <th class="text-left text-[10px] text-stone-300 uppercase tracking-widest font-medium px-4 py-3 w-[11%]">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-stone-100">
            <tr
              v-for="doc in filteredDocs"
              :key="doc.id"
              class="transition-colors cursor-pointer hover:bg-stone-50 group"
              @click="selectedDoc = doc; showDetailModal = true"
            >
              <td class="px-5 py-3">
                <div class="flex items-center gap-3">
                  <div
                    class="w-7 h-7 rounded-sm flex items-center justify-center flex-shrink-0 text-[10px] font-medium font-sans"
                    :class="fileIconClass(doc.type)"
                  >{{ doc.type.toUpperCase().slice(0,3) }}</div>
                  <div class="min-w-0">
                    <p class="font-medium truncate text-stone-900">{{ doc.name }}</p>
                    <p class="text-[10px] text-stone-300 mt-0.5 truncate">{{ doc.project }}</p>
                  </div>
                </div>
              </td>
              <td class="px-4 py-3 text-stone-400 uppercase text-[10px] tracking-wider">{{ doc.type }}</td>
              <td class="px-4 py-3 text-stone-500">{{ doc.owner }}</td>
              <td class="px-4 py-3 text-stone-400">{{ doc.modified }}</td>
              <td class="px-4 py-3 text-stone-400">{{ doc.size }}</td>
              <td class="px-4 py-3">
                <span
                  class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm"
                  :class="{
                    'bg-green-50 text-green-700': doc.status === 'Published',
                    'bg-amber-50 text-amber-700': doc.status === 'Draft',
                    'bg-stone-100 text-stone-500': doc.status === 'Archived',
                    'bg-blue-50 text-blue-700': doc.status === 'Review',
                  }"
                >{{ doc.status }}</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Empty state -->
      <div v-if="filteredDocs.length === 0" class="text-center py-14">
        <p class="mb-1 font-serif text-base font-normal text-stone-400">No documents found</p>
        <p class="text-[11px] font-sans text-stone-300">Try a different filter or search term.</p>
      </div>
    </div>

    <!-- New document modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-md p-8 bg-white border rounded-sm border-stone-200">
        <div class="flex items-center justify-between mb-6">
          <p class="font-serif text-base font-normal text-stone-900">New document</p>
          <button @click="showModal = false" class="text-xl leading-none transition-colors text-stone-300 hover:text-stone-700">&times;</button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Document name</label>
            <input v-model="newDoc.name" type="text" placeholder="e.g. Q2 Report"
              class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Type</label>
              <select v-model="newDoc.type"
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors">
                <option v-for="t in docTypes" :key="t" :value="t">{{ t.toUpperCase() }}</option>
              </select>
            </div>
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Status</label>
              <select v-model="newDoc.status"
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors">
                <option>Draft</option>
                <option>Review</option>
                <option>Published</option>
                <option>Archived</option>
              </select>
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Project</label>
            <input v-model="newDoc.project" type="text" placeholder="Associated project"
              class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button @click="showModal = false"
            class="flex-1 py-2.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors">Cancel</button>
          <button @click="addDoc"
            class="flex-1 py-2.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors">Create</button>
        </div>
      </div>
    </div>

    <!-- Document detail modal -->
    <div
      v-if="showDetailModal && selectedDoc"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50"
      @click.self="showDetailModal = false"
    >
      <div class="w-full max-w-sm p-8 bg-white border rounded-sm border-stone-200">
        <div class="flex items-start justify-between mb-5">
          <div class="flex items-center gap-3">
            <div
              class="w-9 h-9 rounded-sm flex items-center justify-center text-[10px] font-medium font-sans flex-shrink-0"
              :class="fileIconClass(selectedDoc.type)"
            >{{ selectedDoc.type.toUpperCase().slice(0,3) }}</div>
            <div>
              <p class="font-serif text-base font-normal text-stone-900">{{ selectedDoc.name }}</p>
              <p class="text-[11px] font-sans text-stone-400 mt-0.5">{{ selectedDoc.project }}</p>
            </div>
          </div>
          <button @click="showDetailModal = false" class="ml-4 text-xl leading-none transition-colors text-stone-300 hover:text-stone-700">&times;</button>
        </div>
        <div class="border-t border-stone-100 pt-4 space-y-2.5">
          <div class="flex justify-between font-sans text-xs">
            <span class="text-stone-400 uppercase tracking-widest text-[10px]">Owner</span>
            <span class="text-stone-700">{{ selectedDoc.owner }}</span>
          </div>
          <div class="flex justify-between font-sans text-xs">
            <span class="text-stone-400 uppercase tracking-widest text-[10px]">Modified</span>
            <span class="text-stone-700">{{ selectedDoc.modified }}</span>
          </div>
          <div class="flex justify-between font-sans text-xs">
            <span class="text-stone-400 uppercase tracking-widest text-[10px]">Size</span>
            <span class="text-stone-700">{{ selectedDoc.size }}</span>
          </div>
          <div class="flex items-center justify-between font-sans text-xs">
            <span class="text-stone-400 uppercase tracking-widest text-[10px]">Status</span>
            <span
              class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm"
              :class="{
                'bg-green-50 text-green-700': selectedDoc.status === 'Published',
                'bg-amber-50 text-amber-700': selectedDoc.status === 'Draft',
                'bg-stone-100 text-stone-500': selectedDoc.status === 'Archived',
                'bg-blue-50 text-blue-700': selectedDoc.status === 'Review',
              }"
            >{{ selectedDoc.status }}</span>
          </div>
        </div>
        <div class="flex gap-2 mt-5">
          <button
            @click="deleteDoc(selectedDoc.id); showDetailModal = false"
            class="flex-1 py-2 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-red-300 hover:text-red-500 transition-colors"
          >Delete</button>
          <button
            @click="showDetailModal = false"
            class="flex-1 py-2 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
          >Close</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const filters = ['All', 'Published', 'Draft', 'Review', 'Archived']
const activeFilter = ref('All')
const search = ref('')
const showModal = ref(false)
const showDetailModal = ref(false)
const selectedDoc = ref(null)
const docTypes = ['pdf', 'doc', 'xls', 'ppt', 'txt', 'csv']

const docs = ref([
  { id: 1, name: 'Q1 Financial Report', type: 'pdf', owner: 'Tom C.', modified: 'Mar 12, 2026', size: '2.4 MB', status: 'Published', project: 'Data Warehouse' },
  { id: 2, name: 'Atlas Redesign Brief', type: 'doc', owner: 'Sarah M.', modified: 'Mar 10, 2026', size: '840 KB', status: 'Published', project: 'Atlas Redesign' },
  { id: 3, name: 'API v3 Spec', type: 'doc', owner: 'James R.', modified: 'Mar 8, 2026', size: '1.1 MB', status: 'Review', project: 'API v3 Migration' },
  { id: 4, name: 'Marketing Copy Draft', type: 'doc', owner: 'Lin W.', modified: 'Mar 6, 2026', size: '320 KB', status: 'Draft', project: 'Marketing Site' },
  { id: 5, name: 'User Research Data', type: 'xls', owner: 'Tom C.', modified: 'Mar 4, 2026', size: '3.8 MB', status: 'Published', project: 'Atlas Redesign' },
  { id: 6, name: 'Sprint 12 Deck', type: 'ppt', owner: 'Sarah M.', modified: 'Mar 1, 2026', size: '5.2 MB', status: 'Archived', project: 'Mobile App' },
  { id: 7, name: 'Onboarding Checklist', type: 'txt', owner: 'James R.', modified: 'Feb 28, 2026', size: '12 KB', status: 'Published', project: 'Onboarding Flow' },
  { id: 8, name: 'Revenue Forecast', type: 'csv', owner: 'Tom C.', modified: 'Feb 25, 2026', size: '190 KB', status: 'Draft', project: 'Data Warehouse' },
])

const stats = computed(() => [
  { label: 'Total', value: docs.value.length },
  { label: 'Published', value: docs.value.filter(d => d.status === 'Published').length },
  { label: 'Drafts', value: docs.value.filter(d => d.status === 'Draft').length },
  { label: 'In review', value: docs.value.filter(d => d.status === 'Review').length },
])

const filteredDocs = computed(() => {
  return docs.value
    .filter(d => activeFilter.value === 'All' || d.status === activeFilter.value)
    .filter(d => !search.value || d.name.toLowerCase().includes(search.value.toLowerCase()) || d.project.toLowerCase().includes(search.value.toLowerCase()))
})

const fileIconClass = (type: string) => {
  const map: Record<string, string> = {
    pdf: 'bg-red-50 text-red-700',
    doc: 'bg-blue-50 text-blue-700',
    xls: 'bg-green-50 text-green-700',
    ppt: 'bg-amber-50 text-amber-700',
    txt: 'bg-stone-100 text-stone-500',
    csv: 'bg-teal-50 text-teal-700',
  }
  return map[type] ?? 'bg-stone-100 text-stone-500'
}

const newDoc = ref({ name: '', type: 'doc', status: 'Draft', project: '' })

let nextId = 20
const addDoc = () => {
  if (!newDoc.value.name.trim()) return
  docs.value.unshift({
    id: nextId++,
    name: newDoc.value.name,
    type: newDoc.value.type,
    owner: 'Tom C.',
    modified: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    size: '—',
    status: newDoc.value.status,
    project: newDoc.value.project || '—',
  })
  newDoc.value = { name: '', type: 'doc', status: 'Draft', project: '' }
  showModal.value = false
  activeFilter.value = 'All'
}

const deleteDoc = (id: number) => {
  docs.value = docs.value.filter(d => d.id !== id)
}
</script>
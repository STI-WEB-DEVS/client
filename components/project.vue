<template>
  <div class="space-y-7">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest">All projects</p>
      <button
        class="flex items-center gap-2 px-3 py-1.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
        @click="showModal = true"
      >
        <span class="text-base leading-none">+</span> New project
      </button>
    </div>

    <!-- Summary stats -->
    <div class="grid grid-cols-2 gap-2.5 lg:grid-cols-4">
      <div v-for="stat in stats" :key="stat.label" class="p-4 bg-white border rounded-sm border-stone-200">
        <p class="text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest mb-2">{{ stat.label }}</p>
        <p class="font-serif text-2xl font-normal leading-none tracking-tight text-stone-900">{{ stat.value }}</p>
      </div>
    </div>

    <!-- Filters -->
    <div class="flex flex-wrap items-center gap-2">
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

    <!-- Projects grid -->
    <div class="grid grid-cols-1 gap-2.5 lg:grid-cols-2 xl:grid-cols-3">
      <div
        v-for="project in filteredProjects"
        :key="project.name"
        class="p-5 transition-colors bg-white border rounded-sm cursor-pointer border-stone-200 hover:border-stone-400"
      >
        <div class="flex items-start justify-between mb-3">
          <div>
            <p class="font-sans text-sm font-medium text-stone-900">{{ project.name }}</p>
            <p class="text-[11px] font-sans text-stone-400 mt-0.5">{{ project.description }}</p>
          </div>
          <span
            class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm flex-shrink-0 ml-3"
            :class="{
              'bg-green-50 text-green-700': project.status === 'Active',
              'bg-amber-50 text-amber-700': project.status === 'Review',
              'bg-stone-100 text-stone-500': project.status === 'Paused',
              'bg-blue-50 text-blue-700': project.status === 'Complete',
            }"
          >{{ project.status }}</span>
        </div>

        <!-- Progress -->
        <div class="mb-3">
          <div class="flex items-center justify-between mb-1.5">
            <p class="text-[10px] font-sans text-stone-300 uppercase tracking-widest">Progress</p>
            <p class="text-[10px] font-sans text-stone-500 font-medium">{{ project.progress }}%</p>
          </div>
          <div class="w-full h-0.5 bg-stone-100 rounded-sm overflow-hidden">
            <div class="h-full transition-all rounded-sm bg-stone-900" :style="{ width: project.progress + '%' }"></div>
          </div>
        </div>

        <!-- Meta row -->
        <div class="flex items-center justify-between pt-3 border-t border-stone-100">
          <div class="flex items-center gap-2">
            <div class="flex -space-x-1.5">
              <div
                v-for="member in project.members"
                :key="member"
                class="w-5 h-5 rounded-sm bg-stone-200 border border-white flex items-center justify-center text-[8px] font-sans font-medium text-stone-600 uppercase"
              >{{ member }}</div>
            </div>
            <p class="text-[10px] font-sans text-stone-300">{{ project.members.length }} members</p>
          </div>
          <div class="flex items-center gap-1">
            <svg width="10" height="10" viewBox="0 0 16 16" fill="none" stroke="#B0ADA6" stroke-width="1.5">
              <rect x="1" y="3" width="14" height="11" rx="1"/><path d="M5 1v4M11 1v4M1 7h14"/>
            </svg>
            <p class="text-[10px] font-sans text-stone-300">{{ project.due }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div v-if="filteredProjects.length === 0" class="p-12 text-center bg-white border rounded-sm border-stone-200">
      <p class="mb-1 font-serif text-base font-normal text-stone-400">No projects found</p>
      <p class="text-[11px] font-sans text-stone-300">Try a different filter or create a new project.</p>
    </div>

    <!-- New project modal overlay -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-md p-8 bg-white border rounded-sm border-stone-200">
        <div class="flex items-center justify-between mb-6">
          <p class="font-serif text-base font-normal text-stone-900">New project</p>
          <button @click="showModal = false" class="text-lg leading-none transition-colors text-stone-300 hover:text-stone-700">&times;</button>
        </div>

        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Project name</label>
            <input
              v-model="newProject.name"
              type="text"
              placeholder="e.g. Marketing Site"
              class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
            />
          </div>
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Description</label>
            <input
              v-model="newProject.description"
              type="text"
              placeholder="Short description"
              class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
            />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Owner</label>
              <input
                v-model="newProject.owner"
                type="text"
                placeholder="e.g. Tom C."
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
              />
            </div>
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Due date</label>
              <input
                v-model="newProject.due"
                type="text"
                placeholder="e.g. Apr 30"
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300"
              />
            </div>
          </div>
        </div>

        <div class="flex gap-2 mt-6">
          <button
            @click="showModal = false"
            class="flex-1 py-2.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors"
          >Cancel</button>
          <button
            @click="addProject"
            class="flex-1 py-2.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
          >Create</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const filters = ['All', 'Active', 'Review', 'Paused', 'Complete']
const activeFilter = ref('All')
const showModal = ref(false)

const newProject = ref({ name: '', description: '', owner: '', due: '' })

const projects = ref([
  { name: 'Atlas Redesign', description: 'Full product UI overhaul', status: 'Active', progress: 82, due: 'Mar 28', members: ['TC', 'SM'] },
  { name: 'API v3 Migration', description: 'Upgrade to new REST spec', status: 'Review', progress: 61, due: 'Apr 5', members: ['SM', 'JR', 'LW'] },
  { name: 'Marketing Site', description: 'New landing page and blog', status: 'Active', progress: 44, due: 'Apr 12', members: ['JR'] },
  { name: 'Mobile App', description: 'iOS and Android client', status: 'Paused', progress: 29, due: 'May 1', members: ['LW', 'TC'] },
  { name: 'Data Warehouse', description: 'Centralise analytics pipeline', status: 'Active', progress: 55, due: 'Apr 20', members: ['TC', 'SM', 'JR'] },
  { name: 'Onboarding Flow', description: 'Streamline new user setup', status: 'Complete', progress: 100, due: 'Mar 10', members: ['SM'] },
])

const stats = computed(() => [
  { label: 'Total', value: projects.value.length },
  { label: 'Active', value: projects.value.filter(p => p.status === 'Active').length },
  { label: 'In review', value: projects.value.filter(p => p.status === 'Review').length },
  { label: 'Complete', value: projects.value.filter(p => p.status === 'Complete').length },
])

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects.value
    : projects.value.filter(p => p.status === activeFilter.value)
)

const addProject = () => {
  if (!newProject.value.name.trim()) return
  projects.value.push({
    name: newProject.value.name,
    description: newProject.value.description || 'No description',
    status: 'Active',
    progress: 0,
    due: newProject.value.due || 'TBD',
    members: newProject.value.owner ? [newProject.value.owner.slice(0, 2).toUpperCase()] : ['??'],
  })
  newProject.value = { name: '', description: '', owner: '', due: '' }
  showModal.value = false
  activeFilter.value = 'All'
}
</script>
<template>
  <NuxtLayout>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800">Team Members</h2>
      <p class="text-sm text-slate-500 mt-0.5">System users fetched via TeamService</p>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div v-for="n in 8" :key="n" class="card animate-pulse">
        <div class="flex items-center gap-3 mb-4">
          <div class="size-12 rounded-full bg-slate-200"></div>
          <div class="flex-1 space-y-2">
            <div class="h-4 bg-slate-200 rounded w-3/4"></div>
            <div class="h-3 bg-slate-200 rounded w-1/2"></div>
          </div>
        </div>
        <div class="space-y-2">
          <div class="h-3 bg-slate-200 rounded"></div>
          <div class="h-3 bg-slate-200 rounded w-5/6"></div>
        </div>
      </div>
    </div>

    <!-- Error -->
    <div v-else-if="error" class="card text-center py-12">
      <p class="text-red-500 font-semibold">Failed to load team members.</p>
      <p class="text-slate-400 text-sm mt-1">{{ error }}</p>
      <button @click="loadTeam" class="btn-amber mt-4">Retry</button>
    </div>

    <!-- Team Grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
      <div v-for="member in team" :key="member.id" class="member-card">
        <!-- Avatar with initials -->
        <div class="member-avatar" :style="{ background: avatarColor(member.name) }">
          {{ initials(member.name) }}
        </div>
        <div class="text-center mt-3 mb-4">
          <h3 class="font-bold text-slate-800 text-base">{{ member.name }}</h3>
          <p class="text-xs text-amber-600 font-semibold mt-0.5">@{{ member.username }}</p>
        </div>
        <div class="member-info">
          <div class="info-row">
            <span class="info-icon">✉</span>
            <span class="truncate">{{ member.email }}</span>
          </div>
          <div class="info-row">
            <span class="info-icon">📞</span>
            <span>{{ member.phone }}</span>
          </div>
          <div class="info-row">
            <span class="info-icon">🏢</span>
            <span class="truncate">{{ member.company?.name }}</span>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-slate-100 flex justify-center">
          <span class="badge-green">Active Member</span>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { TeamService } from '~/api/Team/TeamService'

const teamService = new TeamService()
const team = ref<any[]>([])
const loading = ref(true)
const error = ref('')

const loadTeam = async () => {
  loading.value = true
  error.value = ''
  try {
    const data = await teamService.getTeams() as any[]
    team.value = data
  } catch (e: any) {
    error.value = e?.message || 'Unknown error'
  } finally {
    loading.value = false
  }
}

onMounted(loadTeam)

const initials = (name: string) =>
  name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()

const colors = [
  'linear-gradient(135deg,#F59E0B,#D97706)',
  'linear-gradient(135deg,#3B82F6,#2563EB)',
  'linear-gradient(135deg,#10B981,#059669)',
  'linear-gradient(135deg,#8B5CF6,#7C3AED)',
  'linear-gradient(135deg,#EF4444,#DC2626)',
  'linear-gradient(135deg,#06B6D4,#0891B2)',
]
const avatarColor = (name: string) => colors[name.charCodeAt(0) % colors.length]
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.member-card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); transition: all 0.2s; display: flex; flex-direction: column; align-items: center; }
.member-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.1); transform: translateY(-2px); }
.member-avatar { width: 64px; height: 64px; border-radius: 50%; color: white; font-weight: 800; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; }
.member-info { width: 100%; space-y: 2px; }
.info-row { display: flex; align-items: center; gap: 0.5rem; font-size: 0.78rem; color: #64748B; margin-bottom: 4px; }
.info-icon { font-size: 0.8rem; flex-shrink: 0; }
.badge-green { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.8rem; border-radius: 9999px; background: #F0FDF4; color: #16A34A; }
.btn-amber { background: linear-gradient(135deg, #F59E0B, #D97706); color: #0F172A; font-weight: 700; font-size: 0.85rem; padding: 0.5rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; }
</style>
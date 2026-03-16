<script setup>
import { TeamService } from '~/api/Team/TeamService'

const teamService = new TeamService()
const members = ref([])
const loading = ref(true)
const error = ref(null)

const realTeam = [
  { name: 'King Paolo Chiu',      image: 'https://ui-avatars.com/api/?name=King+Paolo+Chiu&background=5AA7A7&color=fff&size=256' },
  { name: 'Ivy Hope Alba',        image: 'https://ui-avatars.com/api/?name=Ivy+Hope+Alba&background=5AA7A7&color=fff&size=256' },
  { name: 'Julia Niel Bulalaque', image: 'https://ui-avatars.com/api/?name=Julia+Niel+Bulalaque&background=5AA7A7&color=fff&size=256' },
  { name: 'Kent Leabres',         image: 'https://ui-avatars.com/api/?name=Kent+Leabres&background=5AA7A7&color=fff&size=256' },
]

onMounted(async () => {
  try {
    const data = await teamService.getTeams()
    members.value = realTeam.map((member, index) => ({
      ...member,
      id: data[index]?.id ?? index + 1,
    }))
  } catch (err) {
    error.value = 'Failed to load team members.'
  } finally {
    loading.value = false
  }
})
</script>

<template>
    <div class="min-h-screen" style="background-color: #1a2e35;">

      <!-- Content -->
      <div class="py-24 px-6">

        <!-- Heading -->
        <div class="text-center mb-16">
          <h2 class="text-4xl font-bold text-white tracking-tight mb-4">Meet our team</h2>
          <p class="text-white/60 text-base max-w-lg mx-auto leading-relaxed">
            We're a dynamic group of individuals who are passionate about what we do and dedicated to delivering the best results for our clients.
          </p>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="flex justify-center gap-6 flex-wrap max-w-5xl mx-auto">
          <div v-for="i in 4" :key="i" class="w-[220px] rounded-2xl p-6 flex flex-col items-center gap-4" style="background: rgba(90,167,167,0.1); border: 1px solid rgba(90,167,167,0.2);">
            <div class="w-28 h-28 rounded-full animate-pulse" style="background: rgba(255,255,255,0.1);"></div>
            <div class="h-4 w-28 rounded animate-pulse" style="background: rgba(255,255,255,0.15);"></div>
            <div class="h-3 w-20 rounded animate-pulse" style="background: rgba(255,255,255,0.1);"></div>
          </div>
        </div>

        <!-- Error -->
        <div v-else-if="error" class="text-center">
          <p class="text-white/70 text-sm">{{ error }}</p>
        </div>

        <!-- Team Cards -->
        <div v-else class="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">
          <div
            v-for="member in members"
            :key="member.id"
            class="w-[220px] rounded-2xl p-6 flex flex-col items-center text-center transition-all duration-200 hover:scale-105"
            style="background: rgba(90,167,167,0.12); border: 1px solid rgba(90,167,167,0.25);"
          >
            <!-- Avatar -->
            <div class="w-28 h-28 rounded-full overflow-hidden mb-5 ring-4" style="ring-color: rgba(90,167,167,0.3);">
              <img
                :src="member.image"
                :alt="member.name"
                class="w-full h-full object-cover"
              />
            </div>

            <!-- Name & Role -->
            <h3 class="text-white font-bold text-[15px] leading-snug mb-1">{{ member.name }}</h3>
            <p class="text-[13px] mb-5" style="color: #5AA7A7;">{{ member.role }}</p>

            <!-- Social Icons -->
            <div class="flex items-center gap-3">
              <a href="#" class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style="background: rgba(90,167,167,0.15);" onmouseover="this.style.background='rgba(90,167,167,0.3)'" onmouseout="this.style.background='rgba(90,167,167,0.15)'">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M10.5 1.5H8.5C7.4 1.5 6.5 2.4 6.5 3.5V5.5H4.5V7.5H6.5V12.5H8.5V7.5H10.5L11 5.5H8.5V3.5C8.5 3.2 8.7 3 9 3H10.5V1.5Z" stroke="#5AA7A7" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </a>
              <a href="#" class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style="background: rgba(90,167,167,0.15);" onmouseover="this.style.background='rgba(90,167,167,0.3)'" onmouseout="this.style.background='rgba(90,167,167,0.15)'">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1.5 1.5L5.8 7.6L1.5 12.5H2.5L6.3 8.2L9.5 12.5H12.5L8 6.1L12 1.5H11L7.5 5.5L4.5 1.5H1.5Z" fill="#5AA7A7"/>
                </svg>
              </a>
              <a href="#" class="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style="background: rgba(90,167,167,0.15);" onmouseover="this.style.background='rgba(90,167,167,0.3)'" onmouseout="this.style.background='rgba(90,167,167,0.15)'">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <rect x="1.5" y="1.5" width="11" height="11" rx="3" stroke="#5AA7A7" stroke-width="1.2"/>
                  <circle cx="7" cy="7" r="2.2" stroke="#5AA7A7" stroke-width="1.2"/>
                  <circle cx="10.2" cy="3.8" r=".6" fill="#5AA7A7"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
</template>
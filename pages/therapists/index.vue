<template>
  <div style="background:#FFFEF9; min-height:100vh; padding:16px;">
    <div style="background:#FFFEF9; border-radius:16px; min-height:calc(100vh - 32px); padding:25px;">

      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:24px;">
        <div>
          <h1 style="font-size:28px; font-weight:700; color:#1a1a1a; letter-spacing:-0.3px;">Therapists</h1>
          <p style="font-size:13px; color:#999; margin-top:3px;">Manage your clinical nutrition team</p>
        </div>
        <button style="background:#4CAF82; color:white; border:none; border-radius:10px; padding:10px 18px; font-size:13px; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">
          + Add Therapist
        </button>
      </div>

      <!-- Filter tabs -->
      <div style="display:flex; gap:8px; margin-bottom:20px;">
        <button v-for="tab in tabs" :key="tab" @click="activeTab=tab"
          :style="`padding:7px 16px; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; border:none; font-family:Inter,sans-serif;
            ${activeTab===tab ? 'background:#4CAF82; color:white;' : 'background:#EEE9D8; color:#666;'}`">
          {{ tab }}
        </button>
      </div>

      <!-- Search -->
      <input v-model="search" placeholder="Search therapists..." style="width:100%; border:1px solid #e5e5e5; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; margin-bottom:20px; font-family:Inter,sans-serif;"/>

      <div v-if="loading" style="text-align:center; padding:40px; color:#aaa;">Loading...</div>

      <!-- Team list matching image exactly -->
      <div style="border:1px solid #E8E0CC; border-radius:14px; overflow:hidden;">
        <div v-for="(member, idx) in filteredTeam" :key="member.id"
          :style="`display:flex; align-items:center; gap:14px; padding:16px 20px; ${idx < filteredTeam.length-1 ? 'border-bottom:1px solid #f8f8f8;' : ''}`">
          <div :style="`width:44px; height:44px; border-radius:50%; background:${avatarBg(member.id)}; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:13px; color:${avatarFg(member.id)}; flex-shrink:0;`">
            {{ member.avatar }}
          </div>
          <div style="flex:1; min-width:0;">
            <p style="font-size:14px; font-weight:600; color:#1a1a1a;">{{ member.name }}</p>
            <p style="font-size:12px; color:#999; margin-top:1px;">{{ member.role }}</p>
          </div>
          <div style="text-align:right; margin-right:16px;">
            <p style="font-size:11px; color:#aaa; margin-bottom:2px;">Status</p>
            <p :style="`font-size:12px; font-weight:600; color:${member.status==='Active'?'#4CAF82':member.status==='On Leave'?'#f59e0b':'#aaa'}`">{{ member.status }}</p>
          </div>
          <div style="text-align:right; margin-right:12px;">
            <p style="font-size:11px; color:#aaa;">View Profile</p>
          </div>
          <button style="background:#4CAF82; color:white; border:none; border-radius:8px; padding:7px 14px; font-size:12px; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">
            View Profile
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import TeamService, { type TeamMember } from '~/api/TeamService'
definePageMeta({ layout: 'default' })
const team = ref<TeamMember[]>([])
const loading = ref(true)
const search = ref('')
const activeTab = ref('All')
const tabs = ['All', 'Active', 'On Leave', 'Inactive']
onMounted(async () => { team.value = await TeamService.getAll(); loading.value = false })
const filteredTeam = computed(() => {
  let l = team.value
  if (activeTab.value !== 'All') l = l.filter(m => m.status === activeTab.value)
  if (search.value) l = l.filter(m => m.name.toLowerCase().includes(search.value.toLowerCase()))
  return l
})
const avatarBg = (id: number) => ['#e8d5c4','#c4d5e8','#d5e8c4','#e8e0c4','#dbc4e8','#c4e8e5'][id % 6]
const avatarFg = (id: number) => ['#8b6347','#476a8b','#478b64','#8b7a47','#6b478b','#47838b'][id % 6]
</script>

<template>
    <NuxtLayout>
        <h1 class="text-3xl font-bold text-[#2E4DA7] mb-2"> Team</h1>
        <div class="p-8">
      <p class="text-gray-600 mb-8">Meet the experts behind your personalized travel packages.</p>

      <div v-if="loading" class="flex justify-center py-10">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-[#00B4D8]"></div>
      </div>

      <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div 
          v-for="member in teamList" 
          :key="member.id" 
          class="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
        >
          <div class="w-12 h-12 bg-blue-50 text-[#2E4DA7] rounded-full flex items-center justify-center font-bold mb-4">
            {{ member.name.charAt(0) }}
          </div>
          <h3 class="text-lg font-bold text-gray-900">{{ member.name }}</h3>
          <p class="text-sm text-[#00B4D8] font-medium mb-3">{{ member.company.name }}</p>
          <p class="text-sm text-gray-500 italic">"{{ member.company.catchPhrase }}"</p>
          
          <div class="mt-4 pt-4 border-t border-gray-50 text-xs text-gray-400">
            Email: {{ member.email.toLowerCase() }}
          </div>
        </div>
      </div>
    </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TeamService } from '~/api/Team/TeamService';

const teamService = new TeamService();
const teamList = ref([]);
const loading = ref(true);

const loadTeamData = async () => {
  loading.value = true;
  
  teamList.value = await teamService.getTeams();
  
  loading.value = false;
};

onMounted(() => {
  loadTeamData();
});
</script>
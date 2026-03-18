<template>
    <NuxtLayout>
        <div class="h-[100vh] flex flex-col">
            <div v-if="loading" class="flex justify-center items-center h-[300px]">
                <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-white"></div>
            </div>
            <h1 class="text-center text-2xl uppercase font-bold">Agent</h1>
            <div class="flex flex-1 ">
                <div class="grid grid-cols-5 grid-rows-2 gap-4 p-4 flex-1 ">
                    <div v-if="user1" class=" group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/a1.avif" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user1.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user1.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user1.address.city }}</p>
                    </div>
                    <div v-if="user2" class=" group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/erwin.jpg" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user2.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user2.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user2.address.city }}</p>
                    </div>
                    <div v-if="user3" class="group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/a3.jpg" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user3.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user3.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user3.address.city }}</p>
                    </div>
                    <div v-if="user4" class=" group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/ag4.avif" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user4.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user4.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user4.address.city }}</p>

                    </div>
                    <div v-if="user5" class=" group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/agent1.png" alt="" srcset=""
                            class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user5.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user5.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user5.address.city }}</p>
                    </div>
                    <div v-if="user6" class="group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/agent2.webp" alt="" srcset=""
                            class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user6.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user6.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user6.address.city }}</p>
                    </div>
                    <div v-if="user7" class="group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/agent3.jpg" alt="" srcset=""
                            class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user7.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user7.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user7.address.city }}</p>
                    </div>
                    <div v-if="user8" class="group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/agent4.jpg" alt="" srcset=""
                            class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user8.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user8.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user8.address.city }}</p>
                    </div>
                    <div v-if="user9" class="group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/agent5.webp" alt="" srcset=""
                            class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user9.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user9.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user9.address.city }}</p>
                    </div>
                    <div v-if="user10" class="group grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg hover:shadow-xl transition-shadow duration-300
                        hover:scale-105 transform hover:bg-neutral-700">
                        <img src="/public/img/a10.jpeg" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h1 class="text-black text-center pt-5 text-lg group-hover:text-white">{{ user10.name }}</h1>
                        <p class="text-black/50 text-xs text-center">{{ user10.email }}</p>
                        <p class="text-black/50 text-xs text-center">{{ user10.address.city }}</p>
                    </div>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { TeamService } from '../../api/Team/TeamService';

const teamService = new TeamService();

const user1 = ref<any>(null);
const user2 = ref<any>(null);
const user3 = ref<any>(null);
const user4 = ref<any>(null);
const user5 = ref<any>(null);
const user6 = ref<any>(null);
const user7 = ref<any>(null);
const user8 = ref<any>(null);
const user9 = ref<any>(null);
const user10 = ref<any>(null);
const loading = ref(true)


onMounted(async () => {
    try {
        const data = await teamService.getTeams();

        user1.value = data[0];
        user2.value = data[1];
        user3.value = data[2];
        user4.value = data[3];
        user5.value = data[4];
        user6.value = data[5];
        user7.value = data[6];
        user8.value = data[7];
        user9.value = data[8];
        user10.value = data[9];


    } catch (error) {
        alert('Failed to fetch team data');
    }
    finally {
        loading.value = false
    }
});

</script>
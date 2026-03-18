<template>
    <NuxtLayout>
        <div class=" min-h-screen flex flex-col gap-4 p-4">

            <div class="grid grid-cols-3 gap-4 text-black">
                <div v-for="card in cards" :key="card.name"
                    class="border rounded-lg p-4 flex items-center gap-4 bg-neutral-700">

                    <div class="p-2 bg-neutral-600 rounded-lg">
                        <component :is="card.icon" class="w-10 h-10" :class="card.color" />
                    </div>


                    <div>
                        <p class="text-gray-300 text-sm">{{ card.label }}</p>
                        <h2 class="text-2xl font-bold text-wyhite">{{ card.value }}</h2>
                    </div>
                </div>
            </div>


            <div class="flex flex-col flex-1 justify-center border">
                <div class="flex justify-center pb-4">
                    <h1 class="text-black font-semibold text-2xl">Top Sales</h1>
                </div>

                <div class="grid grid-cols-4 gap-4 p-4 flex-1">
                    <div v-if="user1" class="grid grid-rows-[200px_auto] border rounded-lg p-4 text-white shadow-lg">
                        <img src="/public/img/a1.avif" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h2 class="font-bold text-lg pt-5 text-center text-black">{{ user1.name }}</h2>
                        <p class="text-sm text-gray-400">{{ user1.email }}</p>
                        <p class="text-sm text-gray-400">{{ user1.address.city }}</p>
                    </div>
                    <div v-if="user2" class="grid grid-rows-[200px_auto] border rounded-lg p-4 shadow-lg text-white">
                        <img src="/public/img/erwin.jpg" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h2 class="font-bold text-lg pt-5 text-center text-black">{{ user2.name }}</h2>
                        <p class="text-sm text-gray-400">{{ user2.email }}</p>
                        <p class="text-sm text-gray-400">{{ user2.address.city }}</p>
                    </div>
                    <div v-if="user3" class="grid grid-rows-[200px_auto] border rounded-lg p-4 shadow-lg text-white">
                        <img src="/public/img/a3.jpg" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h2 class="font-bold text-lg pt-5 text-center text-black">{{ user3.name }}</h2>
                        <p class="text-sm text-gray-400">{{ user3.email }}</p>
                        <p class="text-sm text-gray-400">{{ user3.address.city }}</p>
                    </div>
                    <div v-if="user4" class="grid grid-rows-[200px_auto] border rounded-lg p-4 shadow-lg text-white">
                        <img src="/public/img/ag4.avif" alt="" srcset="" class="w-full h-[200px] object-cover rounded">
                        <h2 class="font-bold text-lg pt-5 text-center text-black">{{ user4.name }}</h2>
                        <p class="text-sm text-gray-400">{{ user4.email }}</p>
                        <p class="text-sm text-gray-400">{{ user4.address.city }}</p>
                    </div>
                </div>
            </div>

            <div class="flex-1 border border-black rounded-lg p-4">
                <p class="text-black">Table / Details Section</p>
            </div>

        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { UsersIcon, FolderIcon, BellIcon, ChartPieIcon } from '@heroicons/vue/24/outline'

import { ref, onMounted } from 'vue';
import { TeamService } from '../api/Team/TeamService';

const cards = [
    {
        name: 'users',
        label: 'Total Users',
        value: 1245,
        icon: UsersIcon,
        color: 'text-blue-400',
    },
    {
        name: 'projects',
        label: 'Projects',
        value: 58,
        icon: BellIcon,
        color: 'text-yellow-400',
    },
    {
        name: 'reports',
        label: 'Reports',
        value: 23,
        icon: ChartPieIcon,
        color: 'text-purple-400',
    },
]

const teamService = new TeamService();

const user1 = ref<any>(null);
const user2 = ref<any>(null);
const user3 = ref<any>(null);
const user4 = ref<any>(null);

onMounted(async () => {
    try {
        const data = await teamService.getTeams();

        user1.value = data[0];
        user2.value = data[1];
        user3.value = data[2];
        user4.value = data[3];

    } catch (error) {
        alert('Failed to fetch team data');
    }
});
</script>

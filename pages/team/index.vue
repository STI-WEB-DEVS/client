<template>
  <NuxtLayout>
    <div
      class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h2 class="text-xl font-bold text-gray-900">Medical Team</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ members.length }} staff members
        </p>
      </div>
      <div class="flex items-center gap-3">
        <div class="relative">
          <MagnifyingGlassIcon
            class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
          />
          <input
            v-model="search"
            type="text"
            placeholder="Search team..."
            class="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 bg-white w-52"
          />
        </div>
        <button
          class="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          <PlusIcon class="h-4 w-4" /> Add Member
        </button>
      </div>
    </div>

    <div
      v-if="loading"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <div
        v-for="i in 8"
        :key="i"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 animate-pulse"
      >
        <div class="h-12 w-12 rounded-full bg-gray-200 mb-4"></div>
        <div class="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div class="h-3 bg-gray-100 rounded w-1/2"></div>
      </div>
    </div>

    <div
      v-else-if="error"
      class="bg-red-50 border border-red-200 rounded-2xl p-8 text-center"
    >
      <p class="text-red-700 font-medium">Failed to load team members</p>
      <button
        @click="loadTeam"
        class="mt-4 px-4 py-2 bg-red-100 text-red-700 rounded-lg text-sm hover:bg-red-200"
      >
        Retry
      </button>
    </div>

    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
    >
      <div
        v-for="member in filteredMembers"
        :key="member.id"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md hover:-translate-y-0.5 transition-all duration-200"
      >
        <div class="flex items-start justify-between mb-4">
          <div
            :class="getAvatarColor(member.id)"
            class="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
          >
            {{ getInitials(member.name) }}
          </div>
          <span
            class="text-xs bg-emerald-100 text-emerald-700 font-medium px-2.5 py-1 rounded-full"
            >Active</span
          >
        </div>
        <h3 class="font-semibold text-gray-900 text-sm">{{ member.name }}</h3>
        <p class="text-xs text-teal-600 font-medium mt-0.5">
          {{ getRoleTitle(member.id) }}
        </p>
        <div class="mt-4 space-y-1.5">
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <EnvelopeIcon class="h-3.5 w-3.5 shrink-0" />
            <span class="truncate">{{ member.email }}</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <PhoneIcon class="h-3.5 w-3.5 shrink-0" />
            <span>{{ member.phone }}</span>
          </div>
          <div class="flex items-center gap-2 text-xs text-gray-500">
            <MapPinIcon class="h-3.5 w-3.5 shrink-0" />
            <span>{{ member.address.city }}, {{ member.address.zipcode }}</span>
          </div>
        </div>
        <div class="mt-4 pt-4 border-t border-gray-100 flex items-center gap-2">
          <span
            class="text-xs bg-teal-50 text-teal-700 px-2 py-0.5 rounded-md font-medium"
            >{{ getDept(member.id) }}</span
          >
          <span
            class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-md"
            >{{ member.username }}</span
          >
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import {
  MagnifyingGlassIcon,
  PlusIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
} from "@heroicons/vue/24/outline";
import { TeamService } from "~/api/Team/TeamService";

const members = ref<any[]>([]);
const loading = ref(true);
const error = ref("");
const search = ref("");

const filteredMembers = computed(() =>
  members.value.filter(
    (m) =>
      m.name.toLowerCase().includes(search.value.toLowerCase()) ||
      m.email.toLowerCase().includes(search.value.toLowerCase()),
  ),
);

const roles = [
  "Cardiologist",
  "General Surgeon",
  "Nurse Practitioner",
  "Radiologist",
  "Pediatrician",
  "Anesthesiologist",
  "Orthopedist",
  "Neurologist",
  "Dermatologist",
  "Pharmacist",
];
const depts = [
  "Cardiology",
  "Surgery",
  "General Ward",
  "Radiology",
  "Pediatrics",
  "Anesthesia",
  "Orthopedics",
  "Neurology",
  "Dermatology",
  "Pharmacy",
];
const colors = [
  "bg-teal-500",
  "bg-cyan-600",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-emerald-600",
  "bg-blue-500",
  "bg-violet-500",
  "bg-rose-500",
];

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
const getAvatarColor = (id: number) => colors[(id - 1) % colors.length];
const getRoleTitle = (id: number) => roles[(id - 1) % roles.length];
const getDept = (id: number) => depts[(id - 1) % depts.length];

const loadTeam = async () => {
  loading.value = true;
  error.value = "";
  try {
    const service = new TeamService();
    const data = await service.getTeams();
    members.value = data as any[];
  } catch (e: any) {
    error.value = e?.message || "Unknown error";
  } finally {
    loading.value = false;
  }
};

onMounted(loadTeam);
</script>

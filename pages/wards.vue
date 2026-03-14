<template>
  <NuxtLayout>
    <div
      class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h2 class="text-xl font-bold text-gray-900">Wards & Rooms</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ totalBeds }} total beds · {{ occupiedBeds }} occupied ·
          {{ availableBeds }} available
        </p>
      </div>
      <button
        class="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors self-start"
      >
        <PlusIcon class="h-4 w-4" /> Add Room
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
      <div
        v-for="ward in wards"
        :key="ward.name"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
      >
        <div
          class="px-6 py-4 border-b border-gray-100 flex items-center justify-between"
        >
          <div class="flex items-center gap-3">
            <div :class="ward.iconBg" class="p-2 rounded-lg">
              <component
                :is="ward.icon"
                :class="ward.iconColor"
                class="h-5 w-5"
              />
            </div>
            <div>
              <h3 class="font-semibold text-gray-900 text-sm">
                {{ ward.name }}
              </h3>
              <p class="text-xs text-gray-500">{{ ward.floor }}</p>
            </div>
          </div>
          <span
            :class="ward.statusColor"
            class="text-xs font-medium px-2.5 py-1 rounded-full"
            >{{ ward.status }}</span
          >
        </div>
        <div class="px-6 py-4">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-500">Bed Occupancy</span>
            <span class="text-sm font-semibold text-gray-900"
              >{{ ward.occupied }}/{{ ward.total }}</span
            >
          </div>
          <div class="h-2.5 bg-gray-100 rounded-full overflow-hidden mb-4">
            <div
              :class="ward.barColor"
              class="h-2.5 rounded-full transition-all"
              :style="{
                width: Math.round((ward.occupied / ward.total) * 100) + '%',
              }"
            ></div>
          </div>
          <div class="grid grid-cols-3 gap-3 text-center">
            <div class="bg-gray-50 rounded-xl p-2.5">
              <p class="text-lg font-bold text-gray-900">
                {{ ward.total - ward.occupied }}
              </p>
              <p class="text-xs text-gray-500">Available</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-2.5">
              <p class="text-lg font-bold text-gray-900">{{ ward.staff }}</p>
              <p class="text-xs text-gray-500">Staff</p>
            </div>
            <div class="bg-gray-50 rounded-xl p-2.5">
              <p class="text-lg font-bold text-gray-900">{{ ward.rooms }}</p>
              <p class="text-xs text-gray-500">Rooms</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed } from "vue";
import {
  PlusIcon,
  BoltIcon,
  HeartIcon,
  HomeModernIcon,
  BeakerIcon,
  UserGroupIcon,
  SparklesIcon,
} from "@heroicons/vue/24/outline";

const wards = [
  {
    name: "Emergency Ward",
    floor: "Ground Floor",
    total: 20,
    occupied: 14,
    staff: 8,
    rooms: 8,
    icon: BoltIcon,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    barColor: "bg-red-400",
    status: "High Capacity",
    statusColor: "bg-red-100 text-red-700",
  },
  {
    name: "Cardiology Ward",
    floor: "2nd Floor",
    total: 30,
    occupied: 18,
    staff: 6,
    rooms: 12,
    icon: HeartIcon,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    barColor: "bg-pink-400",
    status: "Normal",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "General Ward A",
    floor: "3rd Floor",
    total: 40,
    occupied: 35,
    staff: 10,
    rooms: 16,
    icon: HomeModernIcon,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    barColor: "bg-teal-500",
    status: "Near Full",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "General Ward B",
    floor: "3rd Floor",
    total: 40,
    occupied: 22,
    staff: 9,
    rooms: 16,
    icon: HomeModernIcon,
    iconBg: "bg-cyan-100",
    iconColor: "text-cyan-600",
    barColor: "bg-cyan-400",
    status: "Normal",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "ICU",
    floor: "4th Floor",
    total: 12,
    occupied: 9,
    staff: 12,
    rooms: 12,
    icon: SparklesIcon,
    iconBg: "bg-purple-100",
    iconColor: "text-purple-600",
    barColor: "bg-purple-500",
    status: "High Capacity",
    statusColor: "bg-red-100 text-red-700",
  },
  {
    name: "Pediatrics Ward",
    floor: "5th Floor",
    total: 25,
    occupied: 11,
    staff: 7,
    rooms: 10,
    icon: UserGroupIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-500",
    barColor: "bg-blue-400",
    status: "Normal",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "OB Ward",
    floor: "5th Floor",
    total: 20,
    occupied: 16,
    staff: 6,
    rooms: 8,
    icon: UserGroupIcon,
    iconBg: "bg-rose-100",
    iconColor: "text-rose-500",
    barColor: "bg-rose-400",
    status: "Near Full",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "Laboratory",
    floor: "Ground Floor",
    total: 15,
    occupied: 6,
    staff: 4,
    rooms: 6,
    icon: BeakerIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    barColor: "bg-amber-400",
    status: "Normal",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
];

const totalBeds = computed(() => wards.reduce((s, w) => s + w.total, 0));
const occupiedBeds = computed(() => wards.reduce((s, w) => s + w.occupied, 0));
const availableBeds = computed(() => totalBeds.value - occupiedBeds.value);
</script>

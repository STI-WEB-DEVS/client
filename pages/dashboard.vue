<template>
  <NuxtLayout>
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
      >
        <div class="flex items-center justify-between mb-4">
          <div :class="stat.iconBg" class="p-2.5 rounded-xl">
            <component
              :is="stat.icon"
              :class="stat.iconColor"
              class="h-5 w-5"
            />
          </div>
          <span
            class="text-xs font-semibold px-2 py-1 rounded-full"
            :class="stat.changeColor"
            :style="{ backgroundColor: stat.changeBg }"
          >
            {{ stat.change }}
          </span>
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ stat.name }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      <div
        class="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100"
      >
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-gray-100"
        >
          <h2 class="text-base font-semibold text-gray-900">Recent Patients</h2>
          <NuxtLink
            to="/patients"
            class="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >View all</NuxtLink
          >
        </div>
        <div class="divide-y divide-gray-50">
          <div
            v-for="patient in recentPatients"
            :key="patient.id"
            class="flex items-center gap-4 px-6 py-3.5 hover:bg-gray-50 transition-colors"
          >
            <div
              :class="patient.avatarBg"
              class="h-9 w-9 rounded-full flex items-center justify-center text-white text-sm font-semibold shrink-0"
            >
              {{ patient.initials }}
            </div>
            <div class="flex-1 min-w-0">
              <p class="text-sm font-medium text-gray-900">
                {{ patient.name }}
              </p>
              <p class="text-xs text-gray-500">{{ patient.condition }}</p>
            </div>
            <span
              :class="patient.statusColor"
              class="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
              >{{ patient.status }}</span
            >
            <p class="text-xs text-gray-400 shrink-0 hidden sm:block">
              {{ patient.time }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
        <div
          class="flex items-center justify-between px-6 py-4 border-b border-gray-100"
        >
          <h2 class="text-base font-semibold text-gray-900">
            Today's Schedule
          </h2>
          <NuxtLink
            to="/appointments"
            class="text-sm text-teal-600 hover:text-teal-700 font-medium"
            >All</NuxtLink
          >
        </div>
        <div class="divide-y divide-gray-50">
          <div
            v-for="appt in todayAppointments"
            :key="appt.id"
            class="px-6 py-3.5"
          >
            <div class="flex items-start justify-between gap-2">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 truncate">
                  {{ appt.patient }}
                </p>
                <p class="text-xs text-gray-500">{{ appt.type }}</p>
              </div>
              <span
                class="text-xs font-semibold text-teal-700 bg-teal-50 px-2 py-1 rounded-lg shrink-0"
                >{{ appt.time }}</span
              >
            </div>
            <div class="flex items-center gap-1 mt-1.5">
              <div class="h-1.5 flex-1 rounded-full bg-gray-100">
                <div
                  :class="appt.progressColor"
                  class="h-1.5 rounded-full"
                  :style="{ width: appt.progress }"
                ></div>
              </div>
              <span class="text-xs text-gray-400">{{ appt.doctor }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100">
        <h2 class="text-base font-semibold text-gray-900">
          Department Overview
        </h2>
      </div>
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100"
      >
        <div v-for="dept in departments" :key="dept.name" class="px-6 py-5">
          <div class="flex items-center gap-3 mb-3">
            <div :class="dept.iconBg" class="p-2 rounded-lg">
              <component
                :is="dept.icon"
                :class="dept.iconColor"
                class="h-4 w-4"
              />
            </div>
            <p class="text-sm font-medium text-gray-900">{{ dept.name }}</p>
          </div>
          <p class="text-2xl font-bold text-gray-900 mb-1">
            {{ dept.patients }}
          </p>
          <div class="flex items-center gap-2">
            <div class="h-2 flex-1 rounded-full bg-gray-100">
              <div
                :class="dept.barColor"
                class="h-2 rounded-full"
                :style="{ width: dept.capacity }"
              ></div>
            </div>
            <span class="text-xs text-gray-500">{{ dept.capacity }}</span>
          </div>
          <p class="text-xs text-gray-500 mt-1">
            {{ dept.staff }} staff on duty
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  UserGroupIcon,
  CalendarDaysIcon,
  HeartIcon,
  BeakerIcon,
  BoltIcon,
  HomeModernIcon,
} from "@heroicons/vue/24/outline";

const stats = [
  {
    name: "Total Patients",
    value: "2,431",
    change: "+4.5%",
    changeColor: "text-emerald-700",
    changeBg: "#d1fae5",
    icon: UserGroupIcon,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    name: "Today's Appointments",
    value: "48",
    change: "+12",
    changeColor: "text-blue-700",
    changeBg: "#dbeafe",
    icon: CalendarDaysIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Critical Cases",
    value: "7",
    change: "-2",
    changeColor: "text-red-700",
    changeBg: "#fee2e2",
    icon: HeartIcon,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    name: "Lab Results Pending",
    value: "23",
    change: "+3",
    changeColor: "text-amber-700",
    changeBg: "#fef3c7",
    icon: BeakerIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

const recentPatients = [
  {
    id: 1,
    name: "Maria Santos",
    initials: "MS",
    avatarBg: "bg-teal-500",
    condition: "Hypertension · Ward B",
    status: "Admitted",
    statusColor: "bg-blue-100 text-blue-700",
    time: "8:30 AM",
  },
  {
    id: 2,
    name: "Jose Dela Cruz",
    initials: "JD",
    avatarBg: "bg-purple-500",
    condition: "Diabetes Type 2 · OPD",
    status: "Outpatient",
    statusColor: "bg-teal-100 text-teal-700",
    time: "9:15 AM",
  },
  {
    id: 3,
    name: "Ana Reyes",
    initials: "AR",
    avatarBg: "bg-pink-500",
    condition: "Post-op Recovery · ICU",
    status: "Critical",
    statusColor: "bg-red-100 text-red-700",
    time: "10:00 AM",
  },
  {
    id: 4,
    name: "Carlos Lim",
    initials: "CL",
    avatarBg: "bg-orange-500",
    condition: "Asthma · ER",
    status: "Stable",
    statusColor: "bg-emerald-100 text-emerald-700",
    time: "10:45 AM",
  },
  {
    id: 5,
    name: "Rosa Mendoza",
    initials: "RM",
    avatarBg: "bg-indigo-500",
    condition: "Fracture · Ortho",
    status: "Admitted",
    statusColor: "bg-blue-100 text-blue-700",
    time: "11:30 AM",
  },
];

const todayAppointments = [
  {
    id: 1,
    patient: "Pedro Villanueva",
    type: "General Check-up",
    time: "1:00 PM",
    doctor: "Dr. Lim",
    progress: "100%",
    progressColor: "bg-emerald-400",
  },
  {
    id: 2,
    patient: "Linda Torres",
    type: "Cardiology Consult",
    time: "2:00 PM",
    doctor: "Dr. Reyes",
    progress: "60%",
    progressColor: "bg-teal-400",
  },
  {
    id: 3,
    patient: "Mark Garcia",
    type: "Lab Follow-up",
    time: "3:30 PM",
    doctor: "Dr. Cruz",
    progress: "30%",
    progressColor: "bg-blue-400",
  },
  {
    id: 4,
    patient: "Elena Ramos",
    type: "Prenatal Visit",
    time: "4:00 PM",
    doctor: "Dr. Santos",
    progress: "10%",
    progressColor: "bg-gray-300",
  },
];

const departments = [
  {
    name: "Emergency",
    patients: 14,
    staff: 8,
    capacity: "70%",
    icon: BoltIcon,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
    barColor: "bg-red-400",
  },
  {
    name: "Cardiology",
    patients: 28,
    staff: 5,
    capacity: "55%",
    icon: HeartIcon,
    iconBg: "bg-pink-100",
    iconColor: "text-pink-500",
    barColor: "bg-pink-400",
  },
  {
    name: "General Ward",
    patients: 62,
    staff: 12,
    capacity: "80%",
    icon: HomeModernIcon,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
    barColor: "bg-teal-400",
  },
  {
    name: "Laboratory",
    patients: 31,
    staff: 4,
    capacity: "40%",
    icon: BeakerIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-500",
    barColor: "bg-amber-400",
  },
];
</script>

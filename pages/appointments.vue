<template>
  <NuxtLayout>
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
    >
      <div>
        <h2 class="text-xl font-bold text-gray-900">Appointments</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ appointments.length }} scheduled today
        </p>
      </div>
      <button
        class="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors self-start"
      >
        <PlusIcon class="h-4 w-4" /> Schedule Appointment
      </button>
    </div>

    <div class="flex gap-2 mb-6 overflow-x-auto pb-1">
      <button
        v-for="day in days"
        :key="day.label"
        @click="selectedDay = day.label"
        :class="
          selectedDay === day.label
            ? 'bg-teal-600 text-white shadow-sm'
            : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
        "
        class="flex-shrink-0 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
      >
        <span class="block text-xs opacity-75">{{ day.weekday }}</span>
        <span>{{ day.label }}</span>
      </button>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div class="lg:col-span-2 space-y-3">
        <div
          v-for="appt in appointments"
          :key="appt.id"
          class="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-all flex items-start gap-4"
        >
          <div class="text-center shrink-0 w-16">
            <p class="text-sm font-bold text-teal-700">{{ appt.time }}</p>
            <p class="text-xs text-gray-400">{{ appt.duration }}</p>
          </div>
          <div
            :class="appt.borderColor"
            class="w-1 rounded-full self-stretch shrink-0 min-h-12"
          ></div>
          <div class="flex-1 min-w-0">
            <div class="flex items-start justify-between gap-2">
              <div>
                <p class="font-semibold text-gray-900">{{ appt.patient }}</p>
                <p class="text-sm text-teal-600 font-medium">{{ appt.type }}</p>
              </div>
              <span
                :class="statusClasses[appt.status]"
                class="text-xs font-medium px-2.5 py-1 rounded-full shrink-0"
                >{{ appt.status }}</span
              >
            </div>
            <div class="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2">
              <span class="flex items-center gap-1 text-xs text-gray-500"
                ><UserIcon class="h-3.5 w-3.5" />{{ appt.doctor }}</span
              >
              <span class="flex items-center gap-1 text-xs text-gray-500"
                ><MapPinIcon class="h-3.5 w-3.5" />{{ appt.room }}</span
              >
            </div>
          </div>
        </div>
      </div>

      <div class="flex flex-col gap-6">
        <!-- Summary Card -->
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-semibold text-gray-900 mb-5">Today's Summary</h3>
          <div class="space-y-4">
            <div
              v-for="s in summary"
              :key="s.label"
              class="flex items-center justify-between"
            >
              <div class="flex items-center gap-3">
                <span
                  class="inline-block h-3 w-3 rounded-full flex-shrink-0"
                  :class="s.dot"
                ></span>
                <span class="text-sm text-gray-600">{{ s.label }}</span>
              </div>
              <span class="text-sm font-semibold text-gray-900">{{
                s.count
              }}</span>
            </div>
          </div>
        </div>

        <!-- Next Up Card -->
        <div class="rounded-2xl p-6" style="background-color: #0f766e">
          <p
            class="text-xs uppercase tracking-widest font-semibold mb-3"
            style="color: #99f6e4"
          >
            Next Up
          </p>
          <p class="text-lg font-semibold text-white">Linda Torres</p>
          <p class="text-4xl font-bold mt-2 mb-1 text-white">2:00 PM</p>
          <p class="text-sm mb-5" style="color: #ccfbf1">
            Cardiology · Room 204
          </p>
          <div class="flex gap-3">
            <button
              class="flex-1 text-sm font-semibold py-2.5 rounded-xl transition-colors"
              style="background-color: white; color: #0f766e"
            >
              Check In
            </button>
            <button
              class="flex-1 text-sm font-semibold py-2.5 rounded-xl transition-colors text-white"
              style="border: 1px solid rgba(255, 255, 255, 0.5)"
            >
              Reschedule
            </button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { PlusIcon, UserIcon, MapPinIcon } from "@heroicons/vue/24/outline";

const selectedDay = ref("Jan 27");

const days = [
  { weekday: "Mon", label: "Jan 27" },
  { weekday: "Tue", label: "Jan 28" },
  { weekday: "Wed", label: "Jan 29" },
  { weekday: "Thu", label: "Jan 30" },
  { weekday: "Fri", label: "Jan 31" },
  { weekday: "Sat", label: "Feb 1" },
];

const statusClasses: Record<string, string> = {
  Confirmed: "bg-emerald-100 text-emerald-700",
  Pending: "bg-amber-100 text-amber-700",
  Cancelled: "bg-red-100 text-red-700",
  Completed: "bg-gray-100 text-gray-600",
};

const appointments = [
  {
    id: 1,
    time: "8:00 AM",
    duration: "30 min",
    patient: "Pedro Villanueva",
    type: "General Check-up",
    doctor: "Dr. Cruz",
    room: "Room 101",
    status: "Completed",
    borderColor: "bg-gray-300",
  },
  {
    id: 2,
    time: "9:00 AM",
    duration: "45 min",
    patient: "Maria Santos",
    type: "Cardiology Follow-up",
    doctor: "Dr. Reyes",
    room: "Room 204",
    status: "Completed",
    borderColor: "bg-gray-300",
  },
  {
    id: 3,
    time: "10:30 AM",
    duration: "60 min",
    patient: "Carlos Lim",
    type: "Emergency Consult",
    doctor: "Dr. Santos",
    room: "ER-2",
    status: "Confirmed",
    borderColor: "bg-teal-400",
  },
  {
    id: 4,
    time: "12:00 PM",
    duration: "30 min",
    patient: "Rosa Mendoza",
    type: "Ortho Review",
    doctor: "Dr. Garcia",
    room: "Room 310",
    status: "Confirmed",
    borderColor: "bg-teal-400",
  },
  {
    id: 5,
    time: "2:00 PM",
    duration: "45 min",
    patient: "Linda Torres",
    type: "Cardiology Consult",
    doctor: "Dr. Reyes",
    room: "Room 204",
    status: "Confirmed",
    borderColor: "bg-teal-400",
  },
  {
    id: 6,
    time: "3:30 PM",
    duration: "30 min",
    patient: "Mark Garcia",
    type: "Lab Follow-up",
    doctor: "Dr. Cruz",
    room: "Lab A",
    status: "Pending",
    borderColor: "bg-amber-400",
  },
  {
    id: 7,
    time: "4:00 PM",
    duration: "45 min",
    patient: "Elena Ramos",
    type: "Prenatal Visit",
    doctor: "Dr. Santos",
    room: "OB-1",
    status: "Confirmed",
    borderColor: "bg-teal-400",
  },
  {
    id: 8,
    time: "5:30 PM",
    duration: "30 min",
    patient: "Roberto Bautista",
    type: "Post-op Check",
    doctor: "Dr. Lim",
    room: "Room 108",
    status: "Pending",
    borderColor: "bg-amber-400",
  },
];

const summary = [
  { label: "Completed", count: 2, dot: "bg-gray-400" },
  { label: "Confirmed", count: 5, dot: "bg-teal-500" },
  { label: "Pending", count: 2, dot: "bg-amber-400" },
  { label: "Cancelled", count: 0, dot: "bg-red-400" },
];
</script>

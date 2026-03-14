<template>
  <NuxtLayout>
    <div
      class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6"
    >
      <div>
        <h2 class="text-xl font-bold text-gray-900">Patient Management</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          {{ patients.length }} registered patients
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
            placeholder="Search patients..."
            class="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 bg-white w-52"
          />
        </div>
        <select
          v-model="filterStatus"
          class="py-2 px-3 rounded-xl border border-gray-200 text-sm focus:outline-none bg-white"
        >
          <option value="">All Status</option>
          <option>Admitted</option>
          <option>Outpatient</option>
          <option>Critical</option>
          <option>Discharged</option>
        </select>
        <button
          class="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          <PlusIcon class="h-4 w-4" /> New Patient
        </button>
      </div>
    </div>

    <div
      class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
    >
      <table class="w-full text-sm">
        <thead>
          <tr class="border-b border-gray-100 bg-gray-50">
            <th
              class="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Patient
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden md:table-cell"
            >
              Age / Blood
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden lg:table-cell"
            >
              Condition
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden xl:table-cell"
            >
              Doctor
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider"
            >
              Status
            </th>
            <th
              class="text-left px-6 py-4 text-xs font-semibold text-gray-500 uppercase tracking-wider hidden sm:table-cell"
            >
              Admitted
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-50">
          <tr
            v-for="p in filteredPatients"
            :key="p.id"
            class="hover:bg-gray-50/70 transition-colors"
          >
            <td class="px-6 py-4">
              <div class="flex items-center gap-3">
                <div
                  :class="p.avatarBg"
                  class="h-9 w-9 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
                >
                  {{ p.initials }}
                </div>
                <div>
                  <p class="font-medium text-gray-900">{{ p.name }}</p>
                  <p class="text-xs text-gray-500">
                    ID: HT-{{ String(p.id).padStart(4, "0") }}
                  </p>
                </div>
              </div>
            </td>
            <td class="px-6 py-4 hidden md:table-cell">
              <p class="text-gray-700">{{ p.age }} yrs</p>
              <p class="text-xs text-red-600 font-semibold">
                {{ p.bloodType }}
              </p>
            </td>
            <td class="px-6 py-4 hidden lg:table-cell">
              <p class="text-gray-700">{{ p.condition }}</p>
              <p class="text-xs text-gray-500">{{ p.ward }}</p>
            </td>
            <td class="px-6 py-4 hidden xl:table-cell text-gray-700">
              {{ p.doctor }}
            </td>
            <td class="px-6 py-4">
              <span
                :class="statusClasses[p.status]"
                class="text-xs font-medium px-2.5 py-1 rounded-full"
                >{{ p.status }}</span
              >
            </td>
            <td class="px-6 py-4 text-xs text-gray-500 hidden sm:table-cell">
              {{ p.admitted }}
            </td>
          </tr>
        </tbody>
      </table>
      <div
        class="px-6 py-4 border-t border-gray-100 flex items-center justify-between"
      >
        <p class="text-sm text-gray-500">
          Showing {{ filteredPatients.length }} of
          {{ patients.length }} patients
        </p>
        <div class="flex gap-2">
          <button
            class="px-3 py-1.5 text-sm rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            class="px-3 py-1.5 text-sm rounded-lg bg-teal-600 text-white hover:bg-teal-700"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { MagnifyingGlassIcon, PlusIcon } from "@heroicons/vue/24/outline";

const search = ref("");
const filterStatus = ref("");
const statusClasses: Record<string, string> = {
  Admitted: "bg-blue-100 text-blue-700",
  Outpatient: "bg-teal-100 text-teal-700",
  Critical: "bg-red-100 text-red-700",
  Discharged: "bg-gray-100 text-gray-600",
};
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
  "bg-amber-500",
  "bg-lime-600",
];
const patients = [
  {
    id: 1,
    name: "Maria Santos",
    age: 54,
    bloodType: "A+",
    condition: "Hypertension",
    ward: "Ward B-12",
    doctor: "Dr. Cruz",
    status: "Admitted",
    admitted: "Jan 15, 2025",
  },
  {
    id: 2,
    name: "Jose Dela Cruz",
    age: 62,
    bloodType: "O+",
    condition: "Diabetes Type 2",
    ward: "OPD",
    doctor: "Dr. Reyes",
    status: "Outpatient",
    admitted: "Jan 20, 2025",
  },
  {
    id: 3,
    name: "Ana Reyes",
    age: 38,
    bloodType: "B-",
    condition: "Post-op Recovery",
    ward: "ICU-3",
    doctor: "Dr. Lim",
    status: "Critical",
    admitted: "Jan 22, 2025",
  },
  {
    id: 4,
    name: "Carlos Lim",
    age: 29,
    bloodType: "AB+",
    condition: "Asthma",
    ward: "ER-5",
    doctor: "Dr. Santos",
    status: "Admitted",
    admitted: "Jan 23, 2025",
  },
  {
    id: 5,
    name: "Rosa Mendoza",
    age: 45,
    bloodType: "A-",
    condition: "Femur Fracture",
    ward: "Ortho-2",
    doctor: "Dr. Garcia",
    status: "Admitted",
    admitted: "Jan 24, 2025",
  },
  {
    id: 6,
    name: "Pedro Torres",
    age: 71,
    bloodType: "O-",
    condition: "Pneumonia",
    ward: "Ward C-4",
    doctor: "Dr. Cruz",
    status: "Critical",
    admitted: "Jan 25, 2025",
  },
  {
    id: 7,
    name: "Linda Villanueva",
    age: 33,
    bloodType: "B+",
    condition: "Appendectomy",
    ward: "Discharged",
    doctor: "Dr. Reyes",
    status: "Discharged",
    admitted: "Jan 18, 2025",
  },
  {
    id: 8,
    name: "Mark Garcia",
    age: 47,
    bloodType: "A+",
    condition: "Cholesterol Check",
    ward: "OPD",
    doctor: "Dr. Lim",
    status: "Outpatient",
    admitted: "Jan 26, 2025",
  },
  {
    id: 9,
    name: "Elena Ramos",
    age: 28,
    bloodType: "O+",
    condition: "Prenatal Care",
    ward: "OB Ward",
    doctor: "Dr. Santos",
    status: "Admitted",
    admitted: "Jan 27, 2025",
  },
  {
    id: 10,
    name: "Ben Aquino",
    age: 55,
    bloodType: "AB-",
    condition: "Angina",
    ward: "Cardio-1",
    doctor: "Dr. Villanueva",
    status: "Admitted",
    admitted: "Jan 28, 2025",
  },
  {
    id: 11,
    name: "Sofia Castro",
    age: 19,
    bloodType: "A+",
    condition: "Dengue Fever",
    ward: "Ward A-7",
    doctor: "Dr. Cruz",
    status: "Critical",
    admitted: "Jan 29, 2025",
  },
  {
    id: 12,
    name: "Roberto Bautista",
    age: 68,
    bloodType: "O+",
    condition: "Cataract Surgery",
    ward: "Discharged",
    doctor: "Dr. Reyes",
    status: "Discharged",
    admitted: "Jan 10, 2025",
  },
].map((p, i) => ({
  ...p,
  initials: p.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .slice(0, 2)
    .toUpperCase(),
  avatarBg: colors[i % colors.length],
}));

const filteredPatients = computed(() =>
  patients.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.value.toLowerCase()) ||
      p.condition.toLowerCase().includes(search.value.toLowerCase());
    const matchStatus = !filterStatus.value || p.status === filterStatus.value;
    return matchSearch && matchStatus;
  }),
);
</script>

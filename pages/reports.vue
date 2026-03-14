<template>
  <NuxtLayout>
    <div
      class="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h2 class="text-xl font-bold text-gray-900">Reports & Analytics</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          Hospital performance overview
        </p>
      </div>
      <button
        class="flex items-center gap-2 bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors self-start"
      >
        <ArrowDownTrayIcon class="h-4 w-4" /> Export Report
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
      <div
        v-for="stat in stats"
        :key="stat.name"
        class="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div class="flex items-center justify-between mb-3">
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
            >{{ stat.change }}</span
          >
        </div>
        <p class="text-2xl font-bold text-gray-900">{{ stat.value }}</p>
        <p class="text-sm text-gray-500 mt-1">{{ stat.name }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
      <!-- Monthly Admissions -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-900 mb-4">Monthly Admissions</h3>
        <div class="space-y-3">
          <div
            v-for="month in admissions"
            :key="month.name"
            class="flex items-center gap-3"
          >
            <span class="text-sm text-gray-500 w-8">{{ month.name }}</span>
            <div class="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-3 bg-teal-500 rounded-full transition-all"
                :style="{ width: month.pct }"
              ></div>
            </div>
            <span class="text-sm font-semibold text-gray-700 w-10 text-right">{{
              month.value
            }}</span>
          </div>
        </div>
      </div>

      <!-- Top Diagnoses -->
      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h3 class="font-semibold text-gray-900 mb-4">
          Top Diagnoses This Month
        </h3>
        <div class="space-y-4">
          <div v-for="(d, i) in diagnoses" :key="d.name">
            <div class="flex justify-between items-center mb-1.5">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-gray-400">{{ i + 1 }}</span>
                <span class="text-sm text-gray-700">{{ d.name }}</span>
              </div>
              <span class="text-sm font-semibold text-gray-900">{{
                d.count
              }}</span>
            </div>
            <div
              style="
                width: 100%;
                height: 10px;
                background-color: #f3f4f6;
                border-radius: 999px;
              "
            >
              <div
                :style="
                  'width:' +
                  d.pct +
                  '; height: 10px; background-color:' +
                  d.color +
                  '; border-radius: 999px;'
                "
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div class="px-6 py-4 border-b border-gray-100">
        <h3 class="font-semibold text-gray-900">Department Performance</h3>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr class="border-b border-gray-100 bg-gray-50">
              <th
                class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Department
              </th>
              <th
                class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Patients
              </th>
              <th
                class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Avg Stay
              </th>
              <th
                class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Satisfaction
              </th>
              <th
                class="text-left px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Status
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-50">
            <tr
              v-for="dept in deptPerformance"
              :key="dept.name"
              class="hover:bg-gray-50/70"
            >
              <td class="px-6 py-4 font-medium text-gray-900">
                {{ dept.name }}
              </td>
              <td class="px-6 py-4 text-gray-600">{{ dept.patients }}</td>
              <td class="px-6 py-4 text-gray-600">{{ dept.avgStay }}</td>
              <td class="px-6 py-4">
                <div class="flex items-center gap-2">
                  <div
                    style="
                      width: 96px;
                      height: 8px;
                      background-color: #f3f4f6;
                      border-radius: 999px;
                    "
                  >
                    <div
                      :style="
                        'width:' +
                        dept.satisfaction +
                        '; height: 8px; background-color: #14b8a6; border-radius: 999px;'
                      "
                    ></div>
                  </div>
                  <span class="text-sm text-gray-600">{{
                    dept.satisfaction
                  }}</span>
                </div>
              </td>
              <td class="px-6 py-4">
                <span
                  :class="dept.statusColor"
                  class="text-xs font-medium px-2.5 py-1 rounded-full"
                  >{{ dept.status }}</span
                >
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  UserGroupIcon,
  CalendarDaysIcon,
  HeartIcon,
  CurrencyDollarIcon,
  ArrowDownTrayIcon,
} from "@heroicons/vue/24/outline";

const stats = [
  {
    name: "Total Admissions",
    value: "1,284",
    change: "+8.2%",
    changeColor: "text-emerald-700",
    changeBg: "#d1fae5",
    icon: UserGroupIcon,
    iconBg: "bg-teal-100",
    iconColor: "text-teal-600",
  },
  {
    name: "Avg Length of Stay",
    value: "4.2d",
    change: "-0.3d",
    changeColor: "text-emerald-700",
    changeBg: "#d1fae5",
    icon: CalendarDaysIcon,
    iconBg: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    name: "Mortality Rate",
    value: "1.2%",
    change: "-0.1%",
    changeColor: "text-emerald-700",
    changeBg: "#d1fae5",
    icon: HeartIcon,
    iconBg: "bg-red-100",
    iconColor: "text-red-500",
  },
  {
    name: "Revenue This Month",
    value: "₱2.4M",
    change: "+12%",
    changeColor: "text-emerald-700",
    changeBg: "#d1fae5",
    icon: CurrencyDollarIcon,
    iconBg: "bg-amber-100",
    iconColor: "text-amber-600",
  },
];

const admissions = [
  { name: "Jan", value: 198, pct: "66%" },
  { name: "Feb", value: 212, pct: "71%" },
  { name: "Mar", value: 245, pct: "82%" },
  { name: "Apr", value: 189, pct: "63%" },
  { name: "May", value: 267, pct: "89%" },
  { name: "Jun", value: 298, pct: "99%" },
];

const diagnoses = [
  { name: "Hypertension", count: 142, pct: "95%", color: "#14b8a6" },
  { name: "Diabetes", count: 118, pct: "79%", color: "#3b82f6" },
  { name: "Pneumonia", count: 97, pct: "65%", color: "#f97316" },
  { name: "Heart Disease", count: 84, pct: "56%", color: "#ef4444" },
  { name: "Dengue Fever", count: 61, pct: "41%", color: "#a855f7" },
];

const deptPerformance = [
  {
    name: "Emergency",
    patients: 312,
    avgStay: "1.2d",
    satisfaction: "92%",
    status: "Excellent",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Cardiology",
    patients: 198,
    avgStay: "5.4d",
    satisfaction: "88%",
    status: "Good",
    statusColor: "bg-teal-100 text-teal-700",
  },
  {
    name: "General Ward",
    patients: 421,
    avgStay: "3.8d",
    satisfaction: "85%",
    status: "Good",
    statusColor: "bg-teal-100 text-teal-700",
  },
  {
    name: "Pediatrics",
    patients: 156,
    avgStay: "2.9d",
    satisfaction: "94%",
    status: "Excellent",
    statusColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Orthopedics",
    patients: 89,
    avgStay: "7.1d",
    satisfaction: "79%",
    status: "Average",
    statusColor: "bg-amber-100 text-amber-700",
  },
];
</script>

<template>
  <div
    class="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-gray-200/50"
  >
    <!-- Subtle Background Pattern -->
    <div
      class="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-gray-50/50 blur-2xl transition-all duration-500 group-hover:bg-indigo-50/50"
    ></div>

    <div class="relative flex items-center gap-5">
      <div
        v-if="icon"
        class="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-600 text-white shadow-lg shadow-gray-200 transition-transform duration-500 group-hover:scale-110"
      >
        <component :is="icon" class="h-6 w-6" aria-hidden="true" />
      </div>
      <div class="flex-1">
        <p class="text-xs font-bold uppercase tracking-widest text-gray-400">
          {{ title }}
        </p>
        <div class="mt-1 flex items-baseline gap-2">
          <h3 class="text-2xl font-extrabold tracking-tight text-gray-900">
            {{ value }}
          </h3>
          <div
            v-if="trend"
            :class="[
              trendType === 'up'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-rose-50 text-rose-600',
              'rounded-full px-2 py-0.5 text-[10px] font-bold',
            ]"
          >
            {{ trendType === "up" ? "↑" : "↓" }} {{ trend }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from "vue";

defineProps<{
  title: string;
  value: string | number;
  icon?: Component;
  trend?: string;
  trendType?: "up" | "down";
}>();
</script>

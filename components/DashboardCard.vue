<template>
  <div class="overflow-hidden rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md">
    <div class="flex items-center gap-4">
      <div v-if="icon" class="rounded-lg bg-gray-50 p-2.5 text-gray-900 ring-1 ring-inset ring-gray-200">
        <component :is="icon" class="h-6 w-6" aria-hidden="true" />
      </div>
      <div>
        <p class="text-sm font-medium text-gray-500">{{ title }}</p>
        <div class="flex items-baseline gap-2">
          <h3 class="text-2xl font-semibold tracking-tight text-gray-900">{{ value }}</h3>
          <span
            v-if="trend"
            :class="[
              trendType === 'up' ? 'text-emerald-600' : 'text-rose-600',
              'text-xs font-medium'
            ]"
          >
            {{ trendType === 'up' ? '↑' : '↓' }} {{ trend }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Component } from 'vue';

defineProps<{
  title: string;
  value: string | number;
  icon?: Component;
  trend?: string;
  trendType?: 'up' | 'down';
}>();
</script>

<template>
  <div class="nm-card nm-stat-card" :class="{ 'nm-stat-card--accent': accent }">
    <div class="flex items-start justify-between mb-3">
      <div
        class="nm-stat-icon"
        :style="{ background: `${iconBg}`, color: iconColor }"
      >
        <component :is="icon" class="w-5 h-5" />
      </div>
      <span v-if="change !== undefined" class="nm-stat-change" :class="changeClass">
        <component :is="changeIcon" class="w-3 h-3" />
        {{ Math.abs(change) }}%
      </span>
    </div>

    <div class="mt-1">
      <p class="nm-stat-value">{{ value }}</p>
      <p class="nm-stat-label">{{ label }}</p>
    </div>

    <div v-if="subtext" class="mt-2 pt-2 border-t border-nm-border">
      <p class="text-xs text-nm-muted font-body">{{ subtext }}</p>
    </div>

    <!-- Accent bar -->
    <div v-if="accent" class="nm-stat-accent-bar" :style="{ background: accentColor }" />
  </div>
</template>

<script setup lang="ts">
import { ArrowUpIcon, ArrowDownIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  label: string
  value: string | number
  icon: any
  iconBg?: string
  iconColor?: string
  change?: number
  subtext?: string
  accent?: boolean
  accentColor?: string
}>()

const iconBg = computed(() => props.iconBg ?? 'rgba(13,107,107,0.10)')
const iconColor = computed(() => props.iconColor ?? 'var(--nm-teal)')
const accentColor = computed(() => props.accentColor ?? 'var(--nm-teal)')

const changeClass = computed(() => {
  if (props.change === undefined) return ''
  return props.change >= 0
    ? 'nm-stat-change--up'
    : 'nm-stat-change--down'
})

const changeIcon = computed(() => {
  if (props.change === undefined) return null
  return props.change >= 0 ? ArrowUpIcon : ArrowDownIcon
})
</script>

<style scoped>
.nm-stat-card {
  padding: 1.25rem;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
}

.nm-stat-card--accent {
  border-left: 3px solid transparent;
}

.nm-stat-accent-bar {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 3px;
  border-radius: 0 0 12px 12px;
  opacity: 0.6;
}

.nm-stat-icon {
  width: 42px;
  height: 42px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.nm-stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 1.85rem;
  font-weight: 700;
  color: var(--nm-text);
  line-height: 1.15;
}

.nm-stat-label {
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.82rem;
  color: var(--nm-text-muted);
  font-weight: 500;
  letter-spacing: 0.01em;
  margin-top: 0.15rem;
}

.nm-stat-change {
  display: inline-flex;
  align-items: center;
  gap: 0.2rem;
  font-family: 'Source Sans 3', sans-serif;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 0.2rem 0.5rem;
  border-radius: 99px;
}

.nm-stat-change--up   { background: #d1fae5; color: #065f46; }
.nm-stat-change--down { background: #fee2e2; color: #991b1b; }
</style>

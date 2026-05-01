<template>
  <div class="flex items-center gap-3">
    <button
      type="button"
      @click="decrement"
      :disabled="modelValue <= min"
      class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
    >
      −
    </button>
    <span class="w-10 text-center text-lg font-semibold text-gray-900">{{ modelValue }}</span>
    <button
      type="button"
      @click="increment"
      :disabled="max !== undefined && modelValue >= max"
      class="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-300 text-gray-700 transition hover:bg-gray-50 disabled:opacity-40"
    >
      +
    </button>
  </div>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue: number
  min?: number
  max?: number
}>(), {
  min: 1,
  max: undefined,
})

const emit = defineEmits<{
  'update:modelValue': [value: number]
}>()

const decrement = () => {
  if (props.modelValue > props.min) {
    emit('update:modelValue', props.modelValue - 1)
  }
}

const increment = () => {
  if (props.max === undefined || props.modelValue < props.max) {
    emit('update:modelValue', props.modelValue + 1)
  }
}
</script>
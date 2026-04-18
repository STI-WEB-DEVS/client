<template>
  <form @submit.prevent="$emit('submit', localData)" class="space-y-4">
    <div v-for="field in config" :key="field.key">
      <label :for="field.key" class="block text-sm font-medium text-gray-700">{{ field.label }}</label>
      <input
        v-model="localData[field.key]"
        :type="field.type || 'text'"
        :id="field.key"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        :placeholder="field.placeholder"
        required
      />
    </div>
    <div class="mt-5 flex justify-end gap-3">
      <button type="button" @click="$emit('cancel')" class="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
        Cancel
      </button>
      <button type="submit" class="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
        {{ buttonLabel }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
  config: Array<{ key: string; label: string; type?: string; placeholder?: string }>;
  initialData?: any;
  buttonLabel: string;
}>();

const emit = defineEmits(['submit', 'cancel']);
const localData = ref({ ...props.initialData });

// Sync data if initialData changes (e.g., when switching to Edit mode)
watch(() => props.initialData, (newVal) => {
  localData.value = { ...newVal };
}, { deep: true });
</script>
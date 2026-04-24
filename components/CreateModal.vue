<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-5">
            <h2 class="text-lg font-semibold text-gray-900">Create {{ title }}</h2>
            <button type="button" @click="$emit('close')" class="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-4">
            <div v-for="field in fields" :key="field.key">
              <label class="mb-1 block text-sm font-medium text-gray-700">{{ field.label }}</label>
              <input
                v-model="form[field.key]"
                :type="field.type ?? 'text'"
                :placeholder="field.placeholder ?? ''"
                class="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>

          <div class="mt-6 flex items-center justify-end gap-2">
            <button type="button" @click="$emit('close')" class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="button" :disabled="saving" @click="handleSave" class="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-60">
              <span v-if="saving" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {{ saving ? 'Creating…' : `Create ${title}` }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { XMarkIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  open: boolean;
  title: string;
  fields: { key: string; label: string; type?: string; placeholder?: string }[];
  onSave: (form: Record<string, any>) => Promise<any>;
}>();

const emit = defineEmits<{
  close: [];
  created: [item: any];
}>();

const saving = ref(false);
const form = ref<Record<string, any>>({});

// Reset form when modal opens
watch(() => props.open, (val) => {
  if (val) {
    form.value = props.fields.reduce((acc, field) => {
      acc[field.key] = '';
      return acc;
    }, {} as Record<string, any>);
  }
});

const handleSave = async () => {
  saving.value = true;
  try {
    const created = await props.onSave(form.value);
    emit('created', created);
    emit('close');
  } finally {
    saving.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
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

        <div class="relative z-10 w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-red-100">
            <TrashIcon class="h-5 w-5 text-red-600" />
          </div>
          <h2 class="mt-3 text-base font-semibold text-gray-900">Delete {{ title }}</h2>
          <p class="mt-1 text-sm text-gray-500">
            Are you sure you want to delete
            <span class="font-medium text-gray-900">{{ item?.[labelKey] }}</span>?
            This action cannot be undone.
          </p>

          <div class="mt-6 flex items-center justify-end gap-2">
            <button type="button" @click="$emit('close')" class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
              Cancel
            </button>
            <button type="button" :disabled="deleting" @click="handleDelete" class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:opacity-60">
              <span v-if="deleting" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
              {{ deleting ? 'Deleting…' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { TrashIcon } from '@heroicons/vue/24/outline';

const props = defineProps<{
  open: boolean;
  title: string;
  item: Record<string, any>;
  labelKey: string;
  onDelete: () => Promise<void>;
}>();

const emit = defineEmits<{
  close: [];
  deleted: [];
}>();

const deleting = ref(false);

const handleDelete = async () => {
  deleting.value = true;
  try {
    await props.onDelete();
    emit('deleted');
    emit('close');
  } finally {
    deleting.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
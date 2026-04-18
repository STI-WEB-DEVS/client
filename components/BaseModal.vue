<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="absolute inset-0 bg-black/30 backdrop-blur-sm"
          @click="$emit('close')"
        />

        <div
          class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
        >
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ isEdit ? 'Edit' : 'Add' }} {{ title }}
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                {{ isEdit ? `Update ${title.toLowerCase()} details.` : `Create a new ${title.toLowerCase()} record.` }}
              </p>
            </div>

            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <form @submit.prevent="handleSubmit" class="mt-6 space-y-4">
            <div v-for="field in fields" :key="field.key">
              <label :for="field.key" class="block text-sm font-medium text-gray-700">
                {{ field.label }}
              </label>
              <input
                :id="field.key"
                v-model="form[field.key]"
                :type="field.type || 'text'"
                :step="field.step"
                required
                class="mt-1 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
                :placeholder="field.placeholder"
              />
            </div>

            <div class="mt-6 flex justify-end gap-3">
              <button
                type="button"
                class="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="pending"
                class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
              >
                <div v-if="pending" class="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                {{ isEdit ? 'Update' : 'Create' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';

interface Field {
  key: string;
  label: string;
  type?: string;
  placeholder?: string;
  step?: string;
}

const props = defineProps<{
  open: boolean;
  title: string;
  fields: Field[];
  initialData: any | null;
  pending?: boolean;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', data: any): void;
}>();

const form = ref<any>({});

const isEdit = computed(() => !!props.initialData);

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    const data = props.initialData || {};
    const newForm: any = {};
    props.fields.forEach(field => {
      newForm[field.key] = data[field.key] || (field.type === 'number' ? 0 : '');
    });
    form.value = newForm;
  }
}, { immediate: true });

const handleSubmit = () => {
  emit('save', { ...form.value });
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

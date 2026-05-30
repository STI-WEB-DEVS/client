<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="$emit('close')" />

        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl max-h-[90vh] overflow-y-auto">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ isEdit ? 'Edit' : 'Create' }} {{ entityName }}
            </h2>
            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <!-- Form -->
          <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-4">

            <!-- Regular fields -->
            <div v-for="field in fields" :key="field.name" class="space-y-1">
              <label :for="'modal-' + field.name" class="text-sm font-medium text-gray-700">
                {{ field.label }}
              </label>
              <textarea
                v-if="field.type === 'textarea'"
                v-model="formData[field.name]"
                :id="'modal-' + field.name"
                :required="field.required"
                :placeholder="field.placeholder"
                rows="3"
                class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 resize-none"
              />
              <input
                v-else
                v-model="formData[field.name]"
                :id="'modal-' + field.name"
                :type="field.type || 'text'"
                :required="field.required"
                :min="field.type === 'number' ? 0 : undefined"
                :placeholder="field.placeholder"
                class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900"
                @input="field.lettersOnly ? enforceLettersOnly(field.name, $event) : null"
              />
              <p v-if="fieldErrors[field.name]" class="text-xs text-red-600">
                {{ fieldErrors[field.name] }}
              </p>
            </div>

            <!-- Add Stock section — only shown when editing -->
            <div v-if="isEdit" class="rounded-xl border border-indigo-100 bg-indigo-50 p-4 space-y-2">
              <p class="text-sm font-semibold text-indigo-800">Stock</p>
              <div class="flex items-center justify-between rounded-lg border border-indigo-200 bg-white px-4 py-2">
                <span class="text-xs text-indigo-600 font-medium">Current stock</span>
                <span class="text-sm font-bold text-indigo-900">{{ initialData?.stock_quantity ?? 0 }}</span>
              </div>
              <p class="text-xs text-indigo-600">Enter an amount to add to current stock on update.</p>
              <input
                v-model.number="stockToAdd"
                type="number"
                min="0"
                placeholder="e.g. 10"
                class="block w-full rounded-lg border border-indigo-200 px-4 py-2 text-sm shadow-sm transition focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
              />
              <p v-if="stockToAdd > 0" class="text-xs text-indigo-700">
                New total after update: <span class="font-bold">{{ (initialData?.stock_quantity ?? 0) + stockToAdd }}</span>
              </p>
            </div>

            <!-- Footer -->
            <div class="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="loading"
                class="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
              >
                <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                <span>{{ isEdit ? 'Update' : 'Create' }} {{ entityName }}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  lettersOnly?: boolean;
}

const props = defineProps<{
  open: boolean;
  entityName: string;
  fields: Field[];
  service: any;
  initialData?: any;
  isEdit?: boolean;
  uuid?: string;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'success', message: string): void;
  (e: 'error', message: string): void;
}>();

const formData = ref<any>({});
const fieldErrors = ref<any>({});
const loading = ref(false);
const stockToAdd = ref<number>(0);

const initForm = () => {
  const data: any = {};
  fieldErrors.value = {};
  props.fields.forEach(field => {
    data[field.name] = props.initialData?.[field.name] ?? '';
  });
  formData.value = data;
  stockToAdd.value = 0;
};

watch(() => props.open, (val) => { if (val) initForm(); });
watch(() => props.initialData, () => { if (props.open) initForm(); }, { deep: true });

const enforceLettersOnly = (fieldName: string, event: Event) => {
  const input = event.target as HTMLInputElement;
  const cleaned = input.value.replace(/[^a-zA-Z\s]/g, '');
  formData.value[fieldName] = cleaned;
  input.value = cleaned;
  fieldErrors.value[fieldName] = cleaned !== input.value
    ? 'Only letters and spaces are allowed.'
    : '';
};

const handleSubmit = async () => {
  for (const field of props.fields) {
    if (field.lettersOnly && formData.value[field.name]) {
      if (/[^a-zA-Z\s]/.test(formData.value[field.name])) {
        fieldErrors.value[field.name] = 'Only letters and spaces are allowed.';
        return;
      }
    }
  }

  loading.value = true;
  try {
    if (props.isEdit && props.uuid) {
      const currentStock = props.initialData?.stock_quantity ?? 0;
      const payload = {
        ...formData.value,
        stock_quantity: currentStock + (stockToAdd.value > 0 ? stockToAdd.value : 0),
      };
      await props.service.update(props.uuid, payload);
      emit('success', `${props.entityName} updated successfully!`);
    } else {
      await props.service.create(formData.value);
      emit('success', `${props.entityName} created successfully!`);
    }
    emit('close');
  } catch (err: any) {
    emit('error', err.message || `Failed to save ${props.entityName}`);
  } finally {
    loading.value = false;
  }
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
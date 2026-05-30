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

        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white shadow-2xl">
          <!-- Header -->
          <div class="flex items-center justify-between border-b border-gray-200 px-6 py-4">
            <h2 class="text-lg font-semibold text-gray-900">
              {{ isEdit ? 'Edit' : 'Create' }} {{ entityName }}
            </h2>
            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >✕</button>
          </div>

          <!-- Form Body -->
          <form @submit.prevent="handleSubmit" class="px-6 py-5 space-y-4">
            <div v-for="field in fields" :key="field.name" class="space-y-1">
              <label :for="'modal-' + field.name" class="text-sm font-medium text-gray-700">
                {{ field.label }}
                <span v-if="field.required" class="text-red-500 ml-0.5">*</span>
              </label>

              <!-- Textarea -->
              <textarea
                v-if="field.type === 'textarea'"
                v-model="formData[field.name]"
                :id="'modal-' + field.name"
                :required="field.required"
                :placeholder="field.placeholder"
                rows="3"
                class="block w-full rounded-lg border px-4 py-2 text-sm shadow-sm transition focus:ring-1 resize-none"
                :class="fieldErrors[field.name]
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'"
                @input="clearError(field.name)"
              />

              <!-- Regular input -->
              <input
                v-else
                v-model="formData[field.name]"
                :id="'modal-' + field.name"
                :type="field.type || 'text'"
                :required="field.required"
                :placeholder="field.placeholder"
                class="block w-full rounded-lg border px-4 py-2 text-sm shadow-sm transition focus:ring-1"
                :class="fieldErrors[field.name]
                  ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                  : 'border-gray-300 focus:border-gray-900 focus:ring-gray-900'"
                @input="clearError(field.name)"
              />

              <!-- Field error -->
              <p v-if="fieldErrors[field.name]" class="text-xs text-red-600">
                {{ fieldErrors[field.name] }}
              </p>
            </div>

            <!-- General error -->
            <p v-if="generalError" class="rounded-lg bg-red-50 border border-red-100 px-4 py-2 text-sm text-red-600">
              {{ generalError }}
            </p>

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
const loading = ref(false);
const fieldErrors = ref<Record<string, string>>({});
const generalError = ref('');

const initForm = () => {
  const data: any = {};
  props.fields.forEach(field => {
    data[field.name] = props.initialData?.[field.name] ?? '';
  });
  formData.value = data;
  fieldErrors.value = {};
  generalError.value = '';
};

watch(() => props.open, (val) => { if (val) initForm(); });
watch(() => props.initialData, () => { if (props.open) initForm(); }, { deep: true });

const clearError = (fieldName: string) => {
  fieldErrors.value[fieldName] = '';
  generalError.value = '';
};

const handleSubmit = async () => {
  loading.value = true;
  fieldErrors.value = {};
  generalError.value = '';

  try {
    if (props.isEdit && props.uuid) {
      await props.service.update(props.uuid, formData.value);
      emit('success', `${props.entityName} updated successfully!`);
    } else {
      await props.service.create(formData.value);
      emit('success', `${props.entityName} created successfully!`);
    }
    emit('close');
  } catch (err: any) {
    // Laravel 422 validation errors
    const errors = err?.response?.data?.errors || err?.data?.errors;
    if (errors) {
      const mapped: Record<string, string> = {};
      Object.keys(errors).forEach(key => {
        mapped[key] = Array.isArray(errors[key]) ? errors[key][0] : errors[key];
      });
      fieldErrors.value = mapped;
    } else {
      generalError.value =
        err?.response?.data?.message ||
        err?.data?.message ||
        err?.message ||
        `Failed to save ${props.entityName}`;
      emit('error', generalError.value);
    }
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
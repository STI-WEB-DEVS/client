<template>
  <div class="space-y-6">
    <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div v-for="field in fields" :key="field.name" class="space-y-1">
          <label :for="field.name" class="text-sm font-medium text-gray-700">
            {{ field.label }}
          </label>
          <input
            v-model="formData[field.name]"
            :id="field.name"
            :type="field.type || 'text'"
            :required="field.required"
            class="block w-full rounded-lg border border-gray-300 px-4 py-2 text-sm shadow-sm transition focus:border-gray-900 focus:ring-1 focus:ring-gray-900 disabled:bg-gray-50 disabled:text-gray-500"
            :placeholder="field.placeholder"
          />
        </div>

        <div class="pt-4">
          <button
            type="submit"
            :disabled="loading"
            class="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
          >
            <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
            <span>{{ isEdit ? 'Update' : 'Create' }} {{ entityName }}</span>
          </button>
        </div>
      </form>
    </div>

    <FeedbackModal
      :open="isFeedbackModalOpen"
      :message="feedbackMessage"
      :type="feedbackType"
      @close="closeFeedbackModal"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import FeedbackModal from '~/components/FeedbackModal.vue';

interface Field {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}

const props = defineProps<{
  entityName: string;
  fields: Field[];
  service: any;
  initialData?: any;
  isEdit?: boolean;
  uuid?: string;
}>();

const emit = defineEmits(['success', 'error']);

const formData = ref<any>({});
const loading = ref(false);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');
const feedbackType = ref<'success' | 'error' | 'info'>('info');

// Initialize form data
const initForm = () => {
  props.fields.forEach(field => {
    formData.value[field.name] = props.initialData?.[field.name] || '';
  });
};

onMounted(initForm);
watch(() => props.initialData, initForm, { deep: true });

const openFeedbackModal = (message: string, type: 'success' | 'error' | 'info' = 'info') => {
  feedbackMessage.value = message;
  feedbackType.value = type;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
};

const handleSubmit = async () => {
  loading.value = true;
  try {
    let response;
    if (props.isEdit && props.uuid) {
      response = await props.service.update(props.uuid, formData.value);
      openFeedbackModal(`${props.entityName} updated successfully!`, 'success');
    } else {
      response = await props.service.create(formData.value);
      openFeedbackModal(`${props.entityName} created successfully!`, 'success');
      if (!props.isEdit) {
        // Clear form on success for new records
        initForm();
      }
    }
    emit('success', response);
  } catch (err: any) {
    console.error(err);
    openFeedbackModal(err.message || `Failed to save ${props.entityName}`, 'error');
    emit('error', err);
  } finally {
    loading.value = false;
  }
};
</script>

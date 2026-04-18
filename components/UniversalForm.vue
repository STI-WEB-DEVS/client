<script setup>
import { ref } from 'vue';

const props = defineProps({
  mode: { type: String, required: true }, // 'create' or 'update'
  entityId: { type: String, default: null }, // The UUID if updating
  service: { type: Object, required: true }, // CustomerService or ProductService
  initialData: { type: Object, default: () => ({}) }
});

const emit = defineEmits(['success', 'error']);
const formData = ref({ ...props.initialData });
const isSubmitting = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;
  try {
    let response;
    if (props.mode === 'create') {
      response = await props.service.create(formData.value);
    } else {
      response = await props.service.update(props.entityId, formData.value);
    }
    emit('success', response);
  } catch (error) {
    emit('error', error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <form @submit.prevent="submitForm" class="space-y-4">
    <slot :formData="formData"></slot> 
    
    <button 
      type="submit" 
      :disabled="isSubmitting"
      class="rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 disabled:opacity-50"
    >
      {{ mode === 'create' ? 'Create' : 'Update' }}
    </button>
  </form>
</template>
<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div v-for="field in fields" :key="field.name">
      <label :for="field.name" class="block text-sm font-medium text-gray-900">
        {{ field.label }}
      </label>
      <div class="mt-2">
        <input
          v-if="field.type !== 'textarea'"
          v-model="form[field.name]"
          :type="field.type"
          :id="field.name"
          :name="field.name"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        />
        <textarea
          v-else
          v-model="form[field.name]"
          :id="field.name"
          :name="field.name"
          required
          class="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
        ></textarea>
      </div>
    </div>

    <Feedback v-if="feedbackMessage" :message="feedbackMessage" />

    <div>
      <button
        type="submit"
        :disabled="isLoading"
        class="w-full rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 disabled:opacity-50"
      >
        {{ isLoading ? 'Saving...' : submitLabel }}
      </button>
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Feedback from '~/components/Feedback.vue'

const props = defineProps<{
  fields: { name: string; type: string; label: string }[]
  service: any
  entityName: string
  uuid?: string
}>()

const emit = defineEmits(['success', 'error'])

const form = ref<Record<string, any>>({})
const feedbackMessage = ref('')
const isLoading = ref(false)

const submitLabel = props.uuid ? `Update ${props.entityName}` : `Create ${props.entityName}`

onMounted(async () => {
  if (props.uuid) {
    try {
      const data = await props.service.show(props.uuid)
      form.value = { ...data }
    } catch (err: any) {
      feedbackMessage.value = `Error loading ${props.entityName}.`
    }
  }
})

const handleSubmit = async () => {
  feedbackMessage.value = ''
  isLoading.value = true
  try {
    if (props.uuid) {
      await props.service.update(props.uuid, form.value)
      feedbackMessage.value = `${props.entityName} updated successfully!`
      emit('success')
    } else {
      await props.service.create(form.value)
      feedbackMessage.value = `${props.entityName} created successfully!`
      emit('success')
    }
  } catch (err: any) {
    feedbackMessage.value = `Error saving ${props.entityName}.`
    emit('error')
  } finally {
    isLoading.value = false
  }
}
</script>

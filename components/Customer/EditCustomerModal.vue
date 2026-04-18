<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/30 backdrop-blur-sm" @click="emit('close')" />

        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
          <h2 class="text-lg font-semibold text-gray-900">Edit Customer</h2>

          <form @submit.prevent="handleSubmit" class="mt-6 space-y-5">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
              <input v-model="form.name" type="text" required
                class="w-full rounded-lg border border-gray-300 px-4 py-3" />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Email *</label>
              <input v-model="form.email" type="email" required
                class="w-full rounded-lg border border-gray-300 px-4 py-3" />
            </div>

            <div class="flex justify-end gap-3 mt-8">
              <button type="button" @click="emit('close')"
                class="px-5 py-2.5 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                Cancel
              </button>
              <button type="submit" :disabled="loading"
                class="px-6 py-2.5 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 disabled:opacity-50">
                {{ loading ? 'Saving...' : 'Save Changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { customerService } from '~/api/customer/CustomerService'

const props = defineProps<{ open: boolean; uuid: string }>()
const emit = defineEmits<{ (e: 'close'): void; (e: 'updated'): void }>()

const form = ref({ name: '', email: '' })
const loading = ref(false)

watch(() => props.open, async (val) => {
  if (!val || !props.uuid) return

  const res = await customerService.show(props.uuid)
  const data = res.data ?? res

  form.value = {
    name: data.name || '',
    email: data.email || '',
  }
})

const handleSubmit = async () => {
  loading.value = true
  try {
    await customerService.update(props.uuid, form.value)
    emit('updated')
    emit('close')
  } finally {
    loading.value = false
  }
}
</script>
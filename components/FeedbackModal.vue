<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <!-- overlay -->
        <div
          class="absolute inset-0 bg-black/30 backdrop-blur-sm"
          @click="$emit('close')"
        />

        <!-- modal -->
        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

          <!-- header -->
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ mode === 'edit' ? 'Edit Customer' : 'Create Customer' }}
              </h2>
              <p class="mt-1 text-sm text-gray-600">
                Enter customer details
              </p>
            </div>

            <button
              class="p-2 text-gray-400 hover:bg-gray-100 rounded-md"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <!-- form -->
          <div class="mt-4 space-y-4">
            <div>
              <label class="text-sm text-gray-700">Name</label>
              <input
                v-model="name"
                class="mt-1 w-full rounded-lg border px-3 py-2"
                type="text"
                placeholder="Name"
              />
            </div>

            <div>
              <label class="text-sm text-gray-700">Email</label>
              <input
                v-model="email"
                class="mt-1 w-full rounded-lg border px-3 py-2"
                type="email"
                placeholder="name@example.com"
              />
            </div>
          </div>

          <!-- actions -->
          <div class="mt-6 flex justify-end gap-2">
            <button
              class="border px-4 py-2 rounded-lg"
              @click="$emit('close')"
            >
              Cancel
            </button>

            <button
              class="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800"
              @click="submit"
            >
              {{ mode === 'edit' ? 'Update' : 'Create' }}
            </button>
          </div>

        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  open: boolean
  mode: 'create' | 'edit'
  customer?: any
}>()

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'create', payload: { name: string; email: string }): void
  (e: 'update', payload: { name: string; email: string }): void
}>()

const name = ref('')
const email = ref('')

watch(() => props.customer, (val) => {
  if (val) {
    name.value = val.name
    email.value = val.email
  } else {
    name.value = ''
    email.value = ''
  }
})

const submit = () => {
  const payload = {
    name: name.value,
    email: email.value
  }

  if (props.mode === 'edit') {
    emit('update', payload)
  } else {
    emit('create', payload)
  }

  name.value = ''
  email.value = ''
}
</script>
<template>
  <teleport to="body">
    <transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <!-- overlay -->
        <div class="absolute inset-0 bg-black/30" @click="$emit('close')" />

        <!-- modal -->
        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

          <!-- header -->
          <div class="flex items-start justify-between">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ mode === 'edit' ? 'Edit Customer' : 'Create Customer' }}
              </h2>
              <p class="text-sm text-gray-500">
                Enter customer details
              </p>
            </div>

            <button
              class="text-gray-400 hover:text-gray-600"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <!-- form -->
          <div class="mt-5 space-y-3">
            <input
              v-model="name"
              class="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Name"
            />

            <input
              v-model="email"
              class="w-full rounded-lg border px-3 py-2 text-sm"
              placeholder="Email"
            />
          </div>

          <!-- actions -->
          <div class="mt-6 flex justify-end gap-2">
            <button
              class="rounded-lg border px-4 py-2 text-sm"
              @click="$emit('close')"
            >
              Cancel
            </button>

            <button
              class="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
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

const emit = defineEmits(['close', 'create', 'update'])

const name = ref('')
const email = ref('')

watch(
  () => props.customer,
  (val) => {
    name.value = val?.name ?? ''
    email.value = val?.email ?? ''
  },
  { immediate: true }
)

const submit = () => {
  const payload = { name: name.value, email: email.value }

  if (props.mode === 'edit') emit('update', payload)
  else emit('create', payload)
}
</script>
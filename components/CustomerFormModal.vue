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

        <div class="relative z-10 w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-semibold text-gray-900">
                {{ mode === 'create' ? 'Create customer' : 'Edit customer' }}
              </h2>
              <p class="mt-1 text-sm text-gray-500">
                {{ mode === 'create'
                  ? 'Add a new customer to the database.'
                  : 'Update the selected customer record in the database.' }}
              </p>
            </div>

            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >
              x
            </button>
          </div>

          <form class="mt-6 space-y-4" @submit.prevent="$emit('submit')">
            <div>
              <label for="customer-name" class="block text-sm font-medium text-gray-900">Name</label>
              <input
                id="customer-name"
                :value="name"
                type="text"
                required
                class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
                @input="$emit('update:name', ($event.target as HTMLInputElement).value)"
              />
            </div>

            <div>
              <label for="customer-email" class="block text-sm font-medium text-gray-900">Email</label>
              <input
                id="customer-email"
                :value="email"
                type="email"
                required
                class="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 text-sm text-gray-900 outline-none transition focus:border-gray-900"
                @input="$emit('update:email', ($event.target as HTMLInputElement).value)"
              />
            </div>

            <p v-if="error" class="text-sm text-red-600">{{ error }}</p>

            <div class="flex justify-end gap-3">
              <button
                type="button"
                class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                @click="$emit('close')"
              >
                Cancel
              </button>
              <button
                type="submit"
                :disabled="isSubmitting"
                class="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {{ isSubmitting ? 'Saving...' : mode === 'create' ? 'Create customer' : 'Save changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{
  open: boolean
  mode: 'create' | 'edit'
  name: string
  email: string
  error?: string
  isSubmitting?: boolean
}>()

defineEmits<{
  (e: 'close'): void
  (e: 'submit'): void
  (e: 'update:name', value: string): void
  (e: 'update:email', value: string): void
}>()
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

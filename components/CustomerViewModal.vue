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

        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <h2 class="text-lg font-semibold text-gray-900">View Customer</h2>
            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="$emit('close')"
            >
              ✕
            </button>
          </div>

          <div class="mt-6 space-y-4">
            <div>
              <p class="text-sm text-gray-500">UUID</p>
              <p class="mt-2 break-all text-base font-medium text-gray-900">{{ customer?.uuid }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Name</p>
              <p class="mt-2 text-base font-medium text-gray-900">{{ customer?.name }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Email</p>
              <p class="mt-2 text-base font-medium text-gray-900">{{ customer?.email }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Phone</p>
              <p class="mt-2 text-base font-medium text-gray-900">{{ customer?.phone || 'N/A' }}</p>
            </div>

            <div>
              <p class="text-sm text-gray-500">Address</p>
              <p class="mt-2 text-base font-medium text-gray-900">{{ customer?.address || 'N/A' }}</p>
            </div>
          </div>

          <div class="mt-6 flex justify-end">
            <button
              type="button"
              class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
              @click="$emit('edit')"
            >
              Edit Customer
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
const props = defineProps<{
  open: boolean;
  customer: any;
}>();

const emit = defineEmits<{
  close: [];
  edit: [];
}>();
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
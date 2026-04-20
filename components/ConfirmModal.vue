<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        
        <!-- Backdrop -->
        <div
          class="absolute inset-0 bg-black/40 backdrop-blur-sm"
          @click="$emit('close')"
        />

        <!-- Modal -->
        <div
          class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl"
          @click.stop
        >
          <!-- Title -->
          <h2 class="text-lg font-semibold" :class="variantClass">
            {{ title }}
          </h2>

          <!-- Message -->
          <p class="mt-3 text-sm text-gray-600">
            {{ message }}
          </p>

          <!-- Actions -->
          <div class="mt-6 flex justify-end gap-3">
            <button
              class="rounded-lg px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100"
              @click="$emit('close')"
            >
              {{ cancelText }}
            </button>

            <button
              :disabled="loading"
              class="rounded-lg px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
              :class="buttonClass"
              @click="$emit('confirm')"
            >
              {{ loading ? loadingText : confirmText }}
            </button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { computed } from 'vue'

// const props = defineProps({
//   open: Boolean,
//   loading: Boolean,

//   title: String,
//   message: String,

//   confirmText: {
//     type: String,
//     default: 'Confirm',
//   },

//   cancelText: {
//     type: String,
//     default: 'Cancel',
//   },

//   loadingText: {
//     type: String,
//     default: 'Processing...',
//   },

//   variant: {
//     type: String,
//     default: 'danger', // danger | warning | info
//   },
// })

const props = defineProps({
  open: Boolean,
  loading: Boolean,
  title: String,
  message: String,

  confirmText: {
    type: String,
    default: 'Confirm',
  },

  cancelText: {
    type: String,
    default: 'Cancel',
  },

  loadingText: {
    type: String,
    default: 'Processing...',
  },

  variant: {
    type: String,
    default: 'danger',
  },
})

defineEmits(['close', 'confirm'])

const buttonClass = computed(() => {
  return {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-500 hover:bg-yellow-600',
    info: 'bg-indigo-600 hover:bg-indigo-700',
  }[props.variant]
})

const variantClass = computed(() => {
  return {
    danger: 'text-red-600',
    warning: 'text-yellow-600',
    info: 'text-indigo-600',
  }[props.variant]
})
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
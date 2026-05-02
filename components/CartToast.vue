<template>
  <teleport to="body">
    <transition name="toast-slide">
      <div
        v-if="visible"
        class="fixed bottom-6 right-6 z-50 flex max-w-sm items-center gap-4 rounded-2xl bg-gray-900 px-4 py-3.5 shadow-2xl"
      >
        <div class="flex items-center gap-3 flex-1 min-w-0">
          <div class="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-green-500">
            <svg class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div class="flex-1 min-w-0">
            <p class="text-sm font-semibold text-white">Added to cart!</p>
            <p class="truncate text-xs text-gray-400">Want to check cart?</p>
          </div>
        </div>
        
        <NuxtLink
          to="/customer/cart"
          class="flex-shrink-0 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition hover:bg-indigo-500"
          @click="visible = false"
        >
          View Cart
        </NuxtLink>

        <button
          @click="visible = false"
          class="ml-1 flex-shrink-0 rounded-lg p-1 text-gray-500 transition hover:text-gray-300"
        >
          <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{
  productName: string
  trigger: number // increment this to trigger a new toast
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

watch(() => props.trigger, (val) => {
  if (val > 0) {
    visible.value = true
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      visible.value = false
    }, 2500)
  }
})
</script>

<style scoped>
.toast-slide-enter-active,
.toast-slide-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.toast-slide-enter-from,
.toast-slide-leave-to {
  transform: translateY(12px) translateX(8px);
  opacity: 0;
}
</style>

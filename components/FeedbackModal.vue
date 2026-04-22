<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="translate-y-4 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-4 opacity-0"
    >
      <div
        v-if="visible"
        class="fixed bottom-6 right-6 z-[100] flex items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg w-full max-w-sm"
        :class="styles.container"
      >
        <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full" :class="styles.iconBg">
          <component :is="icon" class="h-4 w-4" :class="styles.iconColor" />
        </div>
        <div class="flex-1 pt-0.5">
          <p class="text-sm font-semibold" :class="styles.title">{{ title }}</p>
          <p class="mt-0.5 text-sm" :class="styles.message">{{ message }}</p>
        </div>
        <button
          type="button"
          @click="dismiss"
          class="shrink-0 rounded-md p-1 transition hover:opacity-70"
          :class="styles.closeBtn"
        >
          <XMarkIcon class="h-4 w-4" />
        </button>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { CheckCircleIcon, TrashIcon, PencilSquareIcon, XMarkIcon, ExclamationCircleIcon } from '@heroicons/vue/24/outline'

type FeedbackType = 'created' | 'updated' | 'deleted' | 'error' | null

const props = defineProps<{
  type: FeedbackType
}>()

const emit = defineEmits<{
  dismissed: []
}>()

const visible = ref(false)
let timer: ReturnType<typeof setTimeout> | null = null

const config: Record<NonNullable<FeedbackType>, {
  title: string
  message: string
  icon: any
  container: string
  iconBg: string
  iconColor: string
  title_class: string
  message_class: string
  closeBtn: string
}> = {
  created: {
    title: 'Customer Created',
    message: 'The new customer was added successfully.',
    icon: CheckCircleIcon,
    container: 'bg-green-50 border-green-200',
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    title_class: 'text-green-900',
    message_class: 'text-green-700',
    closeBtn: 'text-green-500',
  },
  updated: {
    title: 'Customer Updated',
    message: 'The customer details were saved successfully.',
    icon: PencilSquareIcon,
    container: 'bg-blue-50 border-blue-200',
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    title_class: 'text-blue-900',
    message_class: 'text-blue-700',
    closeBtn: 'text-blue-500',
  },
  deleted: {
    title: 'Customer Deleted',
    message: 'The customer was permanently removed.',
    icon: TrashIcon,
    container: 'bg-red-50 border-red-200',
    iconBg: 'bg-red-100',
    iconColor: 'text-red-600',
    title_class: 'text-red-900',
    message_class: 'text-red-700',
    closeBtn: 'text-red-500',
  },
  error: {
    title: 'Something went wrong',
    message: 'An unexpected error occurred. Please try again.',
    icon: ExclamationCircleIcon,
    container: 'bg-yellow-50 border-yellow-200',
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    title_class: 'text-yellow-900',
    message_class: 'text-yellow-700',
    closeBtn: 'text-yellow-500',
  },
}

const current = computed(() => props.type ? config[props.type] : null)
const icon = computed(() => current.value?.icon)
const title = computed(() => current.value?.title ?? '')
const message = computed(() => current.value?.message ?? '')
const styles = computed(() => ({
  container: current.value?.container ?? '',
  iconBg: current.value?.iconBg ?? '',
  iconColor: current.value?.iconColor ?? '',
  title: current.value?.title_class ?? '',
  message: current.value?.message_class ?? '',
  closeBtn: current.value?.closeBtn ?? '',
}))

watch(() => props.type, (val) => {
  if (!val) return
  visible.value = true
  if (timer) clearTimeout(timer)
  timer = setTimeout(() => dismiss(), 4000)
})

const dismiss = () => {
  visible.value = false
  if (timer) clearTimeout(timer)
  emit('dismissed')
}
</script>
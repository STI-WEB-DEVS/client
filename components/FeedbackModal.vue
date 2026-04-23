<template>
  <Teleport to="body">
    <Transition name="fade">
      <div
        v-if="open"
        class="fixed inset-0 z-50 flex items-center justify-center p-4"
        role="dialog"
        aria-modal="true"
      >
        <div
          class="absolute inset-0 bg-black/30 backdrop-blur-sm"
          @click="handleClose"
        />
        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
          <div class="flex items-start justify-between gap-4">
            <div class="flex items-center gap-3">
              <div
                class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                :class="current?.iconBg"
              >
                <component :is="current?.icon" class="h-5 w-5" :class="current?.iconColor" />
              </div>
              <div>
                <h2 class="text-lg font-semibold text-gray-900">{{ current?.title }}</h2>
                <p class="mt-1 text-sm text-gray-600">{{ current?.message }}</p>
              </div>
            </div>
            <button
              type="button"
              class="rounded-md p-2 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="handleClose"
            >
              ✕
            </button>
          </div>

          <div v-if="error" class="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {{ error }}
          </div>

          <div class="mt-6 flex justify-end gap-2">
            <!-- Confirmation mode -->
            <template v-if="phase === 'confirm'">
              <button
                type="button"
                class="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                @click="handleClose"
              >
                Cancel
              </button>
              <button
                type="button"
                :disabled="loading"
                class="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-medium text-white transition disabled:opacity-50"
                :class="current?.confirmBtn"
                @click="handleConfirm"
              >
                <span v-if="loading" class="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                {{ loading ? 'Please wait...' : current?.confirmLabel }}
              </button>
            </template>

            <!-- Success mode -->
            <template v-else-if="phase === 'success'">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800"
                @click="handleClose"
              >
                Okay
              </button>
            </template>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
  import { ref, computed, watch } from 'vue'
  import { CheckCircleIcon, PencilSquareIcon, TrashIcon, PlusCircleIcon } from '@heroicons/vue/24/outline'

  type ActionType = 'create' | 'edit' | null

  const props = defineProps<{
    open: boolean
    action: ActionType
    itemName?: string
    onConfirm: () => Promise<void>
  }>()

  const emit = defineEmits<{
    close: []
    success: []
    confirm: []
  }>()

  const phase = ref<'confirm' | 'success'>('confirm')
  const loading = ref(false)
  const error = ref('')

  watch(() => props.open, (val) => {
    if (val) {
      phase.value = 'confirm'
      error.value = ''
    }
  })

  type ConfigEntry = {
    title: string
    message: string
    icon: any
    iconBg: string
    iconColor: string
    confirmLabel: string
    confirmBtn: string
    successTitle: string
    successMessage: string
    successIcon: any
    successIconBg: string
    successIconColor: string
  }

  const configs: Record<NonNullable<ActionType>, ConfigEntry> = {
    create: {
      title: 'Confirm Creation',
      message: 'Are you sure you want to create this new record?',
      icon: PlusCircleIcon,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      confirmLabel: 'Create',
      confirmBtn: 'bg-gray-900 hover:bg-gray-800',
      successTitle: 'Record Created',
      successMessage: 'The new record has been successfully added.',
      successIcon: CheckCircleIcon,
      successIconBg: 'bg-green-100',
      successIconColor: 'text-green-600',
    },
    edit: {
      title: 'Confirm Changes',
      message: `Are you sure you want to update the details for this record?`,
      icon: PencilSquareIcon,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      confirmLabel: 'Save Changes',
      confirmBtn: 'bg-gray-900 hover:bg-gray-800',
      successTitle: 'Record Updated',
      successMessage: 'The details have been saved successfully.',
      successIcon: PencilSquareIcon,
      successIconBg: 'bg-blue-100',
      successIconColor: 'text-blue-600',
    },
  }

  const current = computed(() => {
    if (!props.action) return null
    const config = configs[props.action]
    if (phase.value === 'success') {
      return {
        title: config.successTitle,
        message: config.successMessage,
        icon: config.successIcon,
        iconBg: config.successIconBg,
        iconColor: config.successIconColor,
        confirmLabel: config.confirmLabel,
        confirmBtn: config.confirmBtn,
      }
    }

    return {
      ...config,
      message: props.action === 'edit' && props.itemName
        ? `Are you sure you want to update the details for ${props.itemName}?`
        : config.message,
    }
  })

  const handleConfirm = async () => {
    loading.value = true
    error.value = ''
    try {
      await props.onConfirm()
      phase.value = 'success'
      emit('success')
    } catch (err: any) {
      error.value = err.message ?? 'Something went wrong. Please try again.'
    } finally {
      loading.value = false
    }
  }

  const handleClose = () => {
    emit('close')
  }
</script>

<style scoped>
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
    transform: scale(0.97);
  }
</style>
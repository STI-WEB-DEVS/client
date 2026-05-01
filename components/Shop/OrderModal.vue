<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'

interface Product {
  uuid: string
  name: string
  price: number
}

const props = defineProps<{
  product: Product | null
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
}>()

const router = useRouter()
const customerUuid = ref(process.client ? (localStorage.getItem('uuid') ?? '') : '')
const modalErrors = ref<{ customer_uuid?: string }>({})
const isProcessing = ref(false)
const quantity = ref(1)

function closeModal() {
  emit('update:modelValue', false)
  modalErrors.value = {}
  quantity.value = 1
}

function increaseQty() {
  quantity.value++
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}

const totalPrice = computed(() => {
  return props.product ? props.product.price * quantity.value : 0
})

function proceedToCheckout() {
  modalErrors.value = {}
  if (!customerUuid.value.trim()) {
    modalErrors.value.customer_uuid = 'Customer UUID is required.'
    return
  }
  if (!props.product) return

  isProcessing.value = true

  // Navigate to checkout with direct purchase details
  router.push({
    path: '/checkout',
    query: {
      direct_uuid: props.product.uuid,
      direct_name: props.product.name,
      direct_price: props.product.price.toString(),
      direct_qty: quantity.value.toString(),
      direct_customer_uuid: customerUuid.value.trim()
    }
  })

  // Close the modal after navigation
  closeModal()
  isProcessing.value = false
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(value)
}

watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      modalErrors.value = {}
      quantity.value = 1
    }
  }
)
</script>

<template>
  <Teleport to="body">
    <Transition name="fade">
      <div v-if="modelValue && product" class="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeModal" />
        <div class="relative z-10 w-full max-w-md rounded-2xl bg-white shadow-xl">
          <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h3 class="text-base font-bold text-gray-900">Buy Now</h3>
            <button class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600" @click="closeModal">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>
          <div class="space-y-5 p-6">
            <!-- Product summary -->
            <div class="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
              <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-base font-bold text-indigo-300">
                {{ product.name.charAt(0).toUpperCase() }}
              </div>
              <div class="min-w-0 flex-1">
                <p class="truncate text-sm font-semibold text-gray-800">{{ product.name }}</p>
                <p class="text-sm font-bold text-indigo-600">{{ formatPrice(product.price) }}</p>
              </div>
            </div>

            <!-- Quantity selector -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Quantity</label>
              <div class="mt-1.5 flex items-center gap-3">
                <button type="button" @click="decreaseQty" class="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40" :disabled="quantity <= 1">
                  <MinusIcon class="h-4 w-4" />
                </button>
                <span class="w-10 text-center text-base font-semibold text-gray-800">{{ quantity }}</span>
                <button type="button" @click="increaseQty" class="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50">
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>
            </div>

            <!-- Total price -->
            <div class="rounded-lg bg-indigo-50 p-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-indigo-700">Total:</span>
                <span class="text-lg font-bold text-indigo-700">{{ formatPrice(totalPrice) }}</span>
              </div>
            </div>

            <!-- Customer UUID (optional – can be hidden if we already pass it) -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Customer UUID</label>
              <input
                v-model="customerUuid"
                type="text"
                placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                class="mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': modalErrors.customer_uuid }"
              />
              <p v-if="modalErrors.customer_uuid" class="mt-1 text-xs text-red-500">{{ modalErrors.customer_uuid }}</p>
              <p class="mt-1 text-xs text-gray-400">Auto-filled from your session.</p>
            </div>

            <!-- Actions -->
            <div class="flex gap-3 pt-1">
              <button class="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50" @click="closeModal" :disabled="isProcessing">
                Cancel
              </button>
              <button class="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50" @click="proceedToCheckout" :disabled="isProcessing">
                {{ isProcessing ? 'Processing...' : 'Proceed to Checkout' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
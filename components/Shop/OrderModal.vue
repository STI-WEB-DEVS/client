<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { XMarkIcon, CheckCircleIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { useOrdersStore } from '~/stores/order'

interface Product {
  uuid: string
  name: string
  price: number
}

const props = defineProps<{
  product: Product | null
  modelValue: boolean
}>()

// ✅ FIX: Added 'orderPlaced' to emits – this stops the warning
const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'orderPlaced', payload: object): void   // <-- add this
}>()

const router = useRouter()
const ordersStore = useOrdersStore()

const customerUuid = ref(process.client ? (localStorage.getItem('uuid') ?? '') : '')
const modalErrors = ref<{ customer_uuid?: string }>({})
const isPlacing = ref(false)
const orderPlaced = ref(false)
const quantity = ref(1)

function closeModal() {
  emit('update:modelValue', false)
  orderPlaced.value = false
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

async function placeOrder() {
  modalErrors.value = {}
  if (!customerUuid.value.trim()) {
    modalErrors.value.customer_uuid = 'Customer UUID is required.'
    return
  }
  if (!props.product) return

  isPlacing.value = true

  const orderItems = [{
    product_uuid: props.product.uuid,
    name: props.product.name,
    price: props.product.price,
    quantity: quantity.value,
  }]

  const total = totalPrice.value

  // Build the order object for logging
  const newOrder = {
    order_uuid: crypto.randomUUID ? crypto.randomUUID() : Date.now().toString(),
    customer_uuid: customerUuid.value.trim(),
    date: new Date().toISOString(),
    total,
    items: orderItems,
  }

  // Log payload to console
  console.log('Order Payload:', JSON.stringify(newOrder, null, 2))

  // Emit the payload (optional – but now declared)
  emit('orderPlaced', newOrder)

  // Save to store
  ordersStore.addOrder(customerUuid.value.trim(), orderItems, total)

  isPlacing.value = false
  orderPlaced.value = true

  // Redirect to orders page after brief success message
  setTimeout(() => {
    closeModal()
    router.push('/customer/orders')
  }, 1500)
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
    minimumFractionDigits: 2,
  }).format(value)
}

// Reset modal state when it opens again
watch(
  () => props.modelValue,
  (visible) => {
    if (visible) {
      orderPlaced.value = false
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
          <!-- Success screen -->
          <div v-if="orderPlaced" class="flex flex-col items-center gap-4 p-8 text-center">
            <CheckCircleIcon class="h-14 w-14 text-green-500" />
            <div>
              <h3 class="text-lg font-bold text-gray-900">Order Placed!</h3>
              <p class="mt-1 text-sm text-gray-400">Redirecting to your orders...</p>
            </div>
          </div>

          <!-- Order form -->
          <template v-else>
            <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
              <h3 class="text-base font-bold text-gray-900">Buy Now</h3>
              <button
                class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
                @click="closeModal"
              >
                <XMarkIcon class="h-5 w-5" />
              </button>
            </div>
            <div class="space-y-5 p-6">
              <!-- Product summary -->
              <div class="flex items-center gap-3 rounded-xl bg-gray-50 p-3">
                <div
                  class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-base font-bold text-indigo-300"
                >
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
                  <button
                    type="button"
                    @click="decreaseQty"
                    class="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
                    :disabled="quantity <= 1"
                  >
                    <MinusIcon class="h-4 w-4" />
                  </button>
                  <span class="w-10 text-center text-base font-semibold text-gray-800">{{ quantity }}</span>
                  <button
                    type="button"
                    @click="increaseQty"
                    class="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50"
                  >
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

              <!-- Customer UUID -->
              <div>
                <label class="block text-sm font-medium text-gray-700">Customer UUID</label>
                <input
                  v-model="customerUuid"
                  type="text"
                  placeholder="e.g. 550e8400-e29b-41d4-a716-446655440000"
                  class="mt-1.5 w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-800 outline-none transition focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100"
                  :class="{ 'border-red-300 focus:border-red-400 focus:ring-red-100': modalErrors.customer_uuid }"
                />
                <p v-if="modalErrors.customer_uuid" class="mt-1 text-xs text-red-500">
                  {{ modalErrors.customer_uuid }}
                </p>
                <p class="mt-1 text-xs text-gray-400">Auto-filled from your session.</p>
              </div>

              <!-- Actions -->
              <div class="flex gap-3 pt-1">
                <button
                  class="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                  @click="closeModal"
                  :disabled="isPlacing"
                >
                  Cancel
                </button>
                <button
                  class="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
                  @click="placeOrder"
                  :disabled="isPlacing"
                >
                  {{ isPlacing ? 'Placing...' : 'Place Order' }}
                </button>
              </div>
            </div>
          </template>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

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
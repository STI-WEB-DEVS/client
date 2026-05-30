<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { XMarkIcon, MinusIcon, PlusIcon } from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'

interface Product {
  uuid: string
  name: string
  price: number
  stocks: number
  description: string  // ✅ add this
}
const props = defineProps<{
  product: Product | null
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'orderPlaced', payload: object): void
  (e: 'order-success', uuid: string, quantity: number): void
}>()

const router = useRouter()

const customerUuid = ref(process.client ? (localStorage.getItem('uuid') ?? '') : '')
const isProcessing = ref(false)
const stockError = ref('')
const quantity = ref(1)

function closeModal() {
  emit('update:modelValue', false)
  quantity.value = 1
  stockError.value = ''
}

function increaseQty() {
  if (!props.product) return
  if (quantity.value < props.product.stocks) quantity.value++
}

function decreaseQty() {
  if (quantity.value > 1) quantity.value--
}

const totalPrice = computed(() => {
  return props.product ? props.product.price * quantity.value : 0
})

async function proceedToCheckout() {
  if (!customerUuid.value.trim()) {
    alert('Customer UUID is missing. Please log in again.')
    return
  }
  if (!props.product) return

  isProcessing.value = true
  stockError.value = ''

  try {
    // ✅ Call backend to reduce stock in the database
    await productService.reduceStock(props.product.uuid, quantity.value)

    // ✅ Emit to parent to update local UI stock count
    emit('order-success', props.product.uuid, quantity.value)

    // ✅ Navigate to checkout
    router.push({
      path: '/customer/checkout',
      query: {
        direct_uuid: props.product.uuid,
        direct_name: props.product.name,
        direct_price: props.product.price.toString(),
        direct_qty: quantity.value.toString(),
        direct_customer_uuid: customerUuid.value.trim()
      }
    })

    closeModal()
  } catch (err: any) {
    // Show error if insufficient stock or API failure
    stockError.value = err?.data?.errors?.stocks
      ?? err?.message
      ?? 'Failed to process order. Please try again.'
  } finally {
    isProcessing.value = false
  }
}

function formatPrice(value: number) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency', currency: 'PHP', minimumFractionDigits: 2,
  }).format(value)
}

watch(
  () => props.modelValue,
  (visible) => {
    if (visible && process.client) {
      customerUuid.value = localStorage.getItem('uuid') || ''
      quantity.value = 1
      stockError.value = ''
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

          <!-- Header -->
          <div class="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <h3 class="text-base font-bold text-gray-900">Buy Now</h3>
            <button class="rounded-lg p-1.5 text-gray-400 transition hover:bg-gray-100 hover:text-gray-600"
              @click="closeModal">
              <XMarkIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="space-y-5 p-6">
            <!-- Product summary -->

        <div class="flex items-start gap-3 rounded-xl bg-gray-50 p-3">
          <div class="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-base font-bold text-indigo-300">
            {{ product.name.charAt(0).toUpperCase() }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="truncate text-sm font-semibold text-gray-800">{{ product.name }}</p>
            <p class="text-sm font-bold text-indigo-600">{{ formatPrice(product.price) }}</p>
            <p v-if="product.description" class="mt-1 text-xs text-gray-500 line-clamp-2">
              {{ product.description }}
            </p>
          </div>
        </div>

            <!-- Stocks info -->
            <div class="flex items-center gap-2">
              <span class="text-xs font-medium text-gray-500">Available stocks:</span>
              <span class="rounded-full px-2 py-0.5 text-xs font-semibold"
                :class="product.stocks <= 5 ? 'bg-amber-100 text-amber-600' : 'bg-green-100 text-green-600'">
                {{ product.stocks }} in stock
              </span>
            </div>

            <!-- Quantity selector -->
            <div>
              <label class="block text-sm font-medium text-gray-700">Quantity</label>
              <div class="mt-1.5 flex items-center gap-3">
                <button type="button" @click="decreaseQty"
                  class="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
                  :disabled="quantity <= 1">
                  <MinusIcon class="h-4 w-4" />
                </button>
                <span class="w-10 text-center text-base font-semibold text-gray-800">{{ quantity }}</span>
                <button type="button" @click="increaseQty"
                  class="rounded-lg border border-gray-200 bg-white p-2 text-gray-600 transition hover:bg-gray-50 disabled:opacity-40"
                  :disabled="quantity >= product.stocks">
                  <PlusIcon class="h-4 w-4" />
                </button>
              </div>
              <p class="mt-1 text-xs text-gray-400">Max {{ product.stocks }} units</p>
            </div>

            <!-- Total price -->
            <div class="rounded-lg bg-indigo-50 p-3">
              <div class="flex items-center justify-between">
                <span class="text-sm font-medium text-indigo-700">Total:</span>
                <span class="text-lg font-bold text-indigo-700">{{ formatPrice(totalPrice) }}</span>
              </div>
            </div>

            <!-- Stock error message -->
            <p v-if="stockError" class="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
              {{ stockError }}
            </p>

            <!-- Actions -->
            <div class="flex gap-3 pt-1">
              <button
                class="flex-1 rounded-lg border border-gray-200 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-50"
                @click="closeModal"
                :disabled="isProcessing">
                Cancel
              </button>
              <button
                class="flex-1 rounded-lg bg-indigo-600 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 active:scale-95 disabled:opacity-50"
                @click="proceedToCheckout"
                :disabled="isProcessing || product.stocks === 0">
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
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
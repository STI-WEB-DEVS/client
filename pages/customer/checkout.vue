<template>
  <div class="max-w-4xl mx-auto px-4 py-10">

    <!-- Header -->
    <h1 class="text-2xl font-bold text-gray-900 mb-6">
      Checkout
    </h1>

    <!-- User Info -->
    <div class="bg-white border rounded-xl p-4 mb-6">
      <p class="text-sm text-gray-500">Customer</p>
      <p class="font-semibold text-gray-900">{{ customer.name }}</p>
      <p class="text-sm text-gray-600">{{ customer.email }}</p>
    </div>

    <!-- Cart Items -->
    <div v-if="cart.length === 0" class="text-center text-gray-500 py-10">
      Your cart is empty
    </div>

    <div v-else class="space-y-4">

      <div
        v-for="item in cart"
        :key="item.id"
        class="flex items-center justify-between bg-white border rounded-xl p-4"
      >

        <!-- Product -->
        <div>
          <p class="font-semibold text-gray-900">{{ item.name }}</p>
          <p class="text-sm text-gray-500">
            ₱{{ formatPrice(item.price) }}
          </p>
        </div>

        <!-- Qty -->
        <div class="text-sm text-gray-700">
          x {{ item.qty }}
        </div>

        <!-- Subtotal -->
        <div class="font-semibold text-indigo-600">
          ₱{{ formatPrice(item.price * item.qty) }}
        </div>

      </div>

      <!-- Total -->
      <div class="bg-gray-50 border rounded-xl p-4 flex justify-between">
        <span class="font-semibold">Total</span>
        <span class="font-bold text-indigo-600">
          ₱{{ formatPrice(totalPrice) }}
        </span>
      </div>

      <!-- Place Order -->
      <button
        @click="placeOrder"
        :disabled="loading || cart.length === 0"
        class="w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700 transition disabled:opacity-50"
      >
        {{ loading ? 'Placing Order...' : 'Place Order' }}
      </button>

    </div>

  </div>
  <FeedbackModal
  :open="isFeedbackModalOpen"
  :message="feedbackMessage"
  @close="closeFeedbackModal"
  ></FeedbackModal>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
// import OrderService from '~/api/order/OrderService'
import { orderService } from '~/api/order/OrderService'
import FeedbackModal from '~/components/FeedbackModal.vue'


definePageMeta({
  layout: 'customer'
})

const CART_KEY = 'cart'


/* Customer (replace with auth store later) */
const customer = ref({
  uuid: '',
  name: '',
  email: ''
})

const loadCustomer = () => {
  if (!process.client) return

  customer.value = {
    uuid: localStorage.getItem('uuid') || '',
    name: localStorage.getItem('name') || 'Guest',
    email: localStorage.getItem('email') || 'guest@example.com'
  }
}

/* Cart */
const cart = ref([])

/* Loading */
const loading = ref(false)

/* Load cart */
const loadCart = () => {
  if (process.client) {
    cart.value = JSON.parse(localStorage.getItem(CART_KEY)) || []
  }
}

/* Format price */
const formatPrice = (price) => Number(price).toLocaleString()

/* Total */
const totalPrice = computed(() =>
  cart.value.reduce((sum, item) => sum + item.price * item.qty, 0)
)

/* Convert cart → API payload */
const buildPayload = () => {
  return {
    customer_uuid: customer.value.uuid,
    items: cart.value.map(item => ({
      product_uuid: item.id,
      quantity: item.qty
    }))
  }
}

/* Place order */
const placeOrder = async () => {
  loading.value = true

  try {
    const payload = buildPayload()

    console.log('PAYLOAD:', payload)

    await orderService.create(payload)

    // clear cart after success
    localStorage.removeItem(CART_KEY)
    cart.value = []

    alert('Order placed successfully!')
    showFeedback('Order placed successfully!')
  } catch (err) {
    console.error(err)
    showFeedback('Failed to place order')
  } finally {
    loading.value = false
  }
}

onMounted(loadCart)


// --- Feedback State ---
const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref('');

const showFeedback = (msg) => {
  feedbackMessage.value = msg
  isFeedbackModalOpen.value = true

  setTimeout(() => {
    isFeedbackModalOpen.value = false
  }, 2000)
}

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
};
</script>
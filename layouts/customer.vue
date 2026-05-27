<template>
<div class="min-h-screen bg-gray-50 flex flex-col relative">
    <!-- HEADER -->
    <header class="border-b border-green-800 bg-green-700 sticky top-0 z-40 shadow-sm">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">

        <!-- LOGO -->
        <NuxtLink
          to="/customer/shop"
          class="text-2xl font-black text-white hover:opacity-80 transition-opacity tracking-tight"
        >
          My Store
        </NuxtLink>
        
                <!-- NAVIGATION -->

        <!-- NAVIGATION -->
        <div class="hidden items-center gap-8 text-sm font-semibold md:flex">
          <NuxtLink
            v-for="item in navigation"
            :key="item.name"
            :to="item.href"
            :class="[
              isActive(item.href)
                ? 'text-white border-b-2 border-white pb-1'
                : 'text-green-100 hover:text-white',
              'transition-all duration-200'
            ]"
          >
            {{ item.name }}
          </NuxtLink>
        </div>

        <!-- RIGHT -->
        <div class="flex items-center gap-4">

          <!-- CART -->
          <button
            @click="isCartOpen = !isCartOpen"
            class="rounded-full border border-green-500 bg-white px-5 py-2.5 text-sm font-semibold text-[#2d4123] hover:bg-green-50 flex items-center gap-2 transition-all relative active:scale-95 shadow-sm"
          >
            <span>Cart</span>

            <span
              v-if="totalCartCount > 0"
              class="rounded-full bg-green-700 px-2 py-0.5 text-xs font-bold text-white transition-all"
            >
              {{ totalCartCount }}
            </span>
          </button>

          <!-- USER -->
          <div class="relative">
            <button
              @click="isDropdownOpen = !isDropdownOpen"
              class="flex rounded-full bg-white text-sm focus:outline-none shadow-sm"
            >
              <div class="h-10 w-10 rounded-full bg-green-700 flex items-center justify-center text-white font-bold text-sm border border-green-300">
                <span>U</span>
              </div>
            </button>

            <div
              v-if="isDropdownOpen"
              class="absolute right-0 mt-2 w-48 rounded-2xl bg-white py-2 shadow-xl ring-1 ring-black ring-opacity-5 z-50 overflow-hidden"
            >
              <NuxtLink
                to="/customer/account"
                class="block px-4 py-3 text-sm text-gray-700 hover:bg-gray-100"
              >
                Your Profile
              </NuxtLink>

              <hr class="border-gray-100 my-1" />

              <NuxtLink
                to="/"
                class="block px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-semibold"
              >
                Sign out
              </NuxtLink>
            </div>
          </div>

        </div>
      </div>
    </header>

    <!-- MAIN -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- FOOTER -->
    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 sm:px-6 lg:px-8 text-sm text-gray-500">
        <p>© 2026 My Store. All rights reserved.</p>
      </div>
    </footer>

    <!-- SUCCESS MODAL -->
    <div
      v-if="showNotification"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div class="w-[90%] max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-200 text-center animate-popup">

        <div class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <span class="text-3xl">✓</span>
        </div>

        <h2 class="text-2xl font-black text-[#2d4123] mb-2">
          Ordered Successfully
        </h2>

        <p class="text-gray-600 text-sm leading-relaxed mb-6">
          {{ notificationText }}
        </p>

        <button
          @click="showNotification = false"
          class="w-full rounded-2xl bg-green-700 py-3 text-sm font-bold text-white hover:bg-green-800 transition-all"
        >
          OK
        </button>

      </div>
    </div>

    <!-- ADD TO CART MODAL -->
    <div
      v-if="showAddToCartModal"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div
        class="w-[90%] max-w-md rounded-3xl bg-white p-8 shadow-2xl border border-gray-200 animate-popup"
      >

        <h2 class="text-2xl font-black text-[#2d4123] mb-2">
          Add to Cart
        </h2>

        <p class="text-sm text-gray-500 mb-6">
          Select quantity for
          <span class="font-bold">
            {{ selectedProduct?.name }}
          </span>
        </p>

        <div class="flex items-center justify-center gap-4 mb-8">

          <button
            @click="selectedQuantity > 1 ? selectedQuantity-- : 1"
            class="w-12 h-12 rounded-2xl border border-gray-300 text-xl font-black hover:bg-gray-100 transition-all"
          >
            −
          </button>

          <input
            v-model.number="selectedQuantity"
            type="number"
            min="1"
            class="w-24 rounded-2xl border border-gray-300 text-center text-xl font-bold py-3 outline-none focus:ring-2 focus:ring-green-600"
          />

          <button
            @click="selectedQuantity++"
            class="w-12 h-12 rounded-2xl border border-gray-300 text-xl font-black hover:bg-gray-100 transition-all"
          >
            +
          </button>

        </div>

        <div class="flex gap-3">

          <button
            @click="showAddToCartModal = false"
            class="flex-1 rounded-2xl border border-gray-300 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>

          <button
            @click="confirmAddToCart"
            class="flex-1 rounded-2xl bg-green-700 py-3 text-sm font-bold text-white hover:bg-green-800 transition-all"
          >
            Add to Cart
          </button>

        </div>

      </div>
    </div>

    <!-- CHECKOUT CONFIRMATION -->
    <div
      v-if="showCheckoutConfirm"
      class="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm"
    >
      <div class="w-[90%] max-w-lg rounded-3xl bg-white p-8 shadow-2xl border border-gray-200 animate-popup">

        <h2 class="text-2xl font-black text-[#2d4123] mb-3">
          Confirm Order Checkout
        </h2>

        <p class="text-sm text-gray-600 leading-relaxed mb-6">
          Are you sure you want to proceed with your order checkout?
        </p>

        <div class="bg-green-50 rounded-2xl p-4 mb-6 border border-green-100">

          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-gray-500">Total Items</span>

            <span class="font-bold text-[#2d4123]">
              {{ totalCartCount }}
            </span>
          </div>

          <div class="flex items-center justify-between">
            <span class="text-sm text-gray-500">Total Payment</span>

            <span class="text-2xl font-black text-[#2d4123]">
              ₱{{ cartSubtotal.toFixed(2) }}
            </span>
          </div>

        </div>

        <div class="flex gap-3">

          <button
            @click="showCheckoutConfirm = false"
            class="flex-1 rounded-2xl border border-gray-300 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-all"
          >
            Cancel
          </button>

          <button
            @click="confirmCheckout"
            class="flex-1 rounded-2xl bg-green-700 py-3 text-sm font-bold text-white hover:bg-green-800 transition-all"
          >
            Confirm Order
          </button>

        </div>

      </div>
    </div>

    <!-- CART DRAWER -->
    <div v-if="isCartOpen" class="fixed inset-0 z-50 flex justify-end">

      <div
        @click="isCartOpen = false"
        class="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
      ></div>

      <div
        class="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between z-10 p-6 border-l border-gray-200"
      >

        <div>

          <!-- CART HEADER -->
          <div class="flex items-center justify-between border-b border-gray-100 pb-4 mb-6">

            <h2 class="text-xl font-black text-[#2d4123]">
              Your Shopping Cart
            </h2>

            <button
              @click="isCartOpen = false"
              class="text-gray-400 hover:text-gray-600 text-sm font-semibold p-1"
            >
              ✕ Close
            </button>

          </div>

          <!-- EMPTY -->
          <div
            v-if="cartItems.length === 0"
            class="text-center py-20 text-gray-400 italic text-sm"
          >
            Your shopping selection is empty.
          </div>

          <!-- CART ITEMS -->
          <div
            v-else
            class="space-y-4 max-h-[65vh] overflow-y-auto pr-1"
          >

            <div
              v-for="item in cartItems"
              :key="item.uuid"
              class="border border-green-100 p-4 rounded-2xl bg-green-50 shadow-sm"
            >

              <div class="flex justify-between items-start gap-4">

                <div class="flex flex-col gap-1 flex-1">

                  <span class="text-sm font-bold text-[#2d4123]">
                    {{ item.name }}
                  </span>

                  <span class="text-xs text-gray-500">
                    ₱{{ item.price.toFixed(2) }} each
                  </span>

                  <!-- QUANTITY CONTROLS -->
                  <div class="flex items-center gap-3 mt-4">

                    <button
                      @click="changeQuantity(item, -1)"
                      class="w-9 h-9 rounded-xl bg-white border border-gray-200 text-sm flex items-center justify-center font-black hover:bg-gray-100 transition-all"
                    >
                      −
                    </button>

                    <input
                      v-model.number="item.quantity"
                      type="number"
                      min="1"
                      class="w-16 rounded-xl border border-gray-200 text-center text-sm font-bold py-2 outline-none focus:ring-2 focus:ring-green-600"
                    />

                    <button
                      @click="changeQuantity(item, 1)"
                      class="w-9 h-9 rounded-xl bg-white border border-gray-200 text-sm flex items-center justify-center font-black hover:bg-gray-100 transition-all"
                    >
                      +
                    </button>

                  </div>

                </div>

                <div class="flex flex-col items-end gap-3">

                  <span class="text-lg font-black text-[#2d4123]">
                    ₱{{ (item.price * item.quantity).toFixed(2) }}
                  </span>

                  <button
                    @click="removeProductItem(item)"
                    class="text-xs text-red-500 hover:underline font-medium"
                  >
                    Remove
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

        <!-- CHECKOUT -->
        <div
          v-if="cartItems.length > 0"
          class="border-t border-gray-100 pt-5 mt-6 bg-white"
        >

          <div class="flex justify-between items-center mb-5">

            <span class="text-sm font-medium text-gray-500">
              Subtotal Balance
            </span>

            <span class="text-3xl font-black text-[#2d4123]">
              ₱{{ cartSubtotal.toFixed(2) }}
            </span>

          </div>

          <button
            @click="showCheckoutConfirm = true"
            class="w-full py-4 rounded-2xl bg-green-700 hover:bg-green-800 text-white font-bold text-sm transition-all shadow-md"
          >
            Proceed to Checkout
          </button>

        </div>

      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { orderService } from '~/api/order/OrderService'

const route = useRoute()

const isDropdownOpen = ref(false)
const isCartOpen = ref(false)
const isSubmittingOrder = ref(false)

const showCheckoutConfirm = ref(false)

const showAddToCartModal = ref(false)
const selectedProduct = ref(null)
const selectedQuantity = ref(1)

const cartItems = ref([])

const showNotification = ref(false)
const notificationText = ref('')

// NAVIGATION
const navigation = [
  { name: 'Shop', href: '/customer/shop' },
  { name: 'Categories', href: '/customer/categories' },
  { name: 'Orders', href: '/customer/orders' },
  { name: 'Account', href: '/customer/account' },
]

// COMPUTED
const totalCartCount = computed(() => {
  return cartItems.value.reduce((sum, item) => sum + item.quantity, 0)
})

const cartSubtotal = computed(() => {
  return cartItems.value.reduce((sum, item) => {
    return sum + (item.price * item.quantity)
  }, 0)
})

// ADD TO CART EVENT
const handleItemAddedToCart = (event) => {
  selectedProduct.value = event.detail
  selectedQuantity.value = 1
  showAddToCartModal.value = true
}

// CONFIRM ADD TO CART
const confirmAddToCart = () => {
  const incomingDbProduct = selectedProduct.value

  if (!incomingDbProduct) return

  const productIdentifier =
    incomingDbProduct.uuid || incomingDbProduct.id

  const existingRecord = cartItems.value.find(
    item => item.uuid === productIdentifier
  )

  if (existingRecord) {
    existingRecord.quantity += selectedQuantity.value
  } else {
    cartItems.value.push({
      uuid: productIdentifier,
      name: incomingDbProduct.name,
      price: Number(incomingDbProduct.price || 0),
      quantity: selectedQuantity.value
    })
  }

  showAddToCartModal.value = false

  triggerNotification('Product added to cart successfully!')
}

// SUCCESS MODAL
const triggerNotification = (text) => {
  notificationText.value = text
  showNotification.value = true
}

// CHANGE QUANTITY
const changeQuantity = (item, direction) => {
  item.quantity += direction

  if (item.quantity <= 0) {
    removeProductItem(item)
  }
}

// REMOVE ITEM
const removeProductItem = (item) => {
  cartItems.value = cartItems.value.filter(
    i => i.uuid !== item.uuid
  )
}

// CONFIRM CHECKOUT
const confirmCheckout = async () => {
  showCheckoutConfirm.value = false
  await handleCheckout()
}

// CHECKOUT
const handleCheckout = async () => {
  if (cartItems.value.length === 0) return

  try {
    isSubmittingOrder.value = true

    const checkoutPayload = {
      items: cartItems.value.map(item => ({
        product_uuid: item.uuid,
        quantity: item.quantity
      }))
    }

    await orderService.create(checkoutPayload)

    cartItems.value = []
    isCartOpen.value = false

    triggerNotification('Your order has been placed successfully!')

  } catch (err) {
    console.error('Database connection transaction failure:', err)

    triggerNotification('Could not save order. Please try again.')

  } finally {
    isSubmittingOrder.value = false
  }
}

// ACTIVE NAV
const isActive = (path) => route.path === path

// MOUNT
onMounted(() => {
  window.addEventListener(
    'add-to-cart',
    handleItemAddedToCart
  )
})

// UNMOUNT
onUnmounted(() => {
  window.removeEventListener(
    'add-to-cart',
    handleItemAddedToCart
  )
})
</script>

<style scoped>
@keyframes popup {
  0% {
    opacity: 0;
    transform: scale(0.9) translateY(10px);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}

.animate-popup {
  animation: popup 0.25s ease;
}
</style>
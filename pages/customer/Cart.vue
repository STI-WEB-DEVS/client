<template>
  <div class="mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8">
    <h1 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Shopping Cart</h1>

    <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

        <ul role="list" class="divide-y divide-gray-200 border-b border-t border-gray-200">
          <li v-for="item in cart" :key="item.uuid" class="flex py-6 sm:py-10 items-center">
            <!-- Checklist Checkbox -->
            <div class="mr-4 sm:mr-6">
               <input 
                 type="checkbox" 
                 :checked="item.selected" 
                 @change="toggleSelection(item.uuid)"
                 class="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
               />
            </div>

            

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-sm">
                      <a href="#" class="font-medium text-gray-700 hover:text-gray-800">{{ item.name }}</a>
                    </h3>
                  </div>
                  <p class="mt-1 text-sm font-medium text-gray-900">₱{{ item.price.toLocaleString() }}</p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <label :for="`quantity-${item.uuid}`" class="sr-only">Quantity, {{ item.name }}</label>
                  <select 
                    :id="`quantity-${item.uuid}`" 
                    :value="item.quantity"
                    @change="(e) => updateQuantity(item.uuid, parseInt((e.target as HTMLSelectElement).value))"
                    class="max-w-full rounded-md border border-gray-300 py-1.5 text-left text-base font-medium leading-5 text-gray-700 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  >
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                  </select>

                  <div class="absolute right-0 top-0">
                    <button @click.prevent="removeFromCart(item.uuid)" type="button" class="-m-2 inline-flex p-2 text-gray-400 hover:text-gray-500">
                      <span class="sr-only">Remove</span>
                      <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>

              
            </div>
          </li>
          <li v-if="!cart.length" class="py-20 text-center">
            <ShoppingCartIcon class="mx-auto h-12 w-12 text-gray-400" />
            <h3 class="mt-2 text-sm font-medium text-gray-900">Cart is empty</h3>
            <p class="mt-1 text-sm text-gray-500">You haven't added anything to your cart yet.</p>
            <div class="mt-6">
              <NuxtLink to="/customer/shop" class="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                Go to Shop
              </NuxtLink>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section aria-labelledby="summary-heading" class="mt-16 rounded-2xl bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 id="summary-heading" class="text-lg font-medium text-gray-900">Order summary</h2>

        <div v-if="selectedItems.length > 0" class="mb-6 space-y-3">
          <h3 class="text-xs font-semibold uppercase tracking-wider text-gray-500">Selected Items</h3>
          <ul class="divide-y divide-gray-200">
            <li v-for="item in selectedItems" :key="item.uuid" class="flex justify-between py-2 text-sm">
              <span class="text-gray-600">{{ item.quantity }}x {{ item.name }}</span>
              <span class="font-medium text-gray-900">₱{{ (item.price * item.quantity).toLocaleString() }}</span>
            </li>
          </ul>
        </div>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-gray-600">Subtotal ({{ selectedItems.length }} items selected)</dt>
            <dd class="text-sm font-medium text-gray-900">₱{{ cartTotal.toLocaleString() }}</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt class="flex items-center text-sm text-gray-600">
              <span>Shipping estimate</span>
              <QuestionMarkCircleIcon class="ml-2 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </dt>
            <dd class="text-sm font-medium text-gray-900">₱0.00</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt class="flex text-sm text-gray-600">
              <span>Tax estimate</span>
              <QuestionMarkCircleIcon class="ml-2 h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
            </dt>
            <dd class="text-sm font-medium text-gray-900">₱0.00</dd>
          </div>
          <div class="flex items-center justify-between border-t border-gray-200 pt-4">
            <dt class="text-base font-medium text-gray-900">Order total</dt>
            <dd class="text-base font-medium text-gray-900">₱{{ cartTotal.toLocaleString() }}</dd>
          </div>
        </dl>

        <div class="mt-6">
          <button 
            @click.prevent="handleCheckout"
            :disabled="!selectedItems.length"
            class="w-full rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50 disabled:bg-gray-400"
          >
            Checkout
          </button>
        </div>
      </section>
    </form>

    <FeedbackModal
      :open="isModalOpen"
      :message="modalMessage"
      @close="isModalOpen = false"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { XMarkIcon, CheckIcon, QuestionMarkCircleIcon, ShoppingCartIcon } from '@heroicons/vue/20/solid'
import { useCart } from '~/composables/useCart'
import FeedbackModal from '~/components/FeedbackModal.vue'

definePageMeta({
  layout: 'customer'
})

const { cart, removeFromCart, updateQuantity, toggleSelection, cartTotal, selectedItems, saveLocalOrder } = useCart()

const isModalOpen = ref(false)
const modalMessage = ref('')

const handleCheckout = () => {
  if (!selectedItems.value.length) return;

  const payload = {
    customer_uuid: localStorage.getItem('_uuid') || 'GUEST',
    items: selectedItems.value.map(item => ({
      product_uuid: item.uuid,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    })),
    total_amount: cartTotal.value,
    action: 'CHECKOUT'
  }
  
  console.log('Checkout Payload:', JSON.stringify(payload, null, 2))
  
  // Save to local storage
  saveLocalOrder(payload)
  
  modalMessage.value = 'Your order has been placed successfully! You can view it in the Orders page.'
  isModalOpen.value = true
}
</script>

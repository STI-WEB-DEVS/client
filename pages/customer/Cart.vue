<template>
  <div class="mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6 lg:max-w-7xl lg:px-8">
    <div class="rounded-[1.75rem] border border-stone-200 bg-white/90 p-6 shadow-sm shadow-stone-950/5">
      <p class="text-xs font-bold uppercase tracking-[0.28em] text-amber-700">Checkout</p>
      <h1 class="mt-2 text-3xl font-bold tracking-tight text-stone-950 sm:text-4xl">Shopping Cart</h1>
    </div>

    <form class="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
      <section aria-labelledby="cart-heading" class="lg:col-span-7">
        <h2 id="cart-heading" class="sr-only">Items in your shopping cart</h2>

        <ul role="list" class="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm shadow-stone-950/5">
          <li v-for="item in cart" :key="item.uuid" class="flex items-center border-b border-stone-100 px-5 py-6 transition hover:bg-stone-50/70 last:border-b-0 sm:py-8">
            <div class="mr-4 sm:mr-6">
              <input
                type="checkbox"
                :checked="item.selected"
                @change="toggleSelection(item.uuid)"
                class="h-5 w-5 rounded border-stone-300 text-stone-950 focus:ring-amber-600"
              />
            </div>

            <div class="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
              <div class="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                <div>
                  <div class="flex justify-between">
                    <h3 class="text-sm">
                      <a href="#" class="font-semibold text-stone-800 transition hover:text-stone-950">{{ item.name }}</a>
                    </h3>
                  </div>
                  <p class="mt-1 text-sm font-bold text-stone-950">PHP {{ item.price.toLocaleString() }}</p>
                </div>

                <div class="mt-4 sm:mt-0 sm:pr-9">
                  <label :for="`quantity-${item.uuid}`" class="sr-only">Quantity, {{ item.name }}</label>
                  <select
                    :id="`quantity-${item.uuid}`"
                    :value="item.quantity"
                    @change="(e) => updateQuantity(item.uuid, parseInt((e.target as HTMLSelectElement).value))"
                    class="max-w-full rounded-xl border border-stone-200 bg-white py-2 pl-3 pr-8 text-left text-base font-semibold leading-5 text-stone-700 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 sm:text-sm"
                  >
                    <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                  </select>

                  <div class="absolute right-0 top-0">
                    <button @click.prevent="removeFromCart(item.uuid)" type="button" class="-m-2 inline-flex rounded-full p-2 text-stone-400 transition hover:bg-rose-50 hover:text-rose-600">
                      <span class="sr-only">Remove</span>
                      <XMarkIcon class="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>
          <li v-if="!cart.length" class="py-20 text-center">
            <ShoppingCartIcon class="mx-auto h-12 w-12 text-stone-400" />
            <h3 class="mt-2 text-sm font-semibold text-stone-950">Cart is empty</h3>
            <p class="mt-1 text-sm text-stone-500">You haven't added anything to your cart yet.</p>
            <div class="mt-6">
              <NuxtLink to="/customer/shop" class="inline-flex items-center rounded-full bg-stone-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-stone-950/10 transition hover:-translate-y-0.5 hover:bg-stone-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600">
                Go to Shop
              </NuxtLink>
            </div>
          </li>
        </ul>
      </section>

      <!-- Order summary -->
      <section aria-labelledby="summary-heading" class="mt-16 rounded-[1.75rem] border border-stone-200 bg-white px-5 py-6 shadow-xl shadow-stone-950/10 sm:p-6 lg:sticky lg:top-28 lg:col-span-5 lg:mt-0 lg:p-8">
        <h2 id="summary-heading" class="text-lg font-bold text-stone-950">Order summary</h2>

        <div v-if="selectedItems.length > 0" class="mb-6 space-y-3">
          <h3 class="text-xs font-bold uppercase tracking-wider text-stone-500">Selected Items</h3>
          <ul class="divide-y divide-stone-200">
            <li v-for="item in selectedItems" :key="item.uuid" class="flex justify-between py-2 text-sm">
              <span class="text-stone-600">{{ item.quantity }}x {{ item.name }}</span>
              <span class="font-semibold text-stone-950">PHP {{ (item.price * item.quantity).toLocaleString() }}</span>
            </li>
          </ul>
        </div>

        <dl class="mt-6 space-y-4">
          <div class="flex items-center justify-between">
            <dt class="text-sm text-stone-600">Subtotal ({{ selectedItems.length }} items selected)</dt>
            <dd class="text-sm font-semibold text-stone-950">PHP {{ cartTotal.toLocaleString() }}</dd>
          </div>
          <div class="flex items-center justify-between border-t border-stone-200 pt-4">
            <dt class="flex items-center text-sm text-stone-600">
              <span>Shipping estimate</span>
              <QuestionMarkCircleIcon class="ml-2 h-5 w-5 flex-shrink-0 text-stone-400" aria-hidden="true" />
            </dt>
            <dd class="text-sm font-semibold text-stone-950">PHP 0.00</dd>
          </div>
          <div class="flex items-center justify-between border-t border-stone-200 pt-4">
            <dt class="flex text-sm text-stone-600">
              <span>Tax estimate</span>
              <QuestionMarkCircleIcon class="ml-2 h-5 w-5 flex-shrink-0 text-stone-400" aria-hidden="true" />
            </dt>
            <dd class="text-sm font-semibold text-stone-950">PHP 0.00</dd>
          </div>
          <div class="flex items-center justify-between border-t border-stone-200 pt-4">
            <dt class="text-base font-bold text-stone-950">Order total</dt>
            <dd class="text-base font-bold text-stone-950">PHP {{ cartTotal.toLocaleString() }}</dd>
          </div>
        </dl>

        <div class="mt-6">
          <button
            @click.prevent="handleCheckout"
            :disabled="!selectedItems.length"
            class="w-full rounded-full border border-transparent bg-stone-950 px-4 py-3 text-base font-semibold text-white shadow-lg shadow-stone-950/10 transition duration-200 hover:-translate-y-0.5 hover:bg-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-stone-50 disabled:translate-y-0 disabled:bg-stone-300 disabled:shadow-none"
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
import { orderService } from '~/api/order/OrderService'
import { useCart } from '~/composables/useCart'
import FeedbackModal from '~/components/FeedbackModal.vue'

definePageMeta({
  layout: 'customer'
})

const { cart, removeFromCart, updateQuantity, toggleSelection, cartTotal, selectedItems, saveLocalOrder } = useCart()

const isModalOpen = ref(false)
const modalMessage = ref('')

const handleCheckout = async () => {
  if (!selectedItems.value.length) return;

  const customerUuid = typeof window !== 'undefined' ? localStorage.getItem('_customer_uuid') : null
  const userUuid = typeof window !== 'undefined' ? localStorage.getItem('_user_uuid') : null
  if (!userUuid) {
    modalMessage.value = 'Please sign in before checking out.'
    isModalOpen.value = true
    return
  }

  const payload: any = {
    items: selectedItems.value.map(item => ({
      product_uuid: item.uuid,
      product_name: item.name,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    })),
    total_amount: cartTotal.value,
  }

  if (customerUuid) {
    payload.customer_uuid = customerUuid
  }

  try {
    await orderService.create(payload)
    saveLocalOrder(payload)
    modalMessage.value = 'Your order has been placed successfully! You can view it in the Orders page.'
  } catch (err: any) {
    console.error('Checkout failed:', err)
    modalMessage.value = 'Unable to complete checkout. Please try again.'
  } finally {
    isModalOpen.value = true
  }
}
</script>

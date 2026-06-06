<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen font-sans text-slate-900">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Furnicraft Overview</h1>
        <p class="text-gray-500 mt-1">Furniture management and real-time order tracking.</p>
      </div>

      <div class="flex items-center gap-3">
        <button
          class="flex items-center gap-2 bg-[#5D4037] hover:bg-[#4E342E] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95"
          @click="openOrderForm"
        >
          <PlusIcon class="w-5 h-5" />
          <span>New Order</span>
        </button>
      </div>
    </header>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      <div
        v-for="stat in stats"
        :key="stat.label"
        class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-5 hover:shadow-md transition-shadow"
      >
        <div :class="['p-4 rounded-2xl', stat.bgColor]">
          <component :is="stat.icon" :class="['w-6 h-6', stat.iconColor]" />
        </div>
        <div>
          <p class="text-xs font-bold text-gray-400 uppercase tracking-widest">{{ stat.label }}</p>
          <p class="text-2xl font-black text-[#2D2424]">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <div v-if="errorMessage" class="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
      {{ errorMessage }}
    </div>

    <div class="bg-white rounded-3xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
        <div class="flex items-center gap-3">
          <div class="w-2 h-6 bg-[#FFB300] rounded-full"></div>
          <h3 class="text-lg font-bold text-[#2D2424]">Recent Orders</h3>
        </div>
        <button class="text-sm font-bold text-amber-700 hover:text-amber-600 transition-colors">
          View All Transactions
        </button>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="text-[11px] font-bold text-gray-400 uppercase tracking-widest bg-white">
              <th class="px-8 py-5">Order Reference</th>
              <th class="px-8 py-5">Customer</th>
              <th class="px-8 py-5">Furniture Selection</th>
              <th class="px-8 py-5">Status</th>
              <th class="px-8 py-5">Amount</th>
              <th class="px-8 py-5"></th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-100">
            <tr v-if="isLoading" class="text-sm font-bold text-gray-400">
              <td colspan="6" class="px-8 py-10 text-center">Loading orders...</td>
            </tr>
            <tr v-else-if="orders.length === 0" class="text-sm font-bold text-gray-400">
              <td colspan="6" class="px-8 py-10 text-center">No orders yet.</td>
            </tr>
            <template v-else>
              <tr
                v-for="order in orders"
                :key="order.ref"
                class="hover:bg-amber-50/20 transition-colors group"
              >
                <td class="px-8 py-5 text-sm font-mono font-bold text-[#5D4037]">{{ order.ref }}</td>
                <td class="px-8 py-5 text-sm font-bold text-gray-900">{{ order.customer }}</td>
                <td class="px-8 py-5 text-sm text-gray-600">
                  <span class="bg-gray-100 px-2 py-1 rounded text-xs font-medium">{{ order.item }}</span>
                </td>
                <td class="px-8 py-5">
                  <span :class="['px-3 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wide shadow-sm', order.statusClass]">
                    {{ order.status }}
                  </span>
                </td>
                <td class="px-8 py-5 text-sm font-black text-[#2D2424]">{{ formatMoney(order.price) }}</td>
                <td class="px-8 py-5 text-right text-gray-300 group-hover:text-amber-600 transition-colors">
                  <ChevronRightIcon class="w-5 h-5 ml-auto" />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="showOrderForm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div class="w-full max-w-lg rounded-2xl bg-white shadow-2xl border border-gray-100">
        <div class="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
          <h2 class="text-lg font-black text-[#2D2424]">New Order</h2>
          <button class="text-gray-400 hover:text-gray-700" @click="closeOrderForm">
            <XMarkIcon class="w-5 h-5" />
          </button>
        </div>

        <form class="p-6 space-y-4" @submit.prevent="saveOrder">
          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Customer</label>
            <select
              v-model="orderForm.customer_uuid"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="" disabled>Select customer</option>
              <option v-for="customer in customers" :key="customer.uuid" :value="customer.uuid">
                {{ customer.name }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Product</label>
            <select
              v-model="orderForm.product_uuid"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="" disabled>Select product</option>
              <option v-for="product in products" :key="product.uuid" :value="product.uuid">
                {{ product.name }} - {{ formatMoney(product.price) }}
              </option>
            </select>
          </div>

          <div>
            <label class="block text-xs font-black uppercase tracking-widest text-gray-400 mb-2">Quantity</label>
            <input
              v-model.number="orderForm.quantity"
              type="number"
              min="1"
              required
              class="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>

          <div v-if="formError" class="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
            {{ formError }}
          </div>

          <div class="flex justify-end gap-3 pt-2">
            <button type="button" class="px-5 py-3 rounded-xl text-sm font-bold text-gray-500 hover:bg-gray-50" @click="closeOrderForm">
              Cancel
            </button>
            <button
              type="submit"
              class="px-5 py-3 rounded-xl text-sm font-bold text-white bg-[#5D4037] hover:bg-[#4E342E] disabled:opacity-60"
              :disabled="isSaving"
            >
              {{ isSaving ? 'Saving...' : 'Save Order' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import {
  ShoppingBagIcon,
  CurrencyDollarIcon,
  ClockIcon,
  ArchiveBoxIcon,
  PlusIcon,
  ChevronRightIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import { orderService } from '~/api/order/OrderService'
import { productService } from '~/api/product/ProductService'
import { customerService } from '~/api/customer/CustomerService'

const orders = ref([])
const products = ref([])
const customers = ref([])
const isLoading = ref(false)
const isSaving = ref(false)
const showOrderForm = ref(false)
const errorMessage = ref('')
const formError = ref('')
const orderForm = ref({
  customer_uuid: '',
  product_uuid: '',
  quantity: 1,
})

const stats = computed(() => {
  const totalRevenue = orders.value.reduce((sum, order) => sum + Number(order.price || 0), 0)

  return [
    { label: 'Total Orders', value: String(orders.value.length), icon: ShoppingBagIcon, bgColor: 'bg-amber-50', iconColor: 'text-amber-600' },
    { label: 'Revenue', value: formatMoney(totalRevenue), icon: CurrencyDollarIcon, bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { label: 'Pending Production', value: String(orders.value.length), icon: ClockIcon, bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
    { label: 'In Stock', value: String(products.value.length), icon: ArchiveBoxIcon, bgColor: 'bg-stone-100', iconColor: 'text-stone-600' },
  ]
})

onMounted(async () => {
  await Promise.all([fetchOrders(), fetchProducts(), fetchCustomers()])
})

async function fetchOrders() {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const response = await orderService.list()
    const list = Array.isArray(response?.data) ? response.data : []
    orders.value = list.map(normalizeOrder)
  } catch (error) {
    errorMessage.value = error.message || 'Unable to load orders.'
  } finally {
    isLoading.value = false
  }
}

async function fetchProducts() {
  try {
    const response = await productService.list()
    products.value = Array.isArray(response?.data) ? response.data : []
  } catch (error) {
    products.value = []
  }
}

async function fetchCustomers() {
  try {
    const response = await customerService.list()
    customers.value = Array.isArray(response?.data) ? response.data : []
  } catch (error) {
    customers.value = []
  }
}

function normalizeOrder(order) {
  const firstItem = order.items?.[0]
  const productName = firstItem?.product?.name || 'Product'
  const customerName = order.customer?.name || 'Customer'

  return {
    ref: order.uuid || `Order-${order.id}`,
    customer: customerName,
    item: productName,
    status: 'Pending',
    price: Number(order.total_amount || 0),
    statusClass: 'bg-amber-500 text-white',
  }
}

async function openOrderForm() {
  formError.value = ''
  orderForm.value = {
    customer_uuid: customers.value[0]?.uuid || '',
    product_uuid: products.value[0]?.uuid || '',
    quantity: 1,
  }
  showOrderForm.value = true
}

function closeOrderForm() {
  showOrderForm.value = false
}

async function saveOrder() {
  if (!orderForm.value.customer_uuid || !orderForm.value.product_uuid) {
    formError.value = 'Please select a customer and product before saving.'
    return
  }

  isSaving.value = true
  formError.value = ''

  try {
    const response = await orderService.create({
      customer_uuid: orderForm.value.customer_uuid,
      items: [
        {
          product_uuid: orderForm.value.product_uuid,
          quantity: Number(orderForm.value.quantity),
        },
      ],
    })

    const created = response?.data || response
    orders.value = [normalizeOrder(created), ...orders.value]
    closeOrderForm()
  } catch (error) {
    formError.value = error.message || 'Unable to save order.'
  } finally {
    isSaving.value = false
  }
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP',
  }).format(Number(value || 0))
}
</script>

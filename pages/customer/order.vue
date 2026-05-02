<script setup>
import { ref, onMounted } from 'vue'
import { AuthService } from '~/api/auth/AuthService'

definePageMeta({
  layout: 'customer'
})

const authService = new AuthService()
const showLogoutModal = ref(false)

// Fetch orders data (will be implemented later)
const orders = ref([])
const pending = ref(true)

const fetchOrders = async () => {
  pending.value = true
  try {
    // This will be connected to API later
    // const response = await orderService.list()
    // orders.value = response.data || []
    
    // Mock data for now
    orders.value = []
  } catch (error) {
    console.error('Error fetching orders:', error)
  } finally {
    pending.value = false
  }
}

const formatDate = (date) => {
  if (!date) return 'N/A'
  return new Date(date).toLocaleString()
}

const formatPrice = (price) => {
  return price.toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

const handleLogout = async () => {
  try {
    await authService.logout();
    window.location.href = '/';
  } catch (error) {
    console.error('Logout error:', error);
    window.location.href = '/';
  }
}

const confirmLogout = async () => {
  showLogoutModal.value = false;
  await handleLogout();
}

const cancelLogout = () => {
  showLogoutModal.value = false;
}

onMounted(() => {
  fetchOrders()
})
</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-bold tracking-tight text-gray-900">My Orders</h1>
      <p class="mt-1 text-sm text-gray-500">View your order history.</p>
    </div>

    <div v-if="pending" class="flex justify-center py-16">
      <div class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-indigo-600"></div>
    </div>

    <div v-else-if="orders.length === 0" class="bg-white rounded-lg shadow p-8 text-center">
      <p class="text-gray-500">No orders yet.</p>
      <NuxtLink to="/shop" class="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
        Start Shopping →
      </NuxtLink>
    </div>

    <div v-else class="space-y-4">
      <div v-for="order in orders" :key="order.id" class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-start border-b pb-3">
          <div>
            <p class="text-sm text-gray-500">Order #{{ order.id }}</p>
            <p class="text-xs text-gray-400">{{ formatDate(order.created_at) }}</p>
          </div>
          <span class="px-3 py-1 text-sm rounded-full bg-green-100 text-green-800">
            {{ order.status || 'Completed' }}
          </span>
        </div>
        
        <div class="mt-4 space-y-2">
          <div v-for="item in order.items" :key="item.id" class="flex justify-between">
            <span>{{ item.name }} x {{ item.quantity }}</span>
            <span>₱{{ formatPrice(item.price * item.quantity) }}</span>
          </div>
        </div>
        
        <div class="mt-4 pt-3 border-t flex justify-between font-bold">
          <span>Total:</span>
          <span class="text-indigo-600">₱{{ formatPrice(order.total_amount) }}</span>
        </div>
      </div>
    </div>

    <!-- Logout Confirmation Modal -->
    <div v-if="showLogoutModal" class="fixed inset-0 z-50 overflow-y-auto">
      <div class="flex min-h-screen items-center justify-center p-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showLogoutModal = false"></div>
        <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6">
          <div class="text-center">
            <div class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6 text-red-600">
                <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75" />
              </svg>
            </div>
            <h3 class="mt-4 text-lg font-semibold text-gray-900">Confirm Logout</h3>
            <p class="mt-2 text-sm text-gray-500">Are you sure you want to sign out of your account?</p>
            <div class="mt-6 flex justify-end gap-3">
              <button @click="cancelLogout" class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200">
                Cancel
              </button>
              <button @click="confirmLogout" class="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.format-price {
  font-weight: 500;
}
</style>
<template>
  <NuxtLayout>
    <div class="mb-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <NuxtLink to="/customers" class="mb-4 inline-flex items-center rounded-lg border border-slate-200 px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50">
        Back to Customers
      </NuxtLink>
      <h1 class="text-2xl font-bold">Customer Profile</h1>
      <p class="text-sm text-slate-600 mt-1">Detailed view for customer</p>
    </div>

    <div class="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div v-if="loading" class="py-8">Loading…</div>
      <div v-else-if="error" class="text-red-600">{{ error }}</div>
      <div v-else>
        <p class="text-lg font-semibold">{{ customer.name }}</p>
        <p class="text-sm text-slate-500">{{ customer.email }}</p>
        <div class="mt-4 text-sm">
          <p><strong>UUID:</strong> {{ customer.uuid }}</p>
          <p><strong>Created:</strong> {{ customer.created_at }}</p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { customerService } from '~/api/customers/CustomerService'

const route = useRoute()
const uuid = String(route.params.uuid)

const customer = ref<any>(null)
const loading = ref(true)
const error = ref('')

onMounted(async () => {
  try {
    const res = await customerService.show(uuid)
    // handle resource wrapper
    customer.value = res.data || res
  } catch (e: any) {
    error.value = e?.message || 'Failed to load customer'
  } finally {
    loading.value = false
  }
})
</script>

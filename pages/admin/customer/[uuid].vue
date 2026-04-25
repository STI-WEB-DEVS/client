<template>
  <NuxtLayout>
    <div class="space-y-6">
      <div>
        <h1 class="text-xl font-semibold tracking-tight text-gray-900">
          View Customer
        </h1>
        <p class="mt-1 text-sm text-gray-500">
          Dedicated customer page using the UUID from the route.
        </p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Customer UUID</p>
        <p class="mt-2 break-all text-base font-medium text-gray-900">
          {{ uuid }}
        </p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Customer Name</p>
        <p class="mt-2 text-base font-medium text-gray-900">
          {{ name }}
        </p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Customer Email</p>
        <p class="mt-2 text-base font-medium text-gray-900">
          {{ email }}
        </p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Created At</p>
        <p class="mt-2 text-base font-medium text-gray-900">
          {{ createdAt }}
        </p>
      </div>

      <div class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <p class="text-sm text-gray-500">Updated At</p>
        <p class="mt-2 text-base font-medium text-gray-900">
          {{ updatedAt }}
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { customerService } from '~/api/customer/CustomerService'

const route = useRoute()
const uuid = String(route.params.uuid ?? '')

const name = ref('')
const email = ref('')
const createdAt = ref('')
const updatedAt = ref('')

onMounted(async () => {
  console.log('Mounted triggered')

  const res = await customerService.get(uuid)
  console.log('API called')

  const data = (res as any)?.data ?? res

  name.value = data.name
  email.value = data.email
  createdAt.value = data.created_at
  updatedAt.value = data.updated_at
})
</script>
<template>
  <div class="p-6 bg-gray-50/50 min-h-screen">
    <div class="sm:flex sm:items-center sm:justify-between border-b border-gray-200 pb-5 mb-8">
      <div>
        <h1 class="text-xl font-bold tracking-tight text-gray-900">Showroom Inventory Management</h1>
        <p class="mt-1 text-sm text-gray-500">Add, track, and manage registered furniture profiles, stock quantities, and design blueprints.</p>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          @click="isModalOpen = true"
          class="block rounded-lg bg-green-700 px-4 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white shadow-sm hover:bg-green-800 transition"
        >
          Register Design Spec
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 gap-5 sm:grid-cols-3 mb-8">
      <div class="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5">
        <dt class="text-xs font-bold uppercase tracking-wider text-gray-500 truncate">Total Profile Models</dt>
        <dd class="mt-1 text-2xl font-black text-gray-900 tracking-tight">{{ products.length }}</dd>
      </div>
      <div class="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5">
        <dt class="text-xs font-bold uppercase tracking-wider text-gray-500 truncate">In-Production Assets</dt>
        <dd class="mt-1 text-2xl font-black text-green-700 tracking-tight">
          {{ products.filter(p => Number(p.stock || 0) > 0).length }}
        </dd>
      </div>
      <div class="bg-white overflow-hidden shadow-sm border border-gray-200 rounded-xl p-5">
        <dt class="text-xs font-bold uppercase tracking-wider text-gray-500 truncate">Depleted Workshop Slots</dt>
        <dd class="mt-1 text-2xl font-black text-amber-600 tracking-tight">
          {{ products.filter(p => Number(p.stock || 0) <= 0).length }}
        </dd>
      </div>
    </div>

    <div class="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 text-left text-sm text-gray-900">
          <thead class="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500 border-b border-gray-200">
            <tr>
              <th scope="col" class="px-6 py-3.5">Schematic Design Item</th>
              <th scope="col" class="px-6 py-3.5">Database Registry UUID</th>
              <th scope="col" class="px-6 py-3.5">Standard Valuation</th>
              <th scope="col" class="px-6 py-3.5">Workshop Queue Stock</th>
              <th scope="col" class="relative px-6 py-3.5">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 bg-white">
            <tr v-if="loading">
              <td colspan="5" class="px-6 py-10 text-center text-xs font-medium text-gray-500">
                Retrieving localized furniture schematics stream...
              </td>
            </tr>
            <tr v-else-if="!products.length">
              <td colspan="5" class="px-6 py-10 text-center text-xs font-medium text-gray-500">
                No design profile items registered in the database repository.
              </td>
            </tr>
            <tr v-for="product in products" :key="product.uuid" class="hover:bg-gray-50/70 transition">
              <td class="whitespace-nowrap px-6 py-4 font-semibold text-gray-900 flex items-center gap-3">
                <div class="h-10 w-10 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center overflow-hidden">
                  <img v-if="product.image" :src="product.image" class="h-full w-full object-cover" alt="furniture thumbnail" />
                  <span v-else class="text-lg">🪑</span>
                </div>
                <span>{{ product.name }}</span>
              </td>
              <td class="whitespace-nowrap px-6 py-4 font-mono text-xs text-gray-400">
                {{ product.uuid }}
              </td>
              <td class="whitespace-nowrap px-6 py-4 font-bold text-gray-900">
                ₱{{ Number(product.price || 0).toLocaleString() }}
              </td>
              <td class="whitespace-nowrap px-6 py-4">
                <span 
                  class="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-semibold"
                  :class="Number(product.stock || 0) > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'"
                >
                  {{ product.stock || 0 }} Units Available
                </span>
              </td>
              <td class="whitespace-nowrap px-6 py-4 text-right text-xs font-bold uppercase tracking-wider">
                <button @click="deleteProductProfile(product.uuid)" class="text-red-600 hover:text-red-900 mr-4 transition">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <div v-if="isModalOpen" class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div class="bg-white w-full max-w-md rounded-xl border border-gray-200 shadow-2xl overflow-hidden p-6">
        <h3 class="text-lg font-bold text-gray-900 mb-4">Register New Furniture Profile</h3>
        
        <form @submit.prevent="handleCreateProduct" class="space-y-4">
          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Item Name</label>
            <input v-model="form.name" type="text" required class="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-green-600" placeholder="Mahogany Dining Table" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Price (₱)</label>
            <input v-model="form.price" type="number" required class="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-green-600" placeholder="15000" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Initial Workshop Stock Slots</label>
            <input v-model="form.stock" type="number" required class="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-green-600" placeholder="10" />
          </div>

          <div>
            <label class="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">Schematic Image URL (Optional)</label>
            <input v-model="form.image" type="url" class="w-full rounded-lg border border-gray-300 p-2 text-sm outline-none focus:border-green-600" placeholder="https://..." />
          </div>

          <div class="flex justify-end gap-2 pt-2 border-t border-gray-100">
            <button type="button" @click="isModalOpen = false" class="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700">Cancel</button>
            <button type="submit" :disabled="submitting" class="px-4 py-2 text-xs font-bold text-white uppercase bg-green-700 rounded-lg hover:bg-green-800 disabled:opacity-50">
              {{ submitting ? 'Saving Spec...' : 'Commit to Database' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'

definePageMeta({
  layout: 'default'
})

const products = ref<any[]>([])
const loading = ref(false)
const isModalOpen = ref(false)
const submitting = ref(false)

const form = ref({
  name: '',
  price: '',
  stock: '',
  image: ''
})

// Unpacks the stringified JSON payload if it exists, otherwise falls back to a clean object
const parseProductData = (rawProduct: any) => {
  try {
    const extraData = JSON.parse(rawProduct.name)
    return {
      ...rawProduct,
      name: extraData.name || 'Unnamed Asset',
      stock: extraData.stock || 0,
      image: extraData.image || null
    }
  } catch (e) {
    // Fallback for legacy database entries that are just plain strings
    return {
      ...rawProduct,
      name: rawProduct.name,
      stock: 0,
      image: null
    }
  }
}

const loadWorkshopInventory = async () => {
  loading.value = true
  try {
    const response = await productService.list()
    const rawList = response?.data || (Array.isArray(response) ? response : [])
    
    // Process list to handle our JSON structure
    products.value = rawList.map((item: any) => parseProductData(item))
  } catch (error) {
    console.error('API Ledger Pipeline Resolution Failure:', error)
  } finally {
    loading.value = false
  }
}

const handleCreateProduct = async () => {
  submitting.value = true
  try {
    // Bundle form metadata into the 'name' string to respect the existing model
    const packedName = JSON.stringify({
      name: form.value.name,
      stock: Number(form.value.stock || 0),
      image: form.value.image || null
    })

    await productService.create({
      name: packedName,
      price: Number(form.value.price)
    })
    
    alert('Success! New design spec safely written to database pipeline.')
    isModalOpen.value = false
    form.value = { name: '', price: '', stock: '', image: '' }
    await loadWorkshopInventory()
  } catch (err: any) {
    console.error(err)
    alert('API Submission Error: Could not write design structure to your backend.')
  } finally {
    submitting.value = false
  }
}

const deleteProductProfile = async (uuid: string) => {
  if (!confirm('Are you certain you wish to purge this asset schematic record from the database?')) return
  try {
    await productService.delete(uuid)
    alert('Asset profile record removed successfully.')
    await loadWorkshopInventory()
  } catch (err) {
    alert('Failed to eliminate database entry stream configuration.')
  }
}

onMounted(() => {
  loadWorkshopInventory()
})
</script>
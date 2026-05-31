<!-- pages/admin/products.vue -->
<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-2xl font-bold text-nm-text">Products</h1>
        <p class="text-sm text-nm-muted mt-0.5">Manage dietary products and nutritional items</p>
      </div>
      <button class="nm-btn nm-btn-primary text-sm" @click="openCreate">
        <PlusIcon class="w-4 h-4" /> Add Product
      </button>
    </div>

    <!-- Stats row -->
    <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      <div v-for="s in stats" :key="s.label" class="nm-card p-4">
        <p class="text-2xl font-bold" :style="{ color: s.color }">{{ s.value }}</p>
        <p class="text-xs text-nm-muted font-medium mt-0.5">{{ s.label }}</p>
      </div>
    </div>

    <!-- Table card -->
    <div class="nm-card">
      <!-- Toolbar -->
      <div class="px-5 py-4 border-b border-nm-border flex flex-col sm:flex-row gap-3 sm:items-center justify-between">
        <div class="relative">
          <MagnifyingGlassIcon class="w-4 h-4 text-nm-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products…"
            class="nm-input pl-9 py-2 text-sm w-64"
          />
        </div>
        <div class="flex items-center gap-2 text-sm text-nm-muted">
          Showing {{ filteredProducts.length }} of {{ products.length }} products
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="py-16 flex flex-col items-center gap-3 text-nm-muted">
        <svg class="w-7 h-7 animate-spin text-teal-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span class="text-sm">Loading products…</span>
      </div>

      <!-- Error -->
      <div v-else-if="fetchError" class="py-12 flex flex-col items-center gap-2 text-rose-600">
        <ExclamationTriangleIcon class="w-8 h-8" />
        <p class="text-sm font-semibold">{{ fetchError }}</p>
        <button class="nm-btn nm-btn-ghost text-sm mt-2" @click="loadProducts">Retry</button>
      </div>

      <!-- Empty -->
      <div v-else-if="!filteredProducts.length" class="py-16 flex flex-col items-center gap-2 text-nm-muted">
        <ArchiveBoxXMarkIcon class="w-10 h-10 opacity-40" />
        <p class="text-sm font-medium">No products found</p>
        <button class="nm-btn nm-btn-primary text-sm mt-2" @click="openCreate">Add First Product</button>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="nm-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Product Name</th>
              <th>Price (₱)</th>
              <th>Date Added</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(product, idx) in filteredProducts" :key="product.uuid">
              <td class="text-nm-muted text-xs">{{ idx + 1 }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <div
                    class="nm-avatar w-8 h-8 text-xs flex-shrink-0"
                    :style="{ background: avatarColor(product.name) }"
                  >
                    {{ initials(product.name) }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nm-text">{{ product.name }}</p>
                    <p class="text-xs text-nm-muted font-mono">{{ product.uuid?.slice(0, 8) }}…</p>
                  </div>
                </div>
              </td>
              <td class="text-sm font-semibold text-teal-700">₱{{ product.price }}</td>
              <td class="text-sm text-nm-muted whitespace-nowrap">{{ formatDate(product.created_at) }}</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="nm-ic-btn" title="View" @click="openView(product)">
                    <EyeIcon class="w-3.5 h-3.5" />
                  </button>
                  <button class="nm-ic-btn" title="Edit" @click="openEdit(product)">
                    <PencilIcon class="w-3.5 h-3.5" />
                  </button>
                  <button class="nm-ic-btn danger" title="Delete" @click="confirmDelete(product)">
                    <TrashIcon class="w-3.5 h-3.5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ── VIEW DETAILS MODAL ──────────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showViewModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showViewModal = false" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm">
            <!-- Header -->
            <div class="flex items-center justify-between px-6 pt-5 pb-4 border-b border-nm-border">
              <h3 class="font-display text-lg font-bold text-nm-text">Product Details</h3>
              <button class="nm-ic-btn" @click="showViewModal = false">
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>
            <!-- Body -->
            <div class="px-6 py-5 space-y-4">
              <div>
                <p class="text-xs font-semibold text-nm-muted uppercase tracking-wide mb-1">Product Name</p>
                <p class="text-sm font-semibold text-nm-text">{{ viewTarget?.name }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold text-nm-muted uppercase tracking-wide mb-1">Price</p>
                <p class="text-sm font-bold text-teal-700">₱{{ viewTarget?.price }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold text-nm-muted uppercase tracking-wide mb-1">UUID</p>
                <p class="text-xs font-mono text-nm-muted break-all">{{ viewTarget?.uuid }}</p>
              </div>
            </div>
            <!-- Footer -->
            <div class="flex gap-3 px-6 pb-5">
              <button
                class="flex-1 nm-btn nm-btn-primary text-sm"
                @click="() => { showViewModal = false; openEdit(viewTarget) }"
              >
                Edit
              </button>
              <button class="flex-1 nm-btn nm-btn-ghost text-sm" @click="showViewModal = false">
                Close
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── CREATE / EDIT MODAL ─────────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="closeModal" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
            <!-- Modal Header -->
            <div class="flex items-center justify-between p-6 border-b border-nm-border">
              <div>
                <h3 class="font-display text-lg font-bold text-nm-text">
                  {{ isEditing ? 'Edit Product' : 'Add New Product' }}
                </h3>
                <p class="text-xs text-nm-muted mt-0.5">
                  {{ isEditing ? 'Update product details below' : 'Fill in the product details' }}
                </p>
              </div>
              <button class="nm-ic-btn" @click="closeModal">
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>

            <!-- Modal Body -->
            <div class="p-6 space-y-4">
              <div v-if="modalError" class="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg flex items-center gap-2">
                ⚠️ {{ modalError }}
              </div>

              <div>
                <label class="nm-label">Product Name <span class="text-rose-500">*</span></label>
                <input
                  v-model="form.name"
                  type="text"
                  class="nm-input"
                  placeholder="e.g. Whey Protein Isolate"
                  :disabled="saving"
                />
              </div>

              <div>
                <label class="nm-label">Price (₱) <span class="text-rose-500">*</span></label>
                <input
                  v-model="form.price"
                  type="number"
                  step="0.01"
                  min="0"
                  class="nm-input"
                  placeholder="0.00"
                  :disabled="saving"
                />
              </div>
            </div>

            <!-- Modal Footer -->
            <div class="flex items-center justify-end gap-3 px-6 pb-6">
              <button class="nm-btn nm-btn-ghost text-sm" @click="closeModal" :disabled="saving">
                Cancel
              </button>
              <button
                class="nm-btn nm-btn-primary text-sm"
                @click="saveProduct"
                :disabled="saving || !form.name || !form.price"
              >
                <span v-if="saving" class="flex items-center gap-2">
                  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Saving…
                </span>
                <span v-else>{{ isEditing ? 'Update Product' : 'Create Product' }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── DELETE CONFIRM MODAL ───────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showDeleteModal = false" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div class="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon class="w-7 h-7 text-rose-500" />
            </div>
            <h3 class="font-display text-lg font-bold text-nm-text mb-1">Delete Product?</h3>
            <p class="text-sm text-nm-muted mb-6">
              <strong class="text-nm-text">{{ deleteTarget?.name }}</strong> will be permanently removed.
              This action cannot be undone.
            </p>
            <div class="flex gap-3 justify-center">
              <button class="nm-btn nm-btn-ghost text-sm" @click="showDeleteModal = false" :disabled="deleting">Cancel</button>
              <button class="nm-btn nm-btn-danger text-sm bg-rose-600 text-white border-rose-600 hover:bg-rose-700" @click="deleteProduct" :disabled="deleting">
                <span v-if="deleting">Deleting…</span>
                <span v-else>Yes, Delete</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- Toast -->
    <Transition name="toast">
      <div v-if="toast.show" class="nm-toast" :class="toast.type === 'error' ? 'bg-rose-700' : ''">
        <span>{{ toast.type === 'success' ? '✅' : '❌' }}</span>
        {{ toast.message }}
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import {
  PlusIcon, MagnifyingGlassIcon, PencilIcon, TrashIcon,
  XMarkIcon, ExclamationTriangleIcon, ArchiveBoxXMarkIcon, EyeIcon
} from '@heroicons/vue/24/outline'
import { productService } from '~/api/product/ProductService'

definePageMeta({ layout: 'admin' })

/* ── State ─────────────────────────────────────────── */
const products    = ref<any[]>([])
const loading     = ref(false)
const fetchError  = ref('')
const searchQuery = ref('')

const showModal   = ref(false)
const isEditing   = ref(false)
const saving      = ref(false)
const modalError  = ref('')
const form        = ref({ name: '', price: '' })
const editUuid    = ref('')

const showViewModal = ref(false)
const viewTarget    = ref<any>(null)

const showDeleteModal = ref(false)
const deleteTarget    = ref<any>(null)
const deleting        = ref(false)

const toast = ref({ show: false, message: '', type: 'success' })

/* ── Computed ───────────────────────────────────────── */
const filteredProducts = computed(() =>
  products.value.filter(p =>
    p.name?.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

const stats = computed(() => [
  { label: 'Total Products', value: products.value.length, color: '#0d6b6b' },
  { label: 'This Month',     value: products.value.filter(p => isThisMonth(p.created_at)).length, color: '#d97706' },
  { label: 'Avg Price',      value: products.value.length
      ? '₱' + (products.value.reduce((s, p) => s + parseFloat(p.price || 0), 0) / products.value.length).toFixed(2)
      : '—', color: '#7c3aed' },
  { label: 'Active Items',   value: products.value.length, color: '#059669' },
])

/* ── Helpers ─────────────────────────────────────────── */
const avatarColors = ['#0d6b6b','#d97706','#7c3aed','#0891b2','#059669','#dc2626','#ea580c']
const avatarColor  = (name: string) => avatarColors[name?.charCodeAt(0) % avatarColors.length]
const initials     = (name: string) => name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
const formatDate   = (dt: string)  => dt ? new Date(dt).toLocaleDateString('en-PH', { year:'numeric', month:'short', day:'numeric' }) : '—'
const isThisMonth  = (dt: string)  => {
  if (!dt) return false
  const d = new Date(dt); const now = new Date()
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
}

/* ── Data fetching ───────────────────────────────────── */
async function loadProducts() {
  loading.value = true; fetchError.value = ''
  try {
    const res = await productService.list()
    products.value = res?.data ?? res ?? []
  } catch (e: any) {
    fetchError.value = e?.message || 'Failed to load products'
  } finally {
    loading.value = false
  }
}

onMounted(loadProducts)

/* ── View modal ──────────────────────────────────────── */
function openView(product: any) {
  viewTarget.value = product
  showViewModal.value = true
}

/* ── Modal helpers ───────────────────────────────────── */
function openCreate() {
  isEditing.value = false; editUuid.value = ''
  form.value = { name: '', price: '' }
  modalError.value = ''; showModal.value = true
}

function openEdit(product: any) {
  isEditing.value = true; editUuid.value = product.uuid
  form.value = { name: product.name, price: product.price }
  modalError.value = ''; showModal.value = true
}

function closeModal() { showModal.value = false }

async function saveProduct() {
  if (!form.value.name.trim() || !form.value.price) return
  saving.value = true; modalError.value = ''
  try {
    const payload = { name: form.value.name.trim(), price: parseFloat(form.value.price as string) }
    if (isEditing.value) {
      const res = await productService.update(editUuid.value, payload)
      const updated = res?.data ?? res
      const idx = products.value.findIndex(p => p.uuid === editUuid.value)
      if (idx !== -1) products.value[idx] = updated
      showToast('Product updated successfully')
    } else {
      const res = await productService.create(payload)
      products.value.unshift(res?.data ?? res)
      showToast('Product created successfully')
    }
    closeModal()
  } catch (e: any) {
    modalError.value = e?.message || 'Failed to save product'
  } finally {
    saving.value = false
  }
}

function confirmDelete(product: any) {
  deleteTarget.value = product; showDeleteModal.value = true
}

async function deleteProduct() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await productService.delete(deleteTarget.value.uuid)
    products.value = products.value.filter(p => p.uuid !== deleteTarget.value.uuid)
    showDeleteModal.value = false
    showToast('Product deleted')
  } catch (e: any) {
    showToast(e?.message || 'Failed to delete', 'error')
    showDeleteModal.value = false
  } finally {
    deleting.value = false
  }
}

function showToast(message: string, type = 'success') {
  toast.value = { show: true, message, type }
  setTimeout(() => { toast.value.show = false }, 3000)
}
</script>

<style scoped>
.modal-enter-active { transition: all .25s cubic-bezier(.34,1.56,.64,1); }
.modal-leave-active { transition: all .18s ease; }
.modal-enter-from { opacity: 0; transform: scale(.94); }
.modal-leave-to   { opacity: 0; transform: scale(.96); }
</style>
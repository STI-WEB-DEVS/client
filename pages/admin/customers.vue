<!-- pages/admin/customers.vue -->
<template>
  <div>
    <!-- Page Header -->
    <div class="flex items-center justify-between mb-6">
      <div>
        <h1 class="font-display text-2xl font-bold text-nm-text">Customers</h1>
        <p class="text-sm text-nm-muted mt-0.5">Manage client profiles and contact information</p>
      </div>
      <button class="nm-btn nm-btn-primary text-sm" @click="openCreate">
        <PlusIcon class="w-4 h-4" /> Add Customer
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
            placeholder="Search by name or email…"
            class="nm-input pl-9 py-2 text-sm w-72"
          />
        </div>
        <div class="flex items-center gap-2 text-sm text-nm-muted">
          Showing {{ filteredCustomers.length }} of {{ customers.length }} customers
        </div>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="py-16 flex flex-col items-center gap-3 text-nm-muted">
        <svg class="w-7 h-7 animate-spin text-teal-600" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
        </svg>
        <span class="text-sm">Loading customers…</span>
      </div>

      <!-- Error -->
      <div v-else-if="fetchError" class="py-12 flex flex-col items-center gap-2 text-rose-600">
        <ExclamationTriangleIcon class="w-8 h-8" />
        <p class="text-sm font-semibold">{{ fetchError }}</p>
        <button class="nm-btn nm-btn-ghost text-sm mt-2" @click="loadCustomers">Retry</button>
      </div>

      <!-- Empty -->
      <div v-else-if="!filteredCustomers.length" class="py-16 flex flex-col items-center gap-2 text-nm-muted">
        <UserGroupIcon class="w-10 h-10 opacity-40" />
        <p class="text-sm font-medium">No customers found</p>
        <button class="nm-btn nm-btn-primary text-sm mt-2" @click="openCreate">Add First Customer</button>
      </div>

      <!-- Table -->
      <div v-else class="overflow-x-auto">
        <table class="nm-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Customer</th>
              <th>Email</th>
              <th>Member Since</th>
              <th class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(customer, idx) in filteredCustomers" :key="customer.uuid">
              <td class="text-nm-muted text-xs">{{ idx + 1 }}</td>
              <td>
                <div class="flex items-center gap-3">
                  <div
                    class="nm-avatar w-9 h-9 text-xs flex-shrink-0"
                    :style="{ background: avatarColor(customer.name) }"
                  >
                    {{ initials(customer.name) }}
                  </div>
                  <div>
                    <p class="text-sm font-semibold text-nm-text">{{ customer.name }}</p>
                    <p class="text-xs text-nm-muted font-mono">{{ customer.uuid?.slice(0, 8) }}…</p>
                  </div>
                </div>
              </td>
              <td>
                <a
                  :href="`mailto:${customer.email}`"
                  class="text-sm text-teal-700 hover:underline"
                >{{ customer.email }}</a>
              </td>
              <td class="text-sm text-nm-muted whitespace-nowrap">{{ formatDate(customer.created_at) }}</td>
              <td class="text-right">
                <div class="flex items-center justify-end gap-1">
                  <button class="nm-ic-btn" title="View" @click="openView(customer)">
                    <EyeIcon class="w-3.5 h-3.5" />
                  </button>
                  <button class="nm-ic-btn" title="Edit" @click="openEdit(customer)">
                    <PencilIcon class="w-3.5 h-3.5" />
                  </button>
                  <button class="nm-ic-btn danger" title="Delete" @click="confirmDelete(customer)">
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
              <h3 class="font-display text-lg font-bold text-nm-text">Customer Details</h3>
              <button class="nm-ic-btn" @click="showViewModal = false">
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>
            <!-- Body -->
            <div class="px-6 py-5 space-y-4">
              <div>
                <p class="text-xs font-semibold text-nm-muted uppercase tracking-wide mb-1">Customer Name</p>
                <p class="text-sm font-semibold text-nm-text">{{ viewTarget?.name }}</p>
              </div>
              <div>
                <p class="text-xs font-semibold text-nm-muted uppercase tracking-wide mb-1">Email</p>
                <a
                  :href="`mailto:${viewTarget?.email}`"
                  class="text-sm text-teal-700 hover:underline"
                >{{ viewTarget?.email }}</a>
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
            <div class="flex items-center justify-between p-6 border-b border-nm-border">
              <div>
                <h3 class="font-display text-lg font-bold text-nm-text">
                  {{ isEditing ? 'Edit Customer' : 'Add New Customer' }}
                </h3>
                <p class="text-xs text-nm-muted mt-0.5">
                  {{ isEditing ? 'Update customer record' : 'Register a new client profile' }}
                </p>
              </div>
              <button class="nm-ic-btn" @click="closeModal">
                <XMarkIcon class="w-4 h-4" />
              </button>
            </div>

            <div class="p-6 space-y-4">
              <div v-if="modalError" class="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-lg flex items-center gap-2">
                ⚠️ {{ modalError }}
              </div>

              <div>
                <label class="nm-label">Full Name <span class="text-rose-500">*</span></label>
                <input
                  v-model="form.name"
                  type="text"
                  class="nm-input"
                  placeholder="e.g. Juan dela Cruz"
                  :disabled="saving"
                />
              </div>

              <div>
                <label class="nm-label">Email Address <span class="text-rose-500">*</span></label>
                <input
                  v-model="form.email"
                  type="email"
                  class="nm-input"
                  placeholder="e.g. juan@email.com"
                  :disabled="saving"
                />
              </div>
            </div>

            <div class="flex items-center justify-end gap-3 px-6 pb-6">
              <button class="nm-btn nm-btn-ghost text-sm" @click="closeModal" :disabled="saving">Cancel</button>
              <button
                class="nm-btn nm-btn-primary text-sm"
                @click="saveCustomer"
                :disabled="saving || !form.name || !form.email"
              >
                <span v-if="saving" class="flex items-center gap-2">
                  <svg class="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"/>
                  </svg>
                  Saving…
                </span>
                <span v-else>{{ isEditing ? 'Update Customer' : 'Create Customer' }}</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ── DELETE CONFIRM MODAL ─────────────────────────── -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div class="absolute inset-0 bg-black/40 backdrop-blur-sm" @click="showDeleteModal = false" />
          <div class="relative bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 text-center">
            <div class="w-14 h-14 rounded-full bg-rose-50 flex items-center justify-center mx-auto mb-4">
              <ExclamationTriangleIcon class="w-7 h-7 text-rose-500" />
            </div>
            <h3 class="font-display text-lg font-bold text-nm-text mb-1">Delete Customer?</h3>
            <p class="text-sm text-nm-muted mb-6">
              <strong class="text-nm-text">{{ deleteTarget?.name }}</strong>'s record and all associated data
              will be permanently removed.
            </p>
            <div class="flex gap-3 justify-center">
              <button class="nm-btn nm-btn-ghost text-sm" @click="showDeleteModal = false" :disabled="deleting">Cancel</button>
              <button
                class="nm-btn text-sm bg-rose-600 text-white border-rose-600 hover:bg-rose-700"
                @click="deleteCustomer"
                :disabled="deleting"
              >
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
  XMarkIcon, ExclamationTriangleIcon, UserGroupIcon, EyeIcon
} from '@heroicons/vue/24/outline'
import { customerService } from '~/api/customer/CustomerService'

definePageMeta({ layout: 'admin' })

/* ── State ─────────────────────────────────────────── */
const customers   = ref<any[]>([])
const loading     = ref(false)
const fetchError  = ref('')
const searchQuery = ref('')

const showModal  = ref(false)
const isEditing  = ref(false)
const saving     = ref(false)
const modalError = ref('')
const form       = ref({ name: '', email: '' })
const editUuid   = ref('')

const showViewModal = ref(false)
const viewTarget    = ref<any>(null)

const showDeleteModal = ref(false)
const deleteTarget    = ref<any>(null)
const deleting        = ref(false)

const toast = ref({ show: false, message: '', type: 'success' })

/* ── Computed ───────────────────────────────────────── */
const filteredCustomers = computed(() => {
  const q = searchQuery.value.toLowerCase()
  return customers.value.filter(c =>
    c.name?.toLowerCase().includes(q) || c.email?.toLowerCase().includes(q)
  )
})

const stats = computed(() => [
  { label: 'Total Customers', value: customers.value.length, color: '#0d6b6b' },
  { label: 'New This Month',  value: customers.value.filter(c => isThisMonth(c.created_at)).length, color: '#d97706' },
  { label: 'With Orders',     value: '—', color: '#7c3aed' },
  { label: 'Active',          value: customers.value.length, color: '#059669' },
])

/* ── Helpers ─────────────────────────────────────────── */
const avatarColors = ['#0d6b6b','#d97706','#7c3aed','#0891b2','#059669','#dc2626','#ea580c']
const avatarColor  = (name: string) => avatarColors[name?.charCodeAt(0) % avatarColors.length]
const initials     = (name: string) => name?.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2) || '?'
const formatDate   = (dt: string)   => dt ? new Date(dt).toLocaleDateString('en-PH', { year:'numeric', month:'short', day:'numeric' }) : '—'
const isThisMonth  = (dt: string)   => {
  if (!dt) return false
  const d = new Date(dt); const now = new Date()
  return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
}

/* ── Data fetching ───────────────────────────────────── */
async function loadCustomers() {
  loading.value = true; fetchError.value = ''
  try {
    const res = await customerService.list()
    customers.value = res?.data ?? res ?? []
  } catch (e: any) {
    fetchError.value = e?.message || 'Failed to load customers'
  } finally {
    loading.value = false
  }
}

onMounted(loadCustomers)

/* ── View modal ──────────────────────────────────────── */
function openView(customer: any) {
  viewTarget.value = customer
  showViewModal.value = true
}

/* ── Modal helpers ───────────────────────────────────── */
function openCreate() {
  isEditing.value = false; editUuid.value = ''
  form.value = { name: '', email: '' }
  modalError.value = ''; showModal.value = true
}

function openEdit(customer: any) {
  isEditing.value = true; editUuid.value = customer.uuid
  form.value = { name: customer.name, email: customer.email }
  modalError.value = ''; showModal.value = true
}

function closeModal() { showModal.value = false }

async function saveCustomer() {
  if (!form.value.name.trim() || !form.value.email.trim()) return
  saving.value = true; modalError.value = ''
  try {
    const payload = { name: form.value.name.trim(), email: form.value.email.trim() }
    if (isEditing.value) {
      const res = await customerService.update(editUuid.value, payload)
      const updated = res?.data ?? res
      const idx = customers.value.findIndex(c => c.uuid === editUuid.value)
      if (idx !== -1) customers.value[idx] = updated
      showToast('Customer updated successfully')
    } else {
      const res = await customerService.create(payload)
      customers.value.unshift(res?.data ?? res)
      showToast('Customer created successfully')
    }
    closeModal()
  } catch (e: any) {
    modalError.value = e?.message || 'Failed to save customer'
  } finally {
    saving.value = false
  }
}

function confirmDelete(customer: any) {
  deleteTarget.value = customer; showDeleteModal.value = true
}

async function deleteCustomer() {
  if (!deleteTarget.value) return
  deleting.value = true
  try {
    await customerService.delete(deleteTarget.value.uuid)
    customers.value = customers.value.filter(c => c.uuid !== deleteTarget.value.uuid)
    showDeleteModal.value = false
    showToast('Customer deleted')
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
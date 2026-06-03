<template>
  <NuxtLayout>
    <div class="dashboard">

      <!-- ═══════════════════════════════
           PAGE HEADER
      ═══════════════════════════════ -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-eyebrow">
            <span class="eyebrow-pip"></span>
            <span class="eyebrow-label">Inventory System</span>
          </div>

          <h1 class="page-title">Products</h1>
          <p class="page-sub">
            {{ today }} · Manage your product inventory
          </p>
        </div>

        <button @click="openAddModal" class="btn-alert">
          <span class="alert-pulse"></span>
          + Add Product
        </button>
      </div>

      <!-- ═══════════════════════════════
           STATS
      ═══════════════════════════════ -->
      <div class="stats-grid">

        <div class="stat-card">
          <div class="stat-body">
            <p class="stat-label">Total Products</p>
            <p class="stat-value">{{ products.length }}</p>
            <p class="stat-change stat-up">All items</p>
          </div>
        </div>

        <div class="stat-card">
          <div class="stat-body">
            <p class="stat-label">Filtered</p>
            <p class="stat-value">{{ filteredProducts.length }}</p>
            <p class="stat-change stat-up">Search results</p>
          </div>
        </div>

        <div class="stat-card stat-card--critical">
          <div class="stat-body">
            <p class="stat-label">Average Price</p>
            <p class="stat-value">₱ {{ avgPrice }}</p>
            <p class="stat-change stat-down">Market overview</p>
          </div>
        </div>

      </div>

      <!-- ═══════════════════════════════
           SEARCH
      ═══════════════════════════════ -->
      <div class="dark-card">
        <div class="card-head">
          <h2 class="card-title">Search Products</h2>
        </div>

        <div class="p-6">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search products..."
            class="w-full px-4 py-3 rounded-lg bg-black/40 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>

      <!-- ═══════════════════════════════
           TABLE
      ═══════════════════════════════ -->
      <div class="dark-card">

        <div class="card-head">
          <h2 class="card-title">Product Inventory</h2>
        </div>

        <!-- Loading -->
        <div v-if="loading" class="p-10 text-center text-white/60">
          Loading products...
        </div>

        <!-- Error -->
        <div v-else-if="error" class="p-6 text-red-400">
          {{ error }}
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">

          <table class="w-full">

            <thead class="text-left border-b border-white/10 text-white/60 text-xs uppercase">
              <tr>
                <th class="p-4">Product</th>
                <th>Price</th>
                <th>Created</th>
                <th class="text-right p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="product in filteredProducts"
                :key="product.uuid"
                class="border-b border-white/5 hover:bg-white/5 transition"
              >

                <td class="p-4 flex items-center gap-3">
                  <div class="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-600 to-red-900 flex items-center justify-center text-white font-bold">
                    {{ product.name.charAt(0) }}
                  </div>
                  <span class="text-white/80 font-medium">
                    {{ product.name }}
                  </span>
                </td>

                <td class="text-white/70">
                  ₱ {{ product.price }}
                </td>

                <td class="text-white/50">
                  {{ formatDate(product.created_at) }}
                </td>

                <td class="p-4 text-right space-x-3">
                  <button class="text-blue-400" @click="openViewModal(product)">View</button>
                  <button class="text-green-400" @click="openEditModal(product)">Edit</button>
                  <button class="text-red-400" @click="openDeleteConfirm(product)">Delete</button>
                </td>

              </tr>
            </tbody>

          </table>

          <div v-if="filteredProducts.length === 0" class="p-10 text-center text-white/40">
            No products found
          </div>

        </div>
      </div>

      <!-- ═══════════════════════════════
           MODAL (ADD / EDIT)
      ═══════════════════════════════ -->
      <div v-if="showModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

        <div class="dark-card w-full max-w-md">

          <div class="card-head">
            <h2 class="card-title">
              {{ modalMode === 'add' ? 'Add Product' : 'Edit Product' }}
            </h2>
          </div>

          <form @submit.prevent="saveProduct" class="p-6 space-y-4">

            <input
              v-model="formData.name"
              placeholder="Product name"
              class="w-full p-3 rounded bg-black/40 border border-white/10 text-white"
            />

            <input
              v-model="formData.price"
              type="number"
              placeholder="Price"
              class="w-full p-3 rounded bg-black/40 border border-white/10 text-white"
            />

            <div class="flex gap-2 pt-4">

              <button
                type="button"
                @click="closeModal"
                class="flex-1 p-2 border border-white/10 text-white/70 rounded"
              >
                Cancel
              </button>

              <button
                type="submit"
                class="flex-1 p-2 bg-red-600 text-white rounded"
                :disabled="saving"
              >
                {{ saving ? 'Saving...' : 'Save' }}
              </button>

            </div>

          </form>

        </div>

      </div>

      <!-- ═══════════════════════════════
           VIEW MODAL
      ═══════════════════════════════ -->
      <div v-if="showViewModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">

        <div class="dark-card w-full max-w-md p-6 text-white">

          <h2 class="text-lg font-bold mb-4">Product Details</h2>

          <div class="flex items-center gap-3 mb-4">
            <div class="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-600 to-red-900 flex items-center justify-center font-bold">
              {{ selectedProduct?.name?.charAt(0) }}
            </div>

            <div>
              <p class="font-semibold">{{ selectedProduct?.name }}</p>
              <p class="text-white/60">₱ {{ selectedProduct?.price }}</p>
            </div>
          </div>

          <p class="text-white/50 text-sm">
            Created: {{ formatDate(selectedProduct?.created_at) }}
          </p>

          <button
            @click="closeViewModal"
            class="mt-6 w-full p-2 bg-white/10 rounded"
          >
            Close
          </button>

        </div>

      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { productService } from '~/api/product/ProductService'

const today = new Date().toLocaleDateString('en-PH', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

const avgPrice = computed(() => {
  if (!products.value.length) return 0
  const total = products.value.reduce((sum, p) => sum + Number(p.price || 0), 0)
  return Math.round(total / products.value.length)
})
const searchQuery = ref('')
const products = ref<any[]>([])
const loading = ref(false)
const error = ref<string | null>(null)

// Modal
const showModal = ref(false)
const showViewModal = ref(false)
const modalMode = ref<'add' | 'edit'>('add')
const saving = ref(false)

// Selected
const selectedProduct = ref<any>(null)

// Form
const formData = ref({
    name: '',
    price: ''
})

// Computed
const filteredProducts = computed(() => {
    return products.value.filter(p =>
        searchQuery.value === '' ||
        p.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

// Fetch
const fetchProducts = async () => {
    loading.value = true
    try {
        const response = await productService.list({ per_page: 100 })
        products.value = response.data ?? response
    } catch (err: any) {
        error.value = err.message
    } finally {
        loading.value = false
    }
}

// Modal
const openAddModal = () => {
    modalMode.value = 'add'
    formData.value = { name: '', price: '' }
    showModal.value = true
}

const openEditModal = (product: any) => {
    modalMode.value = 'edit'
    selectedProduct.value = product
    formData.value = {
        name: product.name,
        price: product.price
    }
    showModal.value = true
}

const closeModal = () => {
    showModal.value = false
    selectedProduct.value = null
}

// Save
const saveProduct = async () => {
    saving.value = true
    try {
        if (modalMode.value === 'add') {
            await productService.create(formData.value)
        } else {
            await productService.update(selectedProduct.value.uuid, formData.value)
        }

        closeModal()
        await fetchProducts()
    } finally {
        saving.value = false
    }
}

// Delete
const openDeleteConfirm = async (product: any) => {
    if (!confirm(`Delete ${product.name}?`)) return

    await productService.delete(product.uuid)
    await fetchProducts()
}

// View
const openViewModal = (product: any) => {
    selectedProduct.value = product
    showViewModal.value = true
}

const closeViewModal = () => {
    showViewModal.value = false
    selectedProduct.value = null
}

// Utils
const formatDate = (d: string) =>
    new Date(d).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    })

onMounted(fetchProducts)
</script>
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Root ── */
.dashboard {
  max-width: 1280px;
  font-family: 'DM Sans', sans-serif;
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

/* ══════════════════════════
   PAGE HEADER
══════════════════════════ */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.25rem;
}

.header-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}
.eyebrow-pip {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #dc2626;
  box-shadow: 0 0 8px rgba(220,38,38,0.8);
}
.eyebrow-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.28);
  font-weight: 600;
}
.page-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
}
.page-sub {
  font-size: 0.78rem;
  color: rgba(255,255,255,0.3);
  margin: 0.35rem 0 0;
}

/* Alert button */
.btn-alert {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.72rem 1.4rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  border: none;
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.87rem;
  font-weight: 700;
  cursor: pointer;
  letter-spacing: 0.01em;
  box-shadow: 0 4px 20px rgba(220,38,38,0.45), 0 1px 0 rgba(255,255,255,0.12) inset;
  transition: transform 0.15s, box-shadow 0.15s;
  overflow: visible;
}
.btn-alert:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(220,38,38,0.6);
}

.alert-pulse {
  position: absolute;
  top: -4px; right: -4px;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: #fbbf24;
  box-shadow: 0 0 0 0 rgba(251,191,36,0.7);
  animation: alertPulse 1.8s infinite;
}
@keyframes alertPulse {
  0%   { box-shadow: 0 0 0 0 rgba(251,191,36,0.7); }
  70%  { box-shadow: 0 0 0 8px rgba(251,191,36,0); }
  100% { box-shadow: 0 0 0 0 rgba(251,191,36,0); }
}

/* ══════════════════════════
   STAT CARDS
══════════════════════════ */
.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.stat-card {
  position: relative;
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 16px;
  padding: 1.25rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
}
.stat-card:hover {
  transform: translateY(-3px);
  border-color: rgba(220,38,38,0.3);
  box-shadow: 0 12px 32px rgba(0,0,0,0.4);
}
.stat-card--critical {
  border-color: rgba(239,68,68,0.25);
  background: linear-gradient(135deg, #110202, #1a0505);
}

.stat-icon-wrap {
  width: 44px; height: 44px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}
.icon-red   { background: rgba(220,38,38,0.12); border: 1px solid rgba(220,38,38,0.25); color: #fca5a5; }
.icon-rose  { background: rgba(190,18,60,0.12);  border: 1px solid rgba(190,18,60,0.25);  color: #fda4af; }
.icon-orange{ background: rgba(239,68,68,0.12);  border: 1px solid rgba(239,68,68,0.3);   color: #fca5a5; }
.icon-green { background: rgba(34,197,94,0.1);   border: 1px solid rgba(34,197,94,0.22);  color: #4ade80; }

.stat-body { flex: 1; min-width: 0; }

.stat-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
  margin: 0 0 3px;
  font-weight: 600;
}
.stat-value {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
  margin: 0 0 4px;
}
.stat-change {
  display: flex;
  align-items: center;
  gap: 3px;
  font-size: 0.7rem;
  font-weight: 500;
  margin: 0;
}
.stat-up   { color: #4ade80; }
.stat-down { color: #fca5a5; }

.stat-glow {
  position: absolute;
  right: -16px; bottom: -16px;
  width: 72px; height: 72px;
  border-radius: 50%;
  filter: blur(24px);
  pointer-events: none;
}

/* ══════════════════════════
   MIDDLE GRID
══════════════════════════ */
.mid-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
@media (max-width: 900px) {
  .mid-grid { grid-template-columns: 1fr; }
}

/* Shared dark card */
.dark-card {
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 18px;
  overflow: hidden;
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
}

.card-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.25rem 1.5rem;
  border-bottom: 1px solid rgba(255,255,255,0.05);
  flex-wrap: wrap;
  gap: 0.5rem;
}

.card-title-group {
  display: flex;
  align-items: center;
  gap: 0.55rem;
}

.card-title {
  font-family: 'Playfair Display', serif;
  font-size: 0.98rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  margin: 0;
}

.live-badge {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.2rem 0.65rem;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.28);
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #fca5a5;
}
.live-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: #ef4444;
  animation: blink 1.5s infinite;
  box-shadow: 0 0 5px rgba(239,68,68,0.8);
}

.view-all-link {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fca5a5;
  text-decoration: none;
  opacity: 0.7;
  transition: opacity 0.15s;
}
.view-all-link:hover { opacity: 1; }

/* ── Inventory list ── */
.inventory-list {
  padding: 1rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.inv-row { display: flex; flex-direction: column; gap: 5px; }

.inv-row-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.inv-type-wrap {
  display: flex;
  align-items: center;
  gap: 0.45rem;
}

.inv-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  flex-shrink: 0;
}

.inv-type {
  font-size: 0.83rem;
  font-weight: 700;
  color: rgba(255,255,255,0.8);
  letter-spacing: 0.02em;
}

.inv-row-right {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.inv-units {
  font-size: 0.78rem;
  font-weight: 700;
  color: rgba(255,255,255,0.7);
}
.inv-max {
  font-weight: 400;
  color: rgba(255,255,255,0.25);
  font-size: 0.72rem;
}

.inv-status-chip {
  font-size: 0.6rem;
  font-weight: 700;
  padding: 0.18rem 0.55rem;
  border-radius: 999px;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}
.istatus-adequate { background: rgba(22,163,74,0.12);  border: 1px solid rgba(22,163,74,0.25);  color: #4ade80; }
.istatus-low      { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); color: #fcd34d; }
.istatus-critical { background: rgba(220,38,38,0.12);  border: 1px solid rgba(220,38,38,0.3);   color: #fca5a5; }

.inv-track {
  height: 5px;
  background: rgba(255,255,255,0.06);
  border-radius: 999px;
  overflow: hidden;
}
.inv-fill {
  height: 100%;
  border-radius: 999px;
  transition: width 0.8s cubic-bezier(.22,1,.36,1);
}

/* ── Donation list ── */
.donation-list {
  padding: 0.75rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
}

.donation-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.7rem 0.6rem;
  border-radius: 10px;
  transition: background 0.15s;
  animation: cardIn 0.35s cubic-bezier(.22,1,.36,1) both;
}
.donation-row:hover { background: rgba(220,38,38,0.04); }

.d-avatar {
  width: 38px; height: 38px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 0.75rem;
  font-weight: 700;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
}

.d-info { flex: 1; min-width: 0; }

.d-name {
  font-size: 0.85rem;
  font-weight: 600;
  color: rgba(255,255,255,0.78);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.d-meta {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.7rem;
  color: rgba(255,255,255,0.28);
  margin: 2px 0 0;
}

.d-blood-pill {
  padding: 0.08rem 0.4rem;
  background: rgba(220,38,38,0.14);
  border: 1px solid rgba(220,38,38,0.25);
  border-radius: 4px;
  font-size: 0.62rem;
  font-weight: 800;
  color: #fca5a5;
  letter-spacing: 0.03em;
}

.d-badge {
  font-size: 0.62rem;
  font-weight: 700;
  padding: 0.2rem 0.6rem;
  border-radius: 999px;
  flex-shrink: 0;
  white-space: nowrap;
}
.dbadge-verified   { background: rgba(22,163,74,0.12);  border: 1px solid rgba(22,163,74,0.25);  color: #4ade80; }
.dbadge-processing { background: rgba(245,158,11,0.12); border: 1px solid rgba(245,158,11,0.25); color: #fcd34d; }
.dbadge-dispatched { background: rgba(59,130,246,0.12); border: 1px solid rgba(59,130,246,0.25); color: #93c5fd; }

/* ══════════════════════════
   EMERGENCY CARD
══════════════════════════ */
.emergency-card {
  border-color: rgba(220,38,38,0.22);
}

.emergency-icon-pulse {
  width: 28px; height: 28px;
  border-radius: 8px;
  background: #dc2626;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 0 12px rgba(220,38,38,0.6);
  animation: emergencyGlow 2s ease-in-out infinite;
}
@keyframes emergencyGlow {
  0%, 100% { box-shadow: 0 0 12px rgba(220,38,38,0.6); }
  50%       { box-shadow: 0 0 22px rgba(220,38,38,0.9); }
}

.pending-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.28rem 0.8rem;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.3);
  border-radius: 999px;
  font-size: 0.7rem;
  font-weight: 700;
  color: #fca5a5;
}
.pending-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #ef4444;
  animation: blink 1.2s infinite;
  box-shadow: 0 0 6px rgba(239,68,68,0.8);
}

/* Emergency list */
.emergency-list {
  padding: 1rem 1.5rem 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.emergency-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 1rem 1.1rem;
  border-radius: 14px;
  border: 1px solid;
  flex-wrap: wrap;
  animation: rowIn 0.35s cubic-bezier(.22,1,.36,1) both;
  transition: transform 0.15s;
}
.emergency-row:hover { transform: translateX(2px); }

.erow-critical { background: rgba(220,38,38,0.08);  border-color: rgba(220,38,38,0.28); }
.erow-urgent   { background: rgba(245,158,11,0.06); border-color: rgba(245,158,11,0.22); }
.erow-moderate { background: rgba(34,197,94,0.05);  border-color: rgba(34,197,94,0.18); }

.erow-left {
  display: flex;
  align-items: center;
  gap: 1rem;
  min-width: 0;
}

.erow-blood {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  width: 52px; height: 52px;
  border-radius: 13px;
  background: linear-gradient(135deg, #dc2626, #7f1d1d);
  color: white;
  font-weight: 800;
  font-size: 0.95rem;
  justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 4px 14px rgba(220,38,38,0.35);
  letter-spacing: 0.02em;
}

.erow-detail { min-width: 0; }

.erow-hospital {
  font-size: 0.88rem;
  font-weight: 600;
  color: rgba(255,255,255,0.8);
  margin: 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.erow-units {
  font-size: 0.72rem;
  color: rgba(255,255,255,0.3);
  margin: 3px 0 0;
}

.erow-right {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-shrink: 0;
}

.urgency-chip {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.28rem 0.75rem;
  border-radius: 999px;
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
}
.uchip-critical { background: rgba(220,38,38,0.15);  border: 1px solid rgba(220,38,38,0.35); color: #fca5a5; }
.uchip-urgent   { background: rgba(245,158,11,0.15); border: 1px solid rgba(245,158,11,0.35); color: #fcd34d; }
.uchip-moderate { background: rgba(34,197,94,0.12);  border: 1px solid rgba(34,197,94,0.3);  color: #4ade80; }

.urgency-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: currentColor;
  flex-shrink: 0;
}

.btn-respond {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.5rem 1rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  border: none;
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 700;
  color: white;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(220,38,38,0.35);
  transition: all 0.15s;
  white-space: nowrap;
}
.btn-respond:hover {
  box-shadow: 0 5px 16px rgba(220,38,38,0.55);
  transform: translateY(-1px);
}

/* ── Animations ── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes rowIn {
  from { opacity: 0; transform: translateX(-8px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes blink {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.25; }
}
</style>
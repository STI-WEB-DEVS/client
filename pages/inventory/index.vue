<template>
  <NuxtLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Inventory & Suppliers</h2>
        <p class="text-sm text-slate-500 mt-0.5">Monitor materials and manage supplier records</p>
      </div>
      <button class="btn-amber">+ Add Material</button>
    </div>

    <!-- Summary Cards -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="s in summary" :key="s.label" class="mini-card">
        <p class="mini-value" :class="s.color">{{ s.value }}</p>
        <p class="mini-label">{{ s.label }}</p>
      </div>
    </div>

    <!-- Inventory Table -->
    <div class="card mb-6">
      <h3 class="section-title mb-4">Material Inventory</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Material</th>
              <th class="th">Category</th>
              <th class="th">Stock</th>
              <th class="th">Unit</th>
              <th class="th">Reorder Level</th>
              <th class="th">Supplier</th>
              <th class="th">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="item in inventory" :key="item.id" class="tr-hover">
              <td class="td font-semibold text-slate-800">{{ item.name }}</td>
              <td class="td text-slate-500">{{ item.category }}</td>
              <td class="td font-bold" :class="item.stock <= item.reorder ? 'text-red-600' : 'text-slate-700'">{{ item.stock }}</td>
              <td class="td text-slate-500">{{ item.unit }}</td>
              <td class="td text-slate-400">{{ item.reorder }}</td>
              <td class="td text-slate-500">{{ item.supplier }}</td>
              <td class="td">
                <span :class="item.stock === 0 ? 'badge-red' : item.stock <= item.reorder ? 'badge-yellow' : 'badge-green'">
                  {{ item.stock === 0 ? 'Out of Stock' : item.stock <= item.reorder ? 'Low Stock' : 'In Stock' }}
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Suppliers Table -->
    <div class="card">
      <h3 class="section-title mb-4">Suppliers</h3>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Supplier</th>
              <th class="th">Contact Person</th>
              <th class="th">Phone</th>
              <th class="th">Materials</th>
              <th class="th">Last Order</th>
              <th class="th">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="s in suppliers" :key="s.id" class="tr-hover">
              <td class="td font-semibold text-slate-800">{{ s.name }}</td>
              <td class="td text-slate-600">{{ s.contact }}</td>
              <td class="td text-slate-500">{{ s.phone }}</td>
              <td class="td text-slate-500">{{ s.materials }}</td>
              <td class="td text-slate-500">{{ s.lastOrder }}</td>
              <td class="td"><span class="badge-green">Active</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const summary = [
  { label: 'Total Materials', value: '24', color: 'text-slate-800' },
  { label: 'Low Stock', value: '5', color: 'text-amber-600' },
  { label: 'Out of Stock', value: '2', color: 'text-red-600' },
  { label: 'Suppliers', value: '8', color: 'text-blue-600' },
]

const inventory = [
  { id: 1, name: 'White Cotton Fabric', category: 'Fabric', stock: 48, unit: 'meters', reorder: 20, supplier: 'Fab-Tech Textiles' },
  { id: 2, name: 'Black Polyester', category: 'Fabric', stock: 10, unit: 'meters', reorder: 15, supplier: 'Manila Fabrics Co.' },
  { id: 3, name: 'Blue Denim', category: 'Fabric', stock: 0, unit: 'meters', reorder: 10, supplier: 'Fab-Tech Textiles' },
  { id: 4, name: 'White Thread (100m)', category: 'Thread', stock: 25, unit: 'rolls', reorder: 10, supplier: 'Sewing Essentials' },
  { id: 5, name: 'Black Thread (100m)', category: 'Thread', stock: 8, unit: 'rolls', reorder: 10, supplier: 'Sewing Essentials' },
  { id: 6, name: 'Metal Zipper 20cm', category: 'Accessories', stock: 60, unit: 'pcs', reorder: 30, supplier: 'Trimcraft Supply' },
  { id: 7, name: 'Uniform Buttons', category: 'Accessories', stock: 3, unit: 'bags', reorder: 5, supplier: 'Trimcraft Supply' },
  { id: 8, name: 'Lining Fabric', category: 'Fabric', stock: 30, unit: 'meters', reorder: 12, supplier: 'Manila Fabrics Co.' },
]

const suppliers = [
  { id: 1, name: 'Fab-Tech Textiles', contact: 'Ricardo Lim', phone: '02-8123-4567', materials: 'Cotton, Polyester, Denim', lastOrder: 'Mar 5, 2026' },
  { id: 2, name: 'Manila Fabrics Co.', contact: 'Grace Tan', phone: '02-8234-5678', materials: 'Lining, Polyester', lastOrder: 'Feb 28, 2026' },
  { id: 3, name: 'Sewing Essentials', contact: 'Noel Santos', phone: '09171234567', materials: 'Threads, Needles', lastOrder: 'Mar 10, 2026' },
  { id: 4, name: 'Trimcraft Supply', contact: 'Helen Dy', phone: '09281234567', materials: 'Zippers, Buttons, Elastic', lastOrder: 'Mar 1, 2026' },
]
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.mini-card { background: white; border-radius: 0.875rem; padding: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); text-align: center; }
.mini-value { font-size: 1.75rem; font-weight: 800; }
.mini-label { font-size: 0.75rem; color: #94A3B8; margin-top: 2px; }
.section-title { font-size: 1rem; font-weight: 700; color: #0F172A; }
.th { text-align: left; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #94A3B8; padding: 0.6rem 0.875rem; background: #F8FAFC; }
.td { padding: 0.9rem 0.875rem; }
.tr-hover:hover td { background: #FAFBFC; }
.badge-green { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #F0FDF4; color: #16A34A; }
.badge-yellow { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #FFFBEB; color: #D97706; }
.badge-red { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #FEF2F2; color: #DC2626; }
.btn-amber { background: linear-gradient(135deg, #F59E0B, #D97706); color: #0F172A; font-weight: 700; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; transition: all 0.15s; }
.btn-amber:hover { box-shadow: 0 4px 12px rgba(245,158,11,0.35); transform: translateY(-1px); }
</style>

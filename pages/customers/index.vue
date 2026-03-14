<template>
  <NuxtLayout>
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Customers & Orders</h2>
        <p class="text-sm text-slate-500 mt-0.5">Manage customer profiles and track job orders</p>
      </div>
      <button class="btn-amber">
        <span>+ New Customer</span>
      </button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 mb-6 p-1 bg-slate-100 rounded-xl w-fit">
      <button v-for="tab in tabs" :key="tab"
        @click="activeTab = tab"
        :class="['tab-btn', activeTab === tab ? 'tab-active' : '']">
        {{ tab }}
      </button>
    </div>

    <!-- Customers Table -->
    <div v-if="activeTab === 'Customers'" class="card">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Customer</th>
              <th class="th">Contact</th>
              <th class="th">Orders</th>
              <th class="th">Last Order</th>
              <th class="th">Status</th>
              <th class="th">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="c in customers" :key="c.id" class="tr-hover">
              <td class="td">
                <div class="flex items-center gap-3">
                  <div class="avatar">{{ c.name[0] }}</div>
                  <div>
                    <p class="font-semibold text-slate-800">{{ c.name }}</p>
                    <p class="text-xs text-slate-400">{{ c.email }}</p>
                  </div>
                </div>
              </td>
              <td class="td text-slate-500">{{ c.phone }}</td>
              <td class="td text-center font-semibold text-slate-700">{{ c.orders }}</td>
              <td class="td text-slate-500">{{ c.lastOrder }}</td>
              <td class="td">
                <span :class="c.active ? 'badge-green' : 'badge-gray'">{{ c.active ? 'Active' : 'Inactive' }}</span>
              </td>
              <td class="td">
                <button class="text-xs text-amber-600 font-semibold hover:underline">View</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- Orders Table -->
    <div v-if="activeTab === 'Job Orders'" class="card">
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Order #</th>
              <th class="th">Customer</th>
              <th class="th">Garment Type</th>
              <th class="th">Measurements</th>
              <th class="th">Due</th>
              <th class="th">Status</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="o in orders" :key="o.id" class="tr-hover">
              <td class="td font-mono font-bold text-slate-600">{{ o.id }}</td>
              <td class="td font-medium text-slate-800">{{ o.customer }}</td>
              <td class="td text-slate-500">{{ o.type }}</td>
              <td class="td text-xs text-slate-400">{{ o.measurements }}</td>
              <td class="td text-slate-500">{{ o.due }}</td>
              <td class="td"><span :class="statusClass(o.status)">{{ o.status }}</span></td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const tabs = ['Customers', 'Job Orders']
const activeTab = ref('Customers')

const customers = [
  { id: 1, name: 'Maria Santos', email: 'maria@email.com', phone: '09171234567', orders: 5, lastOrder: 'Mar 10, 2026', active: true },
  { id: 2, name: 'Jose Reyes', email: 'jose@email.com', phone: '09281234567', orders: 2, lastOrder: 'Mar 8, 2026', active: true },
  { id: 3, name: 'Ana Dela Cruz', email: 'ana@email.com', phone: '09391234567', orders: 8, lastOrder: 'Mar 12, 2026', active: true },
  { id: 4, name: 'Carlo Mendoza', email: 'carlo@email.com', phone: '09451234567', orders: 1, lastOrder: 'Feb 28, 2026', active: false },
  { id: 5, name: 'Liza Villanueva', email: 'liza@email.com', phone: '09551234567', orders: 3, lastOrder: 'Mar 5, 2026', active: true },
  { id: 6, name: 'Pedro Garcia', email: 'pedro@email.com', phone: '09661234567', orders: 6, lastOrder: 'Mar 1, 2026', active: true },
]

const orders = [
  { id: 'JO-001', customer: 'Maria Santos', type: 'School Uniform', measurements: 'Bust 34" Waist 28" Hip 38"', due: 'Mar 16, 2026', status: 'In Progress' },
  { id: 'JO-002', customer: 'Jose Reyes', type: 'Alteration – Pants', measurements: 'Waist 32" Length 28"', due: 'Mar 17, 2026', status: 'Pending' },
  { id: 'JO-003', customer: 'Ana Dela Cruz', type: 'Barong Tagalog', measurements: 'Chest 40" Shoulder 18"', due: 'Mar 15, 2026', status: 'Ready' },
  { id: 'JO-004', customer: 'Carlo Mendoza', type: 'Polo Uniform (3 pcs)', measurements: 'Chest 38" Waist 34"', due: 'Mar 20, 2026', status: 'In Progress' },
  { id: 'JO-005', customer: 'Liza Villanueva', type: 'Evening Dress', measurements: 'Bust 36" Waist 26" Hip 39"', due: 'Mar 18, 2026', status: 'Ready' },
]

const statusClass = (s: string) => {
  const m: Record<string,string> = {
    'In Progress': 'badge-blue',
    'Pending': 'badge-yellow',
    'Ready': 'badge-green',
    'Completed': 'badge-gray',
  }
  return m[s] || 'badge-gray'
}
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.th { text-align: left; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #94A3B8; padding: 0.6rem 0.875rem; background: #F8FAFC; }
.td { padding: 0.9rem 0.875rem; }
.tr-hover:hover td { background: #FAFBFC; }
.avatar { width: 34px; height: 34px; border-radius: 50%; background: linear-gradient(135deg, #F59E0B, #D97706); color: white; font-weight: 700; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
.badge-green { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #F0FDF4; color: #16A34A; }
.badge-gray { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #F1F5F9; color: #475569; }
.badge-blue { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #EFF6FF; color: #2563EB; }
.badge-yellow { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #FFFBEB; color: #D97706; }
.btn-amber { background: linear-gradient(135deg, #F59E0B, #D97706); color: #0F172A; font-weight: 700; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; transition: all 0.15s; }
.btn-amber:hover { box-shadow: 0 4px 12px rgba(245,158,11,0.35); transform: translateY(-1px); }
.tab-btn { padding: 0.375rem 1rem; border-radius: 0.625rem; font-size: 0.85rem; font-weight: 600; color: #64748B; border: none; background: transparent; cursor: pointer; transition: all 0.15s; }
.tab-active { background: white; color: #0F172A; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
</style>

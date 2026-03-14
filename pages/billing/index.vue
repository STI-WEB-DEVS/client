<template>
  <NuxtLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Billing & Payments</h2>
        <p class="text-sm text-slate-500 mt-0.5">Generate invoices and track payment records</p>
      </div>
      <button class="btn-amber">+ New Invoice</button>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div v-for="s in summary" :key="s.label" class="mini-card">
        <p class="mini-value" :class="s.color">{{ s.value }}</p>
        <p class="mini-label">{{ s.label }}</p>
      </div>
    </div>

    <!-- Invoices Table -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="section-title">Invoices</h3>
        <div class="flex gap-2">
          <button v-for="f in filters" :key="f"
            @click="activeFilter = f"
            :class="['filter-btn', activeFilter === f ? 'filter-active' : '']">
            {{ f }}
          </button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Invoice #</th>
              <th class="th">Customer</th>
              <th class="th">Order Ref</th>
              <th class="th">Amount</th>
              <th class="th">Date</th>
              <th class="th">Due</th>
              <th class="th">Status</th>
              <th class="th">Action</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="inv in filteredInvoices" :key="inv.id" class="tr-hover">
              <td class="td font-mono font-bold text-slate-600">{{ inv.id }}</td>
              <td class="td font-medium text-slate-800">{{ inv.customer }}</td>
              <td class="td text-slate-400 text-xs">{{ inv.order }}</td>
              <td class="td font-bold text-slate-800">₱ {{ inv.amount.toLocaleString() }}</td>
              <td class="td text-slate-500">{{ inv.date }}</td>
              <td class="td text-slate-500">{{ inv.due }}</td>
              <td class="td"><span :class="statusClass(inv.status)">{{ inv.status }}</span></td>
              <td class="td">
                <button class="text-xs text-amber-600 font-semibold hover:underline mr-3">View</button>
                <button class="text-xs text-blue-600 font-semibold hover:underline">Print</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const summary = [
  { label: 'Total Billed', value: '₱ 42,500', color: 'text-slate-800' },
  { label: 'Paid', value: '₱ 31,200', color: 'text-emerald-600' },
  { label: 'Pending', value: '₱ 8,750', color: 'text-amber-600' },
  { label: 'Overdue', value: '₱ 2,550', color: 'text-red-600' },
]

const filters = ['All', 'Paid', 'Pending', 'Overdue']
const activeFilter = ref('All')

const invoices = [
  { id: 'INV-001', customer: 'Maria Santos', order: 'JO-001', amount: 3500, date: 'Mar 10, 2026', due: 'Mar 17, 2026', status: 'Paid' },
  { id: 'INV-002', customer: 'Jose Reyes', order: 'JO-002', amount: 850, date: 'Mar 11, 2026', due: 'Mar 18, 2026', status: 'Pending' },
  { id: 'INV-003', customer: 'Ana Dela Cruz', order: 'JO-003', amount: 4200, date: 'Mar 8, 2026', due: 'Mar 15, 2026', status: 'Paid' },
  { id: 'INV-004', customer: 'Carlo Mendoza', order: 'JO-004', amount: 7500, date: 'Mar 5, 2026', due: 'Mar 12, 2026', status: 'Overdue' },
  { id: 'INV-005', customer: 'Liza Villanueva', order: 'JO-005', amount: 6000, date: 'Mar 9, 2026', due: 'Mar 16, 2026', status: 'Pending' },
  { id: 'INV-006', customer: 'Pedro Garcia', order: 'JO-006', amount: 2200, date: 'Mar 12, 2026', due: 'Mar 19, 2026', status: 'Paid' },
]

const filteredInvoices = computed(() =>
  activeFilter.value === 'All' ? invoices : invoices.filter(i => i.status === activeFilter.value)
)

const statusClass = (s: string) => {
  const m: Record<string, string> = {
    Paid: 'badge-green', Pending: 'badge-yellow', Overdue: 'badge-red',
  }
  return m[s] || 'badge-gray'
}
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.mini-card { background: white; border-radius: 0.875rem; padding: 1rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); text-align: center; }
.mini-value { font-size: 1.35rem; font-weight: 800; }
.mini-label { font-size: 0.75rem; color: #94A3B8; margin-top: 2px; }
.section-title { font-size: 1rem; font-weight: 700; color: #0F172A; }
.th { text-align: left; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.07em; color: #94A3B8; padding: 0.6rem 0.875rem; background: #F8FAFC; }
.td { padding: 0.9rem 0.875rem; }
.tr-hover:hover td { background: #FAFBFC; }
.filter-btn { font-size: 0.75rem; font-weight: 600; padding: 0.3rem 0.75rem; border-radius: 0.5rem; border: 1px solid #E2E8F0; background: white; color: #64748B; cursor: pointer; transition: all 0.15s; }
.filter-active { background: #F59E0B; border-color: #F59E0B; color: #0F172A; }
.badge-green { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #F0FDF4; color: #16A34A; }
.badge-yellow { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #FFFBEB; color: #D97706; }
.badge-red { display: inline-block; font-size: 0.7rem; font-weight: 600; padding: 0.2rem 0.6rem; border-radius: 9999px; background: #FEF2F2; color: #DC2626; }
.btn-amber { background: linear-gradient(135deg, #F59E0B, #D97706); color: #0F172A; font-weight: 700; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; transition: all 0.15s; }
.btn-amber:hover { box-shadow: 0 4px 12px rgba(245,158,11,0.35); transform: translateY(-1px); }
</style>

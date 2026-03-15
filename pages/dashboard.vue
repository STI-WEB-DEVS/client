<template>
  <NuxtLayout>
    <!-- Stat cards -->
    <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4 mb-8">
      <div v-for="stat in stats" :key="stat.label" class="stat-card">
        <div class="flex items-center justify-between mb-3">
          <div :class="['stat-icon', stat.iconBg]">
            <component :is="stat.icon" class="size-5" />
          </div>
          <span :class="['stat-badge', stat.trend > 0 ? 'text-emerald-600 bg-emerald-50' : 'text-red-600 bg-red-50']">
            {{ stat.trend > 0 ? '↑' : '↓' }} {{ Math.abs(stat.trend) }}%
          </span>
        </div>
        <p class="stat-value">{{ stat.value }}</p>
        <p class="stat-label">{{ stat.label }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Recent Orders -->
      <div class="xl:col-span-2 card">
        <div class="card-header">
          <h2 class="card-title">Recent Orders</h2>
          <NuxtLink to="/customers" class="view-all-link">View all →</NuxtLink>
        </div>
        <!-- Desktop table -->
        <div class="hidden md:block overflow-x-auto">
          <table class="w-full text-sm">
            <thead>
              <tr class="table-head">
                <th>Order #</th>
                <th>Customer</th>
                <th>Type</th>
                <th>Due Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100">
              <tr v-for="order in recentOrders" :key="order.id" class="table-row-hover">
                <td class="font-mono font-semibold text-slate-700">{{ order.id }}</td>
                <td class="text-slate-800 font-medium">{{ order.customer }}</td>
                <td class="text-slate-500">{{ order.type }}</td>
                <td class="text-slate-500">{{ order.due }}</td>
                <td>
                  <span :class="statusClass(order.status)">{{ order.status }}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <!-- Mobile cards -->
        <div class="md:hidden space-y-2 mt-2">
          <div v-for="order in recentOrders" :key="order.id" class="dash-mobile-card">
            <div class="flex items-center justify-between mb-1">
              <span class="font-mono font-bold text-slate-600 text-xs">{{ order.id }}</span>
              <span :class="statusClass(order.status)">{{ order.status }}</span>
            </div>
            <p class="font-semibold text-slate-800 text-sm">{{ order.customer }}</p>
            <p class="text-xs text-slate-500 mt-0.5">{{ order.type }} &nbsp;·&nbsp; Due: {{ order.due }}</p>
          </div>
        </div>
      </div>

      <!-- Quick Actions + Upcoming -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="card">
          <h2 class="card-title mb-4">Quick Actions</h2>
          <div class="space-y-2">
            <NuxtLink v-for="action in quickActions" :key="action.label" :to="action.href"
              class="quick-action-btn">
              <component :is="action.icon" class="size-4" style="color:#009E97" />
              {{ action.label }}
            </NuxtLink>
          </div>
        </div>

        <!-- Upcoming Appointments -->
        <div class="card">
          <div class="card-header">
            <h2 class="card-title">Upcoming</h2>
            <NuxtLink to="/appointments" class="view-all-link">View all →</NuxtLink>
          </div>
          <ul class="space-y-3 mt-2">
            <li v-for="appt in upcomingAppts" :key="appt.id" class="flex items-start gap-3">
              <div class="appt-dot"></div>
              <div>
                <p class="text-sm font-medium text-slate-800">{{ appt.name }}</p>
                <p class="text-xs text-slate-500">{{ appt.time }} · {{ appt.type }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import {
  ShoppingBagIcon, UsersIcon, ExclamationTriangleIcon, CalendarDaysIcon,
  PlusCircleIcon, CubeIcon, BanknotesIcon,
} from '@heroicons/vue/24/outline'

const { getPosts, getUsers } = useAuth()

// ── Live stat values (computed from real localStorage data) ──────
const statValues = ref({
  orders:       248,
  customers:    91,
  lowStock:     5,
  appointments: 7,
})

onMounted(() => {
  if (!import.meta.client) return

  // Active customers from real user data (exclude demo system accounts)
  const users = getUsers()
  const activeUsers = users.filter(u => u.isActive).length
  if (activeUsers > 0) statValues.value.customers = activeUsers

  // Total posts as a proxy for activity (real data we own)
  const posts = getPosts()

  // Try to read customers/orders from the customers page storage if it exists
  // (those pages use reactive() not localStorage, so we use seed totals as fallback)
  try {
    const raw = localStorage.getItem('tailortrack_orders')
    if (raw) {
      const orders = JSON.parse(raw)
      if (Array.isArray(orders) && orders.length > 0) {
        statValues.value.orders = orders.length
      }
    }
  } catch {}

  try {
    const raw = localStorage.getItem('tailortrack_appointments')
    if (raw) {
      const appts = JSON.parse(raw)
      if (Array.isArray(appts)) {
        const today = new Date().toDateString()
        const todayCount = appts.filter((a: any) => {
          try { return new Date(a.date || a.due || '').toDateString() === today } catch { return false }
        }).length
        if (todayCount >= 0) statValues.value.appointments = todayCount || 7
      }
    }
  } catch {}

  try {
    const raw = localStorage.getItem('tailortrack_inventory')
    if (raw) {
      const inv = JSON.parse(raw)
      if (Array.isArray(inv)) {
        const low = inv.filter((item: any) => (item.stock ?? 0) <= (item.reorder ?? 10)).length
        statValues.value.lowStock = low
      }
    }
  } catch {}
})

const stats = computed(() => [
  { label: 'Total Job Orders',      value: statValues.value.orders.toString(),       trend:  12, icon: ShoppingBagIcon,       iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Active Customers',       value: statValues.value.customers.toString(),    trend:   8, icon: UsersIcon,             iconBg: 'bg-emerald-100 text-emerald-600' },
  { label: 'Low Stock Alerts',       value: statValues.value.lowStock.toString(),     trend:  -3, icon: ExclamationTriangleIcon, iconBg: 'bg-red-100 text-red-500' },
  { label: "Today's Appointments",  value: statValues.value.appointments.toString(), trend:  16, icon: CalendarDaysIcon,       iconBg: 'icon-teal' },
])

const recentOrders = [
  { id: 'JO-001', customer: 'Maria Santos',   type: 'School Uniform', due: 'Mar 16, 2026', status: 'In Progress' },
  { id: 'JO-002', customer: 'Jose Reyes',     type: 'Alteration',     due: 'Mar 17, 2026', status: 'Pending' },
  { id: 'JO-003', customer: 'Ana Dela Cruz',  type: 'Barong',         due: 'Mar 15, 2026', status: 'Ready' },
  { id: 'JO-004', customer: 'Carlo Mendoza',  type: 'Polo Uniform',   due: 'Mar 20, 2026', status: 'In Progress' },
  { id: 'JO-005', customer: 'Liza Villanueva',type: 'Dress',          due: 'Mar 18, 2026', status: 'Ready' },
]

const quickActions = [
  { label: 'New Job Order',     href: '/customers',    icon: PlusCircleIcon },
  { label: 'Manage Inventory',  href: '/inventory',    icon: CubeIcon },
  { label: 'View Invoices',     href: '/billing',      icon: BanknotesIcon },
  { label: 'Schedule Appointment', href: '/appointments', icon: CalendarDaysIcon },
]

const upcomingAppts = [
  { id: 1, name: 'Maria Santos',    time: '9:00 AM', type: 'Final Fitting' },
  { id: 2, name: 'Ana Dela Cruz',   time: '11:00 AM', type: 'Measurement' },
  { id: 3, name: 'Carlo Mendoza',   time: '2:00 PM', type: 'Order Pickup' },
]

const statusClass = (status: string) => {
  const map: Record<string, string> = {
    'In Progress': 'badge badge-blue',
    'Pending':     'badge badge-yellow',
    'Ready':       'badge badge-green',
    'Completed':   'badge badge-gray',
    'Cancelled':   'badge badge-red',
  }
  return map[status] ?? 'badge badge-gray'
}
</script>

<style scoped>
.stat-card {
  background: white;
  border-radius: 1rem;
  padding: 1.25rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04);
  border: 1px solid rgba(15,23,42,0.06);
}
.stat-icon {
  padding: 0.5rem;
  border-radius: 0.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.stat-badge {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.5rem;
  border-radius: 9999px;
}
.stat-value {
  font-size: 1.75rem;
  font-weight: 800;
  color: #0F172A;
  line-height: 1;
  margin-bottom: 0.25rem;
}
.stat-label { font-size: 0.8rem; color: #64748B; font-weight: 500; }
.card {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 1px 3px rgba(0,0,0,0.06);
  border: 1px solid rgba(15,23,42,0.06);
}
.card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem; }
.card-title { font-size: 1rem; font-weight: 700; color: #0F172A; }
.view-all-link { font-size: 0.8rem; color: #009E97; font-weight: 600; }
.view-all-link:hover { color: #007A75; }
.table-head th {
  text-align: left;
  font-size: 0.7rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #94A3B8;
  padding: 0.5rem 0.75rem;
  background: #F8FAFC;
}
.table-row-hover td { padding: 0.85rem 0.75rem; }
.table-row-hover:hover td { background: #F8FAFC; }
.badge {
  display: inline-block;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.6rem;
  border-radius: 9999px;
}
.badge-blue   { background: #EFF6FF; color: #2563EB; }
.badge-yellow { background: #FFFBEB; color: #D97706; }
.badge-green  { background: #F0FDF4; color: #16A34A; }
.badge-gray   { background: #F1F5F9; color: #475569; }
.badge-red    { background: #FEF2F2; color: #DC2626; }
.quick-action-btn {
  display: flex;
  align-items: center;
  gap: 0.625rem;
  padding: 0.625rem 0.875rem;
  border-radius: 0.625rem;
  font-size: 0.85rem;
  font-weight: 500;
  color: #334155;
  background: #F8FAFC;
  border: 1px solid #E2E8F0;
  cursor: pointer;
  transition: all 0.15s;
}
.quick-action-btn:hover {
  background: rgba(0,158,151,0.06);
  border-color: rgba(0,158,151,0.35);
  color: #007A75;
}
.appt-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #009E97;
  margin-top: 5px;
  flex-shrink: 0;
}
.icon-teal { background: rgba(0,158,151,0.12); color: #009E97; }
.dash-mobile-card { background: #F8FAFC; border-radius: 0.75rem; padding: 0.75rem; border: 1px solid #E2E8F0; }
</style>
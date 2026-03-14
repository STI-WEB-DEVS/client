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
        <div class="overflow-x-auto">
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
      </div>

      <!-- Quick Actions + Upcoming -->
      <div class="space-y-6">
        <!-- Quick Actions -->
        <div class="card">
          <h2 class="card-title mb-4">Quick Actions</h2>
          <div class="space-y-2">
            <NuxtLink v-for="action in quickActions" :key="action.label" :to="action.href"
              class="quick-action-btn">
              <component :is="action.icon" class="size-4 text-amber-500" />
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
import {
  ShoppingBagIcon, UsersIcon, ExclamationTriangleIcon, CalendarDaysIcon,
  PlusCircleIcon, CubeIcon, BanknotesIcon,
} from '@heroicons/vue/24/outline'

const stats = [
  { label: 'Total Job Orders', value: '248', trend: 12, icon: ShoppingBagIcon, iconBg: 'bg-blue-100 text-blue-600' },
  { label: 'Active Customers', value: '91', trend: 8, icon: UsersIcon, iconBg: 'bg-emerald-100 text-emerald-600' },
  { label: 'Low Stock Alerts', value: '5', trend: -3, icon: ExclamationTriangleIcon, iconBg: 'bg-red-100 text-red-500' },
  { label: "Today's Appointments", value: '7', trend: 16, icon: CalendarDaysIcon, iconBg: 'bg-amber-100 text-amber-600' },
]

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
.view-all-link { font-size: 0.8rem; color: #F59E0B; font-weight: 600; }
.view-all-link:hover { color: #D97706; }
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
  background: #FFF7ED;
  border-color: #FCD34D;
  color: #92400E;
}
.appt-dot {
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #F59E0B;
  margin-top: 5px;
  flex-shrink: 0;
}
</style>
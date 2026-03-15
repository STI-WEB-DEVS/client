<template>
  <NuxtLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Customers & Orders</h2>
        <p class="text-sm text-slate-500 mt-0.5">Manage customer profiles and job orders</p>
      </div>
      <button @click="openAdd" class="btn-teal">+ New Customer</button>
    </div>

    <!-- Tabs -->
    <div class="flex gap-1 mb-6 p-1 bg-slate-100 rounded-xl w-fit">
      <button v-for="tab in tabs" :key="tab" @click="activeTab = tab"
        :class="['tab-btn', activeTab === tab ? 'tab-active' : '']">{{ tab }}</button>
    </div>

    <!-- Customers Table -->
    <div v-if="activeTab === 'Customers'" class="card">
      <!-- Desktop table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Customer</th><th class="th">Contact</th>
              <th class="th">Orders</th><th class="th">Last Order</th>
              <th class="th">Status</th><th class="th">Actions</th>
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
              <td class="td"><span :class="c.active ? 'badge-green' : 'badge-gray'">{{ c.active ? 'Active' : 'Inactive' }}</span></td>
              <td class="td">
                <div class="flex items-center gap-2">
                  <button @click="viewCustomer(c)" class="action-btn text-blue-600 hover:bg-blue-50">View</button>
                  <button @click="editCustomer(c)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
                  <button @click="deleteCustomer(c)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Mobile cards -->
      <div class="md:hidden space-y-3">
        <div v-for="c in customers" :key="c.id" class="mobile-card">
          <div class="flex items-center gap-3 mb-3">
            <div class="avatar">{{ c.name[0] }}</div>
            <div class="min-w-0">
              <p class="font-semibold text-slate-800 truncate">{{ c.name }}</p>
              <p class="text-xs text-slate-400 truncate">{{ c.email }}</p>
            </div>
            <span :class="c.active ? 'badge-green ml-auto shrink-0' : 'badge-gray ml-auto shrink-0'">{{ c.active ? 'Active' : 'Inactive' }}</span>
          </div>
          <div class="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-3">
            <span>📞 {{ c.phone }}</span>
            <span>🛍 {{ c.orders }} orders</span>
            <span class="col-span-2">📅 Last: {{ c.lastOrder }}</span>
          </div>
          <div class="flex gap-2 pt-2 border-t border-slate-100">
            <button @click="viewCustomer(c)" class="action-btn text-blue-600 hover:bg-blue-50">View</button>
            <button @click="editCustomer(c)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
            <button @click="deleteCustomer(c)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- Job Orders Table -->
    <div v-if="activeTab === 'Job Orders'" class="card">
      <div class="flex justify-between items-center mb-4">
        <h3 class="section-title">Job Orders</h3>
        <button @click="openAddOrder" class="btn-teal">+ New Order</button>
      </div>
      <!-- Desktop table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Order #</th><th class="th">Customer</th>
              <th class="th">Garment</th><th class="th">Measurements</th>
              <th class="th">Due</th><th class="th">Status</th><th class="th">Actions</th>
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
              <td class="td">
                <div class="flex items-center gap-2">
                  <button @click="viewOrder(o)" class="action-btn text-blue-600 hover:bg-blue-50">View</button>
                  <button @click="editOrder(o)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
                  <button @click="deleteOrder(o)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- Mobile cards -->
      <div class="md:hidden space-y-3">
        <div v-for="o in orders" :key="o.id" class="mobile-card">
          <div class="flex items-start justify-between mb-2">
            <span class="font-mono font-bold text-slate-600 text-sm">{{ o.id }}</span>
            <span :class="statusClass(o.status)">{{ o.status }}</span>
          </div>
          <p class="font-semibold text-slate-800">{{ o.customer }}</p>
          <p class="text-sm text-slate-500 mt-0.5">{{ o.type }}</p>
          <p class="text-xs text-slate-400 mt-1">📅 Due: {{ o.due }}</p>
          <div class="flex gap-2 pt-2 mt-2 border-t border-slate-100">
            <button @click="viewOrder(o)" class="action-btn text-blue-600 hover:bg-blue-50">View</button>
            <button @click="editOrder(o)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
            <button @click="deleteOrder(o)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── CUSTOMER MODAL ─── -->
    <div v-if="showCustomerModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">{{ modalMode === 'view' ? 'Customer Details' : modalMode === 'edit' ? 'Edit Customer' : 'New Customer' }}</h3>
          <button @click="closeModals" class="modal-close">✕</button>
        </div>
        <div v-if="modalMode === 'view'" class="space-y-4 p-6">
          <div class="flex items-center gap-4 mb-4">
            <div class="avatar-lg">{{ selectedCustomer?.name?.[0] }}</div>
            <div>
              <h4 class="text-xl font-bold text-slate-800">{{ selectedCustomer?.name }}</h4>
              <p class="font-semibold text-sm" style="color:#009E97">Customer #{{ selectedCustomer?.id }}</p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div class="info-block"><p class="info-label">Email</p><p class="info-val">{{ selectedCustomer?.email }}</p></div>
            <div class="info-block"><p class="info-label">Phone</p><p class="info-val">{{ selectedCustomer?.phone }}</p></div>
            <div class="info-block"><p class="info-label">Total Orders</p><p class="info-val">{{ selectedCustomer?.orders }}</p></div>
            <div class="info-block"><p class="info-label">Last Order</p><p class="info-val">{{ selectedCustomer?.lastOrder }}</p></div>
            <div class="info-block"><p class="info-label">Address</p><p class="info-val">{{ selectedCustomer?.address }}</p></div>
            <div class="info-block"><p class="info-label">Status</p><p class="info-val"><span :class="selectedCustomer?.active ? 'badge-green' : 'badge-gray'">{{ selectedCustomer?.active ? 'Active' : 'Inactive' }}</span></p></div>
          </div>
          <div class="info-block mt-2"><p class="info-label">Measurements (cm)</p>
            <p class="info-val">Bust: {{ selectedCustomer?.mBust }} · Waist: {{ selectedCustomer?.mWaist }} · Hip: {{ selectedCustomer?.mHip }} · Shoulder: {{ selectedCustomer?.mShoulder }}</p>
          </div>
        </div>
        <form v-else @submit.prevent="saveCustomer" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label>Full Name *</label><input v-model="form.name" type="text" class="form-input" required /></div>
            <div class="form-group"><label>Phone *</label><input v-model="form.phone" type="text" class="form-input" required /></div>
            <div class="form-group"><label>Email</label><input v-model="form.email" type="email" class="form-input" /></div>
            <div class="form-group"><label>Status</label>
              <select v-model="form.active" class="form-input">
                <option :value="true">Active</option><option :value="false">Inactive</option>
              </select>
            </div>
            <div class="form-group col-span-2"><label>Address</label><input v-model="form.address" type="text" class="form-input" /></div>
          </div>
          <p class="text-xs font-bold text-slate-500 uppercase tracking-wide mt-2">Body Measurements (cm)</p>
          <div class="grid grid-cols-4 gap-3">
            <div class="form-group"><label>Bust</label><input v-model="form.mBust" type="number" class="form-input" /></div>
            <div class="form-group"><label>Waist</label><input v-model="form.mWaist" type="number" class="form-input" /></div>
            <div class="form-group"><label>Hip</label><input v-model="form.mHip" type="number" class="form-input" /></div>
            <div class="form-group"><label>Shoulder</label><input v-model="form.mShoulder" type="number" class="form-input" /></div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeModals" class="btn-outline">Cancel</button>
            <button type="submit" class="btn-teal">{{ modalMode === 'edit' ? 'Update' : 'Add Customer' }}</button>
          </div>
        </form>
        <div v-if="modalMode === 'view'" class="px-6 pb-6 flex justify-end gap-3">
          <button @click="editCustomer(selectedCustomer)" class="btn-outline">Edit</button>
          <button @click="closeModals" class="btn-teal">Close</button>
        </div>
      </div>
    </div>

    <!-- ─── ORDER MODAL ─── -->
    <div v-if="showOrderModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">{{ orderModalMode === 'view' ? 'Order Details' : orderModalMode === 'edit' ? 'Edit Order' : 'New Job Order' }}</h3>
          <button @click="closeModals" class="modal-close">✕</button>
        </div>
        <div v-if="orderModalMode === 'view'" class="p-6 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="info-block"><p class="info-label">Order #</p><p class="info-val font-mono font-bold">{{ selectedOrder?.id }}</p></div>
            <div class="info-block"><p class="info-label">Customer</p><p class="info-val">{{ selectedOrder?.customer }}</p></div>
            <div class="info-block"><p class="info-label">Garment</p><p class="info-val">{{ selectedOrder?.type }}</p></div>
            <div class="info-block"><p class="info-label">Due Date</p><p class="info-val">{{ selectedOrder?.due }}</p></div>
            <div class="info-block"><p class="info-label">Status</p><p class="info-val"><span :class="statusClass(selectedOrder?.status)">{{ selectedOrder?.status }}</span></p></div>
            <div class="info-block col-span-2"><p class="info-label">Measurements</p><p class="info-val">{{ selectedOrder?.measurements }}</p></div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button @click="editOrder(selectedOrder)" class="btn-outline">Edit</button>
            <button @click="closeModals" class="btn-teal">Close</button>
          </div>
        </div>
        <form v-else @submit.prevent="saveOrder" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label>Customer *</label>
              <select v-model="orderForm.customer" class="form-input" required>
                <option v-for="c in customers" :key="c.id" :value="c.name">{{ c.name }}</option>
              </select>
            </div>
            <div class="form-group"><label>Garment Type *</label><input v-model="orderForm.type" type="text" class="form-input" required /></div>
            <div class="form-group"><label>Due Date *</label><input v-model="orderForm.due" type="date" class="form-input" required /></div>
            <div class="form-group"><label>Status</label>
              <select v-model="orderForm.status" class="form-input">
                <option>Pending</option><option>In Progress</option><option>Ready</option><option>Completed</option>
              </select>
            </div>
            <div class="form-group col-span-2"><label>Measurements</label><input v-model="orderForm.measurements" type="text" class="form-input" placeholder='e.g. Bust 34" Waist 28" Hip 38"' /></div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeModals" class="btn-outline">Cancel</button>
            <button type="submit" class="btn-teal">{{ orderModalMode === 'edit' ? 'Update Order' : 'Create Order' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box max-w-sm">
        <div class="p-6 text-center">
          <div class="size-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span class="text-2xl">🗑️</span>
          </div>
          <h3 class="text-lg font-bold text-slate-800">Confirm Delete</h3>
          <p class="text-sm text-slate-500 mt-2">Are you sure you want to delete <strong>{{ deleteTarget?.name || deleteTarget?.id }}</strong>? This cannot be undone.</p>
          <div class="flex justify-center gap-3 mt-5">
            <button @click="closeModals" class="btn-outline">Cancel</button>
            <button @click="confirmDelete" class="btn-danger">Delete</button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const tabs = ['Customers', 'Job Orders']
const activeTab = ref('Customers')

// ── Modal states ──
const showCustomerModal = ref(false)
const showOrderModal = ref(false)
const showDeleteConfirm = ref(false)
const modalMode = ref<'add'|'edit'|'view'>('add')
const orderModalMode = ref<'add'|'edit'|'view'>('add')
const selectedCustomer = ref<any>(null)
const selectedOrder = ref<any>(null)
const deleteTarget = ref<any>(null)
const deleteType = ref<'customer'|'order'>('customer')

// ── Customer data ──
const customers = reactive([
  { id: 1, name: 'Maria Santos', email: 'maria@email.com', phone: '09171234567', orders: 5, lastOrder: 'Mar 10, 2026', active: true, address: '123 Rizal St., QC', mBust: 86, mWaist: 71, mHip: 96, mShoulder: 38 },
  { id: 2, name: 'Jose Reyes', email: 'jose@email.com', phone: '09281234567', orders: 2, lastOrder: 'Mar 8, 2026', active: true, address: '45 Mabini Ave., Makati', mBust: 96, mWaist: 81, mHip: 0, mShoulder: 44 },
  { id: 3, name: 'Ana Dela Cruz', email: 'ana@email.com', phone: '09391234567', orders: 8, lastOrder: 'Mar 12, 2026', active: true, address: '78 Luna St., Pasig', mBust: 91, mWaist: 66, mHip: 99, mShoulder: 37 },
  { id: 4, name: 'Carlo Mendoza', email: 'carlo@email.com', phone: '09451234567', orders: 1, lastOrder: 'Feb 28, 2026', active: false, address: '9 Burgos Blvd., Taguig', mBust: 101, mWaist: 86, mHip: 0, mShoulder: 46 },
  { id: 5, name: 'Liza Villanueva', email: 'liza@email.com', phone: '09551234567', orders: 3, lastOrder: 'Mar 5, 2026', active: true, address: '321 Bonifacio St., Mandaluyong', mBust: 89, mWaist: 66, mHip: 94, mShoulder: 36 },
  { id: 6, name: 'Pedro Garcia', email: 'pedro@email.com', phone: '09661234567', orders: 6, lastOrder: 'Mar 1, 2026', active: true, address: '56 Lapu-Lapu Ave., Manila', mBust: 99, mWaist: 84, mHip: 0, mShoulder: 45 },
])

const orders = reactive([
  { id: 'JO-001', customer: 'Maria Santos', type: 'School Uniform', measurements: 'Bust 34" Waist 28" Hip 38"', due: '2026-03-16', status: 'In Progress' },
  { id: 'JO-002', customer: 'Jose Reyes', type: 'Alteration – Pants', measurements: 'Waist 32" Length 28"', due: '2026-03-17', status: 'Pending' },
  { id: 'JO-003', customer: 'Ana Dela Cruz', type: 'Barong Tagalog', measurements: 'Chest 40" Shoulder 18"', due: '2026-03-15', status: 'Ready' },
  { id: 'JO-004', customer: 'Carlo Mendoza', type: 'Polo Uniform (3 pcs)', measurements: 'Chest 38" Waist 34"', due: '2026-03-20', status: 'In Progress' },
  { id: 'JO-005', customer: 'Liza Villanueva', type: 'Evening Dress', measurements: 'Bust 36" Waist 26" Hip 39"', due: '2026-03-18', status: 'Ready' },
])

// ── Forms ──
const form = reactive({ name:'', email:'', phone:'', active:true, address:'', mBust:0, mWaist:0, mHip:0, mShoulder:0 })
const orderForm = reactive({ customer:'', type:'', due:'', measurements:'', status:'Pending' })

let nextCustomerId = 7
let nextOrderNum = 6

// ── Customer actions ──
const openAdd = () => { Object.assign(form, { name:'',email:'',phone:'',active:true,address:'',mBust:0,mWaist:0,mHip:0,mShoulder:0 }); modalMode.value='add'; showCustomerModal.value=true }
const viewCustomer = (c: any) => { selectedCustomer.value={...c}; modalMode.value='view'; showCustomerModal.value=true }
const editCustomer = (c: any) => { selectedCustomer.value=c; Object.assign(form, {...c}); modalMode.value='edit'; showCustomerModal.value=true }
const deleteCustomer = (c: any) => { deleteTarget.value=c; deleteType.value='customer'; showDeleteConfirm.value=true }
const saveCustomer = () => {
  if (modalMode.value === 'add') {
    customers.push({ id: nextCustomerId++, orders: 0, lastOrder: '—', ...JSON.parse(JSON.stringify(form)) })
  } else {
    const i = customers.findIndex(c => c.id === selectedCustomer.value?.id)
    if (i !== -1) Object.assign(customers[i], { ...form })
  }
  closeModals()
}

// ── Order actions ──
const openAddOrder = () => { Object.assign(orderForm, {customer:'',type:'',due:'',measurements:'',status:'Pending'}); orderModalMode.value='add'; showOrderModal.value=true }
const viewOrder = (o: any) => { selectedOrder.value={...o}; orderModalMode.value='view'; showOrderModal.value=true }
const editOrder = (o: any) => { selectedOrder.value=o; Object.assign(orderForm, {...o}); orderModalMode.value='edit'; showOrderModal.value=true }
const deleteOrder = (o: any) => { deleteTarget.value=o; deleteType.value='order'; showDeleteConfirm.value=true }
const saveOrder = () => {
  if (orderModalMode.value === 'add') {
    orders.push({ id:`JO-00${nextOrderNum++}`, ...JSON.parse(JSON.stringify(orderForm)) })
  } else {
    const i = orders.findIndex(o => o.id === selectedOrder.value?.id)
    if (i !== -1) Object.assign(orders[i], { ...orderForm })
  }
  closeModals()
}

// ── Delete ──
const confirmDelete = () => {
  if (deleteType.value === 'customer') {
    const i = customers.findIndex(c => c.id === deleteTarget.value?.id); if(i!==-1) customers.splice(i,1)
  } else {
    const i = orders.findIndex(o => o.id === deleteTarget.value?.id); if(i!==-1) orders.splice(i,1)
  }
  closeModals()
}

const closeModals = () => { showCustomerModal.value=false; showOrderModal.value=false; showDeleteConfirm.value=false }

const statusClass = (s: string) => {
  const m: Record<string,string> = { 'In Progress':'badge-blue','Pending':'badge-yellow','Ready':'badge-green','Completed':'badge-gray' }
  return m[s] || 'badge-gray'
}
</script>

<style scoped>
.card { background:white; border-radius:1rem; padding:1.5rem; box-shadow:0 1px 3px rgba(0,0,0,0.06); border:1px solid rgba(15,23,42,0.06); }
.section-title { font-size:1rem; font-weight:700; color:#0F172A; }
.th { text-align:left; font-size:0.7rem; font-weight:700; text-transform:uppercase; letter-spacing:0.07em; color:#94A3B8; padding:0.6rem 0.875rem; background:#F8FAFC; }
.td { padding:0.85rem 0.875rem; }
.tr-hover:hover td { background:#FAFBFC; }
.avatar { width:34px; height:34px; border-radius:50%; background:linear-gradient(135deg,#009E97,#007A75); color:white; font-weight:700; font-size:0.8rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.avatar-lg { width:56px; height:56px; border-radius:50%; background:linear-gradient(135deg,#009E97,#007A75); color:white; font-weight:800; font-size:1.4rem; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
.badge-green { display:inline-block; font-size:0.7rem; font-weight:600; padding:0.2rem 0.6rem; border-radius:9999px; background:#F0FDF4; color:#16A34A; }
.badge-gray { display:inline-block; font-size:0.7rem; font-weight:600; padding:0.2rem 0.6rem; border-radius:9999px; background:#F1F5F9; color:#475569; }
.badge-blue { display:inline-block; font-size:0.7rem; font-weight:600; padding:0.2rem 0.6rem; border-radius:9999px; background:#EFF6FF; color:#2563EB; }
.badge-yellow { display:inline-block; font-size:0.7rem; font-weight:600; padding:0.2rem 0.6rem; border-radius:9999px; background:#FFFBEB; color:#D97706; }
.action-btn { font-size:0.75rem; font-weight:600; padding:0.25rem 0.6rem; border-radius:0.5rem; border:none; cursor:pointer; transition:all 0.15s; background:transparent; }
.btn-teal { background:linear-gradient(135deg,#009E97,#007A75); color:#fff; font-weight:700; font-size:0.85rem; padding:0.6rem 1.25rem; border-radius:0.625rem; border:none; cursor:pointer; transition:all 0.15s; }
.btn-teal:hover { box-shadow:0 4px 12px rgba(0,158,151,0.35); transform:translateY(-1px); }
.btn-outline { background:white; color:#64748B; font-weight:600; font-size:0.85rem; padding:0.6rem 1.25rem; border-radius:0.625rem; border:1px solid #E2E8F0; cursor:pointer; transition:all 0.15s; }
.btn-outline:hover { background:#F8FAFC; }
.btn-danger { background:#DC2626; color:white; font-weight:700; font-size:0.85rem; padding:0.6rem 1.25rem; border-radius:0.625rem; border:none; cursor:pointer; }
.btn-danger:hover { background:#B91C1C; }
.tab-btn { padding:0.375rem 1rem; border-radius:0.625rem; font-size:0.85rem; font-weight:600; color:#64748B; border:none; background:transparent; cursor:pointer; }
.tab-active { background:white; color:#0F172A; box-shadow:0 1px 3px rgba(0,0,0,0.1); }
.modal-overlay { position:fixed; inset:0; background:rgba(15,23,42,0.6); backdrop-filter:blur(4px); z-index:100; display:flex; align-items:center; justify-content:center; padding:1rem; }
.modal-box { background:white; border-radius:1.25rem; width:100%; max-width:560px; max-height:90vh; overflow-y:auto; box-shadow:0 25px 60px rgba(0,0,0,0.2); }
.modal-header { display:flex; justify-content:space-between; align-items:center; padding:1.25rem 1.5rem; border-bottom:1px solid #F1F5F9; }
.modal-title { font-size:1.1rem; font-weight:800; color:#0F172A; }
.modal-close { background:none; border:none; font-size:1.1rem; color:#94A3B8; cursor:pointer; padding:0.25rem 0.5rem; border-radius:0.5rem; }
.modal-close:hover { background:#F1F5F9; }
.info-block { background:#F8FAFC; border-radius:0.625rem; padding:0.75rem; }
.info-label { font-size:0.7rem; font-weight:600; text-transform:uppercase; letter-spacing:0.05em; color:#94A3B8; margin-bottom:0.25rem; }
.info-val { font-size:0.875rem; font-weight:600; color:#0F172A; }
.form-group label { display:block; font-size:0.8rem; font-weight:600; color:#64748B; margin-bottom:0.375rem; }
.form-input { width:100%; background:#F8FAFC; border:1px solid #E2E8F0; border-radius:0.625rem; padding:0.6rem 0.875rem; font-size:0.875rem; color:#0F172A; outline:none; }
.form-input:focus { border-color:#009E97; box-shadow:0 0 0 3px rgba(0,158,151,0.12); }
.mobile-card { background:#F8FAFC; border-radius:0.75rem; padding:0.875rem; border:1px solid #E2E8F0; }
</style>

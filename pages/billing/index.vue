<template>
  <NuxtLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Billing & Payments</h2>
        <p class="text-sm text-slate-500 mt-0.5">Generate invoices and track payment records</p>
      </div>
      <button @click="openAddInvoice" class="btn-amber">+ New Invoice</button>
    </div>

    <!-- Summary -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="mini-card"><p class="mini-value text-slate-800">₱ {{ totalBilled.toLocaleString() }}</p><p class="mini-label">Total Billed</p></div>
      <div class="mini-card"><p class="mini-value text-emerald-600">₱ {{ totalPaid.toLocaleString() }}</p><p class="mini-label">Paid</p></div>
      <div class="mini-card"><p class="mini-value text-amber-600">₱ {{ totalPending.toLocaleString() }}</p><p class="mini-label">Pending</p></div>
      <div class="mini-card"><p class="mini-value text-red-600">₱ {{ totalOverdue.toLocaleString() }}</p><p class="mini-label">Overdue</p></div>
    </div>

    <!-- Invoices -->
    <div class="card">
      <div class="flex items-center justify-between mb-4">
        <h3 class="section-title">Invoices</h3>
        <div class="flex gap-2">
          <button v-for="f in filters" :key="f" @click="activeFilter=f" :class="['filter-btn',activeFilter===f?'filter-active':'']">{{ f }}</button>
        </div>
      </div>
      <div class="overflow-x-auto">
        <table class="w-full text-sm">
          <thead>
            <tr>
              <th class="th">Invoice #</th><th class="th">Customer</th>
              <th class="th">Order Ref</th><th class="th">Amount</th>
              <th class="th">Date</th><th class="th">Status</th><th class="th">Actions</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-100">
            <tr v-for="inv in filteredInvoices" :key="inv.id" class="tr-hover">
              <td class="td font-mono font-bold text-slate-600">{{ inv.id }}</td>
              <td class="td font-medium text-slate-800">{{ inv.customer }}</td>
              <td class="td text-slate-400 text-xs">{{ inv.order }}</td>
              <td class="td font-bold text-slate-800">₱ {{ inv.amount.toLocaleString() }}</td>
              <td class="td text-slate-500">{{ inv.date }}</td>
              <td class="td"><span :class="statusClass(inv.status)">{{ inv.status }}</span></td>
              <td class="td">
                <div class="flex items-center gap-1">
                  <button @click="viewInvoice(inv)" class="action-btn text-blue-600 hover:bg-blue-50">View</button>
                  <button @click="printInvoice(inv)" class="action-btn text-emerald-600 hover:bg-emerald-50">Print</button>
                  <button @click="editInvoice(inv)" class="action-btn text-amber-600 hover:bg-amber-50">Edit</button>
                  <button @click="deleteInvoice(inv)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <!-- ─── INVOICE MODAL (View/Add/Edit) ─── -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box max-w-2xl">
        <div class="modal-header">
          <h3 class="modal-title">{{ invMode==='view'?`Invoice ${selected?.id}`:invMode==='edit'?'Edit Invoice':'New Invoice' }}</h3>
          <div class="flex items-center gap-2">
            <button v-if="invMode==='view'" @click="printInvoice(selected)" class="btn-print">🖨 Print</button>
            <button @click="closeModals" class="modal-close">✕</button>
          </div>
        </div>

        <!-- VIEW: printable invoice layout -->
        <div v-if="invMode==='view'" id="print-area" class="p-8">
          <!-- Invoice Header -->
          <div class="flex justify-between items-start mb-8">
            <div>
              <div class="flex items-center gap-2 mb-1">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="size-6 text-amber-500">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M7.5 21 3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
                <span class="text-xl font-extrabold text-slate-800">TailorTrack</span>
              </div>
              <p class="text-sm text-slate-500">Sampaguita Tailoring Shop</p>
              <p class="text-xs text-slate-400">123 Rizal St., Quezon City · 09171234567</p>
            </div>
            <div class="text-right">
              <p class="text-2xl font-extrabold text-slate-800">INVOICE</p>
              <p class="font-mono font-bold text-amber-600 text-lg mt-1">{{ selected?.id }}</p>
              <span :class="statusClass(selected?.status)" class="mt-2 inline-block">{{ selected?.status }}</span>
            </div>
          </div>
          <div class="flex justify-between mb-6 text-sm">
            <div><p class="font-semibold text-slate-700 mb-1">Bill To:</p><p class="font-bold text-slate-800">{{ selected?.customer }}</p></div>
            <div class="text-right">
              <div class="flex gap-8">
                <div><p class="text-slate-400 text-xs">Invoice Date</p><p class="font-semibold text-slate-700">{{ selected?.date }}</p></div>
                <div><p class="text-slate-400 text-xs">Due Date</p><p class="font-semibold text-slate-700">{{ selected?.due }}</p></div>
              </div>
            </div>
          </div>
          <table class="w-full text-sm mb-6">
            <thead><tr class="bg-slate-800 text-white"><th class="text-left p-3 rounded-tl">Description</th><th class="text-left p-3">Order Ref</th><th class="text-right p-3 rounded-tr">Amount</th></tr></thead>
            <tbody><tr class="border-b border-slate-100"><td class="p-3">{{ selected?.description || selected?.type }}</td><td class="p-3 text-slate-500">{{ selected?.order }}</td><td class="p-3 text-right font-bold">₱ {{ selected?.amount?.toLocaleString() }}</td></tr></tbody>
            <tfoot>
              <tr><td colspan="2" class="p-3 text-right font-semibold text-slate-600">Subtotal</td><td class="p-3 text-right font-semibold">₱ {{ selected?.amount?.toLocaleString() }}</td></tr>
              <tr class="bg-slate-50"><td colspan="2" class="p-3 text-right font-extrabold text-slate-800">TOTAL</td><td class="p-3 text-right font-extrabold text-lg text-amber-600">₱ {{ selected?.amount?.toLocaleString() }}</td></tr>
            </tfoot>
          </table>
          <div class="border-t border-slate-200 pt-4 text-xs text-slate-400 text-center">Thank you for trusting TailorTrack! · Generated {{ new Date().toLocaleDateString() }}</div>
          <div class="flex justify-end gap-3 mt-6 print:hidden">
            <button @click="editInvoice(selected)" class="btn-outline">Edit</button>
            <button @click="closeModals" class="btn-amber">Close</button>
          </div>
        </div>

        <!-- ADD / EDIT form -->
        <form v-else @submit.prevent="saveInvoice" class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div class="form-group"><label>Customer *</label><input v-model="form.customer" type="text" class="form-input" required placeholder="Customer name" /></div>
            <div class="form-group"><label>Order Reference</label><input v-model="form.order" type="text" class="form-input" placeholder="e.g. JO-001" /></div>
            <div class="form-group col-span-2"><label>Description</label><input v-model="form.description" type="text" class="form-input" placeholder="e.g. School Uniform x2" /></div>
            <div class="form-group"><label>Amount (₱) *</label><input v-model.number="form.amount" type="number" min="0" class="form-input" required /></div>
            <div class="form-group"><label>Status</label>
              <select v-model="form.status" class="form-input">
                <option>Pending</option><option>Paid</option><option>Overdue</option>
              </select>
            </div>
            <div class="form-group"><label>Invoice Date</label><input v-model="form.date" type="date" class="form-input" /></div>
            <div class="form-group"><label>Due Date</label><input v-model="form.due" type="date" class="form-input" /></div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeModals" class="btn-outline">Cancel</button>
            <button type="submit" class="btn-amber">{{ invMode==='edit'?'Update Invoice':'Create Invoice' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box max-w-sm">
        <div class="p-6 text-center">
          <div class="size-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><span class="text-2xl">🗑️</span></div>
          <h3 class="text-lg font-bold text-slate-800">Delete Invoice?</h3>
          <p class="text-sm text-slate-500 mt-2"><strong>{{ deleteTarget?.id }}</strong> – ₱ {{ deleteTarget?.amount?.toLocaleString() }}</p>
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
import { ref, reactive, computed } from 'vue'

const showModal = ref(false)
const showDeleteConfirm = ref(false)
const invMode = ref<'add'|'edit'|'view'>('add')
const selected = ref<any>(null)
const deleteTarget = ref<any>(null)
const filters = ['All','Paid','Pending','Overdue']
const activeFilter = ref('All')

const invoices = reactive([
  { id:'INV-001', customer:'Maria Santos', order:'JO-001', amount:3500, date:'Mar 10, 2026', due:'Mar 17, 2026', status:'Paid', description:'School Uniform (2 pcs)' },
  { id:'INV-002', customer:'Jose Reyes', order:'JO-002', amount:850, date:'Mar 11, 2026', due:'Mar 18, 2026', status:'Pending', description:'Pants Alteration' },
  { id:'INV-003', customer:'Ana Dela Cruz', order:'JO-003', amount:4200, date:'Mar 8, 2026', due:'Mar 15, 2026', status:'Paid', description:'Barong Tagalog' },
  { id:'INV-004', customer:'Carlo Mendoza', order:'JO-004', amount:7500, date:'Mar 5, 2026', due:'Mar 12, 2026', status:'Overdue', description:'Polo Uniform (3 pcs)' },
  { id:'INV-005', customer:'Liza Villanueva', order:'JO-005', amount:6000, date:'Mar 9, 2026', due:'Mar 16, 2026', status:'Pending', description:'Evening Dress' },
  { id:'INV-006', customer:'Pedro Garcia', order:'JO-006', amount:2200, date:'Mar 12, 2026', due:'Mar 19, 2026', status:'Paid', description:'Polo Shirt x2' },
])

const form = reactive({ customer:'', order:'', description:'', amount:0, status:'Pending', date:'', due:'' })
let nextInvNum = 7

const filteredInvoices = computed(() =>
  activeFilter.value==='All' ? invoices : invoices.filter(i=>i.status===activeFilter.value)
)
const totalBilled = computed(() => invoices.reduce((s,i)=>s+i.amount,0))
const totalPaid = computed(() => invoices.filter(i=>i.status==='Paid').reduce((s,i)=>s+i.amount,0))
const totalPending = computed(() => invoices.filter(i=>i.status==='Pending').reduce((s,i)=>s+i.amount,0))
const totalOverdue = computed(() => invoices.filter(i=>i.status==='Overdue').reduce((s,i)=>s+i.amount,0))

const formatD = (d:string) => { if(!d) return ''; const dt=new Date(d); return dt.toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'}) }

const openAddInvoice = () => {
  const today = new Date(); const due = new Date(); due.setDate(today.getDate()+7)
  Object.assign(form,{customer:'',order:'',description:'',amount:0,status:'Pending',date:today.toISOString().slice(0,10),due:due.toISOString().slice(0,10)})
  invMode.value='add'; showModal.value=true
}
const viewInvoice = (inv:any) => { selected.value={...inv}; invMode.value='view'; showModal.value=true }
const editInvoice = (inv:any) => { selected.value=inv; Object.assign(form,{...inv}); invMode.value='edit'; showModal.value=true; if(showDeleteConfirm.value) showDeleteConfirm.value=false }
const deleteInvoice = (inv:any) => { deleteTarget.value=inv; showDeleteConfirm.value=true }

const saveInvoice = () => {
  const dateStr = formatD(form.date) || new Date().toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'})
  const dueStr = formatD(form.due)
  if(invMode.value==='add') {
    invoices.push({ id:`INV-00${nextInvNum++}`, ...JSON.parse(JSON.stringify(form)), date:dateStr, due:dueStr })
  } else {
    const idx = invoices.findIndex(x=>x.id===selected.value?.id)
    if(idx!==-1) Object.assign(invoices[idx],{...form,date:dateStr,due:dueStr})
  }
  closeModals()
}

const confirmDelete = () => { const i=invoices.findIndex(x=>x.id===deleteTarget.value?.id); if(i!==-1) invoices.splice(i,1); closeModals() }
const closeModals = () => { showModal.value=false; showDeleteConfirm.value=false }

const printInvoice = (inv:any) => {
  selected.value={...inv}; invMode.value='view'; showModal.value=true
  setTimeout(()=>window.print(),200)
}

const statusClass = (s:string) => {
  const m:Record<string,string>={Paid:'badge-green',Pending:'badge-yellow',Overdue:'badge-red'}
  return m[s]||'badge-gray'
}
</script>

<style scoped>
.card{background:white;border-radius:1rem;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid rgba(15,23,42,0.06);}
.mini-card{background:white;border-radius:0.875rem;padding:1rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid rgba(15,23,42,0.06);text-align:center;}
.mini-value{font-size:1.35rem;font-weight:800;}
.mini-label{font-size:0.75rem;color:#94A3B8;margin-top:2px;}
.section-title{font-size:1rem;font-weight:700;color:#0F172A;}
.th{text-align:left;font-size:0.7rem;font-weight:700;text-transform:uppercase;letter-spacing:0.07em;color:#94A3B8;padding:0.6rem 0.875rem;background:#F8FAFC;}
.td{padding:0.9rem 0.875rem;}
.tr-hover:hover td{background:#FAFBFC;}
.badge-green{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#F0FDF4;color:#16A34A;}
.badge-yellow{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#FFFBEB;color:#D97706;}
.badge-red{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#FEF2F2;color:#DC2626;}
.badge-gray{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#F1F5F9;color:#475569;}
.filter-btn{font-size:0.75rem;font-weight:600;padding:0.3rem 0.75rem;border-radius:0.5rem;border:1px solid #E2E8F0;background:white;color:#64748B;cursor:pointer;}
.filter-active{background:#F59E0B;border-color:#F59E0B;color:#0F172A;}
.action-btn{font-size:0.75rem;font-weight:600;padding:0.25rem 0.6rem;border-radius:0.5rem;border:none;cursor:pointer;transition:all 0.15s;background:transparent;}
.btn-amber{background:linear-gradient(135deg,#F59E0B,#D97706);color:#0F172A;font-weight:700;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:none;cursor:pointer;transition:all 0.15s;}
.btn-amber:hover{box-shadow:0 4px 12px rgba(245,158,11,0.35);transform:translateY(-1px);}
.btn-outline{background:white;color:#64748B;font-weight:600;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:1px solid #E2E8F0;cursor:pointer;}
.btn-danger{background:#DC2626;color:white;font-weight:700;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:none;cursor:pointer;}
.btn-print{background:#F0FDF4;color:#16A34A;font-weight:600;font-size:0.8rem;padding:0.4rem 0.875rem;border-radius:0.5rem;border:1px solid #BBF7D0;cursor:pointer;}
.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem;}
.modal-box{background:white;border-radius:1.25rem;width:100%;max-width:660px;max-height:90vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,0.2);}
.modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid #F1F5F9;}
.modal-title{font-size:1.1rem;font-weight:800;color:#0F172A;}
.modal-close{background:none;border:none;font-size:1.1rem;color:#94A3B8;cursor:pointer;padding:0.25rem 0.5rem;border-radius:0.5rem;}
.modal-close:hover{background:#F1F5F9;}
.form-group label{display:block;font-size:0.8rem;font-weight:600;color:#64748B;margin-bottom:0.375rem;}
.form-input{width:100%;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:0.625rem;padding:0.6rem 0.875rem;font-size:0.875rem;color:#0F172A;outline:none;}
.form-input:focus{border-color:#F59E0B;box-shadow:0 0 0 3px rgba(245,158,11,0.12);}
@media print{.modal-overlay{position:static!important;background:none!important;} .modal-box{box-shadow:none!important;max-height:none!important;} .print\\:hidden{display:none!important;} body *:not(#print-area):not(#print-area *){display:none!important;} #print-area{display:block!important;}}
</style>

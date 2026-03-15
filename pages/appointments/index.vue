<template>
  <NuxtLayout>
    <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
      <div>
        <h2 class="text-2xl font-bold text-slate-800">Appointments</h2>
        <p class="text-sm text-slate-500 mt-0.5">Schedule fittings, consultations and order pickups</p>
      </div>
      <button @click="openAddAppt" class="btn-teal">+ New Appointment</button>
    </div>

    <!-- Calendar strip -->
    <div class="card mb-6">
      <div class="flex items-center justify-between mb-4">
        <button class="cal-nav">‹ Prev</button>
        <h3 class="text-base font-bold text-slate-800">March 2026</h3>
        <button class="cal-nav">Next ›</button>
      </div>
      <div class="grid grid-cols-7 gap-1">
        <div v-for="d in dayLabels" :key="d" class="text-center text-xs font-semibold text-slate-400 py-1">{{ d }}</div>
        <div v-for="n in 31" :key="n"
          :class="['cal-day', n===14?'cal-today':appointments.some(a=>a.day===n)?'cal-has-event':'']">
          {{ n }}<span v-if="appointments.some(a=>a.day===n)" class="cal-dot"></span>
        </div>
      </div>
    </div>

    <!-- Appointment List -->
    <div class="space-y-6">
      <div v-for="group in groupedAppointments" :key="group.date">
        <div class="flex items-center gap-3 mb-3">
          <div class="day-badge">{{ group.day }}</div>
          <div>
            <p class="font-bold text-slate-800">{{ group.date }}</p>
            <p class="text-xs text-slate-400">{{ group.items.length }} appointment{{ group.items.length>1?'s':'' }}</p>
          </div>
        </div>
        <div class="grid gap-3">
          <div v-for="appt in group.items" :key="appt.id" class="appt-card">
            <!-- Top row: icon + info -->
            <div class="flex items-start gap-3 min-w-0">
              <div :class="['appt-type-icon',typeColor(appt.type)]">
                <component :is="typeIcon(appt.type)" class="size-4" />
              </div>
              <div class="min-w-0 flex-1">
                <p class="font-semibold text-slate-800 truncate">{{ appt.customer }}</p>
                <p class="text-sm text-slate-500 mt-0.5">{{ appt.type }}</p>
                <p class="text-xs text-slate-400 mt-1">📍 {{ appt.location }} &nbsp;·&nbsp; ⏰ {{ appt.time }}</p>
              </div>
            </div>
            <!-- Bottom row: badge + actions (wraps on mobile) -->
            <div class="flex items-center gap-2 mt-3 pt-3 border-t border-slate-100 flex-wrap">
              <span :class="appt.status==='Confirmed'?'badge-green':'badge-yellow'">{{ appt.status }}</span>
              <div class="ml-auto flex items-center gap-1 flex-wrap">
                <button @click="viewAppt(appt)" class="action-btn text-blue-600 hover:bg-blue-50">View</button>
                <button @click="editAppt(appt)" class="action-btn text-teal-600 hover:bg-teal-50">Edit</button>
                <button @click="deleteAppt(appt)" class="action-btn text-red-600 hover:bg-red-50">Delete</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- ─── APPOINTMENT MODAL ─── -->
    <div v-if="showModal" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box">
        <div class="modal-header">
          <h3 class="modal-title">{{ apptMode==='view'?'Appointment Details':apptMode==='edit'?'Edit Appointment':'New Appointment' }}</h3>
          <button @click="closeModals" class="modal-close">✕</button>
        </div>

        <!-- View mode -->
        <div v-if="apptMode==='view'" class="p-6 space-y-3">
          <div class="grid grid-cols-2 gap-3">
            <div class="info-block col-span-2"><p class="info-label">Customer</p><p class="info-val text-lg">{{ selected?.customer }}</p></div>
            <div class="info-block"><p class="info-label">Type</p><p class="info-val">{{ selected?.type }}</p></div>
            <div class="info-block"><p class="info-label">Status</p><p class="info-val"><span :class="selected?.status==='Confirmed'?'badge-green':'badge-yellow'">{{ selected?.status }}</span></p></div>
            <div class="info-block"><p class="info-label">Date</p><p class="info-val">{{ selected?.date }}</p></div>
            <div class="info-block"><p class="info-label">Time</p><p class="info-val">{{ selected?.time }}</p></div>
            <div class="info-block col-span-2"><p class="info-label">Location</p><p class="info-val">{{ selected?.location }}</p></div>
            <div class="info-block col-span-2"><p class="info-label">Notes</p><p class="info-val">{{ selected?.notes || '—' }}</p></div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button @click="editAppt(selected)" class="btn-outline">Edit</button>
            <button @click="closeModals" class="btn-teal">Close</button>
          </div>
        </div>

        <!-- Add / Edit form -->
        <form v-else @submit.prevent="saveAppt" class="p-6 space-y-4">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group sm:col-span-2"><label>Customer *</label>
              <input v-model="form.customer" type="text" class="form-input" placeholder="Customer name" required />
            </div>
            <div class="form-group"><label>Appointment Type *</label>
              <select v-model="form.type" class="form-input" required>
                <option>Final Fitting</option><option>Measurement</option>
                <option>Consultation</option><option>Order Pickup</option>
              </select>
            </div>
            <div class="form-group"><label>Status</label>
              <select v-model="form.status" class="form-input">
                <option>Confirmed</option><option>Pending</option><option>Cancelled</option>
              </select>
            </div>
            <div class="form-group"><label>Date *</label>
              <input v-model="form.dateInput" type="date" class="form-input" required />
            </div>
            <div class="form-group"><label>Time *</label>
              <input v-model="form.time" type="time" class="form-input" required />
            </div>
            <div class="form-group sm:col-span-2"><label>Location</label>
              <select v-model="form.location" class="form-input">
                <option>Shop</option><option>Home Visit</option><option>Online (Video Call)</option>
              </select>
            </div>
            <div class="form-group sm:col-span-2"><label>Notes</label>
              <textarea v-model="form.notes" class="form-input" rows="2" placeholder="Optional notes..."></textarea>
            </div>
          </div>
          <div class="flex justify-end gap-3 pt-2">
            <button type="button" @click="closeModals" class="btn-outline">Cancel</button>
            <button type="submit" class="btn-teal">{{ apptMode==='edit'?'Update':'Schedule' }}</button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirm -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click.self="closeModals">
      <div class="modal-box max-w-sm">
        <div class="p-6 text-center">
          <div class="size-14 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4"><span class="text-2xl">🗑️</span></div>
          <h3 class="text-lg font-bold text-slate-800">Cancel Appointment?</h3>
          <p class="text-sm text-slate-500 mt-2"><strong>{{ deleteTarget?.customer }}</strong> – {{ deleteTarget?.date }} at {{ deleteTarget?.time }}</p>
          <div class="flex justify-center gap-3 mt-5">
            <button @click="closeModals" class="btn-outline">Keep</button>
            <button @click="confirmDelete" class="btn-danger">Remove</button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { ScissorsIcon, UserIcon, ArchiveBoxIcon } from '@heroicons/vue/24/outline'

const dayLabels = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']
const showModal = ref(false)
const showDeleteConfirm = ref(false)
const apptMode = ref<'add'|'edit'|'view'>('add')
const selected = ref<any>(null)
const deleteTarget = ref<any>(null)

const appointments = reactive([
  { id:1, customer:'Maria Santos', type:'Final Fitting', time:'9:00 AM', location:'Shop', day:14, date:'Saturday, March 14', status:'Confirmed', notes:'' },
  { id:2, customer:'Ana Dela Cruz', type:'Measurement', time:'11:00 AM', location:'Shop', day:14, date:'Saturday, March 14', status:'Confirmed', notes:'' },
  { id:3, customer:'Carlo Mendoza', type:'Order Pickup', time:'2:00 PM', location:'Shop', day:14, date:'Saturday, March 14', status:'Pending', notes:'' },
  { id:4, customer:'Jose Reyes', type:'Consultation', time:'10:00 AM', location:'Shop', day:16, date:'Monday, March 16', status:'Confirmed', notes:'' },
  { id:5, customer:'Liza Villanueva', type:'Final Fitting', time:'3:00 PM', location:'Home Visit', day:16, date:'Monday, March 16', status:'Pending', notes:'' },
  { id:6, customer:'Pedro Garcia', type:'Order Pickup', time:'9:30 AM', location:'Shop', day:17, date:'Tuesday, March 17', status:'Confirmed', notes:'' },
])
let nextId = 7

const form = reactive({ customer:'', type:'Final Fitting', status:'Confirmed', dateInput:'', time:'', location:'Shop', notes:'' })

const groupedAppointments = computed(() => {
  const groups: Record<string,any> = {}
  for(const a of appointments) {
    if(!groups[a.date]) groups[a.date]={ date:a.date, day:a.day, items:[] }
    groups[a.date].items.push(a)
  }
  return Object.values(groups)
})

const formatDate = (dateStr: string) => {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})
}
const formatTime = (t: string) => {
  const [h,m] = t.split(':'); const h12 = parseInt(h)%12||12; const ampm = parseInt(h)<12?'AM':'PM'
  return `${h12}:${m} ${ampm}`
}

const openAddAppt = () => { Object.assign(form,{customer:'',type:'Final Fitting',status:'Confirmed',dateInput:'',time:'',location:'Shop',notes:''}); apptMode.value='add'; showModal.value=true }
const viewAppt = (a:any) => { selected.value={...a}; apptMode.value='view'; showModal.value=true }
const editAppt = (a:any) => { selected.value=a; Object.assign(form,{...a}); apptMode.value='edit'; showModal.value=true; if(showDeleteConfirm.value) showDeleteConfirm.value=false }
const deleteAppt = (a:any) => { deleteTarget.value=a; showDeleteConfirm.value=true }

const saveAppt = () => {
  const dayNum = new Date(form.dateInput).getDate()
  const dateStr = formatDate(form.dateInput)
  const timeStr = formatTime(form.time)
  if(apptMode.value==='add') {
    appointments.push({ id:nextId++, customer:form.customer, type:form.type, status:form.status, time:timeStr, location:form.location, day:dayNum, date:dateStr, notes:form.notes })
  } else {
    const idx = appointments.findIndex(x=>x.id===selected.value?.id)
    if(idx!==-1) Object.assign(appointments[idx],{ customer:form.customer, type:form.type, status:form.status, time:timeStr, location:form.location, day:dayNum, date:dateStr, notes:form.notes })
  }
  closeModals()
}
const confirmDelete = () => { const i=appointments.findIndex(x=>x.id===deleteTarget.value?.id); if(i!==-1) appointments.splice(i,1); closeModals() }
const closeModals = () => { showModal.value=false; showDeleteConfirm.value=false }

const typeIcon = (t:string) => t==='Final Fitting'||t==='Measurement'?ScissorsIcon:t==='Consultation'?UserIcon:ArchiveBoxIcon
const typeColor = (t:string) => t==='Final Fitting'||t==='Measurement'?'bg-teal-50 text-teal-600':t==='Consultation'?'bg-blue-100 text-blue-600':'bg-emerald-100 text-emerald-600'
</script>

<style scoped>
.card{background:white;border-radius:1rem;padding:1.5rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid rgba(15,23,42,0.06);}
.btn-teal{background:linear-gradient(135deg,#009E97,#007A75);color:#fff;font-weight:700;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:none;cursor:pointer;transition:all 0.15s;}
.btn-teal:hover{box-shadow:0 4px 12px rgba(0,158,151,0.35);transform:translateY(-1px);}
.btn-outline{background:white;color:#64748B;font-weight:600;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:1px solid #E2E8F0;cursor:pointer;}
.btn-danger{background:#DC2626;color:white;font-weight:700;font-size:0.85rem;padding:0.6rem 1.25rem;border-radius:0.625rem;border:none;cursor:pointer;}
.cal-nav{font-size:0.85rem;color:#64748B;font-weight:600;background:#F1F5F9;border:none;border-radius:0.5rem;padding:0.3rem 0.75rem;cursor:pointer;}
.cal-day{position:relative;text-align:center;padding:0.45rem 0;font-size:0.8rem;color:#64748B;border-radius:0.5rem;}
.cal-today{background:#009E97;color:white;font-weight:700;}
.cal-has-event{font-weight:600;color:#0F172A;}
.cal-dot{display:block;width:4px;height:4px;border-radius:50%;background:#009E97;margin:2px auto 0;}
.day-badge{width:40px;height:40px;border-radius:0.625rem;background:linear-gradient(135deg,#009E97,#007A75);color:#fff;font-weight:800;font-size:1.1rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.appt-card{background:white;border-radius:0.875rem;padding:1.25rem;box-shadow:0 1px 3px rgba(0,0,0,0.06);border:1px solid rgba(15,23,42,0.06);}
.appt-type-icon{padding:0.5rem;border-radius:0.5rem;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.badge-green{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#F0FDF4;color:#16A34A;}
.badge-yellow{display:inline-block;font-size:0.7rem;font-weight:600;padding:0.2rem 0.6rem;border-radius:9999px;background:#FFFBEB;color:#D97706;}
.action-btn{font-size:0.75rem;font-weight:600;padding:0.25rem 0.6rem;border-radius:0.5rem;border:none;cursor:pointer;transition:all 0.15s;background:transparent;}
.modal-overlay{position:fixed;inset:0;background:rgba(15,23,42,0.6);backdrop-filter:blur(4px);z-index:100;display:flex;align-items:center;justify-content:center;padding:1rem;}
.modal-box{background:white;border-radius:1.25rem;width:100%;max-width:540px;max-height:90vh;overflow-y:auto;box-shadow:0 25px 60px rgba(0,0,0,0.2);}
.modal-header{display:flex;justify-content:space-between;align-items:center;padding:1.25rem 1.5rem;border-bottom:1px solid #F1F5F9;}
.modal-title{font-size:1.1rem;font-weight:800;color:#0F172A;}
.modal-close{background:none;border:none;font-size:1.1rem;color:#94A3B8;cursor:pointer;padding:0.25rem 0.5rem;border-radius:0.5rem;}
.modal-close:hover{background:#F1F5F9;}
.info-block{background:#F8FAFC;border-radius:0.625rem;padding:0.75rem;}
.info-label{font-size:0.7rem;font-weight:600;text-transform:uppercase;letter-spacing:0.05em;color:#94A3B8;margin-bottom:0.25rem;}
.info-val{font-size:0.875rem;font-weight:600;color:#0F172A;}
.form-group label{display:block;font-size:0.8rem;font-weight:600;color:#64748B;margin-bottom:0.375rem;}
.form-input{width:100%;background:#F8FAFC;border:1px solid #E2E8F0;border-radius:0.625rem;padding:0.6rem 0.875rem;font-size:0.875rem;color:#0F172A;outline:none;}
.form-input:focus{border-color:#009E97;box-shadow:0 0 0 3px rgba(0,158,151,0.12);}
</style>

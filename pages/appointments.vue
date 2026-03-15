<template>
  <NuxtLayout>
    <div class="appointments">

      <!-- ── PAGE HEADER ── -->
      <div class="page-header">
        <div>
          <p class="page-eyebrow">Manage</p>
          <h1 class="page-title">Appointments</h1>
        </div>
        <button class="btn-gold" @click="openModal()">+ New Appointment</button>
      </div>

      <!-- ── STATS ROW ── -->
      <div class="appt-stats">
        <div v-for="s in apptStats" :key="s.label" class="appt-stat-card">
          <p class="asc-value">{{ s.value }}</p>
          <p class="asc-label">{{ s.label }}</p>
        </div>
      </div>

      <!-- ── FILTERS & SEARCH ── -->
      <div class="toolbar">
        <div class="search-wrap">
          <MagnifyingGlassIcon class="search-icon size-4" />
          <input
            v-model="search"
            type="text"
            placeholder="Search client or service..."
            class="search-input"
          />
        </div>
        <div class="filters">
          <select v-model="filterStatus" class="filter-select">
            <option value="">All Status</option>
            <option value="confirmed">Confirmed</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
          <select v-model="filterDate" class="filter-select">
            <option value="">All Dates</option>
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
      </div>

      <!-- ── TABLE ── -->
      <div class="card">
        <div class="table-wrap">
          <table class="appt-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Service</th>
                <th>Therapist</th>
                <th>Date & Time</th>
                <th>Duration</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filtered.length === 0">
                <td colspan="8" class="empty-row">No appointments found.</td>
              </tr>
              <tr v-for="appt in filtered" :key="appt.id">
                <td>
                  <div class="client-cell">
                    <img :src="appt.avatar" :alt="appt.client" class="c-avatar" />
                    <div>
                      <p class="c-name">{{ appt.client }}</p>
                      <p class="c-email">{{ appt.email }}</p>
                    </div>
                  </div>
                </td>
                <td>
                  <p class="td-main">{{ appt.service }}</p>
                </td>
                <td class="td-muted">{{ appt.therapist }}</td>
                <td>
                  <p class="td-main">{{ appt.date }}</p>
                  <p class="td-sub">{{ appt.time }}</p>
                </td>
                <td class="td-muted">{{ appt.duration }}</td>
                <td class="td-gold">{{ appt.amount }}</td>
                <td>
                  <span class="status-badge" :class="appt.status">{{ appt.status }}</span>
                </td>
                <td>
                  <div class="action-btns">
                    <button class="action-btn edit" @click="openModal(appt)" title="Edit">
                      <PencilSquareIcon class="size-4" />
                    </button>
                    <button class="action-btn delete" @click="confirmDelete(appt)" title="Delete">
                      <TrashIcon class="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Pagination -->
        <div class="pagination">
          <p class="page-info">Showing {{ filtered.length }} of {{ appointments.length }} appointments</p>
          <div class="page-btns">
            <button class="page-btn" disabled>← Prev</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">Next →</button>
          </div>
        </div>
      </div>

    </div>

    <!-- ══════════════════════════════ -->
    <!--   ADD / EDIT MODAL            -->
    <!-- ══════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
          <div class="modal">

            <div class="modal-header">
              <h2 class="modal-title">{{ editingAppt ? 'Edit Appointment' : 'New Appointment' }}</h2>
              <button class="modal-close" @click="showModal = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>

            <div class="modal-body">
              <div class="form-grid">

                <div class="form-group">
                  <label>Client Name</label>
                  <input v-model="form.client" type="text" placeholder="e.g. Maria Santos" />
                </div>

                <div class="form-group">
                  <label>Email</label>
                  <input v-model="form.email" type="email" placeholder="e.g. maria@email.com" />
                </div>

                <div class="form-group">
                  <label>Service</label>
                  <select v-model="form.service">
                    <option value="">Select a service</option>
                    <option>Swedish Massage</option>
                    <option>Hot Stone Massage</option>
                    <option>Deep Tissue Massage</option>
                    <option>Aromatherapy Facial</option>
                    <option>Foot Reflexology</option>
                    <option>Body Scrub</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Therapist</label>
                  <select v-model="form.therapist">
                    <option value="">Assign therapist</option>
                    <option>Liza Macaraeg</option>
                    <option>Jenny Ortega</option>
                    <option>Mark Reyes</option>
                    <option>Carla Delos Reyes</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Date</label>
                  <input v-model="form.date" type="date" />
                </div>

                <div class="form-group">
                  <label>Time</label>
                  <input v-model="form.time" type="time" />
                </div>

                <div class="form-group">
                  <label>Duration</label>
                  <select v-model="form.duration">
                    <option>30 mins</option>
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Amount (₱)</label>
                  <input v-model="form.amount" type="number" placeholder="e.g. 1500" />
                </div>

                <div class="form-group full">
                  <label>Status</label>
                  <div class="status-radios">
                    <label v-for="s in ['confirmed','pending','completed','cancelled']" :key="s" class="radio-label">
                      <input type="radio" v-model="form.status" :value="s" />
                      <span class="status-badge" :class="s">{{ s }}</span>
                    </label>
                  </div>
                </div>

                <div class="form-group full">
                  <label>Notes</label>
                  <textarea v-model="form.notes" rows="2" placeholder="Any special requests or notes..."></textarea>
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showModal = false">Cancel</button>
              <button class="btn-gold" @click="saveAppt">
                {{ editingAppt ? 'Save Changes' : 'Book Appointment' }}
              </button>
            </div>

          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════ -->
    <!--   DELETE CONFIRMATION         -->
    <!-- ══════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="modal-backdrop" @click.self="showDeleteModal = false">
          <div class="modal modal-sm">
            <div class="modal-header">
              <h2 class="modal-title">Delete Appointment</h2>
              <button class="modal-close" @click="showDeleteModal = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="modal-body">
              <div class="delete-icon-wrap">
                <TrashIcon class="size-8 text-red-400" />
              </div>
              <p class="delete-msg">
                Are you sure you want to delete the appointment for
                <strong>{{ deletingAppt?.client }}</strong>?
                This action cannot be undone.
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showDeleteModal = false">Cancel</button>
              <button class="btn-danger" @click="deleteAppt">Yes, Delete</button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

  </NuxtLayout>
</template>

<script setup>
import { ref, computed, reactive } from 'vue'
import {
  MagnifyingGlassIcon, PencilSquareIcon,
  TrashIcon, XMarkIcon,
} from '@heroicons/vue/24/outline'

// ── FILTERS ──
const search       = ref('')
const filterStatus = ref('')
const filterDate   = ref('')

// ── APPOINTMENTS DATA ──
const appointments = ref([
  { id:1,  client:'Maria Santos',   email:'maria@email.com',  service:'Hot Stone Massage',   therapist:'Liza Macaraeg',     date:'Mar 15, 2026', time:'9:00 AM',  duration:'1.5 hours', amount:'₱ 1,800', status:'confirmed',  avatar:'https://i.pravatar.cc/40?img=5'  },
  { id:2,  client:'Ana Reyes',      email:'ana@email.com',    service:'Deep Tissue Massage',  therapist:'Jenny Ortega',      date:'Mar 15, 2026', time:'10:30 AM', duration:'1 hour',    amount:'₱ 1,500', status:'confirmed',  avatar:'https://i.pravatar.cc/40?img=9'  },
  { id:3,  client:'James Cruz',     email:'james@email.com',  service:'Aromatherapy Facial',  therapist:'Carla Delos Reyes', date:'Mar 15, 2026', time:'12:00 PM', duration:'1 hour',    amount:'₱ 2,200', status:'pending',    avatar:'https://i.pravatar.cc/40?img=12' },
  { id:4,  client:'Rosa Lim',       email:'rosa@email.com',   service:'Swedish Massage',      therapist:'Mark Reyes',        date:'Mar 15, 2026', time:'2:00 PM',  duration:'1 hour',    amount:'₱ 1,200', status:'confirmed',  avatar:'https://i.pravatar.cc/40?img=47' },
  { id:5,  client:'Carlo Bautista', email:'carlo@email.com',  service:'Foot Reflexology',     therapist:'Liza Macaraeg',     date:'Mar 15, 2026', time:'4:30 PM',  duration:'30 mins',   amount:'₱ 900',   status:'cancelled',  avatar:'https://i.pravatar.cc/40?img=15' },
  { id:6,  client:'Lea Soriano',    email:'lea@email.com',    service:'Body Scrub',           therapist:'Jenny Ortega',      date:'Mar 14, 2026', time:'11:00 AM', duration:'1.5 hours', amount:'₱ 1,600', status:'completed',  avatar:'https://i.pravatar.cc/40?img=22' },
  { id:7,  client:'Ben Torres',     email:'ben@email.com',    service:'Swedish Massage',      therapist:'Mark Reyes',        date:'Mar 14, 2026', time:'3:00 PM',  duration:'1 hour',    amount:'₱ 1,200', status:'completed',  avatar:'https://i.pravatar.cc/40?img=33' },
  { id:8,  client:'Grace Tan',      email:'grace@email.com',  service:'Hot Stone Massage',    therapist:'Carla Delos Reyes', date:'Mar 13, 2026', time:'1:00 PM',  duration:'1.5 hours', amount:'₱ 1,800', status:'completed',  avatar:'https://i.pravatar.cc/40?img=44' },
])

// ── STATS ──
const apptStats = computed(() => [
  { label: 'Total',     value: appointments.value.length },
  { label: 'Confirmed', value: appointments.value.filter(a => a.status === 'confirmed').length },
  { label: 'Pending',   value: appointments.value.filter(a => a.status === 'pending').length },
  { label: 'Completed', value: appointments.value.filter(a => a.status === 'completed').length },
  { label: 'Cancelled', value: appointments.value.filter(a => a.status === 'cancelled').length },
])

// ── FILTERED ──
const filtered = computed(() => {
  return appointments.value.filter(a => {
    const q = search.value.toLowerCase()
    const matchSearch = !q || a.client.toLowerCase().includes(q) || a.service.toLowerCase().includes(q)
    const matchStatus = !filterStatus.value || a.status === filterStatus.value
    return matchSearch && matchStatus
  })
})

// ── MODAL ──
const showModal   = ref(false)
const editingAppt = ref(null)

const emptyForm = () => ({
  client:'', email:'', service:'', therapist:'',
  date:'', time:'', duration:'1 hour', amount:'',
  status:'pending', notes:''
})

const form = reactive(emptyForm())

function openModal(appt = null) {
  editingAppt.value = appt
  if (appt) {
    Object.assign(form, { ...appt })
  } else {
    Object.assign(form, emptyForm())
  }
  showModal.value = true
}

function saveAppt() {
  if (!form.client || !form.service) return
  if (editingAppt.value) {
    const idx = appointments.value.findIndex(a => a.id === editingAppt.value.id)
    if (idx !== -1) appointments.value[idx] = { ...appointments.value[idx], ...form }
  } else {
    appointments.value.unshift({
      id: Date.now(),
      avatar: `https://i.pravatar.cc/40?img=${Math.floor(Math.random()*50)+1}`,
      amount: form.amount ? `₱ ${Number(form.amount).toLocaleString()}` : '₱ 0',
      ...form,
    })
  }
  showModal.value = false
}

// ── DELETE ──
const showDeleteModal = ref(false)
const deletingAppt    = ref(null)

function confirmDelete(appt) {
  deletingAppt.value = appt
  showDeleteModal.value = true
}
function deleteAppt() {
  appointments.value = appointments.value.filter(a => a.id !== deletingAppt.value.id)
  showDeleteModal.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.appointments { font-family: 'Jost', sans-serif; padding-bottom: 3rem; }

/* ── PAGE HEADER ── */
.page-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; flex-wrap: wrap;
  gap: 1rem; margin-bottom: 1.8rem;
}
.page-eyebrow {
  font-size: 0.65rem; letter-spacing: 0.3em;
  text-transform: uppercase; color: #c9a96e; margin-bottom: 0.2rem;
}
.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 2rem; font-weight: 300;
  color: #1a1a14; letter-spacing: 0.02em;
}
.btn-gold {
  background: #c9a96e; color: #1a1a14; border: none;
  padding: 0.7rem 1.5rem; font-family: 'Jost', sans-serif;
  font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em;
  text-transform: uppercase; cursor: pointer; border-radius: 4px;
  transition: background 0.2s, transform 0.2s; white-space: nowrap;
}
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }

/* ── STAT PILLS ── */
.appt-stats {
  display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem;
}
.appt-stat-card {
  background: #fff; border-radius: 8px; padding: 1rem 1.5rem;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 12px rgba(26,26,20,0.04);
  text-align: center; min-width: 90px;
}
.asc-value {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.8rem; font-weight: 400; color: #1a1a14; line-height: 1;
}
.asc-label {
  font-size: 0.62rem; letter-spacing: 0.15em;
  text-transform: uppercase; color: #9ca3af; margin-top: 4px;
}

/* ── TOOLBAR ── */
.toolbar {
  display: flex; align-items: center; gap: 0.75rem;
  flex-wrap: wrap; margin-bottom: 1.25rem;
}
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon {
  position: absolute; left: 0.85rem; top: 50%;
  transform: translateY(-50%); color: #9ca3af; pointer-events: none;
}
.search-input {
  width: 100%; padding: 0.65rem 0.85rem 0.65rem 2.4rem;
  border: 1px solid rgba(201,169,110,0.2); border-radius: 6px;
  font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14;
  background: #fff; outline: none; transition: border 0.2s;
}
.search-input:focus { border-color: #c9a96e; }
.search-input::placeholder { color: #c4bfb6; }

.filters { display: flex; gap: 0.75rem; }
.filter-select {
  padding: 0.65rem 1rem; border: 1px solid rgba(201,169,110,0.2);
  border-radius: 6px; font-family: 'Jost', sans-serif;
  font-size: 0.8rem; color: #374151; background: #fff;
  outline: none; cursor: pointer; transition: border 0.2s;
}
.filter-select:focus { border-color: #c9a96e; }

/* ── CARD ── */
.card {
  background: #fff; border-radius: 10px;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 16px rgba(26,26,20,0.05);
  overflow: hidden;
}
.table-wrap { overflow-x: auto; }

/* ── TABLE ── */
.appt-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.appt-table thead tr { border-bottom: 1px solid rgba(201,169,110,0.15); }
.appt-table th {
  text-align: left; font-size: 0.63rem; letter-spacing: 0.12em;
  text-transform: uppercase; color: #9ca3af; font-weight: 500;
  padding: 1rem 1rem 0.85rem;
}
.appt-table tbody tr { border-bottom: 1px solid #f9f5ef; transition: background 0.15s; }
.appt-table tbody tr:hover { background: #fdf8f0; }
.appt-table td { padding: 0.9rem 1rem; vertical-align: middle; }

.client-cell { display: flex; align-items: center; gap: 0.75rem; }
.c-avatar { width: 34px; height: 34px; border-radius: 50%; object-fit: cover; flex-shrink: 0; }
.c-name  { font-weight: 500; color: #1a1a14; }
.c-email { font-size: 0.7rem; color: #9ca3af; margin-top: 1px; }
.td-main { color: #1a1a14; font-weight: 400; }
.td-sub  { font-size: 0.72rem; color: #9ca3af; margin-top: 2px; }
.td-muted { color: #6b7280; }
.td-gold { color: #c9a96e; font-weight: 500; }

.status-badge {
  display: inline-block; font-size: 0.6rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.22rem 0.6rem; border-radius: 999px;
}
.status-badge.confirmed { background: rgba(106,155,103,0.15); color: #4a8a47; }
.status-badge.pending   { background: rgba(201,169,110,0.15); color: #a07830; }
.status-badge.completed { background: rgba(100,130,180,0.15); color: #3a5fa0; }
.status-badge.cancelled { background: rgba(192,114,90,0.15);  color: #b05540; }

.action-btns { display: flex; gap: 0.4rem; }
.action-btn {
  padding: 0.4rem; border-radius: 6px; border: none;
  cursor: pointer; display: flex; align-items: center; transition: background 0.15s, color 0.15s;
}
.action-btn.edit   { background: rgba(201,169,110,0.1); color: #a07830; }
.action-btn.edit:hover { background: rgba(201,169,110,0.25); }
.action-btn.delete { background: rgba(192,114,90,0.1);  color: #b05540; }
.action-btn.delete:hover { background: rgba(192,114,90,0.25); }

.empty-row { text-align: center; color: #9ca3af; padding: 2rem; font-size: 0.85rem; }

/* ── PAGINATION ── */
.pagination {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1rem 1.2rem; border-top: 1px solid #f9f5ef; flex-wrap: wrap; gap: 0.75rem;
}
.page-info { font-size: 0.75rem; color: #9ca3af; }
.page-btns { display: flex; gap: 0.4rem; }
.page-btn {
  padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.75rem;
  font-family: 'Jost', sans-serif; border: 1px solid rgba(201,169,110,0.2);
  background: #fff; color: #6b7280; cursor: pointer; transition: all 0.15s;
}
.page-btn:hover:not(:disabled) { border-color: #c9a96e; color: #c9a96e; }
.page-btn.active { background: #c9a96e; color: #1a1a14; border-color: #c9a96e; font-weight: 600; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── MODAL BACKDROP ── */
.modal-backdrop {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(26,26,20,0.6); backdrop-filter: blur(4px);
  display: flex; align-items: center; justify-content: center; padding: 1rem;
}
.modal {
  background: #fff; border-radius: 12px; width: 100%; max-width: 640px;
  max-height: 90vh; overflow-y: auto;
  box-shadow: 0 24px 60px rgba(26,26,20,0.2);
  border: 1px solid rgba(201,169,110,0.15);
}
.modal-sm { max-width: 420px; }

.modal-header {
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.4rem 1.6rem; border-bottom: 1px solid rgba(201,169,110,0.12);
}
.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.3rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em;
}
.modal-close {
  background: none; border: none; cursor: pointer;
  color: #9ca3af; padding: 0.25rem; border-radius: 4px; transition: color 0.2s;
}
.modal-close:hover { color: #1a1a14; }

.modal-body { padding: 1.6rem; }
.modal-footer {
  display: flex; justify-content: flex-end; gap: 0.75rem;
  padding: 1.2rem 1.6rem; border-top: 1px solid rgba(201,169,110,0.12);
}

/* ── FORM ── */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group.full { grid-column: 1 / -1; }
.form-group label {
  font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
  color: #6b7280; font-weight: 500;
}
.form-group input,
.form-group select,
.form-group textarea {
  padding: 0.65rem 0.85rem;
  border: 1px solid rgba(201,169,110,0.25); border-radius: 6px;
  font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14;
  background: #fff; outline: none; transition: border 0.2s;
  resize: none;
}
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: #c9a96e; }

.status-radios { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
.radio-label { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; }
.radio-label input[type="radio"] { accent-color: #c9a96e; }

/* ── DELETE MODAL ── */
.delete-icon-wrap {
  display: flex; justify-content: center;
  margin-bottom: 1rem; color: #c0725a;
}
.delete-msg { text-align: center; font-size: 0.88rem; color: #374151; line-height: 1.6; }
.delete-msg strong { color: #1a1a14; font-weight: 600; }

.btn-ghost-dark {
  background: none; border: 1px solid rgba(26,26,20,0.15); color: #6b7280;
  padding: 0.7rem 1.4rem; border-radius: 4px;
  font-family: 'Jost', sans-serif; font-size: 0.75rem;
  font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: all 0.2s;
}
.btn-ghost-dark:hover { border-color: #1a1a14; color: #1a1a14; }

.btn-danger {
  background: #c0725a; color: #fff; border: none;
  padding: 0.7rem 1.4rem; border-radius: 4px;
  font-family: 'Jost', sans-serif; font-size: 0.75rem;
  font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
  cursor: pointer; transition: background 0.2s;
}
.btn-danger:hover { background: #a85a44; }

/* ── TRANSITIONS ── */
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s, transform 0.25s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96) translateY(10px); }

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .form-grid { grid-template-columns: 1fr; }
  .filters { flex-wrap: wrap; }
}
</style>
<template>
  <NuxtLayout>
    <div class="clients-page">

      <!-- ── PAGE HEADER ── -->
      <div class="page-header">
        <div>
          <p class="page-eyebrow">Manage</p>
          <h1 class="page-title">Clients</h1>
        </div>
        <button class="btn-gold" @click="openModal()">+ Add Client</button>
      </div>

      <!-- ── STAT PILLS ── -->
      <div class="client-stats">
        <div v-for="s in clientStats" :key="s.label" class="cstat-card">
          <p class="cstat-value">{{ s.value }}</p>
          <p class="cstat-label">{{ s.label }}</p>
        </div>
      </div>

      <!-- ── TOOLBAR ── -->
      <div class="toolbar">
        <div class="search-wrap">
          <MagnifyingGlassIcon class="search-icon size-4" />
          <input
            v-model="search"
            type="text"
            placeholder="Search by name, email or phone..."
            class="search-input"
          />
        </div>
        <div class="filters">
          <select v-model="filterStatus" class="filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="vip">VIP</option>
          </select>
          <div class="view-toggle">
            <button :class="['toggle-btn', view === 'table' ? 'active' : '']" @click="view = 'table'">
              <TableCellsIcon class="size-4" />
            </button>
            <button :class="['toggle-btn', view === 'grid' ? 'active' : '']" @click="view = 'grid'">
              <Squares2X2Icon class="size-4" />
            </button>
          </div>
        </div>
      </div>

      <!-- ── GRID VIEW ── -->
      <div v-if="view === 'grid'" class="clients-grid">
        <div
          v-for="client in filtered"
          :key="client.id"
          class="client-card"
          @click="openDetail(client)"
        >
          <div class="client-card-top">
            <span class="cc-badge" :class="client.status">{{ client.status }}</span>
            <div class="cc-actions">
              <button class="action-btn edit" @click.stop="openModal(client)">
                <PencilSquareIcon class="size-4" />
              </button>
              <button class="action-btn delete" @click.stop="confirmDelete(client)">
                <TrashIcon class="size-4" />
              </button>
            </div>
          </div>
          <div class="cc-body">
            <img :src="client.avatar" :alt="client.name" class="cc-avatar" />
            <h3 class="cc-name">{{ client.name }}</h3>
            <p class="cc-email">{{ client.email }}</p>
            <p class="cc-phone">{{ client.phone }}</p>
          </div>
          <div class="cc-footer">
            <div class="cc-stat">
              <span class="ccf-val">{{ client.visits }}</span>
              <span class="ccf-label">Visits</span>
            </div>
            <div class="cc-divider"></div>
            <div class="cc-stat">
              <span class="ccf-val">{{ client.totalSpent }}</span>
              <span class="ccf-label">Total Spent</span>
            </div>
            <div class="cc-divider"></div>
            <div class="cc-stat">
              <span class="ccf-val">{{ client.lastVisit }}</span>
              <span class="ccf-label">Last Visit</span>
            </div>
          </div>
        </div>
        <div v-if="filtered.length === 0" class="empty-state">
          <UsersIcon class="size-10 text-gray-300" />
          <p>No clients found.</p>
        </div>
      </div>

      <!-- ── TABLE VIEW ── -->
      <div v-else class="card">
        <div class="table-wrap">
          <table class="clients-table">
            <thead>
              <tr>
                <th>Client</th>
                <th>Phone</th>
                <th>Visits</th>
                <th>Last Visit</th>
                <th>Fav. Service</th>
                <th>Total Spent</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="filtered.length === 0">
                <td colspan="8" class="empty-row">No clients found.</td>
              </tr>
              <tr
                v-for="client in filtered"
                :key="client.id"
                class="table-row"
                @click="openDetail(client)"
              >
                <td>
                  <div class="client-cell">
                    <img :src="client.avatar" :alt="client.name" class="c-avatar" />
                    <div>
                      <p class="c-name">{{ client.name }}</p>
                      <p class="c-email">{{ client.email }}</p>
                    </div>
                  </div>
                </td>
                <td class="td-muted">{{ client.phone }}</td>
                <td>
                  <span class="visits-pill">{{ client.visits }}</span>
                </td>
                <td class="td-muted">{{ client.lastVisit }}</td>
                <td class="td-muted">{{ client.favService }}</td>
                <td class="td-gold">{{ client.totalSpent }}</td>
                <td>
                  <span class="status-badge" :class="client.status">{{ client.status }}</span>
                </td>
                <td @click.stop>
                  <div class="action-btns">
                    <button class="action-btn edit" @click="openModal(client)">
                      <PencilSquareIcon class="size-4" />
                    </button>
                    <button class="action-btn delete" @click="confirmDelete(client)">
                      <TrashIcon class="size-4" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="pagination">
          <p class="page-info">Showing {{ filtered.length }} of {{ clients.length }} clients</p>
          <div class="page-btns">
            <button class="page-btn" disabled>← Prev</button>
            <button class="page-btn active">1</button>
            <button class="page-btn">2</button>
            <button class="page-btn">Next →</button>
          </div>
        </div>
      </div>

    </div>

    <!-- ════════════════════════════ -->
    <!--   CLIENT DETAIL DRAWER      -->
    <!-- ════════════════════════════ -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="showDetail" class="drawer-backdrop" @click.self="showDetail = false">
          <div class="drawer">
            <div class="drawer-header">
              <h2 class="drawer-title">Client Profile</h2>
              <button class="modal-close" @click="showDetail = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="drawer-body" v-if="selectedClient">
              <!-- Profile -->
              <div class="dp-hero">
                <img :src="selectedClient.avatar" :alt="selectedClient.name" class="dp-avatar" />
                <div>
                  <h3 class="dp-name">{{ selectedClient.name }}</h3>
                  <p class="dp-email">{{ selectedClient.email }}</p>
                  <span class="status-badge mt-1 inline-block" :class="selectedClient.status">
                    {{ selectedClient.status }}
                  </span>
                </div>
              </div>

              <!-- Info grid -->
              <div class="dp-grid">
                <div class="dp-field">
                  <p class="dpf-label">Phone</p>
                  <p class="dpf-val">{{ selectedClient.phone }}</p>
                </div>
                <div class="dp-field">
                  <p class="dpf-label">Birthday</p>
                  <p class="dpf-val">{{ selectedClient.birthday }}</p>
                </div>
                <div class="dp-field">
                  <p class="dpf-label">Member Since</p>
                  <p class="dpf-val">{{ selectedClient.memberSince }}</p>
                </div>
                <div class="dp-field">
                  <p class="dpf-label">Last Visit</p>
                  <p class="dpf-val">{{ selectedClient.lastVisit }}</p>
                </div>
              </div>

              <!-- Stats -->
              <div class="dp-stats">
                <div class="dp-stat">
                  <p class="dps-val">{{ selectedClient.visits }}</p>
                  <p class="dps-label">Total Visits</p>
                </div>
                <div class="dp-stat">
                  <p class="dps-val">{{ selectedClient.totalSpent }}</p>
                  <p class="dps-label">Total Spent</p>
                </div>
                <div class="dp-stat">
                  <p class="dps-val">{{ selectedClient.favService }}</p>
                  <p class="dps-label">Fav. Service</p>
                </div>
              </div>

              <!-- Notes -->
              <div class="dp-notes" v-if="selectedClient.notes">
                <p class="dpf-label">Notes</p>
                <p class="dp-notes-text">{{ selectedClient.notes }}</p>
              </div>

              <!-- Action buttons -->
              <div class="dp-actions">
                <button class="btn-gold w-full" @click="openModal(selectedClient); showDetail = false">
                  Edit Client
                </button>
                <button class="btn-ghost-dark w-full" @click="showDetail = false">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ════════════════════════════ -->
    <!--   ADD / EDIT MODAL          -->
    <!-- ════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
          <div class="modal">
            <div class="modal-header">
              <h2 class="modal-title">{{ editingClient ? 'Edit Client' : 'Add New Client' }}</h2>
              <button class="modal-close" @click="showModal = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="modal-body">
              <div class="form-grid">
                <div class="form-group">
                  <label>Full Name</label>
                  <input v-model="form.name" type="text" placeholder="e.g. Maria Santos" />
                </div>
                <div class="form-group">
                  <label>Email</label>
                  <input v-model="form.email" type="email" placeholder="e.g. maria@email.com" />
                </div>
                <div class="form-group">
                  <label>Phone</label>
                  <input v-model="form.phone" type="text" placeholder="e.g. 09171234567" />
                </div>
                <div class="form-group">
                  <label>Birthday</label>
                  <input v-model="form.birthday" type="date" />
                </div>
                <div class="form-group">
                  <label>Favourite Service</label>
                  <select v-model="form.favService">
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
                  <label>Status</label>
                  <select v-model="form.status">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="vip">VIP</option>
                  </select>
                </div>
                <div class="form-group full">
                  <label>Notes / Preferences</label>
                  <textarea v-model="form.notes" rows="3" placeholder="Allergies, preferences, special notes..."></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showModal = false">Cancel</button>
              <button class="btn-gold" @click="saveClient">
                {{ editingClient ? 'Save Changes' : 'Add Client' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ════════════════════════════ -->
    <!--   DELETE CONFIRMATION        -->
    <!-- ════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showDeleteModal" class="modal-backdrop" @click.self="showDeleteModal = false">
          <div class="modal modal-sm">
            <div class="modal-header">
              <h2 class="modal-title">Delete Client</h2>
              <button class="modal-close" @click="showDeleteModal = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="modal-body">
              <div class="delete-icon-wrap">
                <TrashIcon class="size-8" style="color:#c0725a" />
              </div>
              <p class="delete-msg">
                Are you sure you want to remove
                <strong>{{ deletingClient?.name }}</strong>
                from your client list? This cannot be undone.
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showDeleteModal = false">Cancel</button>
              <button class="btn-danger" @click="deleteClient">Yes, Remove</button>
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
  MagnifyingGlassIcon, PencilSquareIcon, TrashIcon,
  XMarkIcon, UsersIcon, TableCellsIcon, Squares2X2Icon,
} from '@heroicons/vue/24/outline'

// ── VIEW ──
const view         = ref('table')
const search       = ref('')
const filterStatus = ref('')

// ── DATA ──
const clients = ref([
  { id:1,  name:'Maria Santos',   email:'maria@email.com',  phone:'0917-123-4567', birthday:'May 12, 1990',  memberSince:'Jan 2023', lastVisit:'Mar 14, 2026', visits:18, totalSpent:'₱ 32,400', favService:'Hot Stone Massage',   status:'vip',      notes:'Prefers quiet room, sensitive to strong scents.',          avatar:'https://i.pravatar.cc/80?img=5'  },
  { id:2,  name:'Ana Reyes',      email:'ana@email.com',    phone:'0918-234-5678', birthday:'Aug 3, 1988',   memberSince:'Mar 2023', lastVisit:'Mar 13, 2026', visits:12, totalSpent:'₱ 18,000', favService:'Deep Tissue Massage', status:'active',   notes:'Prefers firm pressure.',                                   avatar:'https://i.pravatar.cc/80?img=9'  },
  { id:3,  name:'James Cruz',     email:'james@email.com',  phone:'0919-345-6789', birthday:'Nov 20, 1995',  memberSince:'Jun 2023', lastVisit:'Mar 12, 2026', visits:6,  totalSpent:'₱ 13,200', favService:'Aromatherapy Facial', status:'active',   notes:'',                                                         avatar:'https://i.pravatar.cc/80?img=12' },
  { id:4,  name:'Rosa Lim',       email:'rosa@email.com',   phone:'0920-456-7890', birthday:'Feb 14, 1992',  memberSince:'Feb 2024', lastVisit:'Mar 10, 2026', visits:9,  totalSpent:'₱ 10,800', favService:'Swedish Massage',     status:'active',   notes:'Allergic to lavender oil.',                                avatar:'https://i.pravatar.cc/80?img=47' },
  { id:5,  name:'Carlo Bautista', email:'carlo@email.com',  phone:'0921-567-8901', birthday:'Jul 7, 1985',   memberSince:'Sep 2022', lastVisit:'Mar 8, 2026',  visits:3,  totalSpent:'₱ 2,700',  favService:'Foot Reflexology',    status:'inactive', notes:'',                                                         avatar:'https://i.pravatar.cc/80?img=15' },
  { id:6,  name:'Lea Soriano',    email:'lea@email.com',    phone:'0922-678-9012', birthday:'Oct 30, 1993',  memberSince:'Apr 2023', lastVisit:'Mar 14, 2026', visits:22, totalSpent:'₱ 41,800', favService:'Body Scrub',           status:'vip',      notes:'Prefers weekend slots only.',                              avatar:'https://i.pravatar.cc/80?img=22' },
  { id:7,  name:'Ben Torres',     email:'ben@email.com',    phone:'0923-789-0123', birthday:'Mar 19, 1991',  memberSince:'Jul 2023', lastVisit:'Mar 14, 2026', visits:7,  totalSpent:'₱ 8,400',  favService:'Swedish Massage',     status:'active',   notes:'',                                                         avatar:'https://i.pravatar.cc/80?img=33' },
  { id:8,  name:'Grace Tan',      email:'grace@email.com',  phone:'0924-890-1234', birthday:'Jan 25, 1987',  memberSince:'Nov 2022', lastVisit:'Mar 13, 2026', visits:15, totalSpent:'₱ 27,000', favService:'Hot Stone Massage',   status:'vip',      notes:'VIP member — always greet by name.',                       avatar:'https://i.pravatar.cc/80?img=44' },
])

// ── STATS ──
const clientStats = computed(() => [
  { label: 'Total Clients', value: clients.value.length },
  { label: 'Active',        value: clients.value.filter(c => c.status === 'active').length },
  { label: 'VIP',           value: clients.value.filter(c => c.status === 'vip').length },
  { label: 'Inactive',      value: clients.value.filter(c => c.status === 'inactive').length },
])

// ── FILTER ──
const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return clients.value.filter(c => {
    const matchSearch = !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || c.phone.includes(q)
    const matchStatus = !filterStatus.value || c.status === filterStatus.value
    return matchSearch && matchStatus
  })
})

// ── DETAIL DRAWER ──
const showDetail    = ref(false)
const selectedClient = ref(null)
function openDetail(client) {
  selectedClient.value = client
  showDetail.value = true
}

// ── ADD / EDIT MODAL ──
const showModal     = ref(false)
const editingClient = ref(null)
const emptyForm = () => ({ name:'', email:'', phone:'', birthday:'', favService:'', status:'active', notes:'' })
const form = reactive(emptyForm())

function openModal(client = null) {
  editingClient.value = client
  Object.assign(form, client ? { ...client } : emptyForm())
  showModal.value = true
}

function saveClient() {
  if (!form.name || !form.email) return
  if (editingClient.value) {
    const idx = clients.value.findIndex(c => c.id === editingClient.value.id)
    if (idx !== -1) clients.value[idx] = { ...clients.value[idx], ...form }
  } else {
    clients.value.unshift({
      id: Date.now(),
      avatar: `https://i.pravatar.cc/80?img=${Math.floor(Math.random() * 50) + 1}`,
      visits: 0,
      totalSpent: '₱ 0',
      memberSince: new Date().toLocaleDateString('en-PH', { month:'short', year:'numeric' }),
      lastVisit: '—',
      ...form,
    })
  }
  showModal.value = false
}

// ── DELETE ──
const showDeleteModal = ref(false)
const deletingClient  = ref(null)
function confirmDelete(client) {
  deletingClient.value = client
  showDeleteModal.value = true
}
function deleteClient() {
  clients.value = clients.value.filter(c => c.id !== deletingClient.value.id)
  showDeleteModal.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.clients-page { font-family: 'Jost', sans-serif; padding-bottom: 3rem; }

/* ── HEADER ── */
.page-header {
  display: flex; align-items: flex-start;
  justify-content: space-between; flex-wrap: wrap;
  gap: 1rem; margin-bottom: 1.8rem;
}
.page-eyebrow { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.2rem; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: #1a1a14; letter-spacing: 0.02em; }
.btn-gold {
  background: #c9a96e; color: #1a1a14; border: none;
  padding: 0.7rem 1.5rem; font-family: 'Jost', sans-serif;
  font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em;
  text-transform: uppercase; cursor: pointer; border-radius: 4px;
  transition: background 0.2s, transform 0.2s; white-space: nowrap;
}
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }
.w-full { width: 100%; justify-content: center; }

/* ── STATS ── */
.client-stats { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.cstat-card {
  background: #fff; border-radius: 8px; padding: 1rem 1.5rem;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 12px rgba(26,26,20,0.04);
  text-align: center; min-width: 90px;
}
.cstat-value { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; color: #1a1a14; line-height: 1; }
.cstat-label { font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: #9ca3af; margin-top: 4px; }

/* ── TOOLBAR ── */
.toolbar { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.search-wrap { position: relative; flex: 1; min-width: 220px; }
.search-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
.search-input {
  width: 100%; padding: 0.65rem 0.85rem 0.65rem 2.4rem;
  border: 1px solid rgba(201,169,110,0.2); border-radius: 6px;
  font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14;
  background: #fff; outline: none; transition: border 0.2s;
}
.search-input:focus { border-color: #c9a96e; }
.search-input::placeholder { color: #c4bfb6; }
.filters { display: flex; gap: 0.75rem; align-items: center; }
.filter-select {
  padding: 0.65rem 1rem; border: 1px solid rgba(201,169,110,0.2);
  border-radius: 6px; font-family: 'Jost', sans-serif;
  font-size: 0.8rem; color: #374151; background: #fff;
  outline: none; cursor: pointer; transition: border 0.2s;
}
.filter-select:focus { border-color: #c9a96e; }

/* ── VIEW TOGGLE ── */
.view-toggle { display: flex; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; overflow: hidden; }
.toggle-btn {
  padding: 0.55rem 0.75rem; background: #fff; border: none;
  cursor: pointer; color: #9ca3af; display: flex; align-items: center;
  transition: background 0.15s, color 0.15s;
}
.toggle-btn.active { background: #c9a96e; color: #1a1a14; }

/* ── CARD ── */
.card {
  background: #fff; border-radius: 10px;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 16px rgba(26,26,20,0.05); overflow: hidden;
}

/* ── GRID VIEW ── */
.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 1.25rem;
}
.client-card {
  background: #fff; border-radius: 10px;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 16px rgba(26,26,20,0.05);
  overflow: hidden; cursor: pointer;
  transition: box-shadow 0.2s, transform 0.2s;
}
.client-card:hover { box-shadow: 0 8px 32px rgba(26,26,20,0.1); transform: translateY(-2px); }
.client-card-top {
  display: flex; justify-content: space-between; align-items: center;
  padding: 0.85rem 1rem 0;
}
.cc-actions { display: flex; gap: 0.35rem; }
.cc-body { text-align: center; padding: 0.75rem 1rem 1rem; }
.cc-avatar { width: 64px; height: 64px; border-radius: 50%; object-fit: cover; margin: 0 auto 0.75rem; border: 2px solid rgba(201,169,110,0.3); }
.cc-name  { font-size: 0.95rem; font-weight: 500; color: #1a1a14; }
.cc-email { font-size: 0.72rem; color: #9ca3af; margin-top: 2px; }
.cc-phone { font-size: 0.72rem; color: #9ca3af; margin-top: 1px; }
.cc-footer {
  display: flex; align-items: center;
  border-top: 1px solid rgba(201,169,110,0.1);
  padding: 0.85rem 1rem;
}
.cc-stat { flex: 1; text-align: center; }
.ccf-val { display: block; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 400; color: #1a1a14; }
.ccf-label { font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; }
.cc-divider { width: 1px; height: 28px; background: rgba(201,169,110,0.15); }

/* ── TABLE VIEW ── */
.table-wrap { overflow-x: auto; }
.clients-table { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.clients-table thead tr { border-bottom: 1px solid rgba(201,169,110,0.15); }
.clients-table th { text-align: left; font-size: 0.63rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; font-weight: 500; padding: 1rem 1rem 0.85rem; }
.clients-table tbody tr { border-bottom: 1px solid #f9f5ef; transition: background 0.15s; cursor: pointer; }
.clients-table tbody tr:hover { background: #fdf8f0; }
.clients-table td { padding: 0.9rem 1rem; vertical-align: middle; }
.client-cell { display: flex; align-items: center; gap: 0.75rem; }
.c-avatar { width: 36px; height: 36px; border-radius: 50%; object-fit: cover; flex-shrink: 0; border: 2px solid rgba(201,169,110,0.25); }
.c-name  { font-weight: 500; color: #1a1a14; }
.c-email { font-size: 0.7rem; color: #9ca3af; margin-top: 1px; }
.td-muted { color: #6b7280; }
.td-gold  { color: #c9a96e; font-weight: 500; }
.visits-pill {
  background: rgba(201,169,110,0.1); color: #a07830;
  font-size: 0.72rem; font-weight: 600;
  padding: 0.15rem 0.55rem; border-radius: 999px;
}
.status-badge {
  display: inline-block; font-size: 0.6rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.22rem 0.6rem; border-radius: 999px;
}
.status-badge.active   { background: rgba(106,155,103,0.15); color: #4a8a47; }
.status-badge.inactive { background: rgba(156,163,175,0.2);  color: #6b7280; }
.status-badge.vip      { background: rgba(201,169,110,0.2);  color: #a07830; }
.cc-badge {
  display: inline-block; font-size: 0.55rem; font-weight: 600;
  letter-spacing: 0.08em; text-transform: uppercase;
  padding: 0.18rem 0.5rem; border-radius: 999px;
}
.cc-badge.active   { background: rgba(106,155,103,0.15); color: #4a8a47; }
.cc-badge.inactive { background: rgba(156,163,175,0.2);  color: #6b7280; }
.cc-badge.vip      { background: rgba(201,169,110,0.2);  color: #a07830; }

.action-btns { display: flex; gap: 0.4rem; }
.action-btn {
  padding: 0.4rem; border-radius: 6px; border: none;
  cursor: pointer; display: flex; align-items: center; transition: background 0.15s;
}
.action-btn.edit   { background: rgba(201,169,110,0.1); color: #a07830; }
.action-btn.edit:hover { background: rgba(201,169,110,0.25); }
.action-btn.delete { background: rgba(192,114,90,0.1);  color: #b05540; }
.action-btn.delete:hover { background: rgba(192,114,90,0.25); }

.empty-row { text-align: center; color: #9ca3af; padding: 3rem; font-size: 0.85rem; }
.empty-state { grid-column: 1/-1; text-align: center; padding: 3rem; color: #9ca3af; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; font-size: 0.85rem; }

/* ── PAGINATION ── */
.pagination { display: flex; align-items: center; justify-content: space-between; padding: 1rem 1.2rem; border-top: 1px solid #f9f5ef; flex-wrap: wrap; gap: 0.75rem; }
.page-info { font-size: 0.75rem; color: #9ca3af; }
.page-btns { display: flex; gap: 0.4rem; }
.page-btn { padding: 0.4rem 0.75rem; border-radius: 6px; font-size: 0.75rem; font-family: 'Jost', sans-serif; border: 1px solid rgba(201,169,110,0.2); background: #fff; color: #6b7280; cursor: pointer; transition: all 0.15s; }
.page-btn:hover:not(:disabled) { border-color: #c9a96e; color: #c9a96e; }
.page-btn.active { background: #c9a96e; color: #1a1a14; border-color: #c9a96e; font-weight: 600; }
.page-btn:disabled { opacity: 0.4; cursor: not-allowed; }

/* ── DRAWER ── */
.drawer-backdrop {
  position: fixed; inset: 0; z-index: 200;
  background: rgba(26,26,20,0.5); backdrop-filter: blur(4px);
  display: flex; justify-content: flex-end;
}
.drawer {
  background: #fff; width: 100%; max-width: 400px; height: 100%;
  overflow-y: auto; box-shadow: -8px 0 40px rgba(26,26,20,0.15);
  border-left: 1px solid rgba(201,169,110,0.15);
}
.drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 1.6rem; border-bottom: 1px solid rgba(201,169,110,0.12); }
.drawer-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em; }
.drawer-body { padding: 1.6rem; display: flex; flex-direction: column; gap: 1.4rem; }

.dp-hero { display: flex; align-items: center; gap: 1rem; }
.dp-avatar { width: 70px; height: 70px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(201,169,110,0.3); flex-shrink: 0; }
.dp-name  { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; }
.dp-email { font-size: 0.75rem; color: #9ca3af; margin-top: 2px; }
.mt-1 { margin-top: 0.4rem; }

.dp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #fdf8f0; border-radius: 8px; padding: 1rem; }
.dpf-label { font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; margin-bottom: 3px; }
.dpf-val { font-size: 0.84rem; color: #1a1a14; font-weight: 400; }

.dp-stats { display: flex; gap: 0; border: 1px solid rgba(201,169,110,0.15); border-radius: 8px; overflow: hidden; }
.dp-stat { flex: 1; padding: 1rem; text-align: center; }
.dp-stat:not(:last-child) { border-right: 1px solid rgba(201,169,110,0.15); }
.dps-val { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #c9a96e; line-height: 1; }
.dps-label { font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-top: 4px; }

.dp-notes { background: #fdf8f0; border-radius: 8px; padding: 1rem; }
.dp-notes-text { font-size: 0.82rem; color: #374151; line-height: 1.6; margin-top: 0.4rem; }

.dp-actions { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem; }

/* ── MODAL ── */
.modal-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(26,26,20,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(26,26,20,0.2); border: 1px solid rgba(201,169,110,0.15); }
.modal-sm { max-width: 420px; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 1.6rem; border-bottom: 1px solid rgba(201,169,110,0.12); }
.modal-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em; }
.modal-close { background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0.25rem; border-radius: 4px; transition: color 0.2s; }
.modal-close:hover { color: #1a1a14; }
.modal-body { padding: 1.6rem; }
.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1.2rem 1.6rem; border-top: 1px solid rgba(201,169,110,0.12); }

/* ── FORM ── */
.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-group.full { grid-column: 1 / -1; }
.form-group label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280; font-weight: 500; }
.form-group input,
.form-group select,
.form-group textarea { padding: 0.65rem 0.85rem; border: 1px solid rgba(201,169,110,0.25); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14; background: #fff; outline: none; transition: border 0.2s; resize: none; }
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: #c9a96e; }

/* ── DELETE ── */
.delete-icon-wrap { display: flex; justify-content: center; margin-bottom: 1rem; }
.delete-msg { text-align: center; font-size: 0.88rem; color: #374151; line-height: 1.6; }
.delete-msg strong { color: #1a1a14; font-weight: 600; }
.btn-ghost-dark { background: none; border: 1px solid rgba(26,26,20,0.15); color: #6b7280; padding: 0.7rem 1.4rem; border-radius: 4px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: all 0.2s; }
.btn-ghost-dark:hover { border-color: #1a1a14; color: #1a1a14; }
.btn-danger { background: #c0725a; color: #fff; border: none; padding: 0.7rem 1.4rem; border-radius: 4px; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase; cursor: pointer; transition: background 0.2s; }
.btn-danger:hover { background: #a85a44; }

/* ── TRANSITIONS ── */
.modal-enter-active, .modal-leave-active { transition: opacity 0.25s, transform 0.25s; }
.modal-enter-from, .modal-leave-to { opacity: 0; transform: scale(0.96) translateY(10px); }
.drawer-enter-active, .drawer-leave-active { transition: opacity 0.25s, transform 0.3s; }
.drawer-enter-from, .drawer-leave-to { opacity: 0; transform: translateX(100%); }

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .form-grid { grid-template-columns: 1fr; }
  .clients-grid { grid-template-columns: 1fr 1fr; }
}
</style>
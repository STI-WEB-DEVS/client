<template>
  <NuxtLayout>
    <div class="therapists-page">

      <!-- ── PAGE HEADER ── -->
      <div class="page-header">
        <div>
          <p class="page-eyebrow">Manage</p>
          <h1 class="page-title">Therapists</h1>
        </div>
        <button class="btn-gold" @click="openModal()">+ Add Therapist</button>
      </div>

      <!-- ── STAT PILLS ── -->
      <div class="t-stats">
        <div v-for="s in therapistStats" :key="s.label" class="tstat-card">
          <p class="tstat-value">{{ s.value }}</p>
          <p class="tstat-label">{{ s.label }}</p>
        </div>
      </div>

      <!-- ── TOOLBAR ── -->
      <div class="toolbar">
        <div class="search-wrap">
          <MagnifyingGlassIcon class="search-icon size-4" />
          <input
            v-model="search"
            type="text"
            placeholder="Search therapist or specialty..."
            class="search-input"
          />
        </div>
        <div class="filters">
          <select v-model="filterStatus" class="filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="on-leave">On Leave</option>
            <option value="inactive">Inactive</option>
          </select>
          <select v-model="filterSpecialty" class="filter-select">
            <option value="">All Specialties</option>
            <option>Massage Therapy</option>
            <option>Facial & Skin Care</option>
            <option>Body Treatments</option>
            <option>Foot Care</option>
          </select>
        </div>
      </div>

      <!-- ── THERAPIST CARDS ── -->
      <div class="therapists-grid">
        <div
          v-for="t in filtered"
          :key="t.id"
          class="t-card"
          @click="openDetail(t)"
        >
          <!-- Status ribbon -->
          <div class="t-card-ribbon" :class="t.status"></div>

          <div class="t-card-body">
            <!-- Top row -->
            <div class="t-card-top">
              <span class="t-status-badge" :class="t.status">{{ t.status }}</span>
              <div class="t-card-actions" @click.stop>
                <button class="action-btn edit"   @click="openModal(t)"><PencilSquareIcon class="size-4" /></button>
                <button class="action-btn delete" @click="confirmDelete(t)"><TrashIcon class="size-4" /></button>
              </div>
            </div>

            <!-- Profile -->
            <div class="t-profile">
              <div class="t-avatar-wrap">
                <img :src="t.avatar" :alt="t.name" class="t-avatar" />
                <span class="t-rating-chip">★ {{ t.rating }}</span>
              </div>
              <h3 class="t-name">{{ t.name }}</h3>
              <p class="t-specialty">{{ t.specialty }}</p>
              <p class="t-experience">{{ t.experience }} experience</p>
            </div>

            <!-- Service tags -->
            <div class="t-tags">
              <span v-for="tag in t.services" :key="tag" class="t-tag">{{ tag }}</span>
            </div>

            <!-- Mini stats -->
            <div class="t-mini-stats">
              <div class="tms-item">
                <span class="tms-val">{{ t.sessions }}</span>
                <span class="tms-label">Sessions</span>
              </div>
              <div class="tms-divider"></div>
              <div class="tms-item">
                <span class="tms-val">{{ t.clients }}</span>
                <span class="tms-label">Clients</span>
              </div>
              <div class="tms-divider"></div>
              <div class="tms-item">
                <span class="tms-val">{{ t.revenue }}</span>
                <span class="tms-label">Revenue</span>
              </div>
            </div>

            <!-- Schedule -->
            <div class="t-schedule">
              <ClockIcon class="size-3.5" style="color:#9ca3af" />
              <span class="t-schedule-text">{{ t.schedule }}</span>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filtered.length === 0" class="empty-state">
          <UserGroupIcon class="size-10" style="color:#d1cdc7" />
          <p>No therapists found.</p>
        </div>
      </div>

    </div>

    <!-- ══════════════════════════════ -->
    <!--   DETAIL DRAWER               -->
    <!-- ══════════════════════════════ -->
    <Teleport to="body">
      <Transition name="drawer">
        <div v-if="showDetail" class="drawer-backdrop" @click.self="showDetail = false">
          <div class="drawer">
            <div class="drawer-header">
              <h2 class="drawer-title">Therapist Profile</h2>
              <button class="modal-close" @click="showDetail = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="drawer-body" v-if="selectedTherapist">

              <!-- Hero -->
              <div class="dp-hero">
                <div class="dp-avatar-wrap">
                  <img :src="selectedTherapist.avatar" :alt="selectedTherapist.name" class="dp-avatar" />
                  <span class="dp-rating">★ {{ selectedTherapist.rating }}</span>
                </div>
                <div>
                  <h3 class="dp-name">{{ selectedTherapist.name }}</h3>
                  <p class="dp-specialty">{{ selectedTherapist.specialty }}</p>
                  <span class="t-status-badge" :class="selectedTherapist.status" style="margin-top:0.4rem;display:inline-block;">
                    {{ selectedTherapist.status }}
                  </span>
                </div>
              </div>

              <!-- Info grid -->
              <div class="dp-grid">
                <div class="dp-field">
                  <p class="dpf-label">Phone</p>
                  <p class="dpf-val">{{ selectedTherapist.phone }}</p>
                </div>
                <div class="dp-field">
                  <p class="dpf-label">Email</p>
                  <p class="dpf-val">{{ selectedTherapist.email }}</p>
                </div>
                <div class="dp-field">
                  <p class="dpf-label">Experience</p>
                  <p class="dpf-val">{{ selectedTherapist.experience }}</p>
                </div>
                <div class="dp-field">
                  <p class="dpf-label">Joined</p>
                  <p class="dpf-val">{{ selectedTherapist.joined }}</p>
                </div>
                <div class="dp-field dp-field-full">
                  <p class="dpf-label">Schedule</p>
                  <p class="dpf-val">{{ selectedTherapist.schedule }}</p>
                </div>
              </div>

              <!-- Performance stats -->
              <div class="dp-stats">
                <div class="dp-stat">
                  <p class="dps-val">{{ selectedTherapist.sessions }}</p>
                  <p class="dps-label">Sessions</p>
                </div>
                <div class="dp-stat">
                  <p class="dps-val">{{ selectedTherapist.clients }}</p>
                  <p class="dps-label">Clients</p>
                </div>
                <div class="dp-stat">
                  <p class="dps-val">{{ selectedTherapist.revenue }}</p>
                  <p class="dps-label">Revenue</p>
                </div>
                <div class="dp-stat">
                  <p class="dps-val">★ {{ selectedTherapist.rating }}</p>
                  <p class="dps-label">Rating</p>
                </div>
              </div>

              <!-- Services -->
              <div>
                <p class="dpf-label" style="margin-bottom:0.5rem">Specializations</p>
                <div class="t-tags">
                  <span v-for="tag in selectedTherapist.services" :key="tag" class="t-tag">{{ tag }}</span>
                </div>
              </div>

              <!-- Certifications -->
              <div v-if="selectedTherapist.certifications?.length">
                <p class="dpf-label" style="margin-bottom:0.5rem">Certifications</p>
                <ul class="cert-list">
                  <li v-for="cert in selectedTherapist.certifications" :key="cert" class="cert-item">
                    <CheckCircleIcon class="size-4 cert-icon" />
                    <span>{{ cert }}</span>
                  </li>
                </ul>
              </div>

              <!-- Notes -->
              <div v-if="selectedTherapist.notes">
                <p class="dpf-label" style="margin-bottom:0.5rem">Notes</p>
                <p class="dp-notes-text">{{ selectedTherapist.notes }}</p>
              </div>

              <!-- Actions -->
              <div class="dp-actions">
                <button class="btn-gold btn-full" @click="openModal(selectedTherapist); showDetail = false">
                  Edit Therapist
                </button>
                <button class="btn-ghost-dark btn-full" @click="showDetail = false">
                  Close
                </button>
              </div>

            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <!-- ══════════════════════════════ -->
    <!--   ADD / EDIT MODAL            -->
    <!-- ══════════════════════════════ -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showModal" class="modal-backdrop" @click.self="showModal = false">
          <div class="modal">
            <div class="modal-header">
              <h2 class="modal-title">{{ editingTherapist ? 'Edit Therapist' : 'Add New Therapist' }}</h2>
              <button class="modal-close" @click="showModal = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="modal-body">

              <!-- ── AVATAR UPLOAD ── -->
              <div class="avatar-upload-wrap">
                <div class="modal-avatar-wrap">
                  <img :src="form.avatar || 'https://i.pravatar.cc/120?img=1'" :alt="form.name" class="modal-avatar" />
                  <!-- Rating chip stays on top -->
                  <span v-if="editingTherapist" class="t-rating-chip">★ {{ form.rating }}</span>
                  <!-- Camera button -->
                  <label class="avatar-cam-btn" title="Change photo">
                    <CameraIcon class="size-3.5" />
                    <input type="file" accept="image/*" class="avatar-file-input" @change="handleAvatarChange" />
                  </label>
                </div>
                <div class="avatar-upload-info">
                  <p class="aui-title">Profile Photo</p>
                  <p class="aui-sub">Click the camera icon to upload a new photo. JPG, PNG supported.</p>
                </div>
              </div>

              <div class="form-grid">

                <div class="form-group">
                  <label>Full Name</label>
                  <input v-model="form.name" type="text" placeholder="e.g. Liza Macaraeg" />
                </div>

                <div class="form-group">
                  <label>Specialty</label>
                  <select v-model="form.specialty">
                    <option value="">Select specialty</option>
                    <option>Massage Therapy</option>
                    <option>Facial & Skin Care</option>
                    <option>Body Treatments</option>
                    <option>Foot Care</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Phone</label>
                  <input v-model="form.phone" type="text" placeholder="e.g. 0917-123-4567" />
                </div>

                <div class="form-group">
                  <label>Email</label>
                  <input v-model="form.email" type="email" placeholder="e.g. liza@servora.com" />
                </div>

                <div class="form-group">
                  <label>Experience</label>
                  <input v-model="form.experience" type="text" placeholder="e.g. 5 years" />
                </div>

                <div class="form-group">
                  <label>Date Joined</label>
                  <input v-model="form.joined" type="date" />
                </div>

                <div class="form-group form-full">
                  <label>Work Schedule</label>
                  <input v-model="form.schedule" type="text" placeholder="e.g. Mon–Fri, 9AM–6PM" />
                </div>

                <div class="form-group form-full">
                  <label>Certifications (one per line)</label>
                  <textarea v-model="form.certificationsRaw" rows="3" placeholder="e.g. NCBTMB Certified&#10;Swedish Massage Certification" />
                </div>

                <div class="form-group form-full">
                  <label>Status</label>
                  <div class="status-radios">
                    <label v-for="s in ['active','on-leave','inactive']" :key="s" class="radio-label">
                      <input type="radio" v-model="form.status" :value="s" />
                      <span class="t-status-badge" :class="s">{{ s }}</span>
                    </label>
                  </div>
                </div>

                <div class="form-group form-full">
                  <label>Notes</label>
                  <textarea v-model="form.notes" rows="2" placeholder="Any notes about this therapist..." />
                </div>

              </div>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showModal = false">Cancel</button>
              <button class="btn-gold" @click="saveTherapist">
                {{ editingTherapist ? 'Save Changes' : 'Add Therapist' }}
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
              <h2 class="modal-title">Remove Therapist</h2>
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
                <strong>{{ deletingTherapist?.name }}</strong>
                from your team? This cannot be undone.
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showDeleteModal = false">Cancel</button>
              <button class="btn-danger" @click="deleteTherapist">Yes, Remove</button>
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
  MagnifyingGlassIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
  UserGroupIcon,
  ClockIcon,
  CheckCircleIcon,
  CameraIcon,
} from '@heroicons/vue/24/outline'

// ── FILTERS ──
const search          = ref('')
const filterStatus    = ref('')
const filterSpecialty = ref('')

// ── DATA ──
const therapists = ref([
  {
    id: 1,
    name: 'Liza Macaraeg',
    specialty: 'Massage Therapy',
    experience: '8 years',
    schedule: 'Mon–Sat, 9AM–6PM',
    phone: '0917-111-2222',
    email: 'liza@servora.com',
    joined: 'Jan 15, 2019',
    sessions: 420,
    clients: 180,
    revenue: '₱ 28,400',
    rating: '4.9',
    status: 'active',
    services: ['Swedish', 'Hot Stone', 'Prenatal'],
    certifications: ['NCBTMB Certified', 'Hot Stone Massage Cert.', 'Prenatal Massage Cert.'],
    notes: 'Senior therapist. Handles VIP clients.',
    avatar: 'https://i.pravatar.cc/120?img=16',
  },
  {
    id: 2,
    name: 'Jenny Ortega',
    specialty: 'Body Treatments',
    experience: '5 years',
    schedule: 'Tue–Sun, 10AM–7PM',
    phone: '0918-222-3333',
    email: 'jenny@servora.com',
    joined: 'Mar 10, 2021',
    sessions: 310,
    clients: 140,
    revenue: '₱ 22,100',
    rating: '4.8',
    status: 'active',
    services: ['Body Scrub', 'Aromatherapy', 'Swedish'],
    certifications: ['Body Wrap Specialist', 'Aromatherapy Cert.'],
    notes: 'Excellent with body treatment packages.',
    avatar: 'https://i.pravatar.cc/120?img=21',
  },
  {
    id: 3,
    name: 'Carla Delos Reyes',
    specialty: 'Facial & Skin Care',
    experience: '6 years',
    schedule: 'Mon–Fri, 9AM–5PM',
    phone: '0919-333-4444',
    email: 'carla@servora.com',
    joined: 'Jun 1, 2020',
    sessions: 280,
    clients: 120,
    revenue: '₱ 19,800',
    rating: '4.9',
    status: 'active',
    services: ['Aromatherapy Facial', 'Brightening Facial', 'Deep Cleanse'],
    certifications: ['Esthetics License', 'Chemical Peel Cert.', 'LED Therapy Cert.'],
    notes: 'Skin care specialist. Clients love her.',
    avatar: 'https://i.pravatar.cc/120?img=32',
  },
  {
    id: 4,
    name: 'Mark Reyes',
    specialty: 'Massage Therapy',
    experience: '4 years',
    schedule: 'Wed–Sun, 11AM–8PM',
    phone: '0920-444-5555',
    email: 'mark@servora.com',
    joined: 'Sep 15, 2022',
    sessions: 220,
    clients: 95,
    revenue: '₱ 16,100',
    rating: '4.7',
    status: 'active',
    services: ['Deep Tissue', 'Swedish', 'Sports Massage'],
    certifications: ['NCBTMB Certified', 'Sports Massage Cert.'],
    notes: 'Specializes in deep tissue for athletes.',
    avatar: 'https://i.pravatar.cc/120?img=51',
  },
  {
    id: 5,
    name: 'Sofia Navarro',
    specialty: 'Foot Care',
    experience: '3 years',
    schedule: 'Mon–Fri, 10AM–6PM',
    phone: '0921-555-6666',
    email: 'sofia@servora.com',
    joined: 'Feb 1, 2023',
    sessions: 150,
    clients: 80,
    revenue: '₱ 10,500',
    rating: '4.8',
    status: 'on-leave',
    services: ['Foot Reflexology', 'Foot Scrub', 'Hot Stone Pedicure'],
    certifications: ['Reflexology Cert.', 'Foot Care Specialist'],
    notes: 'Currently on maternity leave. Returns April 2026.',
    avatar: 'https://i.pravatar.cc/120?img=25',
  },
  {
    id: 6,
    name: 'Rico Mangubat',
    specialty: 'Massage Therapy',
    experience: '2 years',
    schedule: 'Thu–Mon, 12PM–9PM',
    phone: '0922-666-7777',
    email: 'rico@servora.com',
    joined: 'Jul 10, 2024',
    sessions: 90,
    clients: 55,
    revenue: '₱ 6,300',
    rating: '4.6',
    status: 'active',
    services: ['Swedish', 'Relaxation Massage'],
    certifications: ['NCBTMB Certified'],
    notes: 'New therapist with great potential.',
    avatar: 'https://i.pravatar.cc/120?img=53',
  },
])

// ── STATS ──
const therapistStats = computed(() => [
  { label: 'Total Staff',    value: therapists.value.length },
  { label: 'Active',         value: therapists.value.filter(t => t.status === 'active').length },
  { label: 'On Leave',       value: therapists.value.filter(t => t.status === 'on-leave').length },
  { label: 'Inactive',       value: therapists.value.filter(t => t.status === 'inactive').length },
  { label: 'Total Sessions', value: therapists.value.reduce((a, t) => a + t.sessions, 0) },
  {
    label: 'Avg. Rating',
    value: (therapists.value.reduce((a, t) => a + parseFloat(t.rating), 0) / therapists.value.length).toFixed(1) + ' ★'
  },
])

// ── FILTERED ──
const filtered = computed(() => {
  const q = search.value.toLowerCase()
  return therapists.value.filter(t => {
    const matchSearch    = !q || t.name.toLowerCase().includes(q) || t.specialty.toLowerCase().includes(q)
    const matchStatus    = !filterStatus.value    || t.status    === filterStatus.value
    const matchSpecialty = !filterSpecialty.value || t.specialty === filterSpecialty.value
    return matchSearch && matchStatus && matchSpecialty
  })
})

// ── DETAIL DRAWER ──
const showDetail         = ref(false)
const selectedTherapist  = ref(null)
function openDetail(t) {
  selectedTherapist.value = t
  showDetail.value = true
}

// ── MODAL ──
const showModal        = ref(false)
const editingTherapist = ref(null)

const emptyForm = () => ({
  name: '', specialty: '', phone: '', email: '',
  experience: '', joined: '', schedule: '',
  certificationsRaw: '', notes: '', status: 'active',
  avatar: '', rating: '5.0',
})
const form = reactive(emptyForm())

function handleAvatarChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = (ev) => {
    form.avatar = ev.target.result
    // Also update the therapist in the list immediately if editing
    if (editingTherapist.value) {
      const idx = therapists.value.findIndex(t => t.id === editingTherapist.value.id)
      if (idx !== -1) therapists.value[idx].avatar = ev.target.result
    }
  }
  reader.readAsDataURL(file)
}

function openModal(t = null) {
  editingTherapist.value = t
  if (t) {
    Object.assign(form, {
      ...t,
      certificationsRaw: (t.certifications || []).join('\n'),
      avatar: t.avatar || '',
      rating: t.rating || '5.0',
    })
  } else {
    Object.assign(form, emptyForm())
  }
  showModal.value = true
}

function saveTherapist() {
  if (!form.name || !form.specialty) return
  const certifications = form.certificationsRaw
    .split('\n').map(c => c.trim()).filter(Boolean)

  if (editingTherapist.value) {
    const idx = therapists.value.findIndex(t => t.id === editingTherapist.value.id)
    if (idx !== -1) {
      therapists.value[idx] = { ...therapists.value[idx], ...form, certifications }
    }
  } else {
    therapists.value.unshift({
      id: Date.now(),
      avatar: `https://i.pravatar.cc/120?img=${Math.floor(Math.random() * 50) + 1}`,
      sessions: 0,
      clients: 0,
      revenue: '₱ 0',
      rating: '5.0',
      services: [],
      certifications,
      ...form,
    })
  }
  showModal.value = false
}

// ── DELETE ──
const showDeleteModal    = ref(false)
const deletingTherapist  = ref(null)

function confirmDelete(t) {
  deletingTherapist.value = t
  showDeleteModal.value = true
}
function deleteTherapist() {
  therapists.value = therapists.value.filter(t => t.id !== deletingTherapist.value.id)
  showDeleteModal.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.therapists-page { font-family: 'Jost', sans-serif; padding-bottom: 3rem; }

/* ── HEADER ── */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.8rem; }
.page-eyebrow { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.2rem; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: #1a1a14; letter-spacing: 0.02em; }

.btn-gold { background: #c9a96e; color: #1a1a14; border: none; padding: 0.7rem 1.5rem; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s, transform 0.2s; white-space: nowrap; }
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }
.btn-full { width: 100%; justify-content: center; }

/* ── STATS ── */
.t-stats { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.tstat-card { background: #fff; border-radius: 8px; padding: 1rem 1.4rem; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 12px rgba(26,26,20,0.04); text-align: center; min-width: 90px; }
.tstat-value { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; color: #1a1a14; line-height: 1; }
.tstat-label { font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: #9ca3af; margin-top: 4px; }

/* ── TOOLBAR ── */
.toolbar { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
.search-input { width: 100%; padding: 0.65rem 0.85rem 0.65rem 2.4rem; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14; background: #fff; outline: none; transition: border 0.2s; }
.search-input:focus { border-color: #c9a96e; }
.search-input::placeholder { color: #c4bfb6; }
.filters { display: flex; gap: 0.75rem; }
.filter-select { padding: 0.65rem 1rem; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.8rem; color: #374151; background: #fff; outline: none; cursor: pointer; }
.filter-select:focus { border-color: #c9a96e; }

/* ── CARDS GRID ── */
.therapists-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(270px, 1fr)); gap: 1.25rem; }
.t-card { background: #fff; border-radius: 10px; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 16px rgba(26,26,20,0.05); overflow: hidden; cursor: pointer; transition: box-shadow 0.2s, transform 0.2s; position: relative; }
.t-card:hover { box-shadow: 0 8px 32px rgba(26,26,20,0.1); transform: translateY(-2px); }

.t-card-ribbon { position: absolute; top: 0; left: 0; right: 0; height: 3px; }
.t-card-ribbon.active   { background: linear-gradient(to right, #c9a96e, #e2c99a); }
.t-card-ribbon.on-leave { background: linear-gradient(to right, #7a8fa6, #a0b4c8); }
.t-card-ribbon.inactive { background: #e5e7eb; }

.t-card-body { padding: 1.25rem; display: flex; flex-direction: column; gap: 1rem; }
.t-card-top  { display: flex; align-items: center; justify-content: space-between; }

.t-status-badge { display: inline-block; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.22rem 0.6rem; border-radius: 999px; }
.t-status-badge.active   { background: rgba(106,155,103,0.15); color: #4a8a47; }
.t-status-badge.on-leave { background: rgba(122,143,166,0.15); color: #4a6a8a; }
.t-status-badge.inactive { background: rgba(156,163,175,0.2);  color: #6b7280; }

.t-card-actions { display: flex; gap: 0.4rem; }
.action-btn { padding: 0.4rem; border-radius: 6px; border: none; cursor: pointer; display: flex; align-items: center; transition: background 0.15s; }
.action-btn.edit   { background: rgba(201,169,110,0.1); color: #a07830; }
.action-btn.edit:hover { background: rgba(201,169,110,0.25); }
.action-btn.delete { background: rgba(192,114,90,0.1); color: #b05540; }
.action-btn.delete:hover { background: rgba(192,114,90,0.25); }

.t-profile { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 0.3rem; }
.t-avatar-wrap { position: relative; display: inline-block; margin-bottom: 0.25rem; }
.t-avatar { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(201,169,110,0.25); }
.t-rating-chip { position: absolute; bottom: -2px; right: -4px; background: #c9a96e; color: #1a1a14; font-size: 0.58rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 999px; border: 2px solid #fff; }
.t-name      { font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 400; color: #1a1a14; }
.t-specialty { font-size: 0.72rem; color: #c9a96e; letter-spacing: 0.08em; text-transform: uppercase; font-weight: 500; }
.t-experience{ font-size: 0.7rem; color: #9ca3af; }

.t-tags { display: flex; flex-wrap: wrap; gap: 0.4rem; justify-content: center; }
.t-tag { background: rgba(201,169,110,0.1); color: #a07830; font-size: 0.65rem; font-weight: 500; letter-spacing: 0.05em; padding: 0.2rem 0.6rem; border-radius: 999px; }

.t-mini-stats { display: flex; align-items: center; background: #fdf8f0; border-radius: 8px; padding: 0.75rem; }
.tms-item { flex: 1; text-align: center; }
.tms-val   { display: block; font-family: 'Cormorant Garamond', serif; font-size: 1.1rem; font-weight: 400; color: #1a1a14; line-height: 1; }
.tms-label { font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-top: 2px; }
.tms-divider { width: 1px; height: 28px; background: rgba(201,169,110,0.2); }

.t-schedule { display: flex; align-items: center; gap: 0.5rem; padding-top: 0.25rem; border-top: 1px solid rgba(201,169,110,0.1); }
.t-schedule-text { font-size: 0.72rem; color: #6b7280; }

.empty-state { grid-column: 1/-1; text-align: center; padding: 3rem; color: #9ca3af; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; font-size: 0.85rem; }

/* ── DRAWER ── */
.drawer-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(26,26,20,0.5); backdrop-filter: blur(4px); display: flex; justify-content: flex-end; }
.drawer { background: #fff; width: 100%; max-width: 400px; height: 100%; overflow-y: auto; box-shadow: -8px 0 40px rgba(26,26,20,0.15); border-left: 1px solid rgba(201,169,110,0.15); }
.drawer-header { display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 1.6rem; border-bottom: 1px solid rgba(201,169,110,0.12); }
.drawer-title { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em; }
.drawer-body { padding: 1.6rem; display: flex; flex-direction: column; gap: 1.4rem; }

.dp-hero { display: flex; align-items: center; gap: 1rem; }
.dp-avatar-wrap { position: relative; flex-shrink: 0; }
.dp-avatar { width: 72px; height: 72px; border-radius: 50%; object-fit: cover; border: 3px solid rgba(201,169,110,0.3); }
.dp-rating { position: absolute; bottom: -2px; right: -4px; background: #c9a96e; color: #1a1a14; font-size: 0.58rem; font-weight: 700; padding: 0.15rem 0.4rem; border-radius: 999px; border: 2px solid #fff; }
.dp-name     { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; }
.dp-specialty{ font-size: 0.7rem; color: #c9a96e; letter-spacing: 0.1em; text-transform: uppercase; margin-top: 2px; }

.dp-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; background: #fdf8f0; border-radius: 8px; padding: 1rem; }
.dp-field { display: flex; flex-direction: column; gap: 2px; }
.dp-field-full { grid-column: 1/-1; }
.dpf-label { font-size: 0.62rem; letter-spacing: 0.12em; text-transform: uppercase; color: #9ca3af; }
.dpf-val   { font-size: 0.84rem; color: #1a1a14; }

.dp-stats { display: flex; border: 1px solid rgba(201,169,110,0.15); border-radius: 8px; overflow: hidden; }
.dp-stat  { flex: 1; padding: 0.85rem; text-align: center; }
.dp-stat:not(:last-child) { border-right: 1px solid rgba(201,169,110,0.15); }
.dps-val   { font-family: 'Cormorant Garamond', serif; font-size: 1.2rem; font-weight: 400; color: #c9a96e; line-height: 1; }
.dps-label { font-size: 0.58rem; letter-spacing: 0.1em; text-transform: uppercase; color: #9ca3af; margin-top: 4px; }

.cert-list { display: flex; flex-direction: column; gap: 0.5rem; }
.cert-item { display: flex; align-items: center; gap: 0.5rem; font-size: 0.82rem; color: #374151; }
.cert-icon { color: #c9a96e; flex-shrink: 0; }

.dp-notes-text { font-size: 0.82rem; color: #374151; line-height: 1.6; background: #fdf8f0; border-radius: 8px; padding: 0.85rem; }
.dp-actions { display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem; }

/* ── AVATAR UPLOAD ── */
.avatar-upload-wrap {
  display: flex; align-items: center; gap: 1.25rem;
  padding: 1rem; background: #fdf8f0; border-radius: 10px;
  border: 1px solid rgba(201,169,110,0.15); margin-bottom: 1.25rem;
}
.modal-avatar-wrap { position: relative; flex-shrink: 0; }
.modal-avatar {
  width: 72px; height: 72px; border-radius: 50%;
  object-fit: cover; border: 3px solid rgba(201,169,110,0.3);
  display: block;
}
.avatar-cam-btn {
  position: absolute; bottom: -2px; right: -2px;
  width: 26px; height: 26px; border-radius: 50%;
  background: #c9a96e; color: #1a1a14;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; border: 2px solid #fff;
  transition: background 0.2s; z-index: 2;
}
.avatar-cam-btn:hover { background: #e2c99a; }
.avatar-file-input { display: none; }
.avatar-upload-info { flex: 1; }
.aui-title { font-size: 0.82rem; font-weight: 500; color: #1a1a14; margin-bottom: 0.25rem; }
.aui-sub   { font-size: 0.72rem; color: #9ca3af; line-height: 1.5; }
.modal-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(26,26,20,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 580px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(26,26,20,0.2); border: 1px solid rgba(201,169,110,0.15); }
.modal-sm { max-width: 420px; }
.modal-header { display: flex; align-items: center; justify-content: space-between; padding: 1.4rem 1.6rem; border-bottom: 1px solid rgba(201,169,110,0.12); }
.modal-title  { font-family: 'Cormorant Garamond', serif; font-size: 1.3rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.04em; }
.modal-close  { background: none; border: none; cursor: pointer; color: #9ca3af; padding: 0.25rem; border-radius: 4px; transition: color 0.2s; }
.modal-close:hover { color: #1a1a14; }
.modal-body   { padding: 1.6rem; }
.modal-footer { display: flex; justify-content: flex-end; gap: 0.75rem; padding: 1.2rem 1.6rem; border-top: 1px solid rgba(201,169,110,0.12); }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
.form-group { display: flex; flex-direction: column; gap: 0.4rem; }
.form-full  { grid-column: 1 / -1; }
.form-group label { font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase; color: #6b7280; font-weight: 500; }
.form-group input,
.form-group select,
.form-group textarea { padding: 0.65rem 0.85rem; border: 1px solid rgba(201,169,110,0.25); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14; background: #fff; outline: none; transition: border 0.2s; resize: none; }
.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus { border-color: #c9a96e; }

.status-radios { display: flex; gap: 0.75rem; flex-wrap: wrap; align-items: center; }
.radio-label { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; }
.radio-label input[type="radio"] { accent-color: #c9a96e; }

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
  .therapists-grid { grid-template-columns: 1fr; }
  .form-grid { grid-template-columns: 1fr; }
}
</style>
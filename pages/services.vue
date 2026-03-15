<template>
  <NuxtLayout>
    <div class="services-page">

      <!-- ── PAGE HEADER ── -->
      <div class="page-header">
        <div>
          <p class="page-eyebrow">Manage</p>
          <h1 class="page-title">Services</h1>
        </div>
        <button class="btn-gold" @click="openModal()">+ Add Service</button>
      </div>

      <!-- ── STAT PILLS ── -->
      <div class="svc-stats">
        <div v-for="s in serviceStats" :key="s.label" class="sstat-card">
          <p class="sstat-value">{{ s.value }}</p>
          <p class="sstat-label">{{ s.label }}</p>
        </div>
      </div>

      <!-- ── CATEGORY TABS ── -->
      <div class="cat-tabs">
        <button
          v-for="cat in categories"
          :key="cat"
          :class="['cat-tab', activeCategory === cat ? 'active' : '']"
          @click="activeCategory = cat"
        >
          {{ cat }}
        </button>
      </div>

      <!-- ── TOOLBAR ── -->
      <div class="toolbar">
        <div class="search-wrap">
          <MagnifyingGlassIcon class="search-icon size-4" />
          <input
            v-model="search"
            type="text"
            placeholder="Search services..."
            class="search-input"
          />
        </div>
        <div class="filters">
          <select v-model="filterStatus" class="filter-select">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select v-model="sortBy" class="filter-select">
            <option value="name">Sort: Name</option>
            <option value="price">Sort: Price</option>
            <option value="duration">Sort: Duration</option>
            <option value="bookings">Sort: Bookings</option>
          </select>
        </div>
      </div>

      <!-- ── SERVICE CARDS GRID ── -->
      <div class="services-grid">
        <div
          v-for="svc in filtered"
          :key="svc.id"
          class="svc-card"
        >
          <!-- Card top color bar -->
          <div class="svc-card-bar" :style="{ background: svc.color }"></div>

          <div class="svc-card-body">
            <!-- Icon + Status -->
            <div class="svc-card-top">
              <div class="svc-icon-wrap" :style="{ background: svc.color + '22' }">
                <span class="svc-emoji">{{ svc.emoji }}</span>
              </div>
              <span class="svc-status-badge" :class="svc.status">{{ svc.status }}</span>
            </div>

            <!-- Info -->
            <h3 class="svc-name">{{ svc.name }}</h3>
            <p class="svc-category-tag">{{ svc.category }}</p>
            <p class="svc-desc">{{ svc.description }}</p>

            <!-- Details row -->
            <div class="svc-details">
              <div class="svc-detail">
                <ClockIcon class="size-3.5" />
                <span>{{ svc.duration }}</span>
              </div>
              <div class="svc-detail">
                <UserIcon class="size-3.5" />
                <span>{{ svc.therapist }}</span>
              </div>
            </div>

            <!-- Bookings bar -->
            <div class="svc-bookings">
              <div class="svc-book-row">
                <span class="svc-book-label">Bookings this month</span>
                <span class="svc-book-count">{{ svc.bookings }}</span>
              </div>
              <div class="svc-book-track">
                <div
                  class="svc-book-fill"
                  :style="{ width: Math.min((svc.bookings / maxBookings) * 100, 100) + '%', background: svc.color }"
                ></div>
              </div>
            </div>

            <!-- Price + Actions -->
            <div class="svc-footer">
              <p class="svc-price">₱ {{ svc.price.toLocaleString() }}</p>
              <div class="svc-actions">
                <button class="action-btn edit" @click="openModal(svc)" title="Edit">
                  <PencilSquareIcon class="size-4" />
                </button>
                <button
                  class="action-btn"
                  :class="svc.status === 'active' ? 'deactivate' : 'activate'"
                  @click="toggleStatus(svc)"
                  :title="svc.status === 'active' ? 'Deactivate' : 'Activate'"
                >
                  <component :is="svc.status === 'active' ? EyeSlashIcon : EyeIcon" class="size-4" />
                </button>
                <button class="action-btn delete" @click="confirmDelete(svc)" title="Delete">
                  <TrashIcon class="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-if="filtered.length === 0" class="empty-state">
          <SparklesIcon class="size-10" style="color:#d1cdc7" />
          <p>No services found.</p>
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
              <h2 class="modal-title">{{ editingSvc ? 'Edit Service' : 'Add New Service' }}</h2>
              <button class="modal-close" @click="showModal = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>

            <div class="modal-body">
              <div class="form-grid">

                <div class="form-group">
                  <label>Service Name</label>
                  <input v-model="form.name" type="text" placeholder="e.g. Swedish Massage" />
                </div>

                <div class="form-group">
                  <label>Category</label>
                  <select v-model="form.category">
                    <option value="">Select category</option>
                    <option>Massage</option>
                    <option>Facial</option>
                    <option>Body Treatment</option>
                    <option>Foot Care</option>
                    <option>Package</option>
                  </select>
                </div>

                <div class="form-group full">
                  <label>Description</label>
                  <textarea v-model="form.description" rows="2" placeholder="Brief description of the service..." />
                </div>

                <div class="form-group">
                  <label>Duration</label>
                  <select v-model="form.duration">
                    <option>30 mins</option>
                    <option>45 mins</option>
                    <option>1 hour</option>
                    <option>1.5 hours</option>
                    <option>2 hours</option>
                    <option>3 hours</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Price (₱)</label>
                  <input v-model="form.price" type="number" placeholder="e.g. 1500" />
                </div>

                <div class="form-group">
                  <label>Assigned Therapist</label>
                  <select v-model="form.therapist">
                    <option value="">Any available</option>
                    <option>Liza Macaraeg</option>
                    <option>Jenny Ortega</option>
                    <option>Mark Reyes</option>
                    <option>Carla Delos Reyes</option>
                    <option>All Therapists</option>
                  </select>
                </div>

                <div class="form-group">
                  <label>Emoji / Icon</label>
                  <div class="emoji-picker">
                    <button
                      v-for="e in emojiOptions"
                      :key="e"
                      :class="['emoji-btn', form.emoji === e ? 'active' : '']"
                      type="button"
                      @click="form.emoji = e"
                    >{{ e }}</button>
                  </div>
                </div>

                <div class="form-group">
                  <label>Color Tag</label>
                  <div class="color-picker">
                    <button
                      v-for="c in colorOptions"
                      :key="c"
                      :class="['color-btn', form.color === c ? 'active' : '']"
                      type="button"
                      @click="form.color = c"
                      :style="{ background: c }"
                    ></button>
                  </div>
                </div>

                <div class="form-group full">
                  <label>Status</label>
                  <div class="status-radios">
                    <label class="radio-label">
                      <input type="radio" v-model="form.status" value="active" />
                      <span class="svc-status-badge active">active</span>
                    </label>
                    <label class="radio-label">
                      <input type="radio" v-model="form.status" value="inactive" />
                      <span class="svc-status-badge inactive">inactive</span>
                    </label>
                  </div>
                </div>

              </div>
            </div>

            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showModal = false">Cancel</button>
              <button class="btn-gold" @click="saveSvc">
                {{ editingSvc ? 'Save Changes' : 'Add Service' }}
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
              <h2 class="modal-title">Delete Service</h2>
              <button class="modal-close" @click="showDeleteModal = false">
                <XMarkIcon class="size-5" />
              </button>
            </div>
            <div class="modal-body">
              <div class="delete-icon-wrap">
                <TrashIcon class="size-8" style="color:#c0725a" />
              </div>
              <p class="delete-msg">
                Are you sure you want to delete
                <strong>{{ deletingSvc?.name }}</strong>?
                This cannot be undone.
              </p>
            </div>
            <div class="modal-footer">
              <button class="btn-ghost-dark" @click="showDeleteModal = false">Cancel</button>
              <button class="btn-danger" @click="deleteSvc">Yes, Delete</button>
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
  XMarkIcon, SparklesIcon, ClockIcon, UserIcon,
  EyeIcon, EyeSlashIcon,
} from '@heroicons/vue/24/outline'

// ── FILTERS ──
const search         = ref('')
const filterStatus   = ref('')
const sortBy         = ref('name')
const activeCategory = ref('All')

const categories = ['All', 'Massage', 'Facial', 'Body Treatment', 'Foot Care', 'Package']

// ── DATA ──
const services = ref([
  { id:1,  name:'Swedish Massage',       category:'Massage',         description:'A classic full-body massage using long, flowing strokes to relax muscles and improve circulation.',            duration:'1 hour',    price:1200, therapist:'All Therapists',    bookings:42, status:'active',   color:'#c9a96e', emoji:'🌿' },
  { id:2,  name:'Hot Stone Massage',     category:'Massage',         description:'Smooth heated basalt stones are used to melt away tension and deeply relax tight muscles.',                  duration:'1.5 hours', price:1800, therapist:'Liza Macaraeg',     bookings:35, status:'active',   color:'#b05540', emoji:'🪨' },
  { id:3,  name:'Deep Tissue Massage',   category:'Massage',         description:'Targets the deeper layers of muscle tissue to release chronic pain and tension patterns.',                   duration:'1 hour',    price:1500, therapist:'Mark Reyes',        bookings:28, status:'active',   color:'#3a4a38', emoji:'💆' },
  { id:4,  name:'Aromatherapy Facial',   category:'Facial',          description:'A luxurious facial combining essential oils and gentle massage techniques for a radiant glow.',              duration:'1 hour',    price:2200, therapist:'Carla Delos Reyes', bookings:20, status:'active',   color:'#7a8fa6', emoji:'🌸' },
  { id:5,  name:'Foot Reflexology',      category:'Foot Care',       description:'Pressure points on the feet are stimulated to promote healing and relaxation throughout the body.',         duration:'30 mins',   price:900,  therapist:'Liza Macaraeg',     bookings:18, status:'active',   color:'#8a7a6e', emoji:'🦶' },
  { id:6,  name:'Body Scrub',            category:'Body Treatment',  description:'A revitalizing full-body exfoliation treatment that leaves skin silky smooth and deeply nourished.',        duration:'1.5 hours', price:1600, therapist:'Jenny Ortega',      bookings:15, status:'active',   color:'#9a6e8a', emoji:'✨' },
  { id:7,  name:'Couple\'s Retreat',     category:'Package',         description:'A romantic spa experience for two — includes side-by-side massages, facials, and herbal foot soaks.',      duration:'3 hours',   price:4500, therapist:'All Therapists',    bookings:10, status:'active',   color:'#c06a7a', emoji:'💑' },
  { id:8,  name:'Brightening Facial',    category:'Facial',          description:'Targets uneven skin tone and dullness using vitamin C serums and gentle enzyme peels.',                     duration:'45 mins',   price:1900, therapist:'Carla Delos Reyes', bookings:12, status:'active',   color:'#e2a85a', emoji:'🌟' },
  { id:9,  name:'Prenatal Massage',      category:'Massage',         description:'A gentle and safe massage designed specifically for expecting mothers to relieve aches and swelling.',      duration:'1 hour',    price:1400, therapist:'Jenny Ortega',      bookings:6,  status:'inactive', color:'#6a9b67', emoji:'🤰' },
  { id:10, name:'Full Spa Day Package',  category:'Package',         description:'The ultimate self-care day: massage, facial, body scrub, foot reflexology, and a herbal bath.',            duration:'3 hours',   price:5800, therapist:'All Therapists',    bookings:8,  status:'active',   color:'#1a1a14', emoji:'👑' },
])

// ── COMPUTED ──
const maxBookings = computed(() => Math.max(...services.value.map(s => s.bookings)))

const serviceStats = computed(() => [
  { label: 'Total Services',  value: services.value.length },
  { label: 'Active',          value: services.value.filter(s => s.status === 'active').length },
  { label: 'Inactive',        value: services.value.filter(s => s.status === 'inactive').length },
  { label: 'Total Bookings',  value: services.value.reduce((a, s) => a + s.bookings, 0) },
  { label: 'Top Service',     value: services.value.reduce((a, b) => a.bookings > b.bookings ? a : b).name.split(' ')[0] + '...' },
])

const filtered = computed(() => {
  let list = services.value.filter(s => {
    const q = search.value.toLowerCase()
    const matchSearch = !q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    const matchStatus = !filterStatus.value || s.status === filterStatus.value
    const matchCat    = activeCategory.value === 'All' || s.category === activeCategory.value
    return matchSearch && matchStatus && matchCat
  })
  if (sortBy.value === 'price')    list = [...list].sort((a,b) => b.price - a.price)
  if (sortBy.value === 'duration') list = [...list].sort((a,b) => a.duration.localeCompare(b.duration))
  if (sortBy.value === 'bookings') list = [...list].sort((a,b) => b.bookings - a.bookings)
  if (sortBy.value === 'name')     list = [...list].sort((a,b) => a.name.localeCompare(b.name))
  return list
})

// ── TOGGLE STATUS ──
function toggleStatus(svc) {
  const idx = services.value.findIndex(s => s.id === svc.id)
  if (idx !== -1) services.value[idx].status = services.value[idx].status === 'active' ? 'inactive' : 'active'
}

// ── MODAL ──
const showModal  = ref(false)
const editingSvc = ref(null)

const emojiOptions = ['🌿','🪨','💆','🌸','🦶','✨','💑','🌟','🤰','👑','🧖','🛁','🪷','🍃','💎']
const colorOptions = ['#c9a96e','#b05540','#3a4a38','#7a8fa6','#8a7a6e','#9a6e8a','#c06a7a','#e2a85a','#6a9b67','#1a1a14']

const emptyForm = () => ({
  name:'', category:'', description:'', duration:'1 hour',
  price:'', therapist:'', emoji:'🌿', color:'#c9a96e',
  status:'active', bookings:0,
})
const form = reactive(emptyForm())

function openModal(svc = null) {
  editingSvc.value = svc
  Object.assign(form, svc ? { ...svc } : emptyForm())
  showModal.value = true
}

function saveSvc() {
  if (!form.name || !form.category) return
  if (editingSvc.value) {
    const idx = services.value.findIndex(s => s.id === editingSvc.value.id)
    if (idx !== -1) services.value[idx] = { ...services.value[idx], ...form, price: Number(form.price) }
  } else {
    services.value.unshift({
      id: Date.now(),
      ...form,
      price: Number(form.price),
      bookings: 0,
    })
  }
  showModal.value = false
}

// ── DELETE ──
const showDeleteModal = ref(false)
const deletingSvc     = ref(null)

function confirmDelete(svc) {
  deletingSvc.value = svc
  showDeleteModal.value = true
}
function deleteSvc() {
  services.value = services.value.filter(s => s.id !== deletingSvc.value.id)
  showDeleteModal.value = false
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.services-page { font-family: 'Jost', sans-serif; padding-bottom: 3rem; }

/* ── HEADER ── */
.page-header { display: flex; align-items: flex-start; justify-content: space-between; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.8rem; }
.page-eyebrow { font-size: 0.65rem; letter-spacing: 0.3em; text-transform: uppercase; color: #c9a96e; margin-bottom: 0.2rem; }
.page-title { font-family: 'Cormorant Garamond', serif; font-size: 2rem; font-weight: 300; color: #1a1a14; letter-spacing: 0.02em; }
.btn-gold { background: #c9a96e; color: #1a1a14; border: none; padding: 0.7rem 1.5rem; font-family: 'Jost', sans-serif; font-size: 0.75rem; font-weight: 500; letter-spacing: 0.12em; text-transform: uppercase; cursor: pointer; border-radius: 4px; transition: background 0.2s, transform 0.2s; white-space: nowrap; }
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }

/* ── STATS ── */
.svc-stats { display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.sstat-card { background: #fff; border-radius: 8px; padding: 1rem 1.5rem; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 12px rgba(26,26,20,0.04); text-align: center; min-width: 90px; }
.sstat-value { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 400; color: #1a1a14; line-height: 1; }
.sstat-label { font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: #9ca3af; margin-top: 4px; }

/* ── CATEGORY TABS ── */
.cat-tabs { display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
.cat-tab { padding: 0.5rem 1.1rem; border-radius: 999px; font-size: 0.75rem; font-family: 'Jost', sans-serif; font-weight: 400; letter-spacing: 0.06em; border: 1px solid rgba(201,169,110,0.25); background: #fff; color: #6b7280; cursor: pointer; transition: all 0.2s; }
.cat-tab:hover { border-color: #c9a96e; color: #a07830; }
.cat-tab.active { background: #c9a96e; color: #1a1a14; border-color: #c9a96e; font-weight: 500; }

/* ── TOOLBAR ── */
.toolbar { display: flex; align-items: center; gap: 0.75rem; flex-wrap: wrap; margin-bottom: 1.5rem; }
.search-wrap { position: relative; flex: 1; min-width: 200px; }
.search-icon { position: absolute; left: 0.85rem; top: 50%; transform: translateY(-50%); color: #9ca3af; pointer-events: none; }
.search-input { width: 100%; padding: 0.65rem 0.85rem 0.65rem 2.4rem; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14; background: #fff; outline: none; transition: border 0.2s; }
.search-input:focus { border-color: #c9a96e; }
.search-input::placeholder { color: #c4bfb6; }
.filters { display: flex; gap: 0.75rem; }
.filter-select { padding: 0.65rem 1rem; border: 1px solid rgba(201,169,110,0.2); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.8rem; color: #374151; background: #fff; outline: none; cursor: pointer; transition: border 0.2s; }
.filter-select:focus { border-color: #c9a96e; }

/* ── SERVICES GRID ── */
.services-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1.25rem; }

.svc-card { background: #fff; border-radius: 10px; border: 1px solid rgba(201,169,110,0.12); box-shadow: 0 2px 16px rgba(26,26,20,0.05); overflow: hidden; transition: box-shadow 0.2s, transform 0.2s; display: flex; flex-direction: column; }
.svc-card:hover { box-shadow: 0 8px 32px rgba(26,26,20,0.1); transform: translateY(-2px); }

.svc-card-bar { height: 4px; width: 100%; }
.svc-card-body { padding: 1.3rem; display: flex; flex-direction: column; gap: 0.75rem; flex: 1; }

.svc-card-top { display: flex; align-items: center; justify-content: space-between; }
.svc-icon-wrap { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; }
.svc-emoji { font-size: 1.3rem; }

.svc-status-badge { display: inline-block; font-size: 0.6rem; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.22rem 0.6rem; border-radius: 999px; }
.svc-status-badge.active   { background: rgba(106,155,103,0.15); color: #4a8a47; }
.svc-status-badge.inactive { background: rgba(156,163,175,0.2);  color: #6b7280; }

.svc-name { font-family: 'Cormorant Garamond', serif; font-size: 1.15rem; font-weight: 400; color: #1a1a14; letter-spacing: 0.02em; line-height: 1.2; }
.svc-category-tag { font-size: 0.62rem; letter-spacing: 0.15em; text-transform: uppercase; color: #c9a96e; font-weight: 500; margin-top: -0.3rem; }
.svc-desc { font-size: 0.78rem; color: #6b7280; line-height: 1.6; font-weight: 300; }

.svc-details { display: flex; gap: 1rem; }
.svc-detail { display: flex; align-items: center; gap: 0.35rem; font-size: 0.72rem; color: #9ca3af; }

.svc-bookings { margin-top: auto; padding-top: 0.5rem; }
.svc-book-row { display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.4rem; }
.svc-book-label { font-size: 0.65rem; letter-spacing: 0.06em; color: #9ca3af; text-transform: uppercase; }
.svc-book-count { font-size: 0.72rem; font-weight: 600; color: #374151; }
.svc-book-track { height: 5px; background: rgba(201,169,110,0.1); border-radius: 99px; overflow: hidden; }
.svc-book-fill { height: 100%; border-radius: 99px; transition: width 0.6s ease; }

.svc-footer { display: flex; align-items: center; justify-content: space-between; padding-top: 0.75rem; border-top: 1px solid rgba(201,169,110,0.1); }
.svc-price { font-family: 'Cormorant Garamond', serif; font-size: 1.4rem; font-weight: 400; color: #c9a96e; }
.svc-actions { display: flex; gap: 0.4rem; }
.action-btn { padding: 0.4rem; border-radius: 6px; border: none; cursor: pointer; display: flex; align-items: center; transition: background 0.15s; }
.action-btn.edit       { background: rgba(201,169,110,0.1); color: #a07830; }
.action-btn.edit:hover { background: rgba(201,169,110,0.25); }
.action-btn.deactivate       { background: rgba(106,155,103,0.1); color: #4a8a47; }
.action-btn.deactivate:hover { background: rgba(106,155,103,0.25); }
.action-btn.activate         { background: rgba(156,163,175,0.1); color: #6b7280; }
.action-btn.activate:hover   { background: rgba(156,163,175,0.25); }
.action-btn.delete       { background: rgba(192,114,90,0.1); color: #b05540; }
.action-btn.delete:hover { background: rgba(192,114,90,0.25); }

.empty-state { grid-column: 1/-1; text-align: center; padding: 3rem; color: #9ca3af; display: flex; flex-direction: column; align-items: center; gap: 0.75rem; font-size: 0.85rem; }

/* ── MODAL ── */
.modal-backdrop { position: fixed; inset: 0; z-index: 200; background: rgba(26,26,20,0.6); backdrop-filter: blur(4px); display: flex; align-items: center; justify-content: center; padding: 1rem; }
.modal { background: #fff; border-radius: 12px; width: 100%; max-width: 600px; max-height: 90vh; overflow-y: auto; box-shadow: 0 24px 60px rgba(26,26,20,0.2); border: 1px solid rgba(201,169,110,0.15); }
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
.form-group input, .form-group select, .form-group textarea { padding: 0.65rem 0.85rem; border: 1px solid rgba(201,169,110,0.25); border-radius: 6px; font-family: 'Jost', sans-serif; font-size: 0.82rem; color: #1a1a14; background: #fff; outline: none; transition: border 0.2s; resize: none; }
.form-group input:focus, .form-group select:focus, .form-group textarea:focus { border-color: #c9a96e; }

/* ── EMOJI PICKER ── */
.emoji-picker { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.emoji-btn { width: 36px; height: 36px; border-radius: 6px; border: 1px solid rgba(201,169,110,0.2); background: #fff; cursor: pointer; font-size: 1.1rem; display: flex; align-items: center; justify-content: center; transition: all 0.15s; }
.emoji-btn:hover { border-color: #c9a96e; background: #fdf8f0; }
.emoji-btn.active { border-color: #c9a96e; background: rgba(201,169,110,0.15); }

/* ── COLOR PICKER ── */
.color-picker { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.color-btn { width: 28px; height: 28px; border-radius: 50%; border: 2px solid transparent; cursor: pointer; transition: transform 0.15s, border-color 0.15s; }
.color-btn:hover { transform: scale(1.15); }
.color-btn.active { border-color: #1a1a14; transform: scale(1.15); }

/* ── STATUS RADIOS ── */
.status-radios { display: flex; gap: 0.75rem; align-items: center; }
.radio-label { display: flex; align-items: center; gap: 0.4rem; cursor: pointer; }
.radio-label input[type="radio"] { accent-color: #c9a96e; }

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

/* ── RESPONSIVE ── */
@media (max-width: 640px) {
  .form-grid { grid-template-columns: 1fr; }
  .services-grid { grid-template-columns: 1fr; }
}
</style>
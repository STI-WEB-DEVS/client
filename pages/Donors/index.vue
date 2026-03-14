<template>
  <NuxtLayout>
    <div class="donors-page">

      <!-- Page Header -->
      <div class="page-header">
        <div>
          <h1 class="page-title">Donors</h1>
          <p class="page-sub">Registered blood donor management</p>
        </div>
        <button class="btn-primary">+ Register Donor</button>
      </div>

      <!-- Search and filters -->
      <div class="controls">
        <div class="search-wrap">
          <MagnifyingGlassIcon class="search-icon size-4" />
          <input v-model="search" type="text" placeholder="Search donors..." class="search-input" />
        </div>
        <select v-model="filterType" class="filter-select">
          <option value="">All Blood Types</option>
          <option v-for="t in bloodTypes" :key="t" :value="t">{{ t }}</option>
        </select>
      </div>

      <!-- Donor cards -->
      <div class="donor-grid">
        <div v-for="donor in filteredDonors" :key="donor.id" class="donor-card">
          <div class="donor-header">
            <div class="d-avatar" :style="{ background: getColor(donor.bloodType) }">
              {{ donor.initials }}
            </div>
            <div class="d-type-badge">{{ donor.bloodType }}</div>
          </div>
          <div class="d-body">
            <h3 class="d-name">{{ donor.name }}</h3>
            <p class="d-location">📍 {{ donor.location }}</p>
            <div class="d-meta">
              <div class="d-stat">
                <span class="d-stat-label">Donations</span>
                <span class="d-stat-val">{{ donor.donations }}</span>
              </div>
              <div class="d-stat">
                <span class="d-stat-label">Last Donated</span>
                <span class="d-stat-val">{{ donor.lastDonated }}</span>
              </div>
              <div class="d-stat">
                <span class="d-stat-label">Status</span>
                <span class="d-status" :class="'dstatus-' + donor.status">{{ donor.statusLabel }}</span>
              </div>
            </div>
          </div>
          <div class="d-footer">
            <button class="btn-contact">
              <EnvelopeIcon class="size-4" /> Contact
            </button>
            <button class="btn-schedule">Schedule</button>
          </div>
        </div>
      </div>

      <p v-if="filteredDonors.length === 0" class="no-results">No donors match your search.</p>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { MagnifyingGlassIcon, EnvelopeIcon } from '@heroicons/vue/24/outline'

const search = ref('')
const filterType = ref('')
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-']

const donors = [
  { id: 1, name: 'Maria Clara Santos',    initials: 'MC', bloodType: 'O+',  location: 'Quezon City, NCR', donations: 8,  lastDonated: 'Jan 2026', status: 'eligible', statusLabel: 'Eligible' },
  { id: 2, name: 'Juan Miguel dela Cruz', initials: 'JM', bloodType: 'A+',  location: 'Makati, NCR',      donations: 5,  lastDonated: 'Dec 2025', status: 'eligible', statusLabel: 'Eligible' },
  { id: 3, name: 'Ana Luisa Reyes',       initials: 'AL', bloodType: 'B-',  location: 'Pasig, NCR',       donations: 12, lastDonated: 'Mar 2026', status: 'cooldown', statusLabel: 'Cooldown' },
  { id: 4, name: 'Pedro Jose Fernandez',  initials: 'PJ', bloodType: 'AB+', location: 'Taguig, NCR',      donations: 3,  lastDonated: 'Feb 2026', status: 'cooldown', statusLabel: 'Cooldown' },
  { id: 5, name: 'Rosa Imelda Gomez',     initials: 'RI', bloodType: 'O-',  location: 'Manila, NCR',      donations: 20, lastDonated: 'Nov 2025', status: 'eligible', statusLabel: 'Eligible' },
  { id: 6, name: 'Eduardo Kim Navarro',   initials: 'EK', bloodType: 'A-',  location: 'Marikina, NCR',    donations: 1,  lastDonated: 'Mar 2026', status: 'cooldown', statusLabel: 'Cooldown' },
  { id: 7, name: 'Luz Angela Bautista',   initials: 'LA', bloodType: 'B+',  location: 'Caloocan, NCR',    donations: 6,  lastDonated: 'Jan 2026', status: 'eligible', statusLabel: 'Eligible' },
  { id: 8, name: 'Ramon Cruz Villanueva', initials: 'RC', bloodType: 'AB-', location: 'Valenzuela, NCR',  donations: 9,  lastDonated: 'Feb 2026', status: 'deferred', statusLabel: 'Deferred' },
]

const colorMap: Record<string, string> = {
  'O+': '#c0392b', 'O-': '#922b21', 'A+': '#e74c3c', 'A-': '#a93226',
  'B+': '#7b241c', 'B-': '#cb4335', 'AB+': '#641e16', 'AB-': '#b03a2e',
}
const getColor = (type: string) => colorMap[type] || '#c0392b'

const filteredDonors = computed(() => donors.filter(d => {
  const matchSearch = d.name.toLowerCase().includes(search.value.toLowerCase())
  const matchType = !filterType.value || d.bloodType === filterType.value
  return matchSearch && matchType
}))
</script>

<style scoped>
/* Layout */
.donors-page { max-width: 1200px; }

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
  gap: 1rem;
}

/* Title */
.page-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 1.75rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.2;
}

/* Subtitle */
.page-sub {
  font-family: system-ui, -apple-system, sans-serif;
  font-size: 0.82rem;
  font-weight: 400;
  color: #999;
  margin: 5px 0 0;
  letter-spacing: 0.01em;
}

/* Register Button */
.btn-primary {
  padding: 0.65rem 1.25rem;
  background: linear-gradient(135deg, #c0392b, #e74c3c);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(192,57,43,0.25);
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 6px 18px rgba(192,57,43,0.35);
}


.controls {
  display: flex;
  gap: 1rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.search-wrap {
  position: relative;
  flex: 1;
  min-width: 200px;
}

.search-icon {
  position: absolute;
  left: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: #bbb;
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.6rem 1rem 0.6rem 2.4rem;
  background: white;
  border: 1px solid #f0e0e0;
  border-radius: 10px;
  font-size: 0.85rem;
  color: #333;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s;
}
.search-input:focus {
  border-color: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231,76,60,0.1);
}

.filter-select {
  padding: 0.6rem 1rem;
  background: white;
  border: 1px solid #f0e0e0;
  border-radius: 10px;
  font-size: 0.85rem;
  color: #333;
  outline: none;
  cursor: pointer;
  transition: border-color 0.2s;
}
.filter-select:focus { border-color: #e74c3c; }


.donor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(270px, 1fr));
  gap: 1.25rem;
}


.donor-card {
  background: white;
  border: 1px solid #f5e8e8;
  border-radius: 16px;
  padding: 1.25rem;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 1px 6px rgba(192,57,43,0.04);
}
.donor-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(192,57,43,0.1);
  border-color: #fecaca;
}

.donor-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.d-avatar {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
}

.d-type-badge {
  background: linear-gradient(135deg, #c0392b, #e74c3c);
  color: white;
  font-weight: 800;
  font-size: 0.95rem;
  padding: 5px 12px;
  border-radius: 10px;
  letter-spacing: 0.02em;
}

.d-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.d-location {
  font-size: 0.75rem;
  color: #999;
  margin: 3px 0 1rem;
}

.d-meta {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  padding: 0.75rem;
  background: #faf9f9;
  border-radius: 10px;
  border: 1px solid #f5e8e8;
}

.d-stat         { display: flex; flex-direction: column; gap: 3px; }
.d-stat-label   { font-size: 0.6rem; color: #bbb; text-transform: uppercase; letter-spacing: 0.05em; }
.d-stat-val     { font-size: 0.82rem; font-weight: 700; color: #333; }


.d-status {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 2px 7px;
  border-radius: 10px;
  display: inline-block;
  margin-top: 1px;
}
.dstatus-eligible { background: #f0fdf4; color: #16a34a; }
.dstatus-cooldown { background: #fffbeb; color: #d97706; }
.dstatus-deferred { background: #fef2f2; color: #c0392b; }


.d-footer {
  display: flex;
  gap: 8px;
  margin-top: 1rem;
}

.btn-contact {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  padding: 0.55rem;
  background: none;
  border: 1px solid #f0e0e0;
  border-radius: 8px;
  font-size: 0.78rem;
  color: #666;
  cursor: pointer;
  transition: all 0.15s;
}
.btn-contact:hover {
  background: #fef2f2;
  border-color: #fecaca;
  color: #c0392b;
}

.btn-schedule {
  flex: 1;
  padding: 0.55rem;
  background: #c0392b;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s;
}
.btn-schedule:hover { background: #e74c3c; }

.no-results {
  text-align: center;
  color: #bbb;
  padding: 3rem;
  font-size: 0.9rem;
}
</style>
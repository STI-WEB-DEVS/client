<template>
  <NuxtLayout>
    <div class="donors-page">

      <!-- ── Page Header ── -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-eyebrow">
            <span class="eyebrow-pip"></span>
            <span class="eyebrow-label">Blood Donation System</span>
          </div>
          <h1 class="page-title">Donors</h1>
          <p class="page-sub">Registered blood donor management</p>
        </div>

        <div class="header-right">
          <div class="summary-chips">
            <div class="summary-chip">
              <span class="chip-num">{{ donors.length }}</span>
              <span class="chip-label">Total</span>
            </div>
            <div class="summary-chip chip-eligible">
              <span class="chip-num">{{ eligibleCount }}</span>
              <span class="chip-label">Eligible</span>
            </div>
            <div class="summary-chip chip-cooldown">
              <span class="chip-num">{{ cooldownCount }}</span>
              <span class="chip-label">Cooldown</span>
            </div>
          </div>
          <button class="btn-register">
            <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;flex-shrink:0;">
              <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            Register Donor
          </button>
        </div>
      </div>

      <!-- ── Controls ── -->
      <div class="controls">
        <div class="search-wrap">
          <MagnifyingGlassIcon class="search-icon" style="width:16px;height:16px;" />
          <input
            v-model="search"
            type="text"
            placeholder="Search donors by name…"
            class="search-input"
          />
          <span v-if="search" class="search-clear" @click="search = ''">✕</span>
        </div>

        <div class="filter-group">
          <span class="filter-label">Blood Type</span>
          <div class="blood-type-pills">
            <button
              class="type-pill"
              :class="{ 'type-pill--active': filterType === '' }"
              @click="filterType = ''"
            >All</button>
            <button
              v-for="t in bloodTypes"
              :key="t"
              class="type-pill"
              :class="{ 'type-pill--active': filterType === t }"
              @click="filterType = t"
            >{{ t }}</button>
          </div>
        </div>
      </div>

      <!-- ── Donor Grid ── -->
      <div class="donor-grid">
        <div
          v-for="(donor, i) in filteredDonors"
          :key="donor.id"
          class="donor-card"
          :style="{ animationDelay: `${i * 0.06}s` }"
        >
          <!-- Card top accent bar -->
          <div class="card-accent" :style="{ background: getColor(donor.bloodType) }"></div>

          <!-- Card header -->
          <div class="card-header">
            <div class="d-avatar" :style="{ background: getColor(donor.bloodType) }">
              <span>{{ donor.initials }}</span>
            </div>
            <div class="d-type-badge">
              <svg viewBox="0 0 16 20" fill="none" style="width:9px;height:11px;opacity:0.7;">
                <path d="M8 1 C8 1 1 7 1 12 C1 16 4.1 19 8 19 C11.9 19 15 16 15 12 C15 7 8 1 8 1Z" fill="currentColor"/>
              </svg>
              {{ donor.bloodType }}
            </div>
          </div>

          <!-- Card body -->
          <div class="card-body">
            <h3 class="d-name">{{ donor.name }}</h3>
            <p class="d-location">
              <svg viewBox="0 0 20 20" fill="none" style="width:11px;height:11px;flex-shrink:0;">
                <path d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6z" stroke="currentColor" stroke-width="1.5"/>
                <circle cx="10" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
              </svg>
              {{ donor.location }}
            </p>

            <!-- Stats row -->
            <div class="d-stats">
              <div class="d-stat">
                <span class="d-stat-val">{{ donor.donations }}</span>
                <span class="d-stat-label">Donations</span>
              </div>
              <div class="stat-sep"></div>
              <div class="d-stat">
                <span class="d-stat-val">{{ donor.lastDonated }}</span>
                <span class="d-stat-label">Last Donated</span>
              </div>
              <div class="stat-sep"></div>
              <div class="d-stat">
                <span class="d-status" :class="'dstatus-' + donor.status">{{ donor.statusLabel }}</span>
                <span class="d-stat-label">Status</span>
              </div>
            </div>
          </div>

          <!-- Card footer -->
          <div class="card-footer">
            <button class="btn-contact">
              <EnvelopeIcon style="width:14px;height:14px;" />
              Contact
            </button>
            <button class="btn-schedule">
              Schedule
              <svg viewBox="0 0 20 20" fill="none" style="width:13px;height:13px;">
                <path d="M5 10h10M12 7l3 3-3 3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredDonors.length === 0" class="empty-state">
        <svg viewBox="0 0 60 76" fill="none" style="width:48px;height:60px;opacity:0.25;">
          <path d="M30 3 C30 3 3 26 3 44 C3 60 15.2 73 30 73 C44.8 73 57 60 57 44 C57 26 30 3 30 3Z" stroke="#dc2626" stroke-width="2" fill="none"/>
        </svg>
        <p class="empty-text">No donors match your search.</p>
        <button class="empty-reset" @click="search = ''; filterType = ''">Clear filters</button>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
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
  'O+':  'linear-gradient(135deg, #dc2626, #991b1b)',
  'O-':  'linear-gradient(135deg, #7f1d1d, #450a0a)',
  'A+':  'linear-gradient(135deg, #ef4444, #b91c1c)',
  'A-':  'linear-gradient(135deg, #b91c1c, #7f1d1d)',
  'B+':  'linear-gradient(135deg, #9f1239, #6b0f30)',
  'B-':  'linear-gradient(135deg, #be123c, #9f1239)',
  'AB+': 'linear-gradient(135deg, #c2410c, #9a3412)',
  'AB-': 'linear-gradient(135deg, #92400e, #6b3000)',
}
const solidColorMap: Record<string, string> = {
  'O+': '#dc2626', 'O-': '#7f1d1d', 'A+': '#ef4444', 'A-': '#b91c1c',
  'B+': '#9f1239', 'B-': '#be123c', 'AB+': '#c2410c', 'AB-': '#92400e',
}

const getColor  = (type: string) => colorMap[type]     || 'linear-gradient(135deg,#dc2626,#991b1b)'
const getSolid  = (type: string) => solidColorMap[type] || '#dc2626'

const eligibleCount  = computed(() => donors.filter(d => d.status === 'eligible').length)
const cooldownCount  = computed(() => donors.filter(d => d.status === 'cooldown').length)

const filteredDonors = computed(() => donors.filter(d => {
  const matchSearch = d.name.toLowerCase().includes(search.value.toLowerCase())
  const matchType   = !filterType.value || d.bloodType === filterType.value
  return matchSearch && matchType
}))
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Page root ── */
.donors-page {
  max-width: 1280px;
  font-family: 'DM Sans', sans-serif;
}

/* ══════════════════════════
   PAGE HEADER
══════════════════════════ */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 2rem;
}

.header-eyebrow {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 0.4rem;
}

.eyebrow-pip {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #dc2626;
  box-shadow: 0 0 8px rgba(220,38,38,0.8);
}

.eyebrow-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: rgba(255,255,255,0.28);
  font-weight: 600;
}

.page-title {
  font-family: 'Playfair Display', Georgia, serif;
  font-size: 2.25rem;
  font-weight: 900;
  color: #fff;
  margin: 0;
  line-height: 1.1;
  letter-spacing: -0.02em;
}

.page-sub {
  font-size: 0.8rem;
  color: rgba(255,255,255,0.32);
  margin: 0.35rem 0 0;
  letter-spacing: 0.01em;
}

.header-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 1rem;
}

/* Summary chips */
.summary-chips {
  display: flex;
  gap: 0.6rem;
}

.summary-chip {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1px;
  padding: 0.5rem 0.85rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  min-width: 60px;
}

.chip-eligible {
  background: rgba(22,163,74,0.08);
  border-color: rgba(22,163,74,0.2);
}

.chip-cooldown {
  background: rgba(217,119,6,0.08);
  border-color: rgba(217,119,6,0.2);
}

.chip-num {
  font-family: 'Playfair Display', serif;
  font-size: 1.3rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}

.chip-eligible .chip-num { color: #4ade80; }
.chip-cooldown .chip-num { color: #fbbf24; }

.chip-label {
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(255,255,255,0.3);
}

/* Register button */
.btn-register {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.7rem 1.3rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  border: none;
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(220,38,38,0.4), 0 1px 0 rgba(255,255,255,0.1) inset;
  transition: transform 0.15s, box-shadow 0.15s;
  letter-spacing: 0.01em;
}
.btn-register:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(220,38,38,0.55);
}

/* ══════════════════════════
   CONTROLS
══════════════════════════ */
.controls {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}

/* Search */
.search-wrap {
  position: relative;
  max-width: 420px;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.28);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.75rem 2.8rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(220,38,38,0.2);
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.88rem;
  color: #fff;
  outline: none;
  transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
  box-sizing: border-box;
}
.search-input::placeholder { color: rgba(255,255,255,0.22); }
.search-input:focus {
  border-color: #dc2626;
  background: rgba(220,38,38,0.06);
  box-shadow: 0 0 0 3px rgba(220,38,38,0.13);
}

.search-clear {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.3);
  font-size: 0.75rem;
  cursor: pointer;
  transition: color 0.15s;
}
.search-clear:hover { color: #fca5a5; }

/* Blood type pills */
.filter-group {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.12em;
  color: rgba(255,255,255,0.3);
  font-weight: 600;
  white-space: nowrap;
}

.blood-type-pills {
  display: flex;
  gap: 0.4rem;
  flex-wrap: wrap;
}

.type-pill {
  padding: 0.32rem 0.75rem;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.1);
  background: rgba(255,255,255,0.04);
  color: rgba(255,255,255,0.45);
  font-family: 'DM Sans', sans-serif;
  font-size: 0.75rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.15s;
}
.type-pill:hover {
  border-color: rgba(220,38,38,0.4);
  color: rgba(255,255,255,0.8);
  background: rgba(220,38,38,0.08);
}
.type-pill--active {
  background: linear-gradient(135deg, #dc2626, #991b1b);
  border-color: #dc2626;
  color: white;
  box-shadow: 0 2px 10px rgba(220,38,38,0.35);
}

/* ══════════════════════════
   DONOR GRID
══════════════════════════ */
.donor-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(288px, 1fr));
  gap: 1.25rem;
}

/* ── Donor Card ── */
.donor-card {
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 2px 12px rgba(0,0,0,0.3);
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
  position: relative;
}
.donor-card:hover {
  transform: translateY(-4px);
  border-color: rgba(220,38,38,0.35);
  box-shadow: 0 12px 36px rgba(0,0,0,0.45), 0 0 0 1px rgba(220,38,38,0.12);
}

@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Accent bar */
.card-accent {
  height: 3px;
  width: 100%;
  flex-shrink: 0;
}

/* Card header */
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.1rem 1.25rem 0.75rem;
}

.d-avatar {
  width: 46px; height: 46px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
  box-shadow: 0 4px 14px rgba(0,0,0,0.35);
  flex-shrink: 0;
}

.d-type-badge {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.3rem 0.7rem;
  background: rgba(220,38,38,0.15);
  border: 1px solid rgba(220,38,38,0.3);
  border-radius: 8px;
  color: #fca5a5;
  font-size: 0.85rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

/* Card body */
.card-body {
  padding: 0 1.25rem 1rem;
  flex: 1;
}

.d-name {
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: rgba(255,255,255,0.9);
  margin: 0 0 0.3rem;
  line-height: 1.3;
}

.d-location {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.73rem;
  color: rgba(255,255,255,0.3);
  margin: 0 0 1rem;
}

/* Stats */
.d-stats {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem;
  background: rgba(255,255,255,0.03);
  border: 1px solid rgba(255,255,255,0.06);
  border-radius: 11px;
}

.d-stat {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 3px;
  min-width: 0;
}

.stat-sep {
  width: 1px;
  height: 28px;
  background: rgba(255,255,255,0.07);
  flex-shrink: 0;
}

.d-stat-val {
  font-size: 0.82rem;
  font-weight: 700;
  color: rgba(255,255,255,0.85);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.d-stat-label {
  font-size: 0.58rem;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.25);
  white-space: nowrap;
}

/* Status badges */
.d-status {
  font-size: 0.65rem;
  font-weight: 700;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
  display: inline-block;
  white-space: nowrap;
  letter-spacing: 0.04em;
}
.dstatus-eligible {
  background: rgba(22,163,74,0.15);
  color: #4ade80;
  border: 1px solid rgba(22,163,74,0.3);
}
.dstatus-cooldown {
  background: rgba(217,119,6,0.15);
  color: #fbbf24;
  border: 1px solid rgba(217,119,6,0.3);
}
.dstatus-deferred {
  background: rgba(220,38,38,0.15);
  color: #fca5a5;
  border: 1px solid rgba(220,38,38,0.3);
}

/* Card footer */
.card-footer {
  display: flex;
  gap: 0.6rem;
  padding: 0.85rem 1.25rem 1.1rem;
  border-top: 1px solid rgba(255,255,255,0.05);
}

.btn-contact {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 500;
  color: rgba(255,255,255,0.45);
  cursor: pointer;
  transition: all 0.15s;
}
.btn-contact:hover {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.3);
  color: #fca5a5;
}

.btn-schedule {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  border: none;
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.78rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(220,38,38,0.3);
  transition: all 0.15s;
}
.btn-schedule:hover {
  box-shadow: 0 4px 16px rgba(220,38,38,0.5);
  transform: translateY(-1px);
}

/* ══════════════════════════
   EMPTY STATE
══════════════════════════ */
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  padding: 4rem 2rem;
  text-align: center;
}

.empty-text {
  font-size: 0.9rem;
  color: rgba(255,255,255,0.3);
  margin: 0;
}

.empty-reset {
  padding: 0.5rem 1.2rem;
  background: rgba(220,38,38,0.1);
  border: 1px solid rgba(220,38,38,0.25);
  border-radius: 8px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.8rem;
  font-weight: 600;
  color: #fca5a5;
  cursor: pointer;
  transition: all 0.15s;
}
.empty-reset:hover {
  background: rgba(220,38,38,0.18);
}
</style>
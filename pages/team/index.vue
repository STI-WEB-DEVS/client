<template>
  <NuxtLayout>
    <div class="team-page">

      <!-- ── Page Header ── -->
      <div class="page-header">
        <div class="header-left">
          <div class="header-eyebrow">
            <span class="eyebrow-pip"></span>
            <span class="eyebrow-label">Blood Donation System</span>
          </div>
          <h1 class="page-title">Our Team</h1>
          <p class="page-sub">Philippine Red Cross — Blood Services Staff &amp; Personnel Directory</p>
        </div>

        <div class="header-right">
          <div class="stat-chip">
            <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;flex-shrink:0;">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM6 8a2 2 0 11-4 0 2 2 0 014 0zM4 16c0-2.2 2.7-4 6-4s6 1.8 6 4M16 13.6c1.3.6 2 1.5 2 2.4M4 13.6C2.7 14.2 2 15.1 2 16" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
            </svg>
            <span class="stat-chip-val">{{ rcStaff.length }}</span>
            <span class="stat-chip-label">Members</span>
          </div>
          <div class="stat-chip stat-chip--chapters">
            <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;flex-shrink:0;">
              <path d="M10 2a6 6 0 016 6c0 4.5-6 10-6 10S4 12.5 4 8a6 6 0 016-6z" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="10" cy="8" r="2" stroke="currentColor" stroke-width="1.5"/>
            </svg>
            <span class="stat-chip-val">{{ uniqueChapters }}</span>
            <span class="stat-chip-label">Chapters</span>
          </div>
          <button class="btn-invite">
            <svg viewBox="0 0 20 20" fill="none" style="width:14px;height:14px;flex-shrink:0;">
              <path d="M10 4v12M4 10h12" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"/>
            </svg>
            Invite Member
          </button>
        </div>
      </div>

      <!-- ── Search ── -->
      <div class="search-row">
        <div class="search-wrap">
          <svg class="search-icon" viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;">
            <circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.5"/>
            <path d="M13.5 13.5L17 17" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
          </svg>
          <input
            v-model="search"
            type="text"
            placeholder="Search by name, role or chapter…"
            class="search-input"
          />
          <span v-if="search" class="search-clear" @click="search = ''">✕</span>
        </div>
        <div class="result-count" v-if="search">
          {{ filteredStaff.length }} result{{ filteredStaff.length !== 1 ? 's' : '' }}
        </div>
      </div>

      <!-- ── Team Grid ── -->
      <div class="team-grid">
        <div
          v-for="(member, i) in filteredStaff"
          :key="member.id"
          class="member-card"
          :style="{ animationDelay: `${i * 0.055}s` }"
        >
          <!-- Card top color strip -->
          <div class="card-strip" :style="{ background: member.color }"></div>

          <!-- Card inner -->
          <div class="card-inner">

            <!-- Header row -->
            <div class="card-head">
              <div class="avatar-wrap">
                <div class="member-avatar" :style="{ background: member.color }">
                  {{ member.initials }}
                </div>
                <span class="online-ring"></span>
              </div>
              <a href="https://www.redcross.org.ph" target="_blank" class="member-link" title="Philippine Red Cross">
                <svg viewBox="0 0 20 20" fill="none" style="width:15px;height:15px;">
                  <circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5"/>
                  <path d="M10 2C7.5 5 6 7.4 6 10s1.5 5 4 8M10 2c2.5 3 4 5.4 4 8s-1.5 5-4 8M2 10h16" stroke="currentColor" stroke-width="1.3"/>
                </svg>
              </a>
            </div>

            <!-- Name & username -->
            <div class="card-name-group">
              <h3 class="member-name">{{ member.name }}</h3>
              <span class="member-username">@{{ member.username }}</span>
            </div>

            <!-- Role badge -->
            <div class="role-badge-wrap">
              <span class="role-badge">{{ member.role }}</span>
            </div>

            <!-- Contact meta -->
            <div class="member-meta">
              <div class="meta-item">
                <div class="meta-icon">
                  <svg viewBox="0 0 20 20" fill="none" style="width:11px;height:11px;">
                    <path d="M2 5l8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                    <rect x="1" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
                  </svg>
                </div>
                <span>{{ member.email }}</span>
              </div>
              <div class="meta-item">
                <div class="meta-icon">
                  <svg viewBox="0 0 20 20" fill="none" style="width:11px;height:11px;">
                    <path d="M6.5 2.5c-.5 1-1 3 .5 5s3.5 3.5 5 3.5c1 1.5-.5 3-.5 3l3.5 3.5c1-1 2-3 1-4.5-2-3-5-6-9-9.5-1.5-1-2.5-.5-2.5-.5L3 7c1 2 2 3 3.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>{{ member.phone }}</span>
              </div>
              <div class="meta-item">
                <div class="meta-icon">
                  <svg viewBox="0 0 20 20" fill="none" style="width:11px;height:11px;">
                    <path d="M3 7l7-4 7 4v9a1 1 0 01-1 1H4a1 1 0 01-1-1V7z" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
                    <path d="M8 17v-6h4v6" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"/>
                  </svg>
                </div>
                <span>{{ member.chapter }}</span>
              </div>
            </div>

            <!-- Footer actions -->
            <div class="card-footer">
              <button class="btn-msg">
                <svg viewBox="0 0 20 20" fill="none" style="width:13px;height:13px;">
                  <path d="M2 5l8 5 8-5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                  <rect x="1" y="4" width="18" height="13" rx="2" stroke="currentColor" stroke-width="1.5"/>
                </svg>
                Message
              </button>
              <button class="btn-call">
                <svg viewBox="0 0 20 20" fill="none" style="width:13px;height:13px;">
                  <path d="M6.5 2.5c-.5 1-1 3 .5 5s3.5 3.5 5 3.5c1 1.5-.5 3-.5 3l3.5 3.5c1-1 2-3 1-4.5-2-3-5-6-9-9.5-1.5-1-2.5-.5-2.5-.5L3 7c1 2 2 3 3.5 2.5" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/>
                </svg>
                Call
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty state -->
      <div v-if="filteredStaff.length === 0" class="empty-state">
        <svg viewBox="0 0 60 60" fill="none" style="width:48px;height:48px;opacity:0.2;">
          <circle cx="30" cy="20" r="12" stroke="#dc2626" stroke-width="2"/>
          <path d="M8 52c0-12.1 9.9-22 22-22s22 9.9 22 22" stroke="#dc2626" stroke-width="2" stroke-linecap="round"/>
        </svg>
        <p class="empty-text">No team members match your search.</p>
        <button class="empty-reset" @click="search = ''">Clear search</button>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const search = ref('')

const rcStaff = [
  { id: 1,  name: 'Dr. Maria Socorro B. Dizon',  initials: 'MD', username: 'msdizon',     email: 'msdizon@redcross.org.ph',     phone: '+63 2 8527-0000', chapter: 'National HQ — Manila',      role: 'Blood Bank Director',       color: 'linear-gradient(135deg,#dc2626,#7f1d1d)' },
  { id: 2,  name: 'Dr. Eduardo C. Marcelo',       initials: 'EM', username: 'ecmarcelo',   email: 'ecmarcelo@redcross.org.ph',   phone: '+63 2 8527-0001', chapter: 'National HQ — Manila',      role: 'Senior Hematologist',       color: 'linear-gradient(135deg,#b91c1c,#7f1d1d)' },
  { id: 3,  name: 'Nurse Ana Liza R. Bautista',   initials: 'AB', username: 'albautista',  email: 'albautista@redcross.org.ph',  phone: '+63 2 8527-0002', chapter: 'NCR Chapter — Quezon City', role: 'Donor Coordinator',         color: 'linear-gradient(135deg,#991b1b,#450a0a)' },
  { id: 4,  name: 'Mr. Jose Ramon T. Castillo',   initials: 'JC', username: 'jrcastillo',  email: 'jrcastillo@redcross.org.ph',  phone: '+63 32 255-1234', chapter: 'Cebu Chapter',              role: 'Lab Technician',            color: 'linear-gradient(135deg,#ef4444,#b91c1c)' },
  { id: 5,  name: 'Ms. Luz Angela P. Fernandez',  initials: 'LF', username: 'lafernandez', email: 'lafernandez@redcross.org.ph', phone: '+63 82 227-5678', chapter: 'Davao Chapter',             role: 'Inventory Manager',         color: 'linear-gradient(135deg,#be123c,#9f1239)' },
  { id: 6,  name: 'Dr. Renato P. Villanueva',     initials: 'RV', username: 'rpvillanueva',email: 'rpvillanueva@redcross.org.ph',phone: '+63 2 8527-0005', chapter: 'NCR Chapter — Pasig',       role: 'Emergency Response Lead',   color: 'linear-gradient(135deg,#dc2626,#991b1b)' },
  { id: 7,  name: 'Ms. Carla Mae D. Santos',      initials: 'CS', username: 'cmsantos',    email: 'cmsantos@redcross.org.ph',    phone: '+63 43 723-9012', chapter: 'Batangas Chapter',          role: 'Notifications Officer',     color: 'linear-gradient(135deg,#c2410c,#7c2d12)' },
  { id: 8,  name: 'Mr. Ricardo D. Navarro',       initials: 'RN', username: 'rdnavarro',   email: 'rdnavarro@redcross.org.ph',   phone: '+63 49 562-3456', chapter: 'Laguna Chapter',            role: 'Community Outreach Officer',color: 'linear-gradient(135deg,#7f1d1d,#3b0101)' },
  { id: 9,  name: 'Nurse Rosa Imelda G. Cruz',    initials: 'RC', username: 'ricruz',      email: 'ricruz@redcross.org.ph',      phone: '+63 45 961-7890', chapter: 'Pampanga Chapter',          role: 'Data Analyst',              color: 'linear-gradient(135deg,#b91c1c,#7f1d1d)' },
  { id: 10, name: 'Mr. Patrick John M. Reyes',    initials: 'PR', username: 'pjreyes',     email: 'pjreyes@redcross.org.ph',     phone: '+63 72 607-2345', chapter: 'Ilocos Norte Chapter',      role: 'Medical Records Officer',   color: 'linear-gradient(135deg,#dc2626,#991b1b)' },
]

const uniqueChapters = computed(() => new Set(rcStaff.map(m => m.chapter)).size)

const filteredStaff = computed(() => {
  if (!search.value) return rcStaff
  const q = search.value.toLowerCase()
  return rcStaff.filter(m =>
    m.name.toLowerCase().includes(q) ||
    m.role.toLowerCase().includes(q) ||
    m.chapter.toLowerCase().includes(q) ||
    m.username.toLowerCase().includes(q)
  )
})
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;900&family=DM+Sans:wght@300;400;500;600&display=swap');

/* ── Root ── */
.team-page {
  max-width: 1280px;
  font-family: 'DM Sans', sans-serif;
}

/* ════════════════════════════
   PAGE HEADER
════════════════════════════ */
.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.75rem;
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
}

.header-right {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
}

/* Stat chips */
.stat-chip {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.9rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  border-radius: 10px;
  color: rgba(255,255,255,0.35);
}
.stat-chip--chapters {
  background: rgba(220,38,38,0.07);
  border-color: rgba(220,38,38,0.18);
  color: rgba(252,165,165,0.5);
}
.stat-chip-val {
  font-family: 'Playfair Display', serif;
  font-size: 1.15rem;
  font-weight: 700;
  color: #fff;
  line-height: 1;
}
.stat-chip--chapters .stat-chip-val { color: #fca5a5; }
.stat-chip-label {
  font-size: 0.65rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: inherit;
}

/* Invite button */
.btn-invite {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.65rem 1.2rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  color: white;
  border: none;
  border-radius: 11px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.83rem;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 18px rgba(220,38,38,0.38), 0 1px 0 rgba(255,255,255,0.1) inset;
  transition: transform 0.15s, box-shadow 0.15s;
}
.btn-invite:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 26px rgba(220,38,38,0.55);
}

/* ════════════════════════════
   SEARCH ROW
════════════════════════════ */
.search-row {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.75rem;
}

.search-wrap {
  position: relative;
  max-width: 420px;
  flex: 1;
}

.search-icon {
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.25);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.72rem 2.6rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(220,38,38,0.2);
  border-radius: 12px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.87rem;
  color: #fff;
  outline: none;
  transition: border-color 0.2s, background 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
}
.search-input::placeholder { color: rgba(255,255,255,0.2); }
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
  color: rgba(255,255,255,0.28);
  font-size: 0.72rem;
  cursor: pointer;
  transition: color 0.15s;
}
.search-clear:hover { color: #fca5a5; }

.result-count {
  font-size: 0.75rem;
  color: rgba(255,255,255,0.3);
  white-space: nowrap;
}

/* ════════════════════════════
   TEAM GRID
════════════════════════════ */
.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(290px, 1fr));
  gap: 1.25rem;
}

/* ── Member Card ── */
.member-card {
  background: #110202;
  border: 1px solid rgba(220,38,38,0.14);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  animation: cardIn 0.4s cubic-bezier(.22,1,.36,1) both;
}
.member-card:hover {
  transform: translateY(-4px);
  border-color: rgba(220,38,38,0.32);
  box-shadow: 0 14px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(220,38,38,0.1);
}

/* Top color strip */
.card-strip {
  height: 4px;
  width: 100%;
  flex-shrink: 0;
}

.card-inner {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
  flex: 1;
}

/* Card head: avatar + globe link */
.card-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
}

.avatar-wrap {
  position: relative;
  display: inline-flex;
}

.member-avatar {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Playfair Display', serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: white;
  box-shadow: 0 4px 16px rgba(0,0,0,0.35);
  letter-spacing: 0.02em;
}

.online-ring {
  position: absolute;
  bottom: -2px; right: -2px;
  width: 12px; height: 12px;
  border-radius: 50%;
  background: #22c55e;
  border: 2px solid #110202;
  box-shadow: 0 0 6px rgba(34,197,94,0.6);
}

.member-link {
  color: rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0.4rem;
  border-radius: 8px;
  border: 1px solid rgba(255,255,255,0.07);
  background: rgba(255,255,255,0.03);
  transition: all 0.15s;
}
.member-link:hover {
  color: #fca5a5;
  border-color: rgba(220,38,38,0.3);
  background: rgba(220,38,38,0.07);
}

/* Name group */
.card-name-group {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.member-name {
  font-family: 'Playfair Display', serif;
  font-size: 1rem;
  font-weight: 700;
  color: rgba(255,255,255,0.88);
  margin: 0;
  line-height: 1.3;
}

.member-username {
  font-size: 0.73rem;
  color: #fca5a5;
  font-weight: 500;
  opacity: 0.75;
}

/* Role badge */
.role-badge-wrap { display: flex; }

.role-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.3rem;
  padding: 0.25rem 0.75rem;
  background: rgba(220,38,38,0.12);
  border: 1px solid rgba(220,38,38,0.28);
  border-radius: 999px;
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.07em;
  color: #fca5a5;
}

/* Contact meta */
.member-meta {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  font-size: 0.73rem;
  color: rgba(255,255,255,0.38);
  min-width: 0;
}
.meta-item span {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.meta-icon {
  width: 22px; height: 22px;
  border-radius: 6px;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  color: rgba(255,255,255,0.3);
}

/* Card footer */
.card-footer {
  display: flex;
  gap: 0.6rem;
  padding-top: 0.85rem;
  border-top: 1px solid rgba(255,255,255,0.05);
  margin-top: auto;
}

.btn-msg {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.58rem;
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.77rem;
  font-weight: 500;
  color: rgba(255,255,255,0.4);
  cursor: pointer;
  transition: all 0.15s;
}
.btn-msg:hover {
  background: rgba(220,38,38,0.08);
  border-color: rgba(220,38,38,0.3);
  color: #fca5a5;
}

.btn-call {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.58rem;
  background: linear-gradient(135deg, #dc2626, #991b1b);
  border: none;
  border-radius: 9px;
  font-family: 'DM Sans', sans-serif;
  font-size: 0.77rem;
  font-weight: 600;
  color: white;
  cursor: pointer;
  box-shadow: 0 2px 10px rgba(220,38,38,0.3);
  transition: all 0.15s;
}
.btn-call:hover {
  box-shadow: 0 4px 16px rgba(220,38,38,0.5);
  transform: translateY(-1px);
}

/* ════════════════════════════
   EMPTY STATE
════════════════════════════ */
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
  color: rgba(255,255,255,0.28);
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
.empty-reset:hover { background: rgba(220,38,38,0.18); }

/* ── Animation ── */
@keyframes cardIn {
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
}
</style>
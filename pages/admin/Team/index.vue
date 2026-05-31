<template>
  <NuxtLayout>
    <div class="team-page">
      <div class="page-header">
        <div>
          <h1 class="page-title">Our Team</h1>
          <p class="page-sub">Philippine Red Cross — Blood Services Staff & Personnel Directory</p>
        </div>
        <div class="header-stats">
          <div class="hstat">
            <span class="hstat-val">{{ rcStaff.length }}</span>
            <span class="hstat-label">Members</span>
          </div>
        </div>
      </div>

      <!-- Team Grid -->
      <div class="team-grid">
        <div v-for="member in rcStaff" :key="member.id" class="member-card">
          <div class="member-avatar" :style="{ background: member.color }">
            {{ member.initials }}
          </div>
          <div class="member-body">
            <h3 class="member-name">{{ member.name }}</h3>
            <p class="member-username">@{{ member.username }}</p>
            <div class="member-meta">
              <span class="meta-item">
                <EnvelopeIcon class="size-3" />
                {{ member.email }}
              </span>
              <span class="meta-item">
                <PhoneIcon class="size-3" />
                {{ member.phone }}
              </span>
              <span class="meta-item">
                <BuildingOfficeIcon class="size-3" />
                {{ member.chapter }}
              </span>
            </div>
          </div>
          <div class="member-footer">
            <span class="role-badge">{{ member.role }}</span>
            <a href="https://www.redcross.org.ph" target="_blank" class="member-link">
              <GlobeAltIcon class="size-4" />
            </a>
          </div>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import {
  EnvelopeIcon,
  PhoneIcon,
  BuildingOfficeIcon,
  GlobeAltIcon,
} from '@heroicons/vue/24/outline'

// Philippine Red Cross Blood Services Staff 
const rcStaff = [
  {
    id: 1,
    name: 'Dr. Maria Socorro B. Dizon',
    initials: 'MD',
    username: 'msdizon',
    email: 'msdizon@redcross.org.ph',
    phone: '+63 2 8527-0000',
    chapter: 'National HQ — Manila',
    role: 'Blood Bank Director',
    color: '#c0392b',
  },
  {
    id: 2,
    name: 'Dr. Eduardo C. Marcelo',
    initials: 'EM',
    username: 'ecmarcelo',
    email: 'ecmarcelo@redcross.org.ph',
    phone: '+63 2 8527-0001',
    chapter: 'National HQ — Manila',
    role: 'Senior Hematologist',
    color: '#922b21',
  },
  {
    id: 3,
    name: 'Nurse Ana Liza R. Bautista',
    initials: 'AB',
    username: 'albautista',
    email: 'albautista@redcross.org.ph',
    phone: '+63 2 8527-0002',
    chapter: 'NCR Chapter — Quezon City',
    role: 'Donor Coordinator',
    color: '#7b241c',
  },
  {
    id: 4,
    name: 'Mr. Jose Ramon T. Castillo',
    initials: 'JC',
    username: 'jrcastillo',
    email: 'jrcastillo@redcross.org.ph',
    phone: '+63 32 255-1234',
    chapter: 'Cebu Chapter',
    role: 'Lab Technician',
    color: '#e74c3c',
  },
  {
    id: 5,
    name: 'Ms. Luz Angela P. Fernandez',
    initials: 'LF',
    username: 'lafernandez',
    email: 'lafernandez@redcross.org.ph',
    phone: '+63 82 227-5678',
    chapter: 'Davao Chapter',
    role: 'Inventory Manager',
    color: '#a93226',
  },
  {
    id: 6,
    name: 'Dr. Renato P. Villanueva',
    initials: 'RV',
    username: 'rpvillanueva',
    email: 'rpvillanueva@redcross.org.ph',
    phone: '+63 2 8527-0005',
    chapter: 'NCR Chapter — Pasig',
    role: 'Emergency Response Lead',
    color: '#cb4335',
  },
  {
    id: 7,
    name: 'Ms. Carla Mae D. Santos',
    initials: 'CS',
    username: 'cmsantos',
    email: 'cmsantos@redcross.org.ph',
    phone: '+63 43 723-9012',
    chapter: 'Batangas Chapter',
    role: 'Notifications Officer',
    color: '#b03a2e',
  },
  {
    id: 8,
    name: 'Mr. Ricardo D. Navarro',
    initials: 'RN',
    username: 'rdnavarro',
    email: 'rdnavarro@redcross.org.ph',
    phone: '+63 49 562-3456',
    chapter: 'Laguna Chapter',
    role: 'Community Outreach Officer',
    color: '#641e16',
  },
  {
    id: 9,
    name: 'Nurse Rosa Imelda G. Cruz',
    initials: 'RC',
    username: 'ricruz',
    email: 'ricruz@redcross.org.ph',
    phone: '+63 45 961-7890',
    chapter: 'Pampanga Chapter',
    role: 'Data Analyst',
    color: '#922b21',
  },
  {
    id: 10,
    name: 'Mr. Patrick John M. Reyes',
    initials: 'PR',
    username: 'pjreyes',
    email: 'pjreyes@redcross.org.ph',
    phone: '+63 72 607-2345',
    chapter: 'Ilocos Norte Chapter',
    role: 'Medical Records Officer',
    color: '#c0392b',
  },
]
</script>

<style scoped>
/* Layout */
.team-page { max-width: 1200px; }

/* Page Header */
.page-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 2rem;
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
}

/* Members Count Badge */
.header-stats { display: flex; gap: 1rem; }

.hstat {
  background: white;
  border: 1px solid #f5e8e8;
  border-radius: 12px;
  padding: 0.75rem 1.25rem;
  text-align: center;
  box-shadow: 0 1px 4px rgba(192,57,43,0.04);
}
.hstat-val   { display: block; font-size: 1.5rem; font-weight: 700; color: #c0392b; }
.hstat-label { display: block; font-size: 0.7rem; color: #999; text-transform: uppercase; letter-spacing: 0.05em; }

.team-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}

.member-card {
  background: white;
  border: 1px solid #f5e8e8;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  transition: transform 0.2s, box-shadow 0.2s, border-color 0.2s;
  box-shadow: 0 1px 6px rgba(192,57,43,0.04);
}
.member-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(192,57,43,0.1);
  border-color: #fecaca;
}

.member-avatar {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  font-weight: 700;
  color: white;
}


.member-name {
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
}

.member-username {
  font-size: 0.75rem;
  color: #c0392b;
  margin: 2px 0 0;
  font-weight: 500;
}

.member-meta {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-top: 0.75rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.75rem;
  color: #666;
  word-break: break-all;
}


.member-footer {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 0.75rem;
  border-top: 1px solid #f5e8e8;
}

.role-badge {
  background: #fef2f2;
  color: #c0392b;
  font-size: 0.65rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 20px;
  border: 1px solid #fecaca;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.member-link {
  color: #bbb;
  display: flex;
  align-items: center;
  text-decoration: none;
  transition: color 0.15s;
}
.member-link:hover { color: #c0392b; }
</style>
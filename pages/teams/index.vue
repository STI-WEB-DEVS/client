<template>
  <div style="background:#FFFEF9; min-height:100vh; padding:16px;">
    <div style="background:#FFFEF9; border-radius:16px; min-height:calc(100vh - 32px); padding:20px;">

      <!-- Header -->
      <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:28px;">
        <div>
          <h1 style="font-size:28px; font-weight:700; color:#1e3448; letter-spacing:-0.4px; margin-bottom:4px;">Our Team</h1>
          <p style="font-size:13px; color:#8fa8bc;">Meet the developers behind NutriMatch — Web Systems & Tech (602) · STI College</p>
        </div>
        <div style="background:#f0faf5; border:1px solid #c8e6d8; border-radius:10px; padding:8px 16px; text-align:center;">
          <p style="font-size:22px; font-weight:800; color:#2E8B50; line-height:1;">4</p>
          <p style="font-size:11px; color:#6aab8a; font-weight:600;">Team Members</p>
        </div>
      </div>

      <!-- Team Grid — full width, 2 cols -->
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:24px;">
        <div v-for="member in team" :key="member.name"
          :style="`border:1px solid ${member.border}; border-radius:20px; padding:0; overflow:hidden; box-shadow:0 2px 12px rgba(46,139,80,0.07); transition:box-shadow 0.2s;`"
          class="hover:shadow-lg">

          <!-- Card header band -->
          <div :style="`background:${member.headerBg}; padding:24px 24px 0; display:flex; flex-direction:column; align-items:center;`">
            <!-- Avatar -->
            <div :style="`width:76px; height:76px; border-radius:50%; background:${member.avatarBg}; display:flex; align-items:center; justify-content:center; font-size:24px; font-weight:800; color:${member.avatarFg}; border:3px solid white; box-shadow:0 4px 16px rgba(0,0,0,0.12); margin-bottom:14px;`">
              {{ member.initials }}
            </div>
            <!-- Name + role -->
            <h3 style="font-size:17px; font-weight:700; color:#1e3448; margin-bottom:5px; letter-spacing:-0.2px; text-align:center;">{{ member.name }}</h3>
            <span :style="`background:${member.badgeBg}; color:${member.badgeColor}; font-size:11px; font-weight:700; padding:4px 14px; border-radius:20px; margin-bottom:16px; letter-spacing:0.2px;`">{{ member.position }}</span>
          </div>

          <!-- Card body -->
          <div style="padding:18px 24px 22px;">

            <!-- Email + phone -->
            <div style="display:flex; flex-direction:column; gap:7px; margin-bottom:16px; padding-bottom:16px; border-bottom:1px solid #E8E0CC;">
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="width:28px; height:28px; border-radius:7px; background:#f0faf5; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4CAF82" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                </div>
                <a :href="`mailto:${member.email}`" style="font-size:12px; color:#4CAF82; text-decoration:none; font-weight:500;">{{ member.email }}</a>
              </div>
              <div style="display:flex; align-items:center; gap:8px;">
                <div style="width:28px; height:28px; border-radius:7px; background:#f0faf5; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#4CAF82" stroke-width="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                </div>
                <span style="font-size:12px; color:#8fa8bc; font-weight:500;">{{ member.phone }}</span>
              </div>
            </div>

            <!-- Responsibilities -->
            <div style="margin-bottom:16px;">
              <p style="font-size:11px; font-weight:700; color:#1e3448; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Responsibilities</p>
              <ul style="margin:0; padding:0; list-style:none; display:flex; flex-direction:column; gap:5px;">
                <li v-for="r in member.responsibilities" :key="r" style="display:flex; align-items:flex-start; gap:7px; font-size:12px; color:#555; line-height:1.4;">
                  <span style="width:6px; height:6px; border-radius:50%; background:#4CAF82; display:inline-block; flex-shrink:0; margin-top:4px;"></span>
                  {{ r }}
                </li>
              </ul>
            </div>

            <!-- Skills -->
            <div style="margin-bottom:16px;">
              <p style="font-size:11px; font-weight:700; color:#1e3448; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:8px;">Skills</p>
              <div style="display:flex; flex-wrap:wrap; gap:6px;">
                <span v-for="s in member.skills" :key="s"
                  :style="`font-size:11px; font-weight:600; padding:3px 10px; border-radius:20px; background:${member.skillBg}; color:${member.skillColor}; border:1px solid ${member.border};`">
                  {{ s }}
                </span>
              </div>
            </div>

            <!-- Stats row -->
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px; padding-top:14px; border-top:1px solid #E8E0CC;">
              <div v-for="stat in member.stats" :key="stat.label" style="text-align:center; background:#F5F1E3; border-radius:10px; padding:10px 6px;">
                <p :style="`font-size:18px; font-weight:800; color:${member.badgeColorColor}; line-height:1; margin-bottom:3px;`">{{ stat.value }}</p>
                <p style="font-size:10px; color:#8fa8bc; font-weight:500; line-height:1.2;">{{ stat.label }}</p>
              </div>
            </div>

          </div>
        </div>
      </div>

      <!-- Bottom project info -->
      <div style="background:linear-gradient(135deg,#f0faf5,#e8f5ee); border-radius:16px; border:1px solid #c8e6d8; padding:20px 24px; display:flex; align-items:center; justify-content:space-between;">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:44px; height:44px; background:#4CAF82; border-radius:12px; display:flex; align-items:center; justify-content:center; flex-shrink:0;">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
          </div>
          <div>
            <p style="font-size:14px; font-weight:700; color:#1e3448; margin-bottom:2px;">Web Systems and Tech (602) — STI College</p>
            <p style="font-size:12px; color:#6aab8a;">NutriMatch Capstone Project · Academic Year 2025–2026</p>
          </div>
        </div>
        <div style="display:flex; gap:12px;">
          <div style="text-align:center;">
            <p style="font-size:20px; font-weight:800; color:#2E8B50; line-height:1;">4</p>
            <p style="font-size:10px; color:#6aab8a; font-weight:600;">Members</p>
          </div>
          <div style="width:1px; background:#c8e6d8;"></div>
          <div style="text-align:center;">
            <p style="font-size:20px; font-weight:800; color:#2E8B50; line-height:1;">1</p>
            <p style="font-size:10px; color:#6aab8a; font-weight:600;">Project</p>
          </div>
          <div style="width:1px; background:#c8e6d8;"></div>
          <div style="text-align:center;">
            <p style="font-size:20px; font-weight:800; color:#2E8B50; line-height:1;">2026</p>
            <p style="font-size:10px; color:#6aab8a; font-weight:600;">Graduation</p>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({ layout: 'default' })

const team = [
  {
    name: 'King Paolo Chui',
    initials: 'KC',
    position: 'Project Lead / Developer',
    email: 'kingpaolo.chui@sti.edu.ph',
    phone: '+63 912 000 0001',
    headerBg: '#f0faf5',
    avatarBg: '#2E8B50', avatarFg: '#fff',
    border: '#c8e6d8',
    badgeBg: '#2E8B50', badgeColor: '#fff',
    skillBg: '#f0faf5', skillColor: '#2E8B50',
    responsibilities: [
      'Overall project coordination and sprint planning',
      'Full-stack feature development and integration',
      'Client-RND matching algorithm design',
      'Documentation and submission management',
    ],
    skills: ['Vue.js', 'Nuxt 3', 'Project Mgmt', 'Figma', 'REST API'],
    stats: [{ value: '12', label: 'Features Built' }, { value: '3', label: 'Sprints Led' }, { value: '98%', label: 'Attendance' }],
  },
  {
    name: 'Ivy Hope Alba',
    initials: 'IA',
    position: 'UI/UX Designer / Developer',
    email: 'ivyhope.alba@sti.edu.ph',
    phone: '+63 912 754 7802',
    headerBg: '#f0f4fa',
    avatarBg: '#1e3448', avatarFg: '#fff',
    border: '#c0cedc',
    badgeBg: '#1e3448', badgeColor: '#fff',
    skillBg: '#f0f4fa', skillColor: '#1e3448',
    responsibilities: [
      'UI/UX design and Figma prototyping',
      'Component library and design system',
      'Responsive layout implementation',
      'User testing and accessibility review',
    ],
    skills: ['Figma', 'Tailwind CSS', 'Vue.js', 'Canva', 'Typography'],
    stats: [{ value: '24', label: 'Screens Designed' }, { value: '5', label: 'Prototypes' }, { value: '100%', label: 'On Time' }],
  },
  {
    name: 'Julia Niel Bulalaque',
    initials: 'JB',
    position: 'Backend Developer',
    email: 'julia.bulalaque@sti.edu.ph',
    phone: '+63 912 750 5603',
    headerBg: '#f5faf0',
    avatarBg: '#3d6b22', avatarFg: '#fff',
    border: '#c8dcb0',
    badgeBg: '#3d6b22', badgeColor: '#fff',
    skillBg: '#f5faf0', skillColor: '#3d6b22',
    responsibilities: [
      'Database schema design and management',
      'REST API development and documentation',
      'Authentication and role-based access control',
      'Server deployment and performance optimization',
    ],
    skills: ['Node.js', 'MySQL', 'Express', 'JWT Auth', 'Postman'],
    stats: [{ value: '18', label: 'API Endpoints' }, { value: '6', label: 'DB Tables' }, { value: '99%', label: 'Uptime' }],
  },
  {
    name: 'Kent Leabres',
    initials: 'KL',
    position: 'Frontend Developer',
    email: 'kent.leabres@sti.edu.ph',
    phone: '+63 912 789 45z4',
    headerBg: '#f8f5fc',
    avatarBg: '#6b3a8b', avatarFg: '#fff',
    border: '#d8c0e8',
    badgeBg: '#6b3a8b', badgeColor: '#fff',
    skillBg: '#f8f5fc', skillColor: '#6b3a8b',
    responsibilities: [
      'Frontend component development',
      'Dashboard and data visualization implementation',
      'API integration with backend services',
      'Cross-browser testing and bug fixing',
    ],
    skills: ['Vue.js', 'JavaScript', 'Chart.js', 'HTML/CSS', 'Git'],
    stats: [{ value: '16', label: 'Components' }, { value: '8', label: 'Pages Built' }, { value: '95%', label: 'Test Pass' }],
  },
]
</script>

<template>
  <div class="flex min-h-screen" style="background:#F9F6EA;">

    <!-- SIDEBAR -->
    <aside style="width:215px; background:#1C3B4F; min-height:100vh; position:fixed; left:0; top:0; display:flex; flex-direction:column; z-index:40;">

      <!-- Logo -->
      <div style="padding:16px 18px 14px; border-bottom:1px solid rgba(255,255,255,0.08);">
        <div style="display:flex; align-items:center; gap:10px;">
          <img src="/nutrimatch-logo.png" alt="NutriMatch icon" style="width:36px; height:36px; border-radius:25px; object-fit:cover; display:block; flex-shrink:0;"/>
          <span style="font-family:'Canva Sans','Nunito','Inter',sans-serif; font-size:15px; font-weight:700; letter-spacing:1px; line-height:1;">
            <span style="color:#ffffff;">Nutri</span><span style="color:#2E8B50;">match</span>
          </span>
        </div>
      </div>

      <!-- Nav — 6 links with unique #2E8B50 icons -->
      <nav style="flex:1; padding:35px 10px; display:flex; flex-direction:column; gap:15px;">

        <!-- 1. Dashboard — speedometer/gauge icon -->
        <NuxtLink to="/dashboard" :class="['sidebar-link', route.path.startsWith('/dashboard') ? 'active' : '']">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10"/>
            <path d="M12 6v2"/>
            <path d="M6.3 9l1.5 1.5"/>
            <path d="M12 12l4.5-4.5"/>
            <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
            <path d="M18 2a4 4 0 0 1 4 4"/>
          </svg>
          <span>Dashboard</span>
        </NuxtLink>

        <!-- 2. Patients — clipboard with heart icon -->
        <NuxtLink to="/patients" :class="['sidebar-link', route.path.startsWith('/patients') ? 'active' : '']">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2"/>
            <rect x="9" y="3" width="6" height="4" rx="1"/>
            <path d="M12 13.5c0 0-2.5-1.5-2.5-3a2.5 2.5 0 0 1 5 0c0 1.5-2.5 3-2.5 3z" fill="currentColor" stroke="none"/>
          </svg>
          <span>Patients</span>
        </NuxtLink>

        <!-- 3. Therapists — stethoscope icon -->
        <NuxtLink to="/therapists" :class="['sidebar-link', route.path.startsWith('/therapists') ? 'active' : '']">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6 6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3"/>
            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4"/>
            <circle cx="20" cy="10" r="2" fill="currentColor" stroke="none"/>
          </svg>
          <span>Therapists</span>
        </NuxtLink>

        <!-- 4. Teams — group/badge icon -->
        <NuxtLink to="/teams" :class="['sidebar-link', route.path.startsWith('/teams') ? 'active' : '']">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
            <circle cx="9" cy="7" r="4"/>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span>Teams</span>
        </NuxtLink>

        <!-- 5. Reports — bar chart rising icon -->
        <NuxtLink to="/reports" :class="['sidebar-link', route.path.startsWith('/reports') ? 'active' : '']">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="13" width="4" height="8" rx="1"/>
            <rect x="9" y="8" width="4" height="13" rx="1"/>
            <rect x="16" y="3" width="4" height="18" rx="1"/>
            <line x1="2" y1="22" x2="22" y2="22"/>
          </svg>
          <span>Reports</span>
        </NuxtLink>

        <!-- 6. Settings — sliders/tune icon -->
        <NuxtLink to="/settings" :class="['sidebar-link', route.path.startsWith('/settings') ? 'active' : '']">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="4" y1="6" x2="20" y2="6"/>
            <line x1="4" y1="12" x2="20" y2="12"/>
            <line x1="4" y1="18" x2="20" y2="18"/>
            <circle cx="8" cy="6" r="2" fill="currentColor" stroke="currentColor" stroke-width="1"/>
            <circle cx="16" cy="12" r="2" fill="currentColor" stroke="currentColor" stroke-width="1"/>
            <circle cx="10" cy="18" r="2" fill="currentColor" stroke="currentColor" stroke-width="1"/>
          </svg>
          <span>Settings</span>
        </NuxtLink>

      </nav>

      <!-- Sign Out -->
      <div style="padding:12px; border-top:1px solid rgba(255,255,255,0.08);">
        <button @click="logout" style="width:100%; display:flex; align-items:center; gap:8px; padding:9px 10px; border-radius:8px; color:#8fa8bc; font-size:12px; font-weight:500; background:transparent; border:none; cursor:pointer;" class="hover:bg-[#2E8B50]/20 hover:!text-[#a8e6b8] transition">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
          Sign Out
        </button>
      </div>
    </aside>

    <main style="margin-left:215px; flex:1; min-height:100vh;">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { user, logout } = useAuth()
</script>

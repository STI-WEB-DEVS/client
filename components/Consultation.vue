<script setup>
import { ref } from 'vue'

const activeFilter = ref('All')
const filters = ['All', 'Today', 'Upcoming', 'Completed', 'Cancelled']

const consultations = [
  { id: '#C-1041', client: 'Maria Santos',    initials: 'MS', avatarColor: '#5AA7A7', rnd: 'Ana Reyes, RND',   rndInitials: 'AR', rndColor: '#3D8C8C', date: 'Mar 15, 2026', time: '10:00 AM', type: 'Consultation', status: 'Today'     },
  { id: '#C-1042', client: 'Carlos Dela Cruz', initials: 'CD', avatarColor: '#8BC4C4', rnd: 'Jose Lim, RND',    rndInitials: 'JL', rndColor: '#5AA7A7', date: 'Mar 16, 2026', time: '2:00 PM',  type: 'Lab review',   status: 'Upcoming'  },
  { id: '#C-1043', client: 'Luz Villanueva',   initials: 'LV', avatarColor: '#2E7D7D', rnd: 'Maria Cruz, RND',  rndInitials: 'MC', rndColor: '#6EB8B8', date: 'Mar 17, 2026', time: '9:30 AM',  type: 'Follow-up',    status: 'Upcoming'  },
  { id: '#C-1044', client: 'Ramon Aquino',     initials: 'RA', avatarColor: '#3D8C8C', rnd: 'Mark Santos, RND', rndInitials: 'MS', rndColor: '#3D8C8C', date: 'Mar 18, 2026', time: '3:00 PM',  type: 'Consultation', status: 'Upcoming'  },
  { id: '#C-1045', client: 'Nina Reyes',       initials: 'NR', avatarColor: '#6EB8B8', rnd: 'Ana Reyes, RND',   rndInitials: 'AR', rndColor: '#3D8C8C', date: 'Mar 19, 2026', time: '11:00 AM', type: 'Follow-up',    status: 'Upcoming'  },
  { id: '#C-1038', client: 'Juan Perez',       initials: 'JP', avatarColor: '#5AA7A7', rnd: 'Jose Lim, RND',    rndInitials: 'JL', rndColor: '#5AA7A7', date: 'Mar 14, 2026', time: '1:00 PM',  type: 'Initial',      status: 'Completed' },
  { id: '#C-1037', client: 'Ana Luna',         initials: 'AL', avatarColor: '#8BC4C4', rnd: 'Maria Cruz, RND',  rndInitials: 'MC', rndColor: '#6EB8B8', date: 'Mar 13, 2026', time: '10:30 AM', type: 'Lab review',   status: 'Completed' },
  { id: '#C-1036', client: 'Rico Bautista',    initials: 'RB', avatarColor: '#2E7D7D', rnd: 'Mark Santos, RND', rndInitials: 'MS', rndColor: '#3D8C8C', date: 'Mar 12, 2026', time: '4:00 PM',  type: 'Consultation', status: 'Cancelled' },
]

const todaySchedule = [
  { time: '9:00 AM',  name: 'Petra Gomez',  rnd: 'Ana Reyes, RND',   type: 'Completed',    typeStyle: 'background:#F0F0F0;color:#888;' },
  { time: '10:00 AM', name: 'Maria Santos', rnd: 'Ana Reyes, RND',   type: 'Consultation', typeStyle: 'background:#EBF7F7;color:#3D8C8C;' },
  { time: '11:30 AM', name: 'Ben Torres',   rnd: 'Jose Lim, RND',    type: 'Follow-up',    typeStyle: 'background:#DFFAF0;color:#1A7A58;' },
  { time: '2:00 PM',  name: 'Linda Chan',   rnd: 'Mark Santos, RND', type: 'Lab review',   typeStyle: 'background:#FFF5CC;color:#A07800;' },
  { time: '4:00 PM',  name: 'Oscar Ramos',  rnd: 'Maria Cruz, RND',  type: 'Initial',      typeStyle: 'background:#EEF0FF;color:#4A4DB5;' },
]

const calDays = [
  { day: 23, other: true }, { day: 24, other: true }, { day: 25, other: true }, { day: 26, other: true }, { day: 27, other: true }, { day: 28, other: true }, { day: 1, other: false },
  { day: 2 }, { day: 3 }, { day: 4, event: true }, { day: 5 }, { day: 6, event: true }, { day: 7 }, { day: 8 },
  { day: 9 }, { day: 10, event: true }, { day: 11 }, { day: 12, event: true }, { day: 13 }, { day: 14, event: true }, { day: 15, today: true },
  { day: 16, event: true }, { day: 17, event: true }, { day: 18, event: true }, { day: 19, event: true }, { day: 20 }, { day: 21, event: true }, { day: 22 },
  { day: 23 }, { day: 24, event: true }, { day: 25 }, { day: 26, event: true }, { day: 27 }, { day: 28 }, { day: 29 },
  { day: 30, event: true }, { day: 31 }, { day: 1, other: true }, { day: 2, other: true }, { day: 3, other: true }, { day: 4, other: true }, { day: 5, other: true },
]

const typeBadgeStyle = (type) => {
  const map = {
    'Consultation': 'background:#EBF7F7;color:#3D8C8C;',
    'Follow-up':    'background:#DFFAF0;color:#1A7A58;',
    'Lab review':   'background:#FFF5CC;color:#A07800;',
    'Initial':      'background:#EEF0FF;color:#4A4DB5;',
  }
  return map[type] || ''
}

const statusBadgeStyle = (status) => {
  const map = {
    'Today':     'background:#5AA7A7;color:#fff;',
    'Upcoming':  'background:#EBF7F7;color:#3D8C8C;',
    'Completed': 'background:#F0F0F0;color:#888;',
    'Cancelled': 'background:#FDECEA;color:#A32D2D;',
  }
  return map[status] || ''
}

const statusDotStyle = (status) => {
  const map = {
    'Today':     'background:#fff;',
    'Upcoming':  'background:#3D8C8C;',
    'Completed': 'background:#888;',
    'Cancelled': 'background:#A32D2D;',
  }
  return map[status] || ''
}
</script>

<template>
    <div class="min-h-screen" style="background-color: #1a2e35;">


      <!-- Content -->
      <div class="p-7">

        <!-- Page Header -->
        <div class="flex items-start justify-between mb-5">
          <div>
            <p class="text-white font-bold text-xl tracking-tight">Consultations</p>
            <p class="text-white/60 text-xs mt-1">All scheduled, ongoing, and completed consultations</p>
          </div>
          
        </div>

        <!-- Stat Cards -->
        <div class="grid grid-cols-4 gap-3 mb-5">

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color: #7AABA8;">Total consultations</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">3,870</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;"><span style="color:#1A7A58;font-weight:600;">+7.4%</span> vs last month</p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color: #7AABA8;">Today's schedule</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">12</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;">3 completed · 9 upcoming</p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color: #7AABA8;">This week</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">58</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;"><span style="color:#1A7A58;font-weight:600;">+4</span> vs last week</p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-1.5" style="color: #7AABA8;">Completion rate</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">92%</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;"><span style="color:#1A7A58;font-weight:600;">+2%</span> vs last month</p>
          </div>

        </div>

        <!-- Main Grid -->
        <div class="grid gap-4" style="grid-template-columns: 1fr 300px;">

          <!-- Table Panel -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">

            <!-- Filters -->
            <div class="flex items-center gap-2 px-[18px] py-3 border-b flex-wrap" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold mr-2" style="color: #1A4A4A;">All consultations</p>
              <div
                v-for="f in filters"
                :key="f"
                class="px-3 py-1 rounded-full text-[11px] font-semibold cursor-pointer border"
                :style="activeFilter === f
                  ? 'background:#5AA7A7;color:#fff;border-color:#5AA7A7;'
                  : 'background:#F8FDFD;color:#5A8080;border-color:#C5E4E4;'"
                @click="activeFilter = f"
              >{{ f }}</div>
              <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border ml-auto" style="border-color:#C5E4E4;background:#F8FDFD;">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><circle cx="5" cy="5" r="3.5" stroke="#9ABABA" stroke-width="1.2"/><path d="M8 8l2.5 2.5" stroke="#9ABABA" stroke-width="1.2" stroke-linecap="round"/></svg>
                <input class="border-none outline-none text-[12px] w-[130px] bg-transparent font-sans" style="color:#3A6060;" placeholder="Search client or RND..." />
              </div>
            </div>

            <!-- Table -->
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="border-b" style="border-color:rgba(90,168,168,0.12);">
                    <th class="px-[18px] py-2.5 text-left text-[11px] font-bold uppercase tracking-wider whitespace-nowrap" style="color:#9ABABA;">Client</th>
                    <th class="px-[18px] py-2.5 text-left text-[11px] font-bold uppercase tracking-wider whitespace-nowrap" style="color:#9ABABA;">RND assigned</th>
                    <th class="px-[18px] py-2.5 text-left text-[11px] font-bold uppercase tracking-wider whitespace-nowrap" style="color:#9ABABA;">Date & time</th>
                    <th class="px-[18px] py-2.5 text-left text-[11px] font-bold uppercase tracking-wider whitespace-nowrap" style="color:#9ABABA;">Type</th>
                    <th class="px-[18px] py-2.5 text-left text-[11px] font-bold uppercase tracking-wider whitespace-nowrap" style="color:#9ABABA;">Status</th>
                    <th class="px-[18px] py-2.5 text-left text-[11px] font-bold uppercase tracking-wider whitespace-nowrap" style="color:#9ABABA;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="c in consultations"
                    :key="c.id"
                    class="border-b hover:bg-[#F0FAFA] transition-colors"
                    style="border-color:rgba(90,168,168,0.07);"
                  >
                    <td class="px-[18px] py-3">
                      <div class="flex items-center gap-2.5">
                        <div class="w-[30px] h-[30px] rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" :style="{ background: c.avatarColor }">{{ c.initials }}</div>
                        <div>
                          <p class="text-[13px] font-semibold" style="color:#1A4A4A;">{{ c.client }}</p>
                          <p class="text-[10px]" style="color:#9ABABA;">{{ c.id }}</p>
                        </div>
                      </div>
                    </td>
                    <td class="px-[18px] py-3">
                      <div class="flex items-center gap-2">
                        <div class="w-[26px] h-[26px] rounded-full flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0" :style="{ background: c.rndColor }">{{ c.rndInitials }}</div>
                        <span class="text-[12px]" style="color:#3A6060;">{{ c.rnd }}</span>
                      </div>
                    </td>
                    <td class="px-[18px] py-3">
                      <p class="text-[12px] font-semibold" style="color:#1A4A4A;">{{ c.date }}</p>
                      <p class="text-[11px]" style="color:#9ABABA;">{{ c.time }}</p>
                    </td>
                    <td class="px-[18px] py-3">
                      <span class="text-[10px] px-2 py-1 rounded-full font-bold inline-block" :style="typeBadgeStyle(c.type)">{{ c.type }}</span>
                    </td>
                    <td class="px-[18px] py-3">
                      <span class="text-[10px] px-2 py-1 rounded-full font-bold inline-flex items-center gap-1" :style="statusBadgeStyle(c.status)">
                        <span class="w-1.5 h-1.5 rounded-full" :style="statusDotStyle(c.status)"></span>
                        {{ c.status }}
                      </span>
                    </td>
                    <td class="px-[18px] py-3">
                      <button class="px-2.5 py-1 rounded-[7px] border text-[11px] font-semibold cursor-pointer" style="border-color:#C5E4E4;color:#3D8C8C;background:#F8FDFD;">View</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Pagination -->
            <div class="flex items-center justify-between px-[18px] py-3 border-t" style="border-color:rgba(90,168,168,0.1);">
              <p class="text-[11px]" style="color:#9ABABA;">Showing 8 of 3,870 consultations</p>
              <div class="flex gap-1.5">
                <button class="px-2.5 py-1 rounded-md border text-[11px] font-semibold cursor-pointer" style="border-color:#C5E4E4;color:#5A8080;background:#F8FDFD;">Previous</button>
                <button class="px-2.5 py-1 rounded-md text-[11px] font-semibold cursor-pointer border-none" style="background:#5AA7A7;color:#fff;">1</button>
                <button class="px-2.5 py-1 rounded-md border text-[11px] font-semibold cursor-pointer" style="border-color:#C5E4E4;color:#5A8080;background:#F8FDFD;">2</button>
                <button class="px-2.5 py-1 rounded-md border text-[11px] font-semibold cursor-pointer" style="border-color:#C5E4E4;color:#5A8080;background:#F8FDFD;">3</button>
                <button class="px-2.5 py-1 rounded-md border text-[11px] font-semibold cursor-pointer" style="border-color:#C5E4E4;color:#5A8080;background:#F8FDFD;">Next</button>
              </div>
            </div>
          </div>

          <!-- Sidebar -->
          <div class="flex flex-col gap-3.5">

            <!-- Mini Calendar -->
            <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
              <div class="flex items-center justify-between px-4 py-3 border-b" style="border-color:rgba(90,168,168,0.12);">
                <div class="w-[22px] h-[22px] rounded-md flex items-center justify-center cursor-pointer" style="background:#EBF7F7;">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M6.5 2L3.5 5l3 3" stroke="#5AA7A7" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <p class="text-[13px] font-bold" style="color:#1A4A4A;">March 2026</p>
                <div class="w-[22px] h-[22px] rounded-md flex items-center justify-center cursor-pointer" style="background:#EBF7F7;">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M3.5 2L6.5 5l-3 3" stroke="#5AA7A7" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
              </div>
              <div class="px-3.5 py-3">
                <div class="grid grid-cols-7 gap-0.5 mb-1.5">
                  <div v-for="d in ['S','M','T','W','T','F','S']" :key="d" class="text-center text-[10px] font-bold" style="color:#9ABABA;">{{ d }}</div>
                </div>
                <div class="grid grid-cols-7 gap-0.5">
                  <div
                    v-for="(d, i) in calDays"
                    :key="i"
                    class="text-center text-[11px] font-medium py-1 rounded-md cursor-pointer"
                    :style="d.today
                      ? 'background:#5AA7A7;color:#fff;font-weight:700;'
                      : d.event
                      ? 'background:#EBF7F7;color:#3D8C8C;font-weight:700;'
                      : d.other
                      ? 'color:#C5E4E4;'
                      : 'color:#5A8080;'"
                  >{{ d.day }}</div>
                </div>
              </div>
              <div class="flex flex-col gap-1.5 px-3.5 pb-3 border-t pt-2.5" style="border-color:rgba(90,168,168,0.1);">
                <div class="flex items-center gap-2 text-[11px]" style="color:#5A8080;">
                  <span class="w-2 h-2 rounded-full" style="background:#5AA7A7;"></span>Today
                </div>
                <div class="flex items-center gap-2 text-[11px]" style="color:#5A8080;">
                  <span class="w-2 h-2 rounded-full" style="background:#3D8C8C;"></span>Has consultations
                </div>
              </div>
            </div>

            <!-- Today's Schedule -->
            <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
              <div class="flex items-center justify-between px-4 py-3 border-b" style="border-color:rgba(90,168,168,0.12);">
                <p class="text-[13px] font-bold" style="color:#1A4A4A;">Today's schedule</p>
                <p class="text-[11px] font-semibold" style="color:#5AA7A7;">Mar 15</p>
              </div>
              <div>
                <div
                  v-for="(t, i) in todaySchedule"
                  :key="i"
                  class="flex items-start gap-2.5 px-4 py-2.5 border-b"
                  :style="i === todaySchedule.length - 1 ? 'border:none;' : 'border-color:rgba(90,168,168,0.08);'"
                >
                  <p class="text-[11px] font-bold min-w-[46px] pt-0.5" style="color:#5AA7A7;">{{ t.time }}</p>
                  <div>
                    <p class="text-[12px] font-bold" style="color:#1A4A4A;">{{ t.name }}</p>
                    <p class="text-[10px]" style="color:#9ABABA;">{{ t.rnd }}</p>
                    <span class="text-[10px] px-2 py-0.5 rounded-full font-bold mt-1 inline-block" :style="t.typeStyle">{{ t.type }}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
</template>
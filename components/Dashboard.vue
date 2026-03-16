<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('chart.js').then(({ Chart, registerables }) => {
    Chart.register(...registerables)

    new Chart(document.getElementById('mainChart'), {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          { label: 'Consultations',     data: [210,245,310,290,360,400,380,420,460,490,510,395], backgroundColor: '#5AA7A7', borderRadius: 4, barThickness: 13 },
          { label: 'New registrations', data: [40,55,70,65,80,95,85,100,110,120,130,89],         backgroundColor: '#C5E4E4', borderRadius: 4, barThickness: 13 },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#7AABA8' }, border: { display: false } },
          y: { grid: { color: 'rgba(90,168,168,0.1)' }, ticks: { font: { size: 10 }, color: '#7AABA8' }, border: { display: false } },
        }
      }
    })
  })
})
</script>

<template>
    <div class="min-h-screen" style="background-color: #1a2e35;">

      <div class="flex items-center justify-between px-7 py-3.5 border-b border-[#4a9a9a]" style="background-color: #4D9898;">
        <div>
          <h1 class="text-white font-medium text-lg tracking-tight">Dashboard</h1>
         
        </div>
        <div class="flex items-center gap-3">
          <div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-7">

        <p class="text-[10px] font-bold uppercase tracking-[.9px] mb-2.5" style="color: rgba(255,255,255,0.5);">At a glance</p>

        <!-- Metric Cards -->
        <div class="grid grid-cols-4 gap-3 mb-[18px]">

          <div class="rounded-[13px] p-4 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Total users</p>
            <p class="text-[27px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">1,604</p>
            <div class="flex items-center gap-1.5 mt-1.5">
              <span class="text-[11px] font-semibold px-1.5 py-0.5 rounded-full" style="background: #DFFAF0; color: #1A7A58;">+101</span>
              <span class="text-[11px]" style="color: #9ABABA;">this month</span>
            </div>
          </div>

          <div class="rounded-[13px] p-4 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Consultations</p>
            <p class="text-[27px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">3,870</p>
            <div class="flex items-center gap-1.5 mt-1.5">
              <span class="text-[11px] font-semibold px-1.5 py-0.5 rounded-full" style="background: #DFFAF0; color: #1A7A58;">+7.4%</span>
              <span class="text-[11px]" style="color: #9ABABA;">vs last month</span>
            </div>
          </div>

          <div class="rounded-[13px] p-4 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Active RNDs</p>
            <p class="text-[27px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">148</p>
            <div class="flex items-center gap-1.5 mt-1.5">
              <span class="text-[11px] font-semibold px-1.5 py-0.5 rounded-full" style="background: #DFFAF0; color: #1A7A58;">+12</span>
              <span class="text-[11px]" style="color: #9ABABA;">this month</span>
            </div>
          </div>

          <div class="rounded-[13px] p-4 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Platform revenue</p>
            <p class="text-[27px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">₱84.2k</p>
            <div class="flex items-center gap-1.5 mt-1.5">
              <span class="text-[11px] font-semibold px-1.5 py-0.5 rounded-full" style="background: #DFFAF0; color: #1A7A58;">+18.2%</span>
              <span class="text-[11px]" style="color: #9ABABA;">vs last month</span>
            </div>
          </div>

        </div>

        <!-- Middle Row -->
        <div class="grid gap-3.5 mb-3.5" style="grid-template-columns: 2fr 1fr;">

          <!-- Bar Chart -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Consultation activity — 2026</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">View full report ↗</p>
            </div>
            <div class="p-4">
              <div class="flex gap-3.5 mb-2.5">
                <div class="flex items-center gap-1.5 text-[11px] font-semibold" style="color: #7AABA8;">
                  <span class="w-2 h-2 rounded-sm" style="background: #5AA7A7;"></span>Consultations
                </div>
                <div class="flex items-center gap-1.5 text-[11px] font-semibold" style="color: #7AABA8;">
                  <span class="w-2 h-2 rounded-sm" style="background: #C5E4E4;"></span>New registrations
                </div>
              </div>
              <div class="relative w-full" style="height: 185px;">
                <canvas id="mainChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Quick Actions -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Quick actions</p>
            </div>
            <div class="p-4">
              <div class="grid grid-cols-2 gap-2">

                <div class="flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer" style="border-color: #E8F4F4; background: #F8FDFD;">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="6" r="3" stroke="#5AA7A7" stroke-width="1.4"/><path d="M2 13c0-2.761 2.686-5 6-5s6 2.239 6 5" stroke="#5AA7A7" stroke-width="1.4" stroke-linecap="round"/></svg>
                  </div>
                  <div>
                    <p class="text-[12px] font-semibold" style="color: #1A4A4A;">Add user</p>
                    <p class="text-[10px]" style="color: #9ABABA;">Register account</p>
                  </div>
                </div>

                <div class="flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer" style="border-color: #E8F4F4; background: #F8FDFD;">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="10" rx="2" stroke="#5AA7A7" stroke-width="1.4"/><path d="M5 7h6M5 10h4" stroke="#5AA7A7" stroke-width="1.3" stroke-linecap="round"/></svg>
                  </div>
                  <div>
                    <p class="text-[12px] font-semibold" style="color: #1A4A4A;">New report</p>
                    <p class="text-[10px]" style="color: #9ABABA;">Generate summary</p>
                  </div>
                </div>

                <div class="flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer" style="border-color: #E8F4F4; background: #F8FDFD;">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #FFF5CC;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#A07800" stroke-width="1.4"/><path d="M8 5v3.5" stroke="#A07800" stroke-width="1.4" stroke-linecap="round"/><circle cx="8" cy="11" r=".7" fill="#A07800"/></svg>
                  </div>
                  <div>
                    <p class="text-[12px] font-semibold" style="color: #1A4A4A;">Verify RND</p>
                    <p class="text-[10px]" style="color: #9ABABA;">4 pending review</p>
                  </div>
                </div>

                <div class="flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer" style="border-color: #E8F4F4; background: #F8FDFD;">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="4" width="12" height="8" rx="1.5" stroke="#5AA7A7" stroke-width="1.4"/><path d="M5 8h6M8 6v4" stroke="#5AA7A7" stroke-width="1.3" stroke-linecap="round"/></svg>
                  </div>
                  <div>
                    <p class="text-[12px] font-semibold" style="color: #1A4A4A;">Billing</p>
                    <p class="text-[10px]" style="color: #9ABABA;">View transactions</p>
                  </div>
                </div>

                <div class="flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer" style="border-color: #E8F4F4; background: #F8FDFD;">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #DFFAF0;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 10l3-3 2 2 3-4 2 2" stroke="#1A7A58" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/></svg>
                  </div>
                  <div>
                    <p class="text-[12px] font-semibold" style="color: #1A4A4A;">Analytics</p>
                    <p class="text-[10px]" style="color: #9ABABA;">Platform insights</p>
                  </div>
                </div>

                <div class="flex items-center gap-2.5 p-3 rounded-[10px] border cursor-pointer" style="border-color: #E8F4F4; background: #F8FDFD;">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="3" stroke="#5AA7A7" stroke-width="1.4"/><path d="M8 2v1.5M8 12.5V14M2 8h1.5M12.5 8H14" stroke="#5AA7A7" stroke-width="1.3" stroke-linecap="round"/></svg>
                  </div>
                  <div>
                    <p class="text-[12px] font-semibold" style="color: #1A4A4A;">Settings</p>
                    <p class="text-[10px]" style="color: #9ABABA;">System config</p>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Row -->
        <div class="grid gap-3.5" style="grid-template-columns: 1fr 1fr 1fr;">

          <!-- Upcoming Consultations -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Upcoming consultations</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">See all ↗</p>
            </div>
            <div class="px-[18px] pt-2 pb-2">

              <div class="flex items-center gap-2.5 py-2.5 border-b" style="border-color: rgba(90,168,168,0.08);">
                <div class="w-9 h-9 rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                  <p class="text-sm font-bold leading-none" style="color: #3D8C8C;">15</p>
                  <p class="text-[9px] font-semibold uppercase tracking-wider" style="color: #7AABA8;">Mar</p>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-semibold truncate" style="color: #1A4A4A;">Maria Santos</p>
                  <p class="text-[10px]" style="color: #9ABABA;">10:00 AM · RND Ana Reyes</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap" style="background: #EBF7F7; color: #3D8C8C;">Consult</span>
              </div>

              <div class="flex items-center gap-2.5 py-2.5 border-b" style="border-color: rgba(90,168,168,0.08);">
                <div class="w-9 h-9 rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                  <p class="text-sm font-bold leading-none" style="color: #3D8C8C;">16</p>
                  <p class="text-[9px] font-semibold uppercase tracking-wider" style="color: #7AABA8;">Mar</p>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-semibold truncate" style="color: #1A4A4A;">Carlos Dela Cruz</p>
                  <p class="text-[10px]" style="color: #9ABABA;">2:00 PM · RND Jose Lim</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap" style="background: #FFF5CC; color: #A07800;">Lab review</span>
              </div>

              <div class="flex items-center gap-2.5 py-2.5 border-b" style="border-color: rgba(90,168,168,0.08);">
                <div class="w-9 h-9 rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                  <p class="text-sm font-bold leading-none" style="color: #3D8C8C;">17</p>
                  <p class="text-[9px] font-semibold uppercase tracking-wider" style="color: #7AABA8;">Mar</p>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-semibold truncate" style="color: #1A4A4A;">Luz Villanueva</p>
                  <p class="text-[10px]" style="color: #9ABABA;">9:30 AM · RND Maria Cruz</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap" style="background: #DFFAF0; color: #1A7A58;">Follow-up</span>
              </div>

              <div class="flex items-center gap-2.5 py-2.5 border-b" style="border-color: rgba(90,168,168,0.08);">
                <div class="w-9 h-9 rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                  <p class="text-sm font-bold leading-none" style="color: #3D8C8C;">18</p>
                  <p class="text-[9px] font-semibold uppercase tracking-wider" style="color: #7AABA8;">Mar</p>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-semibold truncate" style="color: #1A4A4A;">Ramon Aquino</p>
                  <p class="text-[10px]" style="color: #9ABABA;">3:00 PM · RND Mark Santos</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap" style="background: #EBF7F7; color: #3D8C8C;">Consult</span>
              </div>

              <div class="flex items-center gap-2.5 py-2.5">
                <div class="w-9 h-9 rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                  <p class="text-sm font-bold leading-none" style="color: #3D8C8C;">19</p>
                  <p class="text-[9px] font-semibold uppercase tracking-wider" style="color: #7AABA8;">Mar</p>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-semibold truncate" style="color: #1A4A4A;">Nina Reyes</p>
                  <p class="text-[10px]" style="color: #9ABABA;">11:00 AM · RND Ana Reyes</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-semibold whitespace-nowrap" style="background: #DFFAF0; color: #1A7A58;">Follow-up</span>
              </div>

            </div>
          </div>

          <!-- Recent Activity -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Recent system activity</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">View log ↗</p>
            </div>
            <div class="px-[18px] pt-2 pb-2">

              <div class="flex items-start gap-2.5 py-2.5 border-b" style="border-color: rgba(90,168,168,0.08);">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #FFF5CC;">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1a5.5 5.5 0 100 11A5.5 5.5 0 006.5 1zm0 3v3" stroke="#A07800" stroke-width="1.3" stroke-linecap="round"/><circle cx="6.5" cy="9.5" r=".6" fill="#A07800"/></svg>
                </div>
                <div>
                  <p class="text-[11px] leading-snug" style="color: #3A6060;"><strong>Ana Reyes, RND</strong> submitted credentials for verification</p>
                  <p class="text-[10px] mt-0.5" style="color: #9ABABA;">2 min ago</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 py-2.5 border-b" style="border-color: rgba(90,168,168,0.08);">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #DFFAF0;">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M2.5 7l3 3 5-6" stroke="#1A7A58" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <div>
                  <p class="text-[11px] leading-snug" style="color: #3A6060;"><strong>Mark Santos, RND</strong> verified and activated</p>
                  <p class="text-[10px] mt-0.5" style="color: #9ABABA;">18 min ago</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 py-2.5 border-b" style="border-color: rgba(90,168,168,0.08);">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="6.5" cy="5" r="2.5" stroke="#3D8C8C" stroke-width="1.3"/><path d="M2 11c0-2.485 2.015-4.5 4.5-4.5S11 8.515 11 11" stroke="#3D8C8C" stroke-width="1.3" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <p class="text-[11px] leading-snug" style="color: #3A6060;">New client registered — <strong>Maria Santos</strong></p>
                  <p class="text-[10px] mt-0.5" style="color: #9ABABA;">35 min ago</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 py-2.5 border-b" style="border-color: rgba(90,168,168,0.08);">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #EBF7F7;">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><rect x="1.5" y="3" width="10" height="7" rx="1.5" stroke="#3D8C8C" stroke-width="1.3"/><path d="M4 6.5h5M6.5 5v3" stroke="#3D8C8C" stroke-width="1.1" stroke-linecap="round"/></svg>
                </div>
                <div>
                  <p class="text-[11px] leading-snug" style="color: #3A6060;">Payment received — Session #4821, <strong>₱350.00</strong></p>
                  <p class="text-[10px] mt-0.5" style="color: #9ABABA;">41 min ago</p>
                </div>
              </div>

              <div class="flex items-start gap-2.5 py-2.5">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0" style="background: #FDECEA;">
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><path d="M6.5 1.5L1 11h11L6.5 1.5z" stroke="#A32D2D" stroke-width="1.3" stroke-linejoin="round"/><path d="M6.5 5v3" stroke="#A32D2D" stroke-width="1.3" stroke-linecap="round"/><circle cx="6.5" cy="9.5" r=".6" fill="#A32D2D"/></svg>
                </div>
                <div>
                  <p class="text-[11px] leading-snug" style="color: #3A6060;">Flagged account — Client <strong>#C-1089</strong> needs review</p>
                  <p class="text-[10px] mt-0.5" style="color: #9ABABA;">1 hr ago</p>
                </div>
              </div>

            </div>
          </div>

          <!-- Platform Health -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Platform health</p>
            </div>
            <div class="p-[18px] flex flex-col gap-3">

              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <p class="text-[12px] font-semibold" style="color: #3A6060;">RND verification rate</p>
                  <p class="text-[11px] font-bold" style="color: #1A4A4A;">87%</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background: #E8F4F4;">
                  <div class="h-full rounded-full" style="width: 87%; background: #5AA7A7;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <p class="text-[12px] font-semibold" style="color: #3A6060;">Consultation completion</p>
                  <p class="text-[11px] font-bold" style="color: #1A4A4A;">92%</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background: #E8F4F4;">
                  <div class="h-full rounded-full" style="width: 92%; background: #3D8C8C;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <p class="text-[12px] font-semibold" style="color: #3A6060;">Client retention</p>
                  <p class="text-[11px] font-bold" style="color: #1A4A4A;">78%</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background: #E8F4F4;">
                  <div class="h-full rounded-full" style="width: 78%; background: #8BC4C4;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <p class="text-[12px] font-semibold" style="color: #3A6060;">Payment success rate</p>
                  <p class="text-[11px] font-bold" style="color: #1A4A4A;">95%</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background: #E8F4F4;">
                  <div class="h-full rounded-full" style="width: 95%; background: #5AA7A7;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <p class="text-[12px] font-semibold" style="color: #3A6060;">Active meal plans</p>
                  <p class="text-[11px] font-bold" style="color: #1A4A4A;">63%</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background: #E8F4F4;">
                  <div class="h-full rounded-full" style="width: 63%; background: #6EB8B8;"></div>
                </div>
              </div>

              <div>
                <div class="flex justify-between items-center mb-1.5">
                  <p class="text-[12px] font-semibold" style="color: #3A6060;">Education resource usage</p>
                  <p class="text-[11px] font-bold" style="color: #1A4A4A;">54%</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background: #E8F4F4;">
                  <div class="h-full rounded-full" style="width: 54%; background: #9ECFCF;"></div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
</template>
<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('chart.js').then(({ Chart, registerables }) => {
    Chart.register(...registerables)

    new Chart(document.getElementById('activityChart'), {
      type: 'bar',
      data: {
        labels: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
        datasets: [
          { label: 'Consultations', data: [210,245,310,290,360,400,380,420,460,490,510,395], backgroundColor: '#5AA7A7', borderRadius: 4, barThickness: 14 },
          { label: 'New clients',   data: [40,55,70,65,80,95,85,100,110,120,130,89],         backgroundColor: '#C5E4E4', borderRadius: 4, barThickness: 14 },
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 11 }, color: '#7AABA8' }, border: { display: false } },
          y: { grid: { color: 'rgba(90,168,168,0.12)' }, ticks: { font: { size: 11 }, color: '#7AABA8' }, border: { display: false } },
        }
      }
    })

    new Chart(document.getElementById('donutChart'), {
      type: 'doughnut',
      data: {
        labels: ['Clients', 'RNDs', 'Pending', 'Inactive'],
        datasets: [{ data: [1342, 148, 41, 73], backgroundColor: ['#5AA7A7','#3D8C8C','#8BC4C4','#C5E4E4'], borderWidth: 0, hoverOffset: 4 }]
      },
      options: { responsive: false, cutout: '68%', plugins: { legend: { display: false } } }
    })
  })
})
</script>

<template>
    <div class="min-h-screen" style="background-color: #1a2e35;">

      <!-- Top Bar -->
      <div class="flex items-center justify-between px-7 py-3.5 border-b border-[#4a9a9a]" style="background-color: #4D9898;">
        <div>
          <h1 class="text-white font-medium text-lg tracking-tight">System Administrator</h1>
         
        </div>
        <div class="flex items-center gap-3">
          <div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-7">

        <!-- Metric Cards -->
        <div class="grid grid-cols-4 gap-3 mb-6">

          <div class="rounded-xl p-4 border border-white/40" style="background: rgba(255,255,255,0.92);">
            <p class="text-xs uppercase tracking-wider mb-2" style="color: #5A8080;">Registered RNDs</p>
            <p class="text-4xl font-medium leading-none tracking-tight" style="color: #1F4F4F;">148</p>
            <p class="text-xs mt-1.5" style="color: #7AABA8;"><span style="color: #2E9E72;">+12</span> this month</p>
          </div>

          <div class="rounded-xl p-4 border border-white/40" style="background: rgba(255,255,255,0.92);">
            <p class="text-xs uppercase tracking-wider mb-2" style="color: #5A8080;">Active Clients</p>
            <p class="text-4xl font-medium leading-none tracking-tight" style="color: #1F4F4F;">1,342</p>
            <p class="text-xs mt-1.5" style="color: #7AABA8;"><span style="color: #2E9E72;">+89</span> this month</p>
          </div>

          <div class="rounded-xl p-4 border border-white/40" style="background: rgba(255,255,255,0.92);">
            <p class="text-xs uppercase tracking-wider mb-2" style="color: #5A8080;">Consultations</p>
            <p class="text-4xl font-medium leading-none tracking-tight" style="color: #1F4F4F;">3,870</p>
            <p class="text-xs mt-1.5" style="color: #7AABA8;"><span style="color: #2E9E72;">+7.4%</span> vs last month</p>
          </div>

          <div class="rounded-xl p-4 border border-white/40" style="background: rgba(255,255,255,0.92);">
            <p class="text-xs uppercase tracking-wider mb-2" style="color: #5A8080;">Total Commission</p>
            <p class="text-4xl font-medium leading-none tracking-tight" style="color: #1F4F4F;">₱84.2k</p>
            <p class="text-xs mt-1.5" style="color: #7AABA8;"><span style="color: #2E9E72;">+18.2%</span> vs last month</p>
          </div>

        </div>

        <!-- Middle Row -->
        <div class="grid gap-4 mb-5" style="grid-template-columns: 2fr 1.2fr;">

          <!-- Bar Chart -->
          <div class="rounded-xl border border-white/40 overflow-hidden" style="background: rgba(255,255,255,0.92);">
            <div class="flex items-center justify-between px-5 py-3.5 border-b" style="border-color: rgba(90,168,168,0.15);">
              <p class="text-sm font-medium" style="color: #1F4F4F;">Platform Activity — Consultations (2026)</p>
              <p class="text-xs cursor-pointer" style="color: #5AA7A7;">View details ↗</p>
            </div>
            <div class="p-4">
              <div class="relative w-full" style="height: 180px;">
                <canvas id="activityChart"></canvas>
              </div>
            </div>
          </div>

          <!-- Donut Chart -->
          <div class="rounded-xl border border-white/40 overflow-hidden" style="background: rgba(255,255,255,0.92);">
            <div class="px-5 py-3.5 border-b" style="border-color: rgba(90,168,168,0.15);">
              <p class="text-sm font-medium" style="color: #1F4F4F;">User distribution</p>
            </div>
            <div class="p-4 flex items-center justify-center">
              <div class="flex items-center gap-6">
                <canvas id="donutChart" width="100" height="100" style="width: 100px; height: 100px;"></canvas>
                <div class="flex flex-col gap-2">
                  <div class="flex items-center gap-2 text-xs" style="color: #3A6060;">
                    <span class="w-2 h-2 rounded-sm" style="background: #5AA7A7;"></span>
                    Clients
                    <span class="ml-2 font-medium" style="color: #1F4F4F;">1,342</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs" style="color: #3A6060;">
                    <span class="w-2 h-2 rounded-sm" style="background: #3D8C8C;"></span>
                    RNDs
                    <span class="ml-2 font-medium" style="color: #1F4F4F;">148</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs" style="color: #3A6060;">
                    <span class="w-2 h-2 rounded-sm" style="background: #8BC4C4;"></span>
                    Pending
                    <span class="ml-2 font-medium" style="color: #1F4F4F;">41</span>
                  </div>
                  <div class="flex items-center gap-2 text-xs" style="color: #3A6060;">
                    <span class="w-2 h-2 rounded-sm" style="background: #C5E4E4;"></span>
                    Inactive
                    <span class="ml-2 font-medium" style="color: #1F4F4F;">73</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>

        <!-- Bottom Row -->
        <div class="grid gap-4" style="grid-template-columns: 1.2fr 2fr;">

          <!-- Activity Log -->
          <div class="rounded-xl border border-white/40 overflow-hidden" style="background: rgba(255,255,255,0.92);">
            <div class="flex items-center justify-between px-5 py-3.5 border-b" style="border-color: rgba(90,168,168,0.15);">
              <p class="text-sm font-medium" style="color: #1F4F4F;">Recent activity log</p>
              <p class="text-xs cursor-pointer" style="color: #5AA7A7;">See all ↗</p>
            </div>
            <div class="px-5 pt-2 pb-3">

              <div class="flex items-start gap-3 py-2.5 border-b" style="border-color: rgba(90,168,168,0.1);">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style="background: #FFF3CD;">🔔</div>
                <div>
                  <p class="text-xs leading-relaxed" style="color: #3A6060;">New RND registration — <strong>Ana Reyes, RND</strong> awaiting verification</p>
                  <p class="text-xs mt-0.5" style="color: #9ABABA;">2 min ago</p>
                </div>
              </div>

              <div class="flex items-start gap-3 py-2.5 border-b" style="border-color: rgba(90,168,168,0.1);">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style="background: #D4F0E8;">✓</div>
                <div>
                  <p class="text-xs leading-relaxed" style="color: #3A6060;">RND verified — <strong>Mark Santos, RND</strong> approved and activated</p>
                  <p class="text-xs mt-0.5" style="color: #9ABABA;">18 min ago</p>
                </div>
              </div>

              <div class="flex items-start gap-3 py-2.5 border-b" style="border-color: rgba(90,168,168,0.1);">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style="background: #D4EEEE;">₱</div>
                <div>
                  <p class="text-xs leading-relaxed" style="color: #3A6060;">Commission collected — Session #4821, <strong>₱350.00</strong> (10%)</p>
                  <p class="text-xs mt-0.5" style="color: #9ABABA;">41 min ago</p>
                </div>
              </div>

              <div class="flex items-start gap-3 py-2.5 border-b" style="border-color: rgba(90,168,168,0.1);">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style="background: #FAE0E0;">!</div>
                <div>
                  <p class="text-xs leading-relaxed" style="color: #3A6060;">Flagged account — Client <strong>#C-1089</strong> reported suspicious activity</p>
                  <p class="text-xs mt-0.5" style="color: #9ABABA;">1 hr ago</p>
                </div>
              </div>

              <div class="flex items-start gap-3 py-2.5">
                <div class="w-7 h-7 rounded-lg flex items-center justify-center text-sm flex-shrink-0" style="background: #D4EEEE;">₱</div>
                <div>
                  <p class="text-xs leading-relaxed" style="color: #3A6060;">Commission collected — Session #4820, <strong>₱280.00</strong> (10%)</p>
                  <p class="text-xs mt-0.5" style="color: #9ABABA;">2 hrs ago</p>
                </div>
              </div>

            </div>
          </div>

          <!-- RND Verification Queue -->
          <div class="rounded-xl border border-white/40 overflow-hidden" style="background: rgba(255,255,255,0.92);">
            <div class="flex items-center justify-between px-5 py-3.5 border-b" style="border-color: rgba(90,168,168,0.15);">
              <p class="text-sm font-medium" style="color: #1F4F4F;">RND verification queue</p>
              <p class="text-xs cursor-pointer" style="color: #5AA7A7;">Manage all ↗</p>
            </div>
            <div class="px-5 pt-2 pb-3">

              <div class="flex items-center gap-3 py-2.5 border-b" style="border-color: rgba(90,168,168,0.1);">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" style="background: #5AA7A7;">AR</div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate" style="color: #1F4F4F;">Ana Reyes, RND</p>
                  <p class="text-xs" style="color: #7AABA8;">Diabetes & Renal Nutrition</p>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" style="background: #FFF3CD; color: #856404;">Pending</span>
              </div>

              <div class="flex items-center gap-3 py-2.5 border-b" style="border-color: rgba(90,168,168,0.1);">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" style="background: #3D8C8C;">JL</div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate" style="color: #1F4F4F;">Jose Lim, RND</p>
                  <p class="text-xs" style="color: #7AABA8;">Weight Management</p>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" style="background: #FFF3CD; color: #856404;">Pending</span>
              </div>

              <div class="flex items-center gap-3 py-2.5 border-b" style="border-color: rgba(90,168,168,0.1);">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" style="background: #8BC4C4;">MS</div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate" style="color: #1F4F4F;">Mark Santos, RND</p>
                  <p class="text-xs" style="color: #7AABA8;">Clinical Nutrition</p>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" style="background: #D4F0E8; color: #1A7A58;">Verified</span>
              </div>

              <div class="flex items-center gap-3 py-2.5 border-b" style="border-color: rgba(90,168,168,0.1);">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" style="background: #2E7D7D;">MC</div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate" style="color: #1F4F4F;">Maria Cruz, RND</p>
                  <p class="text-xs" style="color: #7AABA8;">Pediatric Nutrition</p>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" style="background: #D4F0E8; color: #1A7A58;">Verified</span>
              </div>

              <div class="flex items-center gap-3 py-2.5">
                <div class="w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium text-white flex-shrink-0" style="background: #6EB8B8;">RC</div>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium truncate" style="color: #1F4F4F;">Rico Castillo, RND</p>
                  <p class="text-xs" style="color: #7AABA8;">Sports Nutrition</p>
                </div>
                <span class="text-xs px-2 py-0.5 rounded-full font-medium" style="background: #F0E8E8; color: #7A3030;">Inactive</span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
</template>
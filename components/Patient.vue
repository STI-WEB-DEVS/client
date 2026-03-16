<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('chart.js').then(({ Chart, registerables }) => {
    Chart.register(...registerables)

    new Chart(document.getElementById('weightChart'), {
      type: 'line',
      data: {
        labels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
        datasets: [
          { label: 'Weight', data: [68,67.2,66.5,65.8,65,64.2], borderColor: '#5AA7A7', backgroundColor: 'rgba(90,168,168,0.08)', tension: .4, pointBackgroundColor: '#5AA7A7', pointRadius: 4, borderWidth: 2, fill: true },
          { label: 'Target', data: [67,66,65,64,63,62], borderColor: '#C5E4E4', borderDash: [4,3], tension: .4, pointRadius: 0, borderWidth: 1.5, fill: false },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
          x: { grid: { display: false }, ticks: { font: { size: 10 }, color: '#7AABA8' }, border: { display: false } },
          y: { grid: { color: 'rgba(90,168,168,0.1)' }, ticks: { font: { size: 10 }, color: '#7AABA8' }, border: { display: false } },
        }
      }
    })

    new Chart(document.getElementById('nutriChart'), {
      type: 'bar',
      data: {
        labels: ['Calories','Protein','Carbs','Fats','Fiber'],
        datasets: [
          { label: 'Actual', data: [1820,72,210,48,28], backgroundColor: '#5AA7A7', borderRadius: 4, barThickness: 16 },
          { label: 'Target', data: [1800,75,200,50,25], backgroundColor: '#C5E4E4', borderRadius: 4, barThickness: 16 },
        ]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
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

      <!-- Top Bar -->
      <div class="flex items-center justify-between px-7 py-3.5 border-b border-[#4a9a9a]" style="background-color: #4D9898;">
        <div>
          <h1 class="text-white font-medium text-lg tracking-tight">Patient Dashboard</h1>
         
        </div>
        <div class="flex items-center gap-3">
          <div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-7">

        <!-- Page Header -->
        <div class="flex items-start justify-between mb-5">
          <div>
            <p class="text-white font-bold text-xl tracking-tight">Hello, Maria</p>
            <p class="text-white/60 text-xs mt-1">Track your progress, find a dietitian, and review your consultations</p>
          </div>
          <button class="flex items-center gap-1.5 px-4 py-2.5 bg-white rounded-[9px] text-[13px] font-bold border-none cursor-pointer" style="color: #3D8C8C;">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="3" width="10" height="8" rx="1.5" stroke="#3D8C8C" stroke-width="1.5"/><path d="M5 6h4M5 8.5h2.5" stroke="#3D8C8C" stroke-width="1.2" stroke-linecap="round"/></svg>
            Download report
          </button>
        </div>

        <!-- Stat Cards -->
        <div class="grid grid-cols-4 gap-3 mb-[18px]">

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Current weight</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">64.2 kg</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;"><span style="color:#1A7A58;font-weight:600;">-3.8 kg</span> since start</p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">BMI</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">23.4</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;"><span style="color:#1A7A58;font-weight:600;">Normal range</span></p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Consultations</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">12</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;">Next: Mar 19, 11:00 AM</p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Diet adherence</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">87%</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;"><span style="color:#1A7A58;font-weight:600;">+5%</span> vs last month</p>
          </div>

        </div>

        <!-- Row 1: Find Dietitian + Weight Chart -->
        <div class="grid gap-3.5 mb-3.5" style="grid-template-columns: 1fr 1fr;">

          <!-- Find a Dietitian -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Find a dietitian</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">View all ↗</p>
            </div>
            <div class="flex items-center gap-2 px-[18px] py-3 border-b" style="border-color: rgba(90,168,168,0.1);">
              <div class="flex-1 flex items-center gap-2 px-3 py-1.5 rounded-[9px] border" style="border-color:#C5E4E4;background:#F8FDFD;">
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none"><circle cx="5.5" cy="5.5" r="4" stroke="#9ABABA" stroke-width="1.3"/><path d="M9 9l2.5 2.5" stroke="#9ABABA" stroke-width="1.3" stroke-linecap="round"/></svg>
                <input class="border-none outline-none text-[12px] bg-transparent flex-1" style="color:#3A6060;font-family:inherit;" placeholder="Search by name or specialty..." />
              </div>
              <select class="px-2.5 py-1.5 rounded-[9px] border text-[12px] outline-none" style="border-color:#C5E4E4;background:#F8FDFD;color:#5A8080;font-family:inherit;">
                <option>All specialties</option>
                <option>Diabetes</option>
                <option>Renal</option>
                <option>Weight Mgmt</option>
                <option>Pediatric</option>
              </select>
            </div>
            <div class="grid grid-cols-2 gap-2.5 p-[18px]">

              <div class="rounded-[11px] border p-3 cursor-pointer" style="border-width:1.5px;border-color:#E8F4F4;background:#FAFEFE;">
                <div class="flex items-center gap-2.5 mb-2.5">
                  <div class="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0" style="background:#5AA7A7;">AR</div>
                  <div>
                    <p class="text-[13px] font-bold" style="color:#1A4A4A;">Ana Reyes, RND</p>
                    <p class="text-[10px]" style="color:#9ABABA;">My current dietitian</p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1 mb-2">
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Diabetes</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Renal</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Weight</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-semibold flex items-center gap-1" style="color:#A07800;">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="#A07800"><path d="M5.5 1l1.2 3.6H10L7.2 6.8l1.1 3.4L5.5 8.4 2.7 10.2l1.1-3.4L1 4.6h3.3z"/></svg>
                    4.9 · 124
                  </span>
                  <button class="px-3 py-1 rounded-[7px] text-[11px] font-bold text-white border-none cursor-pointer" style="background:#5AA7A7;">Booked</button>
                </div>
              </div>

              <div class="rounded-[11px] border p-3 cursor-pointer" style="border-width:1.5px;border-color:#E8F4F4;background:#FAFEFE;">
                <div class="flex items-center gap-2.5 mb-2.5">
                  <div class="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0" style="background:#3D8C8C;">JL</div>
                  <div>
                    <p class="text-[13px] font-bold" style="color:#1A4A4A;">Jose Lim, RND</p>
                    <p class="text-[10px]" style="color:#9ABABA;">5 yrs experience</p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1 mb-2">
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Weight</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Sports</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-semibold flex items-center gap-1" style="color:#A07800;">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="#A07800"><path d="M5.5 1l1.2 3.6H10L7.2 6.8l1.1 3.4L5.5 8.4 2.7 10.2l1.1-3.4L1 4.6h3.3z"/></svg>
                    4.7 · 89
                  </span>
                  <button class="px-3 py-1 rounded-[7px] text-[11px] font-bold text-white border-none cursor-pointer" style="background:#5AA7A7;">Book</button>
                </div>
              </div>

              <div class="rounded-[11px] border p-3 cursor-pointer" style="border-width:1.5px;border-color:#E8F4F4;background:#FAFEFE;">
                <div class="flex items-center gap-2.5 mb-2.5">
                  <div class="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0" style="background:#6EB8B8;">MC</div>
                  <div>
                    <p class="text-[13px] font-bold" style="color:#1A4A4A;">Maria Cruz, RND</p>
                    <p class="text-[10px]" style="color:#9ABABA;">8 yrs experience</p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1 mb-2">
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Pediatric</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Clinical</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-semibold flex items-center gap-1" style="color:#A07800;">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="#A07800"><path d="M5.5 1l1.2 3.6H10L7.2 6.8l1.1 3.4L5.5 8.4 2.7 10.2l1.1-3.4L1 4.6h3.3z"/></svg>
                    4.8 · 201
                  </span>
                  <button class="px-3 py-1 rounded-[7px] text-[11px] font-bold text-white border-none cursor-pointer" style="background:#5AA7A7;">Book</button>
                </div>
              </div>

              <div class="rounded-[11px] border p-3 cursor-pointer" style="border-width:1.5px;border-color:#E8F4F4;background:#FAFEFE;">
                <div class="flex items-center gap-2.5 mb-2.5">
                  <div class="w-[38px] h-[38px] rounded-full flex items-center justify-center text-[12px] font-bold text-white flex-shrink-0" style="background:#2E7D7D;">MS</div>
                  <div>
                    <p class="text-[13px] font-bold" style="color:#1A4A4A;">Mark Santos, RND</p>
                    <p class="text-[10px]" style="color:#9ABABA;">6 yrs experience</p>
                  </div>
                </div>
                <div class="flex flex-wrap gap-1 mb-2">
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Hypertension</span>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-semibold" style="background:#EBF7F7;color:#3D8C8C;">Renal</span>
                </div>
                <div class="flex items-center justify-between">
                  <span class="text-[11px] font-semibold flex items-center gap-1" style="color:#A07800;">
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="#A07800"><path d="M5.5 1l1.2 3.6H10L7.2 6.8l1.1 3.4L5.5 8.4 2.7 10.2l1.1-3.4L1 4.6h3.3z"/></svg>
                    4.6 · 67
                  </span>
                  <button class="px-3 py-1 rounded-[7px] text-[11px] font-bold text-white border-none cursor-pointer" style="background:#5AA7A7;">Book</button>
                </div>
              </div>

            </div>
          </div>

          <!-- Weight Progress Chart -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Weight progress</p>
              <p class="text-[11px] font-semibold" style="color: #5AA7A7;">6 months</p>
            </div>
            <div class="p-4">
              <div class="flex gap-4 mb-2.5">
                <div class="flex items-center gap-1.5 text-[11px] font-semibold" style="color:#7AABA8;"><span class="w-2 h-2 rounded-sm inline-block" style="background:#5AA7A7;"></span>Weight (kg)</div>
                <div class="flex items-center gap-1.5 text-[11px] font-semibold" style="color:#7AABA8;"><span class="w-2 h-2 rounded-sm inline-block" style="background:#C5E4E4;"></span>Target</div>
              </div>
              <div class="relative w-full" style="height: 160px;">
                <canvas id="weightChart"></canvas>
              </div>
            </div>
          </div>

        </div>

        <!-- Row 2: Consultation Summaries + Clinical Progress -->
        <div class="grid gap-3.5 mb-3.5" style="grid-template-columns: 1.4fr 1fr;">

          <!-- Consultation Summaries -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Consultation summaries</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">See all ↗</p>
            </div>

            <div class="flex items-start gap-3 px-[18px] py-3 border-b" style="border-color: rgba(90,168,168,0.08);">
              <div class="w-[38px] h-[38px] rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background:#EBF7F7;">
                <p class="text-[13px] font-bold leading-none" style="color:#3D8C8C;">15</p>
                <p class="text-[9px] font-semibold uppercase tracking-wider" style="color:#7AABA8;">Mar</p>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <p class="text-[12px] font-bold" style="color:#1A4A4A;">Follow-up consultation</p>
                  <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#DFFAF0;color:#1A7A58;">Follow-up</span>
                </div>
                <p class="text-[10px] mb-1.5" style="color:#9ABABA;">Ana Reyes, RND</p>
                <p class="text-[11px] leading-snug" style="color:#5A8080;">Weight decreased by 0.4 kg. Blood glucose improving. Meal plan adjusted — reduced refined carbs, increased fiber.</p>
              </div>
              <p class="text-[11px] font-semibold cursor-pointer whitespace-nowrap pt-0.5" style="color:#5AA7A7;">↓ PDF</p>
            </div>

            <div class="flex items-start gap-3 px-[18px] py-3 border-b" style="border-color: rgba(90,168,168,0.08);">
              <div class="w-[38px] h-[38px] rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background:#EBF7F7;">
                <p class="text-[13px] font-bold leading-none" style="color:#3D8C8C;">01</p>
                <p class="text-[9px] font-semibold uppercase tracking-wider" style="color:#7AABA8;">Mar</p>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <p class="text-[12px] font-bold" style="color:#1A4A4A;">Lab results review</p>
                  <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#FFF5CC;color:#A07800;">Lab review</span>
                </div>
                <p class="text-[10px] mb-1.5" style="color:#9ABABA;">Ana Reyes, RND</p>
                <p class="text-[11px] leading-snug" style="color:#5A8080;">HbA1c at 6.1% — significant improvement from 7.2%. Cholesterol within normal range. Continued current dietary plan.</p>
              </div>
              <p class="text-[11px] font-semibold cursor-pointer whitespace-nowrap pt-0.5" style="color:#5AA7A7;">↓ PDF</p>
            </div>

            <div class="flex items-start gap-3 px-[18px] py-3" style="border-color: rgba(90,168,168,0.08);">
              <div class="w-[38px] h-[38px] rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background:#EBF7F7;">
                <p class="text-[13px] font-bold leading-none" style="color:#3D8C8C;">15</p>
                <p class="text-[9px] font-semibold uppercase tracking-wider" style="color:#7AABA8;">Feb</p>
              </div>
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-1">
                  <p class="text-[12px] font-bold" style="color:#1A4A4A;">Monthly consultation</p>
                  <span class="text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#EBF7F7;color:#3D8C8C;">Consult</span>
                </div>
                <p class="text-[10px] mb-1.5" style="color:#9ABABA;">Ana Reyes, RND</p>
                <p class="text-[11px] leading-snug" style="color:#5A8080;">Weight loss of 1.2 kg this month. Introduced low-GI food substitutes. Physical activity plan reviewed and updated.</p>
              </div>
              <p class="text-[11px] font-semibold cursor-pointer whitespace-nowrap pt-0.5" style="color:#5AA7A7;">↓ PDF</p>
            </div>
          </div>

          <!-- Clinical Progress -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Clinical progress</p>
            </div>
            <div class="flex flex-col gap-3.5 p-[18px]">

              <div>
                <div class="flex justify-between items-baseline mb-1.5">
                  <p class="text-[12px] font-semibold" style="color:#3A6060;">Blood glucose (fasting)</p>
                  <p class="text-[11px]" style="color:#9ABABA;"><span class="font-bold text-[13px]" style="color:#1A4A4A;">98</span> mg/dL · &lt;100</p>
                </div>
                <div class="h-[7px] rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:82%;background:#5AA7A7;"></div></div>
                <p class="text-[10px] mt-1" style="color:#9ABABA;">Improved from 126 mg/dL · Jan 2026</p>
              </div>

              <div>
                <div class="flex justify-between items-baseline mb-1.5">
                  <p class="text-[12px] font-semibold" style="color:#3A6060;">HbA1c</p>
                  <p class="text-[11px]" style="color:#9ABABA;"><span class="font-bold text-[13px]" style="color:#1A4A4A;">6.1%</span> · &lt;6.5%</p>
                </div>
                <div class="h-[7px] rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:88%;background:#3D8C8C;"></div></div>
                <p class="text-[10px] mt-1" style="color:#9ABABA;">Improved from 7.2% · Jan 2026</p>
              </div>

              <div>
                <div class="flex justify-between items-baseline mb-1.5">
                  <p class="text-[12px] font-semibold" style="color:#3A6060;">Blood pressure</p>
                  <p class="text-[11px]" style="color:#9ABABA;"><span class="font-bold text-[13px]" style="color:#1A4A4A;">118/76</span> · &lt;120/80</p>
                </div>
                <div class="h-[7px] rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:95%;background:#8BC4C4;"></div></div>
                <p class="text-[10px] mt-1" style="color:#9ABABA;">Stable · within normal range</p>
              </div>

              <div>
                <div class="flex justify-between items-baseline mb-1.5">
                  <p class="text-[12px] font-semibold" style="color:#3A6060;">Total cholesterol</p>
                  <p class="text-[11px]" style="color:#9ABABA;"><span class="font-bold text-[13px]" style="color:#1A4A4A;">182</span> mg/dL · &lt;200</p>
                </div>
                <div class="h-[7px] rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:78%;background:#6EB8B8;"></div></div>
                <p class="text-[10px] mt-1" style="color:#9ABABA;">Improved from 214 mg/dL · Jan 2026</p>
              </div>

            </div>
          </div>

        </div>

        <!-- Row 3: Lifestyle + Nutrition Chart -->
        <div class="grid gap-3.5" style="grid-template-columns: 1fr 1fr;">

          <!-- Lifestyle Improvements -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Lifestyle improvements</p>
            </div>
            <div class="grid grid-cols-2 gap-2.5 p-[18px]">

              <div class="rounded-[10px] border p-3" style="border-color:#E8F4F4;background:#FAFEFE;">
                <div class="w-7 h-7 rounded-[7px] flex items-center justify-center mb-2" style="background:#EBF7F7;">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 2C5.791 2 4 3.791 4 6c0 3 4 8 4 8s4-5 4-8c0-2.209-1.791-4-4-4z" stroke="#5AA7A7" stroke-width="1.4"/><circle cx="8" cy="6" r="1.5" stroke="#5AA7A7" stroke-width="1.2"/></svg>
                </div>
                <p class="text-[11px] font-semibold mb-0.5" style="color:#7AABA8;">Steps / day</p>
                <p class="text-[18px] font-bold tracking-tight" style="color:#1A4A4A;">7,842</p>
                <p class="text-[10px] mt-1"><span style="color:#1A7A58;font-weight:600;">+1,200</span> <span style="color:#9ABABA;">vs last month</span></p>
              </div>

              <div class="rounded-[10px] border p-3" style="border-color:#E8F4F4;background:#FAFEFE;">
                <div class="w-7 h-7 rounded-[7px] flex items-center justify-center mb-2" style="background:#DFFAF0;">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8.5C3 5.5 5.5 3 8.5 3S14 5.5 14 8.5" stroke="#1A7A58" stroke-width="1.4" stroke-linecap="round"/><path d="M2 11l2-1 2 2 2-3 2 1.5 2-4 2 2" stroke="#1A7A58" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <p class="text-[11px] font-semibold mb-0.5" style="color:#7AABA8;">Diet adherence</p>
                <p class="text-[18px] font-bold tracking-tight" style="color:#1A4A4A;">87%</p>
                <p class="text-[10px] mt-1"><span style="color:#1A7A58;font-weight:600;">+5%</span> <span style="color:#9ABABA;">vs last month</span></p>
              </div>

              <div class="rounded-[10px] border p-3" style="border-color:#E8F4F4;background:#FAFEFE;">
                <div class="w-7 h-7 rounded-[7px] flex items-center justify-center mb-2" style="background:#EBF7F7;">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><circle cx="8" cy="8" r="5.5" stroke="#5AA7A7" stroke-width="1.4"/><path d="M8 5v3.5l2 1" stroke="#5AA7A7" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round"/></svg>
                </div>
                <p class="text-[11px] font-semibold mb-0.5" style="color:#7AABA8;">Avg sleep</p>
                <p class="text-[18px] font-bold tracking-tight" style="color:#1A4A4A;">7.2 hrs</p>
                <p class="text-[10px] mt-1"><span style="color:#1A7A58;font-weight:600;">+0.5 hrs</span> <span style="color:#9ABABA;">vs last month</span></p>
              </div>

              <div class="rounded-[10px] border p-3" style="border-color:#E8F4F4;background:#FAFEFE;">
                <div class="w-7 h-7 rounded-[7px] flex items-center justify-center mb-2" style="background:#FFF5CC;">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M4 12V7M7 12V4M10 12V9M13 12V6" stroke="#A07800" stroke-width="1.4" stroke-linecap="round"/></svg>
                </div>
                <p class="text-[11px] font-semibold mb-0.5" style="color:#7AABA8;">Water intake</p>
                <p class="text-[18px] font-bold tracking-tight" style="color:#1A4A4A;">2.1 L</p>
                <p class="text-[10px] mt-1"><span style="color:#A32D2D;font-weight:600;">-0.2 L</span> <span style="color:#9ABABA;">vs last month</span></p>
              </div>

            </div>
          </div>

          <!-- Nutritional Intake Chart -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Nutritional intake vs target</p>
              <p class="text-[11px] font-semibold" style="color: #5AA7A7;">This week</p>
            </div>
            <div class="p-[18px]">
              <div class="flex gap-4 mb-2.5">
                <div class="flex items-center gap-1.5 text-[11px] font-semibold" style="color:#7AABA8;"><span class="w-2 h-2 rounded-sm inline-block" style="background:#5AA7A7;"></span>Actual</div>
                <div class="flex items-center gap-1.5 text-[11px] font-semibold" style="color:#7AABA8;"><span class="w-2 h-2 rounded-sm inline-block" style="background:#C5E4E4;"></span>Target</div>
              </div>
              <div class="relative w-full" style="height: 155px;">
                <canvas id="nutriChart"></canvas>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>
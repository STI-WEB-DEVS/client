<script setup>
import { onMounted } from 'vue'

onMounted(() => {
  import('chart.js').then(({ Chart, registerables }) => {
    Chart.register(...registerables)

    new Chart(document.getElementById('progressChart'), {
      type: 'line',
      data: {
        labels: ['Oct','Nov','Dec','Jan','Feb','Mar'],
        datasets: [
          { label: 'Weight', data: [68,67.2,66.5,65.8,65,64.2], borderColor: '#5AA7A7', backgroundColor: 'rgba(90,168,168,0.08)', tension: .4, pointBackgroundColor: '#5AA7A7', pointRadius: 3, borderWidth: 2, fill: true },
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
  })
})
</script>

<template>
    <div class="min-h-screen" style="background-color: #1a2e35;">

      <!-- Top Bar -->
      <div class="flex items-center justify-between px-7 py-3.5 border-b border-[#4a9a9a]" style="background-color: #4D9898;">
        <div>
          <h1 class="text-white font-medium text-lg tracking-tight">RND Dashboard</h1>
         
        </div>
        <div class="flex items-center gap-3">
          <div>
          </div>
        </div>
      </div>

      <!-- Content -->
      <div class="p-7">

        <!-- Page Header -->
        <div class="flex items-start justify-between mb-[18px]">
          <div>
            <p class="text-white font-bold text-xl tracking-tight">Good morning, Ana</p>
            <p class="text-white/60 text-xs mt-1">Sunday, March 15, 2026</p>
          </div>
          <div class="flex gap-2">
            <button class="px-3.5 py-2 rounded-[9px] text-[12px] font-semibold text-white border cursor-pointer border-white/20" style="background: rgba(255,255,255,0.15);">+ New patient</button>
            <button class="px-3.5 py-2 rounded-[9px] text-[12px] font-bold border-none cursor-pointer" style="background:#fff;color:#3D8C8C;">Generate report</button>
          </div>
        </div>

        <!-- KPI Cards -->
        <div class="grid grid-cols-4 gap-3 mb-[18px]">

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Active patients</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">24</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;"><span style="color:#1A7A58;font-weight:600;">+3</span> this month</p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Today's consults</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">5</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;">2 done · 3 upcoming</p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Pending tasks</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">8</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;">3 urgent · 5 routine</p>
          </div>

          <div class="rounded-[13px] p-3.5 border border-white/50" style="background: rgba(255,255,255,0.95);">
            <p class="text-[11px] font-semibold uppercase tracking-wider mb-2" style="color: #7AABA8;">Completion rate</p>
            <p class="text-[24px] font-bold leading-none tracking-tight" style="color: #1A4A4A;">94%</p>
            <p class="text-[11px] mt-1.5" style="color: #9ABABA;"><span style="color:#1A7A58;font-weight:600;">+2%</span> vs last month</p>
          </div>

        </div>

        <!-- Row 1: Patient Panel + Upcoming + Tasks -->
        <div class="grid gap-3.5 mb-3.5" style="grid-template-columns: 1.6fr 1fr;">

          <!-- Patient Panel -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Patient panel</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">View all ↗</p>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="border-b" style="border-color:rgba(90,168,168,0.12);">
                    <th class="px-[18px] py-2.5 text-left text-[10px] font-bold uppercase tracking-wider whitespace-nowrap" style="color:#9ABABA;">Patient</th>
                    <th class="px-[18px] py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style="color:#9ABABA;">BMI</th>
                    <th class="px-[18px] py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style="color:#9ABABA;">BMR</th>
                    <th class="px-[18px] py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style="color:#9ABABA;">Risk</th>
                    <th class="px-[18px] py-2.5 text-left text-[10px] font-bold uppercase tracking-wider" style="color:#9ABABA;">Condition</th>
                    <th class="px-[18px] py-2.5"></th>
                  </tr>
                </thead>
                <tbody>

                  <tr class="border-b" style="border-color:rgba(90,168,168,0.07);">
                    <td class="px-[18px] py-2.5">
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style="background:#5AA7A7;">MS</div>
                        <div><p class="text-[12px] font-bold" style="color:#1A4A4A;">Maria Santos</p><p class="text-[10px]" style="color:#9ABABA;">#C-1041</p></div>
                      </div>
                    </td>
                    <td class="px-[18px] py-2.5 text-[12px] font-semibold" style="color:#1A4A4A;">23.4</td>
                    <td class="px-[18px] py-2.5 text-[12px]" style="color:#3A6060;">1,432 kcal</td>
                    <td class="px-[18px] py-2.5"><span class="text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#DFFAF0;color:#1A7A58;">Low</span></td>
                    <td class="px-[18px] py-2.5 text-[11px]" style="color:#5A8080;">Diabetes T2</td>
                    <td class="px-[18px] py-2.5"><button class="px-2.5 py-1 rounded-[7px] border text-[11px] font-semibold cursor-pointer" style="border-color:#C5E4E4;color:#3D8C8C;background:#F8FDFD;">Chart</button></td>
                  </tr>

                  <tr class="border-b" style="border-color:rgba(90,168,168,0.07);">
                    <td class="px-[18px] py-2.5">
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style="background:#3D8C8C;">CD</div>
                        <div><p class="text-[12px] font-bold" style="color:#1A4A4A;">Carlos Dela Cruz</p><p class="text-[10px]" style="color:#9ABABA;">#C-1042</p></div>
                      </div>
                    </td>
                    <td class="px-[18px] py-2.5 text-[12px] font-semibold" style="color:#1A4A4A;">29.1</td>
                    <td class="px-[18px] py-2.5 text-[12px]" style="color:#3A6060;">1,820 kcal</td>
                    <td class="px-[18px] py-2.5"><span class="text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#FFF5CC;color:#A07800;">Moderate</span></td>
                    <td class="px-[18px] py-2.5 text-[11px]" style="color:#5A8080;">Hypertension</td>
                    <td class="px-[18px] py-2.5"><button class="px-2.5 py-1 rounded-[7px] border text-[11px] font-semibold cursor-pointer" style="border-color:#C5E4E4;color:#3D8C8C;background:#F8FDFD;">Chart</button></td>
                  </tr>

                  <tr>
                    <td class="px-[18px] py-2.5">
                      <div class="flex items-center gap-2.5">
                        <div class="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style="background:#6EB8B8;">LV</div>
                        <div><p class="text-[12px] font-bold" style="color:#1A4A4A;">Luz Villanueva</p><p class="text-[10px]" style="color:#9ABABA;">#C-1043</p></div>
                      </div>
                    </td>
                    <td class="px-[18px] py-2.5 text-[12px] font-semibold" style="color:#1A4A4A;">31.8</td>
                    <td class="px-[18px] py-2.5 text-[12px]" style="color:#3A6060;">1,650 kcal</td>
                    <td class="px-[18px] py-2.5"><span class="text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#FDECEA;color:#A32D2D;">High</span></td>
                    <td class="px-[18px] py-2.5 text-[11px]" style="color:#5A8080;">Renal disease</td>
                    <td class="px-[18px] py-2.5"><button class="px-2.5 py-1 rounded-[7px] border text-[11px] font-semibold cursor-pointer" style="border-color:#C5E4E4;color:#3D8C8C;background:#F8FDFD;">Chart</button></td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>

          <!-- Upcoming + Tasks sidebar -->
          <div class="flex flex-col gap-3.5">

            <!-- Upcoming Consultations -->
            <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
              <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
                <p class="text-[13px] font-bold" style="color: #1A4A4A;">Upcoming consultations</p>
                <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">See all ↗</p>
              </div>

              <div class="flex items-center gap-2.5 px-[18px] py-2.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                <div class="w-[34px] h-[34px] rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background:#EBF7F7;">
                  <p class="text-[13px] font-bold leading-none" style="color:#3D8C8C;">15</p>
                  <p class="text-[9px] font-semibold uppercase tracking-wider" style="color:#7AABA8;">Mar</p>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-bold" style="color:#1A4A4A;">Maria Santos</p>
                  <p class="text-[10px]" style="color:#9ABABA;">10:00 AM · Follow-up</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap" style="background:#5AA7A7;color:#fff;">Today</span>
              </div>

              <div class="flex items-center gap-2.5 px-[18px] py-2.5">
                <div class="w-[34px] h-[34px] rounded-[9px] flex flex-col items-center justify-center flex-shrink-0" style="background:#EBF7F7;">
                  <p class="text-[13px] font-bold leading-none" style="color:#3D8C8C;">17</p>
                  <p class="text-[9px] font-semibold uppercase tracking-wider" style="color:#7AABA8;">Mar</p>
                </div>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-bold" style="color:#1A4A4A;">Luz Villanueva</p>
                  <p class="text-[10px]" style="color:#9ABABA;">9:30 AM · Lab review</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap" style="background:#EBF7F7;color:#3D8C8C;">Upcoming</span>
              </div>
            </div>

            <!-- Pending Tasks -->
            <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
              <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
                <p class="text-[13px] font-bold" style="color: #1A4A4A;">Pending tasks</p>
                <p class="text-[11px] font-semibold" style="color: #5AA7A7;">8 total</p>
              </div>

              <div class="flex items-start gap-2.5 px-[18px] py-2.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style="background:#A32D2D;display:inline-block;"></span>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-semibold" style="color:#1A4A4A;">Complete NCP — Luz Villanueva</p>
                  <p class="text-[10px]" style="color:#9ABABA;">Due today · Renal disease</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap" style="background:#FDECEA;color:#A32D2D;">Urgent</span>
              </div>

              <div class="flex items-start gap-2.5 px-[18px] py-2.5">
                <span class="w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1" style="background:#A07800;display:inline-block;"></span>
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-semibold" style="color:#1A4A4A;">Update meal plan — Maria Santos</p>
                  <p class="text-[10px]" style="color:#9ABABA;">Due Mar 18 · Diabetes T2</p>
                </div>
                <span class="text-[10px] px-2 py-0.5 rounded-full font-bold whitespace-nowrap" style="background:#FFF5CC;color:#A07800;">Routine</span>
              </div>

            </div>
          </div>
        </div>

        <!-- Row 2: NCP + Chart + Meal Plan -->
        <div class="grid gap-3.5 mb-3.5" style="grid-template-columns: 1fr 1fr 1fr;">

          <!-- NCP Workflow -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">NCP — Maria Santos</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">Open full ↗</p>
            </div>
            <div class="flex flex-col gap-2 p-[18px]">

              <div class="rounded-[9px] p-2.5" style="border:1.5px solid #5AA7A7;background:#F0FAFA;">
                <div class="flex items-center justify-between mb-1">
                  <p class="text-[11px] font-bold" style="color:#3D8C8C;">Assessment</p>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style="background:#DFFAF0;color:#1A7A58;">Done</span>
                </div>
                <p class="text-[10px]" style="color:#5A8080;">Anthropometric, biochemical, dietary & clinical data</p>
              </div>

              <div class="rounded-[9px] p-2.5" style="border:1.5px solid #5AA7A7;background:#F0FAFA;">
                <div class="flex items-center justify-between mb-1">
                  <p class="text-[11px] font-bold" style="color:#3D8C8C;">Diagnosis</p>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style="background:#DFFAF0;color:#1A7A58;">Done</span>
                </div>
                <p class="text-[10px]" style="color:#5A8080;">Excessive CHO intake r/t T2 Diabetes · HbA1c 6.1%</p>
              </div>

              <div class="rounded-[9px] p-2.5" style="border:1.5px solid #5AA7A7;background:#F0FAFA;">
                <div class="flex items-center justify-between mb-1">
                  <p class="text-[11px] font-bold" style="color:#3D8C8C;">Intervention</p>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style="background:#FFF5CC;color:#A07800;">In progress</span>
                </div>
                <p class="text-[10px]" style="color:#5A8080;">Low-GI diet · 1,800 kcal/day · 45% CHO</p>
              </div>

              <div class="rounded-[9px] p-2.5" style="border:1px solid #C5E4E4;background:#FAFEFE;">
                <div class="flex items-center justify-between mb-1">
                  <p class="text-[11px] font-bold" style="color:#9ABABA;">Monitoring & Evaluation</p>
                  <span class="text-[10px] px-1.5 py-0.5 rounded-full font-bold" style="background:#F0F0F0;color:#888;">Pending</span>
                </div>
                <p class="text-[10px]" style="color:#9ABABA;">Follow-up weight, HbA1c — Mar 19</p>
              </div>

            </div>
          </div>

          <!-- Patient Chart -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Patient chart — Maria Santos</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">Edit ↗</p>
            </div>
            <div class="p-[18px]">
              <p class="text-[10px] font-bold uppercase tracking-wider mb-2" style="color:#9ABABA;">Anthropometric & computed values</p>
              <div class="grid grid-cols-3 gap-1.5 mb-3">
                <div class="rounded-lg p-2 text-center" style="background:#F0FAFA;"><p class="text-[10px] mb-0.5" style="color:#7AABA8;">Height</p><p class="text-[13px] font-bold" style="color:#1A4A4A;">158 cm</p></div>
                <div class="rounded-lg p-2 text-center" style="background:#F0FAFA;"><p class="text-[10px] mb-0.5" style="color:#7AABA8;">Weight</p><p class="text-[13px] font-bold" style="color:#1A4A4A;">64.2 kg</p></div>
                <div class="rounded-lg p-2 text-center" style="background:#F0FAFA;"><p class="text-[10px] mb-0.5" style="color:#7AABA8;">BMI</p><p class="text-[13px] font-bold" style="color:#1A7A58;">23.4</p></div>
                <div class="rounded-lg p-2 text-center" style="background:#F0FAFA;"><p class="text-[10px] mb-0.5" style="color:#7AABA8;">BMR</p><p class="text-[13px] font-bold" style="color:#1A4A4A;">1,432</p></div>
                <div class="rounded-lg p-2 text-center" style="background:#F0FAFA;"><p class="text-[10px] mb-0.5" style="color:#7AABA8;">TDEE</p><p class="text-[13px] font-bold" style="color:#1A4A4A;">1,979</p></div>
                <div class="rounded-lg p-2 text-center" style="background:#DFFAF0;"><p class="text-[10px] mb-0.5" style="color:#1A7A58;">Risk</p><p class="text-[13px] font-bold" style="color:#1A7A58;">Low</p></div>
              </div>
              <p class="text-[10px] font-bold uppercase tracking-wider mb-2" style="color:#9ABABA;">Laboratory data</p>
              <div class="flex flex-col gap-1">
                <div class="flex justify-between text-[11px] px-2 py-1 rounded-md" style="background:#F8FDFD;"><span style="color:#5A8080;">Blood glucose</span><span class="font-bold" style="color:#1A7A58;">98 mg/dL ✓</span></div>
                <div class="flex justify-between text-[11px] px-2 py-1 rounded-md" style="background:#F8FDFD;"><span style="color:#5A8080;">HbA1c</span><span class="font-bold" style="color:#1A7A58;">6.1% ✓</span></div>
                <div class="flex justify-between text-[11px] px-2 py-1 rounded-md" style="background:#F8FDFD;"><span style="color:#5A8080;">Cholesterol</span><span class="font-bold" style="color:#1A7A58;">182 mg/dL ✓</span></div>
              </div>
            </div>
          </div>

          <!-- Meal Plan -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Meal plan — Diabetes T2</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">Generate new ↗</p>
            </div>
            <div class="p-[18px]">
              <div class="flex gap-1.5 flex-wrap mb-3">
                <span class="text-[10px] px-2 py-1 rounded-full font-bold" style="background:#5AA7A7;color:#fff;">Diabetes T2</span>
                <span class="text-[10px] px-2 py-1 rounded-full font-bold" style="background:#EBF7F7;color:#3D8C8C;">Low-GI</span>
                <span class="text-[10px] px-2 py-1 rounded-full font-bold" style="background:#EBF7F7;color:#3D8C8C;">PH foods</span>
              </div>
              <p class="text-[10px] font-bold uppercase tracking-wider mb-2" style="color:#9ABABA;">Target · 1,800 kcal/day</p>
              <div class="flex flex-col gap-1.5 mb-3">
                <div>
                  <div class="flex justify-between text-[11px] mb-1"><span class="font-semibold" style="color:#3A6060;">Carbohydrates</span><span class="font-bold" style="color:#1A4A4A;">45% · 203g</span></div>
                  <div class="h-[5px] rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:45%;background:#5AA7A7;"></div></div>
                </div>
                <div>
                  <div class="flex justify-between text-[11px] mb-1"><span class="font-semibold" style="color:#3A6060;">Protein</span><span class="font-bold" style="color:#1A4A4A;">25% · 113g</span></div>
                  <div class="h-[5px] rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:25%;background:#3D8C8C;"></div></div>
                </div>
                <div>
                  <div class="flex justify-between text-[11px] mb-1"><span class="font-semibold" style="color:#3A6060;">Fat</span><span class="font-bold" style="color:#1A4A4A;">30% · 60g</span></div>
                  <div class="h-[5px] rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:30%;background:#8BC4C4;"></div></div>
                </div>
              </div>
              <p class="text-[10px] font-bold uppercase tracking-wider mb-2" style="color:#9ABABA;">Today's meals</p>
              <div class="flex flex-col gap-1">
                <div class="flex justify-between text-[11px] px-2 py-1 rounded-md" style="background:#F8FDFD;"><span class="font-semibold" style="color:#3A6060;">Breakfast</span><span style="color:#5A8080;">Oatmeal + egg + papaya</span></div>
                <div class="flex justify-between text-[11px] px-2 py-1 rounded-md" style="background:#F8FDFD;"><span class="font-semibold" style="color:#3A6060;">Lunch</span><span style="color:#5A8080;">Brown rice + tilapia + kangkong</span></div>
                <div class="flex justify-between text-[11px] px-2 py-1 rounded-md" style="background:#F8FDFD;"><span class="font-semibold" style="color:#3A6060;">Dinner</span><span style="color:#5A8080;">Monggo soup + chicken</span></div>
              </div>
            </div>
          </div>

        </div>

        <!-- Row 3: Progress + Performance -->
        <div class="grid gap-3.5" style="grid-template-columns: 1.5fr 1fr;">

          <!-- Progress + Summaries -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="flex items-center justify-between px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">Patient progress — Maria Santos</p>
              <p class="text-[11px] font-semibold cursor-pointer" style="color: #5AA7A7;">Full report ↗</p>
            </div>
            <div class="p-4">
              <div class="flex gap-4 mb-2.5">
                <div class="flex items-center gap-1.5 text-[11px] font-semibold" style="color:#7AABA8;"><span class="w-2 h-2 rounded-sm inline-block" style="background:#5AA7A7;"></span>Weight (kg)</div>
                <div class="flex items-center gap-1.5 text-[11px] font-semibold" style="color:#7AABA8;"><span class="w-2 h-2 rounded-sm inline-block" style="background:#C5E4E4;"></span>Target</div>
              </div>
              <div class="relative w-full" style="height: 140px;">
                <canvas id="progressChart"></canvas>
              </div>
            </div>
            <div class="border-t px-[18px] py-3" style="border-color:rgba(90,168,168,0.12);">
              <p class="text-[10px] font-bold uppercase tracking-wider mb-2" style="color:#9ABABA;">Consultation summaries</p>
              <div class="flex items-center gap-2.5 p-2.5 rounded-[9px] border" style="background:#F8FDFD;border-color:#E8F4F4;">
                <div class="flex-1 min-w-0">
                  <p class="text-[12px] font-bold" style="color:#1A4A4A;">Mar 15 — Follow-up</p>
                  <p class="text-[10px] mt-0.5" style="color:#5A8080;">Weight -0.4 kg · HbA1c improving · Meal plan adjusted</p>
                </div>
                <button class="px-2.5 py-1 rounded-[7px] border-none text-[10px] font-bold cursor-pointer" style="background:#5AA7A7;color:#fff;">↓ PDF</button>
              </div>
            </div>
          </div>

          <!-- My Performance -->
          <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="px-[18px] py-3.5 border-b" style="border-color: rgba(90,168,168,0.12);">
              <p class="text-[13px] font-bold" style="color: #1A4A4A;">My performance</p>
            </div>
            <div class="flex flex-col gap-3 p-[18px]">

              <div>
                <div class="flex justify-between items-baseline mb-1">
                  <p class="text-[12px] font-semibold" style="color:#3A6060;">Patient satisfaction</p>
                  <p class="text-[13px] font-bold" style="color:#1A4A4A;">4.9 / 5.0</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:98%;background:#5AA7A7;"></div></div>
              </div>

              <div>
                <div class="flex justify-between items-baseline mb-1">
                  <p class="text-[12px] font-semibold" style="color:#3A6060;">Consultation completion</p>
                  <p class="text-[13px] font-bold" style="color:#1A4A4A;">94%</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:94%;background:#3D8C8C;"></div></div>
              </div>

              <div>
                <div class="flex justify-between items-baseline mb-1">
                  <p class="text-[12px] font-semibold" style="color:#3A6060;">NCP documentation rate</p>
                  <p class="text-[13px] font-bold" style="color:#1A4A4A;">88%</p>
                </div>
                <div class="h-1.5 rounded-full overflow-hidden" style="background:#E8F4F4;"><div class="h-full rounded-full" style="width:88%;background:#8BC4C4;"></div></div>
              </div>

            </div>
            <div class="border-t px-[18px] py-3" style="border-color:rgba(90,168,168,0.12);">
              <p class="text-[10px] font-bold uppercase tracking-wider mb-1.5" style="color:#9ABABA;">Monthly earnings</p>
              <p class="text-[26px] font-bold tracking-tight" style="color:#1A4A4A;letter-spacing:-1px;">₱18,400</p>
              <p class="text-[11px] mt-0.5" style="color:#9ABABA;">52 sessions · <span style="color:#1A7A58;font-weight:600;">+12%</span> vs last month</p>
            </div>
          </div>

        </div>
      </div>
    </div>
</template>
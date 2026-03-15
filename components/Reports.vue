<template id="fleet-reports-component">
  <div class="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">

    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      
      <header class="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-8 shrink-0">
        <div class="flex items-center gap-4">
          <h1 class="text-xl font-bold">Monthly Performance Report</h1>
          <div class="h-6 w-px bg-slate-200"></div>
          <select class="bg-slate-100 border-none text-sm font-medium rounded-lg px-3 py-1.5 focus:ring-2 focus:ring-rose-500">
            <option>March 2026</option>
            <option>February 2026</option>
            <option>January 2026</option>
          </select>
        </div>
        <div class="flex gap-3">
          <button class="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" stroke-width="2"/></svg>
            Export PDF
          </button>
          <button class="bg-rose-600 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-rose-200 hover:bg-rose-700">Generate New Report</button>
        </div>
      </header>

      <main class="flex-1 overflow-y-auto p-8 space-y-8">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <p class="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Total Sales</p>
            <h3 class="text-2xl font-black">₱48,290</h3>
            <p class="text-emerald-500 text-xs font-bold mt-2 flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M5 10l7-7m0 0l7 7m-7-7v18" stroke-width="3"/></svg>
              12% vs last month
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-80 flex flex-col">
            <div class="flex justify-between items-center mb-6">
              <h4 class="font-bold text-slate-800">Fuel Efficiency Trend (km/L)</h4>
              <div class="flex gap-2">
                <span class="h-3 w-3 bg-rose-500 rounded-full"></span>
                <span class="h-3 w-3 bg-slate-200 rounded-full"></span>
              </div>
            </div>
            <div class="flex-1 bg-slate-50 rounded-xl border border-dashed border-slate-300 flex items-center justify-center text-slate-400 text-sm italic">
              Chart Library Integration Area (e.g., Chart.js or D3)
            </div>
          </div>

          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-80 flex flex-col">
            <h4 class="font-bold text-slate-800 mb-6">Cost Distribution by Vehicle Type</h4>
            <div class="flex-1 flex items-center justify-center relative">
              <div class="w-40 h-40 rounded-full border-[16px] border-rose-500 border-l-slate-100 border-b-rose-300"></div>
              <div class="absolute right-0 space-y-2">
                <div class="flex items-center gap-2 text-xs font-bold text-slate-600"><span class="w-3 h-3 bg-rose-500 rounded-sm"></span> Public Buses (65%)</div>
                <div class="flex items-center gap-2 text-xs font-bold text-slate-600"><span class="w-3 h-3 bg-rose-300 rounded-sm"></span> DC Buses (25%)</div>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="p-6 border-b border-slate-100 bg-slate-50/50">
            <h3 class="font-bold text-slate-800">Top Performing Drivers (Davao Region)</h3>
          </div>
          <table class="w-full text-left">
            <thead class="bg-slate-50 text-slate-400 text-[10px] uppercase font-bold tracking-widest">
              <tr>
                <th class="px-6 py-4">Driver Name</th>
                <th class="px-6 py-4">Total Trips</th>
                <th class="px-6 py-4">Safety Score</th>
                <th class="px-6 py-4">Fuel Efficiency</th>
                <th class="px-6 py-4">Rating</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-100 text-sm">
              <tr class="hover:bg-slate-50/50">
                <td class="px-6 py-4 font-bold text-slate-700">Ricardo Dalisay</td>
                <td class="px-6 py-4 text-slate-500">142</td>
                <td class="px-6 py-4"><span class="text-emerald-600 font-bold">98/100</span></td>
                <td class="px-6 py-4">15.4 km/L</td>
                <td class="px-6 py-4 text-amber-500">★★★★★</td>
              </tr>
              <tr class="hover:bg-slate-50/50">
                <td class="px-6 py-4 font-bold text-slate-700">Michael Murcia</td>
                <td class="px-6 py-4 text-slate-500">128</td>
                <td class="px-6 py-4"><span class="text-emerald-600 font-bold">95/100</span></td>
                <td class="px-6 py-4">14.8 km/L</td>
                <td class="px-6 py-4 text-amber-500">★★★★☆</td>
              </tr>
            </tbody>
          </table>
        </div>

      </main>
    </div>
  </div>
</template>
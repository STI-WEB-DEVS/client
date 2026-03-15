<template id="davao-scheduling-component">
  <div class="flex h-screen bg-slate-100 font-sans text-slate-900 overflow-hidden">
    
    <aside class="hidden lg:flex flex-col w-72 bg-white border-r border-slate-200">
      <div class="p-[6.2%] border-b border-slate-100 bg-slate-900 text-white">
        <h2 class="font-bold text-lg flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Davao Scheduler
        </h2>
      </div>

      <div class="p-4 flex-1 overflow-y-auto space-y-6">
        <div>
          <h3 class="text-xs font-bold text-slate-400 uppercase mb-3">Routes</h3>
          <div class="space-y-1">
            <button class="w-full text-left px-3 py-2 rounded-lg bg-blue-50 text-blue-700 font-medium text-sm flex justify-between">
              Talomo District <span class="bg-blue-200 px-1.5 rounded text-[10px]">4</span>
            </button>
            <button class="w-full text-left px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm flex justify-between">
              Buhangin <span class="bg-slate-200 px-1.5 rounded text-[10px]">2</span>
            </button>
            <button class="w-full text-left px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm flex justify-between">
              Poblacion <span class="bg-slate-200 px-1.5 rounded text-[10px]">2</span>
            </button>
            <button class="w-full text-left px-3 py-2 rounded-lg text-slate-600 hover:bg-slate-50 font-medium text-sm flex justify-between">
              Toril <span class="bg-slate-200 px-1.5 rounded text-[10px]">0</span>
            </button>
          </div>
        </div>

        <div>
          <h3 class="text-xs font-bold text-slate-400 uppercase mb-3">Available Drivers</h3>
          <div class="space-y-3">
            <div class="flex items-center gap-3">
              <div class="h-8 w-8 rounded-full bg-emerald-500 border-2 border-white shadow-sm"></div>
              <div class="text-xs">
                <p class="font-bold">Juan Dela Cruz</p>
                <p class="text-slate-400">Status: Idle (Matina)</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

    <div class="flex-1 flex flex-col min-w-0">
      
      <header class="h-16 bg-white border-b flex items-center justify-between px-8">
        <div class="flex items-center gap-4">
          <button class="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M15 19l-7-7 7-7" stroke-width="2"/></svg>
          </button>
          <span class="font-bold text-slate-800">Daily Dispatch Queue</span>
          <button class="p-2 hover:bg-slate-50 rounded-lg text-slate-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M9 5l7 7-7 7" stroke-width="2"/></svg>
          </button>
        </div>
        <div class="flex gap-2">
          <button class="bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-slate-200 hover:bg-slate-800 transition-all">+ Optimize Routes</button>
        </div>
      </header>

      <main class="flex-1 p-6 overflow-hidden flex flex-col">
        
        <div class="flex-1 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
          <div class="overflow-y-auto">
            <table class="w-full text-left border-collapse">
              <thead class="sticky top-0 bg-white z-10 shadow-sm">
                <tr class="text-slate-400 text-[10px] uppercase font-bold tracking-widest border-b">
                  <th class="px-6 py-4">Time Slot</th>
                  <th class="px-6 py-4">Route Name / Destination</th>
                  <th class="px-6 py-4">Vehicle Unit</th>
                  <th class="px-6 py-4">Driver</th>
                  <th class="px-6 py-4">Est. Traffic</th>
                  <th class="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100 text-sm">
                <tr class="hover:bg-blue-50/30">
                  <td class="px-6 py-4 font-mono font-bold text-blue-600">08:30 AM</td>
                  <td class="px-6 py-4 leading-tight">
                    <div class="font-bold text-slate-800">SM Lanang Route</div>
                    <div class="text-xs text-slate-400">Stops: 4 | Buhangin-Cabantian</div>
                  </td>
                  <td class="px-6 py-4 font-medium">L300 #V-09</td>
                  <td class="px-6 py-4">R. Duterte</td>
                  <td class="px-6 py-4">
                    <span class="text-orange-500 font-bold">Moderate</span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button class="text-blue-600 hover:underline font-bold text-xs uppercase tracking-tighter">View Path</button>
                  </td>
                </tr>
                <tr class="hover:bg-blue-50/30">
                  <td class="px-6 py-4 font-mono font-bold text-blue-600">09:15 AM</td>
                  <td class="px-6 py-4 leading-tight">
                    <div class="font-bold text-slate-800">Matina Crossing Express</div>
                    <div class="text-xs text-slate-400">Stops: 2 | MacArthur Highway</div>
                  </td>
                  <td class="px-6 py-4 font-medium">Pickup #P-12</td>
                  <td class="px-6 py-4">M. Murcia</td>
                  <td class="px-6 py-4">
                    <span class="text-emerald-500 font-bold">Clear</span>
                  </td>
                  <td class="px-6 py-4 text-right">
                    <button class="text-blue-600 hover:underline font-bold text-xs uppercase tracking-tighter">View Path</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
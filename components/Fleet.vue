<template>
  <div class="flex h-screen font-sans text-slate-900 overflow-hidden">

    <div class="flex-1 flex flex-col min-w-0">

      <main class="flex-1 overflow-y-auto">
        <div class="mb-8">
          <h1 class="text-3xl font-bold text-slate-900">Fleet Statistics</h1>
          <p class="text-slate-500 mt-1">Summary of operations for the last 24 hours.</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5">
            <div>
              <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Active Units</p>
              <p class="text-2xl font-bold">10 / 14</p>
            </div>
          </div>
          
          <div class="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-5">
            <div>
              <p class="text-sm font-medium text-slate-500 uppercase tracking-wider">Under Maintenance</p>
              <p class="text-2xl font-bold text-amber-600">04</p>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div class="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <h3 class="font-bold text-slate-800">Live Status</h3>
            <button class="text-blue-600 text-sm font-semibold hover:underline">View All</button>
          </div>
          <div class="overflow-x-auto">
            <table class="w-full text-left">
              <thead>
                <tr class="bg-slate-50 text-slate-400 text-[11px] uppercase tracking-widest font-bold">
                  <th class="px-6 py-4">Vehicle Unit</th>
                  <th class="px-6 py-4">Driver Assigned</th>
                  <th class="px-6 py-4">Location</th>
                  <th class="px-6 py-4">Status</th>
                  <th class="px-6 py-4">Action</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-slate-100">
                <tr class="hover:bg-slate-50/80 transition-colors">
                  <td class="px-6 py-4">
                    <div class="font-semibold text-slate-900">Truck #082</div>
                    <div class="text-xs text-slate-400">Plate: ABC-1234</div>
                  </td>
                  <td class="px-6 py-4 text-slate-600">Mateo Ramos</td>
                  <td class="px-6 py-4 text-slate-600">Davao City</td>
                  <td class="px-6 py-4">
                    <span class="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-700">Moving</span>
                  </td>
                  <td class="px-6 py-4">
                    <button class="text-slate-400 hover:text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10 12a2 2 0 100-4 2 2 0 000 4z" /><path fill-rule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clip-rule="evenodd" /></svg></button>
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
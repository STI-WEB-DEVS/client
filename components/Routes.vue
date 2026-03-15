<template>
  <div class="flex h-screen bg-slate-50 font-sans text-slate-900 overflow-hidden">
   
    <div class="flex-1 flex flex-col min-w-0">
      
      <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <h2 class="font-semibold text-slate-700">Active Monitoring: Davao Region</h2>
      </header>

      <main class="flex-1 overflow-y-auto p-6 space-y-6">
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p class="text-slate-400 text-xs font-bold uppercase">In Route</p>
            <p class="text-2xl font-bold">8 / 14</p>
          </div>
          <div class="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
            <p class="text-slate-400 text-xs font-bold uppercase">Traffic Delay</p>
            <p class="text-2xl font-bold text-amber-500">Low</p>
          </div>
        </div>

        <div class="grid grid-cols-1 xl:grid-cols-3 gap-6 h-[600px]">
          
          <div class="xl:col-span-2 bg-slate-200 rounded-2xl border border-slate-300 relative overflow-hidden">
            <div class="absolute inset-0 flex items-center justify-center text-slate-500 font-medium italic">
              Interactive Map Component (GPS Cluster)
            </div>
            <div class="absolute top-4 left-4 flex flex-col gap-2">
              <button class="bg-white p-2 rounded shadow-md hover:bg-slate-50 text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M12 4v16m8-8H4" stroke-width="2" /></svg>
              </button>
              <button class="bg-white p-2 rounded shadow-md hover:bg-slate-50 text-slate-700">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M20 12H4" stroke-width="2" /></svg>
              </button>
            </div>
          </div>

          <div class="bg-white rounded-2xl border border-slate-200 flex flex-col overflow-hidden shadow-sm">
            <div class="p-4 border-b bg-slate-50 flex justify-between items-center">
              <h3 class="font-bold text-sm">Real-time Feed</h3>
              <span class="text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-600 font-bold">8 ROUTES</span>
            </div>
            <div class="flex-1 overflow-y-auto divide-y divide-slate-100">
              
              <div class="p-4 hover:bg-slate-50 transition-colors cursor-pointer">
                <div class="flex justify-between items-start mb-2">
                  <span class="text-sm font-bold">Acacia &rarr; Panacan</span>
                  <span class="text-[10px] font-bold text-blue-600">IN PROGRESS</span>
                </div>
                <div class="w-full bg-slate-100 h-1.5 rounded-full mb-3">
                  <div class="bg-blue-500 h-full rounded-full w-[65%]"></div>
                </div>
                <div class="flex items-center gap-3 text-xs text-slate-500">
                  <span class="flex items-center gap-1"><svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" stroke-width="2"/></svg> Davao City</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  </div>
</template>
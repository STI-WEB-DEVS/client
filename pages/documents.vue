<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 class="text-3xl font-bold text-gray-800">Document Center</h1>
          <p class="text-gray-500 text-sm">Manage permits, licenses, and trip manifests.</p>
        </div>
        <div class="flex gap-2">
          <button class="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-50 transition shadow-sm flex items-center gap-2">
            <span>Filter</span>
          </button>
          <button class="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition shadow-md flex items-center gap-2 font-semibold">
            <span class="text-lg">+</span> Upload Document
          </button>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="p-4 bg-blue-50 text-blue-600 rounded-xl text-2xl">📄</div>
          <div>
            <div class="text-2xl font-bold text-gray-800">24</div>
            <div class="text-xs text-gray-500 uppercase font-bold tracking-wider">Total Files</div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="p-4 bg-orange-50 text-orange-600 rounded-xl text-2xl">⚠️</div>
          <div>
            <div class="text-2xl font-bold text-gray-800">2</div>
            <div class="text-xs text-gray-500 uppercase font-bold tracking-wider">Expiring Soon</div>
          </div>
        </div>
        <div class="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div class="p-4 bg-green-50 text-green-600 rounded-xl text-2xl">✅</div>
          <div>
            <div class="text-2xl font-bold text-gray-800">18</div>
            <div class="text-xs text-gray-500 uppercase font-bold tracking-wider">Verified</div>
          </div>
        </div>
      </div>

      <div class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div class="p-5 border-b border-gray-100 bg-gray-50/50 flex justify-between items-center">
          <h3 class="font-bold text-gray-700">Recent Uploads</h3>
          <span class="text-blue-600 text-sm font-semibold cursor-pointer hover:underline">View All</span>
        </div>
        
        <div class="overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="text-xs font-bold text-gray-400 uppercase tracking-widest border-b border-gray-100">
                <th class="p-5">Name</th>
                <th class="p-5">Type</th>
                <th class="p-5">Expiry Date</th>
                <th class="p-5">Status</th>
                <th class="p-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-50">
              <tr class="hover:bg-blue-50/30 transition group">
                <td class="p-5 flex items-center gap-3">
                  <span class="text-2xl">📁</span>
                  <div>
                    <div class="font-bold text-gray-800 group-hover:text-blue-600 transition">LTFRB_Franchise_2026.pdf</div>
                    <div class="text-xs text-gray-400">4.2 MB • Uploaded by Joshua</div>
                  </div>
                </td>
                <td class="p-5 text-sm text-gray-600 font-medium">Legal Permit</td>
                <td class="p-5 text-sm text-gray-600">Dec 31, 2026</td>
                <td class="p-5">
                  <span class="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">VALID</span>
                </td>
                <td class="p-5 text-right">
                  <button class="text-gray-400 hover:text-blue-600 font-bold text-xl px-2">⋮</button>
                </td>
              </tr>
              <tr class="hover:bg-blue-50/30 transition group">
                <td class="p-5 flex items-center gap-3">
                  <span class="text-2xl">📋</span>
                  <div>
                    <div class="font-bold text-gray-800 group-hover:text-blue-600 transition">Passenger_Manifest_Davao_Butuan.xlsx</div>
                    <div class="text-xs text-gray-400">1.5 MB • Uploaded 2h ago</div>
                  </div>
                </td>
                <td class="p-5 text-sm text-gray-600 font-medium">Trip Log</td>
                <td class="p-5 text-sm text-gray-600">N/A</td>
                <td class="p-5">
                  <span class="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-full">RECENT</span>
                </td>
                <td class="p-5 text-right">
                  <button class="text-gray-400 hover:text-blue-600 font-bold text-xl px-2">⋮</button>
                </td>
              </tr>
              <tr class="hover:bg-blue-50/30 transition group">
                <td class="p-5 flex items-center gap-3">
                  <span class="text-2xl">🪪</span>
                  <div>
                    <div class="font-bold text-gray-800 group-hover:text-blue-600 transition">Driver_License_Galo_J.jpg</div>
                    <div class="text-xs text-gray-400">850 KB • Uploaded 3 days ago</div>
                  </div>
                </td>
                <td class="p-5 text-sm text-gray-600 font-medium">Personnel</td>
                <td class="p-5 text-sm text-red-500 font-bold italic">Apr 15, 2026</td>
                <td class="p-5">
                  <span class="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-bold rounded-full">EXPIRING</span>
                </td>
                <td class="p-5 text-right">
                  <button class="text-gray-400 hover:text-blue-600 font-bold text-xl px-2">⋮</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
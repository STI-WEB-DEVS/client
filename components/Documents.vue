<template>
  <div class="min-h-screen bg-gray-50 p-4 md:p-8 font-sans text-gray-800">
    
    <div class="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 class="text-3xl font-black text-green-950 tracking-tight">Trail Documents</h1>
        <p class="text-gray-500 font-medium">Access permits, safety waivers, and regional maps</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="relative">
          <input type="text" placeholder="Search files..." class="pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 bg-white focus:ring-2 focus:ring-green-500 outline-none w-64 text-sm transition-all" />
          <span class="absolute left-3 top-3 text-gray-400">🔍</span>
        </div>
        <button class="bg-green-700 hover:bg-green-800 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-green-900/20 transition-all flex items-center gap-2">
          <span>📤</span> Upload
        </button>
      </div>
    </div>

    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
      
      <div class="space-y-6">
        <div class="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm">
          <h3 class="text-xs font-black uppercase tracking-widest text-gray-400 mb-4">Storage</h3>
          <div class="mb-4">
            <div class="flex justify-between text-sm font-bold mb-2">
              <span>Used Space</span>
              <span class="text-green-700">1.2 GB / 5 GB</span>
            </div>
            <div class="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <div class="h-full bg-green-600" style="width: 24%"></div>
            </div>
          </div>
          <div class="space-y-2">
            <button v-for="cat in ['All Files', 'Permits', 'Safety Protocols', 'Maps']" :key="cat"
                    class="w-full text-left px-3 py-2 rounded-lg text-sm font-bold text-gray-600 hover:bg-green-50 hover:text-green-700 transition">
              {{ cat }}
            </button>
          </div>
        </div>

        <div class="bg-amber-50 p-6 rounded-3xl border border-amber-100">
          <div class="flex items-center gap-2 text-amber-800 font-bold mb-2">
            <span>⚠️</span>
            <span class="text-sm">Action Required</span>
          </div>
          <p class="text-xs text-amber-700 leading-relaxed">
            3 participant waivers for <strong>Mt. Apo Trek (Mar 15)</strong> are still missing signatures.
          </p>
        </div>
      </div>

      <div class="lg:col-span-3">
        <div class="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="bg-gray-50/50 border-b border-gray-100">
                <th class="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Name</th>
                <th class="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Date Added</th>
                <th class="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Status</th>
                <th class="p-4 text-[10px] font-black uppercase tracking-widest text-gray-400">Size</th>
                <th class="p-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="doc in documents" :key="doc.name" class="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td class="p-4">
                  <div class="flex items-center gap-3">
                    <span class="text-2xl">{{ doc.icon }}</span>
                    <div>
                      <p class="text-sm font-bold text-gray-800">{{ doc.name }}</p>
                      <p class="text-[10px] text-gray-400 font-bold uppercase">{{ doc.category }}</p>
                    </div>
                  </div>
                </td>
                <td class="p-4 text-sm font-medium text-gray-500">{{ doc.date }}</td>
                <td class="p-4">
                  <span :class="getStatusStyles(doc.status)" class="px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider">
                    {{ doc.status }}
                  </span>
                </td>
                <td class="p-4 text-sm font-medium text-gray-400">{{ doc.size }}</td>
                <td class="p-4 text-center">
                  <button class="p-2 text-gray-300 hover:text-green-600 transition">
                    ⋮
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const documents = ref([
  {
    name: 'Apo_Summit_Permit_2026.pdf',
    category: 'Permits',
    date: 'Mar 08, 2026',
    status: 'Approved',
    size: '1.2 MB',
    icon: '📄'
  },
  {
    name: 'Medical_Release_Form_Template.docx',
    category: 'Safety Protocols',
    date: 'Mar 05, 2026',
    status: 'Draft',
    size: '450 KB',
    icon: '📝'
  },
  {
    name: 'Lake_Holon_Topo_Map.png',
    category: 'Maps',
    date: 'Feb 28, 2026',
    status: 'Final',
    size: '8.4 MB',
    icon: '🗺️'
  },
  {
    name: 'Emergency_Contact_List.xlsx',
    category: 'Safety Protocols',
    date: 'Mar 01, 2026',
    status: 'Approved',
    size: '120 KB',
    icon: '📊'
  },
  {
    name: 'Vendor_Agreement_Local_Porters.pdf',
    category: 'Permits',
    date: 'Feb 15, 2026',
    status: 'Pending',
    size: '2.1 MB',
    icon: '📄'
  }
])

const getStatusStyles = (status) => {
  switch (status) {
    case 'Approved':
    case 'Final': return 'bg-green-100 text-green-700'
    case 'Pending': return 'bg-amber-100 text-amber-700'
    case 'Draft': return 'bg-gray-100 text-gray-500'
    default: return 'bg-gray-100 text-gray-800'
  }
}
</script>
<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen">
    <header class="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
      <div>
        <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Furnicraft Documents</h1>
        <p class="text-gray-500 font-medium">Cloud-based storage for all furniture blueprints and receipts.</p>
      </div>
      <div class="flex gap-3">
        <button class="bg-white border-2 border-[#5D4037] text-[#5D4037] px-6 py-2.5 rounded-xl text-sm font-black hover:bg-stone-50 transition-all">SCAN NEW</button>
        <button class="bg-[#5D4037] text-white px-6 py-2.5 rounded-xl text-sm font-black shadow-lg shadow-amber-900/20 active:scale-95 transition-all">UPLOAD FILE</button>
      </div>
    </header>

    <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      <div v-for="doc in documentList" :key="doc.name" class="group bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all">
        <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-6', doc.color]">
          <DocumentTextIcon v-if="doc.ext === 'PDF'" class="w-7 h-7" />
          <PhotoIcon v-else-if="doc.ext === 'PNG'" class="w-7 h-7" />
          <TableCellsIcon v-else class="w-7 h-7" />
        </div>
        
        <h3 class="font-black text-[#2D2424] text-sm leading-tight mb-1 truncate">{{ doc.name }}</h3>
        <p class="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-4">{{ doc.category }} • {{ doc.size }}</p>
        
        <div class="flex items-center justify-between pt-4 border-t border-gray-50">
          <span class="text-[10px] font-black text-amber-600 italic">Added: {{ doc.date }}</span>
          <div class="flex gap-1">
            <button class="p-2 text-gray-400 hover:text-blue-600 transition-colors"><EyeIcon class="w-4 h-4" /></button>
            <button class="p-2 text-gray-400 hover:text-amber-600 transition-colors"><ArrowDownTrayIcon class="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  DocumentTextIcon, PhotoIcon, TableCellsIcon, 
  ArrowDownTrayIcon, EyeIcon 
} from '@heroicons/vue/24/outline'

const documentList = [
  { name: 'Narra_Table_Specs_Final.pdf', ext: 'PDF', category: 'Blueprint', size: '2.4 MB', date: 'Mar 10', color: 'bg-blue-50 text-blue-600' },
  { name: 'Supplier_Wood_Receipt_Q1.pdf', ext: 'PDF', category: 'Finance', size: '1.1 MB', date: 'Mar 08', color: 'bg-emerald-50 text-emerald-600' },
  { name: 'Custom_Bed_Design_v2.png', ext: 'PNG', category: 'Design', size: '8.5 MB', date: 'Mar 05', color: 'bg-purple-50 text-purple-600' },
  { name: 'Staff_Inventory_Roster.xlsx', ext: 'XLSX', category: 'Admin', size: '450 KB', date: 'Mar 02', color: 'bg-amber-50 text-amber-600' },
  { name: 'Ayala_Hotel_Contract.pdf', ext: 'PDF', category: 'Legal', size: '5.2 MB', date: 'Feb 28', color: 'bg-red-50 text-red-600' },
  { name: 'Material_Suppliers_PH.xlsx', ext: 'XLSX', category: 'Contacts', size: '120 KB', date: 'Feb 25', color: 'bg-indigo-50 text-indigo-600' },
]
</script>
<template>
  <div class="p-8 bg-[#FDFCFB] min-h-screen font-sans text-slate-900">
    <header class="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
      <div>
        <h1 class="text-3xl font-black text-[#2D2424] tracking-tight">Furniture Projects</h1>
        <p class="text-gray-500 mt-1">Manage designs, material specifications, and stock availability.</p>
      </div>
      
      <div class="flex items-center gap-3">
        <div class="relative">
          <MagnifyingGlassIcon class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search designs..." 
            class="pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-amber-500 outline-none w-64 transition-all"
          />
        </div>
        <button class="bg-[#5D4037] hover:bg-[#4E342E] text-white px-6 py-3 rounded-xl font-bold transition-all shadow-lg active:scale-95 flex items-center gap-2">
          <PlusIcon class="w-5 h-5" />
          <span>Add New Design</span>
        </button>
      </div>
    </header>

    <div class="flex gap-4 mb-8 overflow-x-auto pb-2">
      <button v-for="cat in categories" :key="cat" 
        :class="['px-5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all', 
        cat === 'All Works' ? 'bg-[#FFB300] text-[#2D2424]' : 'bg-white text-gray-500 border border-gray-200 hover:border-amber-500']">
        {{ cat }}
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <div v-for="project in projects" :key="project.id" 
           class="group bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-xl transition-all duration-300">
        
        <div class="aspect-[4/3] bg-stone-100 relative overflow-hidden flex items-center justify-center">
          <img 
            :src="project.image" 
            :alt="project.name"
            class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div class="absolute inset-0 bg-[#5D4037]/10 group-hover:bg-transparent transition-colors"></div>
          
          <div class="absolute top-4 left-4">
            <span :class="['px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm', 
              project.stock > 0 ? 'bg-white text-emerald-600' : 'bg-red-500 text-white']">
              {{ project.stock > 0 ? 'In Stock' : 'Out of Stock' }}
            </span>
          </div>
        </div>

        <div class="p-6">
          <div class="flex justify-between items-start mb-2">
            <div>
              <p class="text-[10px] font-bold text-amber-600 uppercase tracking-widest">{{ project.category }}</p>
              <h3 class="text-lg font-bold text-[#2D2424] leading-tight">{{ project.name }}</h3>
            </div>
            <p class="text-sm font-black text-[#2D2424]">{{ project.price }}</p>
          </div>
          
          <p class="text-xs text-gray-500 line-clamp-2 mb-4">
            Material: {{ project.material }}
          </p>

          <div class="flex items-center justify-between pt-4 border-t border-gray-50">
            <div class="flex flex-col">
              <span class="text-[9px] font-bold text-gray-400 uppercase leading-none">Quantity</span>
              <span class="text-sm font-bold text-[#2D2424]">{{ project.stock }} units</span>
            </div>
            <div class="flex gap-2">
              <button class="p-2 bg-gray-50 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg transition-all">
                <PencilSquareIcon class="w-5 h-5" />
              </button>
              <button class="p-2 bg-gray-50 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all">
                <TrashIcon class="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  PlusIcon, 
  MagnifyingGlassIcon, 
  PencilSquareIcon, 
  TrashIcon 
} from '@heroicons/vue/24/outline'

const categories = ['All Works', 'Living Room', 'Bedroom', 'Dining', 'Office', 'Custom Orders']

const projects = [
  { 
    id: 1, 
    name: 'Heritage Narra Table', 
    category: 'Dining', 
    price: '₱45,000', 
    stock: 3, 
    material: 'Solid Narra Wood, Glossy Finish',
    image: 'https://www.jahroc.com.au/wp-content/uploads/2014/10/Nara-Dining-Table-2400L-2-deep-etched.jpg'
  },
  { 
    id: 2, 
    name: 'Cloud Comfort Sofa', 
    category: 'Living Room', 
    price: '₱32,500', 
    stock: 5, 
    material: 'Velvet Upholstery, Mahogany Base',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 3, 
    name: 'Executive Oak Desk', 
    category: 'Office', 
    price: '₱18,900', 
    stock: 8, 
    material: 'White Oak, Steel Accents',
    image: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 4, 
    name: 'Luna Bed Frame', 
    category: 'Bedroom', 
    price: '₱24,000', 
    stock: 0, 
    material: 'Pine Wood, Minimalist Design',
    image: 'https://lifeinteriors.com.au/cdn/shop/files/LunaTimberQueenBedFrame.jpg?v=1747361548&width=800'
  },
  { 
    id: 5, 
    name: 'Zen Bookshelf', 
    category: 'Office', 
    price: '₱12,500', 
    stock: 12, 
    material: 'Plywood, Walnut Veneer',
    image: 'https://images.unsplash.com/photo-1594620302200-9a762244a156?q=80&w=500&auto=format&fit=crop'
  },
  { 
    id: 6, 
    name: 'Classic Bistro Chair', 
    category: 'Dining', 
    price: '₱4,200', 
    stock: 24, 
    material: 'Bentwood, Rattan Seat',
    image: 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=500&auto=format&fit=crop'
  },
]
</script>
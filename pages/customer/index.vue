<script setup>
/**
 * Navigation logic and layout configuration
 */
definePageMeta({
  layout: 'customer',
  role: 'customer'
})

const router = useRouter()
const goToShop = () => router.push('/customer/shop')
</script>

<template>
  <div class="bg-white min-h-[80vh] flex items-center">
    <div class="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 w-full">
      
      <!-- Grid Layout: 1 column on mobile, 2 columns on large screens -->
      <div class="grid items-center gap-12 lg:grid-cols-2">
        
        <!-- Left Side: Text and Buttons -->
        <div class="text-left order-2 lg:order-1">
          <p class="text-sm font-bold uppercase tracking-widest text-indigo-600">
            New Arrivals
          </p>
          <h1 class="mt-4 text-4xl font-black tracking-tight text-gray-900 sm:text-6xl">
            Shop quality products <br class="hidden lg:block" /> made for everyday use.
          </h1>
          <p class="mt-6 max-w-lg text-lg text-gray-500 leading-relaxed">
            Browse featured products, discover new items, and enjoy a simple shopping experience.
          </p>
          
          <div class="mt-10 flex flex-wrap gap-4">
            <button 
              @click="goToShop"
              class="rounded-xl bg-indigo-600 px-10 py-4 text-sm font-bold text-white shadow-lg hover:bg-indigo-700 transition-all active:scale-95"
            >
              Shop Now
            </button>
            <button class="rounded-xl border border-gray-200 bg-white px-10 py-4 text-sm font-bold text-gray-700 hover:bg-gray-50 transition-colors shadow-sm">
              View Deals
            </button>
          </div>
        </div>

        <!-- Right Side: The Gray Placeholder Box (Matched to image_5bb0f7.jpg) -->
        <div class="order-1 lg:order-2">
          <div class="rounded-[2.5rem] bg-gray-100 p-6 sm:p-10 shadow-inner ring-1 ring-gray-900/5 lg:h-[550px] flex items-center justify-center">
            <div class="aspect-[4/3] w-full rounded-3xl bg-gray-200 flex items-center justify-center border-2 border-dashed border-gray-300 shadow-sm overflow-hidden h-full">
              <!-- Centered Placeholder Icon -->
              <svg class="h-24 w-24 text-gray-400 opacity-50" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.587-1.587a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>
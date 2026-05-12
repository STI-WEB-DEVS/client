<template>
    <NuxtLayout>
        <div>
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-900">Products</h1>
        <div class="flex gap-2">
          <button v-if="isAdding" @click="isAdding = false" class="px-4 py-2 border rounded-md">Cancel</button>
          <button @click="isAdding = !isAdding" class="bg-green-900 text-white px-4 py-2 rounded-md">
             {{ isAdding ? 'Save Product' : '+ Add Product' }}
          </button>
        </div>
      </div>
  
      <div v-if="isAdding" class="bg-white p-6 rounded-lg shadow border">
         <p>Form content goes here...</p>
      </div>
  
      <div v-else class="bg-white rounded-lg shadow border overflow-hidden">
         <table class="w-full text-left">
           <thead class="bg-gray-50 border-b">
             <tr>
               <th class="p-4">Name</th>
               <th class="p-4">Price</th>
             </tr>
           </thead>
           <tbody>
             <tr>
               <td class="p-4 text-gray-400" colspan="2">No products found.</td>
             </tr>
           </tbody>
         </table>
      </div>
    </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  const isAdding = ref(false)
  </script>
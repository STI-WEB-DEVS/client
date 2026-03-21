<template>
  <NuxtLayout>
    <div class="p-8 bg-gray-50 min-h-screen">
      <div class="mb-10 text-center">
        <h1 class="text-4xl font-extrabold text-blue-900 mb-2">Our Elite Team</h1>
        <p class="text-gray-600">The brilliant minds behind the Next-Gen Bus Ticketing System.</p>
        <div class="mt-4 h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300">
          <div class="h-3 bg-blue-600"></div>
          <div class="p-6 text-center">
            <div class="w-24 h-24 bg-blue-100 rounded-full mx-auto mb-4 flex items-center justify-center text-blue-600 text-3xl font-bold">
              JG
            </div>
            <h3 class="text-xl font-bold text-gray-800">Joshua Galo</h3>
            <p class="text-blue-600 font-medium mb-4">Lead Developer / UI Designer</p>
            <p class="text-gray-500 text-sm italic">"Focuses on creating clean and high-fidelity bus ticketing interfaces."</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300">
          <div class="h-3 bg-green-500"></div>
          <div class="p-6 text-center">
            <div class="w-24 h-24 bg-green-100 rounded-full mx-auto mb-4 flex items-center justify-center text-green-600 text-3xl font-bold">
              TM
            </div>
            <h3 class="text-xl font-bold text-gray-800">Team Member 2</h3>
            <p class="text-green-600 font-medium mb-4">Backend Specialist</p>
            <p class="text-gray-500 text-sm italic">"Ensures that all bus bookings and seat selections are processed instantly."</p>
          </div>
        </div>

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:scale-105 transition-transform duration-300">
          <div class="h-3 bg-purple-500"></div>
          <div class="p-6 text-center">
            <div class="w-24 h-24 bg-purple-100 rounded-full mx-auto mb-4 flex items-center justify-center text-purple-600 text-3xl font-bold">
              TM
            </div>
            <h3 class="text-xl font-bold text-gray-800">Team Member 3</h3>
            <p class="text-purple-600 font-medium mb-4">Quality Assurance</p>
            <p class="text-gray-500 text-sm italic">"Dedicated to testing the system to provide a bug-free experience for commuters."</p>
          </div>
        </div>

      </div>

      <div class="mt-16 bg-blue-900 rounded-2xl p-8 text-white flex flex-wrap justify-around items-center shadow-xl">
        <div class="text-center p-4">
          <div class="text-3xl font-bold">100%</div>
          <div class="text-blue-200 text-sm">Collaboration</div>
        </div>
        <div class="text-center p-4 border-l border-blue-800">
          <div class="text-3xl font-bold">STI Davao</div>
          <div class="text-blue-200 text-sm">Base Campus</div>
        </div>
        <div class="text-center p-4 border-l border-blue-800">
          <div class="text-3xl font-bold">Nuxt 3</div>
          <div class="text-blue-200 text-sm">Tech Stack</div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
// Dito mo pwedeng idagdag ang TeamService.ts logic balang araw.
</script>
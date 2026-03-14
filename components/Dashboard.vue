<template>
  <section class="space-y-8">
    <h2 class="text-4xl font-extrabold text-teal-800 tracking-wide">Dashboard</h2>
    <p class="text-lg text-gray-600 max-w-3xl leading-relaxed">
      Welcome to BusTrack Admin Panel — your overview of the bus system.
    </p>

    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <div class="bg-teal-50 text-teal-700 p-6 rounded-full mb-4 text-5xl">🚐</div>
        <h3 class="text-2xl font-semibold text-teal-700">Private Buses</h3>
      </div>

      <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <div class="bg-teal-50 text-teal-700 p-6 rounded-full mb-4 text-5xl">🚍</div>
        <h3 class="text-2xl font-semibold text-teal-700">Public Buses</h3>
      </div>

      <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <div class="bg-teal-50 text-teal-700 p-6 rounded-full mb-4 text-5xl">🛣️</div>
        <h3 class="text-2xl font-semibold text-teal-700">Bus Routes</h3>
      </div>

      <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <div class="bg-teal-50 text-teal-700 p-6 rounded-full mb-4 text-5xl">📅</div>
        <h3 class="text-2xl font-semibold text-teal-700">Bus Schedules</h3>
      </div>

      <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <div class="bg-teal-50 text-teal-700 p-6 rounded-full mb-4 text-5xl">📍</div>
        <h3 class="text-2xl font-semibold text-teal-700">Bus Tracking</h3>
      </div>

       <div
        class="bg-white rounded-xl shadow-lg p-8 flex flex-col items-center text-center transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer"
      >
        <div class="bg-teal-50 text-teal-700 p-6 rounded-full mb-4 text-5xl">🛑</div>
        <h3 class="text-2xl font-semibold text-teal-700">Bus Stops</h3>
      </div>
    </div>
  </section>
</template>
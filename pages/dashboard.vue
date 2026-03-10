<template>
    <NuxtLayout>
  <div>
    <h1 class="text-2xl font-bold mb-6">Hello Kristine!</h1>

    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="rounded-lg shadow p-6 bg-[#e6e5ce] flex items-center gap-x-4">
        <div class="bg-[#2d4123] text-white p-3 rounded-full text-xl">💰</div>
        <div>
          <p class="text-sm font-medium text-gray-700">Total Commission</p>
          <p class="text-2xl font-bold">₱120,000</p>
          <p class="text-green-600 text-sm font-semibold">+12.5%</p>
        </div>
      </div>

      <div class="rounded-lg shadow p-6 bg-[#e6e5ce] flex items-center gap-x-4">
        <div class="bg-[#2d4123] text-white p-3 rounded-full text-xl">🥾</div>
        <div>
          <p class="text-sm font-medium text-gray-700">Total Hikers</p>
          <p class="text-2xl font-bold">3,245</p>
          <p class="text-green-600 text-sm font-semibold">+8.2%</p>
        </div>
      </div>

      <div class="rounded-lg shadow p-6 bg-[#e6e5ce] flex items-center gap-x-4">
        <div class="bg-[#2d4123] text-white p-3 rounded-full text-xl">🎒</div>
        <div>
          <p class="text-sm font-medium text-gray-700">Packages Bought</p>
          <p class="text-2xl font-bold">1,150</p>
          <p class="text-green-600 text-sm font-semibold">+4.1%</p>
        </div>
      </div>

      <div class="rounded-lg shadow p-6 bg-[#e6e5ce] flex items-center gap-x-4">
        <div class="bg-[#2d4123] text-white p-3 rounded-full text-xl">⏳</div>
        <div>
          <p class="text-sm font-medium text-gray-700">Pending Commissions</p>
          <p class="text-2xl font-bold">₱15,000</p>
          <p class="text-red-600 text-sm font-semibold">-5.5%</p>
        </div>
      </div>
    </div>
  </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
</script>

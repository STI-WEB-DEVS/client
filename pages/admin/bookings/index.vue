<template>
  <div class="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
    <div class="p-6 border-b border-slate-100 flex justify-between items-center">
      <h2 class="text-xl font-bold text-slate-800">Current Reservations</h2>
      <button class="bg-[#0088cc] text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-sky-600 transition-colors">
        + New Booking
      </button>
    </div>
    <table class="w-full text-left">
      <thead class="bg-slate-50 text-slate-500 text-xs uppercase font-semibold">
        <tr>
          <th class="px-6 py-4">Client</th>
          <th class="px-6 py-4">Destination</th>
          <th class="px-6 py-4">Travel Date</th>
          <th class="px-6 py-4">Status</th>
        </tr>
      </thead>
      <tbody class="divide-y divide-slate-100 text-sm text-slate-600">
        <tr v-for="booking in bookings" :key="booking.id" class="hover:bg-slate-50">
          <td class="px-6 py-4 font-medium text-slate-900">{{ booking.client }}</td>
          <td class="px-6 py-4">{{ booking.destination }}</td>
          <td class="px-6 py-4">{{ booking.date }}</td>
          <td class="px-6 py-4">
            <span :class="booking.color" class="px-2 py-1 rounded-full text-[10px] font-bold uppercase">
              {{ booking.status }}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const bookings = [
  { id: 1, client: 'Juan Dela Cruz', destination: 'Siargao, PH', date: 'March 15, 2026', status: 'Confirmed', color: 'bg-green-100 text-green-700' },
  { id: 2, client: 'Sarah Jenkins', destination: 'Tokyo, JP', date: 'April 02, 2026', status: 'Pending', color: 'bg-yellow-100 text-yellow-700' },
  { id: 3, client: 'Michael Chen', destination: 'Bali, ID', date: 'May 10, 2026', status: 'Cancelled', color: 'bg-red-100 text-red-700' }
]
</script>
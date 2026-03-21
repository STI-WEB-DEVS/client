<template>
  <NuxtLayout>
    <div class="p-6 bg-gray-50 min-h-screen">
      <div class="mb-8 border-b pb-4">
        <h1 class="text-4xl text-gray-700 font-light">
          Welcome <span class="text-gray-400 text-2xl">admin</span>
        </h1>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        
        <div class="bg-white shadow-sm border rounded overflow-hidden text-center">
          <div class="p-6">
            <div class="flex justify-center text-red-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
            </div>
            <div class="text-3xl font-bold text-red-500">3</div>
          </div>
          <div class="bg-red-500 text-white py-1 text-sm font-semibold uppercase">Customers</div>
        </div>

        <div class="bg-white shadow-sm border rounded overflow-hidden text-center">
          <div class="p-6">
            <div class="flex justify-center text-orange-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.78 0 2.44.85 2.5 2.1h2.21c-.07-1.72-1.12-3.3-3.21-3.81V3h-3v2.16c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-2.06 0-2.87-.92-2.98-2.1h-2.2c.12 2.19 1.76 3.42 3.68 3.83V21h3v-2.15c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>
            </div>
            <div class="text-3xl font-bold text-orange-400">6</div>
          </div>
          <div class="bg-orange-400 text-white py-1 text-sm font-semibold uppercase">Bookings</div>
        </div>

        <div class="bg-white shadow-sm border rounded overflow-hidden text-center">
          <div class="p-6">
            <div class="flex justify-center text-green-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11z"/></svg>
            </div>
            <div class="text-xl font-bold text-green-500">Fri/Mar/20/2026</div>
          </div>
          <div class="bg-green-500 text-white py-1 text-sm font-semibold uppercase">Date</div>
        </div>

        <div class="bg-white shadow-sm border rounded overflow-hidden text-center">
          <div class="p-6">
            <div class="flex justify-center text-cyan-500 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/></svg>
            </div>
            <div class="text-3xl font-bold text-cyan-500 italic">admin</div>
          </div>
          <div class="bg-cyan-500 text-white py-1 text-sm font-semibold uppercase">Account</div>
        </div>

        <div class="bg-white shadow-sm border rounded overflow-hidden text-center">
          <div class="p-6 text-green-600">
             <div class="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M18 11V7c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h2c0 1.66 1.34 3 3 3s3-1.34 3-3h4c0 1.66 1.34 3 3 3s3-1.34 3-3h2v-5l-3-3zM9 19c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm11 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/></svg>
            </div>
            <div class="text-3xl font-bold">2</div>
          </div>
          <div class="bg-green-600 text-white py-1 text-sm font-semibold uppercase">Buses</div>
        </div>

        <div class="bg-white shadow-sm border rounded overflow-hidden text-center">
          <div class="p-6 text-cyan-600">
             <div class="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M4 18v3h3v-3h10v3h3v-3h1v-9H3v9h1zm14-8h3v3h-3v-3zM3 10h3v3H3v-3zm15 8H6V5h12v13z"/></svg>
            </div>
            <div class="text-3xl font-bold">10</div>
          </div>
          <div class="bg-cyan-600 text-white py-1 text-sm font-semibold uppercase">Seats</div>
        </div>

        <div class="bg-white shadow-sm border rounded overflow-hidden text-center">
          <div class="p-6 text-red-600">
             <div class="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </div>
            <div class="text-3xl font-bold">3</div>
          </div>
          <div class="bg-red-600 text-white py-1 text-sm font-semibold uppercase">Availability</div>
        </div>

        <div class="bg-white shadow-sm border rounded overflow-hidden text-center">
          <div class="p-6 text-orange-400">
             <div class="flex justify-center mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12" fill="currentColor" viewBox="0 0 24 24"><path d="M13 2.05v3.03c3.39.49 6 3.39 6 6.92 0 .9-.18 1.75-.48 2.54l2.6 1.53c.56-1.24.88-2.62.88-4.07 0-5.18-3.95-9.45-9-9.95zM12 19c-3.87 0-7-3.13-7-7 0-3.53 2.61-6.43 6-6.92V2.05c-5.05.5-9 4.76-9 9.95 0 5.52 4.48 10 10 10 1.45 0 2.83-.32 4.07-.88l-1.53-2.6c-.79.3-1.64.48-2.54.48z"/></svg>
            </div>
            <div class="text-3xl font-bold">2</div>
          </div>
          <div class="bg-orange-400 text-white py-1 text-sm font-semibold uppercase">Routes</div>
        </div>

      </div>

      <div class="bg-white shadow-sm border rounded overflow-hidden">
        <div class="bg-white p-4 border-b flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>
          <span class="font-serif italic font-bold">Bookings Due Today</span>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left text-sm border-collapse">
            <thead>
              <tr class="bg-gray-50 border-b">
                <th class="p-3 border-r">ID No.</th>
                <th class="p-3 border-r">FullName</th>
                <th class="p-3 border-r">Phone</th>
                <th class="p-3 border-r">Bus</th>
                <th class="p-3 border-r">Seat</th>
                <th class="p-3 border-r">Date</th>
                <th class="p-3 border-r">DepartureTime</th>
                <th class="p-3 border-r">Amount</th>
                <th class="p-3">DateBooked</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b hover:bg-gray-50">
                <td class="p-3 border-r">101</td>
                <td class="p-3 border-r">Joshua Galo</td>
                <td class="p-3 border-r">09123456789</td>
                <td class="p-3 border-r">Davao Express</td>
                <td class="p-3 border-r">A1</td>
                <td class="p-3 border-r">2026-03-20</td>
                <td class="p-3 border-r">08:00 AM</td>
                <td class="p-3 border-r">₱500</td>
                <td class="p-3 border-r">2026-03-18</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

    </div>
  </NuxtLayout>
</template>
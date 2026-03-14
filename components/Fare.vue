<template>
  <section class="bg-gradient-to-r from-teal-100 via-teal-50 to-white py-16">
    <div class="container mx-auto px-6 md:px-12">
      <h1 class="text-5xl font-extrabold text-teal-800 text-center mb-6">Davao City Bus Fare Structure</h1>
      <p class="text-center text-lg text-gray-600 mb-12">See the fare breakdown for different travel distances. The structure is designed for ease of travel.</p>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12">

        <div class="bg-white shadow-2xl rounded-3xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-3xl">
          <h2 class="text-3xl font-semibold text-teal-700 mb-6 border-b-4 border-teal-500 pb-2">Regular Fare (Per Seat)</h2>
          <table class="table-auto w-full text-left border-collapse">
            <thead>
              <tr class="text-teal-700">
                <th class="py-3 px-4 font-semibold text-lg">Distance</th>
                <th class="py-3 px-4 font-semibold text-lg">Fare</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">0-5 km</td>
                <td class="py-3 px-4">₱13.00</td>
              </tr>
              <tr class="border-b hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">5-10 km</td>
                <td class="py-3 px-4">₱16.00</td>
              </tr>
              <tr class="border-b hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">10-15 km</td>
                <td class="py-3 px-4">₱20.00</td>
              </tr>
              <tr class="border-b hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">15-20 km</td>
                <td class="py-3 px-4">₱25.00</td>
              </tr>
              <tr class="hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">20+ km</td>
                <td class="py-3 px-4">₱30.00</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="bg-white shadow-2xl rounded-3xl p-8 transform transition duration-500 hover:scale-105 hover:shadow-3xl">
          <h2 class="text-3xl font-semibold text-teal-700 mb-6 border-b-4 border-teal-500 pb-2">Discounted Fare (For Students, Senior Citizens, and PWDs)</h2>
          <table class="table-auto w-full text-left border-collapse">
            <thead>
              <tr class="text-teal-700">
                <th class="py-3 px-4 font-semibold text-lg">Distance</th>
                <th class="py-3 px-4 font-semibold text-lg">Fare</th>
              </tr>
            </thead>
            <tbody>
              <tr class="border-b hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">0-5 km</td>
                <td class="py-3 px-4">₱10.40</td>
              </tr>
              <tr class="border-b hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">5-10 km</td>
                <td class="py-3 px-4">₱12.80</td>
              </tr>
              <tr class="border-b hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">10-15 km</td>
                <td class="py-3 px-4">₱16.00</td>
              </tr>
              <tr class="border-b hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">15-20 km</td>
                <td class="py-3 px-4">₱20.00</td>
              </tr>
              <tr class="hover:bg-teal-50 transition duration-300">
                <td class="py-3 px-4">20+ km</td>
                <td class="py-3 px-4">₱24.00</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>

      <div class="mt-16 text-center text-lg text-gray-600">
        <p class="mb-4">The regular fare applies to all passengers without discounts. The discounted fare is available for:</p>
        <ul class="list-disc text-left mx-auto mt-4 max-w-lg">
          <li class="mb-2">Students (with valid student ID)</li>
          <li class="mb-2">Senior Citizens (with valid Senior Citizen ID)</li>
          <li class="mb-2">Persons with Disabilities (PWD) (with valid PWD ID)</li>
        </ul>
      </div>
    </div>
  </section>
</template>
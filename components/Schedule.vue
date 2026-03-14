<template>
  <section class="bg-gray-50 py-12">
    <div class="container mx-auto px-4">
      <h1 class="text-4xl font-extrabold text-teal-800 text-center mb-12">Bus Schedule</h1>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">

        <div class="bg-teal-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-teal-800">Love Bus</h2>
          </div>
          <div class="space-y-4">
            <div class="text-teal-600 font-semibold">AM Route</div>
            <div class="text-gray-600">6:00 AM - 9:00 AM</div>
            <div class="text-teal-600 font-semibold">PM Route</div>
            <div class="text-gray-600">4:00 PM - 9:00 PM</div>
          </div>
        </div>

        <div class="bg-indigo-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-indigo-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-indigo-800">OVP Bus</h2>
          </div>
          <div class="space-y-4">
            <div class="text-indigo-600 font-semibold">AM Route</div>
            <div class="text-gray-600">6:00 AM - 10:00 AM</div>
            <div class="text-indigo-600 font-semibold">PM Route</div>
            <div class="text-gray-600">4:00 PM - 9:00 PM</div>
          </div>
        </div>

        <div class="bg-yellow-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-yellow-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-yellow-800">DC Bus</h2>
          </div>
          <div class="space-y-4">
            <div class="text-yellow-600 font-semibold">AM Route</div>
            <div class="text-gray-600">6:00 AM - 10:00 AM</div>
            <div class="text-yellow-600 font-semibold">PM Route</div>
            <div class="text-gray-600">4:00 PM - 9:00 PM</div>
          </div>
        </div>

        <div class="bg-green-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-green-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-green-800">Yellow Bus Line, Inc.</h2>
          </div>
          <div class="space-y-4">
            <div class="text-green-600 font-semibold">8:00 AM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-green-600 font-semibold">3:00 PM</div>
            <div class="text-gray-600">Non-Aircon</div>
            <div class="text-green-600 font-semibold">8:00 PM</div>
            <div class="text-gray-600">Aircon</div>
          </div>
        </div>

        <div class="bg-pink-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-pink-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-pink-800">Davao Acf Bus Lines Inc.</h2>
          </div>
          <div class="space-y-4">
            <div class="text-pink-600 font-semibold">9:00 AM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-pink-600 font-semibold">5:00 PM</div>
            <div class="text-gray-600">Non-Aircon</div>
            <div class="text-pink-600 font-semibold">10:00 PM</div>
            <div class="text-gray-600">Aircon</div>
          </div>
        </div>

        <div class="bg-teal-300 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-teal-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-teal-800">Bachelor Express Inc.</h2>
          </div>
          <div class="space-y-4">
            <div class="text-teal-600 font-semibold">6:00 AM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-teal-600 font-semibold">12:00 PM</div>
            <div class="text-gray-600">Non-Aircon</div>
            <div class="text-teal-600 font-semibold">7:00 PM</div>
            <div class="text-gray-600">Aircon</div>
          </div>
        </div>

        <div class="bg-red-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-red-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-red-800">Philtranco Service Enterprises, Inc.</h2>
          </div>
          <div class="space-y-4">
            <div class="text-red-600 font-semibold">7:00 AM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-red-600 font-semibold">10:00 AM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-red-600 font-semibold">5:00 PM</div>
            <div class="text-gray-600">Non-Aircon</div>
          </div>
        </div>

        <div class="bg-orange-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-orange-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-orange-800">Mindanao Star Bus Transport</h2>
          </div>
          <div class="space-y-4">
            <div class="text-orange-600 font-semibold">10:00 AM</div>
            <div class="text-gray-600">Non-Aircon</div>
            <div class="text-orange-600 font-semibold">1:00 PM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-orange-600 font-semibold">9:00 PM</div>
            <div class="text-gray-600">Aircon</div>
          </div>
        </div>

        <div class="bg-blue-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-blue-800">Ceres Tours</h2>
          </div>
          <div class="space-y-4">
            <div class="text-blue-600 font-semibold">4:00 AM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-blue-600 font-semibold">9:00 AM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-blue-600 font-semibold">2:00 PM</div>
            <div class="text-gray-600">Non-Aircon</div>
          </div>
        </div>

        <div class="bg-gray-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-gray-800">Davao Metro Shuttle</h2>
          </div>
          <div class="space-y-4">
            <div class="text-gray-600 font-semibold">6:00 AM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-gray-600 font-semibold">11:00 AM</div>
            <div class="text-gray-600">Non-Aircon</div>
            <div class="text-gray-600 font-semibold">3:00 PM</div>
            <div class="text-gray-600">Aircon</div>
          </div>
        </div>

        <div class="bg-purple-200 shadow-lg hover:shadow-2xl rounded-lg p-6 transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-2xl relative overflow-hidden">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 rounded-full bg-purple-800 flex items-center justify-center mr-4">
              <i class="fas fa-bus text-white text-xl"></i>
            </div>
            <h2 class="text-2xl font-semibold text-purple-800">Southern Star</h2>
          </div>
          <div class="space-y-4">
            <div class="text-purple-600 font-semibold">10:00 AM</div>
            <div class="text-gray-600">Non-Aircon</div>
            <div class="text-purple-600 font-semibold">4:00 PM</div>
            <div class="text-gray-600">Aircon</div>
            <div class="text-purple-600 font-semibold">9:00 PM</div>
            <div class="text-gray-600">Aircon</div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>


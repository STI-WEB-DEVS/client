<template>
  <section class="space-y-8 px-4 md:px-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
      <h2 class="text-4xl font-extrabold text-teal-800 flex items-center space-x-3">
        <span class="text-4xl">🛣️</span>
        <span>Bus Routes</span>
      </h2>

      <div class="flex space-x-4">
        <button
          @click="selectedType='Public'"
          :class="selectedType==='Public' ? activeBtn : normalBtn"
          class="px-6 py-2 rounded-full font-semibold transition-all duration-300"
        >
          Public Routes
        </button>

        <button
          @click="selectedType='Private'"
          :class="selectedType==='Private' ? activeBtn : normalBtn"
          class="px-6 py-2 rounded-full font-semibold transition-all duration-300"
        >
          Private Routes
        </button>
      </div>
    </div>

    <div class="space-y-10">
      <div v-for="company in filteredRoutes" :key="company.name" class="space-y-6">
        <h3 class="text-2xl font-bold text-gray-800">{{ company.name }}</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <div
            v-for="route in company.routes"
            :key="route.title"
            class="bg-white rounded-2xl shadow-md hover:shadow-xl hover:scale-[1.02] transition-all duration-300 p-6"
          >
            <h4 class="text-lg font-bold text-teal-700 mb-4">{{ route.title }}</h4>

            <ol class="space-y-2 text-gray-600 text-sm">
              <li
                v-for="(stop, index) in route.stops"
                :key="stop"
                class="flex items-center space-x-3"
              >
                <span class="w-2.5 h-2.5 rounded-full bg-teal-600"></span> <!-- Dot instead of number -->
                <span>{{ stop }}</span>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const activeBtn = 'bg-teal-700 text-white shadow-lg'
const normalBtn = 'bg-teal-50 text-teal-700 hover:bg-teal-700 hover:text-white'

const selectedType = ref<'Public' | 'Private'>('Public')

const routes = [
  {
    type: 'Public',
    name: 'Love Bus',
    routes: [
      {
        title: 'Route 1',
        stops: [
          'Ateneo Roxas', 'Bajada', 'JP Laurel', 'Lanang', 'Nova Tierra', 'Sasa', 'Panacan', 'Tibungco', 'Bunawan', 'Lasang'
        ]
      },
      {
        title: 'Route 2',
        stops: [
          'UM Matina', 'Sandawa', 'McArthur Hwy', 'Bypass Rd', 'Davao-Bukidnon Rd', 'Mintal'
        ]
      }
    ]
  },
  {
    type: 'Public',
    name: 'OVP Bus',
    routes: [
      {
        title: 'Route 1',
        stops: [
          'Red Cross Roxas', 'Davao Mental Hospital', 'NCCC Mall VP', 'Abreeza Mall', 'JP Laurel Flyover', 'Ladislawa', 'City Gate Buhangin'
        ]
      },
      {
        title: 'Route 2',
        stops: [
          'Red Cross Roxas', 'Davao Mental Hospital', 'NCCC Mall VP', 'Abreeza Mall', 'JP Laurel Flyover', 'Ladislawa', 'Buhangin Gym', 'NHA Buhangin', 'Jollibee Cabantian', 'City Northtown'
        ]
      }
    ]
  },
  {
    type: 'Public',
    name: 'DC Bus',
    routes: [
      {
        title: 'Route 1',
        stops: [
          'Toril District Hall', 'Toril Public Market', 'Sirawan', 'Daliao', 'Bago Aplaya', 'Sasa', 'Panacan', 'Bangoy', 'Red Cross Roxas'
        ]
      },
      {
        title: 'Route 2',
        stops: [
          'Mintal Palengke', 'Mintal Proper', 'Catalunan Grande', 'Catalunan Pequeno', 'Tigatto', 'GSIS Matina', 'Matina Pangi', 'Ecoland', 'Bankerohan', 'CM Recto', 'Uyanguren', 'Bolton Cor Quirino', 'Ponciano', 'Monteverde', 'GE Torres (Sandawa)'
        ]
      },
      {
        title: 'Route 3',
        stops: [
          'Red Cross Roxas', 'C. Bangoy', 'Ponciano', 'Quirino Avenue', 'Bolton Bridge', 'Uyanguren', 'CM Recto', 'Rizal Street', 'Bankerohan', 'Agdao Market', 'Buhangin Proper', 'Panacan Church', 'Panacan Depot'
        ]
      },
      {
        title: 'Route 4',
        stops: [
          'Red Cross Roxas', 'Obrero', 'C. Bangoy', 'Ponciano', 'Quirino Avenue', 'Bolton Bridge', 'Uyanguren', 'CM Recto', 'Rizal Street', 'Bankerohan', 'Buhangin', 'Agdao', 'McArthur Highway', 'Panacan Proper', 'R. Castillo', 'NCCC Panacan'
        ]
      }
    ]
  },
  {
    type: 'Private',
    name: 'Ecoland - Lasang',
    routes: [
      {
        title: 'Main Route',
        stops: [
          'Ecoland Terminal', 'Matina', 'Maa', 'Buhangin', 'Airport', 'Depo', 'Panacan', 'Tibungco', 'Bunawan', 'Lasang'
        ]
      }
    ]
  },
  {
    type: 'Private',
    name: 'Ecoland - Toril',
    routes: [
      {
        title: 'Main Route',
        stops: [
          'Ecoland Terminal', 'Matina Crossing', 'Bangkal', 'Ulas', 'Talomo', 'Puan', 'Toril'
        ]
      }
    ]
  },
  {
    type: 'Private',
    name: 'Ecoland - Calinan',
    routes: [
      {
        title: 'Main Route',
        stops: [
          'Ecoland Terminal', 'Matina Crossing', 'Ulas Crossing', 'Bangkal', 'Mintal', 'Tugbok', 'Calinan'
        ]
      }
    ]
  }
]

const filteredRoutes = computed(() => {
  return routes.filter(r => r.type === selectedType.value)
})
</script>
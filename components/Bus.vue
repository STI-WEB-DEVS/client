<template>
  <section class="space-y-8 px-4 md:px-8">
    <div class="flex flex-col md:flex-row md:justify-between md:items-center space-y-4 md:space-y-0">
      <h2 class="text-4xl font-extrabold text-teal-800 flex items-center space-x-3">
        <span class="text-4xl">🚌</span>
        <span>Buses</span>
      </h2>
      <div class="flex space-x-4">
        <button
          @click="selectedType = 'Public'"
          :class="selectedType === 'Public' ? 'bg-teal-700 text-white shadow-lg' : 'bg-teal-50 text-teal-700'"
          class="px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-teal-700 hover:text-white hover:shadow-lg"
        >
          Public Bus
        </button>
        <button
          @click="selectedType = 'Private'"
          :class="selectedType === 'Private' ? 'bg-teal-700 text-white shadow-lg' : 'bg-teal-50 text-teal-700'"
          class="px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-teal-700 hover:text-white hover:shadow-lg"
        >
          Private Bus
        </button>
        <button
          @click="selectedType = 'All'"
          :class="selectedType === 'All' ? 'bg-teal-700 text-white shadow-lg' : 'bg-teal-50 text-teal-700'"
          class="px-6 py-2 rounded-full font-semibold transition-all duration-300 hover:bg-teal-700 hover:text-white hover:shadow-lg"
        >
          All
        </button>
      </div>
    </div>

    <ul class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
      <li
        v-for="bus in filteredBuses"
        :key="bus.id"
        class="bg-gradient-to-br from-white via-teal-50 to-white rounded-2xl shadow-md hover:shadow-2xl transform hover:scale-105 transition-all duration-300 cursor-pointer p-6 flex flex-col items-center text-center"
      >
        <img
          :src="bus.logo"
          :alt="bus.name"
          class="w-28 h-28 object-cover rounded-full mb-4 shadow-md"
        />
        <h3 class="text-xl font-semibold text-gray-900 mb-1">{{ bus.name }}</h3>
        <p
          :class="bus.type === 'Public' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'"
          class="px-4 py-1 rounded-full text-sm font-semibold mb-2"
        >
          {{ bus.type }} Bus
        </p>
        <p class="text-gray-600 text-sm mb-1">Route: {{ bus.route }}</p>
        <p class="text-gray-500 text-sm">Capacity: {{ bus.capacity }} seats</p>
      </li>
    </ul>
  </section>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Bus {
  id: number
  name: string
  type: 'Public' | 'Private'
  capacity: number
  route: string
  logo: string
}

const buses = ref<Bus[]>([
  {
    id: 1,
    name: 'Love Bus',
    type: 'Public',
    capacity: 71,
    route: 'Route 2',
    logo: 'https://media.assettype.com/sunstar/2025-08-22/zwbudfvs/Untitled-1.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true'
  },
  {
    id: 2,
    name: 'OVP Bus',
    type: 'Public',
    capacity: 66,
    route: 'Route 2',
    logo: 'https://media.assettype.com/sunstar%2F2025-09-02%2Fi585y18i%2FUntitled-1.jpg'
  },
  {
    id: 3,
    name: 'DC Bus',
    type: 'Public',
    capacity: 46,
    route: 'Route 4',
    logo: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/559609749_810267008415977_6272891274133851913_n.jpg?stp=dst-jpg_s590x590_tt6&_nc_cat=107&ccb=1-7&_nc_sid=7b2446&_nc_ohc=V4bktT4SLo0Q7kNvwEk-1fn&_nc_oc=Admx9pBNUvM2r95CBigYlvf1FNw_Urd_smDExwbopUGQg7leM6ul0Xyd09BDco4oMfK16kUxRMlAYaEVoz7-PlG0&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=TSsAWsVz3hAxJsW2rT7ZMg&_nc_ss=8&oh=00_Afy4D_hKxkCuurW2Gi2uarJx32JQWEaT6YnY1bmDDPJBqQ&oe=69BB46AB'
  },
  {
    id: 4,
    name: 'Yellow Bus Line, Inc.',
    type: 'Private',
    capacity: 46,
    route: 'Route 3',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/d/d4/Yellow_Bus_Line_A-50_-_Flickr_-_Dan_Benedict_Banaag.jpg'
  },
  {
    id: 5,
    name: 'Davao Acf Bus Lines Inc.',
    type: 'Private',
    capacity: 56,
    route: 'Route 3',
    logo: 'https://scontent.fdvo2-1.fna.fbcdn.net/v/t39.30808-6/490176037_1238986274895313_7574690755261081193_n.jpg?stp=dst-jpg_s720x720_tt6&_nc_cat=101&ccb=1-7&_nc_sid=dd6889&_nc_ohc=O0k3fo9KTLkQ7kNvwFfkP7K&_nc_oc=AdlFKxxRKQRgmR7EXT8aPvbNezNSc1XvtfWJ8h8rlAun-Xbh2fDj3rBO8ax470WY5GbCiP3NUxjBtalYcXEWCW1J&_nc_zt=23&_nc_ht=scontent.fdvo2-1.fna&_nc_gid=8a2c8_AKRA-En7UVkceAtQ&_nc_ss=8&oh=00_AfwvPoJqwFUKN9GMYPok2mTjG-id9mzeUJk5gticG8TWzA&oe=69BB44B5'
  },
  {
    id: 6,
    name: 'Bachelor Express Inc.',
    type: 'Private',
    capacity: 45,
    route: 'Route 3',
    logo: 'https://img.12go.asia/0/plain/s3://12go-web-static/static/images/operator/28292/class/4578-outside.jpeg'
  },
  {
    id: 7,
    name: 'Philtranco Service Enterprises, Inc.',
    type: 'Private',
    capacity: 55,
    route: 'Route 3',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Philtranco_1925.jpg'
  },
      {
    id: 8,
    name: 'Mindanao Star Bus Transport',
    type: 'Private',
    capacity: 55,
    route: 'Route 3',
    logo: 'https://scontent.fdvo2-2.fna.fbcdn.net/v/t39.30808-6/650053944_122124639909049928_2553329635862985095_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=e06c5d&_nc_ohc=cTt5pu9C77QQ7kNvwGOaObP&_nc_oc=AdmVb1cnigQK20mwbcETZLH3qI1gcWWl-4XakRj7ovKEyK4yLYL3SUyW9yHfuw-_RJ0f6QRtfpbk3sm0AP1Wd-Nd&_nc_zt=23&_nc_ht=scontent.fdvo2-2.fna&_nc_gid=SDaNW1t_LkelC7x9oFYP7w&_nc_ss=8&oh=00_AfyxMS3ciMCoAOWhI4YEeWRg5yPoLOuLt95uNQYAUY9xKQ&oe=69BB27D3'
  },
      {
    id: 9,
    name: 'Ceres Tours',
    type: 'Private',
    capacity: 49,
    route: 'Route 3',
    logo: 'https://live.staticflickr.com/4895/47033202991_dfaf705893_b.jpg'
  },
      {
    id: 10,
    name: 'Davao Metro Shuttle',
    type: 'Private',
    capacity: 44,
    route: 'Route 3',
    logo: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/DMS_ZK6122_Davao-Kidapawan.jpg'
  },
      {
    id: 11,
    name: 'Southern Star',
    type: 'Private',
    capacity: 57,
    route: 'Route 3',
    logo: 'https://live.staticflickr.com/4904/32137952978_402bd24c85_b.jpg'
  },
])

const selectedType = ref<'Public' | 'Private' | 'All'>('All')

const filteredBuses = computed(() => {
  if (selectedType.value === 'All') return buses.value
  return buses.value.filter(bus => bus.type === selectedType.value)
})
</script>
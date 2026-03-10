<template>
    <NuxtLayout name="default">
      <div class="py-8 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex sm:items-center border-b border-gray-200 pb-5 mb-8">
          <div class="sm:flex-auto">
            <h1 class="text-3xl font-bold text-gray-900 tracking-tight">System Team</h1>
            <p class="mt-2 text-sm text-gray-600">
              Authorized personnel managing the Event Ticketing System infrastructure and security.
            </p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button type="button" class="block rounded-md bg-[#0f2573] px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-[#1a3a8a]">
              Invite Member
            </button>
          </div>
        </div>
  
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="member in teamMembers" :key="member.id" 
               class="group relative flex flex-col items-center p-6 bg-white rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-md transition-all duration-300 border-t-4 border-[#0f2573]">
            
            <div class="relative">
              <img class="h-24 w-24 rounded-full border-4 border-gray-50 object-cover shadow-sm group-hover:scale-105 transition-transform" 
                   :src="member.avatar" 
                   :alt="member.name" />
              <span class="absolute bottom-1 right-1 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-white"></span>
            </div>
  
            <div class="mt-4 text-center">
              <h3 class="text-lg font-bold text-gray-900 group-hover:text-[#0f2573] transition-colors">{{ member.name }}</h3>
              <p class="text-xs font-bold text-[#0f2573] bg-blue-50 px-2 py-1 rounded mt-1 uppercase tracking-wider inline-block">
                {{ member.role }}
              </p>
              <p class="mt-3 text-sm text-gray-500 font-medium lowercase">{{ member.email }}</p>
            </div>
  
            <div class="mt-6 flex gap-2 w-full pt-4 border-t border-gray-50">
              <button class="flex-1 text-xs font-semibold py-2 px-3 rounded bg-gray-50 text-gray-600 hover:bg-gray-100">Profile</button>
              <button class="flex-1 text-xs font-semibold py-2 px-3 rounded bg-gray-50 text-[#0f2573] hover:bg-blue-50">Message</button>
            </div>
          </div>
        </div>
      </div>
    </NuxtLayout>
  </template>
  
  <script setup>
  const teamMembers = ref([
    {
      id: 1,
      name: 'Sean Kenneth H. Axalan',
      role: 'System Admin',
      email: 'sean.axalan@ets.com',
      avatar: 'https://ui-avatars.com/api/?name=Sean+Axalan&background=0f2573&color=fff'
    },
    {
      id: 2,
      name: 'Anthony R. Baron',
      role: 'Coordinator',
      email: 'anthony.baron@ets.com',
      avatar: 'https://ui-avatars.com/api/?name=Anthony+Baron&background=0f2573&color=fff'
    },
    {
      id: 3,
      name: 'Vince David E. Canale',
      role: 'Tech Lead',
      email: 'vince.canale@ets.com',
      avatar: 'https://ui-avatars.com/api/?name=Vince+Canale&background=0f2573&color=fff'
    },
    {
      id: 4,
      name: 'Marlo P. Deang',
      role: 'Security',
      email: 'marlo.deang@ets.com',
      avatar: 'https://ui-avatars.com/api/?name=Marlo+Deang&background=0f2573&color=fff'
    }
  ])
  </script>
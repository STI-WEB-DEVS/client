<template>
    <NuxtLayout>
        <div class="max-w-4xl mx-auto space-y-8">
            <div>
            <h1 class="text-2xl font-bold leading-7 text-[#CFFFB3] sm:truncate sm:text-3xl sm:tracking-tight">Your Profile</h1>
            <p class="mt-2 text-sm text-[#ADE25D]">Manage your administrative identity and public details.</p>
            </div>  

            <form class="bg-black/10 ring-1 ring-[#3B7080] rounded-xl shadow-sm">
            <div class="px-4 py-6 sm:p-8">
                <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                
                <div class="col-span-full flex items-center gap-x-8">
                    <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" class="h-24 w-24 flex-none rounded-lg bg-[#3B7080] object-cover ring-1 ring-[#ADE25D]/30" />
                    <div>
                    <button type="button" class="rounded-md bg-black/20 px-3 py-2 text-sm font-semibold text-[#ADE25D] shadow-sm ring-1 ring-inset ring-[#3B7080] hover:bg-[#3B7080]/60 hover:text-[#CFFFB3] transition-colors">Change avatar</button>
                    <p class="mt-2 text-xs leading-5 text-[#ADE25D]/70">JPG, GIF or PNG. 1MB max.</p>
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="first-name" class="block text-sm font-medium leading-6 text-[#CFFFB3]">First name</label>
                    <div class="mt-2">
                    <input type="text" name="first-name" id="first-name" v-model="profile.firstName" class="block w-full rounded-md border-0 bg-black/20 py-1.5 text-[#CFFFB3] shadow-sm ring-1 ring-inset ring-[#3B7080] focus:ring-2 focus:ring-inset focus:ring-[#ADE25D] sm:text-sm sm:leading-6 placeholder:text-[#3B7080]" />
                    </div>
                </div>

                <div class="sm:col-span-3">
                    <label for="last-name" class="block text-sm font-medium leading-6 text-[#CFFFB3]">Last name</label>
                    <div class="mt-2">
                    <input type="text" name="last-name" id="last-name" v-model="profile.lastName" class="block w-full rounded-md border-0 bg-black/20 py-1.5 text-[#CFFFB3] shadow-sm ring-1 ring-inset ring-[#3B7080] focus:ring-2 focus:ring-inset focus:ring-[#ADE25D] sm:text-sm sm:leading-6 placeholder:text-[#3B7080]" />
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="email" class="block text-sm font-medium leading-6 text-[#CFFFB3]">Email address</label>
                    <div class="mt-2">
                    <input id="email" name="email" type="email" v-model="profile.email" class="block w-full rounded-md border-0 bg-black/20 py-1.5 text-[#CFFFB3] shadow-sm ring-1 ring-inset ring-[#3B7080] focus:ring-2 focus:ring-inset focus:ring-[#ADE25D] sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div class="col-span-full">
                    <label for="about" class="block text-sm font-medium leading-6 text-[#CFFFB3]">About / Bio</label>
                    <div class="mt-2">
                    <textarea id="about" name="about" rows="3" v-model="profile.bio" class="block w-full rounded-md border-0 bg-black/20 py-1.5 text-[#CFFFB3] shadow-sm ring-1 ring-inset ring-[#3B7080] focus:ring-2 focus:ring-inset focus:ring-[#ADE25D] sm:text-sm sm:leading-6"></textarea>
                    </div>
                    <p class="mt-3 text-sm leading-6 text-[#ADE25D]/70">Write a few sentences about your role in the platform.</p>
                </div>
                </div>
            </div>
            
            <div class="flex items-center justify-end gap-x-6 border-t border-[#3B7080] px-4 py-4 sm:px-8">
                <button type="button" class="text-sm font-semibold leading-6 text-[#ADE25D] hover:text-[#CFFFB3] transition-colors">Cancel</button>
                <button type="submit" class="rounded-md bg-[#ADE25D] px-6 py-2 text-sm font-semibold text-[#3A5743] shadow-sm hover:bg-[#CFFFB3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ADE25D] transition-colors">Save Changes</button>
            </div>
            </form>
        </div>
    </NuxtLayout>
</template>

<script setup>
import { ref } from 'vue'

const profile = ref({
  firstName: 'Admin',
  lastName: 'User',
  email: 'admin@hikeadmin.com',
  bio: 'Platform administrator managing hiking tours and organizers.'
})
</script>
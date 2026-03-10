<template>
  <div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
    <form @submit.prevent="saveProfile">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">Profile</h2>
          <p class="mt-1 text-sm/6 text-gray-600">This information will be displayed publicly so be careful what you share.</p>

          <div class="mt-10 flex items-center gap-x-6">
            <img :src="profile.avatarUrl" alt="User avatar" class="size-24 rounded-full object-cover ring-1 ring-gray-900/10" />
            <div>
              <button type="button" class="rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">Change avatar</button>
              <p class="mt-2 text-xs text-gray-500">JPG, GIF or PNG. 1MB max.</p>
            </div>
          </div>
        </div>

        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">Personal Information</h2>
          <p class="mt-1 text-sm/6 text-gray-600">Update your personal details and how we can reach you.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            
            <div class="sm:col-span-3">
              <label for="first-name" class="block text-sm/6 font-medium text-gray-900">First name</label>
              <div class="mt-2">
                <input type="text" id="first-name" v-model="profile.firstName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="last-name" class="block text-sm/6 font-medium text-gray-900">Last name</label>
              <div class="mt-2">
                <input type="text" id="last-name" v-model="profile.lastName" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="sm:col-span-4">
              <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
              <div class="mt-2">
                <input type="email" id="email" v-model="profile.email" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="col-span-full">
              <label for="about" class="block text-sm/6 font-medium text-gray-900">About</label>
              <div class="mt-2">
                <textarea id="about" rows="3" v-model="profile.bio" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
              </div>
              <p class="mt-3 text-sm/6 text-gray-600">Write a few sentences about yourself.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center justify-end gap-x-6 pb-6">
        <button type="button" class="text-sm/6 font-semibold text-gray-900">Cancel</button>
        <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Reactive profile data
const profile = ref({
  firstName: 'Tom',
  lastName: 'Cook',
  email: 'TomCook@gmail.com',
  bio: 'Director of Product.',
  avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
});

// Function to handle form submission
const saveProfile = () => {
  // Here is where you would call your API (e.g., UserService.updateProfile(profile.value))
  console.log('Saving profile data:', profile.value);
  alert('Profile saved successfully!');
};
</script>
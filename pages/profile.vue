<template>
  <NuxtLayout>
    <div class="max-w-4xl">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-900">My Profile</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          Manage your personal and professional information
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-center"
        >
          <div class="relative inline-block">
            <div
              class="h-24 w-24 rounded-full bg-teal-600 flex items-center justify-center text-white text-3xl font-bold mx-auto"
            >
              DR
            </div>
            <button
              class="absolute bottom-0 right-0 bg-white rounded-full p-1.5 shadow-md border border-gray-200 hover:bg-gray-50"
            >
              <CameraIcon class="h-4 w-4 text-gray-600" />
            </button>
          </div>
          <h3 class="mt-4 text-lg font-bold text-gray-900">Dr. Diana Reyes</h3>
          <p class="text-teal-600 font-medium text-sm">
            Hospital Administrator
          </p>
          <p class="text-gray-500 text-xs mt-1">HealthTrack Medical Center</p>
          <div class="mt-5 pt-5 border-t border-gray-100 space-y-2.5">
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <EnvelopeIcon class="h-4 w-4 text-gray-400 shrink-0" />
              <span class="truncate">d.reyes@healthtrack.ph</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <PhoneIcon class="h-4 w-4 text-gray-400 shrink-0" />
              <span>+63 917 555 0101</span>
            </div>
            <div class="flex items-center gap-2 text-sm text-gray-600">
              <MapPinIcon class="h-4 w-4 text-gray-400 shrink-0" />
              <span>Quezon City, PH</span>
            </div>
          </div>
          <div
            class="mt-5 pt-5 border-t border-gray-100 grid grid-cols-3 gap-3 text-center"
          >
            <div>
              <p class="text-xl font-bold text-gray-900">12</p>
              <p class="text-xs text-gray-500">Years Exp.</p>
            </div>
            <div>
              <p class="text-xl font-bold text-gray-900">847</p>
              <p class="text-xs text-gray-500">Patients</p>
            </div>
            <div>
              <p class="text-xl font-bold text-gray-900">4.9</p>
              <p class="text-xs text-gray-500">Rating</p>
            </div>
          </div>
        </div>

        <div class="lg:col-span-2 space-y-5">
          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="font-semibold text-gray-900 mb-4">
              Personal Information
            </h3>
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5"
                  >First Name</label
                >
                <input
                  v-model="profile.firstName"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5"
                  >Last Name</label
                >
                <input
                  v-model="profile.lastName"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5"
                  >Email Address</label
                >
                <input
                  v-model="profile.email"
                  type="email"
                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5"
                  >Phone</label
                >
                <input
                  v-model="profile.phone"
                  type="tel"
                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                />
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5"
                  >Specialization</label
                >
                <select
                  v-model="profile.specialization"
                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none bg-white focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                >
                  <option>Hospital Administration</option>
                  <option>Cardiology</option>
                  <option>General Surgery</option>
                  <option>Pediatrics</option>
                </select>
              </div>
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5"
                  >License No.</label
                >
                <input
                  v-model="profile.licenseNo"
                  type="text"
                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                />
              </div>
              <div class="sm:col-span-2">
                <label class="block text-sm font-medium text-gray-700 mb-1.5"
                  >Bio</label
                >
                <textarea
                  v-model="profile.bio"
                  rows="3"
                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400 resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          <div
            class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <h3 class="font-semibold text-gray-900 mb-4">Change Password</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1.5"
                  >Current Password</label
                >
                <input
                  type="password"
                  placeholder="••••••••"
                  class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                />
              </div>
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5"
                    >New Password</label
                  >
                  <input
                    type="password"
                    placeholder="••••••••"
                    class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1.5"
                    >Confirm Password</label
                  >
                  <input
                    type="password"
                    placeholder="••••••••"
                    class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
                  />
                </div>
              </div>
            </div>
          </div>

          <div class="flex items-center gap-3">
            <button
              @click="saved = true"
              class="px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
            >
              Save Changes
            </button>
            <button
              class="px-6 py-2.5 bg-gray-100 text-gray-700 rounded-xl text-sm font-medium hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <p
              v-if="saved"
              class="text-sm text-emerald-600 font-medium flex items-center gap-1"
            >
              <CheckCircleIcon class="h-4 w-4" /> Profile updated!
            </p>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  CameraIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";

const saved = ref(false);
const profile = ref({
  firstName: "Diana",
  lastName: "Reyes",
  email: "d.reyes@healthtrack.ph",
  phone: "+63 917 555 0101",
  specialization: "Hospital Administration",
  licenseNo: "DOH-MD-2013-04821",
  bio: "Hospital Administrator with 12 years of experience in healthcare management, patient safety, and clinical operations.",
});
watch(saved, (val) => {
  if (val) setTimeout(() => (saved.value = false), 3000);
});
</script>

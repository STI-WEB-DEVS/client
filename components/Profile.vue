<script setup>
import { ref, computed } from 'vue'
const profile = ref({
  firstName: 'Maria',
  lastName: 'Santos',
  email: 'maria.santos@email.com',
  phone: '+63 912 345 6789',
  dob: 'April 12, 1990',
  sex: 'Female',
  location: 'Manila, Philippines',
})

const initials = computed(() => {
  return (profile.value.firstName[0] + profile.value.lastName[0]).toUpperCase()
})

const fullName = computed(() => {
  return `${profile.value.firstName} ${profile.value.lastName}`
})

const saveChanges = () => {
  alert('Profile saved!')
}
</script>

<template>
    <div class="min-h-screen" style="background-color: #5AA7A7;">

      <!-- Top Bar -->
      <div class="flex items-center justify-between px-7 py-3.5 border-b border-white/10" style="background-color: #3D8C8C;">
        <div class="flex items-center gap-2.5">
          <div class="w-[34px] h-[34px] bg-white rounded-[9px] flex items-center justify-center">
             <img class="size-15" src="/Resources/nutrimatchlogo.png" alt="" />
          </div>
          <div>
            <p class="text-white font-bold text-[15px] tracking-tight">NutriMatch</p>
            <p class="text-white/50 text-[10px] uppercase tracking-widest">My Profile</p>
          </div>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-white/20" style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85);">
          <span class="w-1.5 h-1.5 rounded-full" style="background: #5ECFA0;"></span>
          Online
        </div>
      </div>

      <!-- Content -->
      <div class="py-9 px-7 mx-auto flex flex-col gap-4" style="max-width: 720px;">

        <!-- Profile Card -->
        <div class="rounded-[13px] border border-white/50 p-6 flex items-center gap-5" style="background: rgba(255,255,255,0.95);">
          <div class="relative flex-shrink-0">
            <div class="w-[72px] h-[72px] rounded-full flex items-center justify-center text-[24px] font-bold text-white" style="background: #5AA7A7;">
              {{ initials }}
            </div>
            <button class="absolute bottom-0 right-0 w-[22px] h-[22px] rounded-full flex items-center justify-center border-2 border-white cursor-pointer" style="background:#3D8C8C;">
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none"><path d="M1 9l1.8-.9L7.8 3.2a1.3 1.3 0 00-1.9-1.8L1 6.5 1 9z" stroke="#fff" stroke-width="1" stroke-linejoin="round"/></svg>
            </button>
          </div>
          <div>
            <p class="text-[18px] font-bold tracking-tight" style="color:#1A4A4A;">{{ fullName }}</p>
            <p class="text-[12px] mt-0.5" style="color:#9ABABA;">{{ profile.email }}</p>
            <span class="inline-block mt-1.5 text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#EBF7F7;color:#3D8C8C;">Active member</span>
          </div>
        </div>

        <!-- Personal Information -->
        <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
          <div class="px-5 py-3.5 border-b" style="border-color:rgba(90,168,168,0.12);">
            <p class="text-[13px] font-bold" style="color:#1A4A4A;">Personal information</p>
            <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Update your personal details</p>
          </div>

          <div class="p-5 flex flex-col gap-3.5">

            <div class="grid grid-cols-2 gap-3">
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider mb-1.5" style="color:#7AABA8;">First name</p>
                <input
                  v-model="profile.firstName"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border text-[13px] outline-none"
                  style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;"
                />
              </div>
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider mb-1.5" style="color:#7AABA8;">Last name</p>
                <input
                  v-model="profile.lastName"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border text-[13px] outline-none"
                  style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;"
                />
              </div>
            </div>

            <div>
              <p class="text-[11px] font-bold uppercase tracking-wider mb-1.5" style="color:#7AABA8;">Email address</p>
              <input
                v-model="profile.email"
                type="email"
                class="w-full px-3 py-2 rounded-lg border text-[13px] outline-none"
                style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;"
              />
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider mb-1.5" style="color:#7AABA8;">Phone number</p>
                <input
                  v-model="profile.phone"
                  type="tel"
                  class="w-full px-3 py-2 rounded-lg border text-[13px] outline-none"
                  style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;"
                />
              </div>
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider mb-1.5" style="color:#7AABA8;">Date of birth</p>
                <input
                  v-model="profile.dob"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border text-[13px] outline-none"
                  style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;"
                />
              </div>
            </div>

            <div class="grid grid-cols-2 gap-3">
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider mb-1.5" style="color:#7AABA8;">Sex</p>
                <select
                  v-model="profile.sex"
                  class="w-full px-3 py-2 rounded-lg border text-[13px] outline-none cursor-pointer"
                  style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Prefer not to say</option>
                </select>
              </div>
              <div>
                <p class="text-[11px] font-bold uppercase tracking-wider mb-1.5" style="color:#7AABA8;">Location</p>
                <input
                  v-model="profile.location"
                  type="text"
                  class="w-full px-3 py-2 rounded-lg border text-[13px] outline-none"
                  style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;"
                />
              </div>
            </div>

          </div>

          <div class="flex items-center gap-2.5 px-5 py-3.5 border-t" style="border-color:rgba(90,168,168,0.1);">
            <button
              class="px-5 py-2 rounded-[9px] text-[13px] font-bold text-white border-none cursor-pointer"
              style="background:#5AA7A7;"
              @click="saveChanges"
            >Save changes</button>
            <button
              class="px-5 py-2 rounded-[9px] text-[13px] font-semibold border cursor-pointer"
              style="color:#5A8080;border-color:#C5E4E4;background:transparent;"
            >Cancel</button>
          </div>
        </div>

      </div>
    </div>
</template>
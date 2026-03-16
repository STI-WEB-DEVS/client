<script setup>
import { ref } from 'vue'

const activeSection = ref('system')

const prefs = ref({
  language: 'English (US)',
  timezone: 'Asia/Manila (PHT, UTC+8)',
  dateFormat: 'MM/DD/YYYY',
  emailNotifs: true,
  inAppNotifs: true,
  consultationReminders: true,
  dataSharing: false,
  twoFactor: false,
})

const passwords = ref({
  current: '',
  newPass: '',
  confirm: '',
})

const sessions = ref([
  { id: 1, device: 'Windows PC — Chrome',  location: 'Manila, PH',  lastActive: 'now',       current: true  },
  { id: 2, device: 'iPhone — Safari',      location: 'Manila, PH',  lastActive: '2 hrs ago', current: false },
  { id: 3, device: 'MacBook — Firefox',    location: 'Cebu, PH',    lastActive: 'yesterday', current: false },
])

const revokeSession = (id) => {
  sessions.value = sessions.value.filter(s => s.id === 1 || s.id !== id)
}

const savePreferences = () => {
  alert('Preferences saved!')
}

const updatePassword = () => {
  if (!passwords.value.current || !passwords.value.newPass || !passwords.value.confirm) {
    alert('Please fill in all password fields.')
    return
  }
  if (passwords.value.newPass !== passwords.value.confirm) {
    alert('New passwords do not match.')
    return
  }
  alert('Password updated!')
  passwords.value = { current: '', newPass: '', confirm: '' }
}
</script>

<template>
    <div class="min-h-screen" style="background-color: #5AA7A7;">

      <!-- Top Bar -->
      <div class="flex items-center justify-between px-7 py-3.5 border-b border-white/10" style="background-color: #3D8C8C;">
        <div class="flex items-center gap-2.5">
          
          <div>
            <p class="text-white font-bold text-[15px] tracking-tight">NutriMatch</p>
            <p class="text-white/50 text-[10px] uppercase tracking-widest">Settings</p>
          </div>
        </div>
        <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border border-white/20" style="background: rgba(255,255,255,0.1); color: rgba(255,255,255,0.85);">
          <span class="w-1.5 h-1.5 rounded-full" style="background: #5ECFA0;"></span>
          System online
        </div>
      </div>

      <!-- Content -->
      <div class="p-7" style="display: grid; grid-template-columns: 220px 1fr; gap: 20px;">

        <!-- Sidebar -->
        <div class="flex flex-col gap-1">
          <p class="text-[10px] font-bold uppercase tracking-widest px-3 mb-1" style="color: rgba(255,255,255,0.45);">Preferences</p>

          <div
            class="flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-[13px] font-semibold cursor-pointer border"
            :style="activeSection === 'system'
              ? 'background:rgba(255,255,255,0.15);color:#fff;border-color:rgba(255,255,255,0.15);'
              : 'color:rgba(255,255,255,0.65);border-color:transparent;'"
            @click="activeSection = 'system'"
          >
            <div class="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0" style="background:rgba(255,255,255,0.1);">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><circle cx="7" cy="7" r="3" stroke="rgba(255,255,255,0.8)" stroke-width="1.3"/><path d="M7 1v1.5M7 11.5V13M1 7h1.5M11.5 7H13" stroke="rgba(255,255,255,0.8)" stroke-width="1.2" stroke-linecap="round"/></svg>
            </div>
            System preferences
          </div>

          <p class="text-[10px] font-bold uppercase tracking-widest px-3 mt-3 mb-1" style="color: rgba(255,255,255,0.45);">Account</p>

          <div
            class="flex items-center gap-2.5 px-3 py-2.5 rounded-[9px] text-[13px] font-semibold cursor-pointer border"
            :style="activeSection === 'security'
              ? 'background:rgba(255,255,255,0.15);color:#fff;border-color:rgba(255,255,255,0.15);'
              : 'color:rgba(255,255,255,0.65);border-color:transparent;'"
            @click="activeSection = 'security'"
          >
            <div class="w-7 h-7 rounded-[7px] flex items-center justify-center flex-shrink-0" style="background:rgba(255,255,255,0.1);">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><rect x="2" y="4.5" width="10" height="7" rx="1.5" stroke="rgba(255,255,255,0.6)" stroke-width="1.3"/><path d="M4.5 4.5V3a2.5 2.5 0 015 0v1.5" stroke="rgba(255,255,255,0.6)" stroke-width="1.3" stroke-linecap="round"/></svg>
            </div>
            Security & password
          </div>
        </div>

        <!-- Main Panels -->
        <div class="flex flex-col gap-4">

          <!-- System Preferences -->
          <div v-if="activeSection === 'system'" class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
            <div class="px-5 py-4 border-b" style="border-color:rgba(90,168,168,0.12);">
              <p class="text-[14px] font-bold" style="color:#1A4A4A;">System preferences</p>
              <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Customize how NutriCare looks and behaves for you</p>
            </div>
            <div class="px-5">

              <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                <div>
                  <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Language</p>
                  <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Select your preferred display language</p>
                </div>
                <select v-model="prefs.language" class="px-3 py-2 rounded-lg border text-[13px] outline-none" style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;width:180px;">
                  <option>English (US)</option>
                  <option>Filipino</option>
                  <option>Spanish</option>
                </select>
              </div>

              <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                <div>
                  <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Timezone</p>
                  <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Used for scheduling and consultation times</p>
                </div>
                <select v-model="prefs.timezone" class="px-3 py-2 rounded-lg border text-[13px] outline-none" style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;width:220px;">
                  <option>Asia/Manila (PHT, UTC+8)</option>
                  <option>UTC</option>
                  <option>America/New_York</option>
                </select>
              </div>

              <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                <div>
                  <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Date format</p>
                  <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Choose how dates are displayed across the platform</p>
                </div>
                <select v-model="prefs.dateFormat" class="px-3 py-2 rounded-lg border text-[13px] outline-none" style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;width:180px;">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>

              <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                <div>
                  <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Email notifications</p>
                  <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Receive email updates for appointments and reminders</p>
                </div>
                <button
                  class="w-10 h-[22px] rounded-full relative border-none cursor-pointer transition-colors"
                  :style="prefs.emailNotifs ? 'background:#5AA7A7;' : 'background:#C5E4E4;'"
                  @click="prefs.emailNotifs = !prefs.emailNotifs"
                >
                  <span class="w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all" :style="prefs.emailNotifs ? 'left:21px;' : 'left:3px;'"></span>
                </button>
              </div>

              <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                <div>
                  <p class="text-[13px] font-semibold" style="color:#1A4A4A;">In-app notifications</p>
                  <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Show alerts and updates inside the platform</p>
                </div>
                <button
                  class="w-10 h-[22px] rounded-full relative border-none cursor-pointer transition-colors"
                  :style="prefs.inAppNotifs ? 'background:#5AA7A7;' : 'background:#C5E4E4;'"
                  @click="prefs.inAppNotifs = !prefs.inAppNotifs"
                >
                  <span class="w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all" :style="prefs.inAppNotifs ? 'left:21px;' : 'left:3px;'"></span>
                </button>
              </div>

              <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                <div>
                  <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Consultation reminders</p>
                  <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Get notified 24 hours before a scheduled consultation</p>
                </div>
                <button
                  class="w-10 h-[22px] rounded-full relative border-none cursor-pointer transition-colors"
                  :style="prefs.consultationReminders ? 'background:#5AA7A7;' : 'background:#C5E4E4;'"
                  @click="prefs.consultationReminders = !prefs.consultationReminders"
                >
                  <span class="w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all" :style="prefs.consultationReminders ? 'left:21px;' : 'left:3px;'"></span>
                </button>
              </div>

              <div class="flex items-center justify-between py-3.5">
                <div>
                  <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Data sharing</p>
                  <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Allow anonymized data to improve platform services</p>
                </div>
                <button
                  class="w-10 h-[22px] rounded-full relative border-none cursor-pointer transition-colors"
                  :style="prefs.dataSharing ? 'background:#5AA7A7;' : 'background:#C5E4E4;'"
                  @click="prefs.dataSharing = !prefs.dataSharing"
                >
                  <span class="w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all" :style="prefs.dataSharing ? 'left:21px;' : 'left:3px;'"></span>
                </button>
              </div>

            </div>
            <div class="flex items-center gap-2.5 px-5 py-3.5 border-t" style="border-color:rgba(90,168,168,0.1);">
              <button class="px-5 py-2 rounded-[9px] text-[13px] font-bold text-white border-none cursor-pointer" style="background:#5AA7A7;" @click="savePreferences">Save preferences</button>
              <button class="px-5 py-2 rounded-[9px] text-[13px] font-semibold border cursor-pointer" style="color:#5A8080;border-color:#C5E4E4;background:transparent;">Cancel</button>
            </div>
          </div>

          <!-- Security & Password -->
          <template v-if="activeSection === 'security'">

            <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
              <div class="px-5 py-4 border-b" style="border-color:rgba(90,168,168,0.12);">
                <p class="text-[14px] font-bold" style="color:#1A4A4A;">Security & password</p>
                <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Manage your account password and two-factor authentication</p>
              </div>
              <div class="px-5">

                <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                  <div>
                    <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Current password</p>
                    <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Required to make any changes</p>
                  </div>
                  <input v-model="passwords.current" type="password" placeholder="Enter current password" class="px-3 py-2 rounded-lg border text-[13px] outline-none" style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;width:220px;" />
                </div>

                <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                  <div>
                    <p class="text-[13px] font-semibold" style="color:#1A4A4A;">New password</p>
                    <p class="text-[11px] mt-0.5" style="color:#9ABABA;">At least 8 characters with a number and symbol</p>
                  </div>
                  <input v-model="passwords.newPass" type="password" placeholder="Enter new password" class="px-3 py-2 rounded-lg border text-[13px] outline-none" style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;width:220px;" />
                </div>

                <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                  <div>
                    <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Confirm new password</p>
                    <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Re-enter your new password to confirm</p>
                  </div>
                  <input v-model="passwords.confirm" type="password" placeholder="Confirm new password" class="px-3 py-2 rounded-lg border text-[13px] outline-none" style="border-color:#C5E4E4;background:#F8FDFD;color:#1A4A4A;font-family:inherit;width:220px;" />
                </div>

                <div class="flex items-center justify-between py-3.5">
                  <div>
                    <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Two-factor authentication</p>
                    <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Add an extra layer of security to your account</p>
                  </div>
                  <button
                    class="w-10 h-[22px] rounded-full relative border-none cursor-pointer transition-colors"
                    :style="prefs.twoFactor ? 'background:#5AA7A7;' : 'background:#C5E4E4;'"
                    @click="prefs.twoFactor = !prefs.twoFactor"
                  >
                    <span class="w-4 h-4 bg-white rounded-full absolute top-[3px] transition-all" :style="prefs.twoFactor ? 'left:21px;' : 'left:3px;'"></span>
                  </button>
                </div>

              </div>
              <div class="flex items-center gap-2.5 px-5 py-3.5 border-t" style="border-color:rgba(90,168,168,0.1);">
                <button class="px-5 py-2 rounded-[9px] text-[13px] font-bold text-white border-none cursor-pointer" style="background:#5AA7A7;" @click="updatePassword">Update password</button>
                <button class="px-5 py-2 rounded-[9px] text-[13px] font-semibold border cursor-pointer" style="color:#5A8080;border-color:#C5E4E4;background:transparent;">Cancel</button>
              </div>
            </div>

            <!-- Active Sessions -->
            <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
              <div class="px-5 py-4 border-b" style="border-color:rgba(90,168,168,0.12);">
                <p class="text-[14px] font-bold" style="color:#1A4A4A;">Active sessions</p>
                <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Devices currently logged into your account</p>
              </div>
              <div class="px-5">
                <div
                  v-for="session in sessions"
                  :key="session.id"
                  class="flex items-center gap-3 py-3 border-b"
                  :class="{ 'border-b-0': session.id === sessions[sessions.length - 1].id }"
                  style="border-color:rgba(90,168,168,0.08);"
                >
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0" style="background:#EBF7F7;">
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><rect x="2" y="3" width="12" height="8" rx="1.5" stroke="#5AA7A7" stroke-width="1.3"/><path d="M5 13h6M8 11v2" stroke="#5AA7A7" stroke-width="1.3" stroke-linecap="round"/></svg>
                  </div>
                  <div class="flex-1 min-w-0">
                    <p class="text-[12px] font-bold" style="color:#1A4A4A;">{{ session.device }}</p>
                    <p class="text-[10px] mt-0.5" style="color:#9ABABA;">{{ session.location }} · Last active {{ session.lastActive }}</p>
                  </div>
                  <span v-if="session.current" class="text-[10px] px-2 py-0.5 rounded-full font-bold" style="background:#DFFAF0;color:#1A7A58;">Current</span>
                  <button v-else class="text-[11px] font-semibold border-none bg-transparent cursor-pointer" style="color:#A32D2D;" @click="revokeSession(session.id)">Revoke</button>
                </div>
              </div>
              <div class="px-5 py-3.5 border-t" style="border-color:rgba(90,168,168,0.1);">
                <button class="px-4 py-2 rounded-lg text-[12px] font-bold cursor-pointer border" style="background:#FDECEA;color:#A32D2D;border-color:#F7C1C1;" @click="sessions = sessions.filter(s => s.current)">Revoke all other sessions</button>
              </div>
            </div>

            <!-- Danger Zone -->
            <div class="rounded-[13px] border border-white/50 overflow-hidden" style="background: rgba(255,255,255,0.95);">
              <div class="px-5 py-4 border-b" style="border-color:rgba(90,168,168,0.12);">
                <p class="text-[14px] font-bold" style="color:#1A4A4A;">Danger zone</p>
                <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Irreversible actions — proceed with caution</p>
              </div>
              <div class="px-5">
                <div class="flex items-center justify-between py-3.5 border-b" style="border-color:rgba(90,168,168,0.08);">
                  <div>
                    <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Deactivate account</p>
                    <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Temporarily disable your account. You can reactivate anytime.</p>
                  </div>
                  <button class="px-4 py-2 rounded-lg text-[12px] font-bold cursor-pointer border" style="background:#FDECEA;color:#A32D2D;border-color:#F7C1C1;">Deactivate</button>
                </div>
                <div class="flex items-center justify-between py-3.5">
                  <div>
                    <p class="text-[13px] font-semibold" style="color:#1A4A4A;">Delete account</p>
                    <p class="text-[11px] mt-0.5" style="color:#9ABABA;">Permanently delete your account and all associated data.</p>
                  </div>
                  <button class="px-4 py-2 rounded-lg text-[12px] font-bold cursor-pointer border" style="background:#FDECEA;color:#A32D2D;border-color:#F7C1C1;">Delete account</button>
                </div>
              </div>
            </div>

          </template>

        </div>
      </div>
    </div>
</template>
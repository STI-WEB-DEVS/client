<template>
  <NuxtLayout>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800">My Profile</h2>
      <p class="text-sm text-slate-500 mt-0.5">View and update your profile information</p>
    </div>

    <!-- Toast notification -->
    <Transition name="toast">
      <div v-if="toast.show" :class="['toast', toast.type === 'success' ? 'toast-success' : 'toast-error']">
        {{ toast.message }}
      </div>
    </Transition>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div class="card flex flex-col items-center text-center py-8">
        <!-- Avatar with upload button -->
        <div class="relative group">
          <div class="profile-avatar overflow-hidden">
            <img v-if="avatarPreview" :src="avatarPreview" alt="Profile" class="w-full h-full object-cover" />
            <span v-else class="text-3xl font-extrabold">{{ userInitial }}</span>
          </div>
          <!-- Camera overlay -->
          <button
            @click="triggerAvatarUpload"
            class="avatar-edit-btn"
            title="Change profile photo"
          >
            📷
          </button>
          <input
            ref="avatarInput"
            type="file"
            accept="image/*"
            class="hidden"
            @change="onAvatarSelected"
          />
        </div>
        <p class="text-xs text-slate-400 mt-2">Click 📷 to change photo</p>

        <h3 class="text-xl font-extrabold text-slate-800 mt-3">{{ user?.name ?? 'Admin' }}</h3>
        <p class="font-semibold text-sm mt-1" style="color:#009E97">Shop Owner · Administrator</p>
        <p class="text-slate-500 text-sm mt-1">{{ user?.email ?? 'admin@satura.com' }}</p>

        <div class="mt-5">
          <span v-if="isPremium" class="plan-pill-premium">👑 Premium Plan</span>
          <span v-else class="plan-pill-basic">🥉 Basic Plan</span>
        </div>
        <p class="text-xs text-slate-400 mt-3">Member since {{ user?.joinedAt ?? '—' }}</p>
      </div>

      <!-- Edit Form -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Personal Info -->
        <div class="card">
          <h3 class="section-title mb-5">Personal Information</h3>
          <form @submit.prevent="saveProfile">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="form-group">
                <label>Full Name</label>
                <input v-model="profileForm.name" type="text" class="form-input" placeholder="Your full name" required />
              </div>
              <div class="form-group">
                <label>Email Address</label>
                <input v-model="profileForm.email" type="email" class="form-input" placeholder="you@example.com" required />
              </div>
              <div class="form-group">
                <label>Phone Number</label>
                <input v-model="profileForm.phone" type="text" class="form-input" placeholder="09XXXXXXXXX" />
              </div>
              <div class="form-group">
                <label>Role</label>
                <input type="text" value="Shop Owner · Administrator" class="form-input" disabled />
              </div>
            </div>
            <div class="mt-4 flex justify-end">
              <button type="submit" class="btn-teal">Save Changes</button>
            </div>
          </form>
        </div>

        <!-- Premium: Shop Branding -->
        <div class="card" :class="{ 'opacity-60': !isPremium }">
          <div class="flex items-center justify-between mb-4">
            <h3 class="section-title">Shop Branding</h3>
            <span v-if="!isPremium" class="pro-lock-badge">🔒 Premium Only</span>
            <span v-else class="pro-active-badge">✓ Active</span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label>Shop Name</label>
              <input v-model="brandingForm.shopName" type="text" class="form-input" :disabled="!isPremium" />
            </div>
            <div class="form-group">
              <label>Tagline</label>
              <input v-model="brandingForm.tagline" type="text" class="form-input" :disabled="!isPremium" />
            </div>
            <div class="form-group sm:col-span-2">
              <label>Accent Color</label>
              <div class="flex gap-2 items-center">
                <input v-model="brandingForm.accentColor" type="color" class="form-color" :disabled="!isPremium" />
                <input v-model="brandingForm.accentColor" type="text" class="form-input" :disabled="!isPremium" />
              </div>
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button class="btn-teal" :disabled="!isPremium" @click="saveBranding">Save Branding</button>
          </div>
          <div v-if="!isPremium" class="mt-4 p-3 rounded-lg upgrade-cta text-center">
            <p class="text-sm font-semibold" style="color:#009E97">Upgrade to Premium to unlock Shop Branding</p>
            <button @click="navigateTo('/settings')" class="btn-teal mt-2 text-xs px-4 py-2">Upgrade Now</button>
          </div>
        </div>

        <!-- Change Password -->
        <div class="card">
          <h3 class="section-title mb-5">Change Password</h3>
          <form @submit.prevent="savePassword">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div class="form-group sm:col-span-2">
                <label>Current Password</label>
                <input v-model="pwdForm.current" type="password" placeholder="Enter current password" class="form-input" required />
              </div>
              <div class="form-group">
                <label>New Password</label>
                <input v-model="pwdForm.newPwd" type="password" placeholder="At least 6 characters" class="form-input" required />
              </div>
              <div class="form-group">
                <label>Confirm New Password</label>
                <input v-model="pwdForm.confirm" type="password" placeholder="Repeat new password" class="form-input" required />
              </div>
            </div>
            <div class="mt-4 flex justify-end gap-3">
              <button type="button" @click="resetPwdForm" class="btn-outline">Cancel</button>
              <button type="submit" class="btn-teal">Update Password</button>
            </div>
          </form>
        </div>

        <!-- Danger Zone -->
        <div class="card" style="border-color:#FECACA">
          <h3 class="text-sm font-bold text-red-600 mb-3">Danger Zone</h3>
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-semibold text-slate-800">Sign out of all sessions</p>
              <p class="text-xs text-slate-500">This will log you out from all active devices.</p>
            </div>
            <button @click="handleSignOut" class="btn-danger">Sign Out</button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
definePageMeta({ middleware: ['auth'] })
const { user, isPremium, signOut, updateProfile, updatePassword, updateAvatar } = useAuth()
const userInitial = computed(() => (user.value?.name?.[0] ?? 'A').toUpperCase())

// ── Avatar ─────────────────────────────────────────────
const avatarInput = ref<HTMLInputElement | null>(null)
const avatarPreview = ref<string>(user.value?.avatar ?? '')

// Keep preview in sync if user logs in/changes
watch(() => user.value?.avatar, (val) => { avatarPreview.value = val ?? '' }, { immediate: true })

function triggerAvatarUpload() {
  avatarInput.value?.click()
}

function onAvatarSelected(e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0]
  if (!file) return
  if (file.size > 2 * 1024 * 1024) {
    showToast('Image too large. Max size is 2 MB.', 'error')
    return
  }
  const reader = new FileReader()
  reader.onload = (ev) => {
    const dataUrl = ev.target?.result as string
    avatarPreview.value = dataUrl
    updateAvatar(dataUrl)
    showToast('Profile photo updated!')
  }
  reader.readAsDataURL(file)
}

// ── Toast ──────────────────────────────────────────────
const toast = reactive({ show: false, message: '', type: 'success' as 'success' | 'error' })
let toastTimer: ReturnType<typeof setTimeout>
function showToast(message: string, type: 'success' | 'error' = 'success') {
  clearTimeout(toastTimer)
  toast.message = message
  toast.type = type
  toast.show = true
  toastTimer = setTimeout(() => { toast.show = false }, 3000)
}

// ── Profile form ───────────────────────────────────────
const profileForm = reactive({
  name:  user.value?.name  ?? '',
  email: user.value?.email ?? '',
  phone: user.value?.phone ?? '',
})

function saveProfile() {
  if (!profileForm.name.trim() || !profileForm.email.trim()) {
    showToast('Name and email are required.', 'error')
    return
  }
  updateProfile(profileForm.name.trim(), profileForm.email.trim(), profileForm.phone.trim())
  showToast('Profile updated successfully!')
}

// ── Password form ──────────────────────────────────────
const pwdForm = reactive({ current: '', newPwd: '', confirm: '' })

function savePassword() {
  if (pwdForm.newPwd !== pwdForm.confirm) {
    showToast('New passwords do not match.', 'error')
    return
  }
  try {
    updatePassword(pwdForm.current, pwdForm.newPwd)
    resetPwdForm()
    showToast('Password updated successfully!')
  } catch (err: any) {
    showToast(err.message, 'error')
  }
}

function resetPwdForm() {
  pwdForm.current = ''
  pwdForm.newPwd  = ''
  pwdForm.confirm = ''
}

// ── Branding form (Premium) ──────────────────────────────────────
const BRANDING_KEY = 'tailortrack_branding'
function loadBranding() {
  if (!import.meta.client) return {}
  try { return JSON.parse(localStorage.getItem(BRANDING_KEY) ?? '{}') } catch { return {} }
}
const savedBranding = loadBranding()
const brandingForm = reactive({
  shopName:    savedBranding.shopName    ?? 'SATURA Tailoring',
  tagline:     savedBranding.tagline     ?? 'Precision. Style. Excellence.',
  accentColor: savedBranding.accentColor ?? '#009E97',
})

function saveBranding() {
  if (!isPremium.value) return
  if (import.meta.client) localStorage.setItem(BRANDING_KEY, JSON.stringify({ ...brandingForm }))
  showToast('Shop branding saved!')
}

// ── Sign out ────────────────────────────────────────────
const handleSignOut = async () => {
  signOut()
  await navigateTo('/')
}
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.section-title { font-size: 1rem; font-weight: 700; color: #0F172A; }

/* Avatar */
.profile-avatar {
  width: 88px; height: 88px; border-radius: 50%;
  background: linear-gradient(135deg, #009E97, #007A75);
  color: white; font-weight: 800; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 4px 16px rgba(0,158,151,0.35);
  position: relative;
}
.avatar-edit-btn {
  position: absolute; bottom: 0; right: -4px;
  width: 28px; height: 28px; border-radius: 50%;
  background: white; border: 2px solid #E2E8F0;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8rem; cursor: pointer; transition: all 0.15s;
  box-shadow: 0 2px 8px rgba(0,0,0,0.12);
  line-height: 1;
}
.avatar-edit-btn:hover { background: #009E97; border-color: #009E97; transform: scale(1.1); }

.plan-pill-premium { display: inline-block; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.85rem; border-radius: 9999px; background: #FFFBEB; border: 1px solid #FDE68A; color: #92600A; }
.plan-pill-basic   { display: inline-block; font-size: 0.75rem; font-weight: 700; padding: 0.3rem 0.85rem; border-radius: 9999px; background: #F8FAFC; border: 1px solid #E2E8F0; color: #64748B; }
.form-group label { display: block; font-size: 0.8rem; font-weight: 600; color: #64748B; margin-bottom: 0.375rem; }
.form-input { width: 100%; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 0.625rem; padding: 0.6rem 0.875rem; font-size: 0.875rem; color: #0F172A; outline: none; transition: border-color 0.15s; }
.form-input:focus { border-color: #009E97; box-shadow: 0 0 0 3px rgba(0,158,151,0.14); }
.form-input:disabled { opacity: 0.55; cursor: not-allowed; }
.form-color { height: 38px; width: 48px; border-radius: 0.5rem; border: 1px solid #E2E8F0; cursor: pointer; padding: 2px; background: #F8FAFC; }
.btn-teal { background: linear-gradient(135deg, #009E97, #007A75); color: #fff; font-weight: 700; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; transition: all 0.15s; }
.btn-teal:hover:not(:disabled) { box-shadow: 0 4px 12px rgba(0,158,151,0.35); transform: translateY(-1px); }
.btn-teal:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-outline { background: white; color: #64748B; font-weight: 600; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: 1px solid #E2E8F0; cursor: pointer; }
.btn-danger { background: #FEF2F2; color: #DC2626; font-weight: 700; font-size: 0.8rem; padding: 0.5rem 1.1rem; border-radius: 0.625rem; border: 1px solid #FECACA; cursor: pointer; transition: all 0.15s; }
.btn-danger:hover { background: #DC2626; color: white; }
.pro-lock-badge   { font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; background: rgba(220,176,58,0.1); color: #DCB03A; border: 1px solid rgba(220,176,58,0.3); }
.pro-active-badge { font-size: 0.7rem; font-weight: 700; padding: 0.2rem 0.6rem; border-radius: 9999px; background: rgba(0,158,151,0.1); color: #009E97; border: 1px solid rgba(0,158,151,0.3); }
.upgrade-cta { background: rgba(0,158,151,0.06); border: 1px dashed rgba(0,158,151,0.3); }

/* Toast */
.toast { position: fixed; top: 1.25rem; right: 1.25rem; z-index: 9999; padding: 0.75rem 1.25rem; border-radius: 0.75rem; font-size: 0.875rem; font-weight: 600; box-shadow: 0 8px 24px rgba(0,0,0,0.12); }
.toast-success { background: #009E97; color: white; }
.toast-error   { background: #DC2626; color: white; }
.toast-enter-active, .toast-leave-active { transition: all 0.25s ease; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(-12px); }
</style>

<template>
  <NuxtLayout>
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-slate-800">My Profile</h2>
      <p class="text-sm text-slate-500 mt-0.5">View and update your profile information</p>
    </div>

    <div class="grid grid-cols-1 xl:grid-cols-3 gap-6">
      <!-- Profile Card -->
      <div class="card flex flex-col items-center text-center py-8">
        <div class="profile-avatar">A</div>
        <h3 class="text-xl font-extrabold text-slate-800 mt-4">Admin User</h3>
        <p class="text-amber-600 font-semibold text-sm mt-1">Shop Owner · Administrator</p>
        <p class="text-slate-500 text-sm mt-1">admin@tailortrack.com</p>

        <div class="grid grid-cols-3 gap-4 mt-6 w-full border-t border-slate-100 pt-6">
          <div>
            <p class="text-xl font-black text-slate-800">248</p>
            <p class="text-xs text-slate-400">Orders</p>
          </div>
          <div>
            <p class="text-xl font-black text-slate-800">91</p>
            <p class="text-xs text-slate-400">Customers</p>
          </div>
          <div>
            <p class="text-xl font-black text-slate-800">8</p>
            <p class="text-xs text-slate-400">Suppliers</p>
          </div>
        </div>

        <div class="mt-6 w-full">
          <span class="badge-green">Active Account</span>
        </div>
        <p class="text-xs text-slate-400 mt-3">Member since January 2026</p>
      </div>

      <!-- Edit Form -->
      <div class="xl:col-span-2 space-y-6">
        <!-- Personal Info -->
        <div class="card">
          <h3 class="section-title mb-5">Personal Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group">
              <label>First Name</label>
              <input type="text" value="Maria" class="form-input" />
            </div>
            <div class="form-group">
              <label>Last Name</label>
              <input type="text" value="Santos" class="form-input" />
            </div>
            <div class="form-group">
              <label>Email Address</label>
              <input type="email" value="admin@tailortrack.com" class="form-input" />
            </div>
            <div class="form-group">
              <label>Phone Number</label>
              <input type="text" value="09171234567" class="form-input" />
            </div>
            <div class="form-group sm:col-span-2">
              <label>Role</label>
              <input type="text" value="Shop Owner · Administrator" class="form-input" disabled />
            </div>
          </div>
          <div class="mt-4 flex justify-end">
            <button class="btn-amber">Save Changes</button>
          </div>
        </div>

        <!-- Change Password -->
        <div class="card">
          <h3 class="section-title mb-5">Change Password</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div class="form-group sm:col-span-2">
              <label>Current Password</label>
              <input type="password" placeholder="Enter current password" class="form-input" />
            </div>
            <div class="form-group">
              <label>New Password</label>
              <input type="password" placeholder="Enter new password" class="form-input" />
            </div>
            <div class="form-group">
              <label>Confirm New Password</label>
              <input type="password" placeholder="Confirm new password" class="form-input" />
            </div>
          </div>
          <div class="mt-4 flex justify-end gap-3">
            <button class="btn-outline">Cancel</button>
            <button class="btn-amber">Update Password</button>
          </div>
        </div>

        <!-- Danger Zone -->
        <div class="card border-red-200">
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
const handleSignOut = async () => {
  await navigateTo('/')
}
</script>

<style scoped>
.card { background: white; border-radius: 1rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.06); border: 1px solid rgba(15,23,42,0.06); }
.section-title { font-size: 1rem; font-weight: 700; color: #0F172A; }
.profile-avatar { width: 80px; height: 80px; border-radius: 50%; background: linear-gradient(135deg, #F59E0B, #D97706); color: white; font-weight: 800; font-size: 2rem; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 16px rgba(245,158,11,0.4); }
.badge-green { display: inline-block; font-size: 0.75rem; font-weight: 600; padding: 0.25rem 0.75rem; border-radius: 9999px; background: #F0FDF4; color: #16A34A; }
.form-group label { display: block; font-size: 0.8rem; font-weight: 600; color: #64748B; margin-bottom: 0.375rem; }
.form-input { width: 100%; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: 0.625rem; padding: 0.6rem 0.875rem; font-size: 0.875rem; color: #0F172A; outline: none; transition: border-color 0.15s; }
.form-input:focus { border-color: #F59E0B; box-shadow: 0 0 0 3px rgba(245,158,11,0.12); }
.form-input:disabled { opacity: 0.65; cursor: not-allowed; }
.btn-amber { background: linear-gradient(135deg, #F59E0B, #D97706); color: #0F172A; font-weight: 700; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: none; cursor: pointer; transition: all 0.15s; }
.btn-amber:hover { box-shadow: 0 4px 12px rgba(245,158,11,0.35); transform: translateY(-1px); }
.btn-outline { background: white; color: #64748B; font-weight: 600; font-size: 0.85rem; padding: 0.6rem 1.25rem; border-radius: 0.625rem; border: 1px solid #E2E8F0; cursor: pointer; transition: all 0.15s; }
.btn-outline:hover { background: #F8FAFC; }
.btn-danger { background: #FEF2F2; color: #DC2626; font-weight: 700; font-size: 0.8rem; padding: 0.5rem 1.1rem; border-radius: 0.625rem; border: 1px solid #FECACA; cursor: pointer; transition: all 0.15s; }
.btn-danger:hover { background: #DC2626; color: white; }
</style>

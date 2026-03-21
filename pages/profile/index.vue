<template>
  <div style="background:#FFFEF9; min-height:100vh; padding:16px;">
    <div style="background:#FFFEF9; border-radius:16px; min-height:calc(100vh - 32px); padding:28px;">
      <h1 style="font-size:28px; font-weight:700; color:#1a1a1a; margin-bottom:6px; letter-spacing:-0.3px;">User Profile</h1>
      <p style="font-size:13px; color:#999; margin-bottom:24px;">Manage your personal account information</p>
      <div style="display:grid; grid-template-columns:240px 1fr; gap:20px;">
        <div style="border:1px solid #E8E0CC; border-radius:14px; padding:24px; text-align:center;">
          <div style="width:80px; height:80px; border-radius:20px; background:#4CAF82; display:flex; align-items:center; justify-content:center; color:white; font-size:28px; font-weight:700; margin:0 auto 12px;">{{ user.avatar }}</div>
          <p style="font-size:16px; font-weight:700; color:#1a1a1a;">{{ user.name }}</p>
          <p style="font-size:12px; color:#999; margin-top:2px;">{{ user.role }}</p>
          <div style="display:inline-flex; align-items:center; gap:5px; background:#e8f5ee; color:#4CAF82; padding:4px 12px; border-radius:20px; font-size:11px; font-weight:600; margin-top:10px;">
            <span style="width:6px; height:6px; background:#4CAF82; border-radius:50%; display:inline-block;"></span> Active
          </div>
        </div>
        <div style="border:1px solid #E8E0CC; border-radius:14px; padding:24px;">
          <p style="font-size:15px; font-weight:600; color:#1a1a1a; margin-bottom:20px;">Personal Information</p>
          <div style="display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:16px;">
            <div>
              <label style="display:block; font-size:12px; font-weight:500; color:#666; margin-bottom:6px;">First Name</label>
              <input value="Dr." style="width:100%; border:1px solid #e5e5e5; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; font-family:Inter,sans-serif;"/>
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:500; color:#666; margin-bottom:6px;">Last Name</label>
              <input value="Chen" style="width:100%; border:1px solid #e5e5e5; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; font-family:Inter,sans-serif;"/>
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:500; color:#666; margin-bottom:6px;">Email</label>
              <input :value="user.email" style="width:100%; border:1px solid #e5e5e5; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; font-family:Inter,sans-serif;"/>
            </div>
            <div>
              <label style="display:block; font-size:12px; font-weight:500; color:#666; margin-bottom:6px;">Phone</label>
              <input value="+63 912 345 6789" style="width:100%; border:1px solid #e5e5e5; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; font-family:Inter,sans-serif;"/>
            </div>
          </div>
          <div style="display:flex; gap:10px; margin-top:8px;">
            <button @click="saved=true; setTimeout(()=>saved=false,2000)" style="background:#4CAF82; color:white; border:none; border-radius:10px; padding:10px 20px; font-size:13px; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">Save Changes</button>
            <button @click="logout" style="border:1px solid #4CAF82; color:#4CAF82; background:white; border-radius:10px; padding:10px 20px; font-size:13px; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">Sign Out</button>
          </div>
          <div v-if="saved" style="margin-top:12px; background:#e8f5ee; border-radius:10px; padding:10px 14px; color:#4CAF82; font-size:13px; font-weight:500;">✓ Profile updated successfully!</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'default' })
const { user, logout } = useAuth()
const saved = ref(false)
</script>

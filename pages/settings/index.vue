<template>
  <div style="background:#FFFEF9; min-height:100vh; padding:16px;">
    <div style="background:#FFFEF9; border-radius:16px; min-height:calc(100vh - 32px); padding:28px;">
      <h1 style="font-size:28px; font-weight:700; color:#1a1a1a; margin-bottom:6px; letter-spacing:-0.3px;">System Settings</h1>
      <p style="font-size:13px; color:#999; margin-bottom:24px;">Configure platform preferences</p>
      <div style="display:grid; grid-template-columns:200px 1fr; gap:20px;">
        <div style="display:flex; flex-direction:column; gap:4px;">
          <button v-for="tab in settingsTabs" :key="tab.id" @click="activeTab=tab.id"
            :style="`display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:10px; font-size:13px; font-weight:500; cursor:pointer; border:none; text-align:left; width:100%; font-family:Inter,sans-serif;
              ${activeTab===tab.id ? 'background:#4CAF82; color:white;' : 'background:transparent; color:#555;'}`">
            {{ tab.label }}
          </button>
        </div>
        <div style="border:1px solid #E8E0CC; border-radius:14px; padding:24px;">
          <template v-if="activeTab==='general'">
            <p style="font-size:16px; font-weight:600; color:#1a1a1a; margin-bottom:20px;">General Settings</p>
            <div v-for="f in generalFields" :key="f.label" style="margin-bottom:16px;">
              <label style="display:block; font-size:13px; font-weight:500; color:#555; margin-bottom:6px;">{{ f.label }}</label>
              <input v-model="f.value" style="width:100%; border:1px solid #e5e5e5; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; font-family:Inter,sans-serif;"/>
            </div>
            <button style="background:#4CAF82; color:white; border:none; border-radius:10px; padding:10px 20px; font-size:13px; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">Save Changes</button>
          </template>
          <template v-if="activeTab==='notifications'">
            <p style="font-size:16px; font-weight:600; color:#1a1a1a; margin-bottom:20px;">Notification Preferences</p>
            <div v-for="n in notifications" :key="n.label" style="display:flex; align-items:center; justify-content:space-between; padding:14px 0; border-bottom:1px solid #f8f8f8;">
              <div>
                <p style="font-size:13px; font-weight:500; color:#1a1a1a;">{{ n.label }}</p>
                <p style="font-size:11px; color:#aaa; margin-top:2px;">{{ n.desc }}</p>
              </div>
              <div @click="n.enabled=!n.enabled" :style="`width:40px; height:22px; border-radius:11px; cursor:pointer; position:relative; transition:background 0.2s; ${n.enabled?'background:#4CAF82;':'background:#ddd;'}`">
                <div :style="`width:16px; height:16px; background:white; border-radius:50%; position:absolute; top:3px; transition:left 0.2s; ${n.enabled?'left:21px;':'left:3px;'}`"></div>
              </div>
            </div>
          </template>
          <template v-if="activeTab==='security'">
            <p style="font-size:16px; font-weight:600; color:#1a1a1a; margin-bottom:20px;">Security Settings</p>
            <div v-for="f in ['Current Password','New Password','Confirm New Password']" :key="f" style="margin-bottom:16px;">
              <label style="display:block; font-size:13px; font-weight:500; color:#555; margin-bottom:6px;">{{ f }}</label>
              <input type="password" placeholder="••••••••" style="width:100%; border:1px solid #e5e5e5; border-radius:10px; padding:10px 14px; font-size:13px; outline:none; font-family:Inter,sans-serif;"/>
            </div>
            <button style="background:#4CAF82; color:white; border:none; border-radius:10px; padding:10px 20px; font-size:13px; font-weight:600; cursor:pointer; font-family:Inter,sans-serif;">Update Password</button>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
definePageMeta({ layout: 'default' })
const activeTab = ref('general')
const settingsTabs = [
  { id:'general', label:'General' },
  { id:'notifications', label:'Notifications' },
  { id:'security', label:'Security' },
  { id:'billing', label:'Billing' },
]
const generalFields = reactive([
  { label:'Platform Name', value:'NutriMatch' },
  { label:'Admin Email', value:'admin@nutrimatch.com' },
  { label:'Support Contact', value:'support@nutrimatch.com' },
  { label:'Timezone', value:'Asia/Manila' },
])
const notifications = reactive([
  { label:'New Patient Registration', desc:'Get notified when a new patient registers', enabled:true },
  { label:'Appointment Reminders', desc:'Receive reminders 1 hour before consults', enabled:true },
  { label:'Payment Received', desc:'Alert on successful payment processing', enabled:true },
  { label:'System Updates', desc:'Notifications about platform maintenance', enabled:false },
])
</script>

<template>
  <NuxtLayout>
    <div class="profile-page">
      <div class="page-header">
        <h1 class="page-title">User Profile</h1>
        <p class="page-sub">Manage your personal information and preferences</p>
      </div>

      <div class="profile-grid">
        <!-- Profile Card -->
        <div class="profile-card card">
          <div class="profile-banner"></div>
          <div class="profile-avatar-wrap">
            <div class="profile-avatar">RA</div>
            <button class="change-photo">Change Photo</button>
          </div>
          <div class="profile-name-section">
            <h2 class="p-name">Rogelio Aca Jr.</h2>
            <p class="p-role">Blood Bank Officer</p>
            <p class="p-org">LifeLink Blood Donation System</p>
          </div>
          <div class="profile-stats">
            <div class="p-stat">
              <span class="p-stat-val">1,284</span>
              <span class="p-stat-label">Donors Managed</span>
            </div>
            <div class="p-stat">
              <span class="p-stat-val">348</span>
              <span class="p-stat-label">Units Processed</span>
            </div>
            <div class="p-stat">
              <span class="p-stat-val">47</span>
              <span class="p-stat-label">Alerts Sent</span>
            </div>
          </div>
          <div class="badge-row">
            <div class="achievement-badge">
              <span class="badge-icon">🩸</span>
              <span>Top Officer</span>
            </div>
            <div class="achievement-badge">
              <span class="badge-icon">🏆</span>
              <span>2+ Years</span>
            </div>
            <div class="achievement-badge">
              <span class="badge-icon">📊</span>
              <span>Data Expert</span>
            </div>
          </div>
        </div>

        <!-- Edit Form -->
        <div class="form-card card">
          <div class="card-header">
            <h2 class="card-title">Personal Information</h2>
            <button class="btn-edit" @click="editMode = !editMode">
              {{ editMode ? 'Cancel' : 'Edit Profile' }}
            </button>
          </div>

          <div class="form-grid">
            <div class="field" v-for="field in fields" :key="field.label">
              <label class="field-label">{{ field.label }}</label>
              <input
                v-model="field.value"
                :type="field.type ?? 'text'"
                :disabled="!editMode"
                :placeholder="field.placeholder"
                class="field-input"
                :class="editMode && 'field-input--active'"
              />
            </div>
          </div>

          <div v-if="editMode" class="form-actions">
            <button class="btn-save" @click="saveProfile">Save Changes</button>
          </div>

          <!-- Notification Settings -->
          <div class="notif-section">
            <h3 class="notif-title">Notification Preferences</h3>
            <div class="notif-list">
              <div v-for="n in notifPrefs" :key="n.label" class="notif-row">
                <div>
                  <p class="notif-label">{{ n.label }}</p>
                  <p class="notif-desc">{{ n.desc }}</p>
                </div>
                <button class="toggle-btn" :class="n.enabled && 'toggle-on'" @click="n.enabled = !n.enabled">
                  <span class="toggle-knob"></span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
const editMode = ref(false)

const fields = reactive([
  { label: 'First Name', value: 'Rogelio', placeholder: 'Enter first name' },
  { label: 'Last Name', value: 'Aca', placeholder: 'Enter last name' },
  { label: 'Email Address', value: 'admin@lifelink.ph', placeholder: 'Enter email', type: 'email' },
  { label: 'Phone Number', value: '+63 912 345 6789', placeholder: 'Enter phone number' },
  { label: 'Position / Role', value: 'Blood Bank Officer', placeholder: 'Enter your role' },
  { label: 'Department', value: 'Operations & Inventory', placeholder: 'Enter department' },
  { label: 'Employee ID', value: 'LL-2024-001', placeholder: 'Enter employee ID' },
  { label: 'Date Joined', value: '2024-01-15', placeholder: 'Date joined', type: 'date' },
])

const notifPrefs = reactive([
  { label: 'Email Alerts', desc: 'Receive emergency alerts via email', enabled: true },
  { label: 'SMS Notifications', desc: 'Get SMS for critical blood requests', enabled: true },
  { label: 'Low Stock Warnings', desc: 'Alert when blood type stock drops below minimum', enabled: true },
  { label: 'Donation Confirmations', desc: 'Notify when a donation is verified', enabled: false },
])

const saveProfile = () => {
  editMode.value = false
}
</script>

<style scoped>
.profile-page { max-width: 1100px; }
.page-header { margin-bottom: 1.75rem; }

.page-title { font-family: Georgia, 'Times New Roman', serif; font-size: 1.75rem; font-weight: 700; color: #1a1a1a; margin: 0; }
.page-sub { font-size: 0.82rem; color: #999; margin-top: 4px; }

.profile-grid { display: grid; grid-template-columns: 300px 1fr; gap: 1.25rem; }
@media (max-width: 900px) { .profile-grid { grid-template-columns: 1fr; } }

.card { background: white; border: 1px solid #f5e8e8; border-radius: 16px; overflow: hidden; }

/* Profile card */
.profile-banner { height: 80px; background: linear-gradient(135deg, #c0392b, #7b241c); }
.profile-avatar-wrap { display: flex; flex-direction: column; align-items: center; gap: 8px; margin-top: -30px; padding: 0 1.5rem; }
.profile-avatar { width: 64px; height: 64px; border-radius: 50%; background: linear-gradient(135deg, #c0392b, #e74c3c); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; font-size: 1.2rem; border: 3px solid white; box-shadow: 0 4px 12px rgba(192,57,43,0.25); }
.change-photo { background: none; border: 1px solid #f0e0e0; border-radius: 8px; padding: 4px 12px; font-size: 0.72rem; color: #999; cursor: pointer; }
.change-photo:hover { border-color: #fecaca; color: #c0392b; }

.profile-name-section { text-align: center; padding: 0.75rem 1.5rem; }
.p-name { font-size: 1.1rem; font-weight: 700; color: #1a1a1a; margin: 0; }
.p-role { font-size: 0.78rem; color: #c0392b; font-weight: 600; margin: 4px 0 2px; }
.p-org { font-size: 0.72rem; color: #bbb; margin: 0; }

.profile-stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0; border-top: 1px solid #f5e8e8; border-bottom: 1px solid #f5e8e8; margin: 1rem 0 0; }
.p-stat { padding: 1rem 0.5rem; text-align: center; }
.p-stat + .p-stat { border-left: 1px solid #f5e8e8; }
.p-stat-val { display: block; font-size: 1.2rem; font-weight: 700; color: #c0392b; }
.p-stat-label { display: block; font-size: 0.62rem; color: #bbb; text-transform: uppercase; letter-spacing: 0.05em; margin-top: 2px; }

.badge-row { display: flex; justify-content: center; gap: 8px; padding: 1rem 1.5rem 1.5rem; flex-wrap: wrap; }
.achievement-badge { display: flex; align-items: center; gap: 5px; background: #fef2f2; border: 1px solid #fecaca; border-radius: 20px; padding: 4px 10px; font-size: 0.7rem; font-weight: 600; color: #c0392b; }
.badge-icon { font-size: 0.9rem; }

/* Form card */
.card-header { display: flex; justify-content: space-between; align-items: center; padding: 1.25rem 1.5rem; border-bottom: 1px solid #f5e8e8; }
.card-title { font-size: 0.95rem; font-weight: 700; color: #1a1a1a; margin: 0; }

.btn-edit { padding: 6px 16px; background: none; border: 1px solid #fecaca; border-radius: 8px; color: #c0392b; font-size: 0.78rem; font-weight: 600; cursor: pointer; transition: all 0.15s; }
.btn-edit:hover { background: #fef2f2; }

.form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; padding: 1.25rem 1.5rem; }
@media (max-width: 600px) { .form-grid { grid-template-columns: 1fr; } }

.field { display: flex; flex-direction: column; gap: 5px; }
.field-label { font-size: 0.72rem; font-weight: 600; color: #999; text-transform: uppercase; letter-spacing: 0.04em; }

.field-input { padding: 0.6rem 0.9rem; background: #faf9f9; border: 1px solid #f0e0e0; border-radius: 9px; font-size: 0.85rem; color: #333; outline: none; transition: all 0.2s; }
.field-input:disabled { background: #faf9f9; color: #666; cursor: default; }
.field-input--active:not(:disabled) { background: white; border-color: #e74c3c; }
.field-input--active:focus { box-shadow: 0 0 0 3px rgba(231,76,60,0.12); }

.form-actions { padding: 0 1.5rem 1.25rem; }

.btn-save { padding: 0.7rem 1.5rem; background: linear-gradient(135deg, #c0392b, #e74c3c); color: white; border: none; border-radius: 10px; font-size: 0.85rem; font-weight: 600; cursor: pointer; }

/* Notifications */
.notif-section { border-top: 1px solid #f5e8e8; padding: 1.25rem 1.5rem; }
.notif-title { font-size: 0.85rem; font-weight: 700; color: #1a1a1a; margin: 0 0 1rem; }
.notif-list { display: flex; flex-direction: column; gap: 1rem; }
.notif-row { display: flex; align-items: center; justify-content: space-between; gap: 1rem; }
.notif-label { font-size: 0.85rem; font-weight: 600; color: #333; margin: 0; }
.notif-desc { font-size: 0.72rem; color: #bbb; margin: 2px 0 0; }

.toggle-btn { width: 42px; height: 24px; border-radius: 12px; background: #f0e0e0; border: none; cursor: pointer; position: relative; transition: background 0.2s; flex-shrink: 0; }
.toggle-btn.toggle-on { background: #c0392b; }
.toggle-knob { position: absolute; top: 3px; left: 3px; width: 18px; height: 18px; background: white; border-radius: 50%; transition: transform 0.2s; box-shadow: 0 1px 4px rgba(0,0,0,0.15); }
.toggle-on .toggle-knob { transform: translateX(18px); }
</style>
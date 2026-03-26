<template>
  <div class="settings-page">
    <h1 class="page-title">Website Settings</h1>

    <!-- General Settings -->
    <section class="settings-section">
      <h2 class="section-title">General</h2>
      <div class="setting-item">
        <label>Website Name</label>
        <input type="text" v-model="settings.websiteName" placeholder="Library Portal" />
      </div>
      <div class="setting-item">
        <label>Library Contact Email</label>
        <input type="email" v-model="settings.contactEmail" placeholder="admin@library.com" />
      </div>
      <div class="setting-item">
        <label>Default Language</label>
        <select v-model="settings.language">
          <option value="en">English</option>
          <option value="tl">Filipino</option>
        </select>
      </div>
    </section>

    <!-- Appearance Settings -->
    <section class="settings-section">
      <h2 class="section-title">Appearance</h2>
      <div class="setting-item toggle">
        <label>Dark Mode</label>
        <input type="checkbox" v-model="settings.darkMode" />
      </div>
      <div class="setting-item">
        <label>Primary Color</label>
        <input type="color" v-model="settings.primaryColor" />
      </div>
    </section>

    <!-- Notifications Settings -->
    <section class="settings-section">
      <h2 class="section-title">Notifications</h2>
      <div class="setting-item toggle">
        <label>Email Notifications</label>
        <input type="checkbox" v-model="settings.emailNotifications" />
      </div>
      <div class="setting-item toggle">
        <label>Push Notifications</label>
        <input type="checkbox" v-model="settings.pushNotifications" />
      </div>
    </section>

    <!-- Save Button -->
    <div class="actions">
      <button class="save-btn" @click="saveSettings">Save Settings</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'

// Mock settings data
const settings = reactive({
  websiteName: 'Library Portal',
  contactEmail: 'admin@library.com',
  language: 'en',
  darkMode: false,
  primaryColor: '#1d4ed8',
  emailNotifications: true,
  pushNotifications: false,
})

// Mock save function
const saveSettings = () => {
  console.log('Saved settings:', JSON.parse(JSON.stringify(settings)))
  alert('Settings saved successfully!')
}
</script>

<style scoped>
.settings-page {
  max-width: 700px;
  margin: auto;
  padding: 2rem;
}
.page-title {
  font-size: 1.75rem;
  font-weight: bold;
  margin-bottom: 2rem;
  text-align: center;
}
.settings-section {
  margin-bottom: 2rem;
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
}
.section-title {
  font-weight: bold;
  margin-bottom: 1rem;
  color: #111827;
}
.setting-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
}
.setting-item label {
  font-weight: 500;
  margin-right: 1rem;
}
.setting-item input[type="text"],
.setting-item input[type="email"],
.setting-item select {
  flex: 1;
  padding: 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #d1d5db;
}
.setting-item.toggle input[type="checkbox"] {
  width: 1.25rem;
  height: 1.25rem;
}
.actions {
  text-align: center;
  margin-top: 2rem;
}
.save-btn {
  padding: 0.75rem 2rem;
  background-color: #1d4ed8;
  color: white;
  font-weight: bold;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  transition: background-color 0.2s;
}
.save-btn:hover {
  background-color: #2563eb;
}
</style>
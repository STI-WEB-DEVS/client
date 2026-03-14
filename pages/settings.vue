<template>
  <NuxtLayout>
    <div class="max-w-4xl">
      <div class="mb-6">
        <h2 class="text-xl font-bold text-gray-900">System Settings</h2>
        <p class="text-sm text-gray-500 mt-0.5">
          Configure HealthTrack system preferences
        </p>
      </div>

      <div class="flex gap-1 bg-gray-100 p-1 rounded-xl w-fit mb-6">
        <button
          v-for="tab in tabs"
          :key="tab"
          @click="activeTab = tab"
          :class="
            activeTab === tab
              ? 'bg-white text-gray-900 shadow-sm'
              : 'text-gray-500 hover:text-gray-700'
          "
          class="px-4 py-1.5 rounded-lg text-sm font-medium transition-all"
        >
          {{ tab }}
        </button>
      </div>

      <div v-if="activeTab === 'General'" class="space-y-5">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-semibold text-gray-900 mb-4">Hospital Information</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5"
                >Hospital Name</label
              >
              <input
                v-model="settings.hospitalName"
                type="text"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5"
                >License Number</label
              >
              <input
                v-model="settings.licenseNo"
                type="text"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5"
                >Contact Email</label
              >
              <input
                v-model="settings.email"
                type="email"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5"
                >Phone Number</label
              >
              <input
                v-model="settings.phone"
                type="tel"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
            <div class="sm:col-span-2">
              <label class="block text-sm font-medium text-gray-700 mb-1.5"
                >Address</label
              >
              <input
                v-model="settings.address"
                type="text"
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 focus:border-teal-400"
              />
            </div>
          </div>
        </div>
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-semibold text-gray-900 mb-4">System Preferences</h3>
          <div class="space-y-4">
            <div
              v-for="pref in preferences"
              :key="pref.key"
              class="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
            >
              <div>
                <p class="text-sm font-medium text-gray-900">
                  {{ pref.label }}
                </p>
                <p class="text-xs text-gray-500">{{ pref.description }}</p>
              </div>
              <button
                @click="pref.value = !pref.value"
                :class="pref.value ? 'bg-teal-600' : 'bg-gray-200'"
                class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200"
              >
                <span
                  :class="pref.value ? 'translate-x-5' : 'translate-x-0.5'"
                  class="inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5"
                ></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        v-else-if="activeTab === 'Notifications'"
        class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
      >
        <h3 class="font-semibold text-gray-900 mb-4">
          Notification Preferences
        </h3>
        <div class="space-y-4">
          <div
            v-for="n in notifications"
            :key="n.key"
            class="flex items-center justify-between py-3 border-b border-gray-50 last:border-0"
          >
            <div class="flex items-center gap-3">
              <div class="bg-teal-50 p-2 rounded-lg">
                <component :is="n.icon" class="h-4 w-4 text-teal-600" />
              </div>
              <div>
                <p class="text-sm font-medium text-gray-900">{{ n.label }}</p>
                <p class="text-xs text-gray-500">{{ n.description }}</p>
              </div>
            </div>
            <button
              @click="n.value = !n.value"
              :class="n.value ? 'bg-teal-600' : 'bg-gray-200'"
              class="relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors duration-200"
            >
              <span
                :class="n.value ? 'translate-x-5' : 'translate-x-0.5'"
                class="inline-block h-5 w-5 transform rounded-full bg-white shadow-sm transition-transform duration-200 mt-0.5"
              ></span>
            </button>
          </div>
        </div>
      </div>

      <div v-else-if="activeTab === 'Security'" class="space-y-5">
        <div class="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 class="font-semibold text-gray-900 mb-4">Password Policy</h3>
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5"
                >Minimum Length</label
              >
              <select
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none bg-white"
              >
                <option>8 characters</option>
                <option selected>12 characters</option>
                <option>16 characters</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1.5"
                >Session Timeout</label
              >
              <select
                class="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none bg-white"
              >
                <option>15 minutes</option>
                <option selected>30 minutes</option>
                <option>1 hour</option>
              </select>
            </div>
          </div>
        </div>
        <div
          class="bg-amber-50 border border-amber-200 rounded-2xl p-5 flex gap-3"
        >
          <ExclamationTriangleIcon
            class="h-5 w-5 text-amber-500 shrink-0 mt-0.5"
          />
          <div>
            <p class="text-sm font-medium text-amber-800">
              HIPAA Compliance Mode
            </p>
            <p class="text-xs text-amber-700 mt-0.5">
              All patient data access is logged and encrypted. Audit trails are
              retained for 7 years as required.
            </p>
          </div>
        </div>
      </div>

      <div class="mt-6 flex items-center gap-3">
        <button
          @click="saved = true"
          class="px-6 py-2.5 bg-teal-600 text-white rounded-xl text-sm font-medium hover:bg-teal-700 transition-colors"
        >
          Save Changes
        </button>
        <p
          v-if="saved"
          class="text-sm text-emerald-600 font-medium flex items-center gap-1"
        >
          <CheckCircleIcon class="h-4 w-4" /> Settings saved!
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  BellIcon,
  EnvelopeIcon,
  DevicePhoneMobileIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
} from "@heroicons/vue/24/outline";

const activeTab = ref("General");
const tabs = ["General", "Notifications", "Security"];
const saved = ref(false);

const settings = ref({
  hospitalName: "HealthTrack Medical Center",
  licenseNo: "DOH-2025-MMC-00142",
  email: "admin@healthtrack.ph",
  phone: "+63 2 8888 0001",
  address: "123 Medical Drive, Quezon City, Metro Manila, Philippines",
});
const preferences = ref([
  {
    key: "auto",
    label: "Auto-assign Patients",
    description: "Automatically assign patients to available doctors",
    value: true,
  },
  {
    key: "reports",
    label: "Daily Reports",
    description: "Generate and email daily summary reports",
    value: true,
  },
  {
    key: "audit",
    label: "Audit Logging",
    description: "Log all user actions for compliance",
    value: true,
  },
]);
const notifications = ref([
  {
    key: "push",
    label: "Push Notifications",
    description: "Browser and app push notifications",
    icon: BellIcon,
    value: true,
  },
  {
    key: "email",
    label: "Email Alerts",
    description: "Send email for critical patient updates",
    icon: EnvelopeIcon,
    value: true,
  },
  {
    key: "sms",
    label: "SMS Alerts",
    description: "Text message for emergency cases",
    icon: DevicePhoneMobileIcon,
    value: false,
  },
]);

watch(saved, (val) => {
  if (val) setTimeout(() => (saved.value = false), 3000);
});
</script>

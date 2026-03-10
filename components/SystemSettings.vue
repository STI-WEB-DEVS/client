<template>
  <div class="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8 bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl">
    <form @submit.prevent="saveSettings">
      <div class="space-y-12">

        <!-- ── General / Branding ── -->
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">General & Branding</h2>
          <p class="mt-1 text-sm/6 text-gray-600">Configure your workspace identity and regional preferences.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div class="sm:col-span-3">
              <label for="workspace-name" class="block text-sm/6 font-medium text-gray-900">Workspace Name</label>
              <div class="mt-2">
                <input type="text" id="workspace-name" v-model="settings.workspaceName"
                  placeholder="e.g. Dazzle Events & Weddings"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
              <p class="mt-1 text-xs text-gray-500">Shown on your public organizer profile and directory listing.</p>
            </div>

            <div class="sm:col-span-3">
              <label for="slug" class="block text-sm/6 font-medium text-gray-900">Public Profile Slug</label>
              <div class="mt-2 flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                <span class="flex select-none items-center pl-3 text-gray-500 sm:text-sm">nasery.com/organizers/</span>
                <input type="text" id="slug" v-model="settings.slug" placeholder="your-name"
                  class="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm/6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="event-type" class="block text-sm/6 font-medium text-gray-900">Primary Event Type</label>
              <div class="mt-2">
                <select id="event-type" v-model="settings.primaryEventType"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                  <option value="weddings">Weddings & Debuts</option>
                  <option value="corporate">Corporate Events</option>
                  <option value="school">School Events</option>
                  <option value="community">Community / Barangay Events</option>
                  <option value="private">Private Parties & Social Gatherings</option>
                  <option value="mixed">Mixed / Multiple Types</option>
                </select>
              </div>
              <p class="mt-1 text-xs text-gray-500">Used to pre-fill your directory category and filter tags.</p>
            </div>

            <div class="sm:col-span-3">
              <label for="timezone" class="block text-sm/6 font-medium text-gray-900">Timezone</label>
              <div class="mt-2">
                <select id="timezone" v-model="settings.timezone"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                  <option value="Asia/Manila">Asia/Manila (PHT, UTC+8)</option>
                  <option value="Asia/Singapore">Asia/Singapore (SGT, UTC+8)</option>
                  <option value="UTC">UTC</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="currency" class="block text-sm/6 font-medium text-gray-900">Currency</label>
              <div class="mt-2">
                <select id="currency" v-model="settings.currency"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                  <option value="PHP">PHP (₱)</option>
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                </select>
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="date-format" class="block text-sm/6 font-medium text-gray-900">Date Format</label>
              <div class="mt-2">
                <select id="date-format" v-model="settings.dateFormat"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                  <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                  <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                  <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                </select>
              </div>
            </div>

            <div class="col-span-full flex items-center justify-between gap-x-6">
              <div>
                <label for="directory-listing" class="block text-sm/6 font-medium text-gray-900">List Workspace in Public Directory</label>
                <p class="text-sm text-gray-500">Make your organizer profile visible on nasery.com/organizers. Subject to platform admin approval.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="directory-listing" v-model="settings.listedInDirectory" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

          </div>
        </div>

        <!-- ── User & Account ── -->
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">User & Account</h2>
          <p class="mt-1 text-sm/6 text-gray-600">Manage your account credentials and team member access defaults.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div class="sm:col-span-3">
              <label for="full-name" class="block text-sm/6 font-medium text-gray-900">Full Name</label>
              <div class="mt-2">
                <input type="text" id="full-name" v-model="settings.fullName"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="email" class="block text-sm/6 font-medium text-gray-900">Email Address</label>
              <div class="mt-2">
                <input type="email" id="email" v-model="settings.email"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="contact-number" class="block text-sm/6 font-medium text-gray-900">Contact Number</label>
              <div class="mt-2">
                <input type="tel" id="contact-number" v-model="settings.contactNumber"
                  placeholder="+63 9XX XXX XXXX"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
            </div>

            <div class="sm:col-span-3">
              <label for="staff-limit" class="block text-sm/6 font-medium text-gray-900">Max Team Members per Event</label>
              <div class="mt-2">
                <input type="number" min="1" max="50" id="staff-limit" v-model="settings.maxStaffPerEvent"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
              <p class="mt-1 text-xs text-gray-500">Maximum number of staff that can be assigned to a single event.</p>
            </div>

            <div class="col-span-full flex items-center justify-between gap-x-6">
              <div>
                <label for="staff-reports" class="block text-sm/6 font-medium text-gray-900">Allow Team Members to View Event Reports</label>
                <p class="text-sm text-gray-500">Assigned staff can view the post-event report for their event. Workspace-wide reports remain organizer-only.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="staff-reports" v-model="settings.staffCanViewReports" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="col-span-full flex items-center justify-between gap-x-6">
              <div>
                <label for="staff-walkin" class="block text-sm/6 font-medium text-gray-900">Allow Team Members to Log Walk-ins</label>
                <p class="text-sm text-gray-500">Permit assigned staff to use walk-in logging mode during an active event.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="staff-walkin" v-model="settings.staffCanLogWalkIns" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

          </div>
        </div>

        <!-- ── Notifications ── -->
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">Notifications</h2>
          <p class="mt-1 text-sm/6 text-gray-600">Control when NaSeRy sends alerts to you and your attendees.</p>

          <div class="mt-10 space-y-8">

            <div class="flex items-center justify-between gap-x-6">
              <div>
                <label for="notif-registration" class="block text-sm/6 font-medium text-gray-900">New Registration Alerts</label>
                <p class="text-sm text-gray-500">Notify you when an attendee registers for one of your events.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="notif-registration" v-model="settings.notifNewRegistration" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between gap-x-6">
              <div>
                <label for="notif-capacity" class="block text-sm/6 font-medium text-gray-900">Capacity Threshold Alerts</label>
                <p class="text-sm text-gray-500">Alert you when an event or ticket tier reaches 80% of its capacity.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="notif-capacity" v-model="settings.notifCapacityThreshold" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between gap-x-6">
              <div>
                <label for="notif-inquiry" class="block text-sm/6 font-medium text-gray-900">New Inquiry Notifications</label>
                <p class="text-sm text-gray-500">Receive an alert when a client submits a quotation request via your public profile.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="notif-inquiry" v-model="settings.notifNewInquiry" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between gap-x-6">
              <div>
                <label for="notif-qr" class="block text-sm/6 font-medium text-gray-900">Attendee QR Ticket Confirmation</label>
                <p class="text-sm text-gray-500">Automatically email a QR ticket to attendees upon successful registration.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="notif-qr" v-model="settings.notifQrTicketEmail" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="flex items-center justify-between gap-x-6">
              <div>
                <label for="notif-report" class="block text-sm/6 font-medium text-gray-900">Post-Event Report Ready</label>
                <p class="text-sm text-gray-500">Notify you when the post-event report has been automatically generated.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="notif-report" v-model="settings.notifReportReady" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="sm:col-span-3">
              <label for="notif-channel" class="block text-sm/6 font-medium text-gray-900">Notification Delivery Channel</label>
              <div class="mt-2">
                <select id="notif-channel" v-model="settings.notifChannel"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6">
                  <option value="email">Email Only</option>
                  <option value="sms">SMS Only</option>
                  <option value="both">Email & SMS</option>
                  <option value="none">Disabled</option>
                </select>
              </div>
            </div>

          </div>
        </div>

        <!-- ── Billing / Ticket Pricing ── -->
        <div class="border-b border-gray-900/10 pb-12">
          <h2 class="text-base/7 font-semibold text-gray-900">Billing & Ticket Pricing</h2>
          <p class="mt-1 text-sm/6 text-gray-600">Set workspace-wide defaults for ticket tiers and registration fees.</p>

          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

            <div class="sm:col-span-3">
              <label for="default-tier-price" class="block text-sm/6 font-medium text-gray-900">Default Ticket Tier Price (₱)</label>
              <div class="mt-2">
                <input type="number" min="0" step="0.01" id="default-tier-price" v-model="settings.defaultTierPrice"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
              <p class="mt-1 text-xs text-gray-500">Pre-filled when creating a new ticket tier. Can be overridden per event.</p>
            </div>

            <div class="sm:col-span-3">
              <label for="default-capacity" class="block text-sm/6 font-medium text-gray-900">Default Event Capacity</label>
              <div class="mt-2">
                <input type="number" min="1" id="default-capacity" v-model="settings.defaultEventCapacity"
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6" />
              </div>
              <p class="mt-1 text-xs text-gray-500">Pre-filled when creating a new event. Can be overridden per event.</p>
            </div>

            <div class="col-span-full flex items-center justify-between gap-x-6">
              <div>
                <label for="free-events" class="block text-sm/6 font-medium text-gray-900">Allow Free Events</label>
                <p class="text-sm text-gray-500">Enable creation of events with ₱0 ticket tiers. Useful for community, school, or barangay events.</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="free-events" v-model="settings.allowFreeEvents" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="col-span-full flex items-center justify-between gap-x-6">
              <div>
                <label for="show-price" class="block text-sm/6 font-medium text-gray-900">Show Ticket Prices on Public Registration Page</label>
                <p class="text-sm text-gray-500">Display tier pricing on the public event page visible to attendees at nasery.com/e/[event-slug].</p>
              </div>
              <label class="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" id="show-price" v-model="settings.showPriceOnPublicPage" class="sr-only peer">
                <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
              </label>
            </div>

            <div class="col-span-full">
              <label for="invoice-notes" class="block text-sm/6 font-medium text-gray-900">Default Ticket Confirmation Notes</label>
              <div class="mt-2">
                <textarea id="invoice-notes" v-model="settings.defaultInvoiceNotes" rows="3"
                  placeholder="e.g. This ticket is non-refundable. For concerns, contact us at your-email@example.com."
                  class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"></textarea>
              </div>
              <p class="mt-1 text-xs text-gray-500">Appended to all QR ticket confirmation emails sent to attendees.</p>
            </div>

          </div>
        </div>

      </div>

      <!-- Footer Actions -->
      <div class="mt-6 flex items-center justify-end gap-x-6 pb-6">
        <button type="button" @click="resetSettings" class="text-sm/6 font-semibold text-gray-900">
          Reset to Defaults
        </button>
        <button type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save Settings
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const defaultSettings = {
  // General & Branding
  workspaceName: '',
  slug: '',
  primaryEventType: 'mixed',
  timezone: 'Asia/Manila',
  currency: 'PHP',
  dateFormat: 'MM/DD/YYYY',
  listedInDirectory: false,

  // User & Account
  fullName: '',
  email: '',
  contactNumber: '',
  maxStaffPerEvent: 10,
  staffCanViewReports: false,
  staffCanLogWalkIns: true,

  // Notifications
  notifNewRegistration: true,
  notifCapacityThreshold: true,
  notifNewInquiry: true,
  notifQrTicketEmail: true,
  notifReportReady: true,
  notifChannel: 'email',

  // Billing & Ticket Pricing
  defaultTierPrice: 0,
  defaultEventCapacity: 100,
  allowFreeEvents: true,
  showPriceOnPublicPage: true,
  defaultInvoiceNotes: '',
};

const settings = ref({ ...defaultSettings });

const saveSettings = () => {
  // Replace with your API service call later
  console.log('Settings saved:', settings.value);
  alert('Settings updated successfully!');
};

const resetSettings = () => {
  if (confirm('Are you sure you want to revert to default settings?')) {
    settings.value = { ...defaultSettings };
  }
};
</script>
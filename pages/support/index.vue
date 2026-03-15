<template>
  <NuxtLayout>
    <h1 class="text-2xl font-bold mb-2" style="color: #1C3028;">Support</h1>
    <p class="text-gray-500 mb-6">Helpdesk tickets from spa owners.</p>

    <div class="flex gap-3 mb-4 items-center">
        <input
          v-model="search"
          type="text"
          placeholder="Search spa or issue..."
          class="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C3028] transition-colors w-72 shadow-sm"
        />
        <input
          v-model="filterDate"
          type="date"
          class="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C3028] transition-colors shadow-sm"
        />
        <select
          v-model="filterStatus"
          class="rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C3028] transition-colors shadow-sm"
        >
          <option value="">All Statuses</option>
          <option>Open</option>
          <option>In Progress</option>
          <option>Resolved</option>
          <option>Closed</option>
          <option>Escalated</option>
        </select>
        <span class="text-xs text-gray-400 ml-auto">{{ filteredSpas.length }} spa(s) found</span>
      </div>

      <div class="flex gap-4 h-[calc(100vh-260px)]">

      <!-- Panel 1: Spa List -->
      <div class="w-56 shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto">
        <div class="p-4 border-b border-gray-100">
          <p class="text-xs font-semibold uppercase tracking-widest" style="color: #1C3028;">Spa Owners</p>
        </div>
        <div
          v-for="spa in filteredSpas" :key="spa.id"
          @click="selectSpa(spa)"
          class="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors flex items-center gap-3"
          :style="selectedSpa?.id === spa.id ? 'background-color: #f5f0e8; border-left: 2px solid #C9A96E;' : ''"
        >
          <div class="size-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0"
            style="background-color: #1C3028;">
            {{ spa.name.charAt(0) }}
          </div>
          <div>
            <p class="text-sm font-semibold text-gray-900">{{ spa.name }}</p>
            <p class="text-xs text-gray-400">{{ spa.tickets.length }} ticket{{ spa.tickets.length !== 1 ? 's' : '' }}</p>
          </div>
        </div>
      </div>

      <!-- Panel 2: Tickets -->
      <div class="w-72 shrink-0 bg-white rounded-xl shadow-sm border border-gray-100 overflow-y-auto">
        <div class="p-4 border-b border-gray-100">
          <p class="text-xs font-semibold uppercase tracking-widest" style="color: #1C3028;">
            {{ selectedSpa ? selectedSpa.name + ' — Tickets' : 'Select a Tenant' }}
          </p>
        </div>
        <div v-if="!selectedSpa" class="flex-1 flex flex-col items-center justify-center p-8 text-center mt-10">
          <p class="text-sm text-gray-300">Select a tenant to view their tickets</p>
        </div>
        <div v-else>
          <div
            v-for="ticket in selectedSpa.tickets" :key="ticket.id"
            @click="selectedTicket = ticket"
            class="p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors"
            :style="selectedTicket?.id === ticket.id ? 'background-color: #f5f0e8; border-left: 2px solid #C9A96E;' : ''"
          >
            <div class="flex items-center justify-between mb-1">
              <p class="text-sm font-semibold text-gray-900">#{{ ticket.id.toString().padStart(3, '0') }}</p>
              <span class="text-xs px-2 py-0.5 rounded-full text-white"
                :style="{ backgroundColor: ticket.status === 'Resolved' ? '#1C3028' : ticket.status === 'In Progress' ? '#C9A96E' : '#9ca3af' }">
                {{ ticket.status }}
              </span>
            </div>
            <p class="text-xs text-gray-500">{{ ticket.issue }}</p>
            <p class="text-xs text-gray-300 mt-1">{{ ticket.date }}</p>
          </div>
        </div>
      </div>

      <!-- Panel 3: Chat Thread -->
      <div class="flex-1 bg-white rounded-xl shadow-sm border border-gray-100 flex flex-col">

        <!-- Empty state -->
        <div v-if="!selectedTicket" class="flex-1 flex flex-col items-center justify-center text-center p-8">
          <div class="size-16 rounded-full flex items-center justify-center mb-4" style="background-color: #f5f0e8;">
            <svg class="size-8" style="color: #C9A96E;" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
            </svg>
          </div>
          <p class="font-semibold text-gray-400">Select a ticket to view the conversation</p>
        </div>

        <template v-else>
          <!-- Header -->
          <div class="p-4 border-b border-gray-100 flex items-center justify-between">
            <div>
              <p class="font-semibold text-gray-900">{{ selectedTicket.issue }}</p>
              <p class="text-xs text-gray-400">{{ selectedSpa?.name }} · {{ selectedTicket.date }}</p>
            </div>
            <div class="flex items-center gap-2">
              <select
                v-model="selectedTicket.status"
                class="text-xs rounded-lg border border-gray-200 px-2 py-1.5 focus:outline-none focus:border-[#1C3028] transition-colors"
                :style="{ color: selectedTicket.status === 'Resolved' ? '#1C3028' : selectedTicket.status === 'In Progress' ? '#C9A96E' : '#9ca3af' }"
              >
                <option>Open</option>
                <option>In Progress</option>
                <option>Resolved</option>
                <option>Closed</option>
                <option>Escalated</option>
              </select>
            </div>
          </div>

          <!-- Messages -->
          <div class="flex-1 overflow-y-auto p-6 space-y-4">
            <div v-for="msg in selectedTicket.messages" :key="msg.id" class="flex"
              :class="msg.sender === 'admin' ? 'justify-end' : 'justify-start'">
              <div class="max-w-sm">
                <p class="text-xs mb-1" :class="msg.sender === 'admin' ? 'text-right text-gray-400' : 'text-gray-400'">
                  {{ msg.sender === 'admin' ? 'You' : selectedSpa?.name }} · {{ msg.time }}
                </p>
                <div class="px-4 py-2.5 text-sm"
                  :style="msg.sender === 'admin'
                    ? 'background-color: #1C3028; color: white; border-radius: 18px 18px 4px 18px;'
                    : 'background-color: #f5f0e8; color: #1C3028; border-radius: 18px 18px 18px 4px;'">
                  {{ msg.text }}
                </div>
              </div>
            </div>
          </div>

          <!-- Reply -->
          <div class="p-4 border-t border-gray-100 flex gap-3">
            <input
              v-model="reply"
              type="text"
              placeholder="Type a reply..."
              class="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-sm focus:outline-none focus:border-[#1C3028] transition-colors"
              @keydown.enter="sendReply"
            />
            <button
              @click="sendReply"
              class="px-4 py-2.5 rounded-xl text-white text-sm font-semibold hover:opacity-90 transition-opacity"
              style="background-color: #1C3028;"
            >
              Send
            </button>
          </div>
        </template>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Message {
  id: number
  sender: 'admin' | 'tenant'
  text: string
  time: string
}

interface Ticket {
  id: number
  issue: string
  date: string
  status: string
  messages: Message[]
}

interface Spa {
  id: number
  name: string
  tickets: Ticket[]
}

const reply = ref('')
const search = ref('')
const filterDate = ref('')
const filterStatus = ref('')
const selectedSpa = ref<Spa | null>(null)
const selectedTicket = ref<Ticket | null>(null)

const filteredSpas = computed(() => {
  return spas.value.filter(spa => {
    const matchesSearch = search.value === '' ||
      spa.name.toLowerCase().includes(search.value.toLowerCase()) ||
      spa.tickets.some(t => t.issue.toLowerCase().includes(search.value.toLowerCase()))

    const matchesStatus = filterStatus.value === '' ||
      spa.tickets.some(t => t.status === filterStatus.value)

    const matchesDate = filterDate.value === '' ||
      spa.tickets.some(t => {
        const ticketDate = new Date(t.date).toISOString().split('T')[0]
        return ticketDate === filterDate.value
      })

    return matchesSearch && matchesStatus && matchesDate
  })
})

const selectSpa = (spa: Spa) => {
  selectedSpa.value = spa
  selectedTicket.value = null
}

const spas = ref<Spa[]>([
  {
    id: 1, name: 'Bliss Spa',
    tickets: [
      {
        id: 1, issue: 'Cannot process online payments', date: 'Mar 12, 2025', status: 'Open',
        messages: [
          { id: 1, sender: 'tenant', text: 'Hi, we are unable to process online payments since this morning.', time: '9:00 AM' },
          { id: 2, sender: 'admin', text: 'Hi! We are looking into this. Can you tell us which payment method is failing?', time: '9:15 AM' },
          { id: 3, sender: 'tenant', text: 'It seems like GCash and Maya are both not working.', time: '9:20 AM' },
        ]
      },
      {
        id: 2, issue: 'Dashboard not loading', date: 'Mar 8, 2025', status: 'Resolved',
        messages: [
          { id: 1, sender: 'tenant', text: 'Our dashboard is showing a blank screen after logging in.', time: '10:00 AM' },
          { id: 2, sender: 'admin', text: 'We pushed a fix. Please clear your cache and try again.', time: '10:45 AM' },
          { id: 3, sender: 'tenant', text: 'It is working now, thank you!', time: '11:00 AM' },
        ]
      }
    ]
  },
  {
    id: 2, name: 'Serenity Wellness',
    tickets: [
      {
        id: 3, issue: 'Queue not updating in real-time', date: 'Mar 10, 2025', status: 'In Progress',
        messages: [
          { id: 1, sender: 'tenant', text: 'The queue display is not refreshing automatically.', time: '11:00 AM' },
          { id: 2, sender: 'admin', text: 'We have identified the issue and are pushing a fix now.', time: '11:30 AM' },
        ]
      }
    ]
  },
  {
    id: 3, name: 'Zen Garden Spa',
    tickets: [
      {
        id: 4, issue: 'Loyalty points not syncing', date: 'Mar 8, 2025', status: 'Resolved',
        messages: [
          { id: 1, sender: 'tenant', text: 'Customer loyalty points are not showing up after a completed session.', time: '2:00 PM' },
          { id: 2, sender: 'admin', text: 'This has been fixed in the latest update. Please refresh your dashboard.', time: '3:00 PM' },
          { id: 3, sender: 'tenant', text: 'It is working now, thank you!', time: '3:15 PM' },
        ]
      }
    ]
  },
  {
    id: 4, name: 'Aurora Spa',
    tickets: [
      {
        id: 5, issue: 'SMS notifications not sending', date: 'Mar 5, 2025', status: 'Resolved',
        messages: [
          { id: 1, sender: 'tenant', text: 'Our clients are not receiving SMS confirmations after booking.', time: '8:00 AM' },
          { id: 2, sender: 'admin', text: 'Found a configuration issue on our SMS provider. It has been resolved.', time: '10:00 AM' },
        ]
      }
    ]
  },
  {
    id: 5, name: 'Lotus Beauty',
    tickets: [
      {
        id: 6, issue: 'Unable to add new therapist', date: 'Feb 28, 2025', status: 'Open',
        messages: [
          { id: 1, sender: 'tenant', text: 'We are trying to add a new therapist but the button is grayed out.', time: '4:00 PM' },
          { id: 2, sender: 'admin', text: 'This may be a plan limit issue. How many therapists are currently registered?', time: '4:30 PM' },
          { id: 3, sender: 'tenant', text: 'We have 5 therapists. Is that the limit for our plan?', time: '4:45 PM' },
        ]
      }
    ]
  },
])

const sendReply = () => {
  if (!reply.value.trim() || !selectedTicket.value) return
  selectedTicket.value.messages.push({
    id: selectedTicket.value.messages.length + 1,
    sender: 'admin',
    text: reply.value.trim(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  })
  reply.value = ''
}
</script>
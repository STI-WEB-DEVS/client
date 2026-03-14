<template>
  <div class="space-y-7">

    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <button @click="prevMonth" class="flex items-center justify-center text-sm transition-colors border rounded-sm w-7 h-7 border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700">‹</button>
        <p class="font-serif text-base text-stone-900 font-normal tracking-tight min-w-[140px] text-center">{{ monthLabel }}</p>
        <button @click="nextMonth" class="flex items-center justify-center text-sm transition-colors border rounded-sm w-7 h-7 border-stone-200 text-stone-400 hover:border-stone-400 hover:text-stone-700">›</button>
      </div>
      <div class="flex items-center gap-2">
        <button @click="goToday" class="px-3 py-1.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors">Today</button>
        <button
          @click="showModal = true"
          class="flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors"
        >
          <span class="text-base leading-none">+</span> New event
        </button>
      </div>
    </div>

    <!-- Calendar grid -->
    <div class="overflow-hidden bg-white border rounded-sm border-stone-200">

      <!-- Day headers -->
      <div class="grid grid-cols-7 border-b border-stone-200">
        <div
          v-for="day in dayHeaders"
          :key="day"
          class="py-2.5 text-center text-[10px] font-sans font-medium text-stone-300 uppercase tracking-widest"
        >{{ day }}</div>
      </div>

      <!-- Day cells -->
      <div class="grid grid-cols-7">
        <div
          v-for="(cell, i) in calendarCells"
          :key="i"
          class="min-h-[90px] border-b border-r border-stone-100 p-1.5 last:border-r-0 transition-colors"
          :class="{
            'bg-stone-50': !cell.currentMonth,
            'cursor-pointer hover:bg-stone-50': cell.currentMonth,
            'border-r-0': (i + 1) % 7 === 0,
          }"
          @click="cell.currentMonth && selectDay(cell)"
        >
          <div class="flex items-center justify-center w-6 h-6 mx-auto mb-1 rounded-sm"
            :class="{
              'bg-stone-900 text-[#F7F6F3]': cell.isToday,
              'text-stone-300': !cell.currentMonth,
              'text-stone-900': cell.currentMonth && !cell.isToday,
            }"
          >
            <span class="text-[11px] font-sans font-medium">{{ cell.day }}</span>
          </div>
          <div class="space-y-0.5">
            <div
              v-for="event in cell.events"
              :key="event.id"
              class="px-1.5 py-0.5 rounded-sm text-[10px] font-sans truncate cursor-pointer hover:opacity-70 transition-opacity"
              :class="{
                'bg-stone-900 text-[#F7F6F3]': event.color === 'dark',
                'bg-green-50 text-green-700': event.color === 'green',
                'bg-amber-50 text-amber-700': event.color === 'amber',
                'bg-blue-50 text-blue-700': event.color === 'blue',
              }"
              @click.stop="selectedEvent = event; showEventModal = true"
            >{{ event.title }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upcoming events -->
    <div>
      <p class="text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-3">Upcoming</p>
      <div class="space-y-2">
        <div
          v-for="event in upcomingEvents"
          :key="event.id"
          class="flex items-center gap-4 px-4 py-3 transition-colors bg-white border rounded-sm cursor-pointer border-stone-200 hover:border-stone-400"
          @click="selectedEvent = event; showEventModal = true"
        >
          <div class="text-center min-w-[36px]">
            <p class="text-[10px] font-sans text-stone-300 uppercase tracking-wider">{{ event.monthShort }}</p>
            <p class="font-serif text-lg font-normal leading-tight text-stone-900">{{ event.dayNum }}</p>
          </div>
          <div class="flex-shrink-0 w-px h-8 bg-stone-100"></div>
          <div class="flex-1 min-w-0">
            <p class="font-sans text-sm font-medium truncate text-stone-900">{{ event.title }}</p>
            <p class="text-[11px] font-sans text-stone-400 mt-0.5">{{ event.time }} · {{ event.location }}</p>
          </div>
          <span
            class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm flex-shrink-0"
            :class="{
              'bg-stone-900 text-[#F7F6F3]': event.color === 'dark',
              'bg-green-50 text-green-700': event.color === 'green',
              'bg-amber-50 text-amber-700': event.color === 'amber',
              'bg-blue-50 text-blue-700': event.color === 'blue',
            }"
          >{{ event.tag }}</span>
        </div>
      </div>
    </div>

    <!-- New event modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50"
      @click.self="showModal = false"
    >
      <div class="w-full max-w-md p-8 bg-white border rounded-sm border-stone-200">
        <div class="flex items-center justify-between mb-6">
          <p class="font-serif text-base font-normal text-stone-900">New event</p>
          <button @click="showModal = false" class="text-xl leading-none transition-colors text-stone-300 hover:text-stone-700">&times;</button>
        </div>
        <div class="space-y-4">
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Title</label>
            <input v-model="newEvent.title" type="text" placeholder="Event title"
              class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
          </div>
          <div class="grid grid-cols-2 gap-3">
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Date</label>
              <input v-model="newEvent.date" type="date"
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors" />
            </div>
            <div>
              <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Time</label>
              <input v-model="newEvent.time" type="text" placeholder="e.g. 2:00 PM"
                class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
            </div>
          </div>
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Location</label>
            <input v-model="newEvent.location" type="text" placeholder="e.g. Conference Room A"
              class="w-full px-3 py-2.5 text-sm font-sans text-stone-900 bg-stone-50 border border-stone-300 rounded-sm outline-none focus:border-stone-900 focus:bg-white transition-colors placeholder:text-stone-300" />
          </div>
          <div>
            <label class="block text-[10px] font-sans font-medium text-stone-400 uppercase tracking-widest mb-1.5">Type</label>
            <div class="flex flex-wrap gap-2">
              <button
                v-for="type in eventTypes"
                :key="type.value"
                @click="newEvent.color = type.value"
                class="px-3 py-1.5 text-[10px] font-sans uppercase tracking-widest rounded-sm border transition-colors"
                :class="newEvent.color === type.value
                  ? 'bg-stone-900 text-[#F7F6F3] border-stone-900'
                  : 'bg-white text-stone-400 border-stone-200 hover:border-stone-400'"
              >{{ type.label }}</button>
            </div>
          </div>
        </div>
        <div class="flex gap-2 mt-6">
          <button @click="showModal = false"
            class="flex-1 py-2.5 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-stone-400 hover:text-stone-700 transition-colors">Cancel</button>
          <button @click="addEvent"
            class="flex-1 py-2.5 bg-stone-900 text-[#F7F6F3] text-[10px] font-sans font-medium uppercase tracking-widest rounded-sm hover:bg-stone-700 transition-colors">Create</button>
        </div>
      </div>
    </div>

    <!-- Event detail modal -->
    <div
      v-if="showEventModal && selectedEvent"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/50"
      @click.self="showEventModal = false"
    >
      <div class="w-full max-w-sm p-8 bg-white border rounded-sm border-stone-200">
        <div class="flex items-start justify-between mb-5">
          <div>
            <p class="font-serif text-base font-normal text-stone-900">{{ selectedEvent.title }}</p>
            <p class="text-[11px] font-sans text-stone-400 mt-1">{{ selectedEvent.time }} · {{ selectedEvent.location }}</p>
          </div>
          <button @click="showEventModal = false" class="ml-4 text-xl leading-none transition-colors text-stone-300 hover:text-stone-700">&times;</button>
        </div>
        <div class="pt-4 space-y-2 border-t border-stone-100">
          <div class="flex justify-between font-sans text-xs">
            <span class="text-stone-400 uppercase tracking-widest text-[10px]">Date</span>
            <span class="text-stone-700">{{ selectedEvent.monthShort }} {{ selectedEvent.dayNum }}</span>
          </div>
          <div class="flex justify-between font-sans text-xs">
            <span class="text-stone-400 uppercase tracking-widest text-[10px]">Type</span>
            <span
              class="inline-block px-2 py-0.5 text-[10px] uppercase tracking-wider font-medium rounded-sm"
              :class="{
                'bg-stone-900 text-[#F7F6F3]': selectedEvent.color === 'dark',
                'bg-green-50 text-green-700': selectedEvent.color === 'green',
                'bg-amber-50 text-amber-700': selectedEvent.color === 'amber',
                'bg-blue-50 text-blue-700': selectedEvent.color === 'blue',
              }"
            >{{ selectedEvent.tag }}</span>
          </div>
        </div>
        <button
          @click="deleteEvent(selectedEvent.id); showEventModal = false"
          class="mt-5 w-full py-2 border border-stone-200 text-[10px] font-sans uppercase tracking-widest text-stone-400 rounded-sm hover:border-red-300 hover:text-red-500 transition-colors"
        >Remove event</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const today = new Date()
const currentYear = ref(today.getFullYear())
const currentMonth = ref(today.getMonth())

const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const monthLabel = computed(() => {
  return new Date(currentYear.value, currentMonth.value, 1)
    .toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
})

const prevMonth = () => {
  if (currentMonth.value === 0) { currentMonth.value = 11; currentYear.value-- }
  else currentMonth.value--
}

const nextMonth = () => {
  if (currentMonth.value === 11) { currentMonth.value = 0; currentYear.value++ }
  else currentMonth.value++
}

const goToday = () => {
  currentMonth.value = today.getMonth()
  currentYear.value = today.getFullYear()
}

const events = ref([
  { id: 1, title: 'Team standup', date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()).padStart(2,'0')}`, time: '9:00 AM', location: 'Zoom', color: 'dark', tag: 'Meeting' },
  { id: 2, title: 'Atlas review', date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()+2).padStart(2,'0')}`, time: '2:00 PM', location: 'Room A', color: 'green', tag: 'Project' },
  { id: 3, title: 'Client call', date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()+4).padStart(2,'0')}`, time: '11:00 AM', location: 'Google Meet', color: 'amber', tag: 'Client' },
  { id: 4, title: 'Sprint planning', date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()+6).padStart(2,'0')}`, time: '10:00 AM', location: 'Room B', color: 'blue', tag: 'Planning' },
  { id: 5, title: 'Design sync', date: `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,'0')}-${String(today.getDate()+9).padStart(2,'0')}`, time: '3:00 PM', location: 'Zoom', color: 'green', tag: 'Project' },
])

const calendarCells = computed(() => {
  const firstDay = new Date(currentYear.value, currentMonth.value, 1).getDay()
  const daysInMonth = new Date(currentYear.value, currentMonth.value + 1, 0).getDate()
  const daysInPrev = new Date(currentYear.value, currentMonth.value, 0).getDate()
  const cells = []

  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ day: daysInPrev - i, currentMonth: false, isToday: false, events: [], date: '' })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${currentYear.value}-${String(currentMonth.value + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
    const isToday = d === today.getDate() && currentMonth.value === today.getMonth() && currentYear.value === today.getFullYear()
    const dayEvents = events.value.filter(e => e.date === dateStr)
    cells.push({ day: d, currentMonth: true, isToday, events: dayEvents, date: dateStr })
  }

  const remaining = 42 - cells.length
  for (let d = 1; d <= remaining; d++) {
    cells.push({ day: d, currentMonth: false, isToday: false, events: [], date: '' })
  }
  return cells
})

const upcomingEvents = computed(() => {
  const todayStr = today.toISOString().split('T')[0]
  return events.value
    .filter(e => e.date >= todayStr)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 5)
    .map(e => {
      const d = new Date(e.date + 'T00:00:00')
      return {
        ...e,
        monthShort: d.toLocaleDateString('en-US', { month: 'short' }),
        dayNum: d.getDate(),
      }
    })
})

const showModal = ref(false)
const showEventModal = ref(false)
const selectedEvent = ref(null)

const eventTypes = [
  { label: 'Meeting', value: 'dark' },
  { label: 'Project', value: 'green' },
  { label: 'Client', value: 'amber' },
  { label: 'Planning', value: 'blue' },
]

const newEvent = ref({ title: '', date: '', time: '', location: '', color: 'dark' })

let nextId = 10
const addEvent = () => {
  if (!newEvent.value.title.trim() || !newEvent.value.date) return
  const d = new Date(newEvent.value.date + 'T00:00:00')
  events.value.push({
    id: nextId++,
    title: newEvent.value.title,
    date: newEvent.value.date,
    time: newEvent.value.time || 'All day',
    location: newEvent.value.location || '—',
    color: newEvent.value.color,
    tag: eventTypes.find(t => t.value === newEvent.value.color)?.label || 'Event',
  })
  newEvent.value = { title: '', date: '', time: '', location: '', color: 'dark' }
  showModal.value = false
}

const deleteEvent = (id: number) => {
  events.value = events.value.filter(e => e.id !== id)
}

const selectDay = (cell: any) => {
  newEvent.value.date = cell.date
  showModal.value = true
}
</script>
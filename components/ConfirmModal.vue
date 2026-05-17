<template>
  <teleport to="body">
    <transition name="fade">
      <div v-if="open" class="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
        <div class="absolute inset-0 bg-stone-950/40 backdrop-blur-sm" @click="$emit('close')" />
        <div class="relative z-10 w-full max-w-md rounded-[1.5rem] border border-stone-200 bg-white p-6 shadow-2xl shadow-stone-950/20">
          <div class="flex items-start justify-between gap-4">
            <div>
              <h2 class="text-lg font-bold text-stone-950">{{ title }}</h2>
              <p class="mt-2 text-sm leading-6 text-stone-600">{{ message }}</p>
            </div>
            <button @click="$emit('close')" class="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700">x</button>
          </div>
          <div class="mt-6 flex justify-end gap-3">
            <button @click="$emit('close')" class="rounded-full bg-stone-100 px-4 py-2.5 text-sm font-semibold text-stone-700 transition hover:bg-stone-200">Cancel</button>
            <button @click="$emit('confirm')" class="rounded-full bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-rose-600/15 transition hover:-translate-y-0.5 hover:bg-rose-700">Confirm</button>
          </div>
        </div>
      </div>
    </transition>
  </teleport>
</template>

<script setup lang="ts">
defineProps<{ open: boolean; title: string; message: string }>()
defineEmits<{ (e: 'close'): void; (e: 'confirm'): void }>()
</script>

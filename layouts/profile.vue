<template>
  <div class="min-h-screen bg-stone-100/70 text-slate-900">
    <header class="sticky top-0 z-30 border-b border-stone-300/80 bg-white/85 backdrop-blur">
      <div class="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <p class="text-xs font-semibold uppercase tracking-[0.15em] text-stone-600">BrewSpot Admin</p>
          <h1 class="text-lg font-bold text-slate-900">User Profile</h1>
        </div>
        <NuxtLink to="/dashboard" class="rounded-lg bg-[#6D4C41] px-3 py-2 text-sm font-semibold text-white transition hover:bg-[#5D4037]">Back to Dashboard</NuxtLink>
      </div>
    </header>

    <main class="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      <slot />
    </main>
  </div>
</template>

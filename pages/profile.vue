<template>
  <section class="space-y-8">
    <div class="rounded-2xl bg-gradient-to-br from-[#6D4C41] to-[#4E342E] p-8 text-white shadow-lg">
      <h1 class="text-3xl font-bold">User Profile</h1>
      <p class="mt-2 text-sm text-stone-100/80">Manage your administrator profile and account preferences.</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-3">
      <article class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300 lg:col-span-1">
        <div class="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-[#A1887F] to-[#8D6E63] text-2xl font-bold text-white">CM</div>
        <h2 class="mt-4 text-center text-lg font-bold text-slate-900">Coffee Manager</h2>
        <p class="mt-1 text-center text-sm text-slate-600">Operations Admin</p>
        <p class="mt-3 rounded-lg bg-stone-50 px-3 py-2 text-center text-sm text-stone-700">Davao City</p>
      </article>

      <article class="rounded-xl bg-white p-6 shadow-sm ring-1 ring-stone-300 lg:col-span-2">
        <h2 class="text-lg font-bold text-slate-900">Profile Details</h2>
        <p class="mt-1 text-sm text-slate-600">Keep your account information up to date.</p>

        <div class="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wide text-stone-500">Full Name</label>
            <input type="text" value="Coffee Manager" class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#8D6E63]" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wide text-stone-500">Role</label>
            <input type="text" value="Operations Admin" class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#8D6E63]" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wide text-stone-500">Email</label>
            <input type="email" value="manager@brewspot.app" class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#8D6E63]" />
          </div>
          <div>
            <label class="block text-xs font-semibold uppercase tracking-wide text-stone-500">Phone</label>
            <input type="text" value="+63 912 000 1122" class="mt-1 w-full rounded-lg border border-stone-300 px-3 py-2 text-sm outline-none focus:border-[#8D6E63]" />
          </div>
        </div>

        <div class="mt-5">
          <button type="button" class="rounded-lg bg-[#6D4C41] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#5D4037]">Save Changes</button>
        </div>
      </article>
    </div>
  </section>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'profile',
})
</script>

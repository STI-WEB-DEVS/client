<template>

<div>

<h1 class="text-2xl font-bold border-b p-6">
Settings
</h1>

<div class="flex gap-6 border-b px-6 py-3">
  <NuxtLink to="/setting/general">General</NuxtLink>
  <NuxtLink to="/setting/security">Security</NuxtLink>
</div>

<main class="p-6">
  <slot />
</main>

</div>

</template>
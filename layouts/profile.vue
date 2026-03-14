<template>
  <div>

    <!-- Profile header -->
    <div class="border-b bg-white p-6">
      <h1 class="text-2xl font-bold">Profile</h1>
    </div>

    <!-- Profile navigation -->
    <div class="flex gap-6 border-b px-6 py-3">
      <NuxtLink to="/profile">Overview</NuxtLink>
      <NuxtLink to="/profile/activity">Activity</NuxtLink>
      <NuxtLink to="/profile/documents">Documents</NuxtLink>
    </div>

    <!-- Page content -->
    <main class="p-6">
      <slot />
    </main>

  </div>
</template>
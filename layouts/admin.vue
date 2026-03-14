<template>
  <div class="nm-layout">
    <AdminSidebar />
    <div class="nm-main">
      <AdminTopBar />
      <main class="nm-content">
        <slot />
      </main>
    </div>
  </div>
</template>

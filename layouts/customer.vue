<template>
  <div class="min-h-screen bg-gray-50">

    <header class="border-b border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div class="text-xl font-bold text-gray-900">
          My Store
        </div>
 
        
        <div class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
          <span>Shop</span>
          <span>Categories</span>
          <span>Orders</span>
          <span>Account</span>
        </div>

        <div class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700">
          Cart
        </div>
      </div>
    </header>


    <main>
      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>

        <div class="flex gap-6">
          <span>Help</span>
          <span>Contact</span>
          <span>Privacy</span>
        </div>
      </div>
    </footer>

  </div>
</template>
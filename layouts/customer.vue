<template>
  <div class="min-h-screen bg-gray-50">

  <!-- Header -->
      <header class="border-b border-gray-200 bg-white">
        <div class="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
  
          <div class="text-xl font-bold text-gray-900">
            My Store
          </div>
  
          <nav class="hidden items-center gap-8 text-sm font-medium text-gray-600 md:flex">
            <a href="#" class="hover:text-indigo-600">Shop</a>
            <a href="#" class="hover:text-indigo-600">Categories</a>
            <a href="#" class="hover:text-indigo-600">Orders</a>
            <a href="#" class="hover:text-indigo-600">Account</a>
          </nav>
  
          <button
            class="rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700"
          >
            Cart
          </button>
  
        </div>
      </header>

    <main>
      <section class="mx-auto max-w-7xl px-4 py-5 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

    <footer class="border-t border-gray-200 bg-white">
      <div class="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-gray-500 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <p>© 2026 My Store. All rights reserved.</p>
        <div class="flex gap-6 font-medium">
          <span>Help</span><span>Contact</span><span>Privacy</span>
        </div>
      </div>
    </footer>


  </div>
</template>
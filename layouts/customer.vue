<template>
  <div class="min-h-screen bg-gray-50">

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
      <section class="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <slot />
      </section>
    </main>

  </div>
</template>
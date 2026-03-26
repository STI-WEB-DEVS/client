<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <!-- Replace logo with EntryPoint.png -->
      <img 
        class="mx-auto h-40 w-auto" 
        src="~/assets/EntryPoint Brown.png" 
        alt="EntryPoint Logo" 
      />
      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <form class="space-y-6" method="POST" @submit.prevent="handleSubmit">
          <div>
            <label for="email" class="block text-sm/6 font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <input 
                type="email" 
                name="email" 
                id="email" 
                autocomplete="email" 
                required 
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#543923] sm:text-sm/6" 
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm/6 font-medium text-gray-900">Password</label>
            <div class="mt-2">
              <input 
                type="password" 
                name="password" 
                id="password" 
                autocomplete="current-password" 
                required 
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-[#543923] sm:text-sm/6" 
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              <div class="flex h-6 shrink-0 items-center">
                <input id="remember-me" name="remember-me" type="checkbox" class="rounded border border-gray-300 bg-white checked:border-[#543923] checked:bg-[#543923]" />
              </div>
              <label for="remember-me" class="block text-sm/6 text-gray-900">Remember me</label>
            </div>

            <div class="text-sm/6">
              <a href="#" class="font-semibold text-[#543923] hover:text-[#402911]">Forgot password?</a>
            </div>
          </div>

          <div>
            <button type="submit" class="flex w-full justify-center rounded-md bg-[#543923] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm hover:bg-[#402911] focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-[#543923]">
              Sign in
            </button>
          </div>
        </form>

        <div>
          <div class="mt-10 flex items-center gap-x-6">
            <div class="w-full flex-1 border-t border-gray-200"></div>
            <p class="text-nowrap text-sm/6 font-medium text-gray-900">Or continue with</p>
            <div class="w-full flex-1 border-t border-gray-200"></div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <!-- Social logins remain the same -->
            <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <!-- Google icon paths -->
              </svg>
              <span class="text-sm/6 font-semibold">Google</span>
            </a>

            <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
              <svg class="size-5 fill-[#24292F]" aria-hidden="true" viewBox="0 0 20 20">
                <!-- GitHub icon path -->
              </svg>
              <span class="text-sm/6 font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <p class="mt-10 text-center text-sm/6 text-gray-500">
        Not a member?
        <a href="#" class="font-semibold text-[#543923] hover:text-[#402911]">Start a 14 day free trial</a>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '~/assets/EntryPoint.png'

const handleSubmit = async () => {
  await navigateTo('/dashboard')
}
</script>
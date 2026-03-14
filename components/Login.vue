<template>
  <div class="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8" style="background: #0d0608; min-height: 100vh;">

    <!-- Top branding -->
    <div class="sm:mx-auto sm:w-full sm:max-w-md">

      <!-- Logo mark -->
      <div class="mx-auto flex items-center justify-center" style="width: 56px; height: 56px; background: linear-gradient(135deg, #c0392b, #7b241c); border-radius: 14px; box-shadow: 0 8px 24px rgba(192,57,43,0.4);">
        <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" style="width: 36px; height: 36px;">
          <path d="M20 4 C20 4 6 16 6 24 C6 31.732 12.268 38 20 38 C27.732 38 34 31.732 34 24 C34 16 20 4 20 4Z" fill="white" fill-opacity="0.92"/>
          <rect x="18" y="20" width="4" height="10" rx="2" fill="#c0392b"/>
          <rect x="14" y="24" width="12" height="4" rx="2" fill="#c0392b"/>
        </svg>
      </div>

      <!-- System title -->
      <h1 class="mt-4 text-center font-bold tracking-tight" style="font-family: 'Georgia', 'Times New Roman', serif; font-size: 1.6rem; color: #ffffff; letter-spacing: -0.02em;">
        KaDugo
      </h1>
      <p class="mt-1 text-center" style="font-size: 0.72rem; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.12em;">
        Blood Donation &amp; Management System
      </p>

      <h2 class="mt-6 text-center text-2xl/9 font-bold tracking-tight" style="color: rgba(255,255,255,0.9);">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
      <div class="px-6 py-12 shadow sm:rounded-lg sm:px-12" style="background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; backdrop-filter: blur(20px);">

        <form class="space-y-6" method="POST" @submit.prevent="handleSubmit">

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm/6 font-medium" style="color: rgba(255,255,255,0.6); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em;">
              Email address
            </label>
            <div class="mt-2">
              <input
                type="email"
                name="email"
                id="email"
                autocomplete="email"
                required="true"
                placeholder=" "
                class="block w-full rounded-md px-3 py-1.5 text-base sm:text-sm/6"
                style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 10px; outline: none; padding: 0.75rem 1rem; font-size: 0.9rem; transition: border-color 0.2s, box-shadow 0.2s;"
                onfocus="this.style.borderColor='#e74c3c'; this.style.boxShadow='0 0 0 3px rgba(231,76,60,0.15)'"
                onblur="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.boxShadow='none'"
              />
            </div>
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm/6 font-medium" style="color: rgba(255,255,255,0.6); font-size: 0.78rem; text-transform: uppercase; letter-spacing: 0.06em;">
              Password
            </label>
            <div class="mt-2">
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="current-password"
                required="true"
                placeholder=""
                class="block w-full rounded-md px-3 py-1.5 text-base sm:text-sm/6"
                style="background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.1); color: white; border-radius: 10px; outline: none; padding: 0.75rem 1rem; font-size: 0.9rem; transition: border-color 0.2s, box-shadow 0.2s;"
                onfocus="this.style.borderColor='#e74c3c'; this.style.boxShadow='0 0 0 3px rgba(231,76,60,0.15)'"
                onblur="this.style.borderColor='rgba(255,255,255,0.1)'; this.style.boxShadow='none'"
              />
            </div>
          </div>

          <!-- Remember me + Forgot -->
          <div class="flex items-center justify-between">
            <div class="flex gap-3">
              <div class="flex h-6 shrink-0 items-center">
                <div class="group grid size-4 grid-cols-1">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    class="col-start-1 row-start-1 appearance-none rounded border bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto"
                    style="border-color: rgba(255,255,255,0.2); background: transparent; accent-color: #c0392b;"
                  />
                  <svg class="pointer-events-none col-start-1 row-start-1 size-3.5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25" viewBox="0 0 14 14" fill="none">
                    <path class="opacity-0 group-has-[:checked]:opacity-100" d="M3 8L6 11L11 3.5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                    <path class="opacity-0 group-has-[:indeterminate]:opacity-100" d="M3 7H11" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  </svg>
                </div>
              </div>
              <label for="remember-me" class="block text-sm/6" style="color: rgba(255,255,255,0.5);">Remember me</label>
            </div>

            <div class="text-sm/6">
              <a href="#" class="font-semibold" style="color: #e74c3c;" onmouseover="this.style.color='#ff6b6b'" onmouseout="this.style.color='#e74c3c'">Forgot password?</a>
            </div>
          </div>

          <!-- Submit -->
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
              style="background: linear-gradient(135deg, #c0392b, #e74c3c); border: none; border-radius: 10px; padding: 0.85rem; font-size: 0.95rem; font-weight: 600; cursor: pointer; box-shadow: 0 4px 16px rgba(192,57,43,0.4); transition: transform 0.15s, box-shadow 0.15s; letter-spacing: 0.01em;"
              onmouseover="this.style.transform='translateY(-1px)'; this.style.boxShadow='0 6px 22px rgba(192,57,43,0.5)'"
              onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 16px rgba(192,57,43,0.4)'"
            >
              Sign in to Portal
            </button>
          </div>
        </form>

        <!-- Divider -->
        <div>
          <div class="mt-10 flex items-center gap-x-6">
            <div class="w-full flex-1 border-t" style="border-color: rgba(255,255,255,0.08);"></div>
            <p class="text-nowrap text-sm/6 font-medium" style="color: rgba(255,255,255,0.35);">Or continue with</p>
            <div class="w-full flex-1 border-t" style="border-color: rgba(255,255,255,0.08);"></div>
          </div>

          <div class="mt-6 grid grid-cols-2 gap-4">
            <a
              href="#"
              class="flex w-full items-center justify-center gap-3 rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.75); transition: background 0.15s;"
              onmouseover="this.style.background='rgba(255,255,255,0.09)'"
              onmouseout="this.style.background='rgba(255,255,255,0.05)'"
            >
              <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
              </svg>
              <span class="text-sm/6 font-semibold">Google</span>
            </a>

            <a
              href="#"
              class="flex w-full items-center justify-center gap-3 rounded-md px-3 py-2 text-sm font-semibold shadow-sm"
              style="background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1); border-radius: 10px; color: rgba(255,255,255,0.75); transition: background 0.15s;"
              onmouseover="this.style.background='rgba(255,255,255,0.09)'"
              onmouseout="this.style.background='rgba(255,255,255,0.05)'"
            >
              <svg class="size-5" aria-hidden="true" fill="white" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd" />
              </svg>
              <span class="text-sm/6 font-semibold">GitHub</span>
            </a>
          </div>
        </div>
      </div>

      <!-- Footer note -->
      <p class="mt-10 text-center text-sm/6" style="color: rgba(255,255,255,0.3);">
        Emergency Hotline:
        <a href="#" class="font-semibold" style="color: rgba(255,255,255,0.55);">1-800-KADUGO</a>
      </p>
    </div>

  </div>
</template>

<script setup lang="ts">
    const handleSubmit = async () => {
    // Since there is no BE, we just trigger the redirect immediately
    await navigateTo('/dashboard') 
    }
</script>
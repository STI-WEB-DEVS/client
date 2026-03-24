<template>
  <NuxtLayout>
    <div class="max-w-5xl mx-auto space-y-10">
        <div>
        <h1 class="text-2xl font-bold leading-7 text-[#CFFFB3] sm:truncate sm:text-3xl sm:tracking-tight">Settings</h1>
        <p class="mt-2 text-sm text-[#ADE25D]">Manage application preferences, notifications, and security.</p>
        </div>

        <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 border-t border-[#3B7080] md:grid-cols-3">
        <div class="px-4 sm:px-0">
            <h2 class="text-base font-semibold leading-7 text-[#CFFFB3]">Security & Password</h2>
            <p class="mt-1 text-sm leading-6 text-[#ADE25D]">Update your password associated with your admin account.</p>
        </div>

        <form class="bg-black/10 ring-1 ring-[#3B7080] rounded-xl shadow-sm md:col-span-2">
            <div class="px-4 py-6 sm:p-8">
            <div class="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div class="col-span-full">
                <label for="current-password" class="block text-sm font-medium leading-6 text-[#CFFFB3]">Current password</label>
                <div class="mt-2">
                    <input id="current-password" name="current_password" type="password" class="block w-full rounded-md border-0 bg-black/20 py-1.5 text-[#CFFFB3] shadow-sm ring-1 ring-inset ring-[#3B7080] focus:ring-2 focus:ring-inset focus:ring-[#ADE25D] sm:text-sm sm:leading-6" />
                </div>
                </div>

                <div class="col-span-full">
                <label for="new-password" class="block text-sm font-medium leading-6 text-[#CFFFB3]">New password</label>
                <div class="mt-2">
                    <input id="new-password" name="new_password" type="password" class="block w-full rounded-md border-0 bg-black/20 py-1.5 text-[#CFFFB3] shadow-sm ring-1 ring-inset ring-[#3B7080] focus:ring-2 focus:ring-inset focus:ring-[#ADE25D] sm:text-sm sm:leading-6" />
                </div>
                </div>
            </div>
            </div>
            <div class="flex items-center justify-end gap-x-6 border-t border-[#3B7080] px-4 py-4 sm:px-8">
            <button type="submit" class="rounded-md bg-[#ADE25D] px-4 py-2 text-sm font-semibold text-[#3A5743] shadow-sm hover:bg-[#CFFFB3] transition-colors">Update password</button>
            </div>
        </form>
        </div>

        <div class="grid grid-cols-1 gap-x-8 gap-y-8 pt-10 border-t border-[#3B7080] md:grid-cols-3">
        <div class="px-4 sm:px-0">
            <h2 class="text-base font-semibold leading-7 text-[#CFFFB3]">Notifications</h2>
            <p class="mt-1 text-sm leading-6 text-[#ADE25D]">Decide what administrative alerts you'd like to receive.</p>
        </div>

        <div class="bg-black/10 ring-1 ring-[#3B7080] rounded-xl shadow-sm md:col-span-2">
            <div class="px-4 py-6 sm:p-8 space-y-6">
            
            <fieldset>
                <legend class="text-sm font-semibold leading-6 text-[#CFFFB3]">By Email</legend>
                <div class="mt-4 space-y-4">
                <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                    <input id="new-tours" name="new-tours" type="checkbox" checked class="h-4 w-4 rounded border-[#3B7080] bg-black/20 text-[#ADE25D] focus:ring-[#ADE25D]" />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                    <label for="new-tours" class="font-medium text-[#CFFFB3]">New Tours Created</label>
                    <p class="text-[#ADE25D]/70">Get notified when an organizer creates a new hiking tour.</p>
                    </div>
                </div>
                <div class="relative flex items-start">
                    <div class="flex h-6 items-center">
                    <input id="payouts" name="payouts" type="checkbox" checked class="h-4 w-4 rounded border-[#3B7080] bg-black/20 text-[#ADE25D] focus:ring-[#ADE25D]" />
                    </div>
                    <div class="ml-3 text-sm leading-6">
                    <label for="payouts" class="font-medium text-[#CFFFB3]">Commission Payouts</label>
                    <p class="text-[#ADE25D]/70">Receive an email when commissions are successfully distributed.</p>
                    </div>
                </div>
                </div>
            </fieldset>

            </div>
            <div class="flex items-center justify-end gap-x-6 border-t border-[#3B7080] px-4 py-4 sm:px-8">
            <button type="button" class="rounded-md bg-[#ADE25D] px-4 py-2 text-sm font-semibold text-[#3A5743] shadow-sm hover:bg-[#CFFFB3] transition-colors">Save preferences</button>
            </div>
        </div>
        </div>
    </div>
  </NuxtLayout>
</template>
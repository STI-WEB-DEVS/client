<template>
  <div>
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900">Account Profile</h1>
      <p class="text-sm/6 text-gray-500 mt-1">Update your personal details and manage your account.</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      
      <div class="lg:col-span-1">
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm p-6 text-center">
          <div class="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-4 border-4 border-white shadow-inner"></div>
          <h2 class="text-xl font-bold text-gray-900">Dedrich Bryce Arce</h2>
          <p class="text-sm/6 text-gray-500">Senior Product Designer</p>
          <button class="mt-6 w-full px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm/6 font-medium text-gray-700 hover:bg-gray-50 shadow-sm">
            Change Avatar
          </button>
        </div>
      </div>

      <div class="lg:col-span-2 space-y-6">
        <section class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Personal Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block text-sm/6 font-medium text-gray-900 mb-2">First Name</label>
              <input type="text" value="Jane" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
            </div>
            <div>
              <label class="block text-sm/6 font-medium text-gray-900 mb-2">Last Name</label>
              <input type="text" value="Doe" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">
            </div>
            <div class="md:col-span-2">
              <label class="block text-sm/6 font-medium text-gray-900 mb-2">Bio</label>
              <textarea rows="3" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-green-600 sm:text-sm/6">Passionate about design systems and user-centric architecture.</textarea>
            </div>
          </div>
        </section>

        <div class="flex justify-end gap-3">
          <button class="px-3 py-1.5 bg-white border border-gray-300 rounded-md text-sm/6 font-medium text-gray-700 hover:bg-gray-50 shadow-sm">Cancel</button>
          <button class="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm/6 font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600">Save Profile</button>
        </div>
      </div>
    </div>
  </div>
</template>
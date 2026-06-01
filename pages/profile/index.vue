<template>
  <NuxtLayout>
    <div class="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div class="max-w-3xl mx-auto">
        
        <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
          
          <div class="p-8 border-b border-gray-100">
            <div class="flex flex-col sm:flex-row items-center gap-6">
              <img 
                src="https://www.apple.com/leadership/images/bio/tim-cook_image.png.og.png" 
                alt="Gio Matindo" 
                class="w-24 h-24 rounded-full object-cover border border-gray-200 bg-gray-50"
              />
              
              <div class="text-center sm:text-left flex-1">
                <h1 class="text-2xl font-bold text-gray-900 tracking-tight">Gio Matindo</h1>
                <p class="text-gray-500 font-medium">Chief Executive Officer</p>
                <div class="mt-2 flex flex-wrap justify-center sm:justify-start gap-3">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Online
                  </span>
                  <span class="text-sm text-gray-400">Cupertino, California</span>
                </div>
              </div>

              <div class="flex gap-2">
                <button class="px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  Edit
                </button>
                <button @click="navigateTo('/logout')" class="px-4 py-2 text-sm font-semibold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50 transition-colors">
                  Logout
                </button>
              </div>
            </div>
          </div>

          <div class="p-8 space-y-8">
            <section>
              <h2 class="text-sm font-bold text-gray-400 uppercase tracking-wider mb-3">About</h2>
              <p class="text-gray-600 leading-relaxed">
                Focused on innovation, environmental sustainability, and privacy. Leading Apple’s global operations and long-term strategy.
              </p>
            </section>

            <section class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</h3>
                <p class="text-sm text-gray-900">tcook@apple.com</p>
              </div>
              <div>
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Department</h3>
                <p class="text-sm text-gray-900">Executive Leadership</p>
              </div>
              <div>
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Role</h3>
                <p class="text-sm text-gray-900">Administrator</p>
              </div>
              <div>
                <h3 class="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Joined</h3>
                <p class="text-sm text-gray-900">March 1998</p>
              </div>
            </section>
          </div>

        </div>

        <p class="mt-6 text-center text-xs text-gray-400">
          Last account activity: 2 minutes ago
        </p>
      </div>
    </div>
  </NuxtLayout>
</template>
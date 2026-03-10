<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
    <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]"></div>
    <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px]"></div>

    <div class="w-full max-w-md p-4 z-10">
      <div class="bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        <div class="bg-slate-900 p-8 text-center">
          <div class="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-2xl mb-4 shadow-lg shadow-emerald-500/20">
            <span class="text-3xl text-white font-black">P</span>
          </div>
          <h1 class="text-2xl font-bold text-white tracking-tight">SmartPark <span class="text-emerald-400">Admin</span></h1>
          <p class="text-slate-400 text-sm mt-1">Role-based Parking Operations</p>
        </div>

        <div class="p-8">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Staff Email</label>
              <input 
                type="email" 
                required
                placeholder="admin@smartpark.com"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div>
              <label class="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Password</label>
              <input 
                type="password" 
                required
                placeholder="••••••••"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              />
            </div>

            <div class="flex items-center justify-between">
              <label class="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" class="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500" />
                <span class="text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" class="text-sm font-semibold text-emerald-600 hover:text-emerald-700">Forgot Password?</a>
            </div>

            <button 
              type="submit"
              class="w-full bg-slate-900 text-white py-4 rounded-xl font-bold hover:bg-slate-800 transform active:scale-[0.98] transition-all shadow-xl shadow-slate-200"
            >
              Secure Access
            </button>
          </form>

          <p class="text-center text-slate-400 text-xs mt-8">
            SmartPark v2.6.0 | System Operations Authorized Personnel Only
          </p>
        </div>
      </div>
      
    </div>
  </div>
</template>

<script setup>
// Important: Ensures the sidebar layout doesn't show on the login page
definePageMeta({
  layout: false
});

const handleLogin = () => {
  // Requirement: Redirect logic to entry page (Dashboard)
  navigateTo('/dashboard');
};
</script>
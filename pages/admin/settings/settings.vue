<template>
  <NuxtLayout>
    <div class="px-4 py-10 sm:px-6 lg:px-8 bg-gray-50/50 min-h-screen">
      <div class="mx-auto max-w-4xl">
        <div class="border-b border-gray-200 pb-6 mb-8">
          <h1 class="text-2xl font-bold tracking-tight text-gray-900">System Configurations</h1>
          <p class="mt-1 text-sm text-gray-500">Tune environment variables, operational sync triggers, and automated payload pathways.</p>
        </div>

        <div class="space-y-8">
          <section class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 class="text-base font-semibold text-gray-900 mb-1">Telemetry Pipeline Settings</h2>
            <p class="text-xs text-gray-500 mb-6">Configure identifying parameters for active data collectors and ingestion targets.</p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Cluster Node Identifier</label>
                <input 
                  type="text" 
                  class="w-full px-3 py-2 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600/20 outline-none transition" 
                  placeholder="node-v4-ingress-core"
                >
              </div>
              <div>
                <label class="block text-xs font-semibold uppercase tracking-wider text-gray-600 mb-2">Ingestion Endpoint URI</label>
                <input 
                  type="text" 
                  class="w-full px-3 py-2 bg-gray-50/50 border border-gray-300 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:bg-white focus:border-green-600 focus:ring-2 focus:ring-green-600/20 outline-none transition" 
                  placeholder="https://telemetry.cluster.internal/stream"
                >
              </div>
            </div>
          </section>

          <section class="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            <h2 class="text-base font-semibold text-gray-900 mb-1">Automated Alerting Protocol</h2>
            <p class="text-xs text-gray-500 mb-6">Select which anomalous operational shifts dispatch automated status alerts.</p>
            
            <div class="space-y-4">
              <div class="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50/70 transition">
                <div class="max-w-xl">
                  <p class="text-sm font-medium text-gray-900">Delta Variance Thresholds</p>
                  <p class="text-xs text-gray-500 mt-0.5">Dispatch automated diagnostic logs when load shifts drift greater than 10% from baseline vectors.</p>
                </div>
                <div class="flex items-center h-5 ml-4">
                  <input type="checkbox" class="w-4 h-4 text-green-700 bg-gray-100 border-gray-300 rounded focus:ring-green-600 focus:ring-2 focus:ring-offset-1">
                </div>
              </div>
              
              <div class="border-t border-gray-100"></div>
              
              <div class="flex items-start justify-between p-3 rounded-lg hover:bg-gray-50/70 transition">
                <div class="max-w-xl">
                  <p class="text-sm font-medium text-gray-900">Overhead Latency Warning</p>
                  <p class="text-xs text-gray-500 mt-0.5">Trigger immediate critical warnings if pipeline sync overhead breaches the 0.50ms ceiling.</p>
                </div>
                <div class="flex items-center h-5 ml-4">
                  <input type="checkbox" checked class="w-4 h-4 text-green-700 bg-gray-100 border-gray-300 rounded focus:ring-green-600 focus:ring-2 focus:ring-offset-1">
                </div>
              </div>
            </div>
          </section>

          <div class="flex justify-end items-center gap-3 pt-2">
            <button class="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition">Revert Changes</button>
            <button class="px-4 py-2 bg-green-700 hover:bg-green-800 text-white rounded-lg text-sm font-medium shadow-sm transition">Commit Sync Configuration</button>
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup>
</script>
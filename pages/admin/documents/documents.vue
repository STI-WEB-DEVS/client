<template>
  <div>
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
      <div>
        <h1 class="text-2xl font-bold text-gray-900">System Repository</h1>
        <p class="text-sm/6 text-gray-500 mt-1">Review operational manifests, distribution logs, and active environment assets.</p>
      </div>
      <button class="px-3 py-1.5 bg-green-600 text-white rounded-md text-sm/6 font-semibold shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600 flex items-center gap-2">
        <span>Upload File</span>
      </button>
    </div>

    <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
      <table class="w-full text-left border-collapse">
        <thead>
          <tr class="border-b border-gray-200">
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">File Resource</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Extension</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Allocation</th>
            <th class="px-6 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Indexed On</th>
            <th class="px-6 py-3"></th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-100">
          <tr v-for="file in documents" :key="file.name" class="hover:bg-gray-50 transition">
            <td class="px-6 py-4 text-sm/6 font-medium text-gray-900 flex items-center gap-3">
              <span class="text-xl">📄</span> {{ file.name }}
            </td>
            <td class="px-6 py-4 text-sm/6 text-gray-500">{{ file.type }}</td>
            <td class="px-6 py-4 text-sm/6 text-gray-500">{{ file.size }}</td>
            <td class="px-6 py-4 text-sm/6 text-gray-500">{{ file.date }}</td>
            <td class="px-6 py-4 text-right">
              <button class="text-sm/6 font-semibold text-green-600 hover:text-green-500">Download</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
const documents = [
  { name: 'deployment_manifest_v2.json', type: 'JSON', size: '14.2 KB', date: 'May 28, 2026' },
  { name: 'db_cluster_backup_stable.sql', type: 'SQL', size: '184.5 MB', date: 'May 24, 2026' },
  { name: 'network_topology_blueprint.svg', type: 'SVG', size: '1.2 MB', date: 'May 12, 2026' },
  { name: 'server_audit_log_q2.csv', type: 'CSV', size: '4.8 MB', date: 'Apr 30, 2026' },
];
</script>
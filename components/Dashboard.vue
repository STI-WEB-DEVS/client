<template>
        <header class="h-16 bg-white border-b flex items-center justify-between px-8">
            <h1 class="text-lg font-semibold text-slate-800">Dashboard</h1>
        </header>

        <div class="p-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <p class="text-sm text-slate-500 font-medium">Active Buses</p>
                <h3 class="text-2xl font-bold mt-1">10 <span class="text-sm font-normal text-slate-400">/ 14</span></h3>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <p class="text-sm text-slate-500 font-medium">In Route</p>
                <h3 class="text-2xl font-bold mt-1 text-indigo-600">8 <span class="text-sm font-normal text-slate-400">/ 14</span></h3>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm">
                <p class="text-sm text-slate-500 font-medium">Daily Revenue</p>
                <h3 class="text-2xl font-bold mt-1">$12,450</h3>
            </div>
            <div class="bg-white p-6 rounded-xl border border-red-100 shadow-sm">
                <p class="text-sm text-red-500 font-medium">Active Alerts</p>
                <h3 class="text-2xl font-bold mt-1 text-red-600">2</h3>
            </div>
        </div>

        <div class="px-8 pb-8">
            <div class="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
                <div class="p-6 border-b border-gray-50 flex justify-between items-center">
                    <h2 class="font-bold text-slate-800">Live Fleet Status</h2>
                    <button class="bg-brand-teal text-white px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition">
                        + Add New Bus
                    </button>
                </div>
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-gray-50 text-slate-500 text-xs uppercase tracking-wider">
                            <th class="px-6 py-4 font-semibold">Bus ID</th>
                            <th class="px-6 py-4 font-semibold">Route</th>
                            <th class="px-6 py-4 font-semibold">Driver</th>
                            <th class="px-6 py-4 font-semibold">Status</th>
                            <th class="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-50 text-sm text-slate-600">
                        <tr>
                            <td class="px-6 py-4 font-medium text-slate-900">OB-102</td>
                            <td class="px-6 py-4">Express North</td>
                            <td class="px-6 py-4">Sarah Jenkins</td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Moving</span>
                            </td>
                            <td class="px-6 py-4 text-right text-brand-teal font-medium hover:underline cursor-pointer">Track</td>
                        </tr>
                        <tr>
                            <td class="px-6 py-4 font-medium text-slate-900">OB-205</td>
                            <td class="px-6 py-4">Downtown Loop</td>
                            <td class="px-6 py-4">Mike Torres</td>
                            <td class="px-6 py-4">
                                <span class="px-2 py-1 bg-amber-100 text-amber-700 rounded-full text-xs font-medium">Idle</span>
                            </td>
                            <td class="px-6 py-4 text-right text-brand-teal font-medium hover:underline cursor-pointer">Track</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
</template>
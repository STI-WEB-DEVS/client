<template>
    <NuxtLayout>
        <div class="p-6">
            <div class="mb-4">
                <button
                    @click="back"
                    class="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300"
                >
                    ← Back
                </button>
            </div>
            <div
                class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
                <div class="border-b border-gray-200 px-6 py-4">
                    <h2 class="text-lg font-semibold text-gray-800">
                        Customer Details
                    </h2>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>
                                <th
                                    class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    ID
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Name
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Email
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    UUID
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-500"
                                >
                                    Created At
                                </th>
                            </tr>
                        </thead>

                        <tbody
                            v-if="data"
                            class="divide-y divide-gray-100 bg-white"
                        >
                            <tr class="hover:bg-gray-50 transition">
                                <td class="px-6 py-4 font-medium text-gray-900">
                                    #{{ data.id }}
                                </td>

                                <td class="px-6 py-4">
                                    <div class="font-medium text-gray-900">
                                        {{ data.name }}
                                    </div>
                                </td>

                                <td class="px-6 py-4">
                                    {{ data.email }}
                                </td>

                                <td class="px-6 py-4">
                                    <code
                                        class="rounded bg-gray-100 px-2 py-1 text-xs text-gray-700"
                                    >
                                        {{ data.uuid }}
                                    </code>
                                </td>

                                <td class="px-6 py-4 text-gray-600">
                                    {{
                                        new Date(
                                            data.created_at,
                                        ).toLocaleString()
                                    }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { customerService, type Customer } from "@/api/customer/CustomerService";

const route = useRoute();
const router = useRouter();
const data = ref<Customer | null>(null);
const back = () => {
    router.push("/customer");
};
onMounted(async () => {
    try {
        const response = await customerService.show(
            route.params.uuid as string,
        );
        data.value = response;
    } catch (err: any) {
        console.error("failed  customer", err);
    }
});
</script>

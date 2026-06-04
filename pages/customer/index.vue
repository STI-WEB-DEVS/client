<template>
    <NuxtLayout>
        <div class="p-6">
            <div class="overflow-hidden rounded-xl border bg-white shadow-sm">
                <div
                    class="flex items-center justify-between border-b px-6 py-4"
                >
                    <h2 class="text-lg font-semibold text-gray-800">
                        Customer
                    </h2>

                    <button
                        @click="openModal('ADD')"
                        class="rounded-md bg-[#398165] px-4 py-2 text-white hover:bg-[#2f6a53]"
                    >
                        Add Customer
                    </button>
                </div>

                <div class="overflow-x-auto">
                    <table class="min-w-full">
                        <thead class="bg-gray-50">
                            <tr>

                                <th
                                    class="px-6 py-3 text-left text-xs font-semibold text-gray-500"
                                >
                                    Name
                                </th>
                                <th
                                    class="px-6 py-3 text-left text-xs font-semibold text-gray-500"
                                >
                                    Email
                                </th>


                                <th
                                    class="px-6 py-3 text-left text-xs font-semibold text-gray-500"
                                >
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            <tr
                                v-for="data in datas"
                                :key="data.id"
                                class="border-t hover:bg-gray-50"
                            >

                                <td class="px-6 py-4 font-medium">
                                    {{ data.name }}
                                </td>

                                <td class="px-6 py-4">
                                    {{ data.email }}
                                </td>





                                <td class="px-6 py-4">
                                    <div class="flex gap-2">
                                        <button
                                            @click="viewCustomer(data.uuid)"
                                            class="rounded bg-[#398165] px-3 py-1 text-white hover:bg-[#2f6a53]"
                                        >
                                            View
                                        </button>

                                        <button
                                            @click="
                                                openModal('UPDATE', data.uuid)
                                            "
                                            class="rounded bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                                        >
                                            Update
                                        </button>

                                        <button
                                            @click="
                                                openModal('DELETE', data.uuid)
                                            "
                                            class="rounded bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div
                class="flex z-index items-center justify-center"
                v-if="modalType.modal"
            >
                <CustomerModal
                    :modal-type="modalType.modal"
                    :uuid="modalType.uuid"
                    @close="closeModal"
                />
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import CustomerModal from "~/components/CustomerModal.vue";
import { customerService, type Customer } from "@/api/customer/CustomerService";

const router = useRouter();

const datas = ref<Customer[]>([]);
const modalType = ref<{
    modal: "ADD" | "UPDATE" | "DELETE" | "";
    uuid?: string;
}>({
    modal: "",
    uuid: "",
});

const viewCustomer = (uuid: string) => {
    router.push({
        path: `/customer/${uuid}`,
    });
};

const openModal = (type: "ADD" | "UPDATE" | "DELETE", uuid?: string) => {
    modalType.value.modal = type;
    modalType.value.uuid = uuid || "";
};

const closeModal = () => {
    modalType.value.modal = "";
    modalType.value.uuid = "";
    fetchData();
};

const fetchData = async () => {
    const res = await customerService.list();
    datas.value = res.data;
};
fetchData();
</script>

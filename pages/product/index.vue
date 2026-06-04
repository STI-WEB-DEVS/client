<template>
    <NuxtLayout>
        <div class="p-6">
            <div class="overflow-hidden rounded-xl border bg-white shadow-sm">
                <div
                    class="flex items-center justify-between border-b px-6 py-4"
                >
                    <h2 class="text-lg font-semibold text-gray-800">
                        Product Details
                    </h2>

                    <button
                        @click="openModal('ADD')"
                        class="rounded-md bg-[#398165] px-4 py-2 text-white hover:bg-[#2f6a53]"
                    >
                        Add Product
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
                                    Price
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

                                <td
                                    class="px-6 py-4 text-green-600 font-semibold"
                                >
                                    ₱{{ data.price }}
                                </td>


                                <td class="px-6 py-4">
                                    <div class="flex gap-2">
                                        <button
                                            @click="viewProduct(data.uuid)"
                                            class="rounded bg-[#398165] px-3 py-1 text-white"
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
                v-if="modalType.modal"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            >
                <div
                    @click.stop
                    class="w-full flex items-center justify-center"
                >
                    <ProductModal
                        :modal-type="modalType.modal"
                        :uuid="modalType.uuid"
                        @close="closeModal"
                    />
                </div>
            </div>
        </div>
    </NuxtLayout>
</template>

<script setup lang="ts">
import { ref } from "vue";
import ProductModal from "~/components/ProductModal.vue";
import { productService, type Product } from "@/api/product/ProductService";

const router = useRouter();

const datas = ref<Product[]>([]);
const modalType = ref<{
    modal: "ADD" | "UPDATE" | "DELETE" | "";
    uuid?: string;
}>({
    modal: "",
    uuid: "",
});

const viewProduct = (uuid: string) => {
    router.push({
        path: `/product/${uuid}`,
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
    const res = await productService.list();
    datas.value = res.data;
};
fetchData();
</script>

<template>
    <div class="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <div class="flex items-center justify-between mb-5">
            <h2 class="text-xl font-semibold">{{ prop.modalType }} Customer</h2>

            <button
                @click="$emit('close')"
                class="text-gray-500 hover:text-gray-700"
            >
                X
            </button>
        </div>

        <div v-if="prop.modalType === 'DELETE'" class="space-y-4">
            <p class="text-gray-700">
                Are you sure you want to delete this customer?
            </p>

            <div class="bg-gray-100 p-3 rounded text-xs break-all">
                {{ prop.uuid }}
            </div>

            <div class="flex justify-end gap-3">
                <button
                    @click="$emit('close')"
                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    @click="action"
                    :disabled="isLoading"
                    class="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
                >
                    {{ isLoading ? "Deleting..." : "Delete" }}
                </button>
            </div>
        </div>

        <form v-else class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Name
                </label>

                <input
                    v-model="form.name"
                    type="text"
                    placeholder="Enter name"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    Email
                </label>

                <input
                    v-model="form.email"
                    type="email"
                    placeholder="Enter email"
                    class="w-full rounded-lg border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div v-if="prop.modalType === 'UPDATE'">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                    UUID
                </label>

                <input
                    :value="prop.uuid"
                    readonly
                    class="w-full rounded-lg bg-gray-100 border border-gray-300 px-3 py-2"
                />
            </div>

            <div class="flex justify-end gap-3 pt-2">
                <button
                    type="button"
                    @click="$emit('close')"
                    class="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    @click="action"
                    :disabled="isLoading"
                    class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                    {{
                        isLoading
                            ? "Processing..."
                            : prop.modalType === "ADD"
                              ? "Save"
                              : "Update"
                    }}
                </button>
            </div>
        </form>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted, watch } from "vue";
import { customerService } from "@/api/customer/CustomerService";

const prop = defineProps<{
    modalType: "ADD" | "UPDATE" | "DELETE";
    uuid?: string;
}>();

const emit = defineEmits(["close"]);

const form = reactive({
    name: "",
    email: "",
});

const isLoading = ref(false);

const loadCustomerData = async () => {
    if (prop.modalType === "UPDATE" && prop.uuid) {
        try {
            const res = await customerService.show(prop.uuid);
            if (res?.data) {
                form.name = res.data.name;
                form.email = res.data.email;
            }
        } catch (error) {
            console.error(error);
        }
    }
};

const resetForm = () => {
    form.name = "";
    form.email = "";
};

const action = async () => {
    try {
        isLoading.value = true;
        let res;
        let successMessage = "";

        switch (prop.modalType) {
            case "ADD":
                res = await customerService.create(form);
                successMessage = "Customer added successfully";
                break;

            case "UPDATE":
                res = await customerService.update(prop.uuid as string, form);
                successMessage = "Customer updated successfully";
                break;

            case "DELETE":
                res = await customerService.delete(prop.uuid as string);
                successMessage = "Customer deleted successfully";
                break;
        }

        if (res?.data || res?.status || res?.message || res?.uuid) {
            alert(successMessage);
            emit("close");
        } else {
            console.error(res);
            alert("Failed to complete action");
        }
    } catch (error: any) {
        console.error(error);
        const errorMessage = error?.message || "Failed to complete action";
        alert(errorMessage);
    } finally {
        isLoading.value = false;
    }
};

onMounted(() => {
    loadCustomerData();
});

watch(
    () => prop.modalType,
    () => {
        if (prop.modalType === "ADD") {
            resetForm();
        }
    },
);
</script>

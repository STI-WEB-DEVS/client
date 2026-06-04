<template>
  <div class="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">

    <!-- HEADER -->
    <div class="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">

      <h2 class="text-lg font-bold text-slate-800">
        {{ prop.modalType }} Customer
      </h2>

      <button
        @click="$emit('close')"
        class="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-700 transition"
      >
        ✕
      </button>

    </div>

    <!-- DELETE MODE -->
    <div v-if="prop.modalType === 'DELETE'" class="p-6 space-y-4">

      <div class="p-4 rounded-xl bg-red-50 border border-red-100">
        <p class="text-sm text-red-700 font-medium">
          Are you sure you want to delete this customer?
        </p>

        <p class="text-[11px] text-red-500 mt-2 break-all">
          {{ prop.uuid }}
        </p>
      </div>

      <div class="flex justify-end gap-3 pt-2">

        <button
          @click="$emit('close')"
          class="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
        >
          Cancel
        </button>

        <button
          @click="action"
          :disabled="isLoading"
          class="px-4 py-2 rounded-lg bg-red-600 text-white font-semibold hover:bg-red-700 disabled:opacity-50 transition"
        >
          {{ isLoading ? "Deleting..." : "Delete" }}
        </button>

      </div>

    </div>

    <!-- FORM MODES -->
    <form v-else class="p-6 space-y-4">

      <!-- NAME -->
      <div>
        <label class="text-sm font-semibold text-slate-700">
          Name
        </label>

        <input
          v-model="form.name"
          type="text"
          placeholder="Enter full name"
          class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <!-- EMAIL -->
      <div>
        <label class="text-sm font-semibold text-slate-700">
          Email
        </label>

        <input
          v-model="form.email"
          type="email"
          placeholder="Enter email address"
          class="mt-1 w-full rounded-xl border border-slate-200 px-3 py-2
                 focus:outline-none focus:ring-2 focus:ring-emerald-500"
        />
      </div>

      <!-- UUID (UPDATE ONLY) -->
      <div v-if="prop.modalType === 'UPDATE'">
        <label class="text-sm font-semibold text-slate-700">
          UUID
        </label>

        <input
          :value="prop.uuid"
          readonly
          class="mt-1 w-full rounded-xl bg-slate-100 border border-slate-200 px-3 py-2 text-slate-500"
        />
      </div>

      <!-- ACTIONS -->
      <div class="flex justify-end gap-3 pt-2">

        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50 transition"
        >
          Cancel
        </button>

        <button
          type="button"
          @click="action"
          :disabled="isLoading"
          class="px-4 py-2 rounded-lg bg-emerald-600 text-white font-semibold
                 hover:bg-emerald-700 disabled:opacity-50 transition"
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

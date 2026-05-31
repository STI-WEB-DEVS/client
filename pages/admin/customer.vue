<template>
  <NuxtLayout>
    <div class="min-h-screen bg-[#0d0608] p-8">

      <!-- HEADER -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-white">
          Customers
        </h1>

        <p class="mt-2 text-sm text-gray-400">
          Manage registered customers
        </p>
      </div>

      <!-- CUSTOMERS TABLE -->
      <div
        class="overflow-hidden rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl"
      >
        <div
          class="flex items-center justify-between border-b border-white/10 px-6 py-5"
        >
          <h2 class="font-semibold text-white">
            Customer List
          </h2>

          <span
            class="rounded-full bg-red-500/20 px-3 py-1 text-xs text-red-300"
          >
            {{ customers.length }} Customer(s)
          </span>
        </div>

        <!-- LOADING -->
        <div
          v-if="loading"
          class="p-12 text-center text-gray-400"
        >
          Loading customers...
        </div>

        <!-- EMPTY -->
        <div
          v-else-if="customers.length === 0"
          class="p-12 text-center text-gray-400"
        >
          No customers found.
        </div>

        <!-- CUSTOMERS -->
        <ul
          v-else
          class="divide-y divide-white/5"
        >
          <li
            v-for="customer in customers"
            :key="customer.uuid"
            class="flex items-center justify-between px-6 py-5 transition hover:bg-white/5"
          >
            <div class="flex items-center gap-4">

              <div
                class="flex h-12 w-12 items-center justify-center rounded-full text-white font-bold"
                style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
              >
                {{ customer.name?.charAt(0).toUpperCase() }}
              </div>

              <div>
                <p class="font-semibold text-white">
                  {{ customer.name }}
                </p>

                <p class="mt-1 text-sm text-gray-400">
                  {{ customer.email }}
                </p>

                <p class="mt-1 text-xs text-gray-500 break-all">
                  {{ customer.uuid }}
                </p>
              </div>
            </div>

            <div class="flex items-center gap-3">

              <button
                @click="viewCustomer(customer)"
                class="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs text-gray-300 hover:bg-white/10"
              >
                View
              </button>

              <button
                @click="editCustomer(customer)"
                class="rounded-xl px-4 py-2 text-xs font-semibold text-white"
                style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
              >
                Edit
              </button>

              <button
                @click="deleteCustomer(customer.uuid)"
                class="rounded-xl bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>

            </div>
          </li>
        </ul>
      </div>

      <!-- VIEW MODAL -->
      <div
        v-if="viewModal"
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/70"
      >
        <div
          class="w-full max-w-xl rounded-3xl border border-white/10 bg-[#12090c] p-8 shadow-2xl"
        >

          <div class="mb-6 flex items-center justify-between">
            <h3 class="text-xl font-bold text-white">
              Customer Details
            </h3>

            <button
              @click="viewModal = false"
              class="text-2xl text-gray-400 hover:text-white"
            >
              ×
            </button>
          </div>

          <div class="space-y-5">

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                Customer Name
              </p>

              <p class="mt-1 text-white font-semibold">
                {{ selected?.name }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                Email Address
              </p>

              <p class="mt-1 text-gray-300">
                {{ selected?.email }}
              </p>
            </div>

            <div>
              <p class="text-xs uppercase tracking-wider text-gray-500">
                UUID
              </p>

              <p class="mt-1 break-all text-gray-300">
                {{ selected?.uuid }}
              </p>
            </div>

          </div>

          <div class="mt-8 flex gap-3">

            <button
              @click="editCustomer(selected)"
              class="flex-1 rounded-2xl py-3 font-semibold text-white"
              style="background:linear-gradient(135deg,#c0392b,#e74c3c)"
            >
              Edit Customer
            </button>

            <button
              @click="viewModal = false"
              class="flex-1 rounded-2xl border border-white/10 bg-white/5 py-3 font-semibold text-gray-300"
            >
              Close
            </button>

          </div>

        </div>
      </div>

    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const customers = ref<any[]>([]);
const loading = ref(true);
const submitting = ref(false);
const editMode = ref(false);
const viewModal = ref(false);
const selected = ref<any>(null);
const formError = ref("");
const formSuccess = ref("");
const editUuid = ref("");

const form = ref({
  name: "",
  email: "",
});

const runtimeConfig = useRuntimeConfig();

const headers = ref<any>({
  Accept: "application/json",
});

const fetchCustomers = async () => {
  loading.value = true;

  try {
    const data = await $fetch<any>("customer", {
      baseURL: runtimeConfig.public.apiBaseURL,
      headers: headers.value,
    });

    customers.value = data.data || data;
  } catch (e) {
    console.error(e);
  } finally {
    loading.value = false;
  }
};

const handleSubmit = async () => {
  formError.value = "";
  formSuccess.value = "";

  if (!form.value.name || !form.value.email) {
    formError.value = "Please fill in all fields.";
    return;
  }

  submitting.value = true;

  try {
    if (editMode.value) {
      await $fetch(`customer/${editUuid.value}`, {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "PUT",
        headers: headers.value,
        body: form.value,
      });

      formSuccess.value =
        "Customer updated successfully!";
    } else {
      await $fetch("customer", {
        baseURL: runtimeConfig.public.apiBaseURL,
        method: "POST",
        headers: headers.value,
        body: form.value,
      });

      formSuccess.value =
        "Customer added successfully!";
    }

    form.value = {
      name: "",
      email: "",
    };

    editMode.value = false;
    editUuid.value = "";

    await fetchCustomers();
  } catch (e: any) {
    formError.value =
      e?.message || "Something went wrong.";
  } finally {
    submitting.value = false;
  }
};

const editCustomer = (customer: any) => {
  form.value = {
    name: customer.name,
    email: customer.email,
  };

  editUuid.value = customer.uuid;
  editMode.value = true;
  viewModal.value = false;
};

const cancelEdit = () => {
  form.value = {
    name: "",
    email: "",
  };

  editMode.value = false;
  editUuid.value = "";
  formError.value = "";
  formSuccess.value = "";
};

const viewCustomer = (customer: any) => {
  selected.value = customer;
  viewModal.value = true;
};

const deleteCustomer = async (uuid: string) => {
  if (
    !confirm(
      "Are you sure you want to delete this customer?"
    )
  )
    return;

  try {
    await $fetch(`customer/${uuid}`, {
      baseURL: runtimeConfig.public.apiBaseURL,
      method: "DELETE",
      headers: headers.value,
    });

    await fetchCustomers();
  } catch (e: any) {
    alert("Failed to delete customer.");
  }
};

onMounted(() => {
  const token = localStorage.getItem("_token");

  headers.value = {
    Authorization: `Bearer ${token}`,
    Accept: "application/json",
  };

  fetchCustomers();
});
</script>
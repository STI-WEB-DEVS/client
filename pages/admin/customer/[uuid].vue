<template>
  <NuxtLayout>
    <div class="space-y-6">
      <!-- HEADER -->
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-xl font-semibold tracking-tight text-gray-900">
            View Customer
          </h1>
          <p class="mt-1 text-sm text-gray-500">
            Details for customer record: {{ uuid }}
          </p>
        </div>

        <!-- ✅ BACK BUTTON (FIXED UX) -->
        <button
          @click="goBack"
          class="inline-flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 transition"
        >
          ← Back
        </button>
      </div>

      <!-- LOADING -->
      <div v-if="pending" class="flex justify-center py-12">
        <div
          class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
        ></div>
      </div>

      <!-- ERROR -->
      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700"
      >
        {{ error.message || "Failed to load customer data." }}
      </div>

      <!-- DATA -->
      <div
        v-else-if="customer"
        class="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm space-y-4"
      >
        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wider text-gray-400"
          >
            Full Name
          </p>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ customer.name }}
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wider text-gray-400"
          >
            Email Address
          </p>
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ customer.email }}
          </p>
        </div>

        <div>
          <p
            class="text-xs font-semibold uppercase tracking-wider text-gray-400"
          >
            Created At
          </p>
          <!-- ✅ FORMATTED DATE -->
          <p class="mt-1 text-lg font-medium text-gray-900">
            {{ formattedDate }}
          </p>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { customerService } from "~/api/customer/CustomerService";

const route = useRoute();
const router = useRouter();

const uuid = String(route.params.uuid ?? "");

// STATE
const customer = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

// ✅ FETCH USING useAsyncData (FIX HYDRATION)
const { data, error: fetchError } = await useAsyncData(`customer-${uuid}`, () =>
  customerService.show(uuid),
);

// HANDLE RESULT
if (data.value) {
  customer.value = data.value.data || data.value;
}
if (fetchError.value) {
  error.value = fetchError.value;
}
pending.value = false;

// ✅ FORMAT DATE CLEANLY
const formattedDate = computed(() => {
  if (!customer.value?.created_at) return "-";

  return new Date(customer.value.created_at).toLocaleString("en-PH", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
});

// ✅ BACK BUTTON LOGIC
const goBack = () => {
  router.push("/customer");
};
</script>

<template>
  <NuxtLayout>
    <div class="space-y-6">
      <Heading
        title="Customers"
        description="Displaying customer records from your API."
        button-text="Create Customer"
        @click="handleCreate"
      />

      <div v-if="pending" class="flex justify-center py-16">
        <div
          class="h-8 w-8 animate-spin rounded-full border-2 border-gray-300 border-t-gray-900"
        ></div>
      </div>

      <div
        v-else-if="error"
        class="rounded-xl border border-red-200 bg-red-50 p-4"
      >
        <p class="text-sm text-red-700">{{ error.message }}</p>
      </div>

      <Table
        v-else
        :columns="tableColumns"
        :rows="customers?.data || []"
        empty-message="No customers found."
      >
        <template #cell(actions)="{ row: customer }">
          <div class="flex items-center justify-end gap-2">
            <button
              type="button"
              @click="handleView(customer)"
              class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <EyeIcon class="h-4 w-4" />
              <span>View</span>
            </button>

            <button
              type="button"
              @click="handleEdit(customer)"
              class="inline-flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <PencilSquareIcon class="h-4 w-4" />
              <span>Edit</span>
            </button>

            <button
              type="button"
              @click="handleDelete(customer)"
              class="inline-flex items-center gap-2 rounded-md border border-red-200 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50"
            >
              <TrashIcon class="h-4 w-4" />
              <span>Delete</span>
            </button>
          </div>
        </template>

        <template #footer>
          <p class="text-sm text-gray-500">
            Showing
            <span class="font-medium text-gray-900">{{
              customers?.meta?.from ?? 0
            }}</span>
            to
            <span class="font-medium text-gray-900">{{
              customers?.meta?.to ?? 0
            }}</span>
            of
            <span class="font-medium text-gray-900">{{
              customers?.meta?.total ?? 0
            }}</span>
            customers
          </p>
        </template>
      </Table>

      <FeedbackModal
        :open="isFeedbackModalOpen"
        :message="feedbackMessage"
        @close="closeFeedbackModal"
      />
    </div>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  EyeIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/vue/24/outline";
import { customerService } from "~/api/customer/CustomerService";

const router = useRouter();

const tableColumns = [
  { key: "id", label: "ID" },
  { key: "name", label: "Name" },
  { key: "email", label: "Email" },
  { key: "actions", label: "Actions", align: "right" as const },
];

const customers = ref<any>(null);
const pending = ref(true);
const error = ref<any>(null);

const isFeedbackModalOpen = ref(false);
const feedbackMessage = ref("");

onMounted(async () => {
  pending.value = true;
  error.value = null;

  try {
    customers.value = await customerService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
});

const openFeedbackModal = (message: string) => {
  feedbackMessage.value = message;
  isFeedbackModalOpen.value = true;
};

const closeFeedbackModal = () => {
  isFeedbackModalOpen.value = false;
  feedbackMessage.value = "";
};

const handleCreate = () => {
  openFeedbackModal("Create button clicked");
};

const handleView = (customer: any) => {
  router.push(`/customer/${customer.uuid}`);
};

const handleEdit = (customer: any) => {
  openFeedbackModal(`Edit customer: ${customer.name}`);
};

const handleDelete = (customer: any) => {
  openFeedbackModal(`Delete customer: ${customer.name}`);
};
</script>

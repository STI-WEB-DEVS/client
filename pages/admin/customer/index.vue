<template>
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

      <BaseModal
        :open="isMainModalOpen"
        :title="mainModalTitle"
        :confirm-text="mainConfirmText"
        :cancel-text="mainModalMode !== 'view' ? 'Cancel' : undefined"
        :variant="mainModalMode === 'delete' ? 'danger' : 'primary'"
        :loading="submitting"
        @close="closeMainModal"
        @confirm="handleMainModalConfirm"
      >
        <div v-if="mainModalMode === 'delete'">
          <p>
            Are you sure you want to delete
            <span class="font-semibold text-gray-900">{{
              selectedCustomer?.name
            }}</span>? This action cannot be undone.
          </p>
        </div>

        <div v-else-if="mainModalMode === 'edit' || mainModalMode === 'create'">
          <CustomerForm v-model="form" :disabled="submitting" />
        </div>

        <div v-else-if="mainModalMode === 'view'" class="space-y-4">
          <div class="grid grid-cols-2 gap-4">
            <div>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">ID</p>
              <p class="mt-1 text-sm text-gray-900 font-medium">{{ selectedCustomer?.id }}</p>
            </div>
            <div>
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">UUID</p>
              <p class="mt-1 text-xs text-gray-600 truncate">{{ selectedCustomer?.uuid }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Name</p>
              <p class="mt-1 text-sm text-gray-900">{{ selectedCustomer?.name }}</p>
            </div>
            <div class="col-span-2">
              <p class="text-xs font-semibold text-gray-500 uppercase tracking-wider">Email</p>
              <p class="mt-1 text-sm text-gray-900">{{ selectedCustomer?.email }}</p>
            </div>
          </div>
        </div>
      </BaseModal>

      <FeedbackModal
        :open="feedback.open"
        :type="feedback.type"
        :title="feedback.title"
        :message="feedback.message"
        @close="feedback.open = false"
      />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
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
const submitting = ref(false);

const isMainModalOpen = ref(false);
const mainModalMode = ref<"create" | "edit" | "delete" | "view">("view");
const feedback = ref<{
  open: boolean;
  type: "success" | "error";
  title: string;
  message: string;
}>({
  open: false,
  type: "success",
  title: "",
  message: "",
});

const selectedCustomer = ref<any>(null);
const form = ref({
  name: "",
  email: "",
});

const mainModalTitle = computed(() => {
  switch (mainModalMode.value) {
    case "create":
      return "Create Customer";
    case "edit":
      return "Edit Customer";
    case "delete":
      return "Delete Customer";
    case "view":
      return "Customer Details";
    default:
      return "Notification";
  }
});

const mainConfirmText = computed(() => {
  switch (mainModalMode.value) {
    case "create":
      return "Create";
    case "edit":
      return "Save Changes";
    case "delete":
      return "Delete";
    case "view":
      return "Close";
    default:
      return "Okay";
  }
});

const loadCustomers = async () => {
  pending.value = true;
  error.value = null;
  try {
    customers.value = await customerService.list();
  } catch (err: any) {
    error.value = err;
  } finally {
    pending.value = false;
  }
};

onMounted(loadCustomers);

const closeMainModal = () => {
  isMainModalOpen.value = false;
  selectedCustomer.value = null;
  submitting.value = false;
};

const showFeedback = (type: "success" | "error", title: string, message: string) => {
  feedback.value = { open: true, type, title, message };
};

const handleMainModalConfirm = async () => {
  if (mainModalMode.value === "view") {
    closeMainModal();
    return;
  }

  submitting.value = true;
  try {
    let successMessage = "";
    if (mainModalMode.value === "delete") {
      await customerService.delete(selectedCustomer.value.uuid);
      successMessage = "Customer has been deleted successfully.";
    } else if (mainModalMode.value === "edit") {
      await customerService.update(selectedCustomer.value.uuid, form.value);
      successMessage = "Customer details updated successfully.";
    } else if (mainModalMode.value === "create") {
      await customerService.create(form.value);
      successMessage = "New customer created successfully.";
    }
    
    await loadCustomers();
    closeMainModal();
    showFeedback("success", "Success", successMessage);
  } catch (err: any) {
    showFeedback("error", "Action Failed", err.message || "An unexpected error occurred. Please try again.");
  } finally {
    submitting.value = false;
  }
};

const handleCreate = () => {
  mainModalMode.value = "create";
  form.value = { name: "", email: "" };
  isMainModalOpen.value = true;
};

const handleView = (customer: any) => {
  router.push(`/customer/${customer.uuid}`);
};

const handleEdit = (customer: any) => {
  mainModalMode.value = "edit";
  selectedCustomer.value = customer;
  form.value = { name: customer.name, email: customer.email };
  isMainModalOpen.value = true;
};

const handleDelete = (customer: any) => {
  mainModalMode.value = "delete";
  selectedCustomer.value = customer;
  isMainModalOpen.value = true;
};
</script>

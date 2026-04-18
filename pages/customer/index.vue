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
        :open="isModalOpen"
        :title="modalTitle"
        :confirm-text="confirmText"
        :cancel-text="modalMode !== 'view' ? 'Cancel' : undefined"
        :variant="modalMode === 'delete' ? 'danger' : 'info'"
        :loading="submitting"
        @close="closeModal"
        @confirm="handleModalConfirm"
      >
        <div v-if="modalMode === 'delete'">
          <p>
            Are you sure you want to delete
            <span class="font-semibold text-gray-900">{{
              selectedCustomer?.name
            }}</span>? This action cannot be undone.
          </p>
        </div>

        <div v-else-if="modalMode === 'edit' || modalMode === 'create'">
          <CustomerForm v-model="form" :disabled="submitting" />
        </div>

        <div v-else-if="modalMode === 'view'" class="space-y-4">
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
      </FeedbackModal>
    </div>
  </NuxtLayout>
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

const isModalOpen = ref(false);
const modalMode = ref<"create" | "edit" | "delete" | "view">("view");
const selectedCustomer = ref<any>(null);
const form = ref({
  name: "",
  email: "",
});

const modalTitle = computed(() => {
  switch (modalMode.value) {
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

const confirmText = computed(() => {
  switch (modalMode.value) {
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

const closeModal = () => {
  isModalOpen.value = false;
  selectedCustomer.value = null;
  submitting.value = false;
};

const handleModalConfirm = async () => {
  if (modalMode.value === "view") {
    closeModal();
    return;
  }

  submitting.value = true;
  try {
    if (modalMode.value === "delete") {
      await customerService.delete(selectedCustomer.value.uuid);
    } else if (modalMode.value === "edit") {
      await customerService.update(selectedCustomer.value.uuid, form.value);
    } else if (modalMode.value === "create") {
      await customerService.create(form.value);
    }
    await loadCustomers();
    closeModal();
  } catch (err: any) {
    alert(err.message || "An error occurred");
  } finally {
    submitting.value = false;
  }
};

const handleCreate = () => {
  modalMode.value = "create";
  form.value = { name: "", email: "" };
  isModalOpen.value = true;
};

const handleView = (customer: any) => {
  router.push(`/customer/${customer.uuid}`);
};

const handleEdit = (customer: any) => {
  modalMode.value = "edit";
  selectedCustomer.value = customer;
  form.value = { name: customer.name, email: customer.email };
  isModalOpen.value = true;
};

const handleDelete = (customer: any) => {
  modalMode.value = "delete";
  selectedCustomer.value = customer;
  isModalOpen.value = true;
};
</script>

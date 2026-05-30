import { ref, onMounted } from "vue";
import { customerService } from "~/api/customer/CustomerService";

export const useCustomer = () => {
const name = ref("");
const email = ref("");
const error = ref("");
const isLoading = ref(false);
const isLoadingList = ref(false);
const deletingUuid = ref<string | null>(null);
const editingCustomer = ref<any | null>(null);
const viewingCustomer = ref<any | null>(null);
const customers = ref<any[]>([]);

const openModal = (customer: any) => {
  viewingCustomer.value = customer;
};

const closeModal = () => {
  viewingCustomer.value = null;
};

const fetchCustomers = async () => {
  isLoadingList.value = true;
  try {
    const response = await customerService.list();
    customers.value = response?.data ?? response ?? [];
  } catch (err: any) {
    console.error("Failed to fetch customers:", err?.message);
  } finally {
    isLoadingList.value = false;
  }
};

const startEdit = (customer: any) => {
  editingCustomer.value = customer;
  name.value = customer.name;
  email.value = customer.email;
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const cancelEdit = () => {
  editingCustomer.value = null;
  name.value = "";
  email.value = "";
  error.value = "";
};

const handleSubmit = async () => {
  error.value = "";
  isLoading.value = true;

  try {
    if (editingCustomer.value) {
      // Update
      await customerService.update(editingCustomer.value.uuid, {
        name: name.value,
        email: email.value,
      });
      cancelEdit();
    } else {
      // Create
      await customerService.create({ name: name.value, email: email.value });
      name.value = "";
      email.value = "";
    }
    await fetchCustomers();
  } catch (err: any) {
    error.value = err?.message || "Something went wrong.";
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this customer?")) return;

  deletingUuid.value = uuid;
  try {
    await customerService.delete(uuid);
    await fetchCustomers();
  } catch (err: any) {
    error.value = err?.message || "Failed to delete customer.";
  } finally {
    deletingUuid.value = null;
  }
};

return {
    name,
    email,
    error,
    isLoading,
    isLoadingList,
    deletingUuid,
    editingCustomer,
    viewingCustomer,
    customers,
    openModal,
    closeModal,
    fetchCustomers,
    startEdit,
    cancelEdit,
    handleSubmit,
    handleDelete,
};
};
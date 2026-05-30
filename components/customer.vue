<template>
  <div class="app-wrapper">
    <div class="container">

      <!-- Add Customer Card -->
      <div class="card">
        <h2 class="section-title">{{ editingCustomer ? 'Edit Customer' : 'Add Customer' }}</h2>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <div class="field">
          <label class="field-label">Name</label>
          <input
            v-model="name"
            class="field-input"
            type="text"
            placeholder="Enter customer name"
          />
        </div>

        <div class="field">
          <label class="field-label">Email</label>
          <input
            v-model="email"
            class="field-input"
            type="email"
            placeholder="Enter email address"
          />
        </div>

        <div class="btn-row">
          <button v-if="editingCustomer" class="btn-cancel" @click="cancelEdit">Cancel</button>
          <button class="btn-add" :disabled="isLoading" @click="handleSubmit">
            {{ isLoading ? 'Saving...' : editingCustomer ? 'Update Customer' : 'Add Customer' }}
          </button>
        </div>
      </div>

      <!-- Customers List Card -->
      <div class="card customers-card">
        <div class="customers-header">
          <h2 class="section-title">Customers</h2>
          <span class="item-count">{{ customers.length }} item(s)</span>
        </div>

        <div v-if="isLoadingList" class="empty-state">Loading...</div>

        <div v-else-if="customers.length === 0" class="empty-state">
          No customers yet. Add one above.
        </div>

        <div
          v-for="customer in customers"
          :key="customer.uuid"
          class="customer-row"
        >
          <div class="customer-info">
            <span class="customer-name">{{ customer.name }}</span>
            <span class="customer-id">{{ customer.uuid }}</span>
          </div>
          <div class="customer-actions">
            <span class="customer-email">{{ customer.email }}</span>
            <button class="action-btn view-btn" @click="openModal(customer)">View</button>
            <button class="action-btn edit-btn" @click="startEdit(customer)">Edit</button>
            <button
              class="action-btn delete-btn"
              :disabled="deletingUuid === customer.uuid"
              @click="handleDelete(customer.uuid)"
            >
              {{ deletingUuid === customer.uuid ? '...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- View Modal -->
    <div v-if="viewingCustomer" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3 class="modal-title">Customer Details</h3>
        <p><strong>Name:</strong> {{ viewingCustomer.name }}</p>
        <p><strong>Email:</strong> {{ viewingCustomer.email }}</p>
        <p class="modal-id"><strong>ID:</strong> {{ viewingCustomer.uuid }}</p>
        <button class="btn-add" @click="closeModal">Close</button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false,
});

import { ref, onMounted } from "vue";
import { customerService } from "~/api/customer/CustomerService";

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
  window.scrollTo({ top: 0, behavior: "smooth" });
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
      await customerService.update(editingCustomer.value.uuid, {
        name: name.value,
        email: email.value,
      });
      cancelEdit();
    } else {
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

onMounted(fetchCustomers);
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

.app-wrapper {
  min-height: 100vh;
  background: #f0f2f5;
  display: flex;
  justify-content: center;
  padding: 40px 16px;
  font-family: 'DM Sans', sans-serif;
}

.container {
  width: 100%;
  max-width: 620px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.card {
  background: #ffffff;
  border-radius: 14px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.07);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 20px 0;
}

.error-msg {
  background: #fef2f2;
  color: #dc2626;
  border: 1px solid #fecaca;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 0.875rem;
  margin-bottom: 16px;
}

.field {
  margin-bottom: 16px;
}

.field-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 6px;
}

.field-input {
  width: 100%;
  padding: 11px 14px;
  border: 1.5px solid #e2e8f0;
  border-radius: 8px;
  font-size: 0.95rem;
  font-family: 'DM Sans', sans-serif;
  color: #1a1a2e;
  background: #fff;
  transition: border-color 0.2s, box-shadow 0.2s;
  box-sizing: border-box;
  outline: none;
}

.field-input:focus {
  border-color: #2E6F40;
  box-shadow: 0 0 0 3px rgba(46, 111, 64, 0.12);
}

.btn-row {
  display: flex;
  gap: 10px;
  margin-top: 4px;
}

.btn-add {
  flex: 1;
  padding: 13px;
  background: #2E6F40;
  color: #ffffff;
  border: none;
  border-radius: 9px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s, box-shadow 0.2s;
  letter-spacing: 0.01em;
}

.btn-add:hover:not(:disabled) {
  background: #245533;
  box-shadow: 0 4px 14px rgba(46, 111, 64, 0.35);
}

.btn-add:active:not(:disabled) {
  transform: scale(0.98);
}

.btn-add:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-cancel {
  padding: 13px 20px;
  background: #f1f5f9;
  color: #374151;
  border: none;
  border-radius: 9px;
  font-size: 0.95rem;
  font-weight: 600;
  font-family: 'DM Sans', sans-serif;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #e2e8f0;
}

/* Customers */
.customers-card {
  padding: 24px 0 8px 0;
}

.customers-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 16px 28px;
}

.customers-header .section-title {
  margin: 0;
}

.item-count {
  font-size: 0.82rem;
  color: #6b7280;
  font-weight: 500;
}

.empty-state {
  text-align: center;
  color: #9ca3af;
  font-size: 0.9rem;
  padding: 28px 0 20px 0;
}

.customer-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  border-top: 1px solid #f1f5f9;
  gap: 12px;
  transition: background 0.15s;
}

.customer-row:hover {
  background: #f8faf8;
}

.customer-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.customer-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a2e;
}

.customer-id {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

.customer-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.customer-email {
  font-size: 0.85rem;
  font-weight: 500;
  color: #2E6F40;
  max-width: 160px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.action-btn {
  background: none;
  border: none;
  font-size: 0.83rem;
  font-family: 'DM Sans', sans-serif;
  font-weight: 600;
  cursor: pointer;
  padding: 2px 0;
  transition: opacity 0.15s;
}

.action-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.view-btn { color: #374151; }
.view-btn:hover { opacity: 0.6; }

.edit-btn { color: #2E6F40; }
.edit-btn:hover { opacity: 0.65; }

.delete-btn { color: #dc2626; }
.delete-btn:hover:not(:disabled) { opacity: 0.65; }

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.35);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  padding: 20px;
}

.modal {
  background: #fff;
  border-radius: 14px;
  padding: 32px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 20px 60px rgba(0,0,0,0.2);
}

.modal-title {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 18px 0;
}

.modal p {
  margin: 0 0 10px 0;
  font-size: 0.92rem;
  color: #374151;
}

.modal-id {
  font-family: 'DM Mono', monospace;
  font-size: 0.78rem !important;
  color: #9ca3af !important;
  word-break: break-all;
  margin-bottom: 20px !important;
}
</style>
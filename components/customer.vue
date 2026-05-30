<template>
  <div class="customers">

    <!-- ── PAGE HEADER ── -->
    <div class="page-header">
      <div>
        <h1 class="page-title">Customers</h1>
        <p class="page-sub">Manage your customer registry</p>
      </div>
      <button class="btn-gold" @click="showCreateModal = true">
        + Add Customer
      </button>
    </div>

    <!-- ── CUSTOMER CARD ── -->
    <div class="card">

      <!-- Search -->
      <div class="search-bar">
        <svg class="search-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search by name or email…"
          class="search-input"
        />
      </div>

      <!-- Loading -->
      <div v-if="isLoading" class="empty-state">Loading…</div>

      <!-- Empty -->
      <div v-else-if="filteredCustomers.length === 0" class="empty-state">
        No customers found.
      </div>

      <!-- Table -->
      <div v-else class="table-wrap">
        <table class="customers-table">
          <thead>
            <tr>
              <th>Customer</th>
              <th>Email</th>
              <th class="th-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="customer in filteredCustomers"
              :key="customer.id"
              class="table-row"
            >
              <td>
                <div class="client-cell">
                  <div class="avatar">
                    {{ customer.name.split(' ').map(w => w[0]).slice(0,2).join('').toUpperCase() }}
                  </div>
                  <p class="client-name">{{ customer.name }}</p>
                </div>
              </td>
              <td class="td-email">{{ customer.email }}</td>
              <td class="td-actions">
                <div class="row-actions">
                  <button class="act-btn edit" @click="openEdit(customer)">Edit</button>
                  <span class="act-sep">|</span>
                  <button class="act-btn del" @click="openDelete(customer)">Remove</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>

    <p class="count-text">
      {{ customers.length }} total {{ customers.length === 1 ? 'customer' : 'customers' }}
    </p>


    <!-- ── Create Modal ── -->
    <Transition name="fade">
      <div
        v-if="showCreateModal"
        class="overlay"
        @click.self="showCreateModal = false"
      >
        <div class="modal">
          <div class="modal-header">
            <div>
              <h2 class="modal-title">New customer</h2>
              <p class="modal-sub">Fill in the details below.</p>
            </div>
            <button @click="showCreateModal = false" class="modal-close">&#x2715;</button>
          </div>
          <div class="modal-divider"></div>
          <form @submit.prevent="handleCreate" class="modal-form">
            <div class="field">
              <label class="field-label">Full Name <span class="req">*</span></label>
              <input v-model="createForm.name" type="text" placeholder="Jane Doe" required class="field-input" />
            </div>
            <div class="field">
              <label class="field-label">Email <span class="req">*</span></label>
              <input v-model="createForm.email" type="email" placeholder="jane@example.com" required class="field-input" />
            </div>
            <p v-if="createError" class="form-error">{{ createError }}</p>
            <div class="btn-row">
              <button type="button" class="btn-cancel" @click="showCreateModal = false">Cancel</button>
              <button type="submit" class="btn-submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Saving…' : 'Create customer' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>


    <!-- ── Edit Modal ── -->
    <Transition name="fade">
      <div
        v-if="showEditModal"
        class="overlay"
        @click.self="showEditModal = false"
      >
        <div class="modal">
          <div class="modal-header">
            <div>
              <h2 class="modal-title">Edit customer</h2>
              <p class="modal-sub">Update the details below.</p>
            </div>
            <button @click="showEditModal = false" class="modal-close">&#x2715;</button>
          </div>
          <div class="modal-divider"></div>
          <form @submit.prevent="handleUpdate" class="modal-form">
            <div class="field">
              <label class="field-label">Full Name <span class="req">*</span></label>
              <input v-model="editForm.name" type="text" placeholder="Jane Doe" required class="field-input" />
            </div>
            <div class="field">
              <label class="field-label">Email <span class="req">*</span></label>
              <input v-model="editForm.email" type="email" placeholder="jane@example.com" required class="field-input" />
            </div>
            <p v-if="editError" class="form-error">{{ editError }}</p>
            <div class="btn-row">
              <button type="button" class="btn-cancel" @click="showEditModal = false">Cancel</button>
              <button type="submit" class="btn-submit" :disabled="isSubmitting">
                {{ isSubmitting ? 'Saving…' : 'Save changes' }}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Transition>


    <!-- ── Delete Modal ── -->
    <Transition name="fade">
      <div
        v-if="showDeleteModal"
        class="overlay"
        @click.self="showDeleteModal = false"
      >
        <div class="modal modal-sm">
          <div class="modal-header">
            <h2 class="modal-title">Remove customer?</h2>
            <button @click="showDeleteModal = false" class="modal-close">&#x2715;</button>
          </div>
          <div class="modal-divider"></div>
          <p class="del-warn">
            <strong>{{ selectedCustomer?.name }}</strong> will be permanently removed.
            This cannot be undone.
          </p>
          <p v-if="deleteError" class="form-error" style="margin-bottom:1rem">{{ deleteError }}</p>
          <div class="btn-row">
            <button class="btn-cancel" @click="showDeleteModal = false">Cancel</button>
            <button class="btn-delete" @click="handleDelete" :disabled="isSubmitting">
              {{ isSubmitting ? 'Removing…' : 'Yes, remove' }}
            </button>
          </div>
        </div>
      </div>
    </Transition>

  </div>
</template>


<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { customerService } from "~/api/customer/CustomerService";

interface Customer {
  id: number | string;
  uuid: string;
  name: string;
  email: string;
}

// ── State ──────────────────────────────────────────
const customers    = ref<Customer[]>([]);
const isLoading    = ref(false);
const isSubmitting = ref(false);
const searchQuery  = ref("");

const showCreateModal  = ref(false);
const showEditModal    = ref(false);
const showDeleteModal  = ref(false);
const selectedCustomer = ref<Customer | null>(null);

const createForm = ref({ name: "", email: "" });
const editForm   = ref({ name: "", email: "" });

const createError = ref("");
const editError   = ref("");
const deleteError = ref("");

// ── Computed ───────────────────────────────────────
const filteredCustomers = computed(() => {
  if (!searchQuery.value) return customers.value;
  const q = searchQuery.value.toLowerCase();
  return customers.value.filter(
    (c) => c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q)
  );
});

// ── Helpers ────────────────────────────────────────
const openEdit = (customer: Customer) => {
  selectedCustomer.value = customer;
  editForm.value = { name: customer.name, email: customer.email };
  editError.value = "";
  showEditModal.value = true;
};

const openDelete = (customer: Customer) => {
  selectedCustomer.value = customer;
  deleteError.value = "";
  showDeleteModal.value = true;
};

// ── CRUD handlers ──────────────────────────────────
const handleCreate = async () => {
  isSubmitting.value = true;
  createError.value  = "";
  try {
    const created = await customerService.create(createForm.value);
    console.log(created);
    const newCustomer: Customer = {
      id: created.data.id,
      uuid: created.data.uuid,
      name: created.data.name,
      email: created.data.email,
    };
    customers.value.push(newCustomer);
    createForm.value  = { name: "", email: "" };
    showCreateModal.value = false;

  } catch (err: any) {
    createError.value = err?.message || "Failed to create customer.";
  } finally {
    isSubmitting.value = false;
  }
};

const handleUpdate = async () => {
  if (!selectedCustomer.value) return;
  isSubmitting.value = true;
  editError.value    = "";
  try {
    const updated = await customerService.update(selectedCustomer.value.uuid, editForm.value);
    const idx = customers.value.findIndex((c) => c.uuid === selectedCustomer.value!.uuid);
    if (idx !== -1) customers.value.splice(idx, 1, { ...customers.value[idx], ...updated.data });
    showEditModal.value = false;

  } catch (err: any) {
    editError.value = err?.message || "Failed to update customer.";
  } finally {
    isSubmitting.value = false;
  }
};

const handleDelete = async () => {
  if (!selectedCustomer.value) return;
  isSubmitting.value = true;
  deleteError.value  = "";
  try {
    await customerService.delete(selectedCustomer.value.uuid);
    customers.value = customers.value.filter((c) => c.id !== selectedCustomer.value!.id);
    showDeleteModal.value = false;
  } catch (err: any) {
    deleteError.value = err?.message || "Failed to remove customer.";
  } finally {
    isSubmitting.value = false;
  }
};

// ── Fetch on mount ─────────────────────────────────
onMounted(async () => {
  isLoading.value = true;
  try {
    const res = await customerService.list();
    customers.value = res.data;
  } catch (err: any) {
    // handle error
  } finally {
    isLoading.value = false;
  }
});
</script>


<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400&family=Jost:wght@300;400;500;600&display=swap');

.customers {
  font-family: 'Jost', sans-serif;
  padding-bottom: 3rem;
}

/* ─── HEADER ─── */
.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.75rem;
}
.page-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.75rem;
  font-weight: 300;
  color: #1a1a14;
  letter-spacing: 0.02em;
  line-height: 1.1;
}
.page-sub {
  font-size: 0.78rem;
  color: #9ca3af;
  margin-top: 3px;
  font-weight: 300;
}

/* ─── GOLD BUTTON ─── */
.btn-gold {
  background: #c9a96e;
  color: #1a1a14;
  border: none;
  padding: 0.65rem 1.4rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.72rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  cursor: pointer;
  border-radius: 4px;
  transition: background 0.2s, transform 0.2s;
  white-space: nowrap;
}
.btn-gold:hover { background: #e2c99a; transform: translateY(-1px); }

/* ─── CARD ─── */
.card {
  background: #fff;
  border-radius: 10px;
  border: 1px solid rgba(201,169,110,0.12);
  box-shadow: 0 2px 16px rgba(26,26,20,0.05);
}

/* ─── SEARCH ─── */
.search-bar {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.85rem 1.4rem;
  border-bottom: 1px solid rgba(201,169,110,0.12);
}
.search-icon { width: 14px; height: 14px; color: #c9a96e; flex-shrink: 0; }
.search-input {
  flex: 1;
  border: none;
  outline: none;
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem;
  color: #1a1a14;
  background: transparent;
}
.search-input::placeholder { color: #c4b89a; }

/* ─── TABLE ─── */
.empty-state {
  padding: 3rem 1.4rem;
  text-align: center;
  font-size: 0.82rem;
  color: #9ca3af;
  font-weight: 300;
}
.table-wrap { overflow-x: auto; }
.customers-table { width: 100%; border-collapse: collapse; }
.customers-table thead tr {
  border-bottom: 1px solid rgba(201,169,110,0.12);
}
.customers-table th {
  text-align: left;
  padding: 0.7rem 1.4rem;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #9ca3af;
}
.th-right { text-align: right; }
.table-row { border-bottom: 1px solid #f9f5ef; transition: background 0.15s; }
.table-row:last-child { border-bottom: none; }
.table-row:hover { background: #fdf8f0; }
.table-row:hover .row-actions { opacity: 1; }
.customers-table td { padding: 0.85rem 1.4rem; vertical-align: middle; }

.client-cell { display: flex; align-items: center; gap: 0.75rem; }
.avatar {
  width: 32px; height: 32px;
  border-radius: 50%;
  background: rgba(201,169,110,0.15);
  display: flex; align-items: center; justify-content: center;
  font-family: 'Cormorant Garamond', serif;
  font-size: 0.82rem; color: #c9a96e; flex-shrink: 0;
}
.client-name { font-size: 0.83rem; font-weight: 500; color: #1a1a14; }
.td-email { font-size: 0.8rem; color: #9ca3af; }
.td-actions { text-align: right; }
.row-actions {
  display: flex; align-items: center;
  justify-content: flex-end; gap: 0.65rem;
  opacity: 0; transition: opacity 0.15s;
}
.act-btn {
  background: none; border: none; cursor: pointer;
  font-family: 'Jost', sans-serif; font-size: 0.72rem;
  color: #9ca3af; padding: 0;
  border-bottom: 1px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}
.act-btn.edit:hover { color: #1a1a14; border-color: #9ca3af; }
.act-btn.del:hover  { color: #c0725a; border-color: #c0725a; }
.act-sep { color: #e5e0d8; font-size: 0.7rem; }

.count-text {
  margin-top: 0.9rem;
  text-align: center;
  font-size: 0.7rem;
  color: #c4b89a;
  letter-spacing: 0.05em;
}

/* ─── OVERLAY ─── */
.overlay {
  position: fixed; inset: 0; z-index: 50;
  display: flex; align-items: center; justify-content: center;
  padding: 1rem;
  background: rgba(26,26,20,0.4);
  backdrop-filter: blur(2px);
}

/* ─── MODAL ─── */
.modal {
  background: #fff;
  border-radius: 10px;
  border: 1px solid rgba(201,169,110,0.2);
  box-shadow: 0 20px 50px rgba(26,26,20,0.16);
  padding: 2rem;
  width: 100%; max-width: 420px;
}
.modal-sm { max-width: 360px; }
.modal-header {
  display: flex; align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1.1rem;
}
.modal-title {
  font-family: 'Cormorant Garamond', serif;
  font-size: 1.25rem; font-weight: 300;
  color: #1a1a14; letter-spacing: 0.02em;
}
.modal-sub { font-size: 0.76rem; color: #9ca3af; margin-top: 3px; font-weight: 300; }
.modal-close {
  background: none; border: none; cursor: pointer;
  font-size: 0.95rem; color: #c4b89a; line-height: 1;
  transition: color 0.15s; padding: 0;
}
.modal-close:hover { color: #1a1a14; }
.modal-divider { height: 1px; background: rgba(201,169,110,0.15); margin-bottom: 1.3rem; }

/* ─── FORM ─── */
.modal-form { display: flex; flex-direction: column; gap: 1rem; }
.field { display: flex; flex-direction: column; }
.field-label {
  font-size: 0.62rem; font-weight: 500;
  letter-spacing: 0.14em; text-transform: uppercase;
  color: #9ca3af; margin-bottom: 5px;
  font-family: 'Jost', sans-serif;
}
.req { color: #c9a96e; }
.field-input {
  padding: 0.58rem 0.8rem;
  font-family: 'Jost', sans-serif;
  font-size: 0.82rem; color: #1a1a14;
  background: #fdf8f0;
  border: 1px solid rgba(201,169,110,0.2);
  border-radius: 4px; outline: none;
  transition: border-color 0.2s, background 0.2s;
}
.field-input:focus { border-color: #c9a96e; background: #fff; }
.field-input::placeholder { color: #c4b89a; }
.form-error { font-size: 0.7rem; color: #c0725a; }
.del-warn {
  font-size: 0.82rem; color: #9ca3af;
  margin-bottom: 1.3rem; line-height: 1.6;
}
.del-warn strong { color: #6b5a3e; font-weight: 500; }

/* ─── MODAL BUTTONS ─── */
.btn-row { display: flex; gap: 0.65rem; margin-top: 0.4rem; }
.btn-cancel {
  flex: 1; padding: 0.6rem;
  border: 1px solid rgba(201,169,110,0.2);
  background: transparent;
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #9ca3af; cursor: pointer; border-radius: 4px;
  transition: border-color 0.2s, color 0.2s;
}
.btn-cancel:hover { border-color: #9ca3af; color: #1a1a14; }
.btn-submit {
  flex: 1; padding: 0.6rem;
  background: #c9a96e; border: none;
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #1a1a14; cursor: pointer; border-radius: 4px;
  transition: background 0.2s;
}
.btn-submit:hover { background: #e2c99a; }
.btn-submit:disabled { opacity: 0.5; cursor: not-allowed; }
.btn-delete {
  flex: 1; padding: 0.6rem;
  background: #c0725a; border: none;
  font-family: 'Jost', sans-serif;
  font-size: 0.7rem; font-weight: 500;
  letter-spacing: 0.12em; text-transform: uppercase;
  color: #fff; cursor: pointer; border-radius: 4px;
  transition: background 0.2s;
}
.btn-delete:hover { background: #d4896e; }
.btn-delete:disabled { opacity: 0.5; cursor: not-allowed; }

/* ─── FADE ─── */
.fade-enter-active, .fade-leave-active { transition: opacity 0.2s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

@media (max-width: 640px) {
  .page-title { font-size: 1.4rem; }
  .modal { padding: 1.5rem; }
}
</style>
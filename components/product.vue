<template>
  <div class="app-wrapper">
    <div class="container">

      <!-- Add Product Card -->
      <div class="card">
        <h2 class="section-title">{{ editingProduct ? 'Edit Product' : 'Add Product' }}</h2>

        <div v-if="error" class="error-msg">{{ error }}</div>

        <div class="field">
          <label class="field-label">Product Name</label>
          <input
            v-model="name"
            class="field-input"
            type="text"
            placeholder="Enter product name"
          />
        </div>

        <div class="field">
          <label class="field-label">Price</label>
          <input
            v-model="price"
            class="field-input"
            type="number"
            placeholder="0.00"
            min="0"
            step="0.01"
          />
        </div>

        <div class="btn-row">
          <button v-if="editingProduct" class="btn-cancel" @click="cancelEdit">Cancel</button>
          <button class="btn-add" :disabled="isLoading" @click="handleSubmit">
            {{ isLoading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product' }}
          </button>
        </div>
      </div>

      <!-- Products List Card -->
      <div class="card products-card">
        <div class="products-header">
          <h2 class="section-title">Products</h2>
          <span class="item-count">{{ products.length }} item(s)</span>
        </div>

        <div v-if="isLoadingList" class="empty-state">Loading...</div>

        <div v-else-if="products.length === 0" class="empty-state">
          No products yet. Add one above.
        </div>

        <div
          v-for="product in products"
          :key="product.uuid"
          class="product-row"
        >
          <div class="product-info">
            <span class="product-name">{{ product.name }}</span>
            <span class="product-id">{{ product.uuid }}</span>
          </div>
          <div class="product-actions">
            <span class="product-price">₱{{ Number(product.price).toFixed(2) }}</span>
            <button class="action-btn view-btn" @click="openModal(product)">View</button>
            <button class="action-btn edit-btn" @click="startEdit(product)">Edit</button>
            <button
              class="action-btn delete-btn"
              :disabled="deletingUuid === product.uuid"
              @click="handleDelete(product.uuid)"
            >
              {{ deletingUuid === product.uuid ? '...' : 'Delete' }}
            </button>
          </div>
        </div>
      </div>

    </div>

    <!-- View Modal -->
    <div v-if="viewingProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal">
        <h3 class="modal-title">Product Details</h3>
        <p><strong>Name:</strong> {{ viewingProduct.name }}</p>
        <p><strong>Price:</strong> ₱{{ Number(viewingProduct.price).toFixed(2) }}</p>
        <p class="modal-id"><strong>ID:</strong> {{ viewingProduct.uuid }}</p>
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
import { productService } from "~/api/product/ProductService";

const name = ref("");
const price = ref("");
const error = ref("");
const isLoading = ref(false);
const isLoadingList = ref(false);
const deletingUuid = ref<string | null>(null);
const editingProduct = ref<any | null>(null);
const viewingProduct = ref<any | null>(null);
const products = ref<any[]>([]);

const openModal = (product: any) => {
  viewingProduct.value = product;
};

const closeModal = () => {
  viewingProduct.value = null;
};

const fetchProducts = async () => {
  isLoadingList.value = true;
  try {
    const response = await productService.list();
    products.value = response?.data ?? response ?? [];
  } catch (err: any) {
    console.error("Failed to fetch products:", err?.message);
  } finally {
    isLoadingList.value = false;
  }
};

const startEdit = (product: any) => {
  editingProduct.value = product;
  name.value = product.name;
  price.value = product.price;
  window.scrollTo({ top: 0, behavior: "smooth" });
};

const cancelEdit = () => {
  editingProduct.value = null;
  name.value = "";
  price.value = "";
  error.value = "";
};

const handleSubmit = async () => {
  error.value = "";
  isLoading.value = true;

  try {
    if (editingProduct.value) {
      await productService.update(editingProduct.value.uuid, {
        name: name.value,
        price: price.value,
      });
      cancelEdit();
    } else {
      await productService.create({ name: name.value, price: price.value });
      name.value = "";
      price.value = "";
    }
    await fetchProducts();
  } catch (err: any) {
    error.value = err?.message || "Something went wrong.";
  } finally {
    isLoading.value = false;
  }
};

const handleDelete = async (uuid: string) => {
  if (!confirm("Are you sure you want to delete this product?")) return;

  deletingUuid.value = uuid;
  try {
    await productService.delete(uuid);
    await fetchProducts();
  } catch (err: any) {
    error.value = err?.message || "Failed to delete product.";
  } finally {
    deletingUuid.value = null;
  }
};

onMounted(fetchProducts);
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

/* Products */
.products-card {
  padding: 24px 0 8px 0;
}

.products-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 28px 16px 28px;
}

.products-header .section-title {
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

.product-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px 28px;
  border-top: 1px solid #f1f5f9;
  gap: 12px;
  transition: background 0.15s;
}

.product-row:hover {
  background: #f8faf8;
}

.product-info {
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
}

.product-name {
  font-size: 0.95rem;
  font-weight: 600;
  color: #1a1a2e;
}

.product-id {
  font-family: 'DM Mono', monospace;
  font-size: 0.72rem;
  color: #9ca3af;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
}

.product-actions {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
}

.product-price {
  font-size: 0.95rem;
  font-weight: 700;
  color: #2E6F40;
  min-width: 50px;
  text-align: right;
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
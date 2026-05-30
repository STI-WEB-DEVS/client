import { productService } from "~/api/product/ProductService";

export const useProduct = () => {
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
  window.scrollTo({ top: 0, behavior: 'smooth' });
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

return {
    name,
    price,
    error,
    isLoading,
    isLoadingList,
    deletingUuid,
    editingProduct,
    viewingProduct,
    products,
    openModal,
    closeModal,
    fetchProducts,
    startEdit,
    cancelEdit,
    handleSubmit,
    handleDelete,
};
}
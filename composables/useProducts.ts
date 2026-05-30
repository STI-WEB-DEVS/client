import type { Product } from "~/composables/useCart";
import { productService } from "~/api/product/ProductService";

type ProductApiItem = {
  uuid?: string;
  name?: string;
  price?: number | string;
  quantity?: number | string | null;
  description?: string | null;
  product_description?: string | null;
  imageUrl?: string | null;
  image_url?: string | null;
  image?: string | null;
  thumbnail?: string | null;
  photo?: string | null;
  [key: string]: any;
};

const normalizeProductsResponse = (response: any): ProductApiItem[] => {
  if (Array.isArray(response)) return response;
  if (Array.isArray(response?.data)) return response.data;
  return [];
};

const hasAvailableQuantity = (item: ProductApiItem) => {
  if (item?.quantity == null || item.quantity === "") return true;

  const quantity = Number(item.quantity);
  return Number.isFinite(quantity) && quantity > 0;
};

const mapToProduct = (item: ProductApiItem): Product | null => {
  const uuid = (item?.uuid || "").toString().trim();
  const name = (item?.name || "").toString().trim();
  const price =
    typeof item?.price === "string"
      ? Number.parseFloat(item.price)
      : Number(item?.price);
  const description =
    item?.description ?? item?.product_description ?? undefined;
  const imageUrl = (item?.imageUrl ||
    item?.image_url ||
    item?.image ||
    item?.thumbnail ||
    item?.photo ||
    undefined) as string | undefined;

  if (!uuid || !name) return null;
  return {
    uuid,
    name,
    price: Number.isFinite(price) ? price : 0,
    description: description == null ? undefined : String(description),
    imageUrl: imageUrl ? String(imageUrl) : undefined,
  };
};

export const useProducts = () => {
  const products = useState<Product[]>("customer_products", () => []);
  const pending = useState<boolean>("customer_products_pending", () => false);
  const error = useState<string>("customer_products_error", () => "");

  const refresh = async () => {
    pending.value = true;
    error.value = "";

    try {
      const response = await productService.list();
      const items = normalizeProductsResponse(response);
      products.value = items
        .filter(hasAvailableQuantity)
        .map(mapToProduct)
        .filter((p): p is Product => Boolean(p));
    } catch (e: any) {
      error.value = e?.message || "Failed to load products.";
      products.value = [];
    } finally {
      pending.value = false;
    }
  };

  return { products, pending, error, refresh };
};

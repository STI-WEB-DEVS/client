# Stock Synchronization Fix

## Problem
The stock quantities displayed on the admin side and customer side were not the same. The customer side was not showing the product stock quantities at all.

## Root Cause
The `useProducts` composable (used on the customer side) was not mapping the `quantity` field from the API response to the Product objects. This meant:
- Customer side products had no stock information
- ProductList component couldn't display stock levels
- Cart validation couldn't check against available stock

## Solution

### 1. Updated Product Type Definition
**File:** `client/composables/useCart.ts`

Changed the `Product` type to make `quantity` a required field (not optional):
```typescript
export type Product = {
  uuid: string;
  name: string;
  price: number;
  quantity: number; // Stock quantity - now required
  description?: string;
  imageUrl?: string;
};
```

Also clarified the `CartItem` type to be separate from Product:
```typescript
export type CartItem = {
  uuid: string;
  name: string;
  price: number;
  quantity: number; // Cart quantity (how many in cart)
  description?: string;
  imageUrl?: string;
};
```

### 2. Updated useProducts Composable
**File:** `client/composables/useProducts.ts`

Added quantity field mapping in three places:

#### a) ProductApiItem Type
```typescript
type ProductApiItem = {
  uuid?: string;
  name?: string;
  price?: number | string;
  quantity?: number | string; // Added this
  description?: string | null;
  imageUrl?: string | null;
  // ... other fields
};
```

#### b) mapToProduct Function
```typescript
const mapToProduct = (item: ProductApiItem): Product | null => {
  // ... existing code
  
  const quantity =
    typeof item?.quantity === "string"
      ? Number.parseInt(item.quantity, 10)
      : Number(item?.quantity);
  
  // ... existing code
  
  return {
    uuid,
    name,
    price: Number.isFinite(price) ? price : 0,
    quantity: Number.isFinite(quantity) && quantity >= 0 ? quantity : 0, // Added this
    description,
    imageUrl: imageUrl ? String(imageUrl) : undefined,
  };
};
```

### 3. Updated Cart Logic
**File:** `client/composables/useCart.ts`

#### a) Updated addItem Function
Modified to not store the product's stock quantity in the cart (only cart quantity):
```typescript
const addItem = (product: Product, quantity = 1) => {
  // ... validation code
  
  // Add new item to cart (without the stock quantity field in cart storage)
  cart.value.push({ 
    uuid: product.uuid,
    name: product.name,
    price: product.price,
    quantity: q, // This is cart quantity, not stock
    description: product.description,
    imageUrl: product.imageUrl,
  });
};
```

#### b) Simplified setQuantity Function
Removed stock checking from setQuantity since cart items don't track stock:
```typescript
const setQuantity = (productUuid: string, quantity: number) => {
  const q = clampInt(quantity, 1, 999);
  const idx = cart.value.findIndex((i) => i.uuid === productUuid);
  if (idx < 0) return;
  
  cart.value[idx] = { ...cart.value[idx], quantity: q };
};
```

### 4. Updated Cart Page
**File:** `client/pages/customer/cart.vue`

#### a) Removed Stock Display from Cart Items
Removed the stock display since cart items don't have stock info:
```vue
<!-- Removed this -->
<p v-if="item.quantity && item.quantity > 0" class="mt-1 text-xs text-gray-500">
  {{ item.quantity }} in stock
</p>
```

#### b) Fixed Increment Button Logic
Simplified the disabled condition:
```vue
<button
  :disabled="item.quantity >= 999"
  @click="setQuantity(item.uuid, item.quantity + 1)"
>
```

## How It Works Now

### Data Flow

1. **Admin Side:**
   - Fetches products directly from API with `productService.list()`
   - Displays `product.quantity` (stock) in the table
   - Can update stock via edit or restock modal

2. **Customer Side:**
   - Fetches products via `useProducts` composable
   - `useProducts` now properly maps the `quantity` field from API
   - ProductList displays stock with badges (green for in stock, red for out of stock)
   - Buttons are disabled when `quantity === 0`

3. **Cart:**
   - Stores only cart quantities (how many items customer wants)
   - Does NOT store product stock quantities
   - Stock validation happens at:
     - Add to cart time (checks product.quantity)
     - Checkout time (re-validates against current API stock)

4. **Checkout:**
   - Validates stock in real-time before placing order
   - Fetches current product data from API
   - Adjusts cart if stock has changed
   - Backend validates again during order creation

## Benefits

✅ **Consistent Stock Display:** Admin and customer see the same stock numbers  
✅ **Real-time Validation:** Stock is validated at multiple points  
✅ **Separation of Concerns:** Cart quantity vs. stock quantity are clearly separated  
✅ **Type Safety:** TypeScript types now correctly reflect the data structure  
✅ **Better UX:** Customers can see stock availability before adding to cart  

## Testing Checklist

- [ ] Admin side shows correct stock quantities
- [ ] Customer side shows correct stock quantities
- [ ] Stock badges display correctly (green/red)
- [ ] Out of stock products have disabled buttons
- [ ] Adding to cart checks stock availability
- [ ] Checkout validates stock in real-time
- [ ] Stock updates in admin reflect immediately on customer side (after refresh)
- [ ] Cart doesn't show stock info (only cart quantities)

## Files Modified

1. `client/composables/useCart.ts` - Updated Product and CartItem types
2. `client/composables/useProducts.ts` - Added quantity field mapping
3. `client/pages/customer/cart.vue` - Removed stock display, fixed button logic

## Conclusion

The stock synchronization issue has been resolved. Both admin and customer sides now display the same stock quantities from the API. The customer side properly maps the `quantity` field, enabling proper stock display and validation throughout the shopping experience.

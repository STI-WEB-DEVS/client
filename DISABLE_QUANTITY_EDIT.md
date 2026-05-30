# Disable Stock Quantity in Product Edit

## Change Summary
Disabled the ability to directly edit stock quantity when updating a product. Stock can only be modified through the dedicated "Restock" feature.

## Rationale
- **Inventory Control:** Prevents accidental stock changes during product updates
- **Audit Trail:** All stock changes should go through the restock feature for better tracking
- **User Experience:** Clear separation between product details (name, price, description) and inventory management (stock quantity)
- **Business Logic:** Stock changes should be additive (restock) rather than direct edits

## Changes Made

### 1. Frontend - ProductForm Component
**File:** `client/components/ProductForm.vue`

#### Disabled Quantity Input in Update Mode
```vue
<input
  id="quantity"
  v-model.number="form.quantity"
  type="number"
  min="0"
  step="1"
  :disabled="mode === 'update'"
  :class="[
    'mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500',
    mode === 'update' ? 'bg-gray-100 cursor-not-allowed text-gray-500' : ''
  ]"
  :required="mode === 'create'"
/>
<p v-if="mode === 'update'" class="mt-1 text-sm text-gray-500">
  Use the "Restock" button to update stock quantity
</p>
```

**Key Changes:**
- Added `:disabled="mode === 'update'"` to disable input in update mode
- Added conditional CSS classes for disabled state (gray background, not-allowed cursor)
- Made field required only in create mode (`:required="mode === 'create'"`)
- Added helper text directing users to use the Restock button

#### Excluded Quantity from Update Payload
```typescript
// Don't send quantity in update - use restock instead
const updatePayload: any = {
  name: form.name,
  price: form.price,
  description: form.description || null
};

const response = await productService.update(props.product.uuid, updatePayload)
```

**Key Changes:**
- Removed `quantity` from the update payload
- Only sends name, price, and description

### 2. Backend - ProductService
**File:** `server/app/Service/ProductService.php`

#### Prevent Quantity Updates
```php
public function updateProduct(string $uuid, array $payload)
{
    // Remove quantity from payload to prevent direct updates
    // Use restockProduct() method instead
    unset($payload['quantity']);
    
    $model = $this->productRepository->update($uuid, $payload);
    return new ProductResource($model);
}
```

**Key Changes:**
- Added `unset($payload['quantity'])` to remove quantity from payload
- Added comment explaining to use `restockProduct()` instead
- Provides server-side protection even if frontend sends quantity

## User Experience

### Create Product Mode
- ✅ Quantity field is **enabled** and **required**
- ✅ Admin must set initial stock when creating a product
- ✅ Field appears normal (white background)

### Update Product Mode
- ✅ Quantity field is **disabled** (read-only)
- ✅ Field shows current stock value but cannot be edited
- ✅ Field has gray background with not-allowed cursor
- ✅ Helper text: "Use the 'Restock' button to update stock quantity"
- ✅ Quantity is not sent in update request

### Restock Feature
- ✅ Dedicated "Restock" button in product list
- ✅ Opens RestockModal for adding stock
- ✅ Automatically adds to existing quantity
- ✅ Shows preview of new stock level

## Benefits

1. **Data Integrity:** Prevents accidental stock overwrites
2. **Clear Intent:** Stock changes are explicit through restock feature
3. **Better UX:** Users understand they need to use restock for inventory
4. **Audit Trail:** All stock changes go through dedicated endpoint
5. **Server Protection:** Backend also blocks quantity updates

## How to Update Stock

### For Admins:
1. Go to Products page
2. Find the product you want to restock
3. Click the **"Restock"** button (not Edit)
4. Enter the quantity to add
5. Click "Restock" to confirm

The system will automatically add the entered quantity to the existing stock.

## Testing Checklist

- [x] Create product: quantity field is enabled and required
- [x] Update product: quantity field is disabled (gray, read-only)
- [x] Update product: helper text is displayed
- [x] Update product: quantity is not sent in API request
- [x] Backend: quantity is removed from payload even if sent
- [x] Restock feature: still works correctly
- [x] Restock feature: adds to existing quantity

## Files Modified

1. `client/components/ProductForm.vue` - Disabled quantity input in update mode
2. `server/app/Service/ProductService.php` - Remove quantity from update payload

## Conclusion

Stock quantity can no longer be directly edited when updating a product. This ensures better inventory control and forces all stock changes to go through the dedicated restock feature, which provides better tracking and prevents accidental overwrites.

# Inventory Management System Documentation

## Overview
This document describes the complete stock quantity/inventory management system implemented for the e-commerce application. The system handles inventory tracking from both Admin and Customer perspectives with proper validation and stock management.

---

## 1. Database Schema

### Products Table Fields
- `id` - Auto-increment primary key
- `uuid` - Unique identifier for API operations
- `name` - Product name (validated: letters, spaces, hyphens, apostrophes only)
- `price` - Product price (decimal 10,2)
- `description` - Product description (text, nullable)
- `stock` - Stock quantity (integer, default: 0)
- `created_at` - Timestamp
- `updated_at` - Timestamp

### Migrations
- **2026_03_06_143808_create_commerce_tables.php** - Initial tables
- **2026_05_30_081446_add_stock_to_products_table.php** - Added stock field
- **2026_05_30_085626_add_description_to_products_table.php** - Added description field

---

## 2. Backend Implementation (Laravel)

### Product Model (`app/Models/Product.php`)
```php
protected $fillable = [
    'name',
    'price',
    'stock',
    'description',
];
```

### Product Controller (`app/Http/Controllers/API/ProductController.php`)

#### Validation Rules

**Create Product (`store` method):**
- `name`: Required, string, max 255 chars, regex pattern `/^[a-zA-Z\s\-\']+$/`
- `price`: Required, numeric, min 0
- `stock`: Required, integer, min 0
- `description`: Nullable, string, max 1000 chars

**Update Product (`update` method):**
- Same validation rules as create, but all fields are optional (using `sometimes`)

**Restock Product (`restock` method):**
- `quantity`: Required, integer, min 1
- Automatically adds quantity to existing stock using `increment()`

### API Routes (`routes/api.php`)
```php
Route::post('/products/{id}/restock', [ProductController::class, 'restock']);
Route::apiResources(['products' => ProductController::class]);
```

### Order Processing (`app/Http/Controllers/API/OrderController.php`)

The `store` method implements:
1. **Database Transaction** - Ensures atomic operations
2. **Row Locking** - Uses `lockForUpdate()` to prevent race conditions
3. **Stock Validation** - Checks if sufficient stock is available
4. **Stock Deduction** - Decrements stock using `decrement()`
5. **Error Handling** - Throws exception if insufficient stock

```php
if ($product->stock < $item['quantity']) {
    throw new \Exception("Sorry, '{$product->name}' only has {$product->stock} units left in stock.");
}
$product->decrement('stock', $item['quantity']);
```

---

## 3. Frontend Implementation (Nuxt/Vue)

### Product Service (`api/product/ProductService.ts`)

New method added:
```typescript
async restock(uuid: string, quantity: number): Promise<any> {
  return await this.request(`${this.resource}/${uuid}/restock`, 'POST', { quantity });
}
```

### Product Form Component (`components/ProductForm.vue`)

**Features:**
- Name field with pattern validation (letters, spaces, hyphens, apostrophes only)
- Price field (numeric input, step 0.01)
- Description field (textarea, optional)
- Stock quantity field (integer input)
- Frontend validation with error messages
- Backend validation error handling

**Validation:**
```typescript
const namePattern = /^[a-zA-Z\s\-']+$/;
if (!namePattern.test(form.name)) {
  errors.name = 'Product name must contain only letters, spaces, hyphens, and apostrophes.';
}
```

### Cart Composable (`composables/useCart.ts`)

**Enhanced CartItem Interface:**
```typescript
export interface CartItem {
  product_uuid: string;
  name: string;
  price: number;
  quantity: number;
  stock?: number;  // Added for stock tracking
  image?: string;
}
```

**Stock Validation in `addToCart`:**
- Checks available stock before adding
- Prevents adding more than available quantity
- Returns appropriate error messages

**Stock Validation in `updateQuantity`:**
- Prevents increasing quantity beyond available stock
- Returns error message when limit is reached

---

## 4. Admin Panel Features

### Product Index Page (`pages/admin/product/index.vue`)

**Table Columns:**
- ID
- Name
- Price (formatted with $ symbol)
- **Stock** (color-coded):
  - Green: > 5 units
  - Amber: 1-5 units (low stock)
  - Red: 0 units (out of stock)

**Actions:**
- **Restock Button** - Opens modal to add stock
- View - Navigate to product detail page
- Edit - Open edit modal with ProductForm
- Delete - Remove product with confirmation

**Restock Modal:**
- Shows current stock level
- Input field for quantity to add
- Displays calculated new stock level
- Validates minimum quantity of 1
- Automatically refreshes product list after restocking

### Product Detail Page (`pages/admin/product/[uuid].vue`)

**Displays:**
- Product UUID
- Name
- Price (formatted)
- **Stock Quantity** (color-coded with status labels)
- **Description**

---

## 5. Customer-Facing Features

### Shop Page (`pages/customer/shop.vue`)

**Product Display:**
- Stock status indicators:
  - ✓ In Stock (X units available) - Green, when stock > 5
  - ⚠️ Only X left in stock! - Amber with pulse animation, when 1-5 units
  - 🚫 Out of Stock / Sold Out - Red, when stock = 0

**Buttons:**
- "Add to Cart" - Disabled when out of stock
- "Buy Now" - Disabled when out of stock
- Both buttons show "Sold Out" text when stock = 0

**Feedback Messages:**
- Green notification for successful additions
- Amber notification for stock limit warnings

### Cart Page (`pages/customer/cart.vue`)

**Features:**
- Displays available stock for each item
- Stock status color-coding (green/amber/red)
- Quantity controls with stock limits:
  - Minus button: Decrease quantity (removes if reaches 0)
  - Plus button: Increase quantity (disabled when at stock limit)
- Stock warning banner (appears for 3 seconds)
- Remove item button

**Stock Validation:**
- Prevents increasing quantity beyond available stock
- Shows warning message when limit is reached
- Disables plus button when at maximum

### Checkout Page (`pages/customer/checkout.vue`)

**Stock Validation:**
- Backend validates stock availability during order submission
- Displays error message if any item exceeds available stock
- Uses database transactions to ensure data consistency
- Shows loading state during submission

---

## 6. Validation Rules Summary

### Product Name
- **Frontend:** HTML5 pattern attribute + JavaScript validation
- **Backend:** Laravel regex validation
- **Rule:** Only letters, spaces, hyphens (-), and apostrophes (')
- **Error Message:** "Product name must contain only letters, spaces, hyphens, and apostrophes."

### Product Price
- **Frontend:** HTML5 number input with min="0" step="0.01"
- **Backend:** Laravel numeric validation with min:0
- **Rule:** Numeric values only, including decimals
- **Error Message:** "Price must be a valid number greater than or equal to 0."

### Stock Quantity
- **Frontend:** HTML5 number input with min="0" step="1"
- **Backend:** Laravel integer validation with min:0
- **Rule:** Whole numbers only, no decimals
- **Error Message:** "Stock must be a valid whole number greater than or equal to 0."

---

## 7. Stock Management Workflow

### Admin Workflow

1. **Add Product:**
   - Fill in name, price, description, and initial stock
   - Validation ensures proper data format
   - Product created with specified stock level

2. **Edit Product:**
   - Can directly edit stock quantity
   - Or use Restock feature to add to existing stock

3. **Restock Product:**
   - Click "Restock" button on product row
   - Enter quantity to add (not total quantity)
   - System automatically calculates new total
   - Stock is incremented by specified amount

### Customer Workflow

1. **Browse Products:**
   - See stock availability for each product
   - Visual indicators for stock levels
   - Cannot add out-of-stock items to cart

2. **Add to Cart:**
   - System checks available stock
   - Prevents adding more than available
   - Shows warning if limit reached

3. **Manage Cart:**
   - View available stock for each item
   - Adjust quantities within stock limits
   - Plus button disabled at maximum

4. **Checkout:**
   - Backend validates stock availability
   - Stock deducted only on successful order
   - Transaction rolled back if any item out of stock
   - Clear error messages for stock issues

---

## 8. Race Condition Prevention

The system uses Laravel's `lockForUpdate()` during order processing:

```php
$product = Product::where('uuid', $item['product_uuid'])
    ->lockForUpdate()
    ->firstOrFail();
```

This ensures:
- No two orders can process the same product simultaneously
- Stock levels remain accurate under concurrent requests
- Database consistency is maintained

---

## 9. Error Handling

### Frontend Errors
- Validation errors displayed inline with form fields
- Toast notifications for stock warnings
- Disabled buttons for invalid actions

### Backend Errors
- Validation errors returned with 422 status
- Stock shortage errors with descriptive messages
- Transaction rollback on any failure

---

## 10. Testing Checklist

### Admin Panel
- [ ] Create product with all fields
- [ ] Edit product stock directly
- [ ] Use restock feature to add stock
- [ ] Verify stock column displays correctly
- [ ] Test validation for name (no numbers)
- [ ] Test validation for price (numeric only)
- [ ] View product detail with stock info

### Customer Side
- [ ] Browse products with stock indicators
- [ ] Add in-stock product to cart
- [ ] Try adding out-of-stock product (should be disabled)
- [ ] Increase cart quantity up to stock limit
- [ ] Try exceeding stock limit (should show warning)
- [ ] Complete checkout with sufficient stock
- [ ] Try checkout with insufficient stock (should show error)
- [ ] Verify stock decreases after successful order

### Edge Cases
- [ ] Multiple users ordering same product simultaneously
- [ ] Adding last unit to cart
- [ ] Restocking product to zero
- [ ] Negative stock prevention
- [ ] Empty cart checkout prevention

---

## 11. Future Enhancements

Potential improvements:
- Low stock email notifications for admins
- Reserved stock during checkout process
- Stock history/audit log
- Bulk import/export of stock levels
- Automatic reorder points
- Supplier management integration
- Stock forecasting based on sales trends

---

## Summary

The inventory management system provides:
✅ Complete stock tracking from database to UI
✅ Proper validation on both frontend and backend
✅ Admin tools for managing and restocking products
✅ Customer-facing stock availability indicators
✅ Prevention of overselling through validation
✅ Automatic stock deduction on order completion
✅ Race condition prevention with database locking
✅ Clear error messages and user feedback
✅ Responsive UI with color-coded stock levels

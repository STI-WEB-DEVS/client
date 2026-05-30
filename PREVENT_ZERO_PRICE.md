# Prevent Zero Price Products

## Change Summary
Added validation to prevent creating or updating products with a price of zero. Products must now have a minimum price of 0.01.

## Rationale
- **Business Logic:** Products should have a meaningful price
- **Data Quality:** Prevents accidental creation of free products
- **User Experience:** Clear error messages guide users to enter valid prices
- **Consistency:** Validation on both frontend and backend

## Changes Made

### 1. Backend - ProductStoreRequest (Create)
**File:** `server/app/Http/Requests/ProductStoreRequest.php`

#### Updated Validation Rule
Changed minimum price from `0` to `0.01`:
```php
public function rules(): array
{
    return [
        'name' => 'required|string|max:255|regex:/^[a-zA-Z\s\-\']+$/',
        'price' => 'required|numeric|min:0.01|regex:/^\d+(\.\d{1,2})?$/', // Changed from min:0
        'quantity' => 'required|integer|min:0',
        'description' => 'nullable|string|max:1000',
    ];
}
```

#### Added Custom Error Message
```php
public function messages(): array
{
    return [
        'name.regex' => 'Product name must contain only letters, spaces, hyphens, and apostrophes.',
        'price.min' => 'Price must be greater than zero.', // Added this
        'price.regex' => 'Price must be a valid number with up to 2 decimal places.',
        'quantity.integer' => 'Quantity must be a whole number.',
        'quantity.min' => 'Quantity cannot be negative.',
    ];
}
```

### 2. Backend - UpdateProductRequest (Update)
**File:** `server/app/Http/Requests/UpdateProductRequest.php`

#### Updated Validation Rule
Changed minimum price from `0` to `0.01`:
```php
public function rules(): array
{
    return [
        'name'  => 'string|max:255|regex:/^[a-zA-Z\s\-\']+$/',
        'price' => 'numeric|min:0.01|regex:/^\d+(\.\d{1,2})?$/', // Changed from min:0
        'quantity' => 'integer|min:0',
        'description' => 'nullable|string|max:1000',
    ];
}
```

#### Added Custom Error Message
```php
public function messages(): array
{
    return [
        'name.regex' => 'Product name must contain only letters, spaces, hyphens, and apostrophes.',
        'price.min' => 'Price must be greater than zero.', // Added this
        'price.regex' => 'Price must be a valid number with up to 2 decimal places.',
        'quantity.integer' => 'Quantity must be a whole number.',
        'quantity.min' => 'Quantity cannot be negative.',
    ];
}
```

### 3. Frontend - ProductForm Component
**File:** `client/components/ProductForm.vue`

#### Updated HTML Input
Changed minimum value from `0` to `0.01`:
```vue
<input
  id="price"
  v-model="form.price"
  type="number"
  step="0.01"
  min="0.01"  <!-- Changed from min="0" -->
  class="mt-1 block w-full h-12 rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
  required
/>
```

#### Updated JavaScript Validation
Changed validation logic to reject zero and negative prices:
```typescript
// Validate price - must be numeric and positive
if (form.price <= 0) {  // Changed from < 0
  errors.price = 'Price must be greater than zero.'
  isValid = false
} else if (isNaN(form.price)) {
  errors.price = 'Price must be a valid number.'
  isValid = false
}
```

## Validation Layers

### Layer 1: HTML Input Validation
- `min="0.01"` attribute prevents entering values below 0.01
- Browser shows native validation message
- Works before form submission

### Layer 2: Frontend JavaScript Validation
- Checks if `form.price <= 0`
- Shows custom error message: "Price must be greater than zero."
- Prevents API call if validation fails

### Layer 3: Backend Validation (Create)
- `min:0.01` rule in ProductStoreRequest
- Returns 422 error with message: "Price must be greater than zero."
- Prevents database insertion

### Layer 4: Backend Validation (Update)
- `min:0.01` rule in UpdateProductRequest
- Returns 422 error with message: "Price must be greater than zero."
- Prevents database update

## User Experience

### Creating a Product with Zero Price
1. User enters `0` or `0.00` in price field
2. Browser may show native validation (depending on browser)
3. If user bypasses browser validation, frontend JavaScript catches it
4. Error message displays: "Price must be greater than zero."
5. Submit button remains enabled but form won't submit
6. If somehow frontend is bypassed, backend returns 422 error

### Updating a Product to Zero Price
1. Same validation flow as create
2. Update is prevented at all layers

### Valid Prices
- Minimum: `0.01` (1 cent)
- Maximum: No limit (but must fit in decimal(10,2) database field)
- Format: Up to 2 decimal places (e.g., 10.99, 100.00, 5000.50)

## Error Messages

| Scenario | Message |
|----------|---------|
| Price is 0 | "Price must be greater than zero." |
| Price is negative | "Price must be greater than zero." |
| Price is not a number | "Price must be a valid number." |
| Price has more than 2 decimals | "Price must be a valid number with up to 2 decimal places." |

## Testing Checklist

- [x] Create product with price = 0 → Rejected
- [x] Create product with price = 0.00 → Rejected
- [x] Create product with price = -1 → Rejected
- [x] Create product with price = 0.01 → Accepted ✓
- [x] Create product with price = 1.00 → Accepted ✓
- [x] Update product to price = 0 → Rejected
- [x] Update product to price = 0.01 → Accepted ✓
- [x] Frontend validation shows error message
- [x] Backend validation returns 422 error
- [x] Error message is clear and helpful

## Files Modified

1. `server/app/Http/Requests/ProductStoreRequest.php` - Added min:0.01 validation
2. `server/app/Http/Requests/UpdateProductRequest.php` - Added min:0.01 validation
3. `client/components/ProductForm.vue` - Updated HTML input and JS validation

## Conclusion

Products can no longer be created or updated with a price of zero. The minimum allowed price is 0.01 (1 cent). This validation is enforced at multiple layers (HTML, frontend JavaScript, and backend) to ensure data integrity and provide a good user experience with clear error messages.

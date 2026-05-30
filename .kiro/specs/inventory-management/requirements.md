# Requirements Document

## Introduction

This feature adds a complete stock quantity and inventory management system to the existing Nuxt 3 (Vue) + Laravel e-commerce application. Currently, the `products` table has no `quantity` or `description` columns, the cart has no stock awareness, and order creation does not decrement stock. This feature closes all of those gaps from both the Admin and Customer perspectives.

Key areas of change:
- **Database**: Add `stock_quantity` and `description` columns to the `products` table.
- **Admin panel**: Expose those fields in the create/edit product forms; add a Restock action for additive stock top-ups.
- **Validation**: Enforce name-format and price-format rules on both the frontend (Nuxt) and backend (Laravel).
- **Customer shop / cart**: Show live stock, cap cart quantities at available stock, block out-of-stock purchases.
- **Order fulfilment**: Atomically decrement stock when an order is placed; reject the order if any item is under-stocked.

---

## Glossary

- **Admin**: An authenticated user with the `ADMIN` role who manages products via the admin panel.
- **Customer**: An authenticated user with the `CUSTOMER` role who browses and purchases products.
- **Product**: A sellable item stored in the `products` table, identified by a UUID.
- **Stock_Quantity**: The integer count of units currently available for a given Product. Must be ≥ 0.
- **Restock_Amount**: A positive integer entered by an Admin that is added to the current Stock_Quantity.
- **Cart**: The client-side collection of CartItems held in `localStorage` via the `useCart` composable.
- **CartItem**: A Product plus a chosen quantity stored in the Cart.
- **Order**: A confirmed purchase record created in the `orders` table, linked to a Customer and one or more OrderItems.
- **OrderItem**: A line in an Order recording the Product, quantity, and unit price at time of purchase.
- **Out_of_Stock**: The state of a Product whose Stock_Quantity equals 0.
- **ProductStoreRequest**: The Laravel Form Request class that validates product creation payloads.
- **UpdateProductRequest**: The Laravel Form Request class that validates product update payloads.
- **ProductService**: The Laravel service class responsible for product business logic.
- **OrderService**: The Laravel service class responsible for order creation and stock decrement logic.
- **ProductForm**: The Nuxt component used by Admins to create or update a Product.
- **useCart**: The Nuxt composable that manages the Cart state and persistence.
- **useProducts**: The Nuxt composable that fetches and normalises the product list for Customers.

---

## Requirements

### Requirement 1: Product Database Fields

**User Story:** As an Admin, I want products to store a stock quantity and a description, so that I can track inventory levels and provide product details to customers.

#### Acceptance Criteria

1. THE Database SHALL contain a `stock_quantity` column of type unsigned integer with a default value of 0 on the `products` table.
2. THE Database SHALL contain a `description` column of type nullable text on the `products` table.
3. THE Product Model SHALL include `stock_quantity` and `description` in its `$fillable` array.
4. WHEN a new Product is created without a `stock_quantity` value, THE Database SHALL store 0 as the default Stock_Quantity.

---

### Requirement 2: Admin – Create Product with Stock and Description

**User Story:** As an Admin, I want to enter a stock quantity and description when creating a product, so that inventory is tracked from the moment a product is added.

#### Acceptance Criteria

1. WHEN an Admin submits the create-product form, THE ProductForm SHALL include `stock_quantity` and `description` fields in the submitted payload.
2. WHEN a valid create-product request is received, THE ProductStoreRequest SHALL accept `stock_quantity` as a required integer ≥ 0.
3. WHEN a valid create-product request is received, THE ProductStoreRequest SHALL accept `description` as an optional string with a maximum length of 1000 characters.
4. WHEN a product is created successfully, THE ProductService SHALL persist the `stock_quantity` and `description` values to the database.

---

### Requirement 3: Admin – Edit Product Stock via Restock

**User Story:** As an Admin, I want to restock a product by entering an amount to add, so that I do not need to manually calculate the new total stock.

#### Acceptance Criteria

1. WHEN an Admin opens the edit-product form, THE ProductForm SHALL display a read-only field showing the current Stock_Quantity.
2. WHEN an Admin submits a restock action with a Restock_Amount, THE ProductForm SHALL send a restock request containing the Restock_Amount (not the new total).
3. WHEN a valid restock request is received, THE ProductService SHALL add the Restock_Amount to the existing Stock_Quantity and persist the result.
4. WHEN a valid restock request is received, THE ProductService SHALL return the updated Product including the new Stock_Quantity.
5. IF a restock request contains a Restock_Amount that is not a positive integer, THEN THE UpdateProductRequest SHALL reject the request with a descriptive validation error.

---

### Requirement 4: Product Name Validation

**User Story:** As an Admin, I want product names to contain only letters, spaces, hyphens, and apostrophes, so that product names remain readable and consistent.

#### Acceptance Criteria

1. WHEN an Admin submits a product name containing one or more numeric characters, THE ProductForm SHALL display an inline validation error and prevent form submission.
2. WHEN a create-product or update-product request contains a name with numeric characters, THE ProductStoreRequest SHALL reject the request with a validation error message.
3. WHEN a create-product or update-product request contains a name with characters other than letters, spaces, hyphens, and apostrophes, THE ProductStoreRequest SHALL reject the request with a validation error message.
4. WHEN a valid product name is submitted, THE ProductStoreRequest SHALL accept names consisting solely of letters (including accented characters), spaces, hyphens, and apostrophes.

---

### Requirement 5: Product Price Validation

**User Story:** As an Admin, I want the price field to accept only numeric values including decimals, so that invalid price data is never stored.

#### Acceptance Criteria

1. WHEN an Admin enters non-numeric characters in the price field, THE ProductForm SHALL display an inline validation error and prevent form submission.
2. WHEN a create-product or update-product request contains a price value that is not numeric, THE ProductStoreRequest SHALL reject the request with a validation error message.
3. WHEN a valid price is submitted, THE ProductStoreRequest SHALL accept decimal values with up to 2 decimal places and a minimum value of 0.01.
4. WHEN a create-product or update-product request contains a price of 0 or a negative number, THE ProductStoreRequest SHALL reject the request with a validation error message.

---

### Requirement 6: Customer – Stock Display

**User Story:** As a Customer, I want to see the available stock quantity for each product, so that I know how many units I can purchase.

#### Acceptance Criteria

1. WHEN the Customer shop page loads, THE useProducts composable SHALL include `stock_quantity` in the normalised Product data returned from the API.
2. WHEN a Product has a Stock_Quantity greater than 0, THE ProductList component SHALL display the Stock_Quantity alongside the product details.
3. WHEN a Product is Out_of_Stock, THE ProductList component SHALL display an "Out of Stock" label in place of the stock count.

---

### Requirement 7: Customer – Cart Stock Enforcement

**User Story:** As a Customer, I want to be prevented from adding more items to my cart than are available in stock, so that I cannot place an order for items that cannot be fulfilled.

#### Acceptance Criteria

1. WHEN a Customer attempts to add a Product to the Cart and the resulting CartItem quantity would exceed the Product's Stock_Quantity, THE useCart composable SHALL cap the CartItem quantity at the available Stock_Quantity.
2. WHEN a Customer attempts to add an Out_of_Stock Product to the Cart, THE useCart composable SHALL not add the item and SHALL return an error message indicating the product is out of stock.
3. WHEN a Customer increases a CartItem quantity on the cart page and the new quantity would exceed the Product's Stock_Quantity, THE Cart page SHALL disable the increment button and display the maximum available quantity.
4. WHEN a Product is Out_of_Stock, THE ProductList component SHALL disable the "Add to Cart" and "Buy Now" buttons for that Product.

---

### Requirement 8: Customer – Out-of-Stock Purchase Prevention

**User Story:** As a Customer, I want out-of-stock products to be clearly marked and non-purchasable, so that I am not misled into attempting a purchase that will fail.

#### Acceptance Criteria

1. WHEN a Product's Stock_Quantity is 0, THE ProductList component SHALL render the product card in a visually distinct disabled state.
2. WHEN a Product is Out_of_Stock, THE ProductList component SHALL display an "Out of Stock" badge on the product card.
3. WHEN a Customer navigates to the checkout page and a CartItem's Product has become Out_of_Stock since it was added, THE Checkout page SHALL display an error identifying the out-of-stock item and SHALL prevent the order from being placed.

---

### Requirement 9: Order Fulfilment – Stock Decrement

**User Story:** As a Customer, I want the product stock to be automatically reduced when my order is confirmed, so that the inventory always reflects actual available units.

#### Acceptance Criteria

1. WHEN an order is successfully created, THE OrderService SHALL decrement the Stock_Quantity of each ordered Product by the corresponding OrderItem quantity within a single database transaction.
2. WHEN an order creation request contains an item whose requested quantity exceeds the current Stock_Quantity of the Product, THE OrderService SHALL reject the entire order with a descriptive error and SHALL NOT decrement any stock.
3. WHEN an order creation request contains an item for an Out_of_Stock Product, THE OrderService SHALL reject the entire order with a descriptive error and SHALL NOT create any OrderItems.
4. AFTER a successful order, THE Stock_Quantity of each ordered Product SHALL equal its pre-order Stock_Quantity minus the ordered quantity.

---

### Requirement 10: API – Product Resource Includes Stock

**User Story:** As a developer, I want the product API responses to always include the stock quantity and description, so that both the admin panel and the customer shop have consistent data.

#### Acceptance Criteria

1. THE ProductResource SHALL include `stock_quantity` and `description` fields in every API response for a Product.
2. WHEN the product list endpoint is called, THE ProductResource collection SHALL include `stock_quantity` and `description` for each Product in the response.
3. WHEN the product detail endpoint is called for a specific UUID, THE ProductResource SHALL include `stock_quantity` and `description` in the response.

# ECOMERCE
[Edit on StackBlitz ⚡️](https://stackblitz.com/edit/stackblitz-starters-qmwfcz)

## CART Routes
/api/v1/cart
- GET "Get cart as customer"

## CARTITEM Routes
- /api/v1/products/:id/add-to-cart
- - POST "Add product to cart as customer"

- /api/v1/cartItem/:cartItemId
- - GET "Get a cart item as customer"
- - PATCH "Update quantity in cart item"
- - DELETE "Remo a cart item"

## ORDER Routes

- /api/v1/cart/:cartId/make-order
- - POST "Create an order by cartId"

- /api/v1/orders/
- - GET "Get all user orders"

- /api/v1/orders/:orderId
- - GET "Get user order by orderId"

- /api/v1/orders/:orderId/cancel
- - Patch "Cancel an order as customer"

- /api/v1/orders/:orderId/finish
- - Patch "Cancel an order as superUser"



# ECOMERCE

## PRODUCT ROUTES

/api/v1/products
- Get "Get all products"
 #### Params: no params.
 #### Querys: no querys.
 #### Body: no body.

/api/v1/products/:id
 - Get "Get a product by id"
#### Params: product id.
#### Querys: no querys.
#### Body: no body.

 /api/v1/products
 - Post "Create a product"
#### Params: no params.
#### Querys: no querys.
#### Body:
```javascript
const newProduct = {
      title: "string",
      description: "string",
      //price is of type number
      price: 2,
      //status is optional and its value is active by default
      //Acepted values are: active inactive
      status: "string",
      categoryId: "string",
      sellerId: "string",
    }
```

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

- /api/v1/orders
- - GET "Get all user orders"

- /api/v1/orders/:orderId
- - GET "Get user order by orderId"

- /api/v1/orders/:orderId/cancel
- - Patch "Cancel an order as customer"

- /api/v1/orders/:orderId/finish
- - Patch "Cancel an order as superUser"

## USER Routes

- /api/v1/auth/register
- - POST "Create a new user"

- /api/v1/users/my-user
- - GET "Get my own user"
- - PUT "Update my own user"
- - DELETE "Delete my own user"



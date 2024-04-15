# ECOMERCE

## PRODUCT ROUTES

GET - "GET ALL PRODUCTS"
- /api/v1/products
      Auth:no 
      Params: No params.
      Querys:(productInfo, categoryId, page) 
      Body: no body. 

GET - "GET A PRODUCT BY ID"
- /api/v1/products/:id
- - Auth:No
- - Params: productId.
- - Querys: no querys.
- - Body: no body.

POST "CREATE A PRODUCT
- /api/v1/products
- - Auth:Yes (Only for sellers).
- - Params: no params.
- - Querys: no querys.
- - Body: (title, description, price, status, categoryId)
```javascript
const newProduct = {
      title: "string",
      description: "string",
      price: 2, //Type number
      status: "string", //Value is Optional "active" or "inactive"
      categoryId: "string"
    }
```
PUT "UPDATE A PRODUCT"
- /api/v1/products
- - Auth:Yes (Only for sellers).
- - Params: product id.
- - Querys: no querys.
- - Body: (title, description, price, status, categoryId);
- - - Example:
 
```javascript
const newData = {
      title: "string" //Optional
      description: "string" //Optional
      price: 100 // Type number Optional
      status: "string" //Value: ["active","inactive"] Optional
      categoryId: "string" //Optional
      }
```
## CART ROUTES

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



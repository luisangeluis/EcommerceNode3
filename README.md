# ECOMERCE
<hr />
Yo can simulate e-commerce operations in this app, such as viewing products, viewing product details, adding productos to the cart, getting your cart, adding and removing products from your cart, etc.

### Settings
It's necessary to add some environment variables, to run the proyect.

<u>For test users</u>
- TEST_USER_PASSWORD

<u>For database</u>

- DB_DIALECT
- DB_HOST
- DB_NAME
- DB_PASSWORD
- DB_USER

<u>For Cloudinary api</u>

- CLOUDINARY_API_KEY
- CLOUDINARY_API_SECRET
- CLOUDINARY_CLOUD_NAME

<u>To generate tokens</u>

- JWT_KEY

<u>For node</u>

- NODE_ENV



# Documentation here
<hr />

[<img src="https://run.pstmn.io/button.svg" alt="Run In Postman" style="width: 128px; height: 32px;">](https://god.gw.postman.com/run-collection/12459556-7552f8b8-e8cf-44ef-8c14-46711723ab6f?action=collection%2Ffork&source=rip_markdown&collection-url=entityId%3D12459556-7552f8b8-e8cf-44ef-8c14-46711723ab6f%26entityType%3Dcollection%26workspaceId%3D71ad64ae-0aad-4cfb-8578-51338e5569a6)


# ROUTES
<hr />

### PRODUCT ROUTES

GET - "GET ALL PRODUCTS"
- /api/v1/products

        Auth:no 
        Params: No params.
        Optional querys:(productInfo, categoryId, page) 
        Body: no body. 

GET - "GET A PRODUCT BY ID"
- /api/v1/products/:id

        Auth:No
        Params: productId.
        Optional querys: no querys.
        Body: no body.

POST "CREATE A PRODUCT
- /api/v1/products

        Auth:Yes (Only for sellers).
        Params: no params.
        Optional querys: no querys.
        Body: (title, description, price, status, categoryId)
Example
```javascript
const newProduct = {
      title: "string",
      description: "string",
      price: 2, //Type number
      status: "string", //Value is Optional "active" or "inactive"
      categoryId: "string"
    }
```
PUT "UPDATE A PRODUCT BY ID"
- /api/v1/products/${id}

        Auth:Yes (Only for sellers).
        Params: product id.
        Optional querys: no querys.
        Body: (title, description, price, status, categoryId);
Example:
 
```javascript
const newData = {
      title: "string" //Optional
      description: "string" //Optional
      price: 100 // Type number Optional
      status: "string" //Value: ["active","inactive"] Optional
      categoryId: "string" //Optional
      }
```
DELETE "DELETE A PRODUCT BY ID"
- /api/v1/products/${id}

        Auth:Yes (Only for sellers).
        Params: product id.
        Optional querys: no querys.
        Body: no body;

### CART ROUTES

/api/v1/cart
- GET "Get cart as customer"

### CARTITEM ROUTES

/api/v1/products/:id/add-to-cart
- POST "Add product to cart"

          Auth:Yes (Route for sellers and customers).
          Params: product id.
          Optional querys: no querys.
          Body: no body;

/api/v1/cartItem/:cartItemId
- PATCH "Update quantity in cart item"

          Auth:Yes (Route for sellers and customers).
          Params: cartItemId.
          Optional querys: no querys.
          Body: quantity:(Type number, Mandatory);
  
- DELETE "Delete a cart item"

          Auth:Yes (Route for sellers and customers).
          Params: cartItemId.
          Optional querys: no querys.
          Body: no body;

### ORDER ROUTES

/api/v1/cart/make-order
- POST "Create an order by cartId"

          Auth:Yes (Route for sellers and customers).
          Params: no params.
          Optional querys: no querys.
          Body: no body;

/api/v1/orders
- GET "Get all user orders"

          Auth:Yes (Route for sellers and customers).
          Params: no params.
          Optional querys: no querys.
          Body: no body;

/api/v1/orders/:orderId
- GET "Get user order by orderId"

          Auth:Yes (Route for sellers and customers).
          Params: order id.
          Optional querys: no querys.
          Body: no body;

/api/v1/orders/:orderId/pay
- Patch "Pay an order"

          Auth:Yes (Route for sellers and customers).
          Params: order id.
          Optional querys: no querys.
          Body: no body;

/api/v1/orders/:orderId/cancel
- Patch "Cancel an order as customer"

          Auth:Yes (Route for sellers and customers).
          Params: order id.
          Optional querys: no querys.
          Body: no body;



# ECOMERCE
<hr />
Yo can simulate e-commerce operations in this app, such as viewing products, viewing product details, adding productos to the cart, getting your cart, adding and removing products from your cart, etc.

### Settings
It's necessary to add some environment variables, to run the proyect.

<u>For test users</u>
 
- TEST_CUSTOMER_PASSWORD (FOR development)
- TEST_SELLER_PASSWORD (FOR development)

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

- GET - "GET ALL PRODUCTS"
/api/v1/products

        Auth:no 
        Params: No params.
        Optional querys:(productInfo, categoryId, page) 
        Body: no body. 

- GET - "GET A PRODUCT BY ID"
/api/v1/products/:id

        Auth:No
        Params: productId.
        Optional querys: no querys.
        Body: no body.



### CART ROUTES

- GET "Get cart as customer"
/api/v1/cart

        Auth:Yes
        Params: no params.
        Optional querys: no querys.
        Body: no body.

### CARTITEM ROUTES

- POST "Add product to cart"
/api/v1/products/:id/add-to-cart

          Auth:Yes (Route for sellers and customers).
          Params: product id.
          Optional querys: no querys.
          Body: no body;

- PATCH "Update quantity in cart item"
/api/v1/cartItem/:cartItemId

          Auth:Yes (Route for sellers and customers).
          Params: cartItemId.
          Optional querys: no querys.
          Body: quantity:(Type number, Mandatory);
  
- DELETE "Delete a cart item"
/api/v1/cartItem/:cartItemId

          Auth:Yes (Route for sellers and customers).
          Params: cartItemId.
          Optional querys: no querys.
          Body: no body;

### ORDER ROUTES

- POST "Create an order by cartId"
/api/v1/cart/make-order

          Auth:Yes (Route for sellers and customers).
          Params: no params.
          Optional querys: no querys.
          Body: no body;

- GET "Get all user orders"
/api/v1/orders

          Auth:Yes (Route for sellers and customers).
          Params: no params.
          Optional querys: no querys.
          Body: no body;




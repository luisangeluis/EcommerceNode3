import chai from "chai";
import chaiHttp from "chai-http";
import * as orderControllers from "../../src/controllers/order.controller";
import * as cartControllers from "../../src/controllers/cart.controller";
import CartItem from "../../src/models/CartItem.model";

chai.use(chaiHttp);

const expect = chai.expect;
const user = {
  id: "45925e48-60d5-4c08-8962-3001195167dd",
  email: "luis.gonzalez@correo.com",
  roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
};

let cartLuis: any;

before(async () => {
  try {
    cartLuis = await cartControllers.readCartByUserId(user.id);
  } catch (error: any) {
    console.log(error.message);
  }
});

describe("READ - Read all orders by cartId - unit test", () => {
  it("Should get all user orders when I send a valid cartId", async () => {
    const cartId = "2d17bf0b-579d-417d-8b71-0fa1b75d3079";
    try {
      const orders = await orderControllers.readAllOrdersByCartId(cartId);

      expect(orders[0].cartId).to.equal(cartId);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("Should get an empty array when I send a non-existen cartId", async () => {
    try {
      const orders = await orderControllers.readAllOrdersByCartId("a");

      expect(orders.length).to.equal(0);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

describe("READ - Read an order by id - unit test", () => {
  it("Should get an order when I send data correctly", async () => {
    try {
      //User pedro lopez
      const orderId = "7a21eedf-048b-45d4-90bd-7491e31df4e4";
      const cartId = "4bb52c8d-a5e5-4220-b3d9-17cb6b204bd8";
      const order = await orderControllers.readOrderById(orderId, cartId);

      expect(order?.id).to.equal(orderId);
      expect(order?.cartId).to.equal(cartId);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("Should get a null value when I send an non-existent orderId", async () => {
    try {
      //User pedro lopez
      const orderId = "1";
      const cartId = "4bb52c8d-a5e5-4220-b3d9-17cb6b204bd8";
      const order = await orderControllers.readOrderById(orderId, cartId);

      expect(order).to.equal(null);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("Should get a null value when I send an non-existent cartId", async () => {
    try {
      //User pedro lopez
      const orderId = "7a21eedf-048b-45d4-90bd-7491e31df4e4";
      const cartId = "1";
      const order = await orderControllers.readOrderById(orderId, cartId);

      expect(order).to.equal(null);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

describe("CREATE - order - unit test", () => {
  it("Should create an order when I send data correctly", async () => {
    try {
      const total = cartLuis.cartItems.reduce((accum: number, current: CartItem) => accum + current.product.price * current.quantity, 0);
      const newOrder = {
        cartId: cartLuis.id,
        total
      };
      const response = await orderControllers.createOrder(newOrder);

      expect(response.cartId).to.equal(cartLuis.id);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

// describe("UPDATE - order - unit test", () => {
//   it("Should change status of the order when I send data correctly", async () => {
//     try {
//       //USER pedro lopez
//       const orderId = "7a21eedf-048b-45d4-90bd-7491e31df4e4";
//       const userId = "024c33d3-2033-4baf-a1c2-c383d0765d03";
//       const response = await orderControllers.changeStatus(orderId, userId, "canceled");

//       expect(response).to.equal(1);
//     } catch (error: any) {
//       throw new Error(`Test failed due to an error: ${error.message}`);
//     }
//   });
// });

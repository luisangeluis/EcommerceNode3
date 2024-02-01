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

describe("POST - order - unit test", () => {
  it("Should create an order when I send data correctly", async () => {
    try {
      // console.log(cartLuis.cartItems);
      const total = cartLuis.cartItems.reduce((accum: number, current: CartItem) => accum + current.price * current.quantity, 0);
      // console.log({ total });

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

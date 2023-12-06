import chai from "chai";
import chaiHttp from "chai-http";
// import generateToken from "../../src/utils/generateToken";
import * as cartItemControllers from "../../src/controllers/cartItem.controller";
import Product from "../../src/models/Product.model";
import Cart from "../../src/models/Cart.model";
import { CartAttributes, ProductAttributes } from "../../src/types";
import CartItem from "../../src/models/CartItem.model";

const expect = chai.expect;
let testProduct: ProductAttributes | null;
let testCart: CartAttributes | null;
// let testToken: string;

chai.use(chaiHttp);

before(async () => {
  try {
    const user = {
      id: "45925e48-60d5-4c08-8962-3001195167dd",
      email: "luis.gonzalez@correo.com",
      roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8",
    };

    testProduct = await Product.findOne();
    testCart = await Cart.findOne({ where: { userId: user.id } });
  } catch (error: any) {
    console.log(error.message);
  }
});

describe("CREATE - cartItem - unit tests", () => {
  it("Should respond with an array when I send a correct data to create a cartItem", async () => {
    try {
      if (testProduct && testCart) {
        const testCartItem = {
          productId: testProduct!.id,
          cartId: testCart!.id,
          quantity: 1,
          price: testProduct!.price,
        };

        const response =
          await cartItemControllers.readOrCreateCartItem(testCartItem);

        expect(response).to.be.an("array");
        expect(response[0]).to.be.an.instanceOf(CartItem);
        expect(response).to.have.length(2);
      }
    } catch (error: any) {
      console.log(error);
    }
  });
  //Make test with quantity
  // it("Should respond with an array when I send a correct data to create a cartItem", async () => {
  //   try {
  //     if (testProduct && testCart) {
  //       const testCartItem = {
  //         productId: testProduct!.id,
  //         cartId: testCart!.id,
  //         quantity: 1,
  //         price: testProduct!.price,
  //       };

  //       const response =
  //         await cartItemControllers.readOrCreateCartItem(testCartItem);

  //       expect(response).to.be.an("array");
  //       expect(response[0]).to.be.an.instanceOf(CartItem);
  //       expect(response).to.have.length(2);
  //     }
  //   } catch (error: any) {
  //     console.log(error);
  //   }
  // });

  it("Should respond with an error when I send a wrong productId", async () => {
    try {
      if (testProduct && testCart) {
        const testCartItem = {
          productId: "1",
          cartId: testCart!.id,
          quantity: 1,
          price: testProduct!.price,
        };

        await cartItemControllers.readOrCreateCartItem(testCartItem);
        expect.fail("Expected an error to be thrown");
      }
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
    }
  });

  it("Should respond with an error when I send a wrong cartId", async () => {
    try {
      if (testProduct && testCart) {
        const testCartItem = {
          productId: testProduct!.id,
          cartId: "1",
          quantity: 1,
          price: testProduct!.price,
        };

        await cartItemControllers.readOrCreateCartItem(testCartItem);
        expect.fail("Expected an error to be thrown");
      }
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
    }
  });
});

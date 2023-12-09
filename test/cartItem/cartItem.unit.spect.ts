import chai from "chai";
import chaiHttp from "chai-http";
// import generateToken from "../../src/utils/generateToken";
import * as cartItemControllers from "../../src/controllers/cartItem.controller";
import Product from "../../src/models/Product.model";
import Cart from "../../src/models/Cart.model";
import { CartAttributes, ProductAttributes } from "../../src/types";
// import CartItem from "../../src/models/CartItem.model";

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

    testProduct = await Product.findOne({
      where: { id: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b" },
    });
    testCart = await Cart.findOne({ where: { userId: user.id } });
    console.log({ product: testProduct?.id });
    console.log({ cart: testCart?.id });
  } catch (error: any) {
    console.log(error.message);
  }
});

describe("READ - cartItem - unit tests", () => {
  it("should get an existing cartItem when I send a cartId and a productId", async () => {
    try {
      if (testCart && testProduct) {
        const response =
          await cartItemControllers.readCartItemByCartIdProductId(
            testCart?.id,
            testProduct?.id,
          );
        console.log({ response });

        expect(response).to.be.an("object");
        expect(response?.cart.id).to.equal(testCart.id);
        expect(response?.productId).to.equal(testProduct.id);
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

describe("CREATE - cartItem - unit tests", () => {
  // it("Should respond with an array when I send a correct data to create a cartItem", async () => {
  //   try {
  //     if (testProduct && testCart) {
  //       // const testCartItem = {
  //       //   productId: testProduct!.id,
  //       //   cartId: testCart!.id,
  //       //   quantity: 1,
  //       //   price: testProduct!.price,
  //       // };
  //       const response =
  //         await cartItemControllers.readCartItemByCartIdProductId(
  //           testCart.id,
  //           testProduct.id,
  //         );
  //       // console.log({ responseId: response?.id });
  //       expect(response).to.be.an("object");
  //       expect(response?.cartId).to.equal(testCart.id);
  //       expect(response?.productId).to.equal(testProduct.id);
  //     }
  //   } catch (error: any) {
  //     // console.log(error);
  //     throw new Error(`Test failed due to an error: ${error.message}`);
  //   }
  // });
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
  // it("Should respond with an error when I send a wrong productId", async () => {
  //   try {
  //     if (testProduct && testCart) {
  //       const testCartItem = {
  //         productId: 2 as unknown as string,
  //         cartId: testCart!.id,
  //         quantity: 1,
  //         price: testProduct!.price,
  //       };
  //       await cartItemControllers.readOrCreateCartItem(testCartItem);
  //       expect.fail("Expected an error to be thrown");
  //     }
  //   } catch (error: any) {
  //     expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
  //   }
  // });
  // it("Should respond with an error when I send a wrong cartId", async () => {
  //   try {
  //     if (testProduct && testCart) {
  //       const testCartItem = {
  //         productId: testProduct!.id,
  //         cartId: "1",
  //         quantity: 1,
  //         price: testProduct.price,
  //       };
  //       await cartItemControllers.readOrCreateCartItem(testCartItem);
  //       expect.fail("Expected an error to be thrown");
  //     }
  //   } catch (error: any) {
  //     expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
  //   }
  // });
});

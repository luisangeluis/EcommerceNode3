import chai from "chai";
import chaiHttp from "chai-http";
// import generateToken from "../../src/utils/generateToken";
import * as cartItemControllers from "../../src/controllers/cartItem.controller";
import Product from "../../src/models/Product.model";
import Cart from "../../src/models/Cart.model";
import { CartAttributes, ProductAttributes } from "../../src/types";
// import CartItem from "../../src/models/CartItem.model";

const expect = chai.expect;
const user = {
  id: "45925e48-60d5-4c08-8962-3001195167dd",
  email: "luis.gonzalez@correo.com",
  roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
};
const cartItemId = "6693978b-1bce-4ff8-acc2-6bcd7786d792";
let testProduct: ProductAttributes | null;
let testCart: CartAttributes | null;
// let testToken: string;

chai.use(chaiHttp);

before(async () => {
  try {
    testProduct = await Product.findOne({
      where: { id: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b" }
    });
    testCart = await Cart.findOne({ where: { userId: user.id } });
  } catch (error: any) {
    console.log(error.message);
  }
});

describe("READ - cartItem - unit tests", () => {
  it("should get an existing cartItem when I send a cartItemId and a userId", async () => {
    try {
      if (testCart && testProduct) {
        const response = await cartItemControllers.readCartItemById(cartItemId, user.id);

        expect(response?.id).to.equal(cartItemId);
        expect(response?.cart.userId).to.equal(user.id);
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("should get an null value when I send a invalid cartItemId and an userId", async () => {
    try {
      if (testCart && testProduct) {
        const response = await cartItemControllers.readCartItemById(1 as any, user.id);
        expect(response).to.equal(null);
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("should get an null value when I send a cartItemId and an invalid userId", async () => {
    try {
      if (testCart && testProduct) {
        const response = await cartItemControllers.readCartItemById(cartItemId, "wrongUserId");

        expect(response).to.equal(null);
      }
    } catch (error: any) {
      console.log(error.message);
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

describe("CREATE - cartItem - unit tests", () => {
  it("Should respond with a cartItem when I send a correct data to create a cartItem", async () => {
    try {
      const data = {
        productId: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b",
        cartId: "2d17bf0b-579d-417d-8b71-0fa1b75d3079",
        price: 200
      };

      const [cartItem, _created] = await cartItemControllers.readOrCreateCartItemById(data);

      expect(cartItem.quantity).to.equal(1);
      expect(cartItem.productId).to.equal("e2914c19-0f6c-4554-a2b9-97f4ceaffb6b");
      expect(cartItem.cartId).to.equal("2d17bf0b-579d-417d-8b71-0fa1b75d3079");
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
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

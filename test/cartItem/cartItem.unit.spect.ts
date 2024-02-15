import chai from "chai";
import chaiHttp from "chai-http";
import * as cartItemControllers from "../../src/controllers/cartItem.controller";
import { readCartByUserId } from "../../src/controllers/cart.controller";

chai.use(chaiHttp);

const expect = chai.expect;
const user = {
  id: "45925e48-60d5-4c08-8962-3001195167dd",
  email: "luis.gonzalez@correo.com",
  roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
};
const cartItemId = "6693978b-1bce-4ff8-acc2-6bcd7786d792";

//PRUEBAS UNITARIAS
//Si no es mi intencion que el test entre al catch usar throw new error "para que marque los errores en test"
//Si es mi intencion que entre al catch usar expect en el catch

//READ
describe("READ - cartItem - unit tests", () => {
  it("should get an existing cartItem when I send a cartItemId and a userId", async () => {
    try {
      const response = await cartItemControllers.readCartItemById(cartItemId, user.id);

      expect(response?.id).to.equal(cartItemId);
      expect(response?.cart.userId).to.equal(user.id);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("should get an null value when I send a invalid cartItemId and an userId", async () => {
    try {
      const response = await cartItemControllers.readCartItemById(1 as any, user.id);
      expect(response).to.equal(null);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("should get an null value when I send a cartItemId and an invalid userId", async () => {
    try {
      const response = await cartItemControllers.readCartItemById(cartItemId, "wrongUserId");

      expect(response).to.equal(null);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

//CREATE
describe("CREATE - cartItem - unit tests", () => {
  it("Should create and respond with a cartItem when I send a correct data to create a cartItem", async () => {
    try {
      const data = {
        productId: "dc228176-e25a-4f2e-a485-5c16aa83a415",
        cartId: "2d17bf0b-579d-417d-8b71-0fa1b75d3079"
      };

      const [cartItem, _created] = await cartItemControllers.readOrCreateCartItemById(data);
      expect(cartItem.quantity).to.equal(1);
      expect(cartItem.productId).to.equal("dc228176-e25a-4f2e-a485-5c16aa83a415");
      expect(cartItem.cartId).to.equal("2d17bf0b-579d-417d-8b71-0fa1b75d3079");
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
  it("Should respond with a already created cartItem when I send a correct data to create a cartItem", async () => {
    try {
      const data = {
        productId: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b",
        cartId: "2d17bf0b-579d-417d-8b71-0fa1b75d3079"
      };

      const [cartItem, _created] = await cartItemControllers.readOrCreateCartItemById(data);

      expect(cartItem.quantity).to.equal(1);
      expect(cartItem.productId).to.equal("e2914c19-0f6c-4554-a2b9-97f4ceaffb6b");
      expect(cartItem.cartId).to.equal("2d17bf0b-579d-417d-8b71-0fa1b75d3079");
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("Should enter the catch block when I send a wrong productId", async () => {
    try {
      const data = {
        productId: 1 as any,
        cartId: "2d17bf0b-579d-417d-8b71-0fa1b75d3079"
      };

      const [_cartItem, _created] = await cartItemControllers.readOrCreateCartItemById(data);
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
    }
  });

  it("Should enter the catch block when I send a wrong cartId", async () => {
    try {
      const data = {
        productId: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b",
        cartId: 2 as any
      };

      const [_cartItem, _created] = await cartItemControllers.readOrCreateCartItemById(data);
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
    }
  });
});

//UPDATE
describe("UPDATE - cartItem - unit tests", () => {
  it("Should update the cartItem quantity when I send the data correctly", async () => {
    try {
      const cartItem = await cartItemControllers.readCartItemById("6693978b-1bce-4ff8-acc2-6bcd7786d792", user.id);

      if (cartItem) {
        cartItem.quantity = 5;
        await cartItem.save();

        expect(cartItem.quantity).to.equal(5);
      }
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("Should enter the catch block when I send a wrong quantity", async () => {
    try {
      const cartItem = await cartItemControllers.readCartItemById(cartItemId, user.id);

      if (cartItem) {
        cartItem.quantity = "a" as any;
        await cartItem.save();
      }
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeValidationError");
    }
  });

  it("Shouldn't update the cartItem quantity when I send a wrond user id", async () => {
    try {
      const cartItem = await cartItemControllers.readCartItemById("6693978b-1bce-4ff8-acc2-6bcd7786d792", 2 as any);

      if (cartItem) {
        cartItem.quantity = 3;
        await cartItem.save();

        expect(cartItem.quantity).to.equal(3);
      }
      expect(cartItem).to.equal(null);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

//DELETE
describe("DELETE - cartItem - unit test", () => {
  it("Should return null, when I delete a cartItem correctly", async () => {
    try {
      await cartItemControllers.deleteCartItem("e8458c6f-dea3-4583-8c02-7f00e5e46212", user.id);

      const cartItem = await cartItemControllers.readCartItemById("e8458c6f-dea3-4583-8c02-7f00e5e46212", user.id);

      expect(cartItem).to.be.null;
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("Shouldn't delete the cartItem, when I send a wrong user id", async () => {
    try {
      await cartItemControllers.deleteCartItem("6693978b-1bce-4ff8-acc2-6bcd7786d792", 2 as any);
      const cartItem = await cartItemControllers.readCartItemById("6693978b-1bce-4ff8-acc2-6bcd7786d792", user.id);

      expect(cartItem?.id).to.equal("6693978b-1bce-4ff8-acc2-6bcd7786d792");
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

//DELETE ALL cartItems
describe("DELETE - Delete all cartItems by cartId", () => {
  it("Should delete all cartItems of cart", async () => {
    try {
      const angelCart = "daf37a51-3da3-42a9-81e5-a0426bd6ae3f";
      const angelId = "2940915c-071e-423e-827c-a04d1ead2ce7";

      await cartItemControllers.deleteAllCartItems(angelCart);
      const cart = await readCartByUserId(angelId);

      expect(cart?.cartItems.length).to.equal(0);
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

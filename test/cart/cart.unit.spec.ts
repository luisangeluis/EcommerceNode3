import chai from "chai";
import chaiHttp from "chai-http";
import * as cartControllers from "../../src/controllers/cart.controller";

chai.use(chaiHttp);

const expect = chai.expect;

describe("POST - cart - unit test", () => {
  it("Should create a cart when I send a valid userId", async () => {
    const userId = "45925e48-60d5-4c08-8962-3001195167dd";
    const newCart = await cartControllers.createCart(userId);

    expect(newCart.userId).to.be.equal(userId);
  });

  it("Should send an error when I send wrong data", async () => {
    try {
      const userId = "1";
      await cartControllers.createCart(userId);
      //Si la linea anterior no da errores la prueba falla
      expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.name).to.be.equal("SequelizeForeignKeyConstraintError");
    }
  });
});

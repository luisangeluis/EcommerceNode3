import chai from "chai";
import chaiHttp from "chai-http";
import * as cartControllers from "../../src/controllers/cart.controller";

chai.use(chaiHttp);

const expect = chai.expect;

describe("POST - cart - unit test", () => {
  it("Should create a cart when I send a valid userId", async () => {
    const userId = "442f120c-af05-4468-9624-7e7262ce2b6c";
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

describe("GET - cart - unit test", () => {
  it("Should get a cart when I send a valid userId", async () => {
    const userId = "442f120c-af05-4468-9624-7e7262ce2b6c";
    const cart = await cartControllers.readCartByUserId(userId);

    expect(cart?.userId).to.be.equal(userId);
  });

  it("Should get a null value when I send an invalid userId", async () => {
    const userId = "a";
    const cart = await cartControllers.readCartByUserId(userId);
    expect(cart).to.be.equal(null);
  });
});

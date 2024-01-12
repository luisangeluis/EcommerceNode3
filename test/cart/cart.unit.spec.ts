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
});

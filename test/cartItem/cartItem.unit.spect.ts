import chai from "chai";
import chaiHttp from "chai-http";
import * as cartItemControllers from "../../src/controllers/cartItem.controller";

chai.use(chaiHttp);
const expect = chai.expect;

describe("CREATE - cartItem - unit tests", () => {
  it("Should respond with an object when I send a correct productId", async () => {
    const response = await cartItemControllers.readOrCreateCartItem;
  });
});

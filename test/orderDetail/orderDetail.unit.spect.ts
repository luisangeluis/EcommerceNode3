import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);

const expect = chai.expect;

describe("CREATE - orderDetail - unit test", () => {
  it("Should create an orderDetail when I send an existing order id", async () => {
    try {
      const orderDetail = await orderDetailControllers.createOrderDetail();
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });
});

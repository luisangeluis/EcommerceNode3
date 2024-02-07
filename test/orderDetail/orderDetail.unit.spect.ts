import chai from "chai";
import chaiHttp from "chai-http";
import * as orderDetailControllers from "../../src/controllers/orderDetail.controller";

chai.use(chaiHttp);

const expect = chai.expect;

before(async () => {});

describe("CREATE - orderDetail - unit test", () => {
  it("Should create an orderDetail when I send an existing order id", async () => {
    try {
      const orderDetailToCreate = {
        orderId: "10d6ae78-fe83-4aab-8364-cea1d2a5e610",
        productId: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b",
        quantity: 1,
        price: 200,
        subtotal: 200
      };

      const orderDetail = await orderDetailControllers.createOrderDetail(orderDetailToCreate);

      expect(orderDetail?.orderId).to.equal("10d6ae78-fe83-4aab-8364-cea1d2a5e610");
      expect(orderDetail?.productId).to.equal("e2914c19-0f6c-4554-a2b9-97f4ceaffb6b");
    } catch (error: any) {
      throw new Error(`Test failed due to an error: ${error.message}`);
    }
  });

  it("Shouldn't create an orderDetail when I send an non-existing order id", async () => {
    try {
      const orderDetailToCreate = {
        orderId: "1",
        productId: "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b",
        quantity: 1,
        price: 200,
        subtotal: 200
      };

      await orderDetailControllers.createOrderDetail(orderDetailToCreate);
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
    }
  });

  it("Shouldn't create an orderDetail when I send an non-existing order id", async () => {
    try {
      const orderDetailToCreate = {
        orderId: "10d6ae78-fe83-4aab-8364-cea1d2a5e610",
        productId: 2 as any,
        quantity: 1,
        price: 200,
        subtotal: 200
      };

      await orderDetailControllers.createOrderDetail(orderDetailToCreate);
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
    }
  });
});

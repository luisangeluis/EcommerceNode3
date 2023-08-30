import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";
import generateToken from "../../src/utils/generateToken";
import Order from "../../src/models/Order.model";
import Cart from "../../src/models/Cart.model";

chai.use(chaiHttp);

const expect = chai.expect;
let token: string;

before(async () => {
  const user = {
    id: "2940915c-071e-423e-827c-a04d1ead2ce7",
    email: "angel.zepeda@correo.com",
    roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8",
  };

  token = await generateToken(user);
});

describe("POST - Create an order - Integration test", () => {
  it("Should respond with an status 201 when I send un valid cartId", async () => {
    const response = await chai
      .request(app)
      .post(`/api/v1/cart/4bb52c8d-a5e5-4220-b3d9-17cb6b204bd8/make-order`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(201);
  });
});

describe("GET - Read all orders by userId - Integration test", () => {
  it("Should respond with an status 200 when I send a valid token", async () => {
    const response = await chai
      .request(app)
      .get(`/api/v1/orders/`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
  });
});

describe("GET - Read user order by orderId - Integration test", () => {
  it("Should respond with an status 200 when I send a valid orderId", async () => {
    const order = await Order.findOne({
      include: [
        {
          model: Cart,
          where: { userId: "2940915c-071e-423e-827c-a04d1ead2ce7" },
          attributes: [],
        },
      ],
    });
    console.log(order);

    const response = await chai
      .request(app)
      .get(`/api/v1/orders/${order?.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
  });
});

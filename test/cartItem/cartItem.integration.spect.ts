import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";
import generateToken from "../../src/utils/generateToken";

chai.use(chaiHttp);

const expect = chai.expect;
const cartItemId = "d79ae3c4-b88d-47f5-9a2d-14eeb4e8d0d6";
let token: string;

before(async () => {
  try {
    const customer = {
      id: "2940915c-071e-423e-827c-a04d1ead2ce7",
      email: "angel.zepeda@correo.com",
      roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8",
    };

    token = await generateToken(customer);
  } catch (error: any) {
    console.log(error.message);
  }
});

describe("GET - Get a cart item - integration test", () => {
  it("Should respond with 200 code status", async () => {
    const response = await chai
      .request(app)
      .get("/api/v1/cartItem/d79ae3c4-b88d-47f5-9a2d-14eeb4e8d0d6")
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(200);
  });

  it("Should respond with 404 code status, when cart item doesn't exists", async () => {
    const response = await chai
      .request(app)
      .get("/api/v1/cartItem/1")
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(404);
  });
});

describe("POST - Add a cart item - integration test", () => {
  it("Should respond with 201 code status", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/products/10119ed0-b180-4ed5-a2b4-3c3619af97d9/add-to-cart")
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(201);
  });

  it("Should respond with 404 code status, when product doesn't exists", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/products/1/add-to-cart")
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(404);
  });
});

describe("PATCH - Update product quantity Integration test", () => {
  it("Should update product quantity", async () => {
    const response = await chai
      .request(app)
      .patch(`/api/v1/cartItem/${cartItemId}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 3 });

    expect(response).to.have.status(200);
  });
});

describe("DELETE - Remove a cart item - Integration test", () => {
  it("", async () => {
    const response = await chai
      .request(app)
      .delete(`/api/v1/cartItem/${cartItemId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(204);
  });
});

import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";
import generateToken from "../../src/utils/generateToken";

chai.use(chaiHttp);
const expect = chai.expect;

let token: string;

before(async () => {
  try {
    const customer = {
      id: "45925e48-60d5-4c08-8962-3001195167dd",
      email: "luis.gonzalez@correo.com",
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
      .get("/api/v1/cartItem/dc29ea92-d7c3-48de-a389-76af84a470da")
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(200);
  });
});

describe("POST - Add a cart item integration test", () => {
  it("Should respond with 201 code status", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/products/dc29ea92-d7c3-48de-a389-76af84a470da/add-to-cart")
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

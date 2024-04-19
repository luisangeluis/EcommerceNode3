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
      roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
    };

    token = await generateToken(customer);
  } catch (error: any) {
    console.log(error.message);
  }
});

describe("GET - cart - integration tests ", () => {
  it("Should respond with 200 status code", async () => {
    const response = await chai.request(app).get("/api/v1/cart").set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
  });

  it("Should respond with 401 status code when don't send a bearer token", async () => {
    const response = await chai.request(app).get("/api/v1/cart");

    expect(response).to.have.status(401);
  });

  it("Should respond with 401 status code when I send an invalid token", async () => {
    const response = await chai.request(app).get("/api/v1/cart").set("Authorization", `Bearer a`);
    console.log(response.status);

    expect(response).to.have.status(401);
  });
});

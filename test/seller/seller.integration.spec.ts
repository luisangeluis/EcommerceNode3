import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";
import generateToken from "../../src/utils/generateToken";

chai.use(chaiHttp);

const expect = chai.expect;
let token: string;

before(async () => {
  try {
    const user = {
      id: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
      email: "juan.perez@correo.com",
      roleId: "5b39d9a2-a865-4a1c-8b4e-3341918d35c7"
    };
    token = await generateToken(user);
  } catch (error: any) {
    console.log(error.message);
  }
});

describe("GET - PRODUCTS - Get my products as a seller", () => {
  it("Get my products as a seller", async () => {
    const response = await chai.request(app).get(`/api/v1/seller/my-products`);

    expect(response).to.have.status(200);
  });
});

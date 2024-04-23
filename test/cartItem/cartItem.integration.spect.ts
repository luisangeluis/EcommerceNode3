import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";
import generateToken from "../../src/utils/generateToken";

chai.use(chaiHttp);

const expect = chai.expect;
const cartItemId = "e8458c6f-dea3-4583-8c02-7f00e5e46212";
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

// describe("GET - Get a cart item - integration test", () => {
//   it("Should respond with 200 code status", async () => {
//     const response = await chai
//       .request(app)
//       .get("/api/v1/cartItem/6144b398-b2f6-459b-85f1-45964858345c")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response).to.have.status(200);
//   });

//   it("Should respond with 404 code status, when cart item doesn't exists", async () => {
//     const response = await chai.request(app).get("/api/v1/cartItem/1").set("Authorization", `Bearer ${token}`);
//     expect(response).to.have.status(404);
//   });

//   it("Should respond with 404 code status, when I get a non-corresponding cartItem ", async () => {
//     const response = await chai
//       .request(app)
//       .get("/api/v1/cartItem/d79ae3c4-b88d-47f5-9a2d-14eeb4e8d0d6")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response).to.have.status(404);
//   });
// });

describe("POST - Add a cart item - integration test", () => {
  it("Should respond with 201 code status", async () => {
    const response = await chai
      .request(app)
      .post("/api/v1/products/10119ed0-b180-4ed5-a2b4-3c3619af97d9/add-to-cart")
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(201);
  });

  it("Should respond with 404 code status, when product doesn't exists", async () => {
    const response = await chai.request(app).post("/api/v1/products/1/add-to-cart").set("Authorization", `Bearer ${token}`);
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

  it("Shouldn't update the product quantity when I send a non-corresponding cartItemId ", async () => {
    const response = await chai
      .request(app)
      .patch(`/api/v1/cartItem/a4a56f72-1745-4297-9249-b41b28551f7c`)
      .set("Authorization", `Bearer ${token}`)
      .send({ quantity: 4 });

    expect(response).to.have.status(404);
  });
});

describe("DELETE - Remove a cart item - Integration test", () => {
  it("Should delete a cartItem", async () => {
    const response = await chai
      .request(app)
      .delete(`/api/v1/cartItem/6693978b-1bce-4ff8-acc2-6bcd7786d792`)
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(204);
  });

  it("Shouldn't delete a cartItem when I send a non-corresponding cartItemId", async () => {
    const response = await chai
      .request(app)
      .delete(`/api/v1/cartItem/a4a56f72-1745-4297-9249-b41b28551f7c`)
      .set("Authorization", `Bearer ${token}`);
    expect(response).to.have.status(404);
  });
});

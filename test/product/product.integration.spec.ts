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

//GET ALL PRODUCTS
describe("GET - products - integration tests", () => {
  it("Should respond with 200 status code", (done) => {
    chai
      .request(app)
      .get("/api/v1/products")
      .query({ categoryId: "7c4b8522-bffa-4b1c-b82d-0c906366ec25" })
      .send()
      .end((_err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("GET - product by id - integration tests", () => {
  it("Should respond with 200 status code when I send a correct product id", async () => {
    const response = await chai.request(app).get(`/api/v1/products/10119ed0-b180-4ed5-a2b4-3c3619af97d9`);
    // console.log(response);
    expect(response).to.have.status(200);
  });

  it("Should respond with 404 status code when I send a wrong product id", (done) => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v1/products/${id}`)
      .end((_err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });
});

// POST CREATE A PRODUCT
describe("POST - Create a product - integration tests", () => {
  it("Should respond with 201 status code when I send all necesary", async () => {
    const product = {
      title: "a product",
      description: "a product",
      price: 1,
      status: "active",
      categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
      sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
    };

    const response = await chai.request(app).post(`/api/v1/products`).set("Authorization", `Bearer ${token}`).send(product);

    expect(response).to.have.status(201);
  });

  it("Should respond with 400 status code when a property is missing", async () => {
    const product = {
      title: "a product",
      price: 10,
      status: "active",
      categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
      sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
    };

    const response = await chai.request(app).post(`/api/v1/products`).set("Authorization", `Bearer ${token}`).send(product);

    expect(response).to.have.status(400);
  });

  it("Should respond with 400 status code. Request with a non-numeric value", async () => {
    const product = {
      title: "A product",
      description: "A pruduct",
      price: "aaa",
      status: "active",
      categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
      sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
    };

    const response = await chai.request(app).post(`/api/v1/products`).set("Authorization", `Bearer ${token}`).send(product);

    expect(response).to.have.status(400);
  });

  it("Should respond with 400 status code. Request with a empty string in a property", async () => {
    const product = {
      title: "",
      description: "A product",
      price: 2,
      status: "active",
      categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
      sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
    };

    const response = await chai.request(app).post(`/api/v1/products`).set("Authorization", `Bearer ${token}`).send(product);

    expect(response).to.have.status(400);
  });

  it("Should respond with 400 status code. Request with a nonexistent category id", async () => {
    const product = {
      title: "a product",
      description: "A product",
      price: 2,
      status: "active",
      categoryId: "5",
      sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e"
    };

    const response = await chai.request(app).post(`/api/v1/products`).set("Authorization", `Bearer ${token}`).send(product);

    expect(response).to.have.status(400);
  });
});

// describe("PUT - Edit a product integration tests", async () => {
//   it("Should respond with 200 status code when I send a valid to update ", async () => {
//     const productId = "dc29ea92-d7c3-48de-a389-76af84a470da";
//     const newData = {
//       price: "10"
//     };
//     const response = await chai
//       .request(app)
//       .put(`/api/v1/products/seller/${productId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(newData);

//     expect(response).to.have.status(200);
//   });

//   it("Should respond with 200 status code when I send a valid status ", async () => {
//     const productId = "dc29ea92-d7c3-48de-a389-76af84a470da";
//     const newData = {
//       status: "inactive"
//     };
//     const response = await chai
//       .request(app)
//       .put(`/api/v1/products/seller/${productId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(newData);

//     expect(response).to.have.status(200);
//   });

//   it("Should respond with 400 status code when I send a product id to update", async () => {
//     const productId = "dc29ea92-d7c3-48de-a389-76af84a470da";
//     const newData = {
//       id: 1
//     };

//     const response = await chai
//       .request(app)
//       .put(`/api/v1/products/seller/${productId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(newData);

//     expect(response).to.have.status(400);
//   });

//   it("Should respond with 400 status code when I send a property with wrong type", async () => {
//     const productId = "dc29ea92-d7c3-48de-a389-76af84a470da";
//     const newData = {
//       price: "tres"
//     };

//     const response = await chai
//       .request(app)
//       .put(`/api/v1/products/seller/${productId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(newData);
//     // console.log({ response });

//     expect(response).to.have.status(400);
//   });

//   it("Should respond with 404 status code when I send and invalid id", (done) => {
//     const id = 1;
//     const data = {
//       price: 10
//     };

//     chai
//       .request(app)
//       .put(`/api/v1/products/seller/${id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(data)
//       .end((_err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       });
//   });

//   it("Should respond with 400 status code when I send a wrong status", async () => {
//     const productId = "dc29ea92-d7c3-48de-a389-76af84a470da";
//     const newData = {
//       status: "deleted"
//     };

//     const response = await chai
//       .request(app)
//       .put(`/api/v1/products/seller/${productId}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send(newData);
//     // console.log({ response });

//     expect(response).to.have.status(400);
//   });
// });

// describe("Delete - Delete a product as seller integration test", () => {
//   it("Should respond with 204 status code", (done) => {
//     chai
//       .request(app)
//       .delete(`/api/v1/products/seller/e2914c19-0f6c-4554-a2b9-97f4ceaffb6b`)
//       .set("Authorization", `Bearer ${token}`)
//       .send()
//       .end((_err, res) => {
//         expect(res).to.have.status(204);
//         done();
//       });
//   });

//   it("Should respond with 404 status code", (done) => {
//     const id = 1;

//     chai
//       .request(app)
//       .delete(`/api/v1/products/seller/${id}`)
//       .set("Authorization", `Bearer ${token}`)
//       .send()
//       .end((_err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       });
//   });

//   //TO DO to try delete a product of another seller
// });

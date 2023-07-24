import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
import Product from "../src/models/Product.model";
import { initDb } from "../src/db/connection";

// import {
//   ProductCreationAttributes,
//   ProductUpdateAttributes,
// } from "../src/types";
// import db from "../src/db/connection";

chai.use(chaiHttp);
const expect = chai.expect;

before(async () => await initDb());

describe("Get - products", () => {
  it("Should respond with 200 status code", (done) => {
    chai
      .request(app)
      .get("/api/v1/products")
      .send()
      .end((_err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Should respond with an array of products", (done) => {
    chai
      .request(app)
      .get("/api/v1/products")
      .send()
      .end((_err, res) => {
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("Get - product by id", () => {
  // before(async () => await initDb());
  // after(async () => await db.close());

  it("Should respond with 200 status code when I send a correct product id", async () => {
    const product = await Product.findOne();
    if (product) {
      const id = product.id;
      console.log(id);

      const response = await chai.request(app).get(`/api/v1/products/${id}`);
      // console.log({ response });

      expect(response).to.have.status(200);
    }
  });
  // it("Should respond with 404 status code when I send a wrong product id", (done) => {
  //   const id = 1;
  //   chai
  //     .request(app)
  //     .get(`/api/v1/products/${id}`)
  //     .end((_err, res) => {
  //       expect(res).to.have.status(404);
  //       done();
  //     });
  // });
});

// //POST CREATE A PRODUCT
// describe("POST - Create a product", () => {
//   it("Should respond with 201 status code, This insert all necesary", (done) => {
//     const product: ProductCreationAttributes = {
//       title: "A product",
//       description: "A pruduct",
//       price: 1,
//     };

//     chai
//       .request(app)
//       .post(`/api/v1/products/`)
//       .send(product)
//       .end((_err, res) => {
//         expect(res).to.have.status(201);
//         done();
//       });
//   });

//   it("Should respond with an object", (done) => {
//     const product: ProductCreationAttributes = {
//       title: "A product",
//       description: "A pruduct",
//       price: 1,
//     };

//     chai
//       .request(app)
//       .post(`/api/v1/products/`)
//       .send(product)
//       .end((_err, res) => {
//         expect(res.body).to.be.an("object");
//         done();
//       });
//   });

//   it("Should respond with 400 status code", (done) => {
//     const product: ProductCreationAttributes = {
//       title: "A product",
//       description: "A pruduct",
//     };

//     chai
//       .request(app)
//       .post(`/api/v1/products/`)
//       .send(product)
//       .end((_err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });

//   it("Should respond with 400 status code. Request with a non-numeric value", (done) => {
//     const product: ProductCreationAttributes = {
//       title: "A product",
//       description: "A pruduct",
//       price: "aaa",
//     };

//     chai
//       .request(app)
//       .post(`/api/v1/products/`)
//       .send(product)
//       .end((_err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });

//   it("Should respond with 400 status code. Request with authenticate empty string", (done) => {
//     const product: ProductCreationAttributes = {
//       title: "A product",
//       description: "A pruduct",
//       price: "",
//     };

//     chai
//       .request(app)
//       .post(`/api/v1/products/`)
//       .send(product)
//       .end((_err, res) => {
//         expect(res).to.have.status(400);
//         done();
//       });
//   });
// });

// describe("PUT - Edit a product", () => {
//   it("Should respond with 404 status code", (done) => {
//     const id = 1;
//     const product: ProductUpdateAttributes = {
//       price: 10,
//     };

//     chai
//       .request(app)
//       .put(`/api/v1/products/${id}`)
//       .send(product)
//       .end((_err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       });
//   });
// });

// describe("Delete - Delete a product", () => {
//   it("Should respond with 404 status code", (done) => {
//     const id = 1;

//     chai
//       .request(app)
//       .put(`/api/v1/products/${id}`)
//       .send()
//       .end((_err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       });
//   });
// });

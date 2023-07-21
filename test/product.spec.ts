import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
// import db from "../src/db/connection";

// import {
//   ProductCreationAttributes,
//   ProductUpdateAttributes,
// } from "../src/types";
// import db from "../src/db/connection";

chai.use(chaiHttp);
const expect = chai.expect;

// after(async () => {
//   // Después de las pruebas, cierra la conexión con la base de datos de pruebas
//   await db.close();
// });

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

  it("Should respond with an array", (done) => {
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

// describe("Get - product by id", () => {
//   it("Should respond with 200 status code", (done) => {
//     const id = 1;
//     chai
//       .request(app)
//       .get(`/api/v1/products/${id}`)
//       .end((_err, res) => {
//         expect(res).to.have.status(404);
//         done();
//       });
//   });

//   it("Should respond with a object", (done) => {
//     const id = 1;
//     chai
//       .request(app)
//       .get(`/api/v1/products/${id}`)
//       .end((_err, res) => {
//         expect(res.body).to.be.an("object");
//         done();
//       });
//   });
// });

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

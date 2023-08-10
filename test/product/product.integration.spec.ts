import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";
import Product from "../../src/models/Product.model";
import Category from "../../src/models/Category.model";
import jwt from "jsonwebtoken";

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET - products - integration tests", () => {
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
});

describe("GET - product by id - integration tests", () => {
  it("Should respond with 200 status code when I send a correct product id", async () => {
    const product = await Product.findOne();
    if (product) {
      const id = product.id;
      // console.log(id);
      const response = await chai.request(app).get(`/api/v1/products/${id}`);
      expect(response).to.have.status(200);
    }
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

//POST CREATE A PRODUCT
describe("POST - Create a product - integration tests", async () => {
  const category = await Category.findOne();
  const jwtKey = process.env.JWT_KEY as string;

  const token = jwt.sign(
    {
      id: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
      email: "juan.perez@correo.com",
      roleId: "5b39d9a2-a865-4a1c-8b4e-3341918d35c7",
    },
    jwtKey
  );

  it("Should respond with 201 status code when I send all necesary", async () => {
    if (category) {
      const product = {
        title: "a product",
        description: "a pruduct",
        price: 1,
        categoryId: category.id,
        sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
      };

      const response = await chai
        .request(app)
        .post(`/api/v1/products/`)
        .set("Authorization", `Bearer ${token}`)
        .send(product);

      expect(response).to.have.status(201);
    }
  });

  it("Should respond with 400 status code when a property is missing", async () => {
    if (category) {
      const product = {
        title: "a product",
        price: 5,
        categoryId: category.id,
      };

      const response = await chai
        .request(app)
        .post(`/api/v1/products/`)
        .set("Authorization", `Bearer ${token}`)
        .send(product);

      expect(response).to.have.status(400);
    }
  });

  it("Should respond with 400 status code. Request with a non-numeric value", async () => {
    if (category) {
      const product = {
        title: "A product",
        description: "A pruduct",
        price: "aaa",
        categoryId: category.id,
      };

      const response = await chai
        .request(app)
        .post(`/api/v1/products/`)
        .set("Authorization", `Bearer ${token}`)
        .send(product);

      expect(response).to.have.status(400);
    }
  });

  it("Should respond with 400 status code. Request with a empty string in a property", async () => {
    if (category) {
      const product = {
        title: "",
        description: "A product",
        price: 2,
        categoryId: category.id,
      };

      const response = await chai
        .request(app)
        .post(`/api/v1/products/`)
        .set("Authorization", `Bearer ${token}`)
        .send(product);

      expect(response).to.have.status(400);
    }
  });
});

describe("PUT - Edit a product integration tests", async () => {
  const product = await Product.findOne();

  it("Should respond with 200 status code when I do a valid update ", async () => {
    if (product) {
      const newData = {
        price: 10,
      };
      const response = await chai
        .request(app)
        .put(`/api/v1/products/${product.id}`)
        .send(newData);

      expect(response).to.have.status(200);
    }
  });

  it("Should respond with 400 status code when I do an invalid update ", async () => {
    if (product) {
      const newData = {
        price: "tres",
      };
      const response = await chai
        .request(app)
        .put(`/api/v1/products/${product.id}`)
        .send(newData);

      expect(response).to.have.status(400);
    }
  });

  it("Should respond with 404 status code when I send and invalid id", (done) => {
    const id = 1;
    const product = {
      price: 10,
    };

    chai
      .request(app)
      .put(`/api/v1/products/${id}`)
      .send(product)
      .end((_err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Should respond with 400 status code when I do an invalid update with the foreign key", async () => {
    if (product) {
      const newData = {
        categoryId: "tres",
      };
      const response = await chai
        .request(app)
        .put(`/api/v1/products/${product.id}`)
        .send(newData);

      expect(response).to.have.status(400);
    }
  });

  it("Should respond with 400 status code when I send property that doesn't exist", async () => {
    if (product) {
      const newData = {
        invalidProperty: "hola",
      };
      const response = await chai
        .request(app)
        .put(`/api/v1/products/${product.id}`)
        .send(newData);

      expect(response).to.have.status(400);
    }
  });
});

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

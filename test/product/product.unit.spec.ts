import chai from "chai";
import chaiHttp from "chai-http";
import * as productControllers from "../../src/controllers/product.controller";
// import Product from "../../src/models/Product.model";
// import Category from "../../src/models/Category.model";

const expect = chai.expect;

chai.use(chaiHttp);

describe("READ - product - unit tests", () => {
  it("Should respond with an array of products", async () => {
    const response = await productControllers.readAllProducts();
    expect(response).to.be.an("array");
  });
});

describe("READ - Get product by id - unit tests", () => {
  it("Should respond with a product when I send a correct Id", async () => {
    const response = await productControllers.readProductById(
      "10119ed0-b180-4ed5-a2b4-3c3619af97d9",
    );
    expect(response).to.be.an("object");
  });

  it("Should respond with a null value when I send a wrong id", async () => {
    const productId: any = 1;
    const response = await productControllers.readProductById(productId);
    expect(response).to.be.an("null");
  });
});

describe("CREATE - product - unit tests", () => {
  it("Should respond with a product when I send all necesary", async () => {
    const status: any = "active";
    const product = {
      title: "a product",
      description: "a product",
      price: 1,
      categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
      sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
      status,
    };

    const response = await productControllers.createProduct(product);

    expect(response?.title).to.equal("a product");
    expect(response?.description).to.equal("a product");
    expect(response?.price).to.equal(1);
    expect(response?.categoryId).to.equal(
      "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
    );
  });

  it("Should thrown an error when a property is missing", async () => {
    try {
      const product: any = {
        title: "a product",
        description: "a product",
        price: 5,
      };

      await productControllers.createProduct(product);
      // expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.message).to.be.an("string");
    }
  });

  it("Should thrown an error when some property is not of the expected type", async () => {
    try {
      const status: any = "active";
      const product: any = {
        title: "A product",
        description: "A pruduct",
        price: "aaa",
        categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
        sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
        status,
      };

      await productControllers.createProduct(product);
      expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.message).to.be.an("string");
    }
  });

  it("Should thrown an error when some property is an empty string", async () => {
    try {
      const status: any = "active";
      const product: any = {
        title: "",
        description: "A pruduct",
        price: 1,
        categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
        sellerId: "a",
        status,
      };

      await productControllers.createProduct(product);
      expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.message).to.be.an("string");
    }
  });
});

// describe("EDIT - product - unit tests", () => {});

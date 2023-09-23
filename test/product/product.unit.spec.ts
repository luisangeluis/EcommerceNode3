import chai from "chai";
import chaiHttp from "chai-http";
import * as productControllers from "../../src/controllers/product.controller";
import Product from "../../src/models/Product.model";
import Category from "../../src/models/Category.model";

chai.use(chaiHttp);
const expect = chai.expect;

describe("READ - product - unit tests", () => {
  it("Should respond with an array of products", async () => {
    const response = await productControllers.readAllProducts();
    // console.log({ response });

    expect(response).to.be.an("array");
  });
});

describe("READ - Get product by id - unit tests", () => {
  it("Should respond with a product when I send a correct Id", async () => {
    const product = await Product.findOne();
    if (product) {
      const response = await productControllers.readProductById(product.id);
      expect(response).to.be.an("object");
    }
  });

  it("Should respond with an undefined when I send a wrong id", async () => {
    const id = "1";
    const response = await productControllers.readProductById(id);
    expect(response).to.be.an("null");
  });
});

describe("CREATE - product - unit tests", () => {
  it("Should respond with a product when I send all necesary", async () => {
    const category = await Category.findOne();

    if (category) {
      const product = {
        title: "a product",
        description: "a product",
        price: 1,
        categoryId: category.id,
        sellerId:"28149311-26a3-4b17-8ab4-f8d9a3b9657e"
      };

      const response = await productControllers.createProduct(product);
      expect(response?.title).to.equal("a product");
      expect(response?.description).to.equal("a product");
      expect(response?.price).to.equal(1);
      expect(response?.categoryId).to.equal(category.id);
    }
  });

  it("Should thrown an error when a property is missing", async () => {
    const category = await Category.findOne();
    if (category) {
      const product = {
        title: "a product",
        price: 5,
        categoryId: category.id,
      };
      try {
        await productControllers.createProduct(product);
        expect.fail("Expected an error to be thrown");
      } catch (error: any) {
        expect(error.message).to.be.an("string");
      }
    }
  });

  it("Should thrown an error when some property is not of the expected type", async () => {
    const category = await Category.findOne();

    if (category) {
      const product = {
        title: "A product",
        description: "A pruduct",
        price: "aaa",
        categoryId: category.id,
      };
      try {
        await Product.create(product);
        expect.fail("Expected an error to be thrown");
      } catch (error: any) {
        expect(error.message).to.be.an("string");
      }
    }
  });

  it("Should thrown an error when some property is an empty string", async () => {
    const category = await Category.findOne();

    if (category) {
      const product = {
        title: "",
        description: "A pruduct",
        price: 1,
        categoryId: category.id,
      };
      try {
        await Product.create(product);
        expect.fail("Expected an error to be thrown");
      } catch (error: any) {
        expect(error.message).to.be.an("string");
      }
    }
  });
});

describe("EDIT - product - unit tests", () => {});

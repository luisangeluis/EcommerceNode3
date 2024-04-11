import chai from "chai";
import chaiHttp from "chai-http";
import sequelize from "sequelize";
import * as productControllers from "../../src/controllers/product.controller";

const expect = chai.expect;
const { Op } = sequelize;

chai.use(chaiHttp);

//GET ALL PRODUCTS
describe("READ - product - unit tests", () => {
  it("Should respond with an array of products which includes my string to search in title", async () => {
    const queries = {
      [Op.or]: [{ title: { [Op.like]: `%apt%` } }, { description: { [Op.like]: `%apt%` } }]
    };
    const response = await productControllers.readAllProducts(queries);
    const isValidSearched = response.products.every((product) => product.description.includes("apt") || product.title.includes("apt"));

    expect(isValidSearched).to.equal(true);
  });

  it("Should respond with an array of products with a status active or inactive", async () => {
    const response = await productControllers.readAllProducts();
    const allActive = response.products.every((product) => product.status === "active" || product.status === "inactive");

    expect(allActive).to.equal(true);
  });

  it("Should respond with an array of products with category id 7c4b8522-bffa-4b1c-b82d-0c906366ec25", async () => {
    const response = await productControllers.readAllProducts({ categoryId: "7c4b8522-bffa-4b1c-b82d-0c906366ec25" }, 1);
    const isValidCategory = response.products.every((product) => product.categoryId === "7c4b8522-bffa-4b1c-b82d-0c906366ec25");

    expect(isValidCategory).to.equal(true);
  });

  it("Should respond with an array of products with sellerId id 7c4b8522-bffa-4b1c-b82d-0c906366ec25", async () => {
    const response = await productControllers.readAllProducts({ sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e" }, 3);
    const isValidSeller = response.products.every((product) => product.sellerId === "28149311-26a3-4b17-8ab4-f8d9a3b9657e");

    expect(isValidSeller).to.equal(true);
  });
});

//Get a product by id
describe("READ - Get product by id - unit tests", () => {
  it("Should respond with a product when I send a correct Id", async () => {
    const response = await productControllers.readProductById("10119ed0-b180-4ed5-a2b4-3c3619af97d9");

    expect(response?.id).to.be.equal("10119ed0-b180-4ed5-a2b4-3c3619af97d9");
  });

  it("Should respond with a null value when I send a wrong id", async () => {
    const productId: any = 1;
    const response = await productControllers.readProductById(productId);
    expect(response).to.be.an("null");
  });
});

//Create a product
describe("CREATE - product - unit tests", () => {
  it("Should respond with a product when I send all necesary", async () => {
    const status: any = "active";
    const product = {
      title: "a product",
      description: "a product",
      price: 1,
      categoryId: "58c21712-0dc4-4f98-af84-2ba868fcd2cd",
      sellerId: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
      status
    };

    const response = await productControllers.createProduct(product);

    expect(response?.title).to.equal("a product");
    expect(response?.description).to.equal("a product");
    expect(response?.price).to.equal(1);
    expect(response?.categoryId).to.equal("58c21712-0dc4-4f98-af84-2ba868fcd2cd");
  });

  it("Should thrown an error when a property is missing", async () => {
    try {
      const product: any = {
        title: "a product",
        description: "a product",
        price: 5
      };

      await productControllers.createProduct(product);
      expect.fail("Expected an error to be thrown");
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
        status
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
        status
      };

      await productControllers.createProduct(product);
      expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.message).to.be.an("string");
    }
  });
});
//Update a product
describe("UPDATE - product - unit tests", () => {
  it("Should update a product when I send a valid productId and data", async () => {
    const productId = "10119ed0-b180-4ed5-a2b4-3c3619af97d9";
    const data: any = {
      title: "Test title",
      description: "Test description",
      price: 0,
      status: "inactive",
      categoryId: "c7a96caa-719c-4097-ab3b-77139d4644dd"
    };

    const response = await productControllers.updateProductById(productId, data);
    expect(response[0]).to.equal(1);
  });

  it("Shouldn't update a product when I send an invalid productId", async () => {
    const productId = "1";
    const data: any = {
      title: "new title",
      description: "new description",
      price: 10,
      status: "inactive"
    };

    const response = await productControllers.updateProductById(productId, data);
    expect(response[0]).to.equal(0);
  });

  it("Shouldn't update a product when I send an invalid categoryId", async () => {
    try {
      const productId = "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b";
      const data: any = {
        categoryId: "1"
      };

      await productControllers.updateProductById(productId, data);
    } catch (error: any) {
      expect(error.message).to.be.an("string");
    }
  });

  it("Shouldn't update a product when I send an invalid status", async () => {
    try {
      const productId = "dc228176-e25a-4f2e-a485-5c16aa83a415";
      const data: any = {
        status: "wrongstatus"
      };

      await productControllers.updateProductById(productId, data);
    } catch (error: any) {
      expect(error.message).to.be.an("string");
    }
  });

  it("Shouldn't update a product when I send an invalid type of data", async () => {
    try {
      const productId = "dc228176-e25a-4f2e-a485-5c16aa83a415";
      const data: any = {
        price: "hola"
      };

      await productControllers.updateProductById(productId, data);
    } catch (error: any) {
      expect(error.message).to.be.an("string");
    }
  });
});

describe("DELETE - product - unit tests", () => {
  it("Should change the product status to deleted when I send a valid value", async () => {
    const productId = "e2914c19-0f6c-4554-a2b9-97f4ceaffb6b";
    const data: any = {
      status: "deleted"
    };
    const response = await productControllers.updateProductById(productId, data);
    expect(response[0]).to.equal(1);
  });

  it("Should thrown an error when I send a product id that doesn't exist", async () => {
    const productId = "1";
    const data: any = {
      status: "deleted"
    };
    const response = await productControllers.updateProductById(productId, data);

    expect(response[0]).to.equal(0);
  });
});

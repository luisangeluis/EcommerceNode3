import chai from "chai";
import chaiHttp from "chai-http";
import * as productImageControllers from "../../src/controllers/productImage.controller";

chai.use(chaiHttp);

const expect = chai.expect;

describe("CREATE - productImage - unit test", () => {
  it("Should create a productImage when a I send the right data", async () => {
    const response = await productImageControllers.createProductImage({
      name: "test_image",
      productId: "dc29ea92-d7c3-48de-a389-76af84a470da",
      url: "https://res.cloudinary.com/dqdhetmy3/image/upload/v1713302876/ecommerce-product-image/test_image_pwrtd6.jpg",
      cloudinaryId: "ecommerce-product-image/test_image_pwrtd6.jpg"
    });

    expect(response.productId).to.equal("dc29ea92-d7c3-48de-a389-76af84a470da");
  });

  it("Should it send an error when a I send a wrong data", async () => {
    try {
      await productImageControllers.createProductImage({
        name: "Test_image_2",
        productId: "2",
        url: "https://res.cloudinary.com/dqdhetmy3/image/upload/v1713302876/ecommerce-product-image/test_image_pwrtd6.jpg",
        cloudinaryId: "ecommerce-product-image/test_image_pwrtd6.jpg"
      });

      expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
    }
  });
});

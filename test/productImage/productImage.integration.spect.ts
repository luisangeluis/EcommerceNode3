// import chai from "chai";
// import chaiHttp from "chai-http";
// import * as productImageControllers from "../../src/controllers/productImage.controller";
// import app from "../../src/app";

// chai.use(chaiHttp);

// const expect = chai.expect;
// let token: string;

// before(async () => {
//   try {
//     const user = {
//       id: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
//       email: "juan.perez@correo.com",
//       roleId: "5b39d9a2-a865-4a1c-8b4e-3341918d35c7"
//     };
//     token = await generateToken(user);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// });

// describe("POST - Product images - Integration test", () => {
//   //TO DO To send images to make testing
//   it("Should respond with 201 status code when I send all necesary data", async () => {
//     const response = await chai
//       .request(app)
//       .post(`/api/v1/productImages/dc29ea92-d7c3-48de-a389-76af84a470da`)
//       .set("Authorization", `Bearer ${token}`);
//   });
// });

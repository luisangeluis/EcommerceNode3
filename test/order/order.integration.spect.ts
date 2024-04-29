import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";
import generateToken from "../../src/utils/generateToken";
import Order from "../../src/models/Order.model";
import Cart from "../../src/models/Cart.model";

chai.use(chaiHttp);

const expect = chai.expect;
let token: string;
// let tokenPedro: string;
// let superToken: string;

before(async () => {
  const user = {
    id: "2940915c-071e-423e-827c-a04d1ead2ce7",
    email: "angel.zepeda@correo.com",
    roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
  };

  token = await generateToken(user);

  // const userPedro = {
  //   id: "024c33d3-2033-4baf-a1c2-c383d0765d03",
  //   email: "pedro.lopez@correo.com",
  //   roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
  // };

  // tokenPedro = await generateToken(userPedro);

  // const superUser = {
  //   id: "187378bb-df40-4372-9558-cf3d0923c80c",
  //   email: "rafa.marquez@correo.com",
  //   roleId: "6c00b89a-d293-40ec-8bf7-abdd161ad94a"
  // };

  // superToken = await generateToken(superUser);
});

describe("GET - Read all orders by userId - Integration test", () => {
  it("Should respond with an status 200 when I send a valid token", async () => {
    const response = await chai.request(app).get(`/api/v1/orders/`).set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
  });

  it("Should respond with an status 200 when I send an invalid token", async () => {
    const response = await chai.request(app).get(`/api/v1/orders/`).set("Authorization", "Bearer token");

    expect(response).to.have.status(401);
  });

  it("Should respond with an status 401 when I don't send a token", async () => {
    const response = await chai.request(app).get(`/api/v1/orders/`);

    expect(response).to.have.status(401);
  });
});

describe("GET - Read user order by orderId - Integration test", () => {
  it("Should respond with an status 200 when I send a valid orderId", async () => {
    const order = await Order.findOne({
      include: [
        {
          model: Cart,
          where: { userId: "2940915c-071e-423e-827c-a04d1ead2ce7" },
          attributes: []
        }
      ]
    });
    // console.log({ order });

    const response = await chai
      .request(app)
      .get(`/api/v1/orders/${order?.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
  });
});

describe("POST - Create an order - Integration test", () => {
  it("Should respond with an status 201 when I send un valid cartId", async () => {
    const response = await chai.request(app).post(`/api/v1/cart/make-order`).set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(201);
  });
});

// describe("PATCH - Cancel an order by id as customer", () => {
//   it("Should respond with a status 200 when the user is a customer", async () => {
//     const order = await Order.findOne({
//       include: [
//         {
//           model: Cart,
//           where: { userId: "024c33d3-2033-4baf-a1c2-c383d0765d03" },
//           attributes: []
//         }
//       ]
//     });
//     // console.log(order);
//     const response = await chai
//       .request(app)
//       .patch(`/api/v1/orders/${order?.id}/cancel`)
//       .set("Authorization", `Bearer ${tokenPedro}`);

//     expect(response).to.have.status(200);
//   });
// });

// describe("PATCH - Finished an order as superUser", () => {
//   it("Should respond with a status 200 when the user is superUser", async () => {
//     const order = await Order.findOne({
//       include: [
//         {
//           model: Cart,
//           where: { userId: "2940915c-071e-423e-827c-a04d1ead2ce7" },
//           attributes: []
//         }
//       ]
//     });

//     const response = await chai
//       .request(app)
//       .patch(`/api/v1/orders/${order?.id}/finish`)
//       .set("Authorization", `Bearer ${superToken}`);

//     expect(response).to.have.status(200);
//   });
// });

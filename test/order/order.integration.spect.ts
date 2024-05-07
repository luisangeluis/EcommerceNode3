import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";
import generateToken from "../../src/utils/generateToken";
// import Order from "../../src/models/Order.model";
// import Cart from "../../src/models/Cart.model";

chai.use(chaiHttp);

const expect = chai.expect;
let token: string;
let tokenPedro: string;
let tokenLuis: string;
// let superToken: string;

before(async () => {
  const user = {
    id: "2940915c-071e-423e-827c-a04d1ead2ce7",
    email: "angel.zepeda@correo.com",
    roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
  };

  token = await generateToken(user);

  const userPedro = {
    id: "024c33d3-2033-4baf-a1c2-c383d0765d03",
    email: "pedro.lopez@correo.com",
    roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
  };

  tokenPedro = await generateToken(userPedro);

  const userLuis = {
    id: "45925e48-60d5-4c08-8962-3001195167dd",
    email: "luis.gonzalez@correo.com",
    roleId: "536e9745-8769-45e1-bca4-1e9b3054fac8"
  };

  tokenLuis = await generateToken(userLuis);
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
    const orderId = "7a21eedf-048b-45d4-90bd-7491e31df4e4";
    const response = await chai.request(app).get(`/api/v1/orders/${orderId}`).set("Authorization", `Bearer ${tokenPedro}`);

    expect(response).to.have.status(200);
  });

  it("Should respond with an status 404 when I send an invalid orderId", async () => {
    const orderId = "1";
    const response = await chai.request(app).get(`/api/v1/orders/${orderId}`).set("Authorization", `Bearer ${tokenPedro}`);

    expect(response).to.have.status(404);
  });

  it("Should respond with an status 401 when I don't send a token", async () => {
    const orderId = "7a21eedf-048b-45d4-90bd-7491e31df4e4";
    const response = await chai.request(app).get(`/api/v1/orders/${orderId}`);

    expect(response).to.have.status(401);
  });
});

describe("POST - Create an order - Integration test", () => {
  it("Should respond with an status 201 when I send un valid cartId", async () => {
    const response = await chai.request(app).post(`/api/v1/cart/make-order`).set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(201);
  });
});

describe("PATCH - Pay an order", () => {
  it("Should respond with a status 200 when the order corresponds to the user", async () => {
    const pedroOrder = "7a21eedf-048b-45d4-90bd-7491e31df4e4";
    const response = await chai.request(app).patch(`/api/v1/orders/${pedroOrder}/pay`).set("Authorization", `Bearer ${tokenPedro}`);

    expect(response).to.have.status(200);
  });

  it("Should respond with a status 404 when the order don't correspond to the user", async () => {
    const pedroOrder = "1";
    const response = await chai.request(app).patch(`/api/v1/orders/${pedroOrder}/pay`).set("Authorization", `Bearer ${tokenPedro}`);

    expect(response).to.have.status(404);
  });

  it("Should respond with a status 401 when the user don't have authorization", async () => {
    const pedroOrder = "7a21eedf-048b-45d4-90bd-7491e31df4e4";
    const response = await chai.request(app).patch(`/api/v1/orders/${pedroOrder}/pay`);

    expect(response).to.have.status(401);
  });
});

describe("PATCH - Cancel an order by id", () => {
  it("Should respond with a status 200 if the order corresponds to the user", async () => {
    const luisOrder = "10d6ae78-fe83-4aab-8364-cea1d2a5e610";
    const response = await chai.request(app).patch(`/api/v1/orders/${luisOrder}/cancel`).set("Authorization", `Bearer ${tokenLuis}`);

    expect(response).to.have.status(200);
  });

  it("Should respond with a status 404 when the order don't correspond to the user", async () => {
    const otherOrder = "7a21eedf-048b-45d4-90bd-7491e31df4e4";
    const response = await chai.request(app).patch(`/api/v1/orders/${otherOrder}/cancel`).set("Authorization", `Bearer ${tokenLuis}`);

    expect(response).to.have.status(404);
  });

  it("Should respond with a status 401 when the user don't have authorization", async () => {
    const luisOrder = "10d6ae78-fe83-4aab-8364-cea1d2a5e610";
    const response = await chai.request(app).patch(`/api/v1/orders/${luisOrder}/cancel`);

    expect(response).to.have.status(401);
  });
});

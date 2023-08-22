import app from "../../src/app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

describe("POST - USER - integration tests", () => {
  it("Should respond with 201 status code when I send all the data of an user", async () => {
    const roleId = "536e9745-8769-45e1-bca4-1e9b3054fac8";

    const newUser = {
      firstName: "javier",
      lastName: "mina",
      email: "javier.mina@correo.com",
      password: "SecurePassword1@",
      roleId,
    };

    const response = await chai
      .request(app)
      .post("/api/v1/auth/register")
      .send(newUser);

    expect(response).to.have.status(201);
  });

  it("Should respond with 400 status code when I try to create an user with a missing property", async () => {
    const roleId = "536e9745-8769-45e1-bca4-1e9b3054fac8";

    const newUser = {
      firstName: "",
      lastName: "gonzalez",
      email: "luis.gonzalez@correo.com",
      password: "12345",
      roleId,
    };

    const response = await chai
      .request(app)
      .post("/api/v1/auth/register")
      .send(newUser);

    expect(response).to.have.status(400);
  });

  it("Should respond with 400 status code when I send an existing email address ", async () => {
    const roleId = "536e9745-8769-45e1-bca4-1e9b3054fac8";

    const newUser = {
      firstName: "francisco",
      lastName: "lopez",
      email: "juan.perez@correo.com",
      password: "12345",
      roleId,
    };

    const response = await chai
      .request(app)
      .post("/api/v1/auth/register")
      .send(newUser);

    expect(response).to.have.status(400);
  });

  it("Should respond with 400 status code when I send an invalid password", async () => {
    const roleId = "536e9745-8769-45e1-bca4-1e9b3054fac8";

    const newUser = {
      firstName: "francisco",
      lastName: "lopez",
      email: "francisco.lopez@correo.com",
      password: "12345",
      roleId,
    };

    const response = await chai
      .request(app)
      .post("/api/v1/auth/register")
      .send(newUser);

    expect(response).to.have.status(400);
  });

  it("Should respond with 400 status code when I send an invalid roleId", async () => {
    const newUser = {
      firstName: "pancho",
      lastName: "barraza",
      email: "pancho.barraza@correo.com",
      password: "SecurePassword1@",
      roleId: 1,
    };

    const response = await chai
      .request(app)
      .post("/api/v1/auth/register")
      .send(newUser);

    expect(response).to.have.status(400);
  });
});

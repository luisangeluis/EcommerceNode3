import app from "../../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
import Role from "../../src/models/Role.model";

chai.use(chaiHttp);
const expect = chai.expect;

describe("POST - USER - integration tests", () => {
  it("Should respond with 201 status code when I create a user successfully", async () => {
    try {
      const role = await Role.findOne({ where: { title: "customer" } });

      if (role) {
        const newUser = {
          firstName: "juan",
          lastName: "perez",
          email: "juan.perez@correo.com",
          password: "12345",
          roleId: role.id,
        };

        const response = await chai
          .request(app)
          .post("/api/v1/auth/register")
          .send(newUser);

        expect(response).to.have.status(201);
      }
    } catch (error: any) {
      console.log(error);
    }
  });
});

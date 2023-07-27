import chai from "chai";
import chaiHttp from "chai-http";
import * as userControllers from "../../src/controllers/user.controller";
import Role from "../../src/models/Role.model";

chai.use(chaiHttp);
const expect = chai.expect;

describe("CREATE - USER - unit tests", () => {
  it("Should create an user when I send all necesary data", async () => {
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

        const response = await userControllers.createUser(newUser);
        expect(response.firstName).to.equal("juan");
        expect(response.lastName).to.equal("perez");
        expect(response.email).to.equal("juan.perez@correo.com");
        expect(response.roleId).to.equal(role.id);
      }
    } catch (error: any) {
      console.log(error);
    }
  });
});

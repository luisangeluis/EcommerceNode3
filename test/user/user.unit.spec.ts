import chai from "chai";
import chaiHttp from "chai-http";
import * as userControllers from "../../src/controllers/user.controller";
import Role from "../../src/models/Role.model";

chai.use(chaiHttp);
const expect = chai.expect;

describe("CREATE - USER - unit tests", () => {
  it("Should create an user when I send all necesary data", async () => {
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
  });

  it("Should throw an error when I send an empty string on firstName property", async () => {
    const role = await Role.findOne({ where: { title: "customer" } });

    if (role) {
      const newUser = {
        firstName: "",
        lastName: "perez",
        email: "juan.perez@correo.com",
        password: "12345",
        roleId: role.id,
      };

      try {
        await userControllers.createUser(newUser);
        expect.fail("Expected an error to be thrown");
      } catch (error: any) {
        expect(error.message).to.be.an("string");
      }
    }
  });

  it("Should throw an error when I send an invalid email address", async () => {
    const role = await Role.findOne({ where: { title: "customer" } });

    if (role) {
      const newUser = {
        firstName: "juan",
        lastName: "perez",
        email: "micorreo",
        password: "12345",
        roleId: role.id,
      };

      try {
        await userControllers.createUser(newUser);
        expect.fail("Expected an error to be thrown");
      } catch (error: any) {
        expect(error.message).to.be.an("string");
      }
    }
  });

  it("Should throw an error when I send an invalid role id", async () => {
    const newUser = {
      firstName: "juan",
      lastName: "perez",
      email: "juan.perez@correo.com",
      password: "12345",
      roleId: 2,
    };

    try {
      await userControllers.createUser(newUser);
      expect.fail("Expected an error to be thrown");
    } catch (error: any) {
      expect(error.name).to.equal("SequelizeForeignKeyConstraintError");
    }
  });
});

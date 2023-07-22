import chai from "chai";
import chaiHttp from "chai-http";


import * as userControllers from "../../src/controllers/user.controller";

import db from "../../src/db/connection";
import Role from "../../src/models/Role.model";

chai.use(chaiHttp);
// const expect = chai.expect;

before(async () => {
  await db.sync({ force: true });
});

describe("POST - users", () => {
  it("Should return a new user when I send correct data", async () => {
    const role = await Role.findOne({ where: { title: "customer" } });

    let body = {};
    if (role) {
      body = {
        firstName: "a name",
        lastName: "a last name",
        email: "user@correo.com",
        password: "abcde",
        roleId: role?.id,
      };
      const user = await userControllers.createUser(body);
      console.log(user);
      
      expect(user?.firstName).toEqual("a")
    }
  });
});

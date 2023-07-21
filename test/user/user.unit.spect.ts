import app from "../../src/app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Get - users", () => {
  it("Should respond with 200 status code", (done) => {
    chai
      .request(app)
      .get("/api/v1/users")
      .send()
      .end((_err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });
});

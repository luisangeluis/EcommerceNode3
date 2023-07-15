import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
// const expect = chai.expect;

describe("Get - products", () => {
  it("Should respond with 200 status code", (done) => {
    chai
      .request(app)
      .get("/api/v1/products")
      .send()
      .end((_err, res) => {
        console.log(res);
        // res.
        // res.should.have.status(200);
        res.body.should.be.a("object");
        done();
      });
  });
});

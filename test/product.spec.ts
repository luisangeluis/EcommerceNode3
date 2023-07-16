import app from "../src/app";
import chai from "chai";
import chaiHttp from "chai-http";

chai.use(chaiHttp);
const expect = chai.expect;

describe("Get - products", () => {
  it("Should respond with 200 status code", (done) => {
    chai
      .request(app)
      .get("/api/v1/products")
      .send()
      .end((_err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it("Should respond with an array", (done) => {
    chai
      .request(app)
      .get("/api/v1/products")
      .send()
      .end((_err, res) => {
        expect(res.body).to.be.an("array");
        done();
      });
  });
});

describe("Get - product by id", () => {
  it("Should respond with 200 status code", (done) => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v1/products/${id}`)
      .end((_err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  it("Should respond with a object", (done) => {
    const id = 1;
    chai
      .request(app)
      .get(`/api/v1/products/${id}`)
      .end((_err, res) => {
        expect(res.body).to.be.an("object");
        done();
      });
  });
});

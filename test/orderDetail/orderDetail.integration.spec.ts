import chai from "chai";
import chaiHttp from "chai-http";
import app from "../../src/app";

chai.use(chaiHttp);

const expect = chai.expect;

describe("GET - Order detail - Integration tests",()=>{
    it("Should respond with 200 status code when  I send a correct order detail id",async()=>{
        
    })
})
import app from "../../src/app";
import chai from "chai";
import chaiHttp from "chai-http";
import generateToken from "../../src/utils/generateToken";

chai.use(chaiHttp);
const expect = chai.expect;
let token:string;

before(async()=>{
  try{
    const user = {
        id: "28149311-26a3-4b17-8ab4-f8d9a3b9657e",
        email: "juan.perez@correo.com",
        roleId: "5b39d9a2-a865-4a1c-8b4e-3341918d35c7",
      };
  
      token = await generateToken(user);
  }catch(error:any){
    console.log(error.message);
  }
})

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


describe("GET - User - Integration test",()=>{
  it("Should respond with an 200 code status when I want to get my own user",async()=>{
    const response = await chai.request(app).get("/api/v1/users/my-user").set("Authorization", `Bearer ${token}`);

    expect(response).to.have.status(200);
  })
})

describe("PATCH - User - Integration test",()=>{
  const newData = {firstName:"juanito"};
  const newData2 = {lastName:"rivera"};
  it("Should respond with 200 status code when I want to update my user's firstName",async()=>{
    
    const response = await chai.request(app).patch("/api/v1/users/my-user").set("Authorization", `Bearer ${token}`).send(newData);
    expect(response).to.have.status(200);

  })

  it("Should respond with 200 status code when I want to update my user's lastName",async()=>{
    
    const response = await chai.request(app).patch("/api/v1/users/my-user").set("Authorization", `Bearer ${token}`).send(newData2);
    expect(response).to.have.status(200);

  })
})
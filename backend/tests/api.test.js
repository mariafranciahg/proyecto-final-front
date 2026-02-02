import request from "supertest";
import app from "../index.js";

describe("API Tests", () => {
  let token = "";

  test("Register user", async () => {
    const res = await request(app).post("/api/auth/register").send({
      email: "test@test.com",
      password: "1234",
    });
    expect(res.statusCode).toBe(201);
  });

  test("Login user", async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "test@test.com",
      password: "1234",
    });
    token = res.body.token;
    expect(res.statusCode).toBe(200);
  });

  test("Get services", async () => {
    const res = await request(app).get("/api/services");
    expect(res.statusCode).toBe(200);
  });

  test("Create service protected", async () => {
    const res = await request(app)
      .post("/api/services")
      .set("Authorization", token)
      .send({ name: "Gasfiter", price: 10000 });

    expect(res.statusCode).toBe(201);
  });
});

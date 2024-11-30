import request from "supertest";
import { app, sequelize } from "../express";

describe("Client API E2E tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a client without pass id", async () => {
    const response = await request(app).post("/clients").send({
      name: "Higor Cruz",
      email: "higorrsc@gmail.com",
      document: "12345678910",
      street: "Fools Street",
      number: "0",
      complement: "Without Roof",
      city: "Funny House",
      state: "WW",
      zipCode: "15926",
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Higor Cruz");
    expect(response.body.email).toBe("higorrsc@gmail.com");
    expect(response.body.document).toBe("12345678910");
    expect(response.body.street).toBe("Fools Street");
    expect(response.body.number).toBe("0");
    expect(response.body.complement).toBe("Without Roof");
    expect(response.body.city).toBe("Funny House");
    expect(response.body.state).toBe("WW");
    expect(response.body.zipCode).toBe("15926");
  });

  it("should create a client passing id", async () => {
    const response = await request(app).post("/clients").send({
      id: "1",
      name: "Higor Cruz",
      email: "higorrsc@gmail.com",
      document: "12345678910",
      street: "Fools Street",
      number: "0",
      complement: "Without Roof",
      city: "Funny House",
      state: "WW",
      zipCode: "15926",
    });
    expect(response.status).toBe(200);
    expect(response.body.id).toBe("1");
    expect(response.body.name).toBe("Higor Cruz");
    expect(response.body.email).toBe("higorrsc@gmail.com");
    expect(response.body.document).toBe("12345678910");
    expect(response.body.street).toBe("Fools Street");
    expect(response.body.number).toBe("0");
    expect(response.body.complement).toBe("Without Roof");
    expect(response.body.city).toBe("Funny House");
    expect(response.body.state).toBe("WW");
    expect(response.body.zipCode).toBe("15926");
  });
});

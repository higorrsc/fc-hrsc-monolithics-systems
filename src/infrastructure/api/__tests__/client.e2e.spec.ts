import request from "supertest";
import { Migrator } from "../../migrations/config/migrator";
import { migratorE2E } from "../db.config";
import { app } from "../express";

describe("Client API E2E tests", () => {
  let migrator: Migrator;

  beforeEach(async () => {
    migrator = migratorE2E();
    await migrator.up();
  });

  afterEach(async () => {
    await migrator.down();
  });

  it("should create a client without passing id", async () => {
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
    expect(response.status).toBe(201);
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
    console.log(response.body);
    expect(response.status).toBe(201);
  });
});
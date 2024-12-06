import request from "supertest";
import { migrator } from "../../migrations/config/migrator";
import { app, sequelize } from "../express";

describe("Product API E2E tests", () => {
  const migration = migrator(sequelize);

  beforeAll(async () => {
    // await sequelize.sync({ force: true });
    await migration.up();
  });

  afterAll(async () => {
    // await sequelize.close();
    await migration.down();
  });

  it("should create a product without passing id", async () => {
    const response = await request(app).post("/products").send({
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      stock: 5,
    });
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Product 1 description");
    expect(response.body.purchasePrice).toBe(100);
    expect(response.body.stock).toBe(5);
  });

  it("should create a product passing id", async () => {
    const response = await request(app).post("/products").send({
      id: "1",
      name: "Product 1",
      description: "Product 1 description",
      purchasePrice: 100,
      salesPrice: 150,
      stock: 5,
    });
    expect(response.status).toBe(201);
    expect(response.body.id).toBe("1");
    expect(response.body.name).toBe("Product 1");
    expect(response.body.description).toBe("Product 1 description");
    expect(response.body.purchasePrice).toBe(100);
    expect(response.body.stock).toBe(5);
  });
});

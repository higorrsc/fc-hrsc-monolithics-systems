import request from "supertest";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import Client from "../../../modules/checkout/domain/client.entity";
import Product from "../../../modules/checkout/domain/product.entity";
import { app, sequelize } from "../express";

describe("Checkout API E2E tests", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  const client = new Client({
    id: new Id("1"),
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

  const product1 = new Product({
    id: new Id("1"),
    name: "Product 1",
    description: "Product 1 description",
    salesPrice: 100,
  });

  const product2 = new Product({
    id: new Id("2"),
    name: "Product 2",
    description: "Product 2 description",
    salesPrice: 200,
  });

  it("should create a checkout", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: "1",
        products: ["1", "2"],
      });

    expect(response.status).toBe(200);
  });
});

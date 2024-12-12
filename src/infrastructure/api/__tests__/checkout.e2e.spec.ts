import request from "supertest";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
<<<<<<< HEAD
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { Migrator } from "../../migrations/config/migrator";
import { migratorE2E } from "../db.config";
import { app } from "../express";

describe("Checkout API E2E tests", () => {
  let migrator: Migrator;
  let testId: {
    clientId: string;
    productId: string;
    otherProductId: string;
    orderId: string;
  };

  beforeEach(async () => {
    migrator = migratorE2E();
    await migrator.up();

    testId = {
      clientId: new Id().id,
      productId: new Id().id,
      otherProductId: new Id().id,
      orderId: new Id().id,
    };

    await ClientModel.create({
      id: testId.clientId,
      name: "Higor Cruz",
      email: "higorrsc@gmail.com",
      document: "12345678910",
      street: "Fools Street",
      number: "0",
      complement: "Without Roof",
      city: "Funny House",
      state: "WW",
      zipCode: "15926",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: testId.productId,
      name: "Product 1",
      description: "Product 1 description",
      quantity: 5,
      salesPrice: 100,
      purchasePrice: 50,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await ProductModel.create({
      id: testId.otherProductId,
      name: "Product 2",
      description: "Product 2 description",
      quantity: 2,
      salesPrice: 200,
      purchasePrice: 100,
      stock: 10,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  });

  afterEach(async () => {
    await migrator.down();
=======
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
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
  });

  it("should create a checkout", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
<<<<<<< HEAD
        clientId: testId.clientId,
        products: [
          { productId: testId.productId },
          { productId: testId.otherProductId },
        ],
      });

    expect(response.status).toBe(201);
=======
        clientId: "1",
        products: ["1", "2"],
      });

    expect(response.status).toBe(200);
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
  });
});

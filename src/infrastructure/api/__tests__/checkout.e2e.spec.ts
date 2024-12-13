import request from "supertest";
import Id from "../../../modules/@shared/domain/value-object/id.value-object";
import { ClientModel } from "../../../modules/client-adm/repository/client.model";
import { ProductModel } from "../../../modules/product-adm/repository/product.model";
import { Migrator } from "../../migrations/config/migrator";
import { CreateMigrator } from "../db.config";
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
    migrator = CreateMigrator();
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
  });

  it("should create a checkout", async () => {
    const response = await request(app)
      .post("/checkout")
      .send({
        clientId: testId.clientId,
        products: [
          { productId: testId.productId },
          { productId: testId.otherProductId },
        ],
      });

    expect(response.status).toBe(201);
  });
});

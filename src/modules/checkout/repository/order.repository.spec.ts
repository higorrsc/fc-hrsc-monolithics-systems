import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import { ClientModel } from "../../client-adm/repository/client.model";
import { ProductModel } from "../../store-catalog/repository/product.model";
import Client from "../domain/client.entity";
import Order from "../domain/order.entity";
import Product from "../domain/product.entity";
import { OrderItemModel } from "./order-item.model";
import { OrderModel } from "./order.model";
import { OrderRepository } from "./order.repository";

describe("OrderRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([
      OrderModel,
      OrderItemModel,
      ClientModel,
      ProductModel,
    ]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should add an order", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "email@email.com",
      document: "ABC123",
      street: "Helena Fuller",
      number: "54",
      complement: "Casa",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "31659-564",
    });
    const product1 = new Product({
      id: new Id("1"),
      name: "Product 1",
      description: "Product 1 description",
      quantity: 1,
      salesPrice: 1,
    });
    const product2 = new Product({
      id: new Id("2"),
      name: "Product 2",
      description: "Product 2 description",
      quantity: 2,
      salesPrice: 2,
    });
    const order = new Order({
      id: new Id("order-1"),
      client: client,
      status: "open",
      products: [product1, product2],
    });
    const orderRepository = new OrderRepository();
    await orderRepository.add(order);

    const orderDb = await OrderModel.findOne({
      where: { id: order.id.id },
    });
    const orderItemDb = await OrderItemModel.findOne({
      where: { orderId: order.id.id },
    });
    expect(orderDb).toBeDefined();
    expect(orderDb.id).toEqual(order.id.id);
    expect(orderDb.clientId).toEqual(order.client.id.id);
    expect(orderDb.status).toEqual(order.status);
    expect(orderItemDb).toBeDefined();
    expect(orderItemDb.orderId).toEqual(order.id.id);
    expect(orderItemDb.productId).toEqual(order.products[0].id.id);
    expect(orderItemDb.quantity).toEqual(order.products[0].quantity);
    expect(orderItemDb.price).toEqual(order.products[0].salesPrice);
  });

  it("should find an order", async () => {
    const client = await ClientModel.create({
      id: "client-1",
      name: "Client 1",
      email: "email@email.com",
      document: "ABC123",
      street: "Helena Fuller",
      number: "54",
      complement: "Casa",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "31659-564",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const product1 = await ProductModel.create({
      id: "prod-1",
      name: "Product 1",
      description: "Product 1 description",
      quantity: 1,
      salesPrice: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const product2 = await ProductModel.create({
      id: "prod-2",
      name: "Product 2",
      description: "Product 2 description",
      quantity: 2,
      salesPrice: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const order = await OrderModel.create({
      id: "order-1",
      clientId: "client-1",
      status: "open",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const orderItem1 = await OrderItemModel.create({
      id: "order-item-1",
      orderId: "order-1",
      productId: "prod-1",
      quantity: 1,
      price: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const orderItem2 = await OrderItemModel.create({
      id: "order-item-2",
      orderId: "order-1",
      productId: "prod-2",
      quantity: 2,
      price: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const orderRepository = new OrderRepository();
    const foundOrder = await orderRepository.find("order-1");
    expect(foundOrder).toBeDefined();
    expect(foundOrder.id.id).toEqual(order.id);
    expect(foundOrder.client.id.id).toEqual(client.id);
    expect(foundOrder.client.name).toEqual(client.name);
    expect(foundOrder.client.email).toEqual(client.email);
    expect(foundOrder.client.document).toEqual(client.document);
    expect(foundOrder.client.street).toEqual(client.street);
    expect(foundOrder.client.number).toEqual(client.number);
    expect(foundOrder.client.complement).toEqual(client.complement);
    expect(foundOrder.client.city).toEqual(client.city);
    expect(foundOrder.client.state).toEqual(client.state);
    expect(foundOrder.client.zipCode).toEqual(client.zipCode);
    expect(foundOrder.status).toEqual(order.status);
    expect(foundOrder.products).toHaveLength(2);
    expect(foundOrder.products[0].id.id).toEqual(product1.id);
    expect(foundOrder.products[0].name).toEqual(product1.name);
    expect(foundOrder.products[0].description).toEqual(product1.description);
    expect(foundOrder.products[0].quantity).toEqual(product1.quantity);
    expect(foundOrder.products[0].salesPrice).toEqual(product1.salesPrice);
    expect(foundOrder.products[1].id.id).toEqual(product2.id);
    expect(foundOrder.products[1].name).toEqual(product2.name);
    expect(foundOrder.products[1].description).toEqual(product2.description);
    expect(foundOrder.products[1].quantity).toEqual(product2.quantity);
    expect(foundOrder.products[1].salesPrice).toEqual(product2.salesPrice);
  });
});
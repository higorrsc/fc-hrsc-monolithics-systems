import { Sequelize } from "sequelize-typescript";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "../domain/client.entity";
import { ClientModel } from "./client.model";
import ClientRepository from "./client.repository";

describe("ClientRepository test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([ClientModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create a client", async () => {
    const client = new Client({
      id: new Id("1"),
      name: "Client 1",
      email: "email@email.com",
      address: "Address 1",
    });
    const repository = new ClientRepository();
    await repository.add(client);
    const clientDb = await ClientModel.findOne({ where: { id: client.id.id } });
    expect(clientDb).toBeDefined();
    expect(clientDb.id).toEqual(client.id.id);
    expect(clientDb.name).toEqual(client.name);
    expect(clientDb.email).toEqual(client.email);
    expect(clientDb.address).toEqual(client.address);
    expect(clientDb.createdAt).toEqual(client.createdAt);
    expect(clientDb.updatedAt).toEqual(client.updatedAt);
  });

  it("should find a client", async () => {
    const client = await ClientModel.create({
      id: "1",
      name: "Client 1",
      email: "email@email.com",
      address: "Address 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    const repository = new ClientRepository();
    const result = await repository.find(client.id);
    expect(client.id).toEqual(result.id.id);
    expect(client.name).toEqual(result.name);
    expect(client.email).toEqual(result.email);
    expect(client.address).toEqual(result.address);
    expect(client.createdAt).toEqual(result.createdAt);
    expect(client.updatedAt).toEqual(result.updatedAt);
  });
});

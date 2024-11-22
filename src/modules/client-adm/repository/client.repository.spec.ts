import { Sequelize } from "sequelize-typescript";
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

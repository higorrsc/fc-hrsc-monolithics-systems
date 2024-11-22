import { Sequelize } from "sequelize-typescript";
import ClientAdmFacadeFactory from "../factory/client-adm.facade.factory";
import { ClientModel } from "../repository/client.model";
import ClientRepository from "../repository/client.repository";
import AddClientUseCase from "../usecase/add-client/add-client.usecase";
import ClientAdmFacade from "./client-adm.facade";
import { AddClientFacadeInputDto } from "./client-adm.facade.dto";

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
    const repository = new ClientRepository();
    const addUseCase = new AddClientUseCase(repository);
    const facade = new ClientAdmFacade({
      addUseCase: addUseCase,
      findUseCase: undefined,
    });

    const input: AddClientFacadeInputDto = {
      id: "1",
      name: "Client 1",
      email: "email@email.com",
      address: "Address 1",
    };
    await facade.addClient(input);

    const clientDb = await ClientModel.findOne({ where: { id: input.id } });
    expect(clientDb).toBeDefined();
    expect(clientDb.name).toEqual(input.name);
    expect(clientDb.email).toEqual(input.email);
    expect(clientDb.address).toEqual(input.address);
  });

  it("should find a client", async () => {
    // const repository = new ClientRepository();
    // const addUseCase = new AddClientUseCase(repository);
    // const findClientUseCase = new FindClientUseCase(repository);
    // const facade = new ClientAdmFacade({
    //   addUseCase: addUseCase,
    //   findUseCase: findClientUseCase,
    // });
    const facade = ClientAdmFacadeFactory.create();

    const input = {
      id: "1",
      name: "Client 1",
      email: "email@email.com",
      address: "Address 1",
    };
    await facade.addClient(input);
    const clientDb = await facade.findClient({ id: input.id });
    expect(clientDb).toBeDefined();
    expect(clientDb.id).toEqual(input.id);
    expect(clientDb.name).toEqual(input.name);
    expect(clientDb.email).toEqual(input.email);
    expect(clientDb.address).toEqual(input.address);
  });
});

import { Sequelize } from "sequelize-typescript";
import { InvoiceItemModel } from "../repository/invoice-item.model";
import { InvoiceModel } from "../repository/invoice.model";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate-invoice/generate-invoice.usecase";
import InvoiceFacade from "./invoice.facade";
import { GenerateInvoiceFacadeInputDto } from "./invoice.facade.dto";

describe("InvoiceFacade test", () => {
  let sequelize: Sequelize;

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sequelize.addModels([InvoiceModel, InvoiceItemModel]);
    await sequelize.sync();
  });

  afterEach(async () => {
    await sequelize.close();
  });

  it("should create an invoice", async () => {
    const repository = new InvoiceRepository();
    const generateUseCase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      generateUseCase: generateUseCase,
      findUseCase: undefined,
    });
    const input: GenerateInvoiceFacadeInputDto = {
      id: "1",
      name: "Janie Patton",
      document: "ABC123",
      street: "Helena Fuller",
      number: "54",
      complement: "AP 123",
      city: "Belo Horizonte",
      state: "MG",
      zipCode: "31659-564",
      items: [
        {
          id: "1",
          name: "Product 1",
          price: 10,
        },
        {
          id: "2",
          name: "Product 2",
          price: 20,
        },
      ],
    };

    await facade.generate(input);
    const result = await InvoiceModel.findOne({
      where: { id: input.id },
    });
    expect(result.id).toBeDefined();
    expect(result.name).toEqual(input.name);
    expect(result.document).toEqual(input.document);
    expect(result.street).toEqual(input.street);
    expect(result.number).toEqual(input.number);
    expect(result.complement).toEqual(input.complement);
    expect(result.city).toEqual(input.city);
    expect(result.state).toEqual(input.state);
    expect(result.zipCode).toEqual(input.zipCode);
  });
});

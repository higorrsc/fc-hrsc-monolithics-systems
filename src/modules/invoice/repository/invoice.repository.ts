import Id from "../../@shared/domain/value-object/id.value-object";
import Address from "../domain/address.value-object";
import InvoiceItem from "../domain/invoice-item.entity";
import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
  async find(input: string): Promise<Invoice> {
    const invoice = await InvoiceModel.findOne({
      where: {
        id: input,
      },
    });

    if (!invoice) {
      throw new Error("Invoice not found");
    }

    const items = await InvoiceItemModel.findAll({
      where: {
        invoiceId: invoice.id,
      },
    });

    return new Invoice({
      id: new Id(invoice.id),
      name: invoice.name,
      document: invoice.document,
      address: new Address({
        street: invoice.street,
        number: invoice.number,
        complement: invoice.complement,
        city: invoice.city,
        state: invoice.state,
        zipCode: invoice.zipCode,
      }),
      items: items.map((item) => {
        return new InvoiceItem({
          id: new Id(item.id),
          invoiceId: new Id(item.invoiceId),
          name: item.name,
          price: item.price,
        });
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    });
  }
  async generate(input: Invoice): Promise<Invoice> {
    if (input.items.length === 0) {
      throw new Error("Items are required");
    }

    await InvoiceModel.create({
      id: input.id.id,
      name: input.name,
      document: input.document,
      street: input.address.street,
      number: input.address.number,
      complement: input.address.complement,
      city: input.address.city,
      state: input.address.state,
      zipCode: input.address.zipCode,
      createdAt: input.createdAt,
      updatedAt: input.updatedAt,
    });

    for (const item of input.items) {
      InvoiceItemModel.create({
        id: item.id.id,
        invoiceId: input.id.id,
        name: item.name,
        price: item.price,
      });
    }

    return new Invoice({
      id: input.id,
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items,
    });
  }
}

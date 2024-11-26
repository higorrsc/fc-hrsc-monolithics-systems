import Invoice from "../domain/invoice.entity";
import InvoiceGateway from "../gateway/invoice.gateway";
import { InvoiceItemModel } from "./invoice-item.model";
import { InvoiceModel } from "./invoice.model";

export default class InvoiceRepository implements InvoiceGateway {
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
      await InvoiceItemModel.create({
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

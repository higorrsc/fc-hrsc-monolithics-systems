import InvoiceGateway from '../../gateway/invoice.gateway'
import { FindInvoiceInputDto, FindInvoiceOutputDto } from './find-invoice.dto'

export default class FindInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(input: FindInvoiceInputDto): Promise<FindInvoiceOutputDto> {
    const invoice = await this._invoiceRepository.find(input.id)

    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      address: {
        street: invoice.address.street,
        number: invoice.address.number,
        complement: invoice.address.complement,
        city: invoice.address.city,
        state: invoice.address.state,
        zipCode: invoice.address.zipCode,
      },
      items: invoice.items.map((i) => {
        return {
          id: i.id.id,
          name: i.name,
          price: i.price,
        }
      }),
      total: invoice.items.reduce((acc, item) => acc + item.price, 0),
      createdAt: invoice.createdAt,
    }
  }
}

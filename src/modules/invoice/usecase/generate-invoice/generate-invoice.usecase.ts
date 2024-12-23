import Id from '../../../@shared/domain/value-object/id.value-object'
import Address from '../../domain/address.value-object'
import InvoiceItem from '../../domain/invoice-item.entity'
import Invoice from '../../domain/invoice.entity'
import InvoiceGateway from '../../gateway/invoice.gateway'
import {
  GenerateInvoiceInputDto,
  GenerateInvoiceOutputDto,
} from './generate-invoice.dto'

export default class GenerateInvoiceUseCase {
  private _invoiceRepository: InvoiceGateway

  constructor(invoiceRepository: InvoiceGateway) {
    this._invoiceRepository = invoiceRepository
  }

  async execute(
    input: GenerateInvoiceInputDto
  ): Promise<GenerateInvoiceOutputDto> {
    const invoiceId = new Id(input.id) || new Id()
    const props = {
      id: invoiceId,
      name: input.name,
      document: input.document,
      address: new Address({
        street: input.street,
        number: input.number,
        complement: input.complement,
        city: input.city,
        state: input.state,
        zipCode: input.zipCode,
      }),
      items: input.items.map((i) => {
        return new InvoiceItem({
          id: new Id(i.id) || new Id(),
          invoiceId: invoiceId,
          name: i.name,
          price: i.price,
        })
      }),
    }
    const invoice = new Invoice(props)
    this._invoiceRepository.generate(invoice)
    return {
      id: invoice.id.id,
      name: invoice.name,
      document: invoice.document,
      street: invoice.address.street,
      number: invoice.address.number,
      complement: invoice.address.complement,
      city: invoice.address.city,
      state: invoice.address.state,
      zipCode: invoice.address.zipCode,
      items: invoice.items.map((i) => {
        return {
          id: i.id.id,
          name: i.name,
          price: i.price,
        }
      }),
      total: invoice.items.reduce((total, item) => total + item.price, 0),
    }
  }
}

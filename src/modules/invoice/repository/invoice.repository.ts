import Id from '../../@shared/domain/value-object/id.value-object'
import Address from '../domain/address.value-object'
import InvoiceItem from '../domain/invoice-item.entity'
import Invoice from '../domain/invoice.entity'
import InvoiceGateway from '../gateway/invoice.gateway'
import { InvoiceItemModel } from './invoice-item.model'
import { InvoiceModel } from './invoice.model'

export default class InvoiceRepository implements InvoiceGateway {
  async find(input: string): Promise<Invoice> {
    let invoice = await InvoiceModel.findOne({
      where: {
        id: input,
      },
    })

    if (!invoice) {
      throw new Error('Invoice not found')
    }

    invoice = invoice.toJSON()

    const items = await InvoiceItemModel.findAll({
      where: {
        invoiceId: invoice.id,
      },
    }).then((items) => items.map((item) => item.toJSON()))

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
          quantity: item.quantity,
        })
      }),
      createdAt: invoice.createdAt,
      updatedAt: invoice.updatedAt,
    })
  }
  async generate(input: Invoice): Promise<Invoice> {
    if (input.items.length === 0) {
      throw new Error('Items are required')
    }
    try {
      const totalItems = input.items.reduce((acc, item) => {
        return acc + item.price * item.quantity
      }, 0)

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
        total: totalItems,
        createdAt: input.createdAt,
        updatedAt: input.updatedAt,
      })

      await Promise.all(
        input.items.map(async (item) => {
          await InvoiceItemModel.create({
            id: item.id.id,
            invoiceId: input.id.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            total: item.price * item.quantity,
            createdAt: input.createdAt,
            updatedAt: input.updatedAt,
          })
        })
      )
    } catch (error) {
      console.log('Erro ao adicionar dados da ordem:', error)
    }

    return new Invoice({
      id: input.id,
      name: input.name,
      document: input.document,
      address: input.address,
      items: input.items,
    })
  }
}

import Id from '../../../@shared/domain/value-object/id.value-object'
import UseCaseInterface from '../../../@shared/usecase/use-case.interface'
import ClientAdmFacadeInterface from '../../../client-adm/facade/client-adm.facade.interface'
import InvoiceFacadeInterface from '../../../invoice/facade/invoice.facade.interface'
import PaymentFacadeInterface from '../../../payment/facade/payment.facade.interface'
import ProductAdmFacadeInterface from '../../../product-adm/facade/product-adm.facade.interface'
import StoreCatalogFacadeInterface from '../../../store-catalog/facade/store-catalog.facade.interface'
import Client from '../../domain/client.entity'
import OrderItem from '../../domain/order-item.entity'
import Order from '../../domain/order.entity'
import Product from '../../domain/product.entity'
import CheckoutGateway from '../../gateway/checkout.gateway'
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place-order.dto'

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface
  private _productFacade: ProductAdmFacadeInterface
  private _catalogFacade: StoreCatalogFacadeInterface
  private _repository: CheckoutGateway
  private _invoiceFacade: InvoiceFacadeInterface
  private _paymentFacade: PaymentFacadeInterface

  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface,
    catalogFacade: StoreCatalogFacadeInterface,
    repository: CheckoutGateway,
    invoiceFacade: InvoiceFacadeInterface,
    paymentFacade: PaymentFacadeInterface
  ) {
    this._clientFacade = clientFacade
    this._productFacade = productFacade
    this._catalogFacade = catalogFacade
    this._repository = repository
    this._invoiceFacade = invoiceFacade
    this._paymentFacade = paymentFacade
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    // buscar o cliente, caso não encontre -> client not found
    const client = await this._clientFacade.findClient({ id: input.clientId })
    if (!client) {
      throw new Error('Client not found')
    }
    // validar produtos
    await this.validateProducts(input)
    // recuperar os produtos
    const products = await Promise.all(
      input.products.map((p) => this.getProduct(p.productId))
    )
    // criar os itens da ordem
    const orderItems = products.map((p, index) => {
      return new OrderItem({
        productId: p.id.id,
        price: p.salesPrice,
        quantity: input.products[index].quantity,
      })
    })
    // criar o objeto do client
    const myClient = new Client({
      id: new Id(client.id),
      name: client.name,
      email: client.email,
      document: client.document,
      street: client.street,
      number: client.number,
      complement: client.complement,
      city: client.city,
      state: client.state,
      zipCode: client.zipCode,
    })
    // criar o objeto da order(client, products)
    const order = new Order({
      client: myClient,
      items: orderItems,
    })
    // processar o pagamento -> paymentFacade.process(orderId, amount)
    const payment = await this._paymentFacade.process({
      orderId: order.id.id,
      amount: order.total,
    })
    // pagamento aprovado -> gerar invoice
    const invoice =
      payment.status === 'approved'
        ? await this._invoiceFacade.generate({
            name: client.name,
            document: client.document,
            street: client.street,
            number: client.number,
            complement: client.complement,
            city: client.city,
            state: client.state,
            zipCode: client.zipCode,
            items: products.map((p, index) => {
              return {
                id: p.id.id,
                name: p.name,
                price: p.salesPrice,
                quantity: input.products[index].quantity,
              }
            }),
          })
        : null
    // mudar o status da order para approved
    payment.status === 'approved' && order.approved()
    this._repository.add(order)
    // retornar DTO
    return {
      id: order.id.id,
      invoiceId: payment.status === 'approved' ? invoice.id : null,
      clientId: order.client.id.id,
      status: order.status,
      total: order.total,
      products: input.products.map((p) => {
        return {
          productId: p.productId,
          quantity: p.quantity,
        }
      }),
    }
  }

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error('No products select')
    }

    for (const p of input.products) {
      const product = await this._productFacade.checkStock({
        productId: p.productId,
      })
      if (product.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`
        )
      }
    }
  }

  private async getProduct(productId: string): Promise<Product> {
    const product = await this._catalogFacade.find({ id: productId })
    if (!product) {
      throw new Error('Product not found')
    }
    const productProps = {
      id: new Id(product.id),
      name: product.name,
      description: product.description,
      salesPrice: product.salesPrice,
    }
    return new Product(productProps)
  }
}

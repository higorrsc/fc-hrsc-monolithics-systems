import { CreateMigrator } from '../../../infrastructure/db.config'
import { Migrator } from '../../../infrastructure/migrations/config/migrator'
import Id from '../../@shared/domain/value-object/id.value-object'
import { AddClientFacadeInputDto } from '../../client-adm/facade/client-adm.facade.dto'
import ClientAdmFacadeInterface from '../../client-adm/facade/client-adm.facade.interface'
import ClientAdmFacadeFactory from '../../client-adm/factory/client-adm.facade.factory'
import { AddProductFacadeInputDto } from '../../product-adm/facade/product-adm.facade.dto'
import ProductAdmFacadeInterface from '../../product-adm/facade/product-adm.facade.interface'
import ProductAdmFacadeFactory from '../../product-adm/factory/product-adm.facade.factory'
import CheckoutFacadeFactory from '../factory/checkout.facade.factory'
import {
  PlaceOrderInputDto,
  PlaceOrderOutputDto,
} from '../usecase/place-order/place-order.dto'
import CheckoutFacadeInterface from './checkout.facade.interface'

describe('CheckoutFacade tests', () => {
  let migrator: Migrator

  const testId = {
    clientId: new Id().id,
    productId: new Id().id,
    otherProductId: new Id().id,
  }

  beforeEach(async () => {
    migrator = CreateMigrator()
    await migrator.up()

    const client: AddClientFacadeInputDto = {
      id: testId.clientId,
      name: 'Higor Cruz',
      email: 'higorrsc@gmail.com',
      document: '12345678910',
      street: 'Fools Street',
      number: '0',
      complement: 'Without Roof',
      city: 'Funny House',
      state: 'WW',
      zipCode: '15926',
    }

    const product: AddProductFacadeInputDto = {
      id: testId.productId,
      name: 'Product 1',
      description: 'Product 1 description',
      salesPrice: 100,
      purchasePrice: 50,
      stock: 10,
    }

    const otherProduct: AddProductFacadeInputDto = {
      id: testId.otherProductId,
      name: 'Product 2',
      description: 'Product 2 description',
      salesPrice: 200,
      purchasePrice: 100,
      stock: 5,
    }

    const clientFacade: ClientAdmFacadeInterface =
      ClientAdmFacadeFactory.create()
    await clientFacade.addClient(client)

    const productFacade: ProductAdmFacadeInterface =
      ProductAdmFacadeFactory.create()
    await productFacade.addProduct(product)
    await productFacade.addProduct(otherProduct)
  })

  afterEach(async () => {
    await migrator.down()
  })

  it('should place an order', async () => {
    const checkoutFacade: CheckoutFacadeInterface =
      CheckoutFacadeFactory.create()
    const input: PlaceOrderInputDto = {
      clientId: testId.clientId,
      products: [
        { productId: testId.productId, quantity: 1 },
        { productId: testId.otherProductId, quantity: 1 },
      ],
    }

    const result: PlaceOrderOutputDto = await checkoutFacade.placeOrder(input)
    expect(result.id).toBeDefined()
    expect(result.invoiceId).toBeDefined()
    expect(result.clientId).toBe(testId.clientId)
    expect(result.status).toBe('approved')
    expect(result.total).toBe(300)
    expect(result.products.length).toBe(2)
    expect(result.products[0].productId).toBe(testId.productId)
    expect(result.products[0].quantity).toBe(1)
    expect(result.products[1].productId).toBe(testId.otherProductId)
    expect(result.products[1].quantity).toBe(1)
  })
})

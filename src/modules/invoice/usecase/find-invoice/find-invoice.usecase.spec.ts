import Id from '../../../@shared/domain/value-object/id.value-object'
import FindInvoiceUseCase from './find-invoice.usecase'

const invoice = {
  id: new Id('1'),
  name: 'Janie Patton',
  document: 'ABC123',
  address: {
    street: 'Helena Fuller',
    number: '54',
    complement: 'AP 123',
    city: 'Belo Horizonte',
    state: 'MG',
    zipCode: '31659-564',
  },
  items: [
    {
      id: new Id('1'),
      name: 'Product 1',
      price: 10,
    },
    {
      id: new Id('2'),
      name: 'Product 2',
      price: 20,
    },
  ],
  total: 30,
  createdAt: new Date(),
}

const MockRepository = () => {
  return {
    generate: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(invoice)),
  }
}

describe('Find Invoice UseCase unit test', () => {
  it('should find a invoice', async () => {
    const repository = MockRepository()
    const usecase = new FindInvoiceUseCase(repository)
    const input = {
      id: '1',
    }
    const result = await usecase.execute(input)
    expect(repository.find).toHaveBeenCalled()
    expect(result.id).toEqual(invoice.id.id)
    expect(result.name).toEqual(invoice.name)
    expect(result.document).toEqual(invoice.document)
    expect(result.address.street).toEqual(invoice.address.street)
    expect(result.address.number).toEqual(invoice.address.number)
    expect(result.address.complement).toEqual(invoice.address.complement)
    expect(result.address.city).toEqual(invoice.address.city)
    expect(result.address.state).toEqual(invoice.address.state)
    expect(result.address.zipCode).toEqual(invoice.address.zipCode)
    expect(result.items).toHaveLength(2)
    expect(result.items[0].id).toEqual(invoice.items[0].id.id)
    expect(result.items[0].name).toEqual(invoice.items[0].name)
    expect(result.items[0].price).toEqual(invoice.items[0].price)
    expect(result.items[1].id).toEqual(invoice.items[1].id.id)
    expect(result.items[1].name).toEqual(invoice.items[1].name)
    expect(result.items[1].price).toEqual(invoice.items[1].price)
    expect(result.total).toEqual(invoice.total)
    expect(result.createdAt).toBeDefined()
  })
})

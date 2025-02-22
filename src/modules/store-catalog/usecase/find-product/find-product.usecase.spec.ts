import Id from '../../../@shared/domain/value-object/id.value-object'
import Product from '../../domain/product.entity'
import FindProductUseCase from './find-product.usecase'

const product = new Product({
  id: new Id('1'),
  name: 'Product 1',
  description: 'Description 1',
  salesPrice: 100,
})

const MockRepository = () => {
  return {
    find: jest.fn().mockReturnValue(Promise.resolve(product)),
    findAll: jest.fn(),
  }
}

describe('find a product use case unit test', () => {
  it('should find a product', async () => {
    const productRepository = MockRepository()
    const usecase = new FindProductUseCase(productRepository)
    const result = await usecase.execute(product.id)

    expect(productRepository.find).toHaveBeenCalled()
    expect(result.id).toBe(product.id.id)
    expect(result.name).toBe(product.name)
    expect(result.description).toBe(product.description)
    expect(result.salesPrice).toBe(product.salesPrice)
  })
})

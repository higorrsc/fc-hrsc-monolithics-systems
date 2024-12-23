import Id from '../../../@shared/domain/value-object/id.value-object'
import Transaction from '../../domain/transaction.entity'
import ProcessPaymentUseCase from './process-payment.usecase'

const transactionApproved = new Transaction({
  id: new Id('1'),
  orderId: '1',
  amount: 100,
  status: 'approved',
})

const MockRepositoryApproved = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionApproved)),
  }
}

const transactionDeclined = new Transaction({
  id: new Id('1'),
  orderId: '1',
  amount: 50,
  status: 'declined',
})

const MockRepositoryDeclined = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transactionDeclined)),
  }
}

describe('ProcessPaymentUseCase unit test', () => {
  it('should approve a transaction', async () => {
    const paymentRepository = MockRepositoryApproved()
    const usecase = new ProcessPaymentUseCase(paymentRepository)
    const input = {
      orderId: '1',
      amount: 100,
    }
    const result = await usecase.execute(input)
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe('1')
    expect(result.orderId).toBe('1')
    expect(result.amount).toBe(100)
    expect(result.status).toBe('approved')
    expect(result.createdAt).toBe(transactionApproved.createdAt)
    expect(result.updatedAt).toBe(transactionApproved.updatedAt)
  })

  it('should decline a transaction', async () => {
    const paymentRepository = MockRepositoryDeclined()
    const usecase = new ProcessPaymentUseCase(paymentRepository)
    const input = {
      orderId: '1',
      amount: 50,
    }
    const result = await usecase.execute(input)
    expect(paymentRepository.save).toHaveBeenCalled()
    expect(result.transactionId).toBe('1')
    expect(result.orderId).toBe('1')
    expect(result.amount).toBe(50)
    expect(result.status).toBe('declined')
    expect(result.createdAt).toBe(transactionDeclined.createdAt)
    expect(result.updatedAt).toBe(transactionDeclined.updatedAt)
  })
})

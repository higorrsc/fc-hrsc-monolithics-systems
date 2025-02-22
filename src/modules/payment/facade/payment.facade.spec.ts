import { Sequelize } from 'sequelize-typescript'
import PaymentFacadeFactory from '../factory/payment.facade.factory'
import { TransactionModel } from '../repository/transaction.model'
import {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from './payment.facade.dto'

describe('PaymentFacade test', () => {
  let sequelize: Sequelize

  beforeEach(async () => {
    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: { force: true },
    })

    sequelize.addModels([TransactionModel])
    await sequelize.sync()
  })

  afterEach(async () => {
    await sequelize.close()
  })

  it('should create a transaction', async () => {
    // const repository = new TransactionRepository();
    // const usecase = new ProcessPaymentUseCase(repository);
    // const facade = new PaymentFacade(usecase);
    const facade = PaymentFacadeFactory.create()

    const input: PaymentFacadeInputDto = {
      orderId: '1',
      amount: 100,
    }

    const output: PaymentFacadeOutputDto = await facade.process(input)
    expect(output.transactionId).toBeDefined()
    expect(output.orderId).toEqual(input.orderId)
    expect(output.amount).toEqual(input.amount)
    expect(output.status).toEqual('approved')
  })
})

import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import {
  PaymentFacadeInputDto,
  PaymentFacadeOutputDto,
} from './payment.facade.dto'
import PaymentFacadeInterface from './payment.facade.interface'

export default class PaymentFacade implements PaymentFacadeInterface {
  private _processPaymentUseCase: UseCaseInterface

  constructor(processPaymentUseCase: UseCaseInterface) {
    this._processPaymentUseCase = processPaymentUseCase
  }

  async process(input: PaymentFacadeInputDto): Promise<PaymentFacadeOutputDto> {
    try {
      const output = await this._processPaymentUseCase.execute(input)
      return {
        transactionId: output.transactionId,
        orderId: output.orderId,
        amount: output.amount,
        status: output.status,
        createdAt: output.createdAt,
        updatedAt: output.updatedAt,
      }
    } catch (error) {
      console.log(error)
    }
  }
}

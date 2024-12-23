import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
} from './invoice.facade.dto'
import InvoiceFacadeInterface from './invoice.facade.interface'

export interface InvoiceFacadeProps {
  generateUseCase: UseCaseInterface
  findUseCase: UseCaseInterface
}

export default class InvoiceFacade implements InvoiceFacadeInterface {
  private _generateUseCase: UseCaseInterface
  private _findUseCase: UseCaseInterface

  constructor(useCaseProps: InvoiceFacadeProps) {
    this._generateUseCase = useCaseProps.generateUseCase
    this._findUseCase = useCaseProps.findUseCase
  }

  async generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    return await this._generateUseCase.execute(input)
  }
  async find(
    input: FindInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto> {
    return await this._findUseCase.execute(input)
  }
}

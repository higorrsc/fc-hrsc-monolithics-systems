import UseCaseInterface from '../../@shared/usecase/use-case.interface'
import {
  AddClientFacadeInputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from './client-adm.facade.dto'
import ClientAdmFacadeInterface from './client-adm.facade.interface'

export interface UseCaseProps {
  addUseCase: UseCaseInterface
  findUseCase: UseCaseInterface
}
export default class ClientAdmFacade implements ClientAdmFacadeInterface {
  private _addUseCase: UseCaseInterface
  private _findUseCase: UseCaseInterface

  constructor(useCaseProps: UseCaseProps) {
    this._addUseCase = useCaseProps.addUseCase
    this._findUseCase = useCaseProps.findUseCase
  }

  async addClient(input: AddClientFacadeInputDto): Promise<void> {
    await this._addUseCase.execute(input)
  }
  async findClient(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto> {
    return await this._findUseCase.execute(input)
  }
}

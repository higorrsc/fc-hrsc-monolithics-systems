import {
  AddClientFacadeInputDto,
  AddClientFacadeOutputDto,
  FindClientFacadeInputDto,
  FindClientFacadeOutputDto,
} from './client-adm.facade.dto'

export default interface ClientAdmFacadeInterface {
  addClient(input: AddClientFacadeInputDto): Promise<AddClientFacadeOutputDto>

  findClient(
    input: FindClientFacadeInputDto
  ): Promise<FindClientFacadeOutputDto>
}

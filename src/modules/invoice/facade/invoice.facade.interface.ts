import {
  FindInvoiceFacadeInputDto,
  FindInvoiceFacadeOutputDto,
  GenerateInvoiceFacadeInputDto,
} from './invoice.facade.dto'

export default interface InvoiceFacadeInterface {
  generate(
    input: GenerateInvoiceFacadeInputDto
  ): Promise<FindInvoiceFacadeOutputDto>
  find(input: FindInvoiceFacadeInputDto): Promise<FindInvoiceFacadeOutputDto>
}

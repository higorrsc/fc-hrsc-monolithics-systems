import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  AddProductFacadeInputDto,
<<<<<<< HEAD
=======
  AddProductFacadeOutputDto,
>>>>>>> 4fada72 (feat: add back old data)
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.dto";
import ProductAdmFacadeInterface from "./product-adm.facade.interface";

export interface UseCaseProps {
  addUseCase: UseCaseInterface;
  stockUseCase: UseCaseInterface;
}

export default class ProductAdmFacade implements ProductAdmFacadeInterface {
  private _addUseCase: UseCaseInterface;
  private _checkStockUseCase: UseCaseInterface;

  constructor(useCasesProps: UseCaseProps) {
    this._addUseCase = useCasesProps.addUseCase;
    this._checkStockUseCase = useCasesProps.stockUseCase;
  }

<<<<<<< HEAD
  addProduct(input: AddProductFacadeInputDto): Promise<void> {
=======
  addProduct(
    input: AddProductFacadeInputDto
  ): Promise<AddProductFacadeOutputDto> {
>>>>>>> 4fada72 (feat: add back old data)
    // caso o DTO do caso de uso for != do DTO da facade
    // converter DTO da facade para o DTO do caso de uso
    return this._addUseCase.execute(input);
  }

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto> {
    // caso o DTO do caso de uso for != do DTO da facade
    // converter DTO da facade para o DTO do caso de uso
    return this._checkStockUseCase.execute(input);
  }
}

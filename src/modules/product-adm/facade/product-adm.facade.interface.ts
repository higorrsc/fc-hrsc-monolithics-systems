import {
  AddProductFacadeInputDto,
<<<<<<< HEAD
=======
  AddProductFacadeOutputDto,
>>>>>>> 4fada72 (feat: add back old data)
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.dto";

export default interface ProductAdmFacadeInterface {
<<<<<<< HEAD
  addProduct(input: AddProductFacadeInputDto): Promise<void>;
=======
  addProduct(
    input: AddProductFacadeInputDto
  ): Promise<AddProductFacadeOutputDto>;
>>>>>>> 4fada72 (feat: add back old data)

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto>;
}

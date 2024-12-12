import {
  AddProductFacadeInputDto,
<<<<<<< HEAD
<<<<<<< HEAD
=======
  AddProductFacadeOutputDto,
>>>>>>> 4fada72 (feat: add back old data)
=======
  AddProductFacadeOutputDto,
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
  CheckStockFacadeInputDto,
  CheckStockFacadeOutputDto,
} from "./product-adm.facade.dto";

export default interface ProductAdmFacadeInterface {
<<<<<<< HEAD
<<<<<<< HEAD
  addProduct(input: AddProductFacadeInputDto): Promise<void>;
=======
  addProduct(
    input: AddProductFacadeInputDto
  ): Promise<AddProductFacadeOutputDto>;
>>>>>>> 4fada72 (feat: add back old data)
=======
  addProduct(
    input: AddProductFacadeInputDto
  ): Promise<AddProductFacadeOutputDto>;
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12

  checkStock(
    input: CheckStockFacadeInputDto
  ): Promise<CheckStockFacadeOutputDto>;
}

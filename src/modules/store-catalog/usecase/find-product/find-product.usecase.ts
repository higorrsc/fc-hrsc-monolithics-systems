import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ProductGateway from "../../gateway/product.gateway";
import { FindProductInputDto, FindProductOutputDto } from "./find-product.dto";

export default class FindProductUseCase implements UseCaseInterface {
  constructor(private productRepository: ProductGateway) {}
  async execute(input: FindProductInputDto): Promise<FindProductOutputDto> {
    const product = await this.productRepository.find(input.id);
    return {
      id: product.id.id,
      name: product.name,
      description: product.description,
<<<<<<< HEAD
=======
      quantity: product.quantity,
>>>>>>> 4fada72 (feat: add back old data)
      salesPrice: product.salesPrice,
    };
  }
}

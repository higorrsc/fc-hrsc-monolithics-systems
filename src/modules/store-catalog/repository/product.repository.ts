import Id from "../../@shared/domain/value-object/id.value-object";
import Product from "../domain/product.entity";
import ProductGateway from "../gateway/product.gateway";
import { ProductModel } from "./product.model";

export default class ProductRepository implements ProductGateway {
  async findAll(): Promise<Product[]> {
    const products = await ProductModel.findAll();
    return products.map(
      (product) =>
        new Product({
          id: new Id(product.id),
          name: product.name,
          description: product.description,
<<<<<<< HEAD
<<<<<<< HEAD
=======
          quantity: product.quantity,
>>>>>>> 4fada72 (feat: add back old data)
=======
          quantity: product.quantity,
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
          salesPrice: product.salesPrice,
        })
    );
  }
  async find(id: string): Promise<Product> {
    const product = await ProductModel.findOne({ where: { id: id } });
    return new Product({
      id: new Id(product.id),
      name: product.name,
      description: product.description,
<<<<<<< HEAD
<<<<<<< HEAD
=======
      quantity: product.quantity,
>>>>>>> 4fada72 (feat: add back old data)
=======
      quantity: product.quantity,
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
      salesPrice: product.salesPrice,
    });
  }
}

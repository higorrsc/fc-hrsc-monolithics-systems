import express, { Request, Response } from "express";
import ProductRepository from "../../../modules/product-adm/repository/product.repository";
import {
  AddProductInputDto,
  AddProductOutputDto,
} from "../../../modules/product-adm/usecase/add-product/add-product.dto";
import AddProductUseCase from "../../../modules/product-adm/usecase/add-product/add-product.usecase";

export const productRoute = express.Router();
productRoute.post("/", async (req: Request, res: Response) => {
  const useCase = new AddProductUseCase(new ProductRepository());
  try {
    let productDto: AddProductInputDto;
    productDto = {
      name: req.body.name,
      description: req.body.description,
      purchasePrice: req.body.purchasePrice,
      stock: req.body.stock,
    };
    if (req.body.id) {
      productDto.id = req.body.id;
    }
    const output: AddProductOutputDto = await useCase.execute(productDto);
    res.send(output);
  } catch (err) {
    res.status(500).send(err);
  }
});

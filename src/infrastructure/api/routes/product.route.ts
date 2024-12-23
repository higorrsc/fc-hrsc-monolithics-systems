import express, { Request, Response } from 'express'
import ProductAdmFacadeInterface from '../../../modules/product-adm/facade/product-adm.facade.interface'
import ProductAdmFacadeFactory from '../../../modules/product-adm/factory/product-adm.facade.factory'

export const productRoute = express.Router()
productRoute.post('/', async (req: Request, res: Response) => {
  try {
    const productFacade: ProductAdmFacadeInterface =
      ProductAdmFacadeFactory.create()
    const result = await productFacade.addProduct(req.body)
    res.status(201).send(result)
  } catch (err) {
    console.log(err)
    res.status(500).send(err)
  }
})

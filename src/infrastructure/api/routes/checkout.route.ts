import express, { Request, Response } from 'express'
import CheckoutFacadeInterface from '../../../modules/checkout/facade/checkout.facade.interface'
import CheckoutFacadeFactory from '../../../modules/checkout/factory/checkout.facade.factory'
import { PlaceOrderInputDto } from '../../../modules/checkout/usecase/place-order/place-order.dto'

export const checkoutRoute = express.Router()
checkoutRoute.post('/', async (req: Request, res: Response) => {
  try {
    const checkoutFacade: CheckoutFacadeInterface =
      CheckoutFacadeFactory.create()

    const input: PlaceOrderInputDto = {
      clientId: req.body.clientId,
      products: req.body.products,
    }
    const output = await checkoutFacade.placeOrder(input)
    res.status(201).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

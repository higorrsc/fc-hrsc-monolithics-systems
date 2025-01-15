import express, { Request, Response } from 'express'
import InvoiceFacadeInterface from '../../../modules/invoice/facade/invoice.facade.interface'
import InvoiceFacadeFactory from '../../../modules/invoice/factory/invoice.facade.factory'

export const invoiceRoute = express.Router()

invoiceRoute.get('/:id', async (req: Request, res: Response) => {
  try {
    const invoiceFacade: InvoiceFacadeInterface = InvoiceFacadeFactory.create()
    const output = await invoiceFacade.find({
      id: req.params.id,
    })
    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

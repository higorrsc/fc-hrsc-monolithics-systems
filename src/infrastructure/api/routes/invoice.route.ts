import express, { Request, Response } from 'express'
import InvoiceRepository from '../../../modules/invoice/repository/invoice.repository'
import FindInvoiceUseCase from '../../../modules/invoice/usecase/find-invoice/find-invoice.usecase'

export const invoiceRoute = express.Router()

invoiceRoute.get('/:id', (req: Request, res: Response) => {
  const useCase = new FindInvoiceUseCase(new InvoiceRepository())
  try {
    const output = useCase.execute({ id: req.params.id })
    res.status(200).send(output)
  } catch (err) {
    res.status(500).send(err)
  }
})

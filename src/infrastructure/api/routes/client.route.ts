import express, { Request, Response } from 'express'
import ClientAdmFacadeInterface from '../../../modules/client-adm/facade/client-adm.facade.interface'
import ClientAdmFacadeFactory from '../../../modules/client-adm/factory/client-adm.facade.factory'

export const clientRoute = express.Router()
clientRoute.post('/', async (req: Request, res: Response) => {
  try {
    const clientFacade: ClientAdmFacadeInterface =
      ClientAdmFacadeFactory.create()
    const result = await clientFacade.addClient(req.body)
    res.status(201).send(result)
  } catch (err) {
    res.status(500).send(err)
  }
})

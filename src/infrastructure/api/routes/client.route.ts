import express, { Request, Response } from "express";
import ClientAdmFacadeInterface from "../../../modules/client-adm/facade/client-adm.facade.interface";
import ClientAdmFacadeFactory from "../../../modules/client-adm/factory/client-adm.facade.factory";
import { AddClientInputDto } from "../../../modules/client-adm/usecase/add-client/add-client.dto";

export const clientRoute = express.Router();
clientRoute.post("/", async (req: Request, res: Response) => {
  // const useCase = new AddClientUseCase(new ClientRepository());
  try {
    const clientFacade: ClientAdmFacadeInterface =
      ClientAdmFacadeFactory.create();
    let clientDto: AddClientInputDto;
    clientDto = {
      name: req.body.name,
      email: req.body.email,
      document: req.body.document,
      street: req.body.street,
      number: req.body.number,
      complement: req.body.complement,
      city: req.body.city,
      state: req.body.state,
      zipCode: req.body.zipCode,
    };
    if (req.body.id) {
      clientDto.id = req.body.id;
    }
    const result = await clientFacade.addClient(clientDto);
    res.status(201).send(result);
  } catch (err) {
    res.status(500).send(err);
  }
});

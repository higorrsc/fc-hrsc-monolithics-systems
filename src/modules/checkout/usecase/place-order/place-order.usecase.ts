import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;

  constructor(clientFacade: ClientAdmFacadeInterface) {
    this._clientFacade = clientFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    // buscar o cliente, caso não encontre -> client not found
    const client = await this._clientFacade.findClient({ id: input.clientId });
    if (!client) {
      throw new Error("Client not found");
    }
    // validar produtos
    // recuperar os produtos

    // criar o objeto do client
    // criar o objeto da order(client, products)

    // processar o pagamento -> paymentFacade.process(orderId, amount)

    // pagamento aprovado -> gerar invoice
    // mudar o status da order para approved
    // retornar DTO

    return {
      id: "",
      invoiceId: "",
      status: "",
      total: 0,
      products: [],
    };
  }
}

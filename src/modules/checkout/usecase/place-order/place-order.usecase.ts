import UseCaseInterface from "../../../@shared/usecase/use-case.interface";
import ClientAdmFacadeInterface from "../../../client-adm/facade/client-adm.facade.interface";
import ProductAdmFacadeInterface from "../../../product-adm/facade/product-adm.facade.interface";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./place-order.dto";

export default class PlaceOrderUseCase implements UseCaseInterface {
  private _clientFacade: ClientAdmFacadeInterface;
  private _productFacade: ProductAdmFacadeInterface;

  constructor(
    clientFacade: ClientAdmFacadeInterface,
    productFacade: ProductAdmFacadeInterface
  ) {
    this._clientFacade = clientFacade;
    this._productFacade = productFacade;
  }

  async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
    // buscar o cliente, caso não encontre -> client not found
    const client = await this._clientFacade.findClient({ id: input.clientId });
    if (!client) {
      throw new Error("Client not found");
    }
    // validar produtos
    await this.validateProducts(input);
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

  private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
    if (input.products.length === 0) {
      throw new Error("No products select");
    }

    for (const p of input.products) {
      const product = await this._productFacade.checkStock({
        productId: p.productId,
      });
      if (product.stock <= 0) {
        throw new Error(
          `Product ${product.productId} is not available in stock`
        );
      }
    }
  }
}

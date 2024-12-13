import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import {
  CheckoutFacadeInputDto,
  CheckoutFacadeOutputDto,
} from "./checkout.facade.dto";
import CheckoutFacadeInterface from "./checkout.facade.interface";

export interface CheckoutFacadeProps {
  placeOrderUseCase: UseCaseInterface;
}

export default class CheckoutFacade implements CheckoutFacadeInterface {
  private _placeOrderUseCase: UseCaseInterface;

  constructor(useCaseProps: CheckoutFacadeProps) {
    this._placeOrderUseCase = useCaseProps.placeOrderUseCase;
  }
  async placeOrder(
    input: CheckoutFacadeInputDto
  ): Promise<CheckoutFacadeOutputDto> {
    const response = await this._placeOrderUseCase.execute(input);
    return {
      id: response.id,
      invoiceId: response.invoiceId,
      clientId: response.clientId,
      status: response.status,
      total: response.total,
      products: response.products,
    };
  }
}

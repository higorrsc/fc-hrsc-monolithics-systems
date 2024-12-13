import ClientAdmFacadeFactory from "../../client-adm/factory/client-adm.facade.factory";
import InvoiceFacadeFactory from "../../invoice/factory/invoice.facade.factory";
import PaymentFacadeFactory from "../../payment/factory/payment.facade.factory";
import ProductAdmFacadeFactory from "../../product-adm/factory/product-adm.facade.factory";
import StoreCatalogFacadeFactory from "../../store-catalog/factory/store-catalog.facade.factory";
import CheckoutFacade from "../facade/checkout.facade";
import { OrderRepository } from "../repository/order.repository";
import PlaceOrderUseCase from "../usecase/place-order/place-order.usecase";

export default class CheckoutFacadeFactory {
  static create() {
    const useCase = new PlaceOrderUseCase(
      ClientAdmFacadeFactory.create(),
      ProductAdmFacadeFactory.create(),
      StoreCatalogFacadeFactory.create(),
      new OrderRepository(),
      InvoiceFacadeFactory.create(),
      PaymentFacadeFactory.create()
    );
    const checkoutFacade = new CheckoutFacade({ placeOrderUseCase: useCase });
    return checkoutFacade;
  }
}

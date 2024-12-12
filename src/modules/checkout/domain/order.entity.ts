import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";
import Client from "./client.entity";
import Product from "./product.entity";

type OrderProps = {
  id?: Id;
  client: Client;
  products: Product[];
  status?: string;
<<<<<<< HEAD
=======
  createdAt?: Date;
  updatedAt?: Date;
>>>>>>> 4fada72 (feat: add back old data)
};

export default class Order extends BaseEntity {
  private _client: Client;
  private _products: Product[];
  private _status: string;

  constructor(props: OrderProps) {
<<<<<<< HEAD
    super(props.id);
=======
    super(props.id, props.createdAt, props.updatedAt);
>>>>>>> 4fada72 (feat: add back old data)
    this._client = props.client;
    this._products = props.products;
    this._status = props.status || "pending";
  }

  approved(): void {
    this._status = "approved";
  }

  get client(): Client {
    return this._client;
  }

  get products(): Product[] {
    return this._products;
  }

  get status(): string {
    return this._status;
  }

  get total(): number {
<<<<<<< HEAD
    return this._products.reduce((acc, product) => acc + product.salesPrice, 0);
=======
    return this._products.reduce(
      (acc, product) => acc + product.quantity * product.salesPrice,
      0
    );
>>>>>>> 4fada72 (feat: add back old data)
  }
}

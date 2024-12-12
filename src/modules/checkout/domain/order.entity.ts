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
<<<<<<< HEAD
=======
  createdAt?: Date;
  updatedAt?: Date;
>>>>>>> 4fada72 (feat: add back old data)
=======
  createdAt?: Date;
  updatedAt?: Date;
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
};

export default class Order extends BaseEntity {
  private _client: Client;
  private _products: Product[];
  private _status: string;

  constructor(props: OrderProps) {
<<<<<<< HEAD
<<<<<<< HEAD
    super(props.id);
=======
    super(props.id, props.createdAt, props.updatedAt);
>>>>>>> 4fada72 (feat: add back old data)
=======
    super(props.id, props.createdAt, props.updatedAt);
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
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
<<<<<<< HEAD
    return this._products.reduce((acc, product) => acc + product.salesPrice, 0);
=======
=======
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
    return this._products.reduce(
      (acc, product) => acc + product.quantity * product.salesPrice,
      0
    );
<<<<<<< HEAD
>>>>>>> 4fada72 (feat: add back old data)
=======
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
  }
}

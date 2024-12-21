import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

export type OrderItemProps = {
  id?: Id;
  productId: string;
  price: number;
  quantity: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class OrderItem extends BaseEntity {
  private _productId: string;
  private _price: number;
  private _quantity: number;

  constructor(props: OrderItemProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._productId = props.productId;
    this._price = props.price;
    this._quantity = props.quantity;
    this.validate();
  }

  get productId(): string {
    return this._productId;
  }

  get price(): number {
    return this._price;
  }

  get quantity(): number {
    return this._quantity;
  }

  get total(): number {
    return this._price * this._quantity;
  }

  validate(): void {
    if (this._price <= 0) {
      throw new Error("Price must be greater than 0");
    }
    if (this._quantity <= 0) {
      throw new Error("Quantity must be greater than 0");
    }
  }
}

import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type InvoiceItemProps = {
  id?: Id;
  invoiceId: Id;
  name: string;
  price: number;
  createdAt?: Date;
  updatedAt?: Date;
};

export default class InvoiceItem extends BaseEntity implements AggregateRoot {
  private _invoiceId: Id;
  private _name: string;
  private _price: number;

  constructor(props: InvoiceItemProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this._invoiceId = props.invoiceId;
    this._name = props.name;
    this._price = props.price;
    this.validate();
  }

  validate(): void {
    if (this._name.length === 0) {
      throw new Error("Name is required");
    }
    if (this._price <= 0) {
      throw new Error("Price must be greater than 0");
    }
  }

  get invoiceId(): Id {
    return this._invoiceId;
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }
}

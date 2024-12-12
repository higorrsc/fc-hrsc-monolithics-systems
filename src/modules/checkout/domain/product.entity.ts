import AggregateRoot from "../../@shared/domain/entity/aggregate-root.interface";
import BaseEntity from "../../@shared/domain/entity/base.entity";
import Id from "../../@shared/domain/value-object/id.value-object";

type ProductProps = {
  id?: Id;
  name: string;
  description: string;
<<<<<<< HEAD
=======
  quantity: number;
>>>>>>> 4fada72 (feat: add back old data)
  salesPrice: number;
};

export default class Product extends BaseEntity implements AggregateRoot {
  private _name: string;
  private _description: string;
<<<<<<< HEAD
=======
  private _quantity: number;
>>>>>>> 4fada72 (feat: add back old data)
  private _salesPrice: number;

  constructor(props: ProductProps) {
    super(props.id);
    this._name = props.name;
    this._description = props.description;
<<<<<<< HEAD
=======
    this._quantity = props.quantity;
>>>>>>> 4fada72 (feat: add back old data)
    this._salesPrice = props.salesPrice;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

<<<<<<< HEAD
=======
  get quantity(): number {
    return this._quantity;
  }

>>>>>>> 4fada72 (feat: add back old data)
  get salesPrice(): number {
    return this._salesPrice;
  }
}

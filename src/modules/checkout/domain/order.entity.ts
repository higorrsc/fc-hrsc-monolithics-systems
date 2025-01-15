import BaseEntity from '../../@shared/domain/entity/base.entity'
import Id from '../../@shared/domain/value-object/id.value-object'
import Client from './client.entity'
import OrderItem from './order-item.entity'

type OrderProps = {
  id?: Id
  client: Client
  items: OrderItem[]
  status?: string
  createdAt?: Date
  updatedAt?: Date
}

export default class Order extends BaseEntity {
  private _client: Client
  private _items: OrderItem[]
  private _status: string

  constructor(props: OrderProps) {
    super(props.id, props.createdAt, props.updatedAt)
    this._client = props.client
    this._items = props.items
    this._status = props.status || 'pending'
  }

  approved(): void {
    this._status = 'approved'
  }

  get client(): Client {
    return this._client
  }

  get items(): OrderItem[] {
    return this._items
  }

  get status(): string {
    return this._status
  }

  get total(): number {
    return this._items && this._items.length > 0
      ? this._items.reduce((acc, item) => acc + item.quantity * item.price, 0)
      : 0
  }
}

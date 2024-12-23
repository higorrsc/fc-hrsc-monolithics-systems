import Id from '../../@shared/domain/value-object/id.value-object'
import { ClientModel } from '../../client-adm/repository/client.model'
import { ProductModel } from '../../store-catalog/repository/product.model'
import Client from '../domain/client.entity'
import OrderItem from '../domain/order-item.entity'
import Order from '../domain/order.entity'
import CheckoutGateway from '../gateway/checkout.gateway'
import { OrderItemModel } from './order-item.model'
import { OrderModel } from './order.model'

export class OrderRepository implements CheckoutGateway {
  async add(order: Order): Promise<void> {
    try {
      const totalItems = order.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      )

      await OrderModel.create({
        id: order.id.id,
        clientId: order.client.id.id,
        status: order.status,
        createdAt: new Date(),
        updatedAt: new Date(),
        total: totalItems,
      })

      order.items.map(async (item) => {
        await OrderItemModel.create({
          id: new Id().id,
          orderId: order.id.id,
          productId: item.id.id,
          quantity: item.quantity,
          price: item.price,
          total: item.quantity * item.price,
          createdAt: new Date(),
          updatedAt: new Date(),
        })
      })
    } catch (error) {
      console.log('Erro ao adicionar dados da ordem:', error)
    }
  }
  async find(id: string): Promise<Order | null> {
    const order = await OrderModel.findOne({ where: { id } })
    if (!order) {
      throw new Error(`Product with id ${id} not found`)
    }
    const client = await ClientModel.findOne({ where: { id: order.clientId } })
    const orderItems = await OrderItemModel.findAll({ where: { orderId: id } })
    const products = await ProductModel.findAll({
      where: { id: orderItems.map((item) => item.productId) },
    })
    const orderItemsData = orderItems.map((item) => {
      const product = products.find((p) => p.id === item.productId)
      if (!product) {
        throw new Error(`Product with id ${item.productId} not found`)
      }
      return {
        id: item.id,
        productId: product.id,
        name: product.name,
        description: product.description,
        price: item.price,
        quantity: item.quantity,
      }
    })

    return new Order({
      id: new Id(order.id),
      client: new Client({
        id: new Id(client.id),
        name: client.name,
        email: client.email,
        document: client.document,
        street: client.street,
        number: client.number,
        complement: client.complement,
        city: client.city,
        state: client.state,
        zipCode: client.zipCode,
      }),
      items: orderItemsData.map((item) => {
        return new OrderItem({
          productId: item.productId,
          price: item.price,
          quantity: item.quantity,
        })
      }),
      status: order.status,
    })
  }
}

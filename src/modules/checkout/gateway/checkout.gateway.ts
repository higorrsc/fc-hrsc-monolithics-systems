import Order from "../domain/order.entity";

export default interface CheckoutGateway {
<<<<<<< HEAD
<<<<<<< HEAD
  addOrder(order: Order): Promise<void>;
  findOrder(id: string): Promise<Order | null>;
=======
  add(order: Order): Promise<void>;
  find(id: string): Promise<Order | null>;
>>>>>>> 4fada72 (feat: add back old data)
=======
  add(order: Order): Promise<void>;
  find(id: string): Promise<Order | null>;
>>>>>>> 84f55c57fd4281882faca8cd25a5c391224c1a12
}

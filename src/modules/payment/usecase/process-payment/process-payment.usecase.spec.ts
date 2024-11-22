import Id from "../../../@shared/domain/value-object/id.value-object";
import Transaction from "../../domain/transaction.entity";
import ProcessPaymentUseCase from "./process-payment.usecase";

const transaction = new Transaction({
  id: new Id("1"),
  orderId: "1",
  amount: 100,
});

const MockRepository = () => {
  return {
    save: jest.fn().mockReturnValue(Promise.resolve(transaction)),
  };
};

describe("ProcessPaymentUseCase unit test", () => {
  it("should approve a transaction", async () => {
    const paymentRepository = MockRepository();
    const usecase = new ProcessPaymentUseCase(paymentRepository);
    const input = {
      orderId: "1",
      amount: 100,
    };
    const result = await usecase.execute(input);
    expect(paymentRepository.save).toHaveBeenCalled();
    expect(result.transactionId).toBe("1");
    expect(result.orderId).toBe("1");
    expect(result.amount).toBe(100);
    expect(result.status).toBe("approved");
    expect(result.createdAt).toBe(transaction.createdAt);
    expect(result.updatedAt).toBe(transaction.updatedAt);
  });
});

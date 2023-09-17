const TransactionService = require('../../transaction/transaction.service');

describe('Transaction unit tests', () => {
  it('should set status to paid', async () => {
    const status = await TransactionService.setStatus('debit_card');
    expect(status).toStrictEqual('paid');
  });
  it('should set status to waiting_funds', async () => {
    const status = await TransactionService.setStatus('credit_card');
    expect(status).toStrictEqual('waiting_funds');
  });
  it('should set paymentDate to plus 30 days', async () => {
    const current = new Date();
    current.setDate(current.getDate() + 30);
    const paymentDate = await TransactionService.setPaymentDate('credit_card');
    expect(paymentDate.toLocaleString().split(' ')[0]).toStrictEqual(current.toLocaleString().split(' ')[0]);
  });
  it('should set paymentDate to current', async () => {
    const current = new Date();
    const paymentDate = await TransactionService.setPaymentDate('debit_card');
    expect(paymentDate).toStrictEqual(current);
  });
  it('should discount fee of 3%', async () => {
    let amount = await TransactionService.calculateFee('debit_card', 10);
    expect(amount).toStrictEqual(9.7);
    amount = await TransactionService.calculateFee('debit_card', 100);
    expect(amount).toStrictEqual(97);
    amount = await TransactionService.calculateFee('debit_card', 1000);
    expect(amount).toStrictEqual(970);
    amount = await TransactionService.calculateFee('debit_card', 10000);
    expect(amount).toStrictEqual(9700);
  });
  it('should discount fee of 5%', async () => {
    let amount = await TransactionService.calculateFee('credit_card', 10);
    expect(amount).toStrictEqual(9.5);
    amount = await TransactionService.calculateFee('credit_card', 100);
    expect(amount).toStrictEqual(95);
    amount = await TransactionService.calculateFee('credit_card', 1000);
    expect(amount).toStrictEqual(950);
    amount = await TransactionService.calculateFee('credit_card', 10000);
    expect(amount).toStrictEqual(9500);
  });
  it('should set availability to waiting_funds', async () => {
    const availability = await TransactionService.setAvailability('credit_card');
    expect(availability).toStrictEqual('waiting_funds');
  });
  it('should set availability to available', async () => {
    const availability = await TransactionService.setAvailability('debit_card');
    expect(availability).toStrictEqual('available');
  });
});

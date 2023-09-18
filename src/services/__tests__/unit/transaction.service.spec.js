const CardEnum = require('../../../utils/card.enum');
const TransactionService = require('../../transaction/transaction.service');

describe('TransactionService unit tests', () => {
  it('should set status to paid', () => {
    const status = TransactionService.setStatus(CardEnum.DEBIT);
    expect(status).toStrictEqual('paid');
  });
  it('should set status to waiting_funds', () => {
    const status = TransactionService.setStatus(CardEnum.CREDIT);
    expect(status).toStrictEqual('waiting_funds');
  });
  it('should set paymentDate to plus 30 days', () => {
    const current = new Date();
    current.setDate(current.getDate() + 30);
    const paymentDate = TransactionService.setPaymentDate(CardEnum.CREDIT);
    expect(paymentDate.toLocaleString().split(' ')[0]).toStrictEqual(current.toLocaleString().split(' ')[0]);
  });
  it('should set paymentDate to current', () => {
    const current = new Date();
    const paymentDate = TransactionService.setPaymentDate(CardEnum.DEBIT);
    expect(paymentDate).toStrictEqual(current);
  });
  it('should discount fee of 3%', () => {
    let amount = TransactionService.calculateFee(CardEnum.DEBIT, 10);
    expect(amount).toStrictEqual(9.7);
    amount = TransactionService.calculateFee(CardEnum.DEBIT, 100);
    expect(amount).toStrictEqual(97);
    amount = TransactionService.calculateFee(CardEnum.DEBIT, 1000);
    expect(amount).toStrictEqual(970);
    amount = TransactionService.calculateFee(CardEnum.DEBIT, 10000);
    expect(amount).toStrictEqual(9700);
  });
  it('should discount fee of 5%', () => {
    let amount = TransactionService.calculateFee(CardEnum.CREDIT, 10);
    expect(amount).toStrictEqual(9.5);
    amount = TransactionService.calculateFee(CardEnum.CREDIT, 100);
    expect(amount).toStrictEqual(95);
    amount = TransactionService.calculateFee(CardEnum.CREDIT, 1000);
    expect(amount).toStrictEqual(950);
    amount = TransactionService.calculateFee(CardEnum.CREDIT, 10000);
    expect(amount).toStrictEqual(9500);
  });
  it('should set availability to waiting_funds', () => {
    const availability = TransactionService.setAvailability(CardEnum.CREDIT);
    expect(availability).toStrictEqual('waiting_funds');
  });
  it('should set availability to available', () => {
    const availability = TransactionService.setAvailability(CardEnum.DEBIT);
    expect(availability).toStrictEqual('available');
  });
});

const TransactionRepository = require('../../repositories/transaction/transaction.repository');
const TransactionEntity = require('../../entities/transaction.entity');
const PayableEntity = require('../../entities/payable.entity');
const PayableService = require('../../services/payable/payable.service');
const BaseError = require('../../errors/base-error');

const _transactionRepository = TransactionRepository;
const _payableService = PayableService;
class TransactionService {
  async create(payload) {
    const { price, payment_method } = payload;
    try {
      const transactionEntity = TransactionEntity.transactionEntityFactory(payload);

      const transaction = await _transactionRepository.create(transactionEntity);

      if (transaction) {
        const payableEntity = PayableEntity.payableEntityFactory({
          transaction_id: transaction.id,
          amount: this.calculateFee(payment_method, price),
          payment_date: this.setPaymentDate(payment_method),
          status: this.setStatus(payment_method),
          availability: this.setAvailability(payment_method),
        });

        const payable = await _payableService.create(payableEntity);

        if (payable) return transaction;
      }
    } catch (err) {
      throw new BaseError(`Houve um problema - ${err.message}`, 422);
    }
  }
  async getAll() {
    try {
      return await _transactionRepository.getAll();
    } catch (err) {
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }

  setStatus(paymentmethod) {
    return paymentmethod === 'debit_card' ? 'paid' : 'waiting_funds';
  }
  setPaymentDate(paymentmethod) {
    const paymentDate = new Date();
    const days = 30;
    paymentDate.setDate(paymentDate.getDate() + days);
    return paymentmethod === 'debit_card' ? new Date() : paymentDate;
  }
  calculateFee(paymentmethod, transactionPrice) {
    if (paymentmethod === 'debit_card') return parseFloat(transactionPrice) - parseFloat(transactionPrice) * 0.03;
    else return parseFloat(transactionPrice) - parseFloat(transactionPrice) * 0.05;
  }
  setAvailability(paymentmethod) {
    return paymentmethod === 'debit_card' ? 'available' : 'waiting_funds';
  }
}

module.exports = new TransactionService();

const TransactionRepository = require('../../repositories/transaction/transaction.repository');
const { TransactionEntity } = require('../../entities/transaction.entity');
const { PayableEntity } = require('../../entities/payable.entity');
const PayableService = require('../../services/payable/payable.service');
const { DatabaseError, DatabaseUnknowError } = require('../../errors/database-error');
const { BadRequestError } = require('../../errors/bad-request-error');
const CardEnum = require('../../utils/card.enum');
const _transactionRepository = TransactionRepository;
const _payableService = PayableService;
const Logger = require('../../logger/logger');
class TransactionService {
  async create(payload) {
    Logger.log('TransactionService [CREATE]', payload);
    const { price, payment_method } = payload;
    try {
      const transaction = await _transactionRepository.create(TransactionEntity.createEntity(payload));

      const payableEntity = PayableEntity.createEntity({
        transaction_id: transaction.id,
        amount: this.calculateFee(payment_method, price),
        payment_date: this.setPaymentDate(payment_method),
        status: this.setStatus(payment_method),
        availability: this.setAvailability(payment_method),
      });

      await _payableService.create(payableEntity);

      return transaction;
    } catch (err) {
      this.handleError(err);
    }
  }
  async getAll() {
    Logger.log('TransactionService [GETALL]');
    try {
      return await _transactionRepository.getAll();
    } catch (err) {
      this.handleError(err);
    }
  }

  setStatus(paymentmethod) {
    return paymentmethod === CardEnum.DEBIT ? 'paid' : 'waiting_funds';
  }
  setPaymentDate(paymentmethod) {
    const paymentDate = new Date();
    const days = 30;
    paymentDate.setDate(paymentDate.getDate() + days);
    return paymentmethod === CardEnum.DEBIT ? new Date() : paymentDate;
  }
  calculateFee(paymentmethod, transactionPrice) {
    if (paymentmethod === CardEnum.DEBIT) return parseFloat(transactionPrice) - parseFloat(transactionPrice) * 0.03;
    else return parseFloat(transactionPrice) - parseFloat(transactionPrice) * 0.05;
  }
  setAvailability(paymentmethod) {
    return paymentmethod === CardEnum.DEBIT ? 'available' : 'waiting_funds';
  }
  handleError(err) {
    if (err instanceof DatabaseError) {
      throw new DatabaseError(err.message, err.cause);
    }
    if (err instanceof DatabaseUnknowError) {
      throw new DatabaseUnknowError(`Houve um problema`, err.cause);
    }
    throw new BadRequestError(`Houve um problema`, err.cause);
  }
}

module.exports = new TransactionService();

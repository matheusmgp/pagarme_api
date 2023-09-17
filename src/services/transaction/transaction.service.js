const TransactionRepository = require('../../repositories/transaction/transaction.repository');
const { TransactionEntity } = require('../../entities/transaction.entity');
const { PayableEntity } = require('../../entities/payable.entity');
const PayableService = require('../../services/payable/payable.service');
const BaseError = require('../../errors/base-error');
const { PrismaClientInitializationError, PrismaClientKnownRequestError } = require('@prisma/client/runtime/library');
const DatabaseError = require('../../errors/database-error');

const _transactionRepository = TransactionRepository;
const _payableService = PayableService;
class TransactionService {
  async create(payload) {
    const { price, payment_method } = payload;
    try {
      const transaction = await _transactionRepository.create(TransactionEntity.createEntity(payload));

      if (transaction) {
        const payableEntity = PayableEntity.createEntity({
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
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server,Server has closed the connection.`, 500);
      }
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }
  async getAll() {
    try {
      return await _transactionRepository.getAll();
    } catch (err) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server,Server has closed the connection.`, 500);
      }
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

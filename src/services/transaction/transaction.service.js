const TransactionRepository = require('../../repositories/transaction.repository');

const _transactionRepository = TransactionRepository;
class TransactionService {
  async create(payload) {
    return _transactionRepository.create(payload);
  }
  async getAll() {
    return await _transactionRepository.getAll();
  }
}

module.exports = new TransactionService();

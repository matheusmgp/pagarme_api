const TransactionService = require('../../services/transaction/transaction.service');

const _transactionService = TransactionService;
class TransactionController {
  async getAll() {
    return await _transactionService.getAll();
  }
  async create(body) {
    return await _transactionService.create(body);
  }
}

module.exports = new TransactionController();

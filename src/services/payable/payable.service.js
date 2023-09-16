const PayableRepository = require('../../repositories/payable.repository');

const _payableRepository = PayableRepository;
class PayableService {
  async create(payload) {
    return _payableRepository.create(payload);
  }
  async getAll() {
    return await _payableRepository.getAll();
  }
}

module.exports = new PayableService();

const BaseError = require('../../errors/base-error');
const PayableRepository = require('../../repositories/payable/payable.repository');

const _payableRepository = PayableRepository;
class PayableService {
  async create(payload) {
    try {
      return _payableRepository.create(payload);
    } catch (err) {
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }
  async getAll() {
    try {
      return await _payableRepository.getAll();
    } catch (err) {
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }
}

module.exports = new PayableService();

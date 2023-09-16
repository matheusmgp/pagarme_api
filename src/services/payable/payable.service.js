const BaseError = require('../../errors/base-error');
const PayableRepository = require('../../repositories/payable/payable.repository');
const PayableStatusEnum = require('../../utils/payable-status.enum');
const _payableRepository = PayableRepository;
class PayableService {
  async create(payload) {
    try {
      return await _payableRepository.create(payload);
    } catch (err) {
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }
  async getAll() {
    try {
      return {
        available: this.reduce(await _payableRepository.getAll(PayableStatusEnum.AVAILABLE)),
        waiting_funds: this.reduce(await _payableRepository.getAll(PayableStatusEnum.WAITING_FUNDS)),
      };
    } catch (err) {
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }
  async getAllInfo() {
    try {
      return await _payableRepository.getAllInfo();
    } catch (err) {
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }

  reduce(array) {
    return array.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
  }
}

module.exports = new PayableService();

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
      const availables = await _payableRepository.getAll(PayableStatusEnum.AVAILABLE);
      const waiting = await _payableRepository.getAll(PayableStatusEnum.WAITING_FUNDS);
      console.log(availables);
      const totalAvailables = availables.reduce((accumulator, object) => {
        return accumulator + object.amount;
      }, 0);

      const totalWaiting = waiting.reduce((accumulator, object) => {
        return accumulator + object.amount;
      }, 0);

      return { available: totalAvailables, waiting_funds: totalWaiting };
    } catch (err) {
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }
}

module.exports = new PayableService();

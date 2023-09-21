const { DatabaseError, DatabaseUnknowError } = require('../../errors/database-error');
const PayableRepository = require('../../repositories/payable/payable.repository');
const PayableStatusEnum = require('../../utils/payable-status.enum');
const _payableRepository = PayableRepository;
const Logger = require('../../logger/logger');
const { BadRequestError } = require('../../errors/bad-request-error');
class PayableService {
  async create(payload) {
    Logger.log('PayableService [CREATE]', payload);
    try {
      return await _payableRepository.create(payload);
    } catch (err) {
      this.handleError(err);
    }
  }
  async getAll() {
    Logger.log('PayableService [GETALL]');
    try {
      return {
        available: this.reduce(await _payableRepository.getAll(PayableStatusEnum.AVAILABLE)),
        waiting_funds: this.reduce(await _payableRepository.getAll(PayableStatusEnum.WAITING_FUNDS)),
      };
    } catch (err) {
      this.handleError(err);
    }
  }
  async getAllInfo() {
    Logger.log('PayableService [GETALLINFO]');
    try {
      return await _payableRepository.getAllInfo();
    } catch (err) {
      this.handleError(err);
    }
  }

  reduce(array) {
    return array.reduce((accumulator, object) => {
      return accumulator + object.amount;
    }, 0);
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

module.exports = new PayableService();

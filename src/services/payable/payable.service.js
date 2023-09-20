const BaseError = require('../../errors/base-error');
const DatabaseError = require('../../errors/database-error');
const PayableRepository = require('../../repositories/payable/payable.repository');
const PayableStatusEnum = require('../../utils/payable-status.enum');
const { PrismaClientInitializationError, PrismaClientKnownRequestError } = require('@prisma/client');
const _payableRepository = PayableRepository;
const Logger = require('../../logger/logger');
class PayableService {
  async create(payload) {
    Logger.log('PayableService [CREATE]', payload);
    try {
      return await _payableRepository.create(payload);
    } catch (err) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server,Server has closed the connection.`);
      }
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
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
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server,Server has closed the connection.`);
      }
      throw new BaseError(`Houve um problema - ${err.message}`, 500);
    }
  }
  async getAllInfo() {
    Logger.log('PayableService [GETALLINFO]');
    try {
      return await _payableRepository.getAllInfo();
    } catch (err) {
      if (err instanceof PrismaClientInitializationError || err instanceof PrismaClientKnownRequestError) {
        throw new DatabaseError(`Can't reach database server,Server has closed the connection.`);
      }
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

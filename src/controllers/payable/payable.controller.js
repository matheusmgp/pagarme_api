const BaseError = require('../../errors/base-error');
const NotFoundError = require('../../errors/not-found-error');
const PayableService = require('../../services/payable/payable.service');

const _payableService = PayableService;
class PayableController {
  async getAll() {
    return await _payableService.getAll();
  }
  async create(body) {
    return await _payableService.create(body);
  }
}

module.exports = new PayableController();

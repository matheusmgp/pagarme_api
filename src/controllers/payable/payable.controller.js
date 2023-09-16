const PayableService = require('../../services/payable/payable.service');

const _payableService = PayableService;
class PayableController {
  async getAll() {
    return await _payableService.getAll();
  }
  async getAllInfo() {
    return await _payableService.getAllInfo();
  }
}

module.exports = new PayableController();

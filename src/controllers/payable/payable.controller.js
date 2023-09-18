const BaseError = require('../../errors/base-error');
const httpStatusCodes = require('../../errors/status-code/http-status-code');
const { responseHttpSuccess, responseHttpException } = require('../../presenters/httpResponse');
const PayableService = require('../../services/payable/payable.service');

const _payableService = PayableService;
class PayableController {
  async getAll(req, res) {
    try {
      responseHttpSuccess(await _payableService.getAll(), res, req);
    } catch (err) {
      if (err instanceof BaseError) {
        responseHttpException(err.message, req.method, res, err.statusCode);
      } else {
        responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
      }
    }
  }
  async getAllInfo(req, res) {
    try {
      responseHttpSuccess(await _payableService.getAllInfo(), res, req);
    } catch (err) {
      if (err instanceof BaseError) {
        responseHttpException(err.message, req.method, res, err.statusCode);
      } else {
        responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
      }
    }
  }
}

module.exports = new PayableController();

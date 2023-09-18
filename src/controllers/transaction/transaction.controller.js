const BaseError = require('../../errors/base-error');
const httpStatusCodes = require('../../errors/status-code/http-status-code');
const { responseHttpException, responseHttpSuccess } = require('../../presenters/httpResponse');
const TransactionService = require('../../services/transaction/transaction.service');

const _transactionService = TransactionService;
class TransactionController {
  async getAll(req, res) {
    try {
      responseHttpSuccess(await _transactionService.getAll(), res, req);
    } catch (err) {
      if (err instanceof BaseError) {
        responseHttpException(err.message, req.method, res, err.statusCode);
      } else {
        responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
      }
    }
  }
  async create(req, res) {
    try {
      responseHttpSuccess(await _transactionService.create(req.body), res, req);
    } catch (err) {
      if (err instanceof BaseError) {
        responseHttpException(err.message, req.method, res, err.statusCode);
      } else {
        responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
      }
    }
  }
}

module.exports = new TransactionController();

const { Router } = require('express');
const BaseError = require('../errors/base-error');
const httpStatusCodes = require('../errors/status-code/http-status-code');
const TransactionController = require('../controllers/transaction/transaction.controller');
const { responseHttpSuccess, responseHttpException } = require('../presenters/httpResponse');
const createTransactionSchema = require('../validators/create-transaction.validator');

const routeTransaction = Router();
const _controller = TransactionController;

routeTransaction.get('/api/v1/dev/transaction', async (req, res) => {
  try {
    responseHttpSuccess(await _controller.getAll(), res);
  } catch (err) {
    if (err instanceof BaseError) {
      responseHttpException(err.message, req.method, res, err.statusCode);
    } else {
      responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
    }
  }
});

routeTransaction.post('/api/v1/dev/transaction', createTransactionSchema, async (req, res) => {
  try {
    responseHttpSuccess(await _controller.create(req.body), res);
  } catch (err) {
    if (err instanceof BaseError) {
      responseHttpException(err.message, req.method, res, err.statusCode);
    } else {
      responseHttpException(err.message, req.method, res, httpStatusCodes.INTERNAL_SERVER);
    }
  }
});
module.exports = routeTransaction;

const { Router } = require('express');
const BaseError = require('../errors/base-error');
const httpStatusCodes = require('../errors/status-codes/http-status-codes');
const PayableController = require('../controllers/payable/payable.controller');
const { responseHttpSuccess, responseHttpException } = require('../presenters/httpResponse');

const routePayable = Router();
const _controller = PayableController;

routePayable.get('/api/v1/dev/payable', async (req, res) => {
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
module.exports = { routePayable };

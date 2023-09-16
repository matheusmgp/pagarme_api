const { responseHttpException } = require('../presenters/httpResponse');
const httpStatusCodes = require('../errors/status-code/http-status-code');
const transactionSchema = require('./schemas/transaction.schema');
const createTransactionSchema = (req, res, next) => {
  const schema = transactionSchema;
  const options = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };

  const { error, value } = schema.validate(req.body, options);

  if (error) {
    responseHttpException(
      error.details.map((x) => x.message.replace('"', '').replace('"', '')),
      req.method,
      res,
      httpStatusCodes.UNPROCESSABLE_ENTITY
    );
  } else {
    req.body = value;
    next();
  }
};
module.exports = createTransactionSchema;

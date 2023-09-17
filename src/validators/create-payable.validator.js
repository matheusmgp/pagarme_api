const { responseHttpException } = require('../presenters/httpResponse');
const httpStatusCodes = require('../errors/status-code/http-status-code');
const payableSchema = require('./schemas/payable.schema');
const createPayableSchema = (req, res, next) => {
  const schema = payableSchema;

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

module.exports = createPayableSchema;

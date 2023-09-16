const Joi = require('joi');
const { responseHttpException } = require('../presenters/httpResponse');
const httpStatusCodes = require('../errors/status-codes/http-status-codes');
const createPayableSchema = (req, res, next) => {
  const schema = Joi.object({
    transaction_id: Joi.number().required(),
    fee: Joi.number().required(),
    status: Joi.string().required(),
    availability: Joi.string().required(),
    payment_date: Joi.date().required(),
  });

  const options = {
    abortEarly: false, // include all errors
    allowUnknown: true, // ignore unknown props
    stripUnknown: true, // remove unknown props
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

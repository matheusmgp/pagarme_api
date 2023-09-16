const Joi = require('joi');
const { responseHttpException } = require('../presenters/httpResponse');
const httpStatusCodes = require('../errors/status-codes/http-status-codes');

const createTransactionSchema = (req, res, next) => {
  const schema = Joi.object({
    price: Joi.number().required(),
    description: Joi.string().required(),
    payment_method: Joi.string().valid('debit_card', 'credit_card').required(),
    card_number: Joi.string().required(),
    owner_name: Joi.string().required(),
    card_expires_date: Joi.date().required(),
    cvv: Joi.number().required(),
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
module.exports = createTransactionSchema;

const Joi = require('joi');

const transactionSchema = Joi.object({
  price: Joi.number().required(),
  description: Joi.string().max(30).required(),
  payment_method: Joi.string().valid('debit_card', 'credit_card').required(),
  card_number: Joi.string().max(45).required(),
  owner_name: Joi.string().max(45).required(),
  card_expires_date: Joi.date().required(),
  cvv: Joi.number().required(),
});

module.exports = transactionSchema;

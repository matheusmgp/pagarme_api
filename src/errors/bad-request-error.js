const httpStatusCodes = require('./status-code/http-status-code');
const BaseError = require('./base-error');

class BadRequestError extends BaseError {
  constructor(message, statusCode = httpStatusCodes.BAD_REQUEST) {
    super(message, statusCode);
  }
}

module.exports = { BadRequestError };

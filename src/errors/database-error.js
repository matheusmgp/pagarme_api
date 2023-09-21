const httpStatusCodes = require('./status-code/http-status-code');
const BaseError = require('./base-error');

class DatabaseError extends BaseError {
  constructor(message, statusCode = httpStatusCodes.INTERNAL_SERVER) {
    super(message, statusCode);
  }
}
class DatabaseUnknowError extends BaseError {
  constructor(message, statusCode = httpStatusCodes.INTERNAL_SERVER) {
    super(message, statusCode);
  }
}

module.exports = { DatabaseError, DatabaseUnknowError };

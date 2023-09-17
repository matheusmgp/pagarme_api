const httpStatusCodes = require('./status-code/http-status-code');
const BaseError = require('./base-error');

class DatabaseError extends BaseError {
  constructor(message, statusCode = httpStatusCodes.NOT_FOUND) {
    super(message, statusCode);
  }
}

module.exports = DatabaseError;

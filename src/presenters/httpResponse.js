module.exports = {
  responseHttpSuccess(data, response) {
    response.status(200).json(data);
  },
  responseHttpException(error, method, res, code) {
    res.status(code).send(new HttpExceptionResponse(code, error, method));
  },
};

class HttpExceptionResponse {
  constructor(statusCode, error, method) {
    this.message = error;
    this.method = method;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
  statusCode;
  message;
  timestamp;
  method;
}

const responseHttpSuccess = (data, res, req) => {
  res.status(res.statusCode).json(new HttpResponse(res.statusCode, data, req.method));
};
const responseHttpException = (error, method, res, statusCode) => {
  res.status(statusCode).send(new HttpExceptionResponse(statusCode, error, method));
};

module.exports = { responseHttpSuccess, responseHttpException };
class HttpResponse {
  constructor(statusCode, data, method) {
    this.data = data;
    this.method = method;
    this.statusCode = statusCode;
    this.timestamp = new Date().toISOString();
  }
  statusCode;
  data;
  timestamp;
  method;
}
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

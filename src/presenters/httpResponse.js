const responseHttpSuccess = (data, res, req) => {
  res.status(res.statusCode).json(new HttpResponse(res.statusCode, data, req.method).toJSON());
};
const responseHttpException = (error, method, res, statusCode) => {
  res.status(statusCode).send(new HttpExceptionResponse(statusCode, error, method).toJSON());
};

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
  toJSON() {
    return {
      statusCode: this.statusCode,
      data: this.data,
      timestamp: this.timestamp,
      method: this.method,
    };
  }
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
  toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      timestamp: this.timestamp,
      method: this.method,
    };
  }
}
module.exports = { responseHttpSuccess, responseHttpException, HttpResponse, HttpExceptionResponse };

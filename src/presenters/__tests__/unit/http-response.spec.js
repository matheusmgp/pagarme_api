const { HttpResponse, HttpExceptionResponse } = require('../../httpResponse');

describe('Presenter unit tests', () => {
  it('HttpResponse class', () => {
    const httpResponse = new HttpResponse(200, { data: 'random' }, 'GET');
    expect(httpResponse).toBeInstanceOf(HttpResponse);
    expect(httpResponse.data).toEqual({ data: 'random' });
    expect(httpResponse.method).toEqual('GET');
    expect(httpResponse.statusCode).toEqual(200);
    expect(httpResponse.timestamp).not.toBeNull();
    expect(httpResponse.toJSON()).toEqual({
      data: { data: 'random' },
      method: 'GET',
      statusCode: 200,
      timestamp: expect.any(String),
    });
  });
  it('HttpExceptionResponse class', () => {
    const httpExceptionResponse = new HttpExceptionResponse(200, { data: 'error' }, 'GET');
    expect(httpExceptionResponse).toBeInstanceOf(HttpExceptionResponse);
    expect(httpExceptionResponse.message).toEqual({ data: 'error' });
    expect(httpExceptionResponse.method).toEqual('GET');
    expect(httpExceptionResponse.statusCode).toEqual(200);
    expect(httpExceptionResponse.timestamp).not.toBeNull();
    expect(httpExceptionResponse.toJSON()).toEqual({
      message: { data: 'error' },
      method: 'GET',
      statusCode: 200,
      timestamp: expect.any(String),
    });
  });
});

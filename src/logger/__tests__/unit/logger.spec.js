const Logger = require('../../logger');
describe('Logger unit tests', () => {
  it('should set config', () => {
    Logger.setConfig({
      appName: 'pagarME App',
    });
    expect(Logger.config).toStrictEqual({ appName: 'pagarME App' });
  });
  it('should set appName', () => {
    Logger.setConfig({
      appName: 'pagarME App',
    });
    expect(Logger.config.appName).toStrictEqual('pagarME App');
  });
});

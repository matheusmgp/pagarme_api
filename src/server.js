const app = require('./index');
const PORT = process.env.PORT || 3000;
const Logger = require('./logger/logger');
Logger.setConfig({
  appName: 'pagarME App',
});

app.listen(PORT, () => Logger.log(`is running`, { port: PORT }));

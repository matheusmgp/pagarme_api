class Logger {
  constructor() {
    this.config = {
      appName: 'Not Configured',
    };
  }
  setConfig(config) {
    this.config = config;
  }

  log(message, ...params) {
    console.log(this.config.appName, message, params);
  }
}

module.exports = new Logger();

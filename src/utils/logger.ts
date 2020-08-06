enum LogType {
  ERROR,
  INFO,
  LOG,
  WARN,
}

class Logger {
  static ERROR = LogType.ERROR;
  static LOG = LogType.LOG;
  static INFO = LogType.INFO;
  static WARN = LogType.WARN;
  private isProduction: boolean;

  constructor(isProduction) {
    this.isProduction = isProduction;
  }

  Log(...consoleArgs: any[]) {
    if (this.isProduction) return;
    console.log(...consoleArgs);
  }

  Error(...consoleArgs: any[]) {
    if (this.isProduction) return;
    console.error(...consoleArgs);
  }

  Info(...consoleArgs: any[]) {
    if (this.isProduction) return;
    console.info(...consoleArgs);
  }

  Warn(...consoleArgs: any[]) {
    if (this.isProduction) return;
    console.warn(...consoleArgs);
  }
}

export default new Logger(false);

import { format, createLogger, transports } from "winston";

class Logger {
  public env: string | undefined;
  constructor() {
    this.env = process.env.NODE_ENV;
  };
  
  public log() {
    if (process.env.NODE_ENV === 'development') {
      const logFormat = format.printf(({level, message, timestamp, stack}) => {
        return `${timestamp} ${level}: ${stack || message}`;
      });
    
      return createLogger({
        format: format.combine(
          format.colorize(),
          format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
          format.errors({ stack: true }),
          logFormat
        ),
        transports: [new transports.Console()],
      });
    } else {
      return createLogger({
        format: format.combine(format.timestamp(), format.errors({ stack: true }), format.json()),
        defaultMeta: { service: 'user-service' },
        transports: [new transports.Console()],
      });
    }
  }
}

export default new Logger().log();
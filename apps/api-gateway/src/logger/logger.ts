import { utilities as nestWinstonModuleUtilities } from 'nest-winston';
import winston from 'winston';

export const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.ms(),
    nestWinstonModuleUtilities.format.nestLike(
      'API-GATEWAY',
      { prettyPrint: true }
    ),
  ),
  transports: [
    new winston.transports.Console(),
  ],
});

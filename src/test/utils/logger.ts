import { Logger, transports, format } from 'winston';

export const loggerFixture = {
  logger: undefined as Logger
};

export function options(scenarioName: string) {
  return {
    transports: [
      new transports.File({
        filename: `test-result/logs/${scenarioName}/log.log`,
        level: 'info',
        format: format.combine(
          format.timestamp({ format: 'MMM-DD-YYYY HH:mm:ss' }),
          format.align(),
          format.printf(
            (info) => `${info.level}: ${[info.timestamp]}: ${info.message}`
          )
        ),
      }),
    ],
  };
}


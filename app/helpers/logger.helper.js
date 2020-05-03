import winston from 'winston';

const todayDate = new Date().toISOString().slice(0, 10);
let loggerOptions = {
    level: 'info',
    filename: 'logs/logs-' + todayDate + '.log',
    handleExceptions: false,
    json: false,
    maxsize: 5242880, // 5MB
    maxFiles: 31,
    colorize: false,
}

/**
 * use logger like:
 * logger.info(message);
 * logger.warn(message);
 * logger.error(message);
 */
const logger = winston.createLogger({
    format: winston.format.printf(log => {
        return new Date().toISOString() + ' ' + log.level.toUpperCase() + ' ' + log.message;
    }),
    transports: [
        new winston.transports.File(loggerOptions),
    ],
    exitOnError: false,
});

export default logger;
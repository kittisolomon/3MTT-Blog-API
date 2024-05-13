const { createLogger, transports, format } = require('winston');

const logLevels = {
    error: 0,
    warn: 1,
    info: 2,
    debug: 3
};

const logger = createLogger({
    levels: logLevels,
    format: format.combine(
        format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'combined.log' })
    ]
});

module.exports = logger;

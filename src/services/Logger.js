import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;


const initLogger = () => {

    const customFormat = printf(({level, message, label, timestamp}) => {
        const customLabel = label ? `[${label}]` : '';
        return `${timestamp} ${level}: ${customLabel} ${message}`;
    });

    const logger = createLogger({
        level: 'info',
        format: combine(timestamp(), customFormat, format.colorize()),
        transports: [
            new transports.File({filename: 'error.log', level: 'error'}),
            new transports.File({filename: 'info.log'})
        ],
        exceptionHandlers: [
            new transports.File({filename: 'error.log', level: 'error'}),
        ],
        exitOnError: false,
    });

    if (process.env.NODE_ENV !== 'production') {
        logger.add(new transports.Console({
            format: combine(timestamp(), customFormat),
        }));
    }


    global.logger = logger;
};


export default initLogger();



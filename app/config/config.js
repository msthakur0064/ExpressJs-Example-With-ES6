import dotenv from 'dotenv';

// configure dotenv, will load vars in .env in PROCESS.ENV
dotenv.config();

const config = {
    name: process.env.APP_NAME,
    env: process.env.APP_ENV,
    debug: process.env.APP_DEBUG,
    url: process.env.APP_URL,
    port: process.env.APP_PORT,
    timezone: process.env.APP_TIMEZONE,
    rootPath: process.env.ROOT_PATH,
    appPath: process.env.ROOT_PATH + 'app/',
    publicPath: process.env.ROOT_PATH + 'public/',
    db: {
        connection: process.env.DB_CONNECTION,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        migrate: process.env.DB_MIGRATE,
    },
    mail: {
        service: process.env.MAIL_SERVICE_NAME,
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: process.env.MAIL_SECURE,
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        from: process.env.MAIL_FROM,
        name: process.env.MAIL_FROM_NAME,
    },
    jwt: {
        secretKey: process.env.JWT_SECRET_KEY,
        expire: process.env.JWT_EXPIRE,
    }
}

export default config;
import config from './config';

const env = process.env.APP_ENV;

export default {
    [env]: {
        host: config.db.host,
        database: config.db.database,
        username: config.db.username,
        password: config.db.password,
        dialect: config.db.connection,
        port: config.db.port,
        migrationStorageTableName: 'sequelizeMeta',
        logging: (config.debug == 'true') ? true : false,
        pool: {
            max: 5,
            min: 0,
            idle: 10000,
        },
        define: {
            paranoid: true,
            timestamps: true,
            freezeTableName: true,
            underscored: false
        },
        dialectOptions: {
            useUTC: (config.timezone == 'UTC') ? true : false,
        },
        timezone: config.timezone
    }
};

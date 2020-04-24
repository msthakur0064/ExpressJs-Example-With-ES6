import Sequelize from 'sequelize';

import config from './config';
import models from '../models/index.model';

let sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.connection,
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
            underscored: true
        },
        dialectOptions: {
            useUTC: (config.timezone == 'UTC') ? true : false,
        },
        timezone: config.timezone
    },
);

// db connection and migration
sequelize.authenticate()
    .then(async function (err) {
        await sequelize.sync();
        console.info(`${'>> Connection has been established successfully.'}`);
    })
    .catch(function (err) {
        console.error(`${'>> Unable to connect to the database:'}`, err);
    });

// return model configuration
const configuredDB = models.modelsInitialization(sequelize, Sequelize);
export default configuredDB;
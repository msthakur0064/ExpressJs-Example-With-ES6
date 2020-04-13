import Sequelize from 'sequelize';
import chalk from 'chalk';

import config from './config.js';
import models from '../app/models/index.model.js';

let sequelize = new Sequelize(
    config.db.database,
    config.db.username,
    config.db.password,
    {
        host: config.db.host,
        dialect: config.db.connection,
        logging: true,
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
    },
);

// db connection and migration
sequelize.authenticate()
    .then(async function (err) {
        await sequelize.sync();
        console.log(`${chalk.green('>> Connection has been established successfully.')}`);
    })
    .catch(function (err) {
        console.log(`${chalk.red('>> Unable to connect to the database:')}`, err);
    });

// return model configuration
const configuredDB = models.modelsInitialization(sequelize, Sequelize);
export default configuredDB;
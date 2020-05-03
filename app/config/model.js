import Sequelize from 'sequelize';

import config from './config';
import database from './database';
import models from '../database/models/index.model';

let sequelize = new Sequelize(database[config.env]);

// db connection and migration
sequelize.authenticate()
    .then(async function (err) {
        console.info(`${'>> Connection has been established successfully.'}`);
    })
    .catch(function (err) {
        console.error(`${'>> Unable to connect to the database:'}`, err);
    });

// return model configuration
const model = models.modelsInitialization(sequelize, Sequelize);
export default model;
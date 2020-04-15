import usersModel from './users.model.js';

let db = {};
export default {
    modelsInitialization: (sequelize, Sequelize) => {
        db.Users = usersModel(sequelize, Sequelize);

        return db;
    },
};

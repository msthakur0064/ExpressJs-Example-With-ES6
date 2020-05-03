import usersModel from './users.model';

let db = {};
export default {
    modelsInitialization: (sequelize, Sequelize) => {
        db.usersModel = usersModel(sequelize, Sequelize);

        return db;
    },
};

import usersModel from './users.model';

let db = {};
export default {
    modelsInitialization: (sequelize, Sequelize) => {
        db.Users = usersModel(sequelize, Sequelize);

        return db;
    },
};

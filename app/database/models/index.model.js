import roleModel from './role.model';
import userModel from './user.model';

let db = {};
export default {
    modelsInitialization: (sequelize, Sequelize) => {
        // model list
        db.roleModel = roleModel(sequelize, Sequelize);
        db.userModel = userModel(sequelize, Sequelize);

        // model relation
        db.userModel.belongsTo(db.roleModel, {foreignKey: 'roleId'});

        return db;
    },
};

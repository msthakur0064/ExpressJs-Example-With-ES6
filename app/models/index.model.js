import usersModel from './users.model.js';
import productsModel from './products.model.js';

let db = {};
export default {
    modelsInitialization: (sequelize, Sequelize) => {
        db.Users = usersModel(sequelize, Sequelize);
        db.Products = productsModel(sequelize, Sequelize);

        return db;
    },
};

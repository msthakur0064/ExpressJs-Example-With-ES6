export default {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('role', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            role: {
                type: Sequelize.STRING(50),
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE
            }
        }, {
            schema: 'public'
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('role');
    }
};
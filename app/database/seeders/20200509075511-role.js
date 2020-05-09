export default {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('role', [{
            role: 'Admin',
            createdAt: new Date()
        }, {
            role: 'Customer',
            createdAt: new Date()
        }]);
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('role', null, {
            truncate: true,
            cascade: true,
            restartIdentity: true
        });
    }
};

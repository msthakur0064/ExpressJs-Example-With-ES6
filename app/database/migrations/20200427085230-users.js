'use strict';

export default {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.BIGINT,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            firstName: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            lastName: {
                type: Sequelize.STRING(255),
                allowNull: false
            },
            email: {
                type: Sequelize.STRING(180),
                allowNull: false
            },
            salt: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            password: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            mobileNumber: {
                type: Sequelize.STRING(15),
                allowNull: true
            },
            profileImage: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            address: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            city: {
                type: Sequelize.STRING(255),
                allowNull: true
            },
            postalCode: {
                type: Sequelize.STRING(10),
                allowNull: true
            },
            status: {
                type: Sequelize.SMALLINT,
                allowNull: false,
                defaultValue: '1',
                comment: '1=Active, 2=Inactive'
            },
            createdAt: {
                type: Sequelize.DATE
            },
            updatedAt: {
                type: Sequelize.DATE
            },
            deletedAt: {
                type: Sequelize.DATE,
                allowNull: true,
            },
        }, {
            schema: 'public'
        });
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};

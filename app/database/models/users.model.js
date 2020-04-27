export default function (sequelize, DataTypes) {
    return sequelize.define('users', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        firstName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        email: {
            type: DataTypes.STRING(180),
            allowNull: false
        },
        salt: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        password: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        mobileNumber: {
            type: DataTypes.STRING(15),
            allowNull: true
        },
        profileImage: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        address: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        city: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        postalCode: {
            type: DataTypes.STRING(10),
            allowNull: true
        },
        status: {
            type: DataTypes.SMALLINT,
            allowNull: false,
            defaultValue: '1',
            comment: '1=Active, 2=Inactive'
        }
    });
}
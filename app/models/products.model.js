export default function (sequelize, DataTypes) {
    return sequelize.define('Products', {
        id: {
            type: DataTypes.BIGINT,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        code: {
            type: DataTypes.STRING(20),
            allowNull: false
        },
        name: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        brand: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        price: {
            type: DataTypes.FLOAT(10, 2),
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER(10),
            allowNull: false
        },
        status: {
            type: DataTypes.INTEGER(1),
            allowNull: false,
            defaultValue: '1',
            comment: '1=Active, 2=Inactive'
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        deleted_at: {
            type: DataTypes.DATE,
            allowNull: true
        }
    }, {
        tableName: 'projects'
    });
}
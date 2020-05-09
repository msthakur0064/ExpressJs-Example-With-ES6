const roleModel = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        role: DataTypes.STRING(50),
        createdAt: DataTypes.DATE
    });
}

export default roleModel;
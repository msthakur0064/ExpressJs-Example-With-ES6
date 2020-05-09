const userModel = (sequelize, DataTypes) => {
    return sequelize.define('user', {
        firstName: DataTypes.STRING(255),
        lastName: DataTypes.STRING(255),
        email: DataTypes.STRING(180),
        salt: DataTypes.TEXT,
        password: DataTypes.TEXT,
        mobileNumber: DataTypes.STRING(15),
        profileImage: DataTypes.STRING(255),
        address: DataTypes.TEXT,
        city: DataTypes.STRING(255),
        postalCode: DataTypes.STRING(10),
        status: DataTypes.SMALLINT
    });
}

export default userModel;
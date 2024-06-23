const db = require("../config/database");
const { DataTypes} = require('sequelize');
const Token = db.define('Token', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    refreshToken: {
        type: DataTypes.STRING,
        allowNull: false
    }
})
module.exports = Token;
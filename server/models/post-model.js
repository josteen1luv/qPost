const db = require("../config/database");
const { DataTypes} = require('sequelize');
const Post = db.define('Post', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false
    }

})
module.exports = Post;
const UserModel = require('../models/user-model');
const TokenModel = require('../models/token-model');
const PostModel = require('../models/post-model');
const LikeModel = require('../models/like-model');

const init = () => {
    UserModel.hasOne(TokenModel, { foreignKey: 'userId' });
    TokenModel.belongsTo(UserModel, { foreignKey: 'userId'});


    UserModel.hasMany(PostModel, { as: 'myPosts', foreignKey: 'postOwner' });
    PostModel.belongsTo(UserModel, {
        as: 'owner',
        foreignKey: 'postOwner',
    });

    UserModel.belongsToMany(PostModel, {
        through: LikeModel,
        uniqueKey: 'id',
        foreignKey: 'userId',
        as: 'likes',
    });
    PostModel.belongsToMany(UserModel, {
        onDelete: 'CASCADE',
        through: LikeModel,
        uniqueKey: 'id',
        foreignKey: 'postId',
        as: 'likes',
    });
}

module.exports = init;
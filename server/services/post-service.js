const PostModel = require('../models/post-model')
const UserModel = require('../models/user-model')
const LikeModel = require('../models/like-model')
const postService = {
    getAllPosts: async (isLiked, userId) => {
        const posts = await PostModel.findAll({
            order: [['createdAt', 'DESC']],
            include: [
                {
                    model: UserModel,
                    as: 'likes',
                    attributes: ['id', 'nickname'],
                },
                {
                    model: UserModel,
                    as: 'owner',
                    attributes: ['id', 'nickname'],
                },
            ],
        });

        return posts;
    },
    publishPost: async (title, description, userId) => {
        await PostModel.create({title, description, postOwner: userId});
    },
    deletePost: async (postId, user) => {
        await PostModel.destroy({
            where: {
                id: postId,
                postOwner: user.id,
            },
        });
    },
    likePost: async (user, postId) => {
        const like = await LikeModel.findOne({
            where: { postId, userId: user.id },
        });

        if (like) {
            await like.destroy();
            const { likes } = await PostModel.findOne({
                where: { id: postId },
                include: [
                    {
                        model: UserModel,
                        as: 'likes'
                    },
                ],
            });

            return likes;
        }

        await LikeModel.create({postId, userId: user.id });
        const { likes } = await PostModel.findOne({
            where: { id: postId },
            include: [
                {
                    model: UserModel,
                    as: 'likes'
                },
            ],
        });

        return likes;
    },
    editPost: async (title, description, postId) => {
        const post = await PostModel.findOne({where: {id: postId}});
        await post.update({title, description});
    },
}

module.exports = postService;
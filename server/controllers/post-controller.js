const postService = require('../services/post-service');
const {validationResult} = require("express-validator");
const ApiError = require("../exceptions/api-error");

const postController = {
    getPosts: async (req, res, next) => {
        try {
            const posts = await postService.getAllPosts();
            return res.json(posts);
        } catch (e) {
            next(e);
        }
    },
    publishPost: async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }

            const {id} = req.user;
            const { title, description } = req.body;
            await postService.publishPost(title, description, id);

            res.status(200).send('OK');
        } catch (e) {
            next(e);
        }
    },
    deletePost: async (req, res, next) => {
        try {
            const user = req.user;
            const postId = req.params.postId;
            await postService.deletePost(postId, user);

            res.status(200).send('');
        } catch (e) {
            next(e);
        }
    },
    likePost: async (req, res, next) => {
        try {
            const user = req.user;
            const postId = req.params.postId;
            const likeData = await postService.likePost(user, postId);

            res.json(likeData);
        } catch (e) {
            next(e);
        }
    },
    editPost: async (req, res, next) => {
        try {
            const errors = validationResult(req);

            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const postId = req.params.postId;
            const {title, description} = req.body
            await postService.editPost(title, description, postId);

            res.status(200).send('OK');
        } catch (e) {
            next(e);
        }
    },
}

module.exports = postController;
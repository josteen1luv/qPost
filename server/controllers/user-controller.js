const userService = require('../services/user-service')
const {validationResult} = require('express-validator');
const ApiError = require('../exceptions/api-error');

const userController = {
    registration: async (req, res, next)=> {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()){
                return next(ApiError.BadRequest('Validation error', errors.array()));
            }
            const {email, password, nickname} = req.body;
            const userData = await userService.registration(email, password, nickname);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },
    activation: async (req, res, next) => {
        try {
            const activationLink = req.params.link;
            await userService.activation(activationLink);
            return res.redirect(process.env.CLIENT_URL)
        } catch (e) {
            next(e);
        }
    },
    login: async (req, res, next) => {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },
    logout: async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies;
            await userService.logout(refreshToken);
            res.clearCookie('refreshToken');
            return res.status(200).send('OK');
        } catch (e) {
            next(e);
        }
    },
    refresh: async (req, res, next) => {
        try {
            const {refreshToken} = req.cookies;
            const userData = await userService.refresh(refreshToken);
            res.cookie('refreshToken', userData.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true});
            return res.json(userData);
        } catch (e) {
            next(e);
        }
    },
    getUsers: async (req, res, next) => {
        try {
            const users = await userService.getAllUsers();
            return res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getUser: async (req, res, next) => {
        try {
            const nickname = req.params.nickname;
            const user = await userService.getOneUser(nickname);
            return res.json(user);
        } catch (e) {
            next(e);
        }
    },
}

module.exports = userController;
const jwt = require("jsonwebtoken");
const TokenModel = require('../models/token-model');

const tokenService = {
    generateTokens: (payload) => {
        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_SECRET_KEY, {expiresIn: '15m'});
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET_KEY, {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    },
    validateAccessToken: (token) => {
        try{
            return jwt.verify(token, process.env.JWT_ACCESS_SECRET_KEY);
        } catch (e) {
            return null;
        }
    },
    validateRefreshToken: (token) => {
        try{
            return jwt.verify(token, process.env.JWT_REFRESH_SECRET_KEY);
        } catch (e) {
            return null;
        }
    },
    saveToken: async (userId, refreshToken) => {
        const tokenData = await TokenModel.findOne({ where: { userId: userId } })
        if (tokenData){
            tokenData.refreshToken = refreshToken;
            return tokenData.save();
        }
        return await TokenModel.create({userId, refreshToken});
    },
    removeToken: async (refreshToken) => {
        await TokenModel.destroy({where: {refreshToken}});
    },
    findToken: async (refreshToken) => {
        return await TokenModel.findOne({where: {refreshToken}});
    }
}


module.exports = tokenService;